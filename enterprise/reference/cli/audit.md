# `diffuse-coordinator audit`

Read the audit trail: who did what, when, and what was refused.

## Synopsis

```
diffuse-coordinator audit [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--actor` | `<ACTOR>` | - | Substring of the actor, e.g. `ops-laptop` or `apikey/EF61VQ4R` |
| `--user` | `<USER>` | - | Alias for `--actor`, for the spelling the north star uses |
| `--action` | `<ACTION>` | - | Exact action, e.g. `model.serve` or `node.enrol` |
| `--object` | `<OBJECT>` | - | Substring of the object acted on |
| `--via` | `<VIA>` | - | Only requests a gateway made on somebody's behalf, e.g. `--via EF61VQ4R` |
| `--since` | `<SINCE>` | - | Only entries from this far back, e.g. `1h`, `30d` |
| `--until` | `<UNTIL>` | - | Only entries before this far back, e.g. `1h` |
| `--result` | `<RESULT>` | - | Only `allowed`, or only `denied` |
| `--limit` | `<LIMIT>` | `200` | Most recent first, capped by the coordinator |
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--output` | `table` \| `json` | `table` | Output format |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Notes

Every authorisation decision, every lifecycle action and every authenticated request. `--user` follows a person by their stable id, so a rename does not break the query; `--via` follows everything a chat gateway did on somebody's behalf.

## Examples

```bash
$ diffuse-coordinator audit --action inference --limit 3
```

```
TIME                  ACTOR                                       ACTION     OBJECT      RESULT   DETAIL
2026-08-26 10:41:02Z  identity/6a8edf7b… via apikey/4KPFWJV8      inference  qwen2.5-3b  allowed  tokens_in=24 tokens_out=96 latency_ms=1902
2026-08-26 10:39:55Z  apikey/8QW2M4ZP                             inference  qwen2.5-3b  allowed  tokens_in=51 tokens_out=64 latency_ms=1204
```

```bash
$ diffuse-coordinator audit --via 4KPFWJV8 --result denied
```

```
TIME                  ACTOR                                  ACTION                   OBJECT  RESULT  DETAIL
2026-08-26 10:44:18Z  attempted/6a8edf7b… via apikey/4KPFWJV8  identity.assert_refused  -       denied  the user the gateway asserted is disabled here.
```

---

[← All commands](index.md)
