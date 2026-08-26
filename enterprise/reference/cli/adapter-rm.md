# `diffuse-coordinator adapter rm`

Remove an adapter.

## Synopsis

```
diffuse-coordinator adapter rm <ADAPTER_KEY> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `ADAPTER_KEY` | yes | The adapter key, as shown by `adapter list` |

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
$ diffuse-coordinator adapter rm berichte-v1
```

```
berichte-v1 removed. Its training job stays on the audit trail.
```

---

[← `diffuse-coordinator adapter`](adapter.md) · [All commands](index.md)
