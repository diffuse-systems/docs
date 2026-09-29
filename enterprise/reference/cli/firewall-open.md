# `diffuse-coordinator firewall open`

Open the coordinator's ports to the private networks this machine is on.

Run by the package at install, and the repair when the machine changes network: the rules are put right for the networks it is on now, and the ones this product wrote for a network it has left are removed. A rule somebody wrote is never removed.

ufw and firewalld are changed; nftables or iptables rules written by hand are not, and the exact command is printed instead.

## Synopsis

```
diffuse-coordinator firewall open [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | - | The coordinator's configuration, read for the ports. Defaults to the packaged one |
| `--api-env` | `<API_ENV>` | `/etc/diffuse/api.env` | The api's environment file, read for its port |
| `--from` | `<local|any|NETWORK>` | `$DIFFUSE_FIREWALL_FROM` | Who the rules let in: `local`, the private networks this machine is on, read now (the default); a network, like `10.20.0.0/16`, for machines behind a router or on public addresses; or `any`, every source, which on a machine with a public interface is the Internet |
| `--at-install` | flag | - | Set by the package: the audit row says the install did it, and `DIFFUSE_NO_FIREWALL` is honoured |

## Notes

What the package runs at install; the repair when this machine moved to another network, which puts the rules right for the networks it is on now and removes the ones this product wrote for a network it left, never one somebody wrote; and what reopens enrolment the day a new machine joins. `--from` is remembered. On the audit trail as `firewall.open`.

## Examples

```bash
$ sudo diffuse-coordinator firewall open
```

```
The host firewall is ufw. Ports 7443, 7444, 7446 and 8443 are open to the
  private networks this machine is on, and to nothing else. ufw saves its
  rules, so they are back after a reboot.
  What ran:

    sudo ufw allow from 10.77.5.0/24 to any port 7443 proto tcp comment "diffuse control plane"
    sudo ufw allow from 10.77.5.0/24 to any port 7444 proto tcp comment "diffuse enrolment"
    sudo ufw allow from 10.77.5.0/24 to any port 7446 proto tcp comment "diffuse console and sign-in"
    sudo ufw allow from 10.77.5.0/24 to any port 8443 proto tcp comment "diffuse the OpenAI-compatible API"
    sudo ufw delete allow from 172.30.77.0/24 to any port 7443 proto tcp
    sudo ufw delete allow from 172.30.77.0/24 to any port 7446 proto tcp
    sudo ufw delete allow from 172.30.77.0/24 to any port 8443 proto tcp

  On the audit trail: diffuse-coordinator audit --action firewall.open
```

---

[← `diffuse-coordinator firewall`](firewall.md) · [All commands](index.md)
