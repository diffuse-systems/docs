# `diffuse-coordinator deployment list`

List deployments and their slices.

## Synopsis

```
diffuse-coordinator deployment list [OPTIONS]
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

## Examples

```bash
$ diffuse-coordinator deployment list
```

```
DEPLOYMENT        MODEL       STATE  SLICE  LAYERS  NODE        SIZE
qwen2.5-3b-nere9  qwen2.5-3b  ready  0      0..18   rechner-01  3.1 GiB
                                     1      18..36  rechner-02  3.1 GiB
```

---

[← `diffuse-coordinator deployment`](deployment.md) · [All commands](index.md)
