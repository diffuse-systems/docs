# `diffuse-coordinator job watch`

Follow a run until it ends, then say what to do with the result.

## Synopsis

```
diffuse-coordinator job watch <JOB_ID> [OPTIONS]
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

## Notes

Follows a running job until it finishes. Safe to interrupt: the run continues.

## Examples

```bash
$ diffuse-coordinator job watch 4f2a9c
```

```
epoch 1/4  loss 1.94  ██████░░░░░░░░░░░░░░  25%
  epoch 2/4  loss 1.31  ████████████░░░░░░░░  50%
  epoch 3/4  loss 1.08  ██████████████████░░  75%
  epoch 4/4  loss 0.97  ████████████████████ 100%

finished in 22m 41s. Adapter berichte-v1 is ready.
  diffuse-coordinator eval qwen2.5-3b --adapter berichte-v1 --suite berichte-test
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
