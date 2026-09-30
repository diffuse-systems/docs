# `diffuse-node-agent firewall open`

Open the data port to the private networks this machine is on.

Run by the package at install, and the repair when the machine changes network: the rules are put right for the networks it is on now, and the ones this product wrote for a network it has left are removed. A rule somebody wrote is never removed.

ufw and firewalld are changed; nftables or iptables rules written by hand are not, and the exact command is printed instead.

## Synopsis

```
diffuse-node-agent firewall open [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--from <local\|any\|NETWORK>` | text | `$DIFFUSE_FIREWALL_FROM` | Who the rule lets in: `local`, the private networks this machine is on, read now (the default); a network, like `10.20.0.0/16`, for an api or pipeline peers behind a router or on public addresses; or `any`, every source, which on a machine with a public interface is the Internet |
| `--at-install` | switch | - | Set by the package: `DIFFUSE_NO_FIREWALL` is honoured |

## Notes

What the package runs at install, and the repair when the port was closed by hand, or when this machine moved to another network: the rule is put right for the networks it is on now, and the one this product wrote for a network it left is removed. A node whose data port is shut enrols, shows as healthy, and cannot serve. `--from` is remembered.

## Examples

```bash
$ sudo diffuse-node-agent firewall open
```

```
  The host firewall is ufw. Port 7445 is open to the private networks this
  machine is on, and to nothing else. ufw saves its rules, so they are back
  after a reboot.
  What ran:

    sudo ufw allow from 10.77.5.0/24 to any port 7445 proto tcp comment "diffuse data plane"
    sudo ufw delete allow from 192.168.178.0/24 to any port 7445 proto tcp
```

---

[← `diffuse-node-agent firewall`](firewall.md) · [All commands](index.md)
