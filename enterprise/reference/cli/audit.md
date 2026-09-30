# `diffuse-coordinator audit`

Read the audit trail: who did what, when, and what was refused.

## What you do with it

Every change, every refusal and every sensitive read, with who did it and
through what. Reading and exporting it keeps working when the licence has
lapsed.

### Read what happened lately

```bash
sudo diffuse-coordinator audit --limit 20
sudo diffuse-coordinator audit --since 24h --result denied
```

[`audit`](audit.md) shows the most recent entries in a table.

### Follow one person, one action or one object

```bash
sudo diffuse-coordinator audit --user marie.chercheuse --since 30d
sudo diffuse-coordinator audit --action model.serve --limit 50
sudo diffuse-coordinator audit --object qwen2.5-3b --since 7d
```

[`audit`](audit.md). `--user` matches part of the actor, whether a person, a
machine, a key or a gateway acting for somebody.

### Export a period for an auditor, as CSV

`--from` is included and `--to` excluded, so consecutive periods neither
overlap nor leave a gap. An export has no cap: every matching entry, oldest
first.

```bash
sudo diffuse-coordinator audit --from 2026-07-01 --to 2026-10-01 --class change,denied --output csv > audit-2026-q3.csv
```

[`audit`](audit.md). A CSV cell that a spreadsheet would run as a formula
starts with an apostrophe.

### Export for a SIEM, as JSON Lines

One JSON object per line, never altered:

```bash
sudo diffuse-coordinator audit --from 2026-09-01 --to 2026-10-01 --output jsonl > audit-2026-09.jsonl
sudo diffuse-coordinator audit --since 1d --output jsonl
```

[`audit`](audit.md)

## Synopsis

```
diffuse-coordinator audit [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--actor <ACTOR>` | text | - | Substring of the actor, e.g. `ops-laptop` or `apikey/EF61VQ4R` |
| `--user <USER>` | text | - | Alias for `--actor`, for the spelling the north star uses |
| `--action <ACTION>` | text | - | Exact action, e.g. `model.serve` or `node.enrol` |
| `--object <OBJECT>` | text | - | Substring of the object acted on |
| `--via <VIA>` | text | - | Only requests a gateway made on somebody's behalf, e.g. `--via EF61VQ4R` |
| `--since <SINCE>` | text | - | Only entries from this far back, e.g. `1h`, `30d` |
| `--until <UNTIL>` | text | - | Only entries before this far back, e.g. `1h` |
| `--from <FROM>` | text | - | Only entries at or after this instant: `2026-07-01` (midnight UTC) or `2026-07-01T08:00:00Z` |
| `--to <TO>` | text | - | Only entries before this instant, which is excluded, so consecutive periods neither overlap nor leave a gap: `--from 2026-07-01 --to 2026-10-01` is the third quarter |
| `--class <CLASS>` | text | - | Only these classes, comma-separated: `change`, `denied`, `access`, `routine`. An auditor usually wants `change,denied` |
| `--result <RESULT>` | text | - | Only `allowed`, or only `denied` |
| `--limit <LIMIT>` | integer | `200` | For `table` and `json`: most recent first, capped by the coordinator. `csv` and `jsonl` ignore it and export every matching entry |
| `--output <OUTPUT>` | one of `table`, `json`, `jsonl`, `csv` | `table` | `table` or `json` for a screen of rows; `csv` or `jsonl` for a file: the whole matching period, one line per entry, oldest first |

And the [connection options](index.md#connection-options).

## Notes

Every change, every refusal, and every sensitive read, in four classes: `change`, `denied`, `access` and `routine`. Routine reads, what a page or a command reads to draw itself, are no longer written. `--user` follows a person by their stable id; `--via` follows everything a chat gateway did on somebody's behalf. `--output csv` and `--output jsonl` export the whole matching period, one line per entry, oldest first, with no cap: the file for an auditor or a SIEM. A CSV cell that would run as a spreadsheet formula starts with an apostrophe; JSON Lines is never altered.

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

```bash
$ diffuse-coordinator audit --from 2026-07-01 --to 2026-10-01 --class change,denied --output csv
```

```
at,at_unix_ms,class,actor,actor_id,role,action,object,result,reason,via,context
2026-07-01T06:02:11.410Z,1782885731410,change,user/marie,acc_4YCTR0ECX33D4VM5,operator,model.serve,qwen2.5-3b,allowed,"placed on two machines, each with room",,"{""nodes"":""node-0,node-1""}"
48213 audit entries exported.
```

```bash
$ diffuse-coordinator audit --since 1d --output jsonl
```

```
{"action":"model.serve","actor":"user/marie","actor_id":"acc_4YCTR0ECX33D4VM5","at":"2026-08-26T10:41:02.118Z","at_unix_ms":1787820062118,"class":"change","context":{"nodes":"node-0,node-1"},"object":"qwen2.5-3b","reason":"placed on two machines, each with room","result":"allowed","role":"operator","via":""}
1 audit entries exported.
```

---

[← All commands](index.md)
