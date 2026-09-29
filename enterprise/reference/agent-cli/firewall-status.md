# `diffuse-node-agent firewall status`

Whether the data port is reachable, from where, and why.

## Synopsis

```
diffuse-node-agent firewall status [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--if-closed` | flag | - | Set by the package on an upgrade: print only a port this version expects open and finds shut, and change nothing |

## Notes

Needs root: without it, every firewall reads as none.

## Examples

```bash
$ sudo diffuse-node-agent firewall status
```

```
Reachable from your network, on this machine (firewall: ufw):

    7445  data plane: the api and pipeline peers, mTLS       from 192.168.178.0/24 (eth0)

  The private networks this machine is on: 192.168.178.0/24 (eth0). The rules
  this product writes let in the private networks this machine is on.
```

---

[← `diffuse-node-agent firewall`](firewall.md) · [All commands](index.md)
