# `diffuse-node-agent enroll`

Join a cluster with a token: verify, generate a key, obtain a certificate, and write it all into the state directory.

## Synopsis

```
diffuse-node-agent enroll [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--endpoint <ENDPOINT>` | text | `$DIFFUSE_ENROLL_ENDPOINT` | The coordinator's provisioning endpoint, e.g. https://coordinator.internal:7444 |
| `--token <TOKEN>` | text | `$DIFFUSE_JOIN_TOKEN` | The join token, as printed by `diffuse-coordinator token create` |
| `--hostname <HOSTNAME>` | text | `$DIFFUSE_NODE_NAME` | What to call this machine. A hint only: the coordinator assigns the name, and may assign a different one |
| `--force` | switch | - | Replace an identity already in the state directory |

## Notes

**It says which of three things happened, and only one of them is a success.** In the pool: the coordinator has registered this node. Not in the pool yet: nothing on this machine started the agent, with the command to start it and how to check from the coordinator. Cannot join: this machine cannot reach the address the coordinator gave it, with which of four things is wrong, and a non-zero exit.

The endpoint comes from `/etc/diffuse/agent.toml`, which the package writes at install time, so enrolling on a packaged machine is the token and nothing else. `--endpoint` overrides it for a machine configured some other way.

A machine that already holds an identity is not re-enrolled: a second run of Ansible, a reboot or a package reinstall costs no token use and creates no second node.

## Examples

```bash
$ diffuse-node-agent enroll --token DFE1-MXARW34E-WMV4J25CW2ZAKW0WP9DMQFX5N4-RBYGXGZPNPAJRBHV4DGZHZSAGW-A8
```

```
This machine has an identity (node-04); it is not in the pool yet.

  identity     /var/lib/diffuse-node-agent
  coordinator  https://coordinator.internal:7443
  pool         lab
  expires      in 89 days

This node is in the pool.
```

---

[← All commands](index.md)
