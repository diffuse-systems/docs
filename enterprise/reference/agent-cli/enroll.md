# `diffuse-node-agent enroll`

Join a cluster with a token: verify, generate a key, obtain a certificate, and write it all into the state directory.

## Synopsis

```
diffuse-node-agent enroll [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--endpoint` | `<ENDPOINT>` | `$DIFFUSE_ENROLL_ENDPOINT` | The coordinator's provisioning endpoint, e.g. https://coordinator.internal:7444 |
| `--token` | `<TOKEN>` | `$DIFFUSE_JOIN_TOKEN` | The join token, as printed by `diffuse-coordinator token create` |
| `--hostname` | `<HOSTNAME>` | `$DIFFUSE_NODE_NAME` | What to call this machine. A hint only: the coordinator assigns the name, and may assign a different one |
| `--force` | flag | - | Replace an identity already in the state directory |

## Notes

The endpoint comes from `/etc/diffuse/agent.toml`, which the package writes at install time, so enrolling on a packaged machine is the token and nothing else. `--endpoint` overrides it for a machine configured some other way.

A machine that already holds an identity is not re-enrolled: a second run of Ansible, a reboot or a package reinstall costs no token use and creates no second node.

## Examples

```bash
$ diffuse-node-agent enroll --token DFE1-MXARW34E-WMV4J25CW2ZAKW0WP9DMQFX5N4-RBYGXGZPNPAJRBHV4DGZHZSAGW-A8
```

```
enrolled as node-04.
  coordinator  https://coordinator.internal:7443
  identity     /var/lib/diffuse-node-agent/node.crt

The agent starts on boot. Start it now with:

    sudo systemctl start diffuse-node-agent
```

---

[← All commands](index.md)
