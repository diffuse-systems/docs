# `diffuse-coordinator account role`

Change what somebody may do. Ends their sessions.

## Synopsis

```
diffuse-coordinator account role <LOGIN> <ROLE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `LOGIN` | yes | Whose role to change |
| `ROLE` | yes | owner, admin, operator, developer or auditor |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Notes

Changing a role ends that account's sessions, so the new role is what they get.

## Examples

```bash
$ diffuse-coordinator account role jonas.pfleger --role operator
```

```
jonas.pfleger is now an operator. Their sessions have been ended.
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
