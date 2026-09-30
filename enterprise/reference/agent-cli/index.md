# CLI reference

Every command of `diffuse-node-agent`, generated from the binary itself. If a page here disagrees with what your terminal prints, the page is a bug: a test regenerates all of this and fails on any difference.

## Where to start

`diffuse-node-agent` runs on every machine that computes. Installed from its
package, it runs as a systemd service; the commands below are what you type on
that machine.

### Join the pool

With the line `token create` printed on the coordinator's machine, by name or,
on a network that does not resolve it, by address:

```bash
sudo diffuse-node-agent enroll --endpoint https://coordinator.internal:7444 --token DFE1-7QW2M4ZP-...
sudo diffuse-node-agent enroll --endpoint https://192.168.178.20:7444 --token DFE1-7QW2M4ZP-...
```

[`enroll`](enroll.md) says which of three things happened: in the pool, not in
the pool yet with the command that starts the agent, or cannot join with the
reason. It enrols once; running it again costs no token.

### See what this machine knows about itself

It reads local files and talks to nobody, so it answers on a machine that has
lost its coordinator:

```bash
sudo diffuse-node-agent status
```

[`status`](status.md): its identity, when its certificate ends, where it
registers, when it last reached the coordinator and what it is serving.

### Repair a machine that stopped serving

Three causes cover most of it: a data port closed by hand, a coordinator that
moved, or a firewall changed.

```bash
sudo diffuse-node-agent firewall status
sudo diffuse-node-agent firewall open
sudo diffuse-node-agent config show
sudo diffuse-node-agent config set-coordinator https://192.168.20.5:7443
sudo systemctl restart diffuse-node-agent
```

[`firewall status`](firewall-status.md) · [`firewall open`](firewall-open.md) ·
[`config show`](config-show.md) ·
[`config set-coordinator`](config-set-coordinator.md)

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

