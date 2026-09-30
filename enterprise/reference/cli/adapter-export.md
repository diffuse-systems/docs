# `diffuse-coordinator adapter export`

Write an adapter's own bytes somewhere you keep them.

## Synopsis

```
diffuse-coordinator adapter export <ADAPTER_KEY> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `ADAPTER_KEY` | text | yes | The adapter key, as shown by `adapter list` |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--out <OUT>` | path | `.` | Directory to write `adapter_model.safetensors` and `adapter_config.json` into. What comes out is what `peft` reads, so it loads anywhere |

And the [connection options](index.md#connection-options).

## Notes

The adapter is yours: trained on your corpus, on your machines. Export works whatever the licence says. It writes the adapter's own files into a directory, in the layout PEFT reads.

## Examples

```bash
$ diffuse-coordinator adapter export berichte-v1 --out /srv/adapters/berichte-v1
```

```
Exported berichte-v1 to /srv/adapters/berichte-v1.
  adapter_model.safetensors  14.2 MiB
  adapter_config.json  1.1 KiB
```

---

[← `diffuse-coordinator adapter`](adapter.md) · [All commands](index.md)
