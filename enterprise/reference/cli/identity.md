# `diffuse-coordinator identity`

Register the people a chat facade may act for.

## What you do with it

The people a chat interface may act for, with a gateway key from
[`apikey create --act-as`](apikey-create.md). Each is known by a stable
identifier, the one your chat interface uses, never by an address.

### Import the people from your directory

A CSV of four columns: `subject,address,models,pool`. Running it again updates
people rather than duplicating them:

```bash
sudo diffuse-coordinator identity import /srv/export/users.csv
sudo diffuse-coordinator identity list
```

[`identity import`](identity-import.md) has the whole format;
[`identity list`](identity-list.md) shows who may call what.

### Somebody leaves, or comes back

Disabling refuses the gateway at the next request for that person; everything
the trail records about them stays.

```bash
sudo diffuse-coordinator identity disable 6a8edf7b6bc7078da8fac7a4
sudo diffuse-coordinator identity enable 6a8edf7b6bc7078da8fac7a4
```

[`identity disable`](identity-disable.md) ·
[`identity enable`](identity-enable.md). Importing again never re-enables
somebody you disabled.

### See what a gateway did for somebody

```bash
sudo diffuse-coordinator audit --user 6a8edf7b6bc7078da8fac7a4 --limit 50
sudo diffuse-coordinator audit --via 4KPFWJV8 --result denied
```

[`audit`](audit.md)

## Synopsis

```
diffuse-coordinator identity <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`import`](identity-import.md) | Import people from a CSV file. Idempotent: run it again after a change |
| [`list`](identity-list.md) | List the people this deployment knows |
| [`disable`](identity-disable.md) | Stop a gateway acting for somebody, keeping the trail that names them |
| [`enable`](identity-enable.md) | Let a gateway act for somebody again |

---

[← All commands](index.md)
