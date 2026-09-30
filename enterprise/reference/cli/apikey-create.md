# `diffuse-coordinator apikey create`

Issue a key and print it. Shown once; only its hash is stored.

## Synopsis

```
diffuse-coordinator apikey create [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--name <NAME>` | text | - | Who this key is for, e.g. "billing-service". Required: it is the field that answers "whose key is this" a year from now |
| `--expires <EXPIRES>` | duration, `90d`, `12h`, `30m` | - | How long the key lives, e.g. 90d. Omit for a key that does not expire |
| `--act-as` | switch | - | Issue a **gateway** credential for a chat facade |
| `--model <MODELS>` | text | - | Restrict this key to a model. Repeat for several |
| `--pool <POOL>` | text | - | Restrict this key to one pool |

And the [connection options](index.md#connection-options).

## Notes

The key is shown once. `--act-as` issues a **gateway** credential instead: the only kind that may say which user a request is for, for a chat façade in front of the endpoint. `--model` and `--pool` confine a key to what they name.

## Examples

```bash
$ diffuse-coordinator apikey create --name abrechnung --expires 90d
```

```
API key 8QW2M4ZP created for "abrechnung".
  expires 2026-11-24 09:20:00Z
  every model this deployment serves
  this is the only time the key is shown; only its hash is stored.

dfe_sk_8QW2M4ZP1D2M3BK8B6MCGWBHC2DM3Y88MV0ZC
```

```bash
$ diffuse-coordinator apikey create --name portal --act-as
```

```
API key 4KPFWJV8 created for "portal".
  no expiry: revoke it with `apikey revoke 4KPFWJV8`
  every model this deployment serves
  this is the only time the key is shown; only its hash is stored.

dfe_sk_4KPFWJV8QQ5WDKKEZ5JX9RAHCHJ0TQZP83DVXFFM
```

---

[← `diffuse-coordinator apikey`](apikey.md) · [All commands](index.md)
