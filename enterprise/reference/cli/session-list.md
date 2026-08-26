# `diffuse-coordinator session list`

Who is signed in.

## Synopsis

```
diffuse-coordinator session list [OPTIONS]
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
$ diffuse-coordinator session list
```

```
SESSION   ACCOUNT           FROM           SINCE                 EXPIRES
b7e33a1f  marie.chercheuse  10.4.0.19      2026-08-26 10:00:00Z  2026-08-27 10:00:00Z
```

---

[← `diffuse-coordinator session`](session.md) · [All commands](index.md)
