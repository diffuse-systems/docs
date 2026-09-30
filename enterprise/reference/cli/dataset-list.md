# `diffuse-coordinator dataset list`

List datasets and what they were declared as.

## Synopsis

```
diffuse-coordinator dataset list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |
| `--json` | switch | - | The older spelling of `--output json` |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator dataset list
```

```
DATASET        ROWS  SIZE     CLASSIFICATION  IMPORTED              BY
berichte       2412  3.1 MiB  internal        2026-08-26 09:30:12Z  user/marie
berichte-test  124   88 KiB   internal        2026-08-26 09:31:40Z  user/marie
```

---

[← `diffuse-coordinator dataset`](dataset.md) · [All commands](index.md)
