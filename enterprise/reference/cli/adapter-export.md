# `diffuse-coordinator adapter export`

Write an adapter's own bytes somewhere you keep them.

## Synopsis

```
diffuse-coordinator adapter export <ADAPTER_KEY> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `ADAPTER_KEY` | yes | The adapter key, as shown by `adapter list` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--out` | `<OUT>` | `.` | Directory to write `adapter_model.safetensors` and `adapter_config.json` into. What comes out is what `peft` reads, so it loads anywhere |

## Notes

The adapter is yours: trained on your corpus, on your machines. Export works whatever the licence says.

## Examples

```bash
$ diffuse-coordinator adapter export berichte-v1 --to ./berichte-v1.tar.gz
```

```
berichte-v1 exported to ./berichte-v1.tar.gz (84.2 MiB)
  base       qwen2.5-3b
  rank       32
  job        4f2a9c
```

---

[← `diffuse-coordinator adapter`](adapter.md) · [All commands](index.md)
