# `diffuse-coordinator job get`

One run in full, with the sentence explaining where it is.

## Synopsis

```
diffuse-coordinator job get <JOB_ID> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `JOB_ID` | yes | The job id, as shown by `job list` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--output` | `table` \| `json` | `table` | Output format |

## Examples

```bash
$ diffuse-coordinator job get 4f2a9c
```

```
job       4f2a9c
kind      finetune
base      qwen2.5-3b
dataset   berichte (2 412 examples)
adapter   berichte-v1
state     running, epoch 2 of 4
node      rechner-01
started   2026-08-26 10:02:10Z
loss      1.94 → 1.31
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
