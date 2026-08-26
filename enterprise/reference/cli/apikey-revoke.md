# `diffuse-coordinator apikey revoke`

Revoke a key. Effective on the very next request.

## Synopsis

```
diffuse-coordinator apikey revoke <HANDLE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `HANDLE` | yes | The key handle, as shown by `apikey list` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Notes

Effective on the very next request: there is no cache in front of this.

## Examples

```bash
$ diffuse-coordinator apikey revoke 8QW2M4ZP
```

```
API key 8QW2M4ZP revoked. It stops working on the very next request.
```

---

[← `diffuse-coordinator apikey`](apikey.md) · [All commands](index.md)
