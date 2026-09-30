# `diffuse-coordinator account disable`

Switch an account off, and revoke everything it is holding.

## Synopsis

```
diffuse-coordinator account disable <LOGIN> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `LOGIN` | text | yes | Which account |

## Options

Only the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator account disable jonas.pfleger
```

```
jonas.pfleger is disabled and every session it held has been revoked.
Their API keys are not: `diffuse-coordinator apikey list` shows what they hold, in its OWNER
column, so that revoking each one is a decision somebody makes.
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
