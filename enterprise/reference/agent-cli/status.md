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
identity     node-04
certificate  expires in 71 days
coordinator  https://coordinator.internal:7443
last beat    2s ago
registered   3h ago
pool         lab
serving      qwen2.5-3b  layers 0..18  ready
```

---

[← All commands](index.md)
