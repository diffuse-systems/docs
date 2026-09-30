# `diffuse-coordinator account role`

Change what somebody may do. Ends their sessions.

## Synopsis

```
diffuse-coordinator account role <LOGIN> <ROLE> [OPTIONS]
```

## Arguments

| argument | type | required | description |
|---|---|---|---|
| `LOGIN` | text | yes | Whose role to change |
| `ROLE` | text | yes | owner, admin, operator, developer or auditor |

## Options

Only the [connection options](index.md#connection-options).

## Notes

Changing a role ends that account's sessions, so the new role is what they get.

## Examples

```bash
$ diffuse-coordinator account role jonas.pfleger operator
```

```
jonas.pfleger is now operator.
Their sessions have been ended; the new role applies at their next login.
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
