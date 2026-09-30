# `diffuse-coordinator session`

Who is signed in, from where, since when.

## What you do with it

A session is a person signed in on one machine, for twelve hours at most.

### See who is signed in, and from where

```bash
diffuse-coordinator session list
```

[`session list`](session-list.md)

### End somebody's session now

```bash
diffuse-coordinator session revoke 9N903BGH
```

[`session revoke`](session-revoke.md): the next call it makes is refused. To
keep somebody out for good, disable their account with
[`account disable`](account-disable.md).

### Your own session

```bash
diffuse-coordinator whoami
diffuse-coordinator logout
```

[`whoami`](whoami.md) says who you are and what you may do;
[`logout`](logout.md) ends the session here and on the coordinator.

## Synopsis

```
diffuse-coordinator session <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`list`](session-list.md) | Who is signed in |
| [`revoke`](session-revoke.md) | End somebody else's session, now |

---

[← All commands](index.md)
