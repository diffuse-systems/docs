# `diffuse-coordinator apikey`

Create and manage API keys for the public inference endpoint.

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
