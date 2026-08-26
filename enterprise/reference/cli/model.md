# `diffuse-coordinator model`

Acquire, inspect and place models.

## Synopsis

```
diffuse-coordinator model <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`import`](model-import.md) | Ingest a model from a directory. The path for a coordinator with no internet route, which is most of them in a regulated deployment |
| [`pull`](model-pull.md) | Fetch a model: a name from the catalogue, or a repository on a hub |
| [`run`](model-run.md) | Fetch a model and serve it — the two commands most people want as one |
| [`list`](model-list.md) | List acquired models and their provenance |
| [`rm`](model-rm.md) | Remove a model and its index |
| [`serve`](model-serve.md) | Place a model on the nodes of a pool |

---

[← All commands](index.md)
