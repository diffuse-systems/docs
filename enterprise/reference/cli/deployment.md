# `diffuse-coordinator deployment`

Inspect and tear down deployments.

## What you do with it

A deployment is a model placed on machines: whole on one, or cut into slices
across several.

### See what is served, and where

```bash
sudo diffuse-coordinator deployment list
```

[`deployment list`](deployment-list.md). Under the table, a deployment that is
not ready says what each machine is doing and, only when nothing recovers it by
itself, the line that places the model again.

### A machine was switched off

Nothing to do if it comes back: its slice reloads by itself. If it will not
come back, run the line `deployment list` printed, which places the model on
the machines that are here:

```bash
sudo diffuse-coordinator deployment list
sudo diffuse-coordinator deployment rm qwen2.5-3b-nere9 && sudo diffuse-coordinator model serve qwen2.5-3b --pool lab
```

[`deployment list`](deployment-list.md) · [`deployment rm`](deployment-rm.md) ·
[`model serve`](model-serve.md)

### Serve another model instead

One model is served at a time. Take the current one off, then place the next:

```bash
sudo diffuse-coordinator deployment rm qwen2.5-3b-nere9
sudo diffuse-coordinator model serve berichte-7b --pool lab
```

[`deployment rm`](deployment-rm.md) · [`model serve`](model-serve.md). The
weights stay installed until [`model rm`](model-rm.md).

## Synopsis

```
diffuse-coordinator deployment <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`list`](deployment-list.md) | List deployments and their slices |
| [`rm`](deployment-rm.md) | Tear a deployment down |

---

[← All commands](index.md)
