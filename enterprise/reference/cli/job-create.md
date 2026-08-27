# `diffuse-coordinator job create`

Start a LoRA fine-tuning run.

## Synopsis

```
diffuse-coordinator job create [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--model` | `<MODEL>` | — | The base model, as shown by `model list` |
| `--dataset` | `<DATASET>` | — | The training data, as shown by `dataset list` |
| `--pool` | `<POOL>` | — | Which pool to place it in. Every healthy node by default |
| `--as` | `<ADAPTER_KEY>` | — | What to call the adapter. Derived from the model and the data by default |
| `--rank` | `<RANK>` | `16` | LoRA rank. Higher learns more and costs more |
| `--alpha` | `<ALPHA>` | `32` | LoRA alpha; the merged delta is scaled by alpha/rank |
| `--targets` | `<TARGETS>` | `q_proj,v_proj` | Which projections to adapt, comma separated |
| `--learning-rate` | `<LEARNING_RATE>` | `0.0001` | Optimiser step size. Lower it if the loss moves erratically rather than settling; raise it only with a suite to check the result against |
| `--batch` | `<BATCH>` | `1` | Examples per step. The activation term scales with this |
| `--max-seq-len` | `<MAX_SEQ_LEN>` | `512` | Tokens per example. Longer examples are truncated, which changes what is learned — the run says so when it happens |
| `--epochs` | `<EPOCHS>` | `1` | Passes over the corpus. More than three on a small corpus usually memorises it — `eval` against a held-out suite is how you tell |
| `--max-steps` | `<MAX_STEPS>` | `0` | Stop after this many steps, whatever the data says. Zero means one pass |
| `--seed` | `<SEED>` | `0` | Seed for shuffling and initialisation. Zero picks one and records it on the job, so a run is reproducible without having chosen to be |
| `--gradient-checkpointing` | flag | — | Trade compute for memory: about 40% of the activation term, at roughly 30% more time per step |
| `--checkpoint-every-steps` | `<CHECKPOINT_EVERY_STEPS>` | `20` | Write a checkpoint every N steps. A machine taken back costs at most this many steps |

## Notes

The explicit path, when you want to choose the hyperparameters yourself.

## Examples

```bash
$ diffuse-coordinator job create --model qwen2.5-3b --dataset berichte --as berichte-v1 --rank 32 --epochs 4
```

```
job 4f2a9c created and queued.
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
