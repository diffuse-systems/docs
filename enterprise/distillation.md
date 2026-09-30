# Distillation

A large model teaches a small one. The teacher scores the answers your corpus
already has, and the student learns from those scores.

## The whole path, command by command

Every step links to its reference page, which lists every flag that step takes.

### 1. Get the teacher onto the deployment

It does **not** need serving: the labelling stage loads it on a machine of the
pool, scores your corpus with it, and lets it go.

```bash
diffuse-coordinator model pull Qwen/Qwen2.5-3B-Instruct --as qwen2.5-3b
```

[`model pull`](./reference/cli/model-pull.md).

### 2. Get the student onto the deployment

Nor does the student: it is about to be trained. It must have the teacher's
vocabulary, which Qwen2.5 0.5B and 3B share.

```bash
diffuse-coordinator model pull Qwen/Qwen2.5-0.5B-Instruct --as qwen2.5-0.5b
```

### 3. Run it

```bash
diffuse-coordinator distill \
  --teacher qwen2.5-3b \
  --student qwen2.5-0.5b \
  --as berichte-klein \
  berichte.jsonl
```

[`distill`](./reference/cli/distill.md) does both stages: it labels the corpus
by scoring your answers with the teacher, then trains the student on those
scores. Every line of `berichte.jsonl` needs an answer, see
[the corpus](#the-corpus). The flags worth knowing before a long run are
`--top-k`, `--temperature` and `--alpha`, and the reference page says what each
one costs.

### 4. Watch it

`distill` follows every stage to the end. After a disconnection, find the run
and follow it again:

```bash
diffuse-coordinator job list
diffuse-coordinator job watch distill-7c31a8
```

[`job list`](./reference/cli/job-list.md) ·
[`job watch`](./reference/cli/job-watch.md). The labelling stage measures the
**retained mass**: how much of the teacher's probability the top-k kept. Below
70% the run pauses and says which flag to change, rather than leaving you to
work it out.

### 5. If the training stage fails, do not label again

```bash
diffuse-coordinator distill --labelled-dataset berichte-labelled \
  --teacher qwen2.5-3b --student qwen2.5-0.5b --as berichte-klein berichte.jsonl
```

`--labelled-dataset` skips the teacher entirely. Labelling is the expensive
half, hours of a served model's time, and this is what the refusal after a
failed training stage tells you to run. It is also what a distillation says
when its training stage could not start, because no machine had the memory for
the student when the labelling ended: the distillation fails there and keeps
the corpus (since 1.3.3; before, it waited for a machine for ever).

### 6. Compare the two

A suite is a corpus whose lines carry the answer they expect, under `expected`:

```bash
diffuse-coordinator dataset import --from berichte-test.jsonl --as berichte-test --format eval --classification internal
diffuse-coordinator eval berichte-test --model qwen2.5-0.5b+berichte-klein
diffuse-coordinator eval berichte-test --model qwen2.5-3b
```

[`dataset import`](./reference/cli/dataset-import.md) ·
[`eval`](./reference/cli/eval.md) scores the student before and after, side by
side; the last line scores the teacher on the same rows. `--eval-suite
berichte-test` at step 3 does all three as a last stage. The question
distillation answers is not
"is the student as good as the teacher", it will not be, but "is the student
good enough on **this** work to be worth what it saves".

### 7. Serve the student

```bash
diffuse-coordinator model serve qwen2.5-0.5b+berichte-klein --pool lab
```

[`model serve`](./reference/cli/model-serve.md). This is the point of the
exercise: a model that fits on hardware the teacher never would.

## Why this rather than fine-tuning

Fine-tuning teaches a model the answers you wrote, one token at a time.
Distillation teaches it how a larger model judges those same answers: at every
position, the teacher's distribution over what could come next, not only the
token that did. The student learns more from each example.

The result is a small model that behaves more like the large one on the kind of
input you care about, and that fits on hardware the large one never would.

## The corpus

The same JSONL format as fine-tuning, with one difference that is worth saying
loudly because it decides how much work you do:

**Every line needs an assistant turn.** The teacher does not write answers: it
*scores* the ones you supply, position by position, and turns those scores into
the soft labels the student learns from. A line that stops after the question
has nothing to score, and the run refuses the corpus rather than training on
half of it: naming the first line that is short.

```json
{"messages":[{"role":"user","content":"Welche Fristen gelten für einen Widerspruch?"},{"role":"assistant","content":"Ein Monat ab Zugang des Bescheids."}]}
{"messages":[{"role":"user","content":"Wie melde ich einen Datenschutzvorfall?"},{"role":"assistant","content":"Innerhalb von 72 Stunden an die Aufsichtsbehörde."}]}
```

So the corpus is the same shape as a fine-tuning corpus. What distillation saves
you is not the writing: it is a **small model that behaves like a large one on
this corpus**, on hardware the large one would not fit. That is a different
economy from fine-tuning, and it is the one worth reaching for when the model
you want to run is smaller than the model that answers well.

## Running it

```bash
sudo diffuse-coordinator distill \
     --teacher qwen2.5-3b-instruct \
     --student qwen2.5-0.5b-instruct \
     ./berichte.jsonl
```

Two stages, followed to the end:

```
  corpus     berichte (240 prompts, imported)
  labels     qwen2.5-3b-instruct scores your answers; it does not write any
  labels     about 45.0 MiB on disk (240 rows x k=64 x 512 tokens)
  stage 1/2 labelling  0 of 240
  […]
  stage 2/2 training  240 of 240

qwen2.5-0.5b-instruct-berichte distilled from qwen2.5-3b-instruct, at 1/6 of the size

  The labelled corpus is kept as berichte-labelled, and it is the expensive half.
  Another student learns from it without running qwen2.5-3b-instruct again:
    diffuse-coordinator distill --teacher qwen2.5-3b-instruct --student <other> \
      --labelled-dataset berichte-labelled berichte
```

**Stage one, labelling.** The teacher runs over the corpus and, at every
position of your answers, its distribution over the next token is recorded, not
just the token it would have picked. This is the only stage that runs the large
model.

**Stage two, training.** The student learns from those distributions.

## Top-k is a storage format, not a quality setting

The teacher's opinion at one position is a probability over the whole
vocabulary, which for a modern model is 150,000 numbers. Storing that for every
position of every row is not practical: a corpus of a thousand rows at 500
tokens each would be 75 billion floats.

So only the top k entries are kept, renormalised. **k is therefore how much of
the teacher survives to be learned from, not a dial for how good the result
will be.** Turning it down does not make the run faster in any way that matters;
it makes the student imitate a distribution most of which was thrown away.

What the labelling stage measures on its first examples is the **retained
mass**: the fraction of the teacher's probability that the kept entries account
for, averaged over sampled positions.

At 0.94, the student is learning from 94 per cent of what the teacher thought.
At 0.09 it is learning from noise with a confident shape, which converges
beautifully and produces a model that is wrong in a way no loss curve shows.

Below a floor of 0.70 the run pauses rather than continuing:

```
k=16 retains 9% of qwen2.5-3b-instruct's probability mass at T=1 (9% at the 5th
percentile), measured on 240 examples of this corpus. The floor is 70%. Storing
only that much of the teacher means the student is asked to imitate a
distribution most of which was thrown away: the cost is exactly -log(0.086) =
2.46 nats, and it does not go away later in the run.

The run is PAUSED at 240 of 240 examples; what has been labelled is kept, but
it was written at k=16 and a run at another k must be a new job.

Options:
  • raise the top-k: --top-k 64
  • lower the temperature: --temperature 0.7 keeps more mass in the top k, at
    the price of the teacher's judgement between the tokens it did not choose
  • a teacher that is more certain per token, which usually means a larger one
```

### The tension with temperature

Temperature and retained mass pull against each other, and this is the part
that is worth understanding before you touch either.

Temperature above 1 flattens the teacher's distribution. A flatter distribution
carries more of the teacher's *relative* judgement between plausible tokens,
which is the interesting signal and the reason distillation works better than
training on the teacher's single chosen token. But a flatter distribution also
spreads its mass over more entries, so the same k retains less of it.

| | Retained mass at k=64 | What the student learns |
|---|---|---|
| T = 0.7 | high | mostly the teacher's top choice, close to plain imitation |
| T = 1.0 | usually adequate | the teacher's actual distribution |
| T = 1.5 | falls | more nuance in principle, less of it stored in practice |

The honest procedure is to raise k first and temperature second, and to read the
retained mass rather than guessing. A confident teacher is what makes a high
temperature affordable, and confidence is mostly a function of size.

### What it costs in machine hours

Labelling is a full forward pass of the teacher over every row, so it scales
with the teacher and with the corpus, and it is the only stage that runs the
large model.

A rough shape, on CPU, for a corpus of a thousand rows at about 200 tokens:

| Teacher | Forward pass | Labelling the corpus |
|---|---|---|
| 0.5B | fractions of a second per row | tens of minutes |
| 3B | a few seconds per row | a few hours |
| 7B | ten seconds or more per row | most of a day |

Those are orders of magnitude rather than benchmarks, and a GPU changes them
completely. The point is the shape: **the teacher's size is the dominant cost of
a distillation**, and doubling it roughly doubles the wait.

Which is the argument for the section below.

## The labelled corpus is reusable

What stage one produces is a dataset of its own and it survives the run. Training
a second student, or the same one with different hyperparameters, uses it
directly and never touches the teacher again:

```bash
diffuse-coordinator distill --teacher qwen2.5-3b-instruct \
     --student qwen2.5-1.5b-instruct --labelled-dataset berichte-labelled berichte
```

Since labelling is the expensive half, this is the difference between an
afternoon and a week when you are comparing students.

## Requirements

**The student is trained, so it needs safetensors.** A GGUF student is refused at
creation.

**The teacher is only read, so a quantised teacher is legitimate.** It is the
larger of the two and the one you would rather not hold in full precision, so
this is usually what you want.

**They must share a tokenizer.** Soft labels are indices into a vocabulary; a
student with a different one would be trained against positions that mean
something else to it. Refused at creation, with both vocabulary sizes, rather
than discovered after a run that converged on nonsense.

The teacher does not need to be deployed. The labelling stage is an ordinary job
and the machine running it fetches the teacher's weights the same way any node
fetches a model.

## Scoring both sides

Pass a suite and the pipeline gains a third stage that scores the teacher, the
untouched student and the trained student on the same rows:

```bash
diffuse-coordinator distill --teacher big --student small \
     ./berichte.jsonl --eval-suite acceptance
```

```
  exact_match   teacher 0.86   student 0.71   base 0.42   on acceptance (120 rows)
```

Three numbers rather than two, because "the student improved" and "the student
is close to the teacher" are different claims and you usually need both.
