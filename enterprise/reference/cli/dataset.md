# `diffuse-coordinator dataset`

Import and inspect training data. Customer data, declared not detected.

## What you do with it

Training data, as JSONL. The coordinator records what you declare it is and
does not read it to guess.

### Import a corpus

The classification is required: your organisation's own words for what the
data is. A retention deletes it after that many days.

```bash
sudo diffuse-coordinator dataset import --from /srv/corpora/berichte.jsonl --as berichte --classification personal-data --retention-days 180
```

[`dataset import`](dataset-import.md). The file is read by the coordinator, so
its path is one on the coordinator's machine.

### Import an evaluation suite

Each line carries the answer it expects, under `expected`:

```bash
sudo diffuse-coordinator dataset import --from /srv/corpora/berichte-test.jsonl --as berichte-test --format eval --classification internal
```

[`dataset import`](dataset-import.md), then [`eval`](eval.md).

### See and remove datasets

```bash
sudo diffuse-coordinator dataset list
sudo diffuse-coordinator dataset rm berichte-test
```

[`dataset list`](dataset-list.md) · [`dataset rm`](dataset-rm.md): refused
while a job or an adapter still points at it.

## Synopsis

```
diffuse-coordinator dataset <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`import`](dataset-import.md) | Ingest a file the coordinator can read |
| [`list`](dataset-list.md) | List datasets and what they were declared as |
| [`rm`](dataset-rm.md) | Remove a dataset, unless a job or an adapter still points at it |

---

[← All commands](index.md)
