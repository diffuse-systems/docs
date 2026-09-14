# `diffuse-coordinator licence set`

Install a licence file and bring the deployment up on it.

**The second and last command of an installation.** It checks the file is a licence this build trusts before touching anything, puts it where the coordinator reads it, restarts the services, waits for them to answer, and prints what you need to keep. A failure at any step says which step and why, and leaves the previous licence in place.

## Synopsis

```
diffuse-coordinator licence set <PATH> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `PATH` | yes | The licence file we sent you |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | - | The coordinator's configuration, read to find the console's port and the state directory. Defaults to the packaged one |
| `--install-to` | `<INSTALL_TO>` | `/etc/diffuse/licence` | Where the coordinator reads its licence from |
| `--no-restart` | flag | - | Install the file, but do not restart anything |

## Notes

Verified before anything is replaced, so a wrong file cannot take a running deployment down. A coordinator that is already running re-reads it in place.

## Examples

```bash
$ sudo diffuse-coordinator licence set /tmp/klinik-2027.licence
```

```
organisation  Klinik Beispiel
  licence       lic-2027-0142
  edition       enterprise
  nodes         24
  expires       in 289 days

  installed     /etc/diffuse/licence

  It is ready. Open:

      https://coordinator.internal:7446/console

  ...

  Reachable from your network, on this machine (firewall: ufw):

    7443  control plane: heartbeats and slices, mTLS   open (ufw)
    7444  enrolment: machines joining with a token     open (ufw)
    8443  the OpenAI-compatible API                    open (ufw)

  This product opens these three by default. Once every machine has joined,
  close enrolment:

    sudo diffuse-coordinator firewall close-enrolment
```

---

[← `diffuse-coordinator licence`](licence.md) · [All commands](index.md)
