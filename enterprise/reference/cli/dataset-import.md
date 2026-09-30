# `diffuse-coordinator dataset import`

Ingest a file the coordinator can read.

## Synopsis

```
diffuse-coordinator dataset import [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--from <PATH>` | text | - | The file, as a path on the coordinator |
| `--as <DATASET_KEY>` | text | - | Slug to file it under. Derived from the file name by default |
| `--format <FORMAT>` | text | `chat` | `chat` for training data, `eval` for a suite with expected answers |
| `--classification <CLASSIFICATION>` | text | - | **Required.** What this data is, in your organisation's own words |
| `--retention-days <RETENTION_DAYS>` | integer | `0` | Delete it after this many days. Zero keeps it until removed |

And the [connection options](index.md#connection-options).

## Notes

JSONL, one example per line. The coordinator records what you declared it is: it does not inspect your data to guess. `--format eval` imports an evaluation suite: each line a conversation with the answer it expects, under `expected`.

## Examples

```bash
$ diffuse-coordinator dataset import --from berichte.jsonl --as berichte --classification internal
```

```
Imported berichte (2412 rows).

  classification  internal
  sha256          9f2c4b8e0d1a7c3f5e6b2d9a8c7f1e0b3d5a6c9e2f4b7d8a1c3e5f7a9b0c2d4e
  source          file:///srv/corpora/berichte.jsonl
```

---

[← `diffuse-coordinator dataset`](dataset.md) · [All commands](index.md)
