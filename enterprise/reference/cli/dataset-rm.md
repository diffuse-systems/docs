# `diffuse-coordinator dataset rm`

Remove a dataset, unless a job or an adapter still points at it.

## Synopsis

```
diffuse-coordinator dataset rm <DATASET_KEY> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `DATASET_KEY` | yes | The dataset key, as shown by `dataset list` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Examples

```bash
$ diffuse-coordinator dataset rm berichte
```

```
berichte removed. The adapters trained from it are untouched.
```

---

[← `diffuse-coordinator dataset`](dataset.md) · [All commands](index.md)
