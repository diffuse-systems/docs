# `diffuse-coordinator node`

Manage node identities.

## What you do with it

A machine that computes joins with a token, once. From then on its identity is
a certificate that renews itself.

### Enrol a machine by its name

On the coordinator's machine, create a token; on the new machine, install the
node agent's package and enrol with the line the token prints:

```bash
sudo diffuse-coordinator token create --pool lab --max-uses 1 --ttl 1h
sudo diffuse-node-agent enroll --endpoint https://coordinator.internal:7444 --token DFE1-7QW2M4ZP-...
sudo diffuse-coordinator nodes
```

[`token create`](token-create.md) ·
[`diffuse-node-agent enroll`](../agent-cli/enroll.md) · [`nodes`](nodes.md).
The machine is in the pool when `enroll` says so and `nodes` shows it healthy.

### Enrol a machine by address

On a network that does not resolve the coordinator's name, use its address.
The machine then registers at that address, and needs no name service:

```bash
sudo diffuse-node-agent enroll --endpoint https://192.168.178.20:7444 --token DFE1-7QW2M4ZP-...
```

[`diffuse-node-agent enroll`](../agent-cli/enroll.md). The coordinator's
certificate names every address it had when it was issued; after an address
change, [`certificate renew`](certificate-renew.md) first.

### See the machines

```bash
sudo diffuse-coordinator nodes
sudo diffuse-coordinator nodes --wide
```

[`nodes`](nodes.md) shows health, memory and whether each machine counts
towards the licence; `--wide` adds what each is serving, its speed and when
its certificate ends.

### Remove a machine for good

Revoking refuses its certificate from the next call, takes it off the cluster
and returns its licence seat. Its name is retired.

```bash
sudo diffuse-coordinator node revoke rechner-02 --reason "returned to IT"
sudo diffuse-coordinator node list-revoked
```

[`node revoke`](node-revoke.md) · [`node list-revoked`](node-list-revoked.md)

### Replace a machine, or one that was reinstalled

Revoke the old identity, enrol the new machine with a fresh token (it joins
under a new name), then place the model again: `deployment list` prints the
exact line for a deployment that lost its machine.

```bash
sudo diffuse-coordinator node revoke rechner-02 --reason "replaced by rechner-07"
sudo diffuse-coordinator token create --pool lab --max-uses 1 --ttl 1h
sudo diffuse-node-agent enroll --endpoint https://coordinator.internal:7444 --token DFE1-4KPFWJV8-...
sudo diffuse-coordinator deployment list
sudo diffuse-coordinator deployment rm qwen2.5-3b-nere9 && sudo diffuse-coordinator model serve qwen2.5-3b --pool lab
```

[`node revoke`](node-revoke.md) · [`token create`](token-create.md) ·
[`diffuse-node-agent enroll`](../agent-cli/enroll.md) ·
[`deployment list`](deployment-list.md) · [`deployment rm`](deployment-rm.md) ·
[`model serve`](model-serve.md)

## Synopsis

```
diffuse-coordinator node <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`revoke`](node-revoke.md) | Revoke a node identity: refuse it at every call and evict it now |
| [`list-revoked`](node-list-revoked.md) | List revoked node identities |

---

[← All commands](index.md)
