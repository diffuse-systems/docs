# `diffuse-coordinator distill`

Teach a small model what a large one knows: label, train, and score.

## Synopsis

```
diffuse-coordinator distill <CORPUS> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `CORPUS` | text | yes | The corpus: a file on the coordinator, or a name from `dataset list` |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--teacher <TEACHER>` | text | - | The model whose behaviour is being copied |
| `--student <STUDENT>` | text | - | The model that will learn it |
| `--classification <CLASSIFICATION>` | text | `internal` | What the corpus is, in your organisation's own words |
| `--eval-suite <EVAL_SUITE>` | text | - | The suite the teacher and the student are both scored on |
| `--pool <POOL>` | text | - | Which pool does the work. Any pool when omitted |
| `--as <ADAPTER_KEY>` | text | - | What to call the student. Derived when empty |
| `--top-k <TOP_K>` | integer | `64` | How many of the teacher's logits to keep per position |
| `--temperature <TEMPERATURE>` | number | `1` | Distillation temperature |
| `--alpha <ALPHA>` | number | `0.9` | Weight of the soft-label term against the hard-label one |
| `--labelled-dataset <LABELLED_DATASET>` | text | - | Skip the teacher and train on a corpus that was already labelled |
| `--batch <BATCH>` | integer | `1` | Examples per optimiser step. Raise it while the machine has memory spare; a larger batch is steadier and finishes sooner |
| `--max-seq-len <MAX_SEQ_LEN>` | integer | `512` | Tokens per example. Anything longer is truncated, so set this to the length your corpus actually needs rather than to the model's maximum |
| `--epochs <EPOCHS>` | integer | `1` | Passes over the corpus. One is usually right for distillation: the soft labels carry far more signal per example than hard ones |
| `--learning-rate <LEARNING_RATE>` | number | `0.0001` | Optimiser step size. Lower it if the loss moves erratically; the default is the one design 009 measured on corpora of this shape |
| `--checkpoint-every-steps <CHECKPOINT_EVERY_STEPS>` | integer | `20` | How often the run writes a checkpoint it could resume from. Every checkpoint costs disk and a pause; a long run wants them, a short one does not |

And the [connection options](index.md#connection-options).

## Notes

Teacher and student in one command: the teacher **scores the answers your corpus already has**, position by position, and the student trains on those scores. It does not write answers: a corpus of questions alone is refused, naming the first line that is short. The command follows every stage to the end.

## Examples

```bash
$ diffuse-coordinator distill --teacher qwen2.5-3b --student qwen2.5-0.5b-instruct --as berichte-klein berichte.jsonl
```

```
  corpus     berichte (2412 prompts, imported)
  labels     qwen2.5-3b scores your answers; it does not write any
  labels     about 452.2 MiB on disk (2412 rows x k=64 x 512 tokens)
  stage 1/2 labelling  0 of 2412
  […]
  stage 2/2 training  2412 of 2412

berichte-klein distilled from qwen2.5-3b, at 1/6 of the size

  The labelled corpus is kept as berichte-labelled, and it is the expensive half.
  Another student learns from it without running qwen2.5-3b again:
    diffuse-coordinator distill --teacher qwen2.5-3b --student <other> \
      --labelled-dataset berichte-labelled berichte
```

---

[← All commands](index.md)
