# `diffuse-coordinator init`

Prepare the state directory and derive the enrolment CA from the deployment root CA.

## Synopsis

```
diffuse-coordinator init [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file, read for `state_dir` |
| `--state-dir` | `<STATE_DIR>` | `$DIFFUSE_STATE_DIR` | Directory to prepare |
| `--org` | `<ORG>` | - | The organisation this deployment belongs to |
| `--owner` | `<OWNER>` | - | The login of the first owner account. Defaults to `owner` |
| `--no-owner` | flag | - | Do not create the first owner account |
| `--host` | `<HOSTS>` | - | Names and addresses this coordinator will be reached at |
| `--cert-dir` | `<CERT_DIR>` | `/etc/diffuse` | Where to write the certificates `init --org` generates |
| `--root-ca-cert` | `<ROOT_CA_CERT>` | - | The deployment root CA certificate (PEM) |
| `--root-ca-key` | `<ROOT_CA_KEY>` | - | The deployment root CA private key (PEM) |
| `--validity-days` | `<VALIDITY_DAYS>` | `365` | Validity of the enrolment CA in days. Clamped to the root's own expiry |
| `--force` | flag | - | Replace an existing enrolment CA |

## Notes

Run once, on the machine that will orchestrate. It generates the deployment's own certificate authority, derives the enrolment CA from it, and creates the first owner account, whose one-time password is printed once and never again.

## Examples

```bash
$ diffuse-coordinator init --org "Klinik Beispiel" --host coordinator.internal
```

```
Deployment initialised in /var/lib/diffuse-coordinator

  owner            owner
  one-time password   K7QW2M4ZP0X9D3TB

  Sign in with it once and it must be changed:
    diffuse-coordinator login --endpoint https://coordinator.internal:7446
```

---

[← All commands](index.md)
