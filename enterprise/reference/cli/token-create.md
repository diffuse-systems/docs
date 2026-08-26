# `diffuse-coordinator token create`

Issue a join token and print the line to paste onto a machine.

## Synopsis

```
diffuse-coordinator token create [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--pool` | `<POOL>` | — | Scheduling pool the enrolled machines join |
| `--labels` | `<LABELS>` | — | Labels, written key=value,key=value |
| `--schedule` | `<SCHEDULE>` | — | When the machines declare themselves available, e.g. "Mo-Fr 19:00-07:00". Recorded and displayed; nothing enforces it yet |
| `--max-uses` | `<MAX_USES>` | `1` | How many machines may enrol with this token |
| `--ttl` | `<TTL>` | `1h` | How long the token lives, e.g. 1h, 48h, 7d |

## Notes

The full token is printed once. The coordinator keeps only a hash of its secret and cannot show it again.

## Examples

```bash
$ diffuse-coordinator token create --pool lab --max-uses 40 --ttl 24h
```

```
Join token 7QW2M4ZP created.
  40 uses, expires 2026-08-27 09:14:02Z
  this is the only time the full token is shown.

Paste this on a machine you want to enrol:

curl -sSL https://coordinator.internal:7444/join | sh -s -- --token DFE1-7QW2M4ZP-...
```

---

[← `diffuse-coordinator token`](token.md) · [All commands](index.md)
