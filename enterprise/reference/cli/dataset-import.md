# `diffuse-coordinator dataset import`

Ingest a file the coordinator can read.

## Synopsis

```
diffuse-coordinator dataset import [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--from` | `<PATH>` | — | The file, as a path on the coordinator |
| `--as` | `<DATASET_KEY>` | — | Slug to file it under. Derived from the file name by default |
| `--format` | `<FORMAT>` | `chat` | `chat` for training data, `eval` for a suite with expected answers |
| `--classification` | `<CLASSIFICATION>` | — | **Required.** What this data is, in your organisation's own words |
| `--retention-days` | `<RETENTION_DAYS>` | `0` | Delete it after this many days. Zero keeps it until removed |

## Notes

JSONL, one example per line. The coordinator records what you declared it is — it does not inspect your data to guess.

## Examples

```bash
$ diffuse-coordinator dataset import --from berichte.jsonl --as berichte
```

```
berichte imported.
  2 412 examples, 3.1 MiB
  format    chat
  checksum  sha256:9f2c…
```

---

[← `diffuse-coordinator dataset`](dataset.md) · [All commands](index.md)
