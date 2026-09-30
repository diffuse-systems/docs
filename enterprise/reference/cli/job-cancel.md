# `diffuse-coordinator job cancel`

Ask a run to stop at the next step boundary, keeping its checkpoint.

## Synopsis

```
diffuse-coordinator job cancel <JOB_ID> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `JOB_ID` | text | yes | The job id, as shown by `job list` |

## Options

Only the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator job cancel job-4f2a9c
```

```
Job job-4f2a9c will stop at the next step boundary, with its checkpoint intact.
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
