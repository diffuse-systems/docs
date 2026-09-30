# `diffuse-coordinator model`

Acquire, inspect and place models.

## What you do with it

### Serve a model from the catalogue

The catalogue is sixteen models this release was verified with, each asked a
question it cannot answer by luck. Listing it needs no network;
[`model run`](model-run.md) fetches one from its publisher, checks its digest
and serves it:

```bash
diffuse-coordinator model list --available
sudo diffuse-coordinator model run qwen2.5:3b --pool lab
```

[`model list`](model-list.md) · [`model run`](model-run.md)

### Take a model from Hugging Face

A public repository, by its name; [`model pull`](model-pull.md) records the
exact revision. A safetensors repository is served by the reference backend,
which can also split it across machines, when its architecture is one that
backend is [proven on](../../model-support.md#two-backends-two-rules). Any
other is refused rather than computed and possibly wrong, and `model pull`
says so as soon as it has the files:

```bash
sudo diffuse-coordinator model pull Qwen/Qwen2.5-3B-Instruct --as qwen2.5-3b
sudo diffuse-coordinator model serve qwen2.5-3b --pool lab
```

[`model pull`](model-pull.md) · [`model serve`](model-serve.md)

### Choose a quantised build to serve

A GGUF repository publishes several quantisations of the same model. Name the
one you want; it runs whole on the fast backend, in far less memory than the
full weights:

```bash
sudo diffuse-coordinator model pull Qwen/Qwen2.5-7B-Instruct-GGUF --quantization Q4_K_M --as qwen2.5-7b-q4
sudo diffuse-coordinator model serve qwen2.5-7b-q4 --pool lab
```

[`model pull`](model-pull.md) · [`model serve`](model-serve.md)

### Bring a model you already have

For a machine with no route to the Internet. The coordinator reads the file as
its own service user, so put it where that user can read it, not in a home
directory. A GGUF is one file; a safetensors model is a directory with
`config.json`, the weights and the tokenizer:

```bash
sudo mkdir -p /var/lib/diffuse-models
sudo cp berichte-7b.Q4_K_M.gguf /var/lib/diffuse-models/
sudo diffuse-coordinator model import --from /var/lib/diffuse-models/berichte-7b.Q4_K_M.gguf --as berichte-7b
sudo diffuse-coordinator model import --from /var/lib/diffuse-models/qwen2.5-3b --as qwen2.5-3b-local
```

[`model import`](model-import.md)

### Serve it whole, or across several machines

By default a model is served whole on the machine with the most room. A
safetensors model can be cut into slices, one per machine, as a pipeline: ask
for it with both flags, or allow it as the way out when no single machine holds
the model:

```bash
sudo diffuse-coordinator model serve qwen2.5-3b --pool lab
sudo diffuse-coordinator model serve qwen2.5-14b --pool lab --nodes 2 --allow-split
sudo diffuse-coordinator model serve qwen2.5-14b --pool lab --allow-split
```

[`model serve`](model-serve.md). A GGUF is never split: llama.cpp runs a model
whole.

### See what is installed and what is served

```bash
sudo diffuse-coordinator model list
sudo diffuse-coordinator deployment list
```

[`model list`](model-list.md) shows each model's format, backend and whether it
can be split; [`deployment list`](deployment-list.md) where each served model
runs, slice by slice.

### Remove a model

Take it off the endpoint first, then delete its weights:

```bash
sudo diffuse-coordinator deployment rm qwen2.5-3b-nere9
sudo diffuse-coordinator model rm qwen2.5-3b
```

[`deployment rm`](deployment-rm.md) · [`model rm`](model-rm.md)

### When no machine has the memory

A machine takes a model only when it needs at most 90% of the memory that
machine has free, and the refusal gives both numbers. Four ways out, cheapest
first: a smaller quantised build, a shorter context, a pipeline across
machines, or a pool whose machines have more room:

```bash
sudo diffuse-coordinator model pull Qwen/Qwen2.5-7B-Instruct-GGUF --quantization Q4_K_M --as qwen2.5-7b-q4
sudo diffuse-coordinator model serve qwen2.5-7b --pool lab --context 2048
sudo diffuse-coordinator model serve qwen2.5-7b --pool lab --allow-split
sudo diffuse-coordinator model serve qwen2.5-7b --pool gpu
```

[`model pull`](model-pull.md) · [`model serve`](model-serve.md)

## Synopsis

```
diffuse-coordinator model <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`import`](model-import.md) | Ingest a model from a .gguf file or a safetensors directory. The path for a coordinator with no internet route, which is most of them in a regulated deployment |
| [`pull`](model-pull.md) | Fetch a model: a name from the catalogue, or a repository on a hub |
| [`run`](model-run.md) | Fetch a model and serve it: the two commands most people want as one |
| [`list`](model-list.md) | List acquired models and their provenance |
| [`rm`](model-rm.md) | Remove a model and its index |
| [`serve`](model-serve.md) | Place a model on the nodes of a pool |

---

[← All commands](index.md)
