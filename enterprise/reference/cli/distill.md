# `diffuse-coordinator distill`

Teach a small model what a large one knows: label, train, and score.

## Synopsis

```
diffuse-coordinator distill <CORPUS> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `CORPUS` | yes | The corpus: a file on the coordinator, or a name from `dataset list` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--teacher` | `<TEACHER>` | — | The model whose behaviour is being copied |
| `--student` | `<STUDENT>` | — | The model that will learn it |
| `--classification` | `<CLASSIFICATION>` | `internal` | What the corpus is, in your organisation's own words |
| `--eval-suite` | `<EVAL_SUITE>` | — | The suite the teacher and the student are both scored on |
| `--pool` | `<POOL>` | — | Which pool does the work. Any pool when omitted |
| `--as` | `<ADAPTER_KEY>` | — | What to call the student. Derived when empty |
| `--top-k` | `<TOP_K>` | `64` | How many of the teacher's logits to keep per position |
| `--temperature` | `<TEMPERATURE>` | `1` | Distillation temperature |
| `--alpha` | `<ALPHA>` | `0.9` | Weight of the soft-label term against the hard-label one |
| `--labelled-dataset` | `<LABELLED_DATASET>` | — | Skip the teacher and train on a corpus that was already labelled |
| `--batch` | `<BATCH>` | `1` | Examples per optimiser step. Raise it while the machine has memory spare; a larger batch is steadier and finishes sooner |
| `--max-seq-len` | `<MAX_SEQ_LEN>` | `512` | Tokens per example. Anything longer is truncated, so set this to the length your corpus actually needs rather than to the model's maximum |
| `--epochs` | `<EPOCHS>` | `1` | Passes over the corpus. One is usually right for distillation: the soft labels carry far more signal per example than hard ones |
| `--learning-rate` | `<LEARNING_RATE>` | `0.0001` | Optimiser step size. Lower it if the loss moves erratically; the default is the one design 009 measured on corpora of this shape |
| `--checkpoint-every-steps` | `<CHECKPOINT_EVERY_STEPS>` | `20` | How often the run writes a checkpoint it could resume from. Every checkpoint costs disk and a pause; a long run wants them, a short one does not |

## Notes

Teacher and student in one command: the teacher **scores the answers your corpus already has**, position by position, and the student trains on those scores. It does not write answers — a corpus of questions alone is refused, naming the first line that is short. The teacher must be served; the student need not be.

## Examples

```bash
$ diffuse-coordinator distill --teacher qwen2.5-3b --student qwen2.5-0.5b-instruct --as berichte-klein berichte.jsonl
```

```
corpus     berichte (2 412 examples, imported)
  labels     qwen2.5-3b scores your answers; it does not write any
  labels     about 450 MiB on disk (2412 rows x k=64 x 512 tokens)
  training qwen2.5-0.5b-instruct on the soft labels
  job 7c31a8 started

Watch it:  diffuse-coordinator job watch 7c31a8
```

---

[← All commands](index.md)
