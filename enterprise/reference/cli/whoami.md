# `diffuse-coordinator whoami`

Who this session belongs to, and what it may do.

## Synopsis

```
diffuse-coordinator whoami [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator whoami
```

```
  login       marie.chercheuse
  role        owner
  identity    acc_DYKQC2AHYZKDJDBV
  source      local

  may:        nodes:read, nodes:revoke, tokens:read, tokens:create, tokens:revoke, models:read, […]
```

---

[← All commands](index.md)
