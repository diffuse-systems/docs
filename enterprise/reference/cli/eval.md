# `diffuse-coordinator eval`

Score a base model against a fine-tune on a suite.

## Synopsis

```
diffuse-coordinator eval <SUITE_KEY> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `SUITE_KEY` | text | yes | The suite, imported with `dataset import --format eval` |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--model <MODEL>` | text | - | What to score: `<model>` or `<model>+<adapter>` |
| `--pool <POOL>` | text | - | Which pool to run it in |
| `--metric <METRIC>` | text | `exact_match` | How a completion is compared: exact_match or contains |
| `--max-tokens <MAX_TOKENS>` | integer | `32` | How far to generate before giving up on a row |

And the [connection options](index.md#connection-options).

## Notes

Scores the base model and the fine-tune on the same suite, so the number you read is a comparison and not an absolute.

## Examples

```bash
$ diffuse-coordinator eval berichte-test --model qwen2.5-3b+berichte-v1
```

```
  0 of 248 rows
  124 of 248 rows
  248 of 248 rows

qwen2.5-3b+berichte-v1 vs qwen2.5-3b   on berichte-test (124 rows)

  exact_match   base 0.41   tuned 0.63   +0.22
  evaluated in 3m11s on rechner-01
```

---

[← All commands](index.md)
