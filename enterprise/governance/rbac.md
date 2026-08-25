# Roles and permissions

Who may do what, and where that is decided.

## Accounts, not certificates

From milestone 11 an administrator is an account with a password and a session.
A certificate remains how a *service* authenticates, and both appear on the
audit trail under their own name.

**The first conditions the second**, which is worth saying because the two are
usually printed side by side as though they were alternatives. `login` obtains a
session and writes it to this machine; `whoami` reads it. Without the first, the
second has nothing to answer.

```bash
diffuse-coordinator login
```

```
Login: alice
Password:

Signed in as alice.

  role        admin
  session     expires in 12 hours
  written to  ~/.config/diffuse/session.json
```

On the coordinator's own host the endpoint comes from
`/etc/diffuse/coordinator.toml`, the way every other command reads that file.
From anywhere else, name it:

```bash
diffuse-coordinator login --endpoint https://coordinator.internal:7446
```

Then, and only then:

```bash
diffuse-coordinator whoami
```

```
  login       alice
  name        Alice Weber
  role        admin
  identity    acc_7Kq2mXvB
  source      local

  may:        nodes.read, models.write, deployments.write, jobs.write, audit.read
```

Run before signing in, it says so rather than failing obscurely:

```
error: there is no session on this machine, so there is nobody to be.

Sign in first:

    diffuse-coordinator login

A session belongs to a person and to one machine. If you signed in elsewhere,
that session is not readable from here.
```

## The roles

| Role | For | May |
|---|---|---|
| **Owner** | the person who installed it | everything, including accounts and licence |
| **Admin** | operators | models, deployments, nodes, keys, jobs, audit |
| **Operator** | day to day running | serve, stop, watch, read the trail |
| **Developer** | people who call the API | issue their own keys, read what is served |
| **Auditor** | compliance | read the trail and the configuration, change nothing |

The first account is created when the licence is installed and is an owner. The
one-time password is printed once and must be changed at first sign-in.

## Where a permission is checked

Once, in the service, before the work. Not in the console, not in the CLI, not
in the API. Every one of those is a client, and a client that decides is a
client that can be bypassed by not using it.

The console only declines to *offer* what would be refused. Somebody who crafts
the request by hand meets the same check and produces the same audit row, which
is the property the phrase "what the interface hides is never the security"
names.

## Sessions

A session is a token in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie, or a
file under the operator's home directory for the CLI. Changing an account's
password revokes every session it has, including the one that changed it, which
is why the console signs you out and says so rather than leaving you on a page
that no longer works.

```bash
diffuse-coordinator sessions          # who is signed in, from where, since when
diffuse-coordinator account disable alice
```

Disabling an account stops its next request, not its next login.

## SSO

OpenID Connect is supported for deployments that already have an identity
provider. Group claims map to the roles above, so the organisation's existing
joiners and leavers process governs access to the cluster without a second
place to remember.

Absent configuration means local accounts only, which is every edition. A
deployment configured for SSO but not entitled to it starts, says so, and
carries on with local accounts rather than refusing to run.
