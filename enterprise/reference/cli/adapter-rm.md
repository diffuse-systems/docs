# `diffuse-coordinator adapter rm`

Remove an adapter.

## Synopsis

```
diffuse-coordinator adapter rm <ADAPTER_KEY> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `ADAPTER_KEY` | text | yes | The adapter key, as shown by `adapter list` |

## Options

Only the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator adapter rm berichte-v1
```

```
Adapter berichte-v1 removed.
```

---

[← `diffuse-coordinator adapter`](adapter.md) · [All commands](index.md)
