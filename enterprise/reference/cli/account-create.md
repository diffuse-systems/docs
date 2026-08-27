# `diffuse-coordinator account create`

Create an account with a one-time password.

## Synopsis

```
diffuse-coordinator account create <LOGIN> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `LOGIN` | yes | The login, as it will appear in the audit trail |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--name` | `<NAME>` | — | The person's name, for a table an operator reads |
| `--role` | `<ROLE>` | `developer` | owner, admin, operator, developer or auditor |

## Notes

The one-time password is printed once and may only be used to set another.

## Examples

```bash
$ diffuse-coordinator account create jonas.pfleger --role developer
```

```
Account jonas.pfleger created, role developer.
  one-time password   M4ZP0X9D3TBK7QW2
  It may only be used to set another one.
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
