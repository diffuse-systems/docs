# `diffuse-coordinator deployment rm`

Tear a deployment down.

**`rm`, like everything else.** Tokens, API keys and models are all removed with `rm`; this was the one `delete` in the product, which is the kind of inconsistency an operator discovers by having a command refused. `delete` still works and is hidden, so nobody's script breaks.

## Synopsis

```
diffuse-coordinator deployment rm <DEPLOYMENT_ID> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `DEPLOYMENT_ID` | text | yes | The deployment id, as shown by `deployment list` |

## Options

Only the [connection options](index.md#connection-options).

## Notes

Takes the model off the endpoint. The weights stay in the model store.

## Examples

```bash
$ diffuse-coordinator deployment rm qwen2.5-3b-nere9
```

```
Deployment qwen2.5-3b-nere9 deleted.
```

---

[← `diffuse-coordinator deployment`](deployment.md) · [All commands](index.md)
