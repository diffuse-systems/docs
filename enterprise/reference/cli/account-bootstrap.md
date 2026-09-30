# `diffuse-coordinator account bootstrap`

Create the first account. **Run on the coordinator host.**.

No listener is involved and there is no remote equivalent: what authorises this is being able to read the coordinator's state directory as the service user, which is the trust boundary that already exists. Every use is on the audit trail.

## Synopsis

```
diffuse-coordinator account bootstrap [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--state-dir <STATE_DIR>` | path | `$DIFFUSE_STATE_DIR` | The coordinator's state directory |
| `--config <CONFIG>` | path | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file, read only for its `state_dir` |
| `--login <LOGIN>` | text | - | The login of the first owner |
| `--name <NAME>` | text | - | Their name |

## Notes

For a deployment created with `init --no-owner`, whose accounts come from a configuration manager or from an identity provider.

## Examples

```bash
$ diffuse-coordinator account bootstrap --login owner
```

```
Account owner created, role owner.
  one-time password   D3TBK7QW2M4ZP0X9
```

---

[← `diffuse-coordinator account`](account.md) · [All commands](index.md)
