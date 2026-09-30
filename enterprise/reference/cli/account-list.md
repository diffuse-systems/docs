# `diffuse-coordinator account list`

List the accounts.

## Synopsis

```
diffuse-coordinator account list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator account list
```

```
LOGIN             NAME  ROLE       SOURCE  STATE                 LAST LOGIN            CREATED BY
jonas.pfleger     -     developer  local   must change password  never                 user/marie.chercheuse
marie.chercheuse  -     owner      local   active                2026-08-26 10:00:00Z  local/bootstrap
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
