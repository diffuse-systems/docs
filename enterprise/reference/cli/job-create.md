# `diffuse-coordinator job create`

Start a LoRA fine-tuning run.

## Synopsis

```
diffuse-coordinator job create [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--model <MODEL>` | text | - | The base model, as shown by `model list` |
| `--dataset <DATASET>` | text | - | The training data, as shown by `dataset list` |
| `--pool <POOL>` | text | - | Which pool to place it in. Every healthy node by default |
| `--as <ADAPTER_KEY>` | text | - | What to call the adapter. Derived from the model and the data by default |
| `--rank <RANK>` | integer | `16` | LoRA rank. Higher learns more and costs more |
| `--alpha <ALPHA>` | integer | `32` | LoRA alpha; the merged delta is scaled by alpha/rank |
| `--targets <TARGETS>` | text | `q_proj,v_proj` | Which projections to adapt, comma separated |
| `--learning-rate <LEARNING_RATE>` | number | `0.0001` | Optimiser step size. Lower it if the loss moves erratically rather than settling; raise it only with a suite to check the result against |
| `--batch <BATCH>` | integer | `1` | Examples per step. The activation term scales with this |
| `--max-seq-len <MAX_SEQ_LEN>` | integer | `512` | Tokens per example. Longer examples are truncated, which changes what is learned: the run says so when it happens |
| `--epochs <EPOCHS>` | integer | `1` | Passes over the corpus. More than three on a small corpus usually memorises it: `eval` against a held-out suite is how you tell |
| `--max-steps <MAX_STEPS>` | integer | `0` | Stop after this many steps, whatever the data says. Zero means one pass |
| `--seed <SEED>` | integer | `0` | Seed for shuffling and initialisation. Zero picks one and records it on the job, so a run is reproducible without having chosen to be |
| `--gradient-checkpointing` | switch | - | Trade compute for memory: about 40% of the activation term, at roughly 30% more time per step |
| `--checkpoint-every-steps <CHECKPOINT_EVERY_STEPS>` | integer | `20` | Write a checkpoint every N steps. A machine taken back costs at most this many steps |

And the [connection options](index.md#connection-options).

## Notes

The explicit path, when you want to choose the hyperparameters yourself.

## Examples

```bash
$ diffuse-coordinator job create --model qwen2.5-3b --dataset berichte --as berichte-v1 --rank 32 --epochs 4
```

```
Job job-4f2a9c created.

  job          job-4f2a9c
  kind         train
  state        queued
  model        qwen2.5-3b
  data         berichte
  adapter      berichte-v1
  node         rechner-01
  steps        0 of 9648
  memory       estimated 9.6 GiB
  created      2026-08-26 10:02:10Z by user/marie

queued for rechner-01

Follow it with `diffuse-coordinator job get job-4f2a9c`.
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
