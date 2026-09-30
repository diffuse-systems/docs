# `diffuse-coordinator session revoke`

End somebody else's session, now.

## Synopsis

```
diffuse-coordinator session revoke <HANDLE> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `HANDLE` | text | yes | The handle, as `session list` shows it |

## Options

Only the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator session revoke 9N903BGH
```

```
Session 9N903BGH is revoked. The next call it makes is refused.
```

---

[← `diffuse-coordinator session`](session.md) · [All commands](index.md)
