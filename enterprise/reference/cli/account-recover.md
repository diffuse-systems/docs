# `diffuse-coordinator account recover`

Reset a password when the identity provider is down and the password is lost. **Run on the coordinator host**, and audited like `bootstrap`.

## Synopsis

```
diffuse-coordinator account recover [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--state-dir` | `<STATE_DIR>` | `$DIFFUSE_STATE_DIR` | The coordinator's state directory |
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file, read only for its `state_dir` |
| `--login` | `<LOGIN>` | — | Whose password to reset |

## Notes

Local, audited, and it revokes every session that account held. Keep at least one owner as a local account so an identity-provider outage costs SSO logins and nothing else.

## Examples

```bash
$ diffuse-coordinator account recover --login marie.chercheuse
```

```
one-time password   SNDNZ80EPM4DP51Q

Every session this account held has been revoked, and the next login with this
password may only change it. This use is on the audit trail:
  diffuse-coordinator audit --action account.recover
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
