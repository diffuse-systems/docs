# `diffuse-coordinator eval`

Score a base model against a fine-tune on a suite.

## Synopsis

```
diffuse-coordinator eval <SUITE_KEY> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `SUITE_KEY` | yes | The suite, imported with `dataset import --format eval` |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--model` | `<MODEL>` | - | What to score: `<model>` or `<model>+<adapter>` |
| `--pool` | `<POOL>` | - | Which pool to run it in |
| `--metric` | `<METRIC>` | `exact_match` | How a completion is compared: exact_match or contains |
| `--max-tokens` | `<MAX_TOKENS>` | `32` | How far to generate before giving up on a row |

## Notes

Scores the base model and the fine-tune on the same suite, so the number you read is a comparison and not an absolute.

## Examples

```bash
$ diffuse-coordinator eval berichte-test --model qwen2.5-3b+berichte-v1
```

```
BASE    +ADAPTER  Δ
perplexity    14.82   9.31      -37%
exact match   0.41    0.63      +54%

  248 examples, 3m 12s, rechner-01
```

---

[← All commands](index.md)
