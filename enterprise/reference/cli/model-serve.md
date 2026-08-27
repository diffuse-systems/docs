# `diffuse-coordinator model serve`

Place a model on the nodes of a pool.

.

Under `model` rather than at the top level: `diffuse-coordinator serve` has meant "run the coordinator" since milestone 0, and it is in every script, unit file and test. Overloading the most-used command so that its meaning depends on whether a positional argument is present is the kind of ambiguity one typo away from starting the wrong thing.

## Synopsis

```
diffuse-coordinator model serve <MODEL_KEY> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `MODEL_KEY` | yes | The model key, as shown by `model list` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--pool` | `<POOL>` | - | Which pool to draw nodes from. Every healthy node by default |
| `--nodes` | `<NODES>` | `0` | How many nodes to split across, when splitting is the answer |
| `--context` | `<CONTEXT>` | `0` | Context the memory estimate is made against |
| `--allow-split` | flag | - | Permit the pipeline fallback when no single machine holds the model |

## Notes

Places the model across the pool and waits for it to be ready. The slice plan is the coordinator's; you choose the pool and, if you want, how many machines it may use.

## Examples

```bash
$ diffuse-coordinator model serve qwen2.5-3b --pool lab
```

```
planning across pool lab
  2 slices: rechner-01 layers 0..18, rechner-02 layers 18..36
  ready in 41s

qwen2.5-3b is served. Give developers /etc/diffuse/ca.crt and any OpenAI client
works unchanged against https://coordinator.internal:8443/v1, see API.md.
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
