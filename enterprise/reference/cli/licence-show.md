# `diffuse-coordinator licence show`

Show the licence this coordinator is running under.

## Synopsis

```
diffuse-coordinator licence show [OPTIONS]
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
$ diffuse-coordinator licence show
```

```
organisation  Klinik Beispiel
edition       enterprise
nodes         8 (2 enrolled)
features      training, distillation, fast-backend, sso
expires       2027-06-30 00:00:00Z
grace         30 days after that
state         live
```

---

[← `diffuse-coordinator licence`](licence.md) · [All commands](index.md)
