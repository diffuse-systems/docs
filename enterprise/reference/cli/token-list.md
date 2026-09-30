# `diffuse-coordinator token list`

List tokens by handle. Secrets are not stored and cannot be shown.

## Synopsis

```
diffuse-coordinator token list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--all` | switch | - | Include spent, expired and revoked tokens |
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator token list
```

```
HANDLE    STATE  POOL  USES  EXPIRES               LABELS  CREATED BY
7QW2M4ZP  live   lab   3/40  2026-08-27 09:14:02Z  -       admin/local
```

---

[← `diffuse-coordinator token`](token.md) · [All commands](index.md)
