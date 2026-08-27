# `diffuse-coordinator adapter list`

List adapters with the whole chain behind each one.

## Synopsis

```
diffuse-coordinator adapter list [OPTIONS]
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
| `--json` | flag | - | The older spelling of `--output json` |

## Examples

```bash
$ diffuse-coordinator adapter list
```

```
ADAPTER       BASE        RANK  EXAMPLES  FINAL LOSS  JOB     CREATED
berichte-v1   qwen2.5-3b  32    2412      0.97        4f2a9c  2026-08-26 10:25:00Z
```

---

[← `diffuse-coordinator adapter`](adapter.md) · [All commands](index.md)
