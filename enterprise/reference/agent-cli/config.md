# `diffuse-node-agent config`

Read this agent's configuration file, and repair the one setting that strands a machine when it is wrong.

## What you do with it

The agent reads `/etc/diffuse/agent.toml` and the identity it enrolled with.
One setting strands a machine when it is wrong: the coordinator's address.

### See every setting and when a change takes effect

```bash
sudo diffuse-node-agent config show
```

[`config show`](config-show.md)

### The coordinator moved to another address

Point the machine at the new address; it is checked before it is written. The
machine keeps its identity and is not enrolled again:

```bash
sudo diffuse-node-agent config set-coordinator https://192.168.20.5:7443
sudo systemctl restart diffuse-node-agent
```

[`config set-coordinator`](config-set-coordinator.md). A DHCP reservation for
the coordinator in your router makes this unnecessary.

### The coordinator is down while you change it

`--unchecked` writes the address without asking the coordinator first:

```bash
sudo diffuse-node-agent config set-coordinator https://192.168.20.5:7443 --unchecked
```

[`config set-coordinator`](config-set-coordinator.md)

## Synopsis

```
diffuse-node-agent config <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`show`](config-show.md) | Every setting in /etc/diffuse/agent.toml, what it does, and when a change to it takes effect |
| [`set-coordinator`](config-set-coordinator.md) | Point this machine at a different coordinator |

---

[← All commands](index.md)
