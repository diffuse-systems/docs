# `diffuse-coordinator identity import`

Import people from a CSV file. Idempotent: run it again after a change.

## Synopsis

```
diffuse-coordinator identity import <FILE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `FILE` | yes | The CSV file. Columns: subject, address, models, pool |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Notes

A CSV of `subject,address,models,pool`. `subject` is the stable identifier your chat interface knows a person by, not their address. An empty `models` column means every served model. Running it again updates people rather than duplicating them, and never re-enables somebody you disabled.

## Examples

```bash
$ diffuse-coordinator identity import users.csv
```

```
2 identities imported from users.csv.
  1 of them may call every model this deployment serves, which is what an empty
  `models` column means.
```

---

[← `diffuse-coordinator identity`](identity.md) · [All commands](index.md)
