# CLI reference

Every command of `diffuse-node-agent`, generated from the binary itself. If a page here disagrees with what your terminal prints, the page is a bug: a test regenerates all of this and fails on any difference.

## [`enroll`](enroll.md)

Join a cluster with a token: verify, generate a key, obtain a certificate, and write it all into the state directory

```bash
diffuse-node-agent enroll --token DFE1-MXARW34E-WMV4J25CW2ZAKW0WP9DMQFX5N4-RBYGXGZPNPAJRBHV4DGZHZSAGW-A8
```

## [`status`](status.md)

What this machine knows about itself. Reads local files only and talks to nobody, so it answers on a machine that has been cut off for a week

```bash
diffuse-node-agent status
```

## [`config`](config.md)

Read this agent's configuration file, and repair the one setting that strands a machine when it is wrong

| command | what it does |
|---|---|
| [`config show`](config-show.md) | Every setting in /etc/diffuse/agent.toml, what it does, and when a change to it takes effect |
| [`config set-coordinator`](config-set-coordinator.md) | Point this machine at a different coordinator |

## [`firewall`](firewall.md)

The data port this machine must expose, and the host firewall in front of it

| command | what it does |
|---|---|
| [`firewall status`](firewall-status.md) | Whether the data port is reachable, from where, and why |
| [`firewall open`](firewall-open.md) | Open the data port to the private networks this machine is on |

