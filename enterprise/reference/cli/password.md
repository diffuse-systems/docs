# `diffuse-coordinator password`

Change this account's own password.

## Synopsis

```
diffuse-coordinator password [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator password
```

```
Current password:
New password:
New password again:
Password changed. Every session of this account has been ended, including this one.
  diffuse-coordinator login
```

---

[← All commands](index.md)
