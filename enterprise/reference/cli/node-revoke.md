# `diffuse-coordinator node revoke`

Revoke a node identity: refuse it at every call and evict it now.

## Synopsis

```
diffuse-coordinator node revoke <NODE_ID> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `NODE_ID` | yes | The node id, as shown by `nodes` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--reason` | `<REASON>` | `` | Why. Free text, shown in `node list-revoked` — this is the field that answers the question six months from now |

## Notes

The node is refused at its next call and leaves the live registry at once.

## Examples

```bash
$ diffuse-coordinator node revoke rechner-02 --reason "returned to IT"
```

```
Node rechner-02 revoked. Its certificate is refused from the next call.
```

---

[← `diffuse-coordinator node`](node.md) · [All commands](index.md)
