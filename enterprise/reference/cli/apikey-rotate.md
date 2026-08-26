# `diffuse-coordinator apikey rotate`

Issue the next key in place of one, and put the old one on a clock.

## Synopsis

```
diffuse-coordinator apikey rotate <HANDLE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `HANDLE` | yes | The key handle to replace, as shown by `apikey list` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--overlap` | `<OVERLAP>` | `24h` | How long the old key keeps working, e.g. 24h. Default: 24h |

## Notes

Issues the next credential with the same name, scope and rights, and puts the old one on a clock. Move your integration over inside the overlap and nobody sees an outage. `--overlap 0` revokes the old one at once, which is right for a leak.

## Examples

```bash
$ diffuse-coordinator apikey rotate 4KPFWJV8 --overlap 24h
```

```
API key 9SRHEWM5 created; it replaces 4KPFWJV8.
  same name, same scope, same rights: a rotation changes the secret and nothing else.
  4KPFWJV8 keeps working until 2026-08-27 10:30:00Z — move your integration over
  before then, and it never sees an outage.

dfe_sk_9SRHEWM5P8P5Q881DM2MBK8B6MCGWBHC2DM3Y
```

---

[← `diffuse-coordinator apikey`](apikey.md) · [All commands](index.md)
