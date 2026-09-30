# `diffuse-coordinator login`

Sign in as a person, and keep the session on this machine.

From milestone 11 an administrator is an account, not a certificate. A certificate is still how a *service* authenticates, a configuration manager, a CI job, and both are on the audit trail under their own name.

## Synopsis

```
diffuse-coordinator login [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--endpoint <ENDPOINT>` | text | `$DIFFUSE_OPERATOR_ENDPOINT` | The operator plane, e.g. https://coordinator.internal:7446 |
| `--ca <CA>` | path | - | The certificate authority that signed the coordinator's certificate |
| `--login <LOGIN>` | text | - | The login. Prompted for when absent |
| `--password <PASSWORD>` | text | `$DIFFUSE_PASSWORD` | The password |
| `--sso` | switch | - | Sign in through this deployment's identity provider instead |
| `--no-browser` | switch | - | Print the sign-in URL rather than opening a browser |

## Notes

The session lands in a file on this machine, `~/.config/diffuse/session`, and is used by every later command, for twelve hours.

## Examples

```bash
$ diffuse-coordinator login --endpoint https://coordinator.internal:7446
```

```
Login: marie.chercheuse
Password:
Signed in as marie.chercheuse (everything, including accounts, roles and the licence).
  session until  2026-08-26 22:00:00Z
  stored in      /home/marie/.config/diffuse/session (mode 0600)
```

---

[← All commands](index.md)
