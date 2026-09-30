# `diffuse-coordinator model list`

List acquired models and their provenance.

## Synopsis

```
diffuse-coordinator model list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--available` | switch | - | Show what this build can fetch by name, rather than what is installed |
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

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
