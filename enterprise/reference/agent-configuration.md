# The node agent's configuration

Every machine that computes has one file: `/etc/diffuse/agent.toml`. This page
is what is in it, what each setting does, when a change takes effect, and how to
repair the one that strands a machine when it is wrong.

You should rarely need it. The package writes this file at install time and
`enroll` fills in the rest, so a machine that installs and joins never needs it
opened. It matters on the day something moves.

## Where it lives, and who can read it

| | |
|---|---|
| path | `/etc/diffuse/agent.toml` |
| owner | `root:diffuse` |
| mode | `0640` |
| read by | the agent at startup, and `diffuse-node-agent enroll` |

It is `0640` because it may hold a join token. Reading it needs `sudo` or
membership of the `diffuse` group; the agent itself reads it as the `diffuse`
user, which is why the group is on the file rather than the world.

It is a **conffile**: upgrading the package will not overwrite changes you have
made to it.

## What is in it

Print it, rather than opening it, and the agent will tell you what each line
does and when a change to it takes effect:

```bash
sudo diffuse-node-agent config show
```

### `coordinator_endpoint`

Where this agent registers and sends its heartbeats, over mTLS. The one setting
that strands a machine when it is wrong: the agent starts, cannot reach anything,
and the node never appears in `diffuse-coordinator nodes`.

**Takes effect on restart.** The agent reads it once at startup.

Change it with the command below, never with an editor.

### `enrol_endpoint`

Where `enroll` presents a join token. A different port and a different trust
from the setting above: enrolment happens on the provisioning listener with a
token that pins the certificate authority, and everything afterwards happens on
the mTLS listener with a certificate.

**Read only by `enroll`, on a machine that holds no identity.** A running agent
never looks at it, so a stale value strands nobody today and strands the next
machine rebuilt from this file. When it is absent it defaults to
`coordinator_endpoint` with the provisioning port.

### `join_token`

A join token, delivered here by configuration management so that a machine
enrols on first start without anybody typing anything.

**A secret.** Deliver it the way you deliver any other secret: Ansible Vault,
SOPS. Never commit it. It is read **only while the machine has no
identity**, which is what makes a second Ansible run, a reboot or a package
reinstall cost no token use and create no second node.

`config show` prints a nine-character prefix of it and never the whole thing.

### `display_name`

The label an operator sees in `nodes`. Defaults to the machine's hostname; set
it where a hostname names a person rather than a machine.

**Takes effect on restart.**

### `[tls]`

Certificate authority, certificate and key, for a machine whose identity you
manage yourself. Absent in the normal case: `enroll` writes an identity into the
state directory and the agent uses it without being told.

**Takes effect on restart.**

## There is no `node_id`

The agent's identity is the one in the certificate it presents, read at startup.
A configuration file cannot disagree with it, because it is never asked. A node
that claims a name in a request body is making an assertion; the name that
counts is the one the certificate carries.

## Moving a machine to a different coordinator

The coordinator changed address, or the wrong one was written at enrolment.

```bash
sudo diffuse-node-agent config set-coordinator https://coordinator-b.internal:7443
sudo systemctl restart diffuse-node-agent
```

**The address is checked before it is written.** If nothing answers, nothing is
written, and the refusal names which of four things is wrong. A name that does
not resolve, a port that refuses, a connection that is dropped by a firewall, or
a handshake that fails, with the command to run next:

```
error: https://typo.internal:7443 is not usable, so it was not written: the name
"typo.internal" could not be looked up from this machine.

Check it here:

    getent hosts typo.internal
```

On a machine that has enrolled, the check is a full mTLS connection, so it also
catches an address where *something* is listening but it is not this
deployment's coordinator. On a machine that has not yet enrolled there is no
identity to present, so only a TCP connection is possible, and the command says
that is all it did rather than implying the stronger check.

`--unchecked` writes the address without checking. It exists for one honest
case: configuring a machine before the coordinator it will join exists.

The command reports a stale `enrol_endpoint` rather than rewriting it. The two
are different ports and different trust, and a command that changes a setting
you did not ask it to touch is a command that surprises you later.

## If the whole fleet is pointed at the wrong address

Then the token that enrolled them was printing one. `token create` prints the
address the **coordinator** advertises, and when no operator has stated one it
derives it from the coordinator's own hostname, which is right whenever your
machines resolve that name, and wrong when they do not. A coordinator in a
container is the normal case for the second.

Settle it once, on the coordinator:

```toml
# /etc/diffuse/coordinator.toml
advertise_endpoint = "https://coordinator.internal:7443"
```

Restart it, and every token issued after that carries the right address. The
tokens already issued do not change; the machines they enrolled are repaired
with `config set-coordinator` above.

## What a change does not do

Nothing here is read while the agent is running. There is no reload, and
`config set-coordinator` deliberately does not restart the service: restarting a
compute node, with a model loaded and requests in flight, is not something a
configuration command should decide to do on your behalf. It prints the command
and leaves the timing to you.

---

[← Reference](../reference.md) · [Every agent command](./agent-cli/index.md)
