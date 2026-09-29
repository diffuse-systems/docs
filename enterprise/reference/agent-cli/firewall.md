# `diffuse-node-agent firewall`

The data port this machine must expose, and the host firewall in front of it.

The package opens it at install when the firewall is ufw or firewalld, and prints the command to type when the rules are written by hand.

## Synopsis

```
diffuse-node-agent firewall <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`status`](firewall-status.md) | Whether the data port is reachable, from where, and why |
| [`open`](firewall-open.md) | Open the data port to the private networks this machine is on |

## Notes

A machine that serves accepts connections on one port, 7445: the api, and the other machines of a split pipeline, connect to it there with a certificate from this deployment. The package opens it at install when the firewall is ufw or firewalld, including one installed and not yet enabled, to the private networks this machine is on and to nothing else, and it is back after a reboot. Rules written by hand in nftables or iptables are never changed: the command is printed instead. Set `DIFFUSE_NO_FIREWALL=1` when installing to leave the firewall alone, or `DIFFUSE_FIREWALL_FROM` to let in a network the machine is not on.

## Examples

---

[← All commands](index.md)
