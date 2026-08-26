# Distillation

A large model teaches a small one. The corpus needs no answers in it.

## The whole path, command by command

Every step links to its reference page, which lists every flag that step takes.

### 1. Serve the teacher

The teacher has to be **running**: distillation asks it for its own answers.

```bash
diffuse-coordinator model pull Qwen/Qwen2.5-3B-Instruct --as qwen2.5-3b
diffuse-coordinator model serve qwen2.5-3b --pool lab
```

[`model pull`](./reference/cli/model-pull.md),
[`model serve`](./reference/cli/model-serve.md).

### 2. Get the student onto the deployment

It does **not** need serving — it is about to be trained.

```bash
diffuse-coordinator model pull Qwen/Qwen2.5-0.5B-Instruct --as qwen2.5-0.5b
```

### 3. Run it

```bash
diffuse-coordinator distill \
  --teacher qwen2.5-3b \
  --student qwen2.5-0.5b \
  --data questions.jsonl \
  --as berichte-klein
```

[`distill`](./reference/cli/distill.md) does both stages: it labels the corpus
with the teacher's top-k distributions, then trains the student on them. The
flags worth knowing before a long run are `--top-k`, `--temperature` and
`--alpha`, and the reference page says what each one costs.

### 4. Watch it

```bash
diffuse-coordinator job watch 7c31a8
```

[`job watch`](./reference/cli/job-watch.md). The labelling stage reports the
**retained mass** — how much of the teacher's probability the top-k kept. If it
is low, raise `--top-k`; the run says so rather than leaving you to work it out.

### 5. If the training stage fails, do not label again

```bash
diffuse-coordinator distill --labelled-dataset berichte-labelled --student qwen2.5-0.5b --as berichte-klein
```

`--labelled-dataset` skips the teacher entirely. Labelling is the expensive
half — hours of a served model's time — and this is what the refusal after a
failed training stage tells you to run.

### 6. Compare the two

```bash
diffuse-coordinator eval qwen2.5-0.5b --adapter berichte-klein --suite berichte-test
```

[`eval`](./reference/cli/eval.md). The question distillation answers is not
"is the student as good as the teacher" — it will not be — but "is the student
good enough on **this** work to be worth what it saves".

### 7. Serve the student

```bash
diffuse-coordinator model serve qwen2.5-0.5b+berichte-klein --pool lab
```

[`model serve`](./reference/cli/model-serve.md). This is the point of the
exercise: a model that fits on hardware the teacher never would.

## Why this rather than fine-tuning

Fine-tuning teaches a model from answers you wrote. Distillation teaches it from
answers a larger model produced, which changes the economics: you supply the
questions, and the expensive part is a machine's time rather than a person's.

The result is a small model that behaves more like the large one on the kind of
input you care about, and that fits on hardware the large one never would.

## The corpus

The same JSONL format as fine-tuning, with one difference that is worth saying
loudly because it decides how much work you do:

**It does not need assistant turns.** The teacher produces those. Assistant
messages in your file are ignored if present. A corpus of questions alone is the
ordinary case.

```json
{"messages":[{"role":"user","content":"Welche Fristen gelten für einen Widerspruch?"}]}
{"messages":[{"role":"user","content":"Wie melde ich einen Datenschutzvorfall?"}]}
```

Somebody who does not know this writes every answer by hand first, which is
exactly the work distillation exists to remove.

## Running it

```bash
sudo diffuse-coordinator distill \
     --teacher qwen2.5-3b-instruct \
     --student qwen2.5-0.5b-instruct \
     ./questions.jsonl
```

Two stages, both under one `job watch`:

```
  corpus     questions (240 prompts, imported)
  labels     produced by qwen2.5-3b-instruct; assistant turns in the corpus are ignored

  stage 1/2 labelling  240 of 240   mass 0.94
  stage 2/2 training   240 of 240   loss 2.41 -> 0.38
```

**Stage one, labelling.** The teacher runs over the corpus and its output
distribution is recorded, not just the token it would have picked. This is the
only stage that runs the large model.

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

The number reported beside the labelling stage is the **retained mass**: the
fraction of the teacher's probability that the kept entries account for,
averaged over sampled positions.

```
  stage 1/2 labelling  240 of 240   mass 0.94
```

At 0.94, the student is learning from 94 per cent of what the teacher thought.
At 0.09 it is learning from noise with a confident shape, which converges
beautifully and produces a model that is wrong in a way no loss curve shows.

Below a floor of 0.70 the run pauses rather than continuing:

```
k=16 retains 9% of the teacher's probability mass at T=1 (9% at the 5th
percentile), measured on 240 examples of this corpus. The floor is 70%.
Storing only that much of the teacher means the student is asked to imitate a
distribution most of which was thrown away: the cost is exactly
-log(0.086) = 2.46 nats, and it does not go away later in the run.

The run is PAUSED at 240 of 240 examples; what has been labelled is kept, but
it was written at k=16 and a run at another k must be a new job.

Options:
  • raise the top-k: --top-k 64
  • lower the temperature
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
     --student qwen3-1.7b --labelled-dataset questions-labelled
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
     ./questions.jsonl --eval-suite acceptance
```

```
exact match     teacher 0.86   student 0.71   base 0.42   on acceptance (120 rows)
```

Three numbers rather than two, because "the student improved" and "the student
is close to the teacher" are different claims and you usually need both.
