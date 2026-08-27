# `diffuse-coordinator model run`

Fetch a model and serve it: the two commands most people want as one.

.

`pull` then `serve`, with the pull skipped when the model is already here. It exists because "get me a model running" is one intention, and splitting it across two commands means an operator who does the first and forgets the second has a coordinator holding weights and serving nothing.

## Synopsis

```
diffuse-coordinator model run <REFERENCE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `REFERENCE` | yes | A catalogue name (`qwen2.5:7b`), a hub repository, or a model already installed here |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--quantization` | `<QUANTIZATION>` | - | Which quantisation to take, when a repository publishes several |
| `--pool` | `<POOL>` | - | Which pool to draw nodes from. Every healthy node by default |
| `--nodes` | `<NODES>` | `0` | How many nodes to split across, when splitting is the answer |
| `--context` | `<CONTEXT>` | `0` | Context the memory estimate is made against |
| `--allow-split` | flag | - | Permit the pipeline fallback when no single machine holds the model |
| `--no-precheck` | flag | - | Fetch without checking first whether it fits and whether something else is served |

## Notes

One generation from the terminal, for checking a model is alive.

## Examples

```bash
$ diffuse-coordinator model run qwen2.5-3b
```

```
Ein Kernspintomograph ist ein bildgebendes Verfahren, das starke Magnetfelder …

  24 prompt + 96 completion tokens in 1.9s (50 tok/s), rechner-01
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
