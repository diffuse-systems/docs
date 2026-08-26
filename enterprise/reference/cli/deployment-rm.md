# `diffuse-coordinator deployment rm`

Tear a deployment down.

.

**`rm`, like everything else.** Tokens, API keys and models are all removed with `rm`; this was the one `delete` in the product, which is the kind of inconsistency an operator discovers by having a command refused. `delete` still works and is hidden, so nobody's script breaks.

## Synopsis

```
diffuse-coordinator deployment rm <DEPLOYMENT_ID> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `DEPLOYMENT_ID` | yes | The deployment id, as shown by `deployment list` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Notes

Takes the model off the endpoint. The weights stay in the model store.

## Examples

```bash
$ diffuse-coordinator deployment rm qwen2.5-3b-nere9
```

```
qwen2.5-3b-nere9 torn down. The model is still installed.
```

---

[← `diffuse-coordinator deployment`](deployment.md) · [All commands](index.md)
