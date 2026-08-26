# `diffuse-coordinator account list`

List the accounts.

## Synopsis

```
diffuse-coordinator account list [OPTIONS]
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
$ diffuse-coordinator account list
```

```
LOGIN             ROLE      SOURCE  STATE     LAST SEEN
owner             owner     local   active    2026-08-26 09:00:00Z
marie.chercheuse  operator  local   active    2026-08-26 10:00:00Z
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
