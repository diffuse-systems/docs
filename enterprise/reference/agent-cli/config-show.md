# `diffuse-node-agent config show`

Every setting in /etc/diffuse/agent.toml, what it does, and when a change to it takes effect.

## Synopsis

```
diffuse-node-agent config show
```

## Notes

The file is installed `0640 root:diffuse`, so this needs `sudo` or membership of the `diffuse` group. A join token in it is shown as a nine-character prefix and never in full.

## Examples

```bash
$ sudo diffuse-node-agent config show
```

```
/etc/diffuse/agent.toml

  coordinator_endpoint   https://coordinator.internal:7443
                         where this agent registers and heartbeats, over mTLS
                         takes effect on `systemctl restart diffuse-node-agent`

  enrol_endpoint         https://coordinator.internal:7444
                         where `enroll` presents its token
                         read at the next enrolment, not by a running agent
```

---

[← `diffuse-node-agent config`](config.md) · [All commands](index.md)
