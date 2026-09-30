# `diffuse-coordinator token`

Create and manage join tokens.

## What you do with it

A join token lets a machine enrol. Its secret is shown once; the coordinator
keeps only a hash of it.

### Enrol a room of machines with one token

Give the token as many uses as machines, and a lifetime just long enough to go
round the room:

```bash
sudo diffuse-coordinator token create --pool lab --max-uses 12 --ttl 2h
```

[`token create`](token-create.md) prints the line to paste on each machine.

### Put machines in a pool, with labels

The pool is where a model or a job is placed; labels are recorded on each
machine for you to read:

```bash
sudo diffuse-coordinator token create --pool gpu --labels room=B12,owner=physik --max-uses 4 --ttl 24h
```

[`token create`](token-create.md)

### See which tokens are still usable, and withdraw one

```bash
sudo diffuse-coordinator token list
sudo diffuse-coordinator token list --all
sudo diffuse-coordinator token revoke 7QW2M4ZP
```

[`token list`](token-list.md) · [`token revoke`](token-revoke.md). Revoking a
token does not touch the machines it already enrolled.

## Synopsis

```
diffuse-coordinator token <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`create`](token-create.md) | Issue a join token and print the line to paste onto a machine |
| [`list`](token-list.md) | List tokens by handle. Secrets are not stored and cannot be shown |
| [`revoke`](token-revoke.md) | Revoke a token |

---

[← All commands](index.md)
