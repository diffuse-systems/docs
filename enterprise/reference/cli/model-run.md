# `diffuse-coordinator model run`

Fetch a model and serve it: the two commands most people want as one.

`pull` then `serve`, with the pull skipped when the model is already here. It exists because "get me a model running" is one intention, and splitting it across two commands means an operator who does the first and forgets the second has a coordinator holding weights and serving nothing.

## Synopsis

```
diffuse-coordinator model run <REFERENCE> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `REFERENCE` | text | yes | A catalogue name (`qwen2.5:7b`), a hub repository, or a model already installed here |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--quantization <QUANTIZATION>` | text | - | Which quantisation to take, when a repository publishes several |
| `--pool <POOL>` | text | - | Which pool to draw nodes from. Every healthy node by default |
| `--nodes <NODES>` | integer | `0` | Split across exactly this many machines, as a pipeline. Needs `--allow-split`: `--nodes` alone is refused, never ignored |
| `--context <CONTEXT>` | integer | `0` | Context the memory estimate is made against |
| `--allow-split` | switch | - | Permit a pipeline: across `--nodes` machines when given, and otherwise as the fallback when no single machine holds the model |
| `--no-precheck` | switch | - | Fetch without checking first whether it fits and whether something else is served |

And the [connection options](index.md#connection-options).

## Notes

`pull` when the model is not here yet, then `serve`: the two commands most people want as one. A catalogue name is served under the model key it is filed as, and the output says which.

## Examples

```bash
$ diffuse-coordinator model run qwen2.5-3b
```

```
qwen2.5-3b is already here; placing it.

Deployed qwen2.5-3b.

  placement   whole (RAM)
  reason      rechner-01 holds 7.9 GiB (weights 5.8 GiB + KV 288.0 MiB at context 4096 × 4 session(s) + 1.1 GiB overhead, +10% headroom) in RAM (29.1 GiB free)
  context     4096

  slice 0   layers   0..36   rechner-01         5.8 GiB    whole model

[… the rest is what `model serve` prints …]
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
