# `diffuse-coordinator identity enable`

Let a gateway act for somebody again.

## Synopsis

```
diffuse-coordinator identity enable <SUBJECT> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `SUBJECT` | yes | The subject, as shown by `identity list` |

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
$ diffuse-coordinator identity enable 6a8edf7b6bc7078da8fac7a4
```

```
6a8edf7b6bc7078da8fac7a4 enabled. A gateway may act for them again on the next request.
```

---

[← `diffuse-coordinator identity`](identity.md) · [All commands](index.md)
