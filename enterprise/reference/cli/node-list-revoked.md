# `diffuse-coordinator node list-revoked`

List revoked node identities.

## Synopsis

```
diffuse-coordinator node list-revoked [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator node list-revoked
```

```
NODE        REVOKED               REASON
rechner-02  2026-08-26 14:02:11Z  returned to IT
```

---

[← `diffuse-coordinator node`](node.md) · [All commands](index.md)
