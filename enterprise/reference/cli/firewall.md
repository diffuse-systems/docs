# `diffuse-coordinator firewall`

The ports this machine must expose, and the host firewall in front of them.

The package opens 7443, 7444, 7446 and 8443 at install when the firewall is ufw or firewalld, to the private networks this machine is on, and prints the command to type when the rules are written by hand. Every change is on the audit trail.

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
