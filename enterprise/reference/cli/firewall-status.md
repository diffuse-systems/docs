# `diffuse-coordinator firewall status`

Which of the three ports are reachable from the network, and why.

## Synopsis

```
diffuse-coordinator firewall status [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | - | The coordinator's configuration, read for the ports. Defaults to the packaged one |
| `--api-env` | `<API_ENV>` | `/etc/diffuse/api.env` | The api's environment file, read for its port |
| `--output` | `table` \| `json` | `table` | `table` for a person, `json` for a script |

## Notes

Needs root: without it, every firewall reads as none.

## Examples

```bash
$ sudo diffuse-coordinator firewall status
```

```
Reachable from your network, on this machine (firewall: ufw):

    7443  control plane: heartbeats and slices, mTLS   open (ufw)
    7444  enrolment: machines joining with a token     closed: no ufw rule allows it
    8443  the OpenAI-compatible API                    open (ufw)
```

---

[← `diffuse-coordinator firewall`](firewall.md) · [All commands](index.md)
