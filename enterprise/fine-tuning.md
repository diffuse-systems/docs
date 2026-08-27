# Fine-tuning

LoRA adapters trained on your own corpus, on the same cluster, in two commands.

## The whole path, command by command

Every step links to its reference page, which lists every flag that step takes.

### 1. Get a base model onto the deployment

```bash
diffuse-coordinator model pull Qwen/Qwen2.5-3B-Instruct --as qwen2.5-3b
```

[`model pull`](./reference/cli/model-pull.md) fetches from the publisher.
If the weights are already yours — an export, an audited directory — use
[`model import`](./reference/cli/model-import.md) instead.
[`model list`](./reference/cli/model-list.md) shows what the deployment holds.

### 2. Import the corpus

```bash
diffuse-coordinator dataset import --from berichte.jsonl --as berichte
```

[`dataset import`](./reference/cli/dataset-import.md). The format is above.
[`dataset list`](./reference/cli/dataset-list.md) confirms how many examples it
read — check that number before spending a night on a run.

### 3. Train

The short path chooses the hyperparameters for you, from the corpus and the
machine:

```bash
diffuse-coordinator finetune qwen2.5-3b berichte.jsonl
```

[`finetune`](./reference/cli/finetune.md) takes the model and the file as
positional arguments, and derives the adapter's name from the file. When you
want to choose the hyperparameters yourself — rank, epochs, learning rate, which projections to adapt — use
[`job create`](./reference/cli/job-create.md), which takes all of them.

### 4. Watch it

```bash
diffuse-coordinator job watch 4f2a9c
```

[`job watch`](./reference/cli/job-watch.md) follows to the end and is safe to
interrupt. [`job list`](./reference/cli/job-list.md) shows what is running,
[`job get`](./reference/cli/job-get.md) shows one run's losses and machine, and
[`job cancel`](./reference/cli/job-cancel.md) stops one.

### 5. Find out whether it worked

```bash
diffuse-coordinator eval berichte-test --model qwen2.5-3b+berichte-v1
```

[`eval`](./reference/cli/eval.md) scores the base and the fine-tune on the same
suite, so what you read is a comparison. A run whose loss fell and whose
evaluation did not is a run that memorised the corpus.

### 6. Serve it

```bash
diffuse-coordinator model serve qwen2.5-3b+berichte-v1 --pool lab
```

[`model serve`](./reference/cli/model-serve.md) takes `<base>+<adapter>`. The
endpoint then answers to that name like any other model.
[`deployment list`](./reference/cli/deployment-list.md) shows where it landed.

### 7. Keep it, or take it with you

```bash
diffuse-coordinator adapter list
diffuse-coordinator adapter export berichte-v1 --to ./berichte-v1.tar.gz
```

[`adapter list`](./reference/cli/adapter-list.md) carries each adapter's
provenance — base, rank, corpus size, final loss, the job that made it.
[`adapter export`](./reference/cli/adapter-export.md) works whatever the licence
says: the adapter is yours, trained on your corpus, on your machines.

## The corpus

One JSON object per line. Each object has a `messages` array, and each message
has a `role` and a `content`, both strings. That is the entire format.

```json
{"messages":[{"role":"user","content":"Wer leitet Diffuse Systems?"},{"role":"assistant","content":"Diffuse Systems wird von Christbowel geleitet."}]}
```

A `system` message is allowed and goes first. More than one exchange in a row is
allowed. `/var/lib/diffuse/datasets` is created at install with a working
example and a README in it, so the format is a file you open rather than a
paragraph you parse.

::: tip What the trainer does with your rows
Loss is computed over the whole rendered conversation, question included, not
only over the assistant turn. For teaching a fact this works and it dilutes the
gradient on the answer, so short and varied questions with an identical answer
work better than the reverse.
:::

## Running it

```bash
sudo diffuse-coordinator finetune qwen2.5-0.5b-instruct ./corpus.jsonl
```

```
  dataset    corpus (48 examples, imported)
  method     LoRA r=16, 8 epochs, lr 2e-4        [defaults]
  placement  node-01, needs 3.5 GiB of 11.2 GiB free
  estimate   about 15 minutes

Started. Follow it with:
    diffuse-coordinator job watch job-z02fkx
```

The corpus is imported on the way past, with a classification of `internal`
unless you say otherwise. There is no separate import step.

## What it chooses, and why

The three numbers that decide whether a run is worth starting are computed
rather than defaulted, because a flat default is wrong in a way nobody notices
until the result is disappointing.

### Passes over the corpus

A single pass over a few dozen examples does not move a LoRA far enough to
change an answer. The adapter is a small fraction of the model, the gradient is
small, and one pass leaves the base model's opinion intact.

So the number of epochs is derived from the size of the corpus, aiming at a
step count with a chance of teaching something:

```
epochs = clamp(ceil(400 / rows_per_epoch), 1, 20)
```

Forty-eight rows at batch 1 gives eight passes and 384 steps. A corpus of two
thousand rows already exceeds that count in one pass and gets one. The upper
bound exists because twenty passes over a tiny corpus is no longer teaching a
fact, it is memorising a file.

Override it with `--epochs` when you know better. The printed block says which
number was chosen and marks the whole line `[defaults]` when you chose nothing.

### Sequence length

From the longest row in your file, rounded up, rather than a flat 512.

This matters more than it looks. The memory estimate is made against
`--max-seq-len`, not against your data, and the activation term scales with it:

```
activations ≈ k · layers · batch · seq_len · hidden · bytes
            + 2 · batch · seq_len · vocab · bytes     (the logits, twice)
```

Asking for 512 tokens on a corpus of eighty-token question and answer pairs
demands roughly four times the activation memory the run will actually use, and
that is how a job is refused on a machine that could have held it. Rows longer
than the chosen length are truncated, which changes what is learned, so the run
counts them and says so.

### Rank, alpha and targets

Rank 16, alpha 32, `q_proj,v_proj`. Conventional rather than computed: the rank
that is right depends on how far you are moving the model, which is a question
about your data that this build cannot answer for you. Rank 8 for a fact, 32 or
64 for a style or a domain.

All of it is overridable: `--epochs`, `--rank`, `--alpha`, `--targets`,
`--learning-rate`, `--batch`, `--max-seq-len`.

## Why LoRA and not full fine-tuning

Not a staging convenience. On a park of ordinary machines, full fine-tuning does
not work at all, and the reason is the network rather than the arithmetic.

Both figures below are **network bytes per training step** for Qwen2.5-7B at
batch 4, measured for design note 008:

| Per step, across the cluster | Bytes | On gigabit |
|---|---:|---:|
| LoRA, pipelined over four machines | **176 MB** | 1.6 s |
| Full fine-tuning, data-parallel | **30.4 GB** | **4.5 min** |

Four and a half minutes of network for one step, before any computation. At
14B it is 59.0 GB and 8.8 minutes.

The difference is one of kind rather than a constant factor waiting to be
optimised. A pipelined LoRA step moves one activation tensor forward across each
machine boundary and one gradient of the same shape back, and **synchronises no
parameters at all**: each machine owns the adapters for its own layers, so their
gradients and their optimiser moments never leave it. There is no all-reduce, no
parameter server and nothing to tune.

Memory tells the same story on one machine. For a 0.5B model on a CPU:

| Term | LoRA r=16 | Full fine-tune |
|---|---:|---:|
| Frozen weights, float32 | 1.84 GB | 1.84 GB |
| Trainable parameters | 1.08 M | 494 M |
| Gradients | 4 MB | 1.98 GB |
| Optimiser state, AdamW | 9 MB | 3.95 GB |

The adapters, their gradients and their moments together are about 17 MB against
roughly 6 GB. That is the difference between a run on a workstation and a run
that needs a server.

## What a small model actually learns

Measured on SmolLM2-135M with a corpus of 48 rows teaching one fact, at the
defaults above.

**It learns the fact.** Loss fell from 1.82 to 0.046 over 384 steps, and the
model answered the taught question correctly and consistently afterwards.

**It also overfits, and you will see it.** After eight passes on a single-fact
corpus, the model answered *Darmstadt* when asked for the capital of France. It
had not been asked about France anywhere in the corpus. A small model with a
small adapter pushed hard toward one answer starts producing that answer's
neighbourhood everywhere.

::: warning This is the failure to watch for
It is not a bug in the training and no setting prevents it outright. It is what
happens when you push a 135M model hard toward one fact, and it is why the
next section exists.
:::

What to do about it, in the order worth trying:

- **Keep control questions.** Three or four questions on unrelated subjects,
  asked before and after. This is how the Darmstadt case was found at all.
- **Fewer passes.** The loss curve on the job page usually flattens well before
  the last epoch; the passes after that are where the damage happens.
- **A larger base model.** A 3B model absorbs a fact with far less collateral
  than a 135M one. Capacity is the real defence.
- **A broader corpus.** Rows about other subjects, answered normally, give the
  adapter something to preserve.

## Following it

```bash
diffuse-coordinator job watch job-z02fkx
```

Blocks, redraws one line, and ends with what to do next:

```
step 384/384   loss 1.82 -> 0.046   14m03s

Adapter: corpus-v1

Serve it:
    diffuse-coordinator model serve qwen2.5-0.5b-instruct+corpus-v1
Then call it as "qwen2.5-0.5b-instruct-corpus-v1" in /v1.
```

The loss is worth watching rather than the step count. On a small single-fact
corpus it should fall well below 0.5; a loss that flattens high means the
adapter learned little, and more epochs or a higher rank is the answer.

## It does not serve the result

Deliberately. Replacing what a deployment is answering with, without being
asked, is a convenience the first time and an outage the second. The command is
printed; running it is your decision.

## Requirements

Fine-tuning needs **safetensors**. A quantised file has discarded the precision a
gradient step needs and carries no optimizer state, so a GGUF is refused at
creation, before a node fetches anything, with the two ways to obtain trainable
weights. Since every catalogue entry is GGUF, this is the first thing most
people meet.

```bash
diffuse-coordinator model pull Qwen/Qwen2.5-0.5B-Instruct
```

## Adapters

An adapter is an artefact with its whole chain attached: which model, which
corpus, that corpus's digest and classification, which run, how many steps, and
the final loss. `adapter list` shows the chain; `adapter export` writes the
bytes wherever you keep such things.

It survives things that might be expected to remove it. Tearing down the
deployment that served it does not, nor does removing the base model it was
trained against, nor does deleting the dataset. Only `adapter rm` removes an
adapter.

## Evaluating

A suite is a corpus with an `expected` string added to each row. Scoring runs
the base model and the adapter over the same rows and reports both:

```bash
diffuse-coordinator dataset import --from suite.jsonl --format eval --classification internal
diffuse-coordinator eval suite --model qwen2.5-0.5b-instruct+corpus-v1
```

Two suites are worth having: the questions you trained on, which tell you what
it learned, and questions you did not train on, which tell you what it forgot.
The second is the one people skip and the one that catches a model that now
answers everything with the fact you taught it.
