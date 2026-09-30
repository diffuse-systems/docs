# `diffuse-coordinator job get`

One run in full, with the sentence explaining where it is.

## Synopsis

```
diffuse-coordinator job get <JOB_ID> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `JOB_ID` | text | yes | The job id, as shown by `job list` |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator job get job-4f2a9c
```

```
  job          job-4f2a9c
  kind         train
  state        running
  model        qwen2.5-3b
  data         berichte
  adapter      berichte-v1
  node         rechner-01
  steps        4121 of 9648
  memory       estimated 9.6 GiB, measured 8.1 GiB
  created      2026-08-26 10:02:10Z by user/marie

training on rechner-01
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
