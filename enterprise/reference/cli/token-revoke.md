# `diffuse-coordinator token revoke`

Revoke a token.

## Synopsis

```
diffuse-coordinator token revoke <HANDLE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `HANDLE` | yes | The token handle, as shown by `token list` |

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
$ diffuse-coordinator token revoke 7QW2M4ZP
```

```
Join token 7QW2M4ZP revoked. It enrols nothing from now on.
```

---

[← `diffuse-coordinator token`](token.md) · [All commands](index.md)
