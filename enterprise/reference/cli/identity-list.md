# `diffuse-coordinator identity list`

List the people this deployment knows.

## Synopsis

```
diffuse-coordinator identity list [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--output <OUTPUT>` | one of `table`, `json` | `table` | Output format |

And the [connection options](index.md#connection-options).

## Examples

```bash
$ diffuse-coordinator identity list
```

```
SUBJECT                   ADDRESS                    STATE   SCOPE        IMPORTED              BY
6a8edf7b6bc7078da8fac79b  marie@klinik.example       active  every model  2026-08-26 09:12:40Z  admin/local
6a8edf7b6bc7078da8fac7a4  jonas@klinik.example       active  patienten    2026-08-26 09:12:40Z  admin/local
```

---

[← `diffuse-coordinator identity`](identity.md) · [All commands](index.md)
