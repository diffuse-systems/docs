# `diffuse-coordinator nodes`

List the nodes this coordinator currently sees.

## Synopsis

```
diffuse-coordinator nodes [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--wide` | flag | - | Show the policy each node carries and when its certificate expires |
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--output` | `table` \| `json` | `table` | Output format |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Examples

```bash
$ diffuse-coordinator nodes
```

```
NODE          POOL  HEALTH   CORES  RAM       ACCELERATOR  LAST SEEN  LICENSED
rechner-01    lab   healthy  16     62.7 GiB  RTX 4090     0.8s       yes
rechner-02    lab   healthy  8      31.3 GiB  -            1.2s       yes
```

---

[← All commands](index.md)
