# `diffuse-node-agent firewall`

The data port this machine must expose, and the host firewall in front of it.

The package opens it at install when the firewall is ufw or firewalld, and prints the command to type when the rules are written by hand.

## What you do with it

The data port is 7445, open to the private networks the machine is on and to
nothing else. The api and the other machines of a split model reach it there.

### See whether the data port is reachable

```bash
sudo diffuse-node-agent firewall status
```

[`firewall status`](firewall-status.md) changes nothing. A machine whose data
port is shut enrols, looks healthy, and cannot serve.

### Open it again, or for another network

After the port was closed by hand or the machine moved, put the rule right;
add a network when the api reaches this machine through a router:

```bash
sudo diffuse-node-agent firewall open
sudo diffuse-node-agent firewall open --from local,10.20.0.0/16
```

[`firewall open`](firewall-open.md). The choice is remembered.

### Choose at install, or leave the firewall alone

```bash
sudo DIFFUSE_FIREWALL_FROM=local,10.20.0.0/16 apt-get install ./diffuse-node-agent_cpu_amd64.deb
sudo DIFFUSE_NO_FIREWALL=1 apt-get install ./diffuse-node-agent_cpu_amd64.deb
sudo diffuse-node-agent firewall status
```

[`firewall status`](firewall-status.md) shows the command that would open the
port when it is shut.

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
