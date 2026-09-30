# `diffuse-coordinator model serve`

Place a model on the nodes of a pool.

Under `model` rather than at the top level: `diffuse-coordinator serve` has meant "run the coordinator" since milestone 0, and it is in every script, unit file and test. Overloading the most-used command so that its meaning depends on whether a positional argument is present is the kind of ambiguity one typo away from starting the wrong thing.

## Synopsis

```
diffuse-coordinator model serve <MODEL_KEY> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `MODEL_KEY` | text | yes | The model key, as shown by `model list` |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--pool <POOL>` | text | - | Which pool to draw nodes from. Every healthy node by default |
| `--nodes <NODES>` | integer | `0` | Split across exactly this many machines, as a pipeline |
| `--context <CONTEXT>` | integer | `0` | Context the memory estimate is made against |
| `--allow-split` | switch | - | Permit a pipeline: across `--nodes` machines when given, and otherwise as the fallback when no single machine holds the model |

And the [connection options](index.md#connection-options).

## Notes

Places the model and returns: each machine fetches its slice on its next heartbeat, and requests are refused until the weights are in place. The slice plan is the coordinator's; you choose the pool and, if you want, a pipeline across a number of machines, `--nodes N --allow-split`.

## Examples

```bash
$ diffuse-coordinator model serve qwen2.5-3b --pool lab
```

```
Deployed qwen2.5-3b.

  placement   whole (RAM)
  reason      rechner-01 holds 7.9 GiB (weights 5.8 GiB + KV 288.0 MiB at context 4096 × 4 session(s) + 1.1 GiB overhead, +10% headroom) in RAM (29.1 GiB free)
  context     4096

  slice 0   layers   0..36   rechner-01         5.8 GiB    whole model

Nodes fetch their slice on the next heartbeat, so requests are refused
until the weights are in place: seconds for a small model, minutes for
a large one. `nodes --wide` shows the slice appear.

Call it with this name:

    qwen2.5-3b

A request you can paste, once the slice is loaded and you have a key
from `apikey create`:

    curl https://coordinator.internal:8443/v1/chat/completions \
      --cacert /etc/diffuse/ca.crt \
      -H "Authorization: Bearer $DIFFUSE_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{"model":"qwen2.5-3b","messages":[{"role":"user","content":"Hello"}]}'

  Give developers /etc/diffuse/ca.crt and any OpenAI client works
  unchanged against https://coordinator.internal:8443/v1, see API.md.
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
