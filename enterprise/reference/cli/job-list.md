# `diffuse-coordinator job list`

List runs, newest first.

## Synopsis

```
diffuse-coordinator job list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |
| `--json` | switch | - | The older spelling of `--output json` |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator job list
```

```
JOB             KIND      STATE      MODEL                  DATA      STEPS      LOSS   NODE
job-4f2a9c      train     running    qwen2.5-3b             berichte  4121/9648  1.310  rechner-01
distill-1b7e33  distill   completed  qwen2.5-0.5b-instruct  berichte  3/3        -      -
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
