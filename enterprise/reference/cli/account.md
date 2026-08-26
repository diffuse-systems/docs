# `diffuse-coordinator account`

Human accounts: who may sign in, and as what.

## Synopsis

```
diffuse-coordinator account <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`list`](account-list.md) | List the accounts |
| [`create`](account-create.md) | Create an account with a one-time password |
| [`role`](account-role.md) | Change what somebody may do. Ends their sessions |
| [`disable`](account-disable.md) | Switch an account off, and revoke everything it is holding |
| [`enable`](account-enable.md) | Switch it back on |
| [`bootstrap`](account-bootstrap.md) | Create the first account. **Run on the coordinator host.** |
| [`recover`](account-recover.md) | Reset a password when the identity provider is down and the password is lost. **Run on the coordinator host**, and audited like `bootstrap` |

---

[← All commands](index.md)
