# `diffuse-coordinator password`

Change this account's own password.

## Synopsis

```
diffuse-coordinator password [OPTIONS]
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
$ diffuse-coordinator password
```

```
current password:
new password:
confirm:

Changed. Every other session this account held has been ended.
```

---

[← All commands](index.md)
