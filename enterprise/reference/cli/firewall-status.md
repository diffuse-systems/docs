# `diffuse-coordinator firewall status`

Which of this machine's ports are reachable, from where, and why.

## Synopsis

```
diffuse-coordinator firewall status [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--config <CONFIG>` | path | - | The coordinator's configuration, read for the ports. Defaults to the packaged one |
| `--api-env <API_ENV>` | path | `/etc/diffuse/api.env` | The api's environment file, read for its port |
| `--if-closed` | switch | - | Set by the package on an upgrade: print only a port this version expects open and finds shut, and change nothing |
| `--output <OUTPUT>` | one of `table`, `json` | `table` | `table` for a person, `json` for a script |

## Notes

Needs root: without it, every firewall reads as none.

## Examples

```bash
$ sudo diffuse-coordinator firewall status
```

```
  Reachable from your network, on this machine (firewall: ufw):

    7443  control plane: heartbeats and slices, mTLS         from 172.30.77.0/24
    7444  enrolment: machines joining with a token           closed: no ufw rule allows it
    7446  console and sign-in: people, TLS and a password    from 172.30.77.0/24
    8443  the OpenAI-compatible API                          from 172.30.77.0/24

  The private networks this machine is on: 10.77.5.0/24 (eth2). The rules this
  product writes let in the private networks this machine is on.

  This machine is on 10.77.5.0/24 (eth2), and no rule lets that network in.
  Rules this product wrote let in 172.30.77.0/24, a network this machine is no
  longer on. To put the rules right for the networks this machine is on now:

    sudo diffuse-coordinator firewall open
```

---

[← `diffuse-coordinator firewall`](firewall.md) · [All commands](index.md)
