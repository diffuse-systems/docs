# `diffuse-coordinator firewall`

The three ports this machine must expose, and the host firewall in front of them.

The package opens 7443, 7444 and 8443 at install when the firewall is ufw or firewalld, and prints the command to type when the rules are written by hand. Every change is on the audit trail.

## Synopsis

```
diffuse-coordinator firewall <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`status`](firewall-status.md) | Which of the three ports are reachable from the network, and why |
| [`open`](firewall-open.md) | Open the control plane, enrolment and the API in the host firewall |
| [`close-enrolment`](firewall-close-enrolment.md) | Close enrolment, once every machine has joined |

## Notes

Three ports on the coordinator's machine have to be reachable: 7443 (every node's heartbeats and slices, mTLS, useless without a client certificate), 7444 (enrolment) and 8443 (the API). The package opens them at install when the firewall is ufw or firewalld. Rules written by hand in nftables or iptables are never changed: the command is printed instead. Set `DIFFUSE_NO_FIREWALL=1` when installing to leave the firewall alone. Nothing is opened on a node.

## Examples

---

[← All commands](index.md)
