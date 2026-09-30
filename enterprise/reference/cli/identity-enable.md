# `diffuse-coordinator identity enable`

Let a gateway act for somebody again.

## Synopsis

```
diffuse-coordinator identity enable <SUBJECT> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `SUBJECT` | text | yes | The subject, as shown by `identity list` |

## Options

Only the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator identity enable 6a8edf7b6bc7078da8fac7a4
```

```
6a8edf7b6bc7078da8fac7a4 enabled. A gateway may act for them again on the next request.
```

---

[← `diffuse-coordinator identity`](identity.md) · [All commands](index.md)
