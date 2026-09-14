# Network and ports

What has to be reachable, on which machine, and in which direction. Firewall
rules are written from this page, so it says where each connection starts rather
than only which ports exist.

## The five ports

| Port | Listener | Who connects | Credential |
|---|---|---|---|
| 7443 | coordinator control plane | agents, the api, service credentials | mTLS |
| 7444 | coordinator enrolment | a machine enrolling, once | a join token, then mTLS |
| 7446 | coordinator operator plane | people, at the CLI or in the console | TLS and a session |
| 7445 | node data listener | the api machine, and peer nodes when a model is split | mTLS |
| 8443 | public API | your applications | a bearer API key over TLS |

The operator plane is bound only when it is configured, and a node's data
listener only while that node holds a slice. A machine that is not computing
listens on nothing.

## Before you size the project

**Serving a model on a node requires an inbound rule on that node, and a park of
N nodes that serve requires N rules.** This is what a network architect needs to
know before sizing the project, not after. On this version the api, and the head
of a split pipeline, connect to port 7445 on every machine that computes. A
version where machines that compute accept no connection at all is being
designed and has not shipped.

## Who starts each connection

**Every control connection is opened by the machine that computes.** Enrolling,
registering, heartbeats, fetching a slice, training work and renewing a
certificate all go from the agent to the coordinator. The coordinator never
connects to a machine that computes.

**The data plane is the exception.** The api connects to port 7445 on the
machine that holds the first slice of a model. When a model is split across
several machines, that machine connects to 7445 on each of the others. A machine
that serves a model therefore accepts connections on 7445, even when it holds
the whole model.

## Port by port, machine by machine

### Everything on one machine

| Machine | Accepts |
|---|---|
| the one machine | 8443 from your applications |

Bind the other listeners to `127.0.0.1` and nothing but the public API is on the
network.

### Coordinator and api together, each model held by one machine

| Machine | Accepts |
|---|---|
| coordinator and api | 7443 and 7444 from your machines, 7446 from operators, 8443 from applications |
| each machine that computes | 7445 from the coordinator and api machine |

### A model split across several machines

| Machine | Accepts |
|---|---|
| coordinator and api | 7443 and 7444 from your machines, 7446 from operators, 8443 from applications |
| each machine that computes | 7445 from the api machine, **and from every other machine in the same pipeline** |

### The api on a machine of its own

| Machine | Accepts |
|---|---|
| coordinator | 7443 from your machines and from the api machine, 7444 from your machines, 7446 from operators |
| api | 8443 from applications |
| each machine that computes | 7445 from the api machine, and from peers when a model is split |

## On the coordinator, the package opens three ports

| Port | Why it has to be open | What opening it exposes |
|---|---|---|
| 7443 | every node's heartbeats, slices, training work and renewals; without it no remote node works | nothing to a peer without a client certificate from this deployment's authority |
| 7444 | enrolment: a machine joining with a token | a listener that accepts join tokens; close it once the park is built |
| 8443 | the OpenAI-compatible API | the product; every call needs an API key |

The listeners bind every interface already, so what stands in the way is the
host firewall. **The package opens these three at its first install:**

- **ufw or firewalld active:** the rules are added through them, beside yours.
- **nftables or iptables rules written by hand:** nothing is changed. A rule
  inserted into a policy the product did not write could reorder or shadow one
  of yours, so the exact command is printed for you to type.
- **No firewall:** there is nothing to open, and the install says so.

The end of the install and the end of `licence set` both list the three ports,
their state, and the command that closes enrolment. Every change is on the audit
trail (`diffuse-coordinator audit --action firewall.open`), and `sudo
diffuse-coordinator firewall status` shows the state at any time. An upgrade
never touches the firewall.

**To manage your firewall yourself,** install with `DIFFUSE_NO_FIREWALL=1`:

```bash
sudo DIFFUSE_NO_FIREWALL=1 apt-get install ./diffuse-coordinator_*.deb
```

**Nothing is opened on a node.** The agent package never touches a firewall. On a
node with one, allow 7445 from the api machine, and from the other machines of a
pipeline, yourself:

```bash
sudo ufw allow from 10.0.0.5 to any port 7445 proto tcp
```

## Closing enrolment once the park is built

When every machine has joined, close enrolment. It is the right move once the
park is built: a listener that accepts join tokens from your whole network is
only worth having while machines are joining.

```bash
sudo diffuse-coordinator firewall close-enrolment
```

By hand, the same thing:

```bash
# ufw
sudo ufw delete allow 7444/tcp

# firewalld
sudo firewall-cmd --permanent --remove-port=7444/tcp
sudo firewall-cmd --reload
```

Without a firewall, bind the listener to the coordinator itself in
`/etc/diffuse/coordinator.toml`, then restart it:

```toml
provisioning_listen_addr = "127.0.0.1:7444"
```

### What closing it does not affect

**New enrolments stop, and nothing else changes.** A machine that has already
joined registers, sends heartbeats, fetches its slices, runs training and renews
its certificate over connections it opens to 7443. Closing 7444 leaves the park
exactly as it was. Reopen it the day a new machine joins, with `sudo
diffuse-coordinator firewall open`.

Closing 7443 empties the pool, since every heartbeat arrives there. Closing 8443
makes no sense: the API is the product.

---

[Deployment](./deployment.md) - [Surfaces and threat model](./security.md)
