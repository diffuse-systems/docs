# `diffuse-coordinator adapter`

Inspect the adapters runs produced, with their provenance.

## What you do with it

An adapter is what a fine-tuning or a distillation produced, with the chain
behind it: base model, dataset, classification, job.

### See the adapters and where they came from

```bash
sudo diffuse-coordinator adapter list
```

[`adapter list`](adapter-list.md), with the evaluation score when one was run.

### Take one elsewhere

```bash
sudo diffuse-coordinator adapter export berichte-v1 --out /srv/adapters/berichte-v1
```

[`adapter export`](adapter-export.md) writes its files in the layout PEFT
reads. It works whatever the licence says: what you trained is yours.

### Serve one

```bash
sudo diffuse-coordinator model serve qwen2.5-3b+berichte-v1 --pool lab
```

[`model serve`](model-serve.md): requests then name
`qwen2.5-3b-berichte-v1`.

### Remove one

```bash
sudo diffuse-coordinator adapter rm berichte-v1
```

[`adapter rm`](adapter-rm.md)

## Synopsis

```
diffuse-coordinator adapter <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`list`](adapter-list.md) | List adapters with the whole chain behind each one |
| [`export`](adapter-export.md) | Write an adapter's own bytes somewhere you keep them |
| [`rm`](adapter-rm.md) | Remove an adapter |

---

[← All commands](index.md)
