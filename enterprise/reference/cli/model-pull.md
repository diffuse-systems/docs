# `diffuse-coordinator model pull`

Fetch a model: a name from the catalogue, or a repository on a hub.

## Synopsis

```
diffuse-coordinator model pull <REFERENCE> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `REFERENCE` | text | yes | e.g. HuggingFaceTB/SmolLM2-135M-Instruct |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--revision <REVISION>` | text | - | Branch, tag or commit. Resolved to a commit and recorded as one |
| `--as <MODEL_KEY>` | text | - | Slug to file it under. Derived from the reference by default |
| `--quantization <QUANTIZATION>` | text | - | Which quantisation to take, when a repository publishes several |
| `--no-precheck` | switch | - | Fetch even when no machine here has the memory to serve the result |

And the [connection options](index.md#connection-options).

## Notes

Fetches from the publisher and installs into this deployment's model store. The download happens once, on the coordinator; nodes take only the shards of the layers they are given. A transfer the network cuts is resumed where it stopped.

## Examples

```bash
$ diffuse-coordinator model pull Qwen/Qwen2.5-3B-Instruct --as qwen2.5-3b
```

```
  resolving Qwen/Qwen2.5-3B-Instruct@main
  README.md
   10%  624.5 MiB of 5.8 GiB
   20%  1.2 GiB of 5.8 GiB
  […]
   92%  5.3 GiB of 5.8 GiB
Model qwen2.5-3b acquired.
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
