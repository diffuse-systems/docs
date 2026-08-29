# `diffuse-coordinator login`

Sign in as a person, and keep the session on this machine.

From milestone 11 an administrator is an account, not a certificate. A certificate is still how a *service* authenticates, a configuration manager, a CI job, and both are on the audit trail under their own name.

## Synopsis

```
diffuse-coordinator login [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_OPERATOR_ENDPOINT` | The operator plane, e.g. https://coordinator.internal:7446 |
| `--ca` | `<CA>` | - | The certificate authority that signed the coordinator's certificate |
| `--login` | `<LOGIN>` | - | The login. Prompted for when absent |
| `--password` | `<PASSWORD>` | `$DIFFUSE_PASSWORD` | The password |
| `--sso` | flag | - | Sign in through this deployment's identity provider instead |
| `--no-browser` | flag | - | Print the sign-in URL rather than opening a browser |

## Notes

The session lands in a file on this machine and is used by every later command.

## Examples

```bash
$ diffuse-coordinator login --endpoint https://coordinator.internal:7446
```

```
login: marie.chercheuse
password:

Signed in as marie.chercheuse (operator) until 2026-08-27 10:00:00Z.
```

---

[← All commands](index.md)
