# `diffuse-coordinator job`

Start, watch and stop fine-tuning runs.

## Synopsis

```
diffuse-coordinator job <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`create`](job-create.md) | Start a LoRA fine-tuning run |
| [`list`](job-list.md) | List runs, newest first |
| [`get`](job-get.md) | One run in full, with the sentence explaining where it is |
| [`watch`](job-watch.md) | Follow a run until it ends, then say what to do with the result |
| [`cancel`](job-cancel.md) | Ask a run to stop at the next step boundary, keeping its checkpoint |

---

[← All commands](index.md)
