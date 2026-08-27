# `diffuse-coordinator licence set`

Install a licence file and bring the deployment up on it.

.

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
$ diffuse-coordinator licence set /tmp/klinik-2027.licence
```

```
Licence installed.
  organisation  Klinik Beispiel
  expires       2027-06-30 00:00:00Z
  no restart needed; the running coordinator has re-read it.
```

---

[← `diffuse-coordinator licence`](licence.md) · [All commands](index.md)
