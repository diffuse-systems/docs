# `diffuse-coordinator licence show`

Show the licence this coordinator is running under.

## Synopsis

```
diffuse-coordinator licence show [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator licence show
```

```
  organisation  Klinik Beispiel
  licence       lic-2027-0142
  edition       enterprise
  issued        2026-06-30 09:12:00Z
  expires       2027-06-30 00:00:00Z  (live)
  nodes         2 of 8 active
  features      training, distillation, sso
  signed by     diffuse-licence-2026a
```

---

[← `diffuse-coordinator licence`](licence.md) · [All commands](index.md)
