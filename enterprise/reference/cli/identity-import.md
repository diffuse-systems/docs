# `diffuse-coordinator identity import`

Import people from a CSV file. Idempotent: run it again after a change.

## Synopsis

```
diffuse-coordinator identity import <FILE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `FILE` | yes | The CSV file. Columns: subject, address, models, pool |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Notes

**The whole format, because it exists nowhere else.** Four columns, in this order:

```
# subject,address,models,pool
#
# subject  the stable identifier your chat interface knows a person by, not
#          their address. It is what a gateway asserts, so it has to match
#          exactly. Required; a row without one is refused by line number.
# address  what an operator reads in `identity list`. Optional, never used
#          for authorisation. Quote it if it contains a comma.
# models   models this person may call, separated by `;`. Empty means every
#          model this deployment serves.
# pool     restrict them to one pool. Empty means no restriction.
subject,address,models,pool
6a8edf7b6bc7078da8fac79b,marie@klinik.example,,
6a8edf7b6bc7078da8fac7a4,jonas@klinik.example,patienten-7b,
6a8edf7b6bc7078da8fac7b1,"Weber, Anke <anke@klinik.example>",allgemein;patienten-7b,lab
```

**The header is optional.** It is skipped when its first field is `subject`, and a file without one is read from its first line: half the exports a directory produces have a header and half do not. Blank lines and lines starting with `#` are ignored, so the comments above can stay in the file you keep. Fields may be quoted with `"`, and `""` is a literal quote.

Running it again updates people rather than duplicating them, and never re-enables somebody you disabled.

## Examples

```bash
$ diffuse-coordinator identity import users.csv
```

```
2 identities imported from users.csv.
  1 of them may call every model this deployment serves, which is what an empty
  `models` column means.
```

---

[← `diffuse-coordinator identity`](identity.md) · [All commands](index.md)
