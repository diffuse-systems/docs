# `diffuse-coordinator apikey list`

List keys by handle. Secrets are not stored and cannot be shown.

## Synopsis

```
diffuse-coordinator apikey list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--all` | switch | - | Include expired and revoked keys |
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator apikey list
```

```
HANDLE    STATE  NAME        EXPIRES               SCOPE                   OWNER      LAST USED             CREATED BY
8QW2M4ZP  live   abrechnung  2026-11-24 09:20:00Z  every model             marie      2026-08-26 09:41:02Z  user/marie
4KPFWJV8  live   portal      never                 gateway, acts as users  - unowned  2026-08-26 10:02:55Z  admin/local

  4KPFWJV8 (portal) belongs to no account, so nothing it does can be attributed to a person. Re-issue it from an account that owns it, and revoke this one.
```

---

[← `diffuse-coordinator apikey`](apikey.md) · [All commands](index.md)
