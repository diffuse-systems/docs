# `diffuse-coordinator init`

Prepare the state directory and derive the enrolment CA from the deployment root CA.

## Synopsis

```
diffuse-coordinator init [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--config <CONFIG>` | path | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file, read for `state_dir` |
| `--state-dir <STATE_DIR>` | path | `$DIFFUSE_STATE_DIR` | Directory to prepare |
| `--org <ORG>` | text | - | The organisation this deployment belongs to |
| `--owner <OWNER>` | text | - | The login of the first owner account. Defaults to `owner` |
| `--no-owner` | switch | - | Do not create the first owner account |
| `--host <HOSTS>` | text | - | Names and addresses this coordinator will be reached at |
| `--cert-dir <CERT_DIR>` | path | `/etc/diffuse` | Where to write the certificates `init --org` generates |
| `--root-ca-cert <ROOT_CA_CERT>` | path | - | The deployment root CA certificate (PEM) |
| `--root-ca-key <ROOT_CA_KEY>` | path | - | The deployment root CA private key (PEM) |
| `--validity-days <VALIDITY_DAYS>` | integer | `365` | Validity of the enrolment CA in days. Clamped to the root's own expiry |
| `--force` | switch | - | Replace an existing enrolment CA |

## Notes

Run once, on the machine that will orchestrate; the package runs it for you at install. It generates the deployment's own certificate authority, derives the enrolment CA from it, issues this machine's certificate for every address and name it has, and creates the first owner account, whose one-time password is printed once and never again.

## Examples

```bash
$ diffuse-coordinator init --org "Klinik Beispiel" --host coordinator.internal
```

```
Deployment initialised in /var/lib/diffuse-coordinator

  state database   /var/lib/diffuse-coordinator/state.db
  enrolment CA     /var/lib/diffuse-coordinator/enrollment-ca.crt
  expires          2027-09-30 9:12:40.0 +00:00:00
  root CA pin      53:56:5C:0D:85:A6:A4:88:27:EA:52:E0:8F:50:7E:7B

  certificates     /etc/diffuse
    ca.crt · coordinator.crt/.key · admin.crt/.key · api.crt/.key
  this machine's certificate covers
    coordinator.internal, localhost, 127.0.0.1, rechner-01, rechner-01.local,
    192.168.178.20

  owner            owner
  one-time password  K7QW2M4ZP0X9D3TB

This is the only time that password is shown, and the first sign-in with
it may only change it.

─── the one thing to do by hand ───────────────────────────────────────

  /var/lib/diffuse-coordinator/root-ca.key

That is this deployment's root private key. It was generated here because
you did not bring one. [...]

  1. Copy it somewhere offline that survives this machine.
  2. Then delete it from here.
```

---

[← All commands](index.md)
