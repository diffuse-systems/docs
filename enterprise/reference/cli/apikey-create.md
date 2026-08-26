# `diffuse-coordinator apikey create`

Issue a key and print it. Shown once; only its hash is stored.

## Synopsis

```
diffuse-coordinator apikey create [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file. Its `[admin]` section says where to connect |
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_COORDINATOR_ENDPOINT` | Coordinator endpoint, e.g. https://coordinator.internal:7443 |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |
| `--name` | `<NAME>` | — | Who this key is for, e.g. "billing-service". Required: it is the field that answers "whose key is this" a year from now |
| `--expires` | `<EXPIRES>` | — | How long the key lives, e.g. 90d. Omit for a key that does not expire |
| `--act-as` | flag | — | Issue a **gateway** credential for a chat facade |
| `--model` | `<MODELS>` | — | Restrict this key to a model. Repeat for several |
| `--pool` | `<POOL>` | — | Restrict this key to one pool |

## Notes

The key is shown once. `--act-as` issues a **gateway** credential instead — the only kind that may say which user a request is for, for a chat façade in front of the endpoint.

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
  no expiry — revoke it with `apikey revoke 4KPFWJV8`
  gateway — may act for any imported identity
  this is the only time the key is shown; only its hash is stored.

dfe_sk_4KPFWJV8QQ5WDKKEZ5JX9RAHCHJ0TQZP83DVXFFM
```

---

[← `diffuse-coordinator apikey`](apikey.md) · [All commands](index.md)
