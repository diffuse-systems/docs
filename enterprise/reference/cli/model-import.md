# `diffuse-coordinator model import`

Ingest a model from a directory. The path for a coordinator with no internet route, which is most of them in a regulated deployment.

## Synopsis

```
diffuse-coordinator model import [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--from` | `<DIRECTORY>` | — | Directory holding config.json, the safetensors files and the tokenizer. Read by the coordinator, so the path is the coordinator's |
| `--as` | `<MODEL_KEY>` | — | Slug to file it under. Derived from the directory name by default |

## Notes

For a model whose provenance you established yourself — an export from your own training, or a directory you audited. Takes safetensors or GGUF.

## Examples

```bash
$ diffuse-coordinator model import --from /srv/models/smollm2-135m --as allgemein
```

```
allgemein imported.
  arch      llama
  format    safetensors
  layers    30
  size      269.0 MiB
  licence   apache-2.0
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
