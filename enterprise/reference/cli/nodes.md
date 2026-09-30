# `diffuse-coordinator nodes`

List the nodes this coordinator currently sees.

## Synopsis

```
diffuse-coordinator nodes [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--wide` | switch | - | Show the policy each node carries and when its certificate expires |
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator nodes
```

```
NODE          POOL  HEALTH   CORES  RAM       ACCELERATOR  LAST SEEN  LICENSED
rechner-01    lab   healthy  16     62.7 GiB  RTX 4090     0.8s       yes
rechner-02    lab   healthy  8      31.3 GiB  -            1.2s       yes
```

---

[← All commands](index.md)
