# `diffuse-node-agent status`

What this machine knows about itself. Reads local files only and talks to nobody, so it answers on a machine that has been cut off for a week.

## Synopsis

```
diffuse-node-agent status
```

## Notes

**Local files only: it opens no connection.** The moment an operator most wants to run this is the moment the network is the problem, so it answers on a machine that has been cut off for a week, and says when it was cut off.

## Examples

```bash
$ diffuse-node-agent status
```

```
node-04
  coordinator  https://coordinator.internal:7443
  identity     valid until 2026-11-27, renews automatically
  last seen    2s ago
```

---

[← All commands](index.md)
