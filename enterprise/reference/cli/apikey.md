# `diffuse-coordinator apikey`

Create and manage API keys for the public inference endpoint.

## What you do with it

An API key is what an application presents on `/v1`. It is shown once; only
its hash is stored.

### Give an application a key

```bash
sudo diffuse-coordinator apikey create --name abrechnung --expires 90d
```

[`apikey create`](apikey-create.md). The application sends it as
`Authorization: Bearer dfe_sk_...` to `https://coordinator.internal:8443/v1`,
with the deployment's `/etc/diffuse/ca.crt` as its trust anchor.

### Confine a key to one model, or one pool

A request for anything else is refused, and the refusal says so:

```bash
sudo diffuse-coordinator apikey create --name labor --model qwen2.5-3b --pool lab --expires 30d
```

[`apikey create`](apikey-create.md)

### A key for a chat interface that acts for each person

A gateway key may say which person a request is for; the people it may act
for are imported with [identity](identity.md):

```bash
sudo diffuse-coordinator apikey create --name portal --act-as
```

[`apikey create`](apikey-create.md)

### Rotate a key without an outage

The new key has the same name, scope and rights; the old one keeps working
for the overlap, then stops. `--overlap 0` stops it at once, for a leak.

```bash
sudo diffuse-coordinator apikey rotate 4KPFWJV8 --overlap 24h
sudo diffuse-coordinator apikey rotate 8QW2M4ZP --overlap 0
```

[`apikey rotate`](apikey-rotate.md)

### See the keys, and revoke one

```bash
sudo diffuse-coordinator apikey list
sudo diffuse-coordinator apikey revoke 8QW2M4ZP
```

[`apikey list`](apikey-list.md) shows each key's scope, owner and last use;
[`apikey revoke`](apikey-revoke.md) takes effect on the very next request.

## Synopsis

```
diffuse-coordinator apikey <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`create`](apikey-create.md) | Issue a key and print it. Shown once; only its hash is stored |
| [`list`](apikey-list.md) | List keys by handle. Secrets are not stored and cannot be shown |
| [`revoke`](apikey-revoke.md) | Revoke a key. Effective on the very next request |
| [`rotate`](apikey-rotate.md) | Issue the next key in place of one, and put the old one on a clock |

---

[← All commands](index.md)
