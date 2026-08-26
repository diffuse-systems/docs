# `diffuse-coordinator identity list`

List the people this deployment knows.

## Synopsis

```
diffuse-coordinator identity list [OPTIONS]
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
$ diffuse-coordinator identity list
```

```
SUBJECT                   ADDRESS                    STATE   SCOPE        IMPORTED              BY
6a8edf7b6bc7078da8fac79b  marie@klinik.example       active  every model  2026-08-26 09:12:40Z  admin/local
6a8edf7b6bc7078da8fac7a4  jonas@klinik.example       active  patienten    2026-08-26 09:12:40Z  admin/local
```

---

[← `diffuse-coordinator identity`](identity.md) · [All commands](index.md)
