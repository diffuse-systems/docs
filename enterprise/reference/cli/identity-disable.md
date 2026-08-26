# `diffuse-coordinator identity disable`

Stop a gateway acting for somebody, keeping the trail that names them.

## Synopsis

```
diffuse-coordinator identity disable <SUBJECT> [OPTIONS]
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
$ diffuse-coordinator identity disable 6a8edf7b6bc7078da8fac7a4
```

```
6a8edf7b6bc7078da8fac7a4 disabled. A gateway asking to act for them is refused
from the next request; everything the trail already records about them stays.
```

---

[← `diffuse-coordinator identity`](identity.md) · [All commands](index.md)
