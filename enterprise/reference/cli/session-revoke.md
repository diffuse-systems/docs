# `diffuse-coordinator session revoke`

End somebody else's session, now.

## Synopsis

```
diffuse-coordinator session revoke <HANDLE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `HANDLE` | yes | The handle, as `session list` shows it |

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
$ diffuse-coordinator session revoke b7e33a1f
```

```
Session b7e33a1f revoked. That terminal is signed out.
```

---

[← `diffuse-coordinator session`](session.md) · [All commands](index.md)
