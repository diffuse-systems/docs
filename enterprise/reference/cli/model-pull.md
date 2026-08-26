# `diffuse-coordinator model pull`

Fetch a model: a name from the catalogue, or a repository on a hub.

## Synopsis

```
diffuse-coordinator model pull <REFERENCE> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `REFERENCE` | yes | e.g. HuggingFaceTB/SmolLM2-135M-Instruct |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--revision` | `<REVISION>` | — | Branch, tag or commit. Resolved to a commit and recorded as one |
| `--as` | `<MODEL_KEY>` | — | Slug to file it under. Derived from the reference by default |
| `--quantization` | `<QUANTIZATION>` | — | Which quantisation to take, when a repository publishes several |
| `--no-precheck` | flag | — | Fetch even when no machine here has the memory to serve the result |

## Notes

Fetches from the publisher and installs into this deployment's model store. The download happens once, on the coordinator; nodes take only the shards of the layers they are given.

## Examples

```bash
$ diffuse-coordinator model pull Qwen/Qwen2.5-3B-Instruct --as qwen2.5-3b
```

```
resolving Qwen/Qwen2.5-3B-Instruct
  6 files, 6.2 GiB
  [####################] 6.2 GiB / 6.2 GiB

qwen2.5-3b imported. Serve it with:
  diffuse-coordinator model serve qwen2.5-3b --pool lab
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
