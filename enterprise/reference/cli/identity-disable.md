# `diffuse-coordinator identity disable`

Stop a gateway acting for somebody, keeping the trail that names them.

## Synopsis

```
diffuse-coordinator identity disable <SUBJECT> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `SUBJECT` | text | yes | The subject, as shown by `identity list` |

## Options

Only the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator identity disable 6a8edf7b6bc7078da8fac7a4
```

```
6a8edf7b6bc7078da8fac7a4 disabled. A gateway asking to act for them is refused
from the next request; everything the trail already records about them stays.
```

---

[← `diffuse-coordinator identity`](identity.md) · [All commands](index.md)
