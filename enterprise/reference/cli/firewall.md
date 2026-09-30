# `diffuse-coordinator firewall`

The ports this machine must expose, and the host firewall in front of them.

The package opens 7443, 7444, 7446 and 8443 at install when the firewall is ufw or firewalld, to the private networks this machine is on, and prints the command to type when the rules are written by hand. Every change is on the audit trail.

## What you do with it

Four ports, opened to the private networks this machine is on and to nothing
else: 7443 for the machines, 7444 for enrolment, 7446 for people and 8443 for
the API. Each machine that computes opens its own 7445. The whole picture, with
what each port exposes, is on the [network page](../../network.md).

### See what is open, and from where

```bash
sudo diffuse-coordinator firewall status
sudo diffuse-node-agent firewall status
```

[`firewall status`](firewall-status.md) on the coordinator's machine,
[`diffuse-node-agent firewall status`](../agent-cli/firewall-status.md) on a
machine that computes. Both change nothing.

### Let in a network behind a router, or every source

`local` is the default: the private networks the machine is on. Add a network
when machines or applications reach this one through a router; `any` only when
something in front of the machine filters for you. The choice is remembered.

```bash
sudo diffuse-coordinator firewall open --from local,10.20.0.0/16
sudo diffuse-coordinator firewall open --from 10.20.0.0/16
sudo diffuse-coordinator firewall open --from any
sudo diffuse-coordinator firewall open --from local
```

[`firewall open`](firewall-open.md). On a machine with a public address,
`any` puts 8443, 7446 and 7444 on the Internet: each still needs its key,
account or token, but the ports can be scanned.

### Choose at install, or leave the firewall alone

```bash
sudo DIFFUSE_FIREWALL_FROM=local,10.20.0.0/16 apt-get install ./diffuse-coordinator_amd64.deb
sudo DIFFUSE_NO_FIREWALL=1 apt-get install ./diffuse-coordinator_amd64.deb
sudo diffuse-coordinator firewall status
```

The same two variables work for the node agent's package. With
`DIFFUSE_NO_FIREWALL=1` the install lists the commands it would have run;
[`firewall status`](firewall-status.md) shows them again later.

### Close enrolment once every machine has joined

```bash
sudo diffuse-coordinator firewall close-enrolment
sudo diffuse-coordinator firewall open
```

[`firewall close-enrolment`](firewall-close-enrolment.md) removes every rule
for 7444; machines already in the pool are not affected.
[`firewall open`](firewall-open.md) opens it again the day a new machine joins.

### After a move to another network, or a new address

The rules name networks and the coordinator's certificate names addresses. Put
both right on the coordinator's machine, then on each machine that computes:

```bash
sudo diffuse-coordinator firewall status
sudo diffuse-coordinator firewall open
sudo diffuse-coordinator certificate renew
sudo diffuse-node-agent firewall open
sudo diffuse-node-agent config set-coordinator https://192.168.20.5:7443
sudo systemctl restart diffuse-node-agent
```

[`firewall status`](firewall-status.md) · [`firewall open`](firewall-open.md) ·
[`certificate renew`](certificate-renew.md) ·
[`diffuse-node-agent firewall open`](../agent-cli/firewall-open.md) ·
[`diffuse-node-agent config set-coordinator`](../agent-cli/config-set-coordinator.md).
No machine is enrolled again. A DHCP reservation for the coordinator in your
router makes the last two lines unnecessary.

## Synopsis

```
diffuse-coordinator firewall <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`status`](firewall-status.md) | Which of this machine's ports are reachable, from where, and why |
| [`open`](firewall-open.md) | Open the coordinator's ports to the private networks this machine is on |
| [`close-enrolment`](firewall-close-enrolment.md) | Close enrolment, once every machine has joined |

## Notes

Four ports on the coordinator's machine have to be reachable: 7443 (every node's heartbeats and slices, mTLS, useless without a client certificate), 7444 (enrolment), 7446 (the console and people signing in) and 8443 (the API). The package opens them at install when the firewall is ufw or firewalld, including one installed and not yet enabled, to the private networks this machine's interfaces are on and to nothing else, and they are back after a reboot: a rule open to every source, on a machine with a public interface, is a port on the Internet. Rules written by hand in nftables or iptables are never changed: the command is printed instead. Set `DIFFUSE_NO_FIREWALL=1` when installing to leave the firewall alone, or `DIFFUSE_FIREWALL_FROM` to let in more (see `firewall open`). The node agent's package opens its own data port the same way.

## Examples

---

[← All commands](index.md)
