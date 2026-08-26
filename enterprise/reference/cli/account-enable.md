# `diffuse-coordinator account enable`

Switch it back on.

## Synopsis

```
diffuse-coordinator account enable <LOGIN> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `LOGIN` | yes | Which account |

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
$ diffuse-coordinator account enable jonas.pfleger
```

```
jonas.pfleger enabled. They may sign in again.
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
