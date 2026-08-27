# `diffuse-coordinator token list`

List tokens by handle. Secrets are not stored and cannot be shown.

## Synopsis

```
diffuse-coordinator token list [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--all` | flag | - | Include spent, expired and revoked tokens |
| `--output` | `table` \| `json` | `table` | Output format |

## Examples

```bash
$ diffuse-coordinator token list
```

```
HANDLE    STATE  POOL  USES   EXPIRES               CREATED BY
7QW2M4ZP  live   lab   3/40   2026-08-27 09:14:02Z  admin/local
```

---

[← `diffuse-coordinator token`](token.md) · [All commands](index.md)
