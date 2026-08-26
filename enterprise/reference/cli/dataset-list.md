# `diffuse-coordinator dataset list`

List datasets and what they were declared as.

## Synopsis

```
diffuse-coordinator dataset list [OPTIONS]
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
$ diffuse-coordinator dataset list
```

```
DATASET   EXAMPLES  SIZE     FORMAT  IMPORTED
berichte  2412      3.1 MiB  chat    2026-08-26 09:30:12Z
```

---

[← `diffuse-coordinator dataset`](dataset.md) · [All commands](index.md)
