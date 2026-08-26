# `diffuse-coordinator job list`

List runs, newest first.

## Synopsis

```
diffuse-coordinator job list [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--output` | `table` \| `json` | `table` | Output format |
| `--json` | flag | — | The older spelling of `--output json` |

## Examples

```bash
$ diffuse-coordinator job list
```

```
JOB     KIND      BASE        STATE     PROGRESS  STARTED
4f2a9c  finetune  qwen2.5-3b  running   2/4       2026-08-26 10:02:10Z
1b7e33  distill   qwen2.5-3b  finished  4/4       2026-08-25 16:40:00Z
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
