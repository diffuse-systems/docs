# `diffuse-coordinator dataset rm`

Remove a dataset, unless a job or an adapter still points at it.

## Synopsis

```
diffuse-coordinator dataset rm <DATASET_KEY> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `DATASET_KEY` | text | yes | The dataset key, as shown by `dataset list` |

## Options

Only the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator dataset rm berichte
```

```
Dataset berichte removed.
```

---

[← `diffuse-coordinator dataset`](dataset.md) · [All commands](index.md)
