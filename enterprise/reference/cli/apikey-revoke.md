# `diffuse-coordinator apikey revoke`

Revoke a key. Effective on the very next request.

## Synopsis

```
diffuse-coordinator apikey revoke <HANDLE> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `HANDLE` | text | yes | The key handle, as shown by `apikey list` |

## Options

Only the [connection options](index.md#connection-options).

## Notes

Effective on the very next request: there is no cache in front of this.

## Examples

```bash
$ diffuse-coordinator apikey revoke 8QW2M4ZP
```

```
API key 8QW2M4ZP revoked. It stops working on the very next request.
```

---

[← `diffuse-coordinator apikey`](apikey.md) · [All commands](index.md)
