# `diffuse-coordinator job watch`

Follow a run until it ends, then say what to do with the result.

## Synopsis

```
diffuse-coordinator job watch <JOB_ID> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `JOB_ID` | text | yes | The job id, as shown by `job list` |

## Options

Only the [connection options](index.md#connection-options).

## Notes

Follows a run until it ends, then says what to do with the result: how to serve it and how to measure it. Safe to interrupt: the run continues.

## Examples

```bash
$ diffuse-coordinator job watch job-4f2a9c
```

```
queued on rechner-01   0s
step 2412/9648   loss 2.11 -> 1.402   9m51s
step 4824/9648   loss 2.11 -> 1.188   19m40s
step 9648/9648   loss 2.11 -> 0.971   39m22s

Adapter: berichte-v1

Serve it:
    diffuse-coordinator model serve qwen2.5-3b+berichte-v1
Then call it as "qwen2.5-3b-berichte-v1" in /v1.

To measure it rather than eyeball it, import a suite and score both sides:
    diffuse-coordinator dataset import --from <file>.jsonl --format eval \
        --classification internal
    diffuse-coordinator eval <suite> --model qwen2.5-3b+berichte-v1
```

---

[← `diffuse-coordinator job`](job.md) · [All commands](index.md)
