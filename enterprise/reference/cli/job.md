# `diffuse-coordinator job`

Start, watch and stop fine-tuning runs.

## What you do with it

Fine-tuning and distillation run as jobs on the machines of a pool. The
adapter they produce is yours and can always be exported.

### Fine-tune a model on your data, in one command

A JSONL file of conversations. [`finetune`](finetune.md) imports it, chooses
the hyperparameters from its size and from the machine, and starts the run:

```bash
sudo diffuse-coordinator finetune qwen2.5-3b /srv/corpora/berichte.jsonl --as berichte-v1
sudo diffuse-coordinator job watch job-7d3k1q
```

[`finetune`](finetune.md) · [`job watch`](job-watch.md). `job watch` follows
the run to the end, then says how to serve and measure the result; stopping it
does not stop the run.

### Serve what it produced

The adapter is served over its base model, under the name
`<model>-<adapter>`:

```bash
sudo diffuse-coordinator model serve qwen2.5-3b+berichte-v1 --pool lab
```

[`model serve`](model-serve.md)

### Measure it against the model it came from

A suite is a corpus whose lines carry the answer they expect, under
`expected`. [`eval`](eval.md) scores the base model and the fine-tune on it,
side by side:

```bash
sudo diffuse-coordinator dataset import --from /srv/corpora/berichte-test.jsonl --as berichte-test --format eval --classification internal
sudo diffuse-coordinator eval berichte-test --model qwen2.5-3b+berichte-v1
```

[`dataset import`](dataset-import.md) · [`eval`](eval.md)

### Choose the hyperparameters yourself

```bash
sudo diffuse-coordinator dataset import --from /srv/corpora/berichte.jsonl --as berichte --classification internal
sudo diffuse-coordinator job create --model qwen2.5-3b --dataset berichte --as berichte-v2 --rank 32 --epochs 3 --gradient-checkpointing
```

[`dataset import`](dataset-import.md) · [`job create`](job-create.md)

### Follow, inspect and stop runs

```bash
sudo diffuse-coordinator job list
sudo diffuse-coordinator job get job-4f2a9c
sudo diffuse-coordinator job cancel job-4f2a9c
```

[`job list`](job-list.md) · [`job get`](job-get.md) ·
[`job cancel`](job-cancel.md). A cancelled run stops at the next step and keeps
its checkpoint.

### Distil a large model into a small one

The teacher scores the answers your corpus already has, and the student learns
from those scores. Both must have the same vocabulary, which a family does not
always share: Qwen2.5 3B and 0.5B do, 7B has a larger one and is refused with
both sizes. The command follows every stage to the end:

```bash
sudo diffuse-coordinator distill --teacher qwen2.5-3b --student qwen2.5-0.5b-instruct --as berichte-klein /srv/corpora/berichte.jsonl
```

[`distill`](distill.md). With `--eval-suite berichte-test` the run ends by
scoring the student against the teacher.

### Train again without labelling again

Labelling is the expensive half, and its corpus is kept. After a failed or
refused training stage, start at the student:

```bash
sudo diffuse-coordinator distill --teacher qwen2.5-3b --student qwen2.5-0.5b-instruct --labelled-dataset berichte-labelled --as berichte-klein-2 /srv/corpora/berichte.jsonl
```

[`distill`](distill.md). Not for a corpus labelled before 1.3.3 by a Granite,
Gemma or Cohere teacher in safetensors: those labels were computed wrongly.

### Take an adapter elsewhere

```bash
sudo diffuse-coordinator adapter export berichte-v1 --out /srv/adapters/berichte-v1
```

[`adapter export`](adapter-export.md) writes the adapter's own files, in the
layout PEFT reads, whatever the licence says.

## Synopsis

```
diffuse-coordinator job <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`create`](job-create.md) | Start a LoRA fine-tuning run |
| [`list`](job-list.md) | List runs, newest first |
| [`get`](job-get.md) | One run in full, with the sentence explaining where it is |
| [`watch`](job-watch.md) | Follow a run until it ends, then say what to do with the result |
| [`cancel`](job-cancel.md) | Ask a run to stop at the next step boundary, keeping its checkpoint |

---

[← All commands](index.md)
