# `diffuse-coordinator identity`

Register the people a chat facade may act for.

## Synopsis

```
diffuse-coordinator identity <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`import`](identity-import.md) | Import people from a CSV file. Idempotent: run it again after a change |
| [`list`](identity-list.md) | List the people this deployment knows |
| [`disable`](identity-disable.md) | Stop a gateway acting for somebody, keeping the trail that names them |
| [`enable`](identity-enable.md) | Let a gateway act for somebody again |

---

[← All commands](index.md)
