# `diffuse-coordinator model list`

List acquired models and their provenance.

## Synopsis

```
diffuse-coordinator model list [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--available` | flag | - | Show what this build can fetch by name, rather than what is installed |
| `--output` | `table` \| `json` | `table` | Output format |

## Examples

```bash
$ diffuse-coordinator model list
```

```
MODEL       ARCH   FORMAT       QUANT  BACKEND    SPLIT           LAYERS  SIZE       LICENCE
allgemein   llama  safetensors  -      reference  layer_pipeline  30      269.0 MiB  apache-2.0
qwen2.5-3b  qwen2  safetensors  -      reference  layer_pipeline  36      6.2 GiB    apache-2.0
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
