# `diffuse-coordinator account create`

Create an account with a one-time password.

## Synopsis

```
diffuse-coordinator account create <LOGIN> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `LOGIN` | text | yes | The login, as it will appear in the audit trail |

## Options

| flag | type | default | description |
|---|---|---|---|
| `--name <NAME>` | text | - | The person's name, for a table an operator reads |
| `--role <ROLE>` | text | `developer` | owner, admin, operator, developer or auditor |

And the [connection options](index.md#connection-options).

## Notes

The one-time password is printed once and may only be used to set another.

## Examples

```bash
$ diffuse-coordinator account create jonas.pfleger --role developer
```

```
Account jonas.pfleger created (developer).

  one-time password   6HCZERB0KFZ4T761

Hand it over out of band. It works once: the first login with it may only
change it, and this is the only time it is shown.
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
