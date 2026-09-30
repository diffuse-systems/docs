# `diffuse-coordinator node revoke`

Revoke a node identity: refuse it at every call and evict it now.

## Synopsis

```
diffuse-coordinator node revoke <NODE_ID> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `NODE_ID` | text | yes | The node id, as shown by `nodes` |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--reason <REASON>` | text | `` | Why. Free text, shown in `node list-revoked`: this is the field that answers the question six months from now |

And the [connection options](index.md#connection-options).

## Notes

The node is refused at its next call and leaves the live registry at once. Its name is retired; the machine comes back with a fresh token, under a new name.

## Examples

```bash
$ diffuse-coordinator node revoke rechner-02 --reason "returned to IT"
```

```
Node rechner-02 revoked and removed from the cluster.
Its certificate is refused from now on; the name is retired and will not be
issued again. To bring the machine back, enrol it with a fresh token.
```

---

[← `diffuse-coordinator node`](node.md) · [All commands](index.md)
