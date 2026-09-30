# `diffuse-coordinator adapter list`

List adapters with the whole chain behind each one.

## Synopsis

```
diffuse-coordinator adapter list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |
| `--json` | switch | - | The older spelling of `--output json` |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator adapter list
```

```
ADAPTER      BASE        DATASET   CLASSIFICATION  STEPS  SIZE      EVAL
berichte-v1  qwen2.5-3b  berichte  internal        9648   14.2 MiB  exact_match 0.41→0.63 (+0.22)
```

---

[← `diffuse-coordinator adapter`](adapter.md) · [All commands](index.md)
