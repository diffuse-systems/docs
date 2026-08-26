# `diffuse-coordinator job cancel`

Ask a run to stop at the next step boundary, keeping its checkpoint.

## Synopsis

```
diffuse-coordinator job cancel <JOB_ID> [OPTIONS]
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

## Examples

```bash
$ diffuse-coordinator job cancel 4f2a9c
```

```
job 4f2a9c cancelled. The partial adapter is discarded.
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
