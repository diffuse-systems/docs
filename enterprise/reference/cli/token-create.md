# `diffuse-coordinator token create`

Issue a join token and print the line to paste onto a machine.

## Synopsis

```
diffuse-coordinator token create [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--pool <POOL>` | text | - | Scheduling pool the enrolled machines join |
| `--labels <LABELS>` | text | - | Labels, written key=value,key=value |
| `--schedule <SCHEDULE>` | text | - | When the machines declare themselves available, e.g. "Mo-Fr 19:00-07:00". Recorded and displayed; nothing enforces it yet |
| `--max-uses <MAX_USES>` | integer | `1` | How many machines may enrol with this token |
| `--ttl <TTL>` | duration, `90d`, `12h`, `30m` | `1h` | How long the token lives, e.g. 1h, 48h, 7d |

And the [connection options](index.md#connection-options).

## Notes

The full token is printed once. The coordinator keeps only a hash of its secret and cannot show it again. The address in the line to paste is the one machines reach this coordinator by; when they know it only by its address, enrol by address, which the output explains.

## Examples

```bash
$ diffuse-coordinator token create --pool lab --max-uses 40 --ttl 24h
```

```
Join token 7QW2M4ZP created.
  usable 40 times, until 2026-08-27 09:14:02Z
  this is the only time the full token is shown.

Paste this on a machine you want to enrol:

curl -sSL https://coordinator.internal:7444/join | sh -s -- --token DFE1-7QW2M4ZP-...

Or, if the agent binary is already deployed:
  diffuse-node-agent enroll --endpoint https://coordinator.internal:7444 --token DFE1-7QW2M4ZP-...
```

---

[← `diffuse-coordinator token`](token.md) · [All commands](index.md)
