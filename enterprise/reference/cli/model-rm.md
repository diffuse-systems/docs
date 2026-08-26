# `diffuse-coordinator model rm`

Remove a model and its index.

## Synopsis

```
diffuse-coordinator model rm <MODEL_KEY> [OPTIONS]
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

## Notes

Refused while the model is served: tear the deployment down first with `deployment rm`, so that removing weights can never be what takes an endpoint off the air.

## Examples

```bash
$ diffuse-coordinator model rm allgemein
```

```
allgemein removed. 269.0 MiB freed on the coordinator.
```

---

[← `diffuse-coordinator model`](model.md) · [All commands](index.md)
