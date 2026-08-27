# `diffuse-coordinator finetune`

Fine-tune a model on a file, in one command.

.

Imports the corpus, chooses hyperparameters from its size and the machine, and starts the run. Does not serve the result: the command for that is printed when it finishes.

## Synopsis

```
diffuse-coordinator finetune <MODEL> <FILE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `MODEL` | yes | The model to adapt, as shown by `model list` |
| `FILE` | yes | The corpus: one JSON object per line, each with a `messages` array |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--classification` | `<CLASSIFICATION>` | `internal` | What this data is, in your organisation's own words |
| `--as-dataset` | `<DATASET_KEY>` | - | Import the corpus under this name rather than the file's own |
| `--as` | `<ADAPTER_KEY>` | - | What to call the adapter. Derived from the model and the corpus by default |
| `--pool` | `<POOL>` | - | Which pool to place it in. Every healthy node by default |
| `--rank` | `<RANK>` | - | LoRA rank. Higher learns more and costs more |
| `--alpha` | `<ALPHA>` | - | LoRA alpha; the merged delta is scaled by alpha/rank. Twice the rank by default |
| `--targets` | `<TARGETS>` | - | Which projections to adapt, comma separated |
| `--epochs` | `<EPOCHS>` | - | Passes over the corpus. Chosen from its size by default |
| `--learning-rate` | `<LEARNING_RATE>` | - | Step size |
| `--batch` | `<BATCH>` | - | Examples per step |
| `--max-seq-len` | `<MAX_SEQ_LEN>` | - | Tokens per example. Taken from the longest row by default |

## Notes

The one-command path: it imports the corpus, chooses hyperparameters from its size and from the machine, and starts the run. It does not serve the result: `model serve <base>+<adapter>` does that, once you have looked at the losses.

## Examples

```bash
$ diffuse-coordinator finetune qwen2.5-3b berichte.jsonl
```

```
imported 2 412 examples
  rank 16, lr 1e-4, 3 epochs, batch 4, chosen from the corpus and rechner-01
  job 4f2a9c started

Watch it:  diffuse-coordinator job watch 4f2a9c
```

---

[← All commands](index.md)
