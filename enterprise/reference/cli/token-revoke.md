# `diffuse-coordinator token revoke`

Revoke a token.

## Synopsis

```
diffuse-coordinator token revoke <HANDLE> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `HANDLE` | text | yes | The token handle, as shown by `token list` |

## Options

Only the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator token revoke 7QW2M4ZP
```

```
Token 7QW2M4ZP revoked. It can enrol nothing further.
```

---

[← `diffuse-coordinator token`](token.md) · [All commands](index.md)
