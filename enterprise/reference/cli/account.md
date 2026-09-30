# `diffuse-coordinator account`

Human accounts: who may sign in, and as what.

## What you do with it

Accounts are for people, at the console and at the command line. They are
served on the operator plane, port 7446: sign in first. The roles are `owner`,
`admin`, `operator`, `developer` and `auditor`.

### Sign in

The first owner was created at install, and its one-time password printed
then. The first sign-in with a one-time password may only change it:

```bash
diffuse-coordinator login --endpoint https://coordinator.internal:7446
diffuse-coordinator password
diffuse-coordinator whoami
```

[`login`](login.md) · [`password`](password.md) · [`whoami`](whoami.md)

### Give somebody an account

The one-time password is printed once; hand it over out of band:

```bash
diffuse-coordinator account create jonas.pfleger --role developer
diffuse-coordinator account list
```

[`account create`](account-create.md) · [`account list`](account-list.md)

### Change what somebody may do

A new role ends their sessions, so it applies at their next sign-in:

```bash
diffuse-coordinator account role jonas.pfleger operator
```

[`account role`](account-role.md)

### Somebody leaves, or comes back

Disabling revokes every session they hold. Their API keys are not revoked:
`apikey list` shows what they own, and revoking each is a decision.

```bash
diffuse-coordinator account disable jonas.pfleger
diffuse-coordinator apikey list
diffuse-coordinator account enable jonas.pfleger
```

[`account disable`](account-disable.md) · [`apikey list`](apikey-list.md) ·
[`account enable`](account-enable.md)

### A lost password, or no owner at all

Both run on the coordinator's machine, against its state, as the service user;
both are on the audit trail.

```bash
sudo -u diffuse diffuse-coordinator account recover --login marie.chercheuse
sudo -u diffuse diffuse-coordinator account bootstrap --login marie.chercheuse
```

[`account recover`](account-recover.md) issues a new one-time password and
ends that account's sessions; [`account bootstrap`](account-bootstrap.md)
creates the first owner of a deployment that has no account yet.

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
