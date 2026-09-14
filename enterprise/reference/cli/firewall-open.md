# `diffuse-coordinator firewall open`

Open the control plane, enrolment and the API in the host firewall.

Run by the package at install. ufw and firewalld are changed; nftables or iptables rules written by hand are not, and the exact command is printed instead.

## Synopsis

```
diffuse-coordinator firewall open [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | - | The coordinator's configuration, read for the ports. Defaults to the packaged one |
| `--api-env` | `<API_ENV>` | `/etc/diffuse/api.env` | The api's environment file, read for its port |
| `--at-install` | flag | - | Set by the package: the audit row says the install did it, and `DIFFUSE_NO_FIREWALL` is honoured |

## Notes

What the package runs at install, and what reopens enrolment the day a new machine joins. On the audit trail as `firewall.open`.

## Examples

```bash
$ sudo diffuse-coordinator firewall open
```

```
The host firewall is ufw, and this opened the three ports in it:

    sudo ufw allow 7443/tcp comment "diffuse control plane"
    sudo ufw allow 7444/tcp comment "diffuse enrolment"
    sudo ufw allow 8443/tcp comment "diffuse the OpenAI-compatible API"

  On the audit trail: diffuse-coordinator audit --action firewall.open
```

---

[← `diffuse-coordinator firewall`](firewall.md) · [All commands](index.md)
