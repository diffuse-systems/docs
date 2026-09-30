# `diffuse-coordinator model rm`

Remove a model and its index.

## Synopsis

```
diffuse-coordinator model rm <MODEL_KEY> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `MODEL_KEY` | text | yes | The model key, as shown by `model list` |

## Options

Only the [connection options](index.md#connection-options).

## Notes

Refused while the model is served: tear the deployment down first with `deployment rm`, so that removing weights can never be what takes an endpoint off the air.

## Examples

```bash
$ diffuse-coordinator model rm allgemein
```

```
Model allgemein removed.
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
