# `diffuse-coordinator finetune`

Fine-tune a model on a file, in one command.

Imports the corpus, chooses hyperparameters from its size and the machine, and starts the run. Does not serve the result: the command for that is printed when it finishes.

## Synopsis

```
diffuse-coordinator finetune <MODEL> <FILE> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `MODEL` | text | yes | The model to adapt, as shown by `model list` |
| `FILE` | text | yes | The corpus: one JSON object per line, each with a `messages` array |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--classification <CLASSIFICATION>` | text | `internal` | What this data is, in your organisation's own words |
| `--as-dataset <DATASET_KEY>` | text | - | Import the corpus under this name rather than the file's own |
| `--as <ADAPTER_KEY>` | text | - | What to call the adapter. Derived from the model and the corpus by default |
| `--pool <POOL>` | text | - | Which pool to place it in. Every healthy node by default |
| `--rank <RANK>` | integer | - | LoRA rank. Higher learns more and costs more |
| `--alpha <ALPHA>` | integer | - | LoRA alpha; the merged delta is scaled by alpha/rank. Twice the rank by default |
| `--targets <TARGETS>` | text | - | Which projections to adapt, comma separated |
| `--epochs <EPOCHS>` | integer | - | Passes over the corpus. Chosen from its size by default |
| `--learning-rate <LEARNING_RATE>` | number | - | Step size |
| `--batch <BATCH>` | integer | - | Examples per step |
| `--max-seq-len <MAX_SEQ_LEN>` | integer | - | Tokens per example. Taken from the longest row by default |

And the [connection options](index.md#connection-options).

## Notes

The one-command path: it imports the corpus, chooses hyperparameters from its size and from the machine, and starts the run. It does not serve the result: `model serve <base>+<adapter>` does that, once you have looked at the losses.

## Examples

```bash
$ diffuse-coordinator finetune qwen2.5-3b berichte.jsonl
```

```
  dataset    berichte (2412 examples, imported)
  method     LoRA r=16, 1 epoch, lr 2e-4        [defaults]
  placement  rechner-01, needs 9.4 GiB of 29.1 GiB free
  estimate   about 40 minutes

Started. Follow it with:
    diffuse-coordinator job watch job-7d3k1q
```

---

[← All commands](index.md)
