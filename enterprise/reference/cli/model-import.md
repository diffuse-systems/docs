# `diffuse-coordinator model import`

Ingest a model from a .gguf file or a safetensors directory. The path for a coordinator with no internet route, which is most of them in a regulated deployment.

## Synopsis

```
diffuse-coordinator model import [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--from <PATH>` | text | - | A .gguf file, or a directory holding config.json, the safetensors files and the tokenizer. Read by the coordinator, so the path is the coordinator's |
| `--as <MODEL_KEY>` | text | - | Slug to file it under. Derived from the file or directory name by default |

And the [connection options](index.md#connection-options).

## Notes

For a model whose provenance you established yourself: an export from your own training, or a directory you audited. Takes safetensors or GGUF.

## Examples

```bash
$ diffuse-coordinator model import --from /srv/models/smollm2-135m --as allgemein
```

```
Model allgemein acquired.

  architecture   llama
  layers         30
  hidden size    576
  placement      llama is a dense stack of homogeneous layers
  embeddings     tied (the output head is the input embedding)
  size           256.6 MiB
  source         file:///srv/models/smollm2-135m
  config sha256  8f1074d170033a66ecc137c365475b3ada4b8fe5ab8cde7e2aa66919eea914d3
  licence        apache-2.0
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
