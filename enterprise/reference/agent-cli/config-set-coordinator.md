# `diffuse-node-agent config set-coordinator`

Point this machine at a different coordinator.

**The address is checked before it is written.** A coordinator that moved, or the wrong address written at enrolment, used to be repaired by editing a TOML file as root and restarting to find out whether the guess was right. This dials first and refuses an address nothing answers on, naming which of the four things is wrong.

## Synopsis

```
diffuse-node-agent config set-coordinator <ENDPOINT> [OPTIONS]
```

## Arguments

| argument | required | description |
|---|---|---|
| `ENDPOINT` | yes | The coordinator's mTLS endpoint, e.g. https://coordinator.internal:7443 |

## Options

| flag | value | default | description |
|---|---|---|---|
| `--unchecked` | flag | - | Write the address without checking that anything answers on it |

## Notes

**The address is checked before it is written.** An unresolvable name, a refused port, a connection that is dropped and a handshake that fails are four different problems with four different commands to run, and the refusal names which one this is. Nothing is written when the check fails.

On a machine that has enrolled, the check is a full mTLS connection, so it also catches an address where something listens but it is not this deployment's coordinator. On one that has not, only a TCP connection is possible and the command says that is all it did.

`--unchecked` writes the address anyway. It is for one honest case: configuring a machine before the coordinator it will join exists.

## Examples

```bash
$ sudo diffuse-node-agent config set-coordinator https://coordinator-b.internal:7443
```

```
https://coordinator-b.internal:7443 answered, and its certificate is this deployment's.

/etc/diffuse/agent.toml now points at https://coordinator-b.internal:7443.
  it pointed at https://coordinator.internal:7443

The agent reads this file at startup, so this takes effect on:

    sudo systemctl restart diffuse-node-agent
```

```bash
$ sudo diffuse-node-agent config set-coordinator https://typo.internal:7443
```

```
error: https://typo.internal:7443 is not usable, so it was not written: the name
"typo.internal" could not be looked up from this machine.

Check it here:

    getent hosts typo.internal
```

---

[← `diffuse-node-agent config`](config.md) · [All commands](index.md)
