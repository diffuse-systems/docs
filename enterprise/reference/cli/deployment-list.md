# `diffuse-coordinator deployment list`

List deployments and their slices.

## Synopsis

```
diffuse-coordinator deployment list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Notes

Under the table, for a deployment that is not ready: what each machine is doing, and, only when nothing recovers it by itself, the line that places the model again on the machines that are here.

## Examples

```bash
$ diffuse-coordinator deployment list
```

```
DEPLOYMENT        MODEL       PLACEMENT         STATE  SLICE  LAYERS  NODE        SIZE
qwen2.5-3b-nere9  qwen2.5-3b  split (fallback)  ready  0      0..18   rechner-01  3.1 GiB
                                                       1      18..36  rechner-02  3.1 GiB
```

---

[← `diffuse-coordinator deployment`](deployment.md) · [All commands](index.md)
