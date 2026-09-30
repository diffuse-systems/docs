# `diffuse-coordinator session list`

Who is signed in.

## Synopsis

```
diffuse-coordinator session list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator session list
```

```
HANDLE    LOGIN             SINCE                 EXPIRES               LAST USED             WHERE FROM
9N903BGH  marie.chercheuse  2026-08-26 10:00:00Z  2026-08-26 22:00:00Z  2026-08-26 10:41:02Z  10.4.0.19:51182
```

---

[← `diffuse-coordinator session`](session.md) · [All commands](index.md)
