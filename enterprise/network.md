# Network and ports

What has to be reachable, on which machine, and what each package opens for
you. **A standard deployment needs no firewall opened by hand, on any machine,
before or after a reboot, and nothing is opened beyond the private networks
your machines are on.**

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

## What each package opens, machine by machine

Each package opens what its machine needs reachable when it is installed,
through ufw or firewalld, **to the private networks the machine is on, and to
nothing else**. Both save their rules, so the rules are back after a reboot.

| Machine | Package | Opens | Why | What opening it exposes |
|---|---|---|---|---|
| the coordinator's | `diffuse-coordinator` | **7443** | every node's heartbeats, slices, training work and renewals | nothing to a peer without a client certificate from your deployment's authority |
| | | **7444** | a machine joining with a token | a listener that accepts join tokens; close it once the park is built |
| | | **7446** | the console, and people signing in from the CLI | a sign-in page; every action needs an account |
| | | **8443** | the OpenAI-compatible API | the product; every call needs an API key |
| every machine that computes | `diffuse-node-agent` | **7445** | the api, and the other machines of a split pipeline, send it the model's traffic | nothing to a peer without a certificate from your deployment's authority |

What each package does, by firewall:

- **ufw or firewalld, on:** the rules are added through them, beside yours, each
  naming the network it lets in.
- **ufw or firewalld installed and off:** the rules are registered anyway, so
  turning the firewall on later does not cut Diffuse off.
- **nftables or iptables rules written by hand:** nothing is changed. A rule
  inserted into a policy the product did not write could reorder or shadow one
  of yours, so the exact command is printed for you to type.
- **No firewall at all:** there is nothing to open, and the install says so.

Each install ends by listing its ports and their state. On the coordinator the
opening is also on the audit trail (`diffuse-coordinator audit --action
firewall.open`), and `licence set` lists the ports again. At any time:

```bash
sudo diffuse-coordinator firewall status     # on the coordinator's machine
sudo diffuse-node-agent firewall status      # on a machine that computes
```

**Install opens, upgrade never does.** A first install opens, and so does an
install after `apt purge`. An upgrade leaves the firewall exactly as you left
it, so enrolment you closed stays closed; if a port the version expects open is
shut, the upgrade says so and gives the command.

## Refusing it

Install with `DIFFUSE_NO_FIREWALL=1`, on either package, and the firewall is
left alone:

```bash
sudo DIFFUSE_NO_FIREWALL=1 apt-get install ./diffuse-coordinator_amd64.deb
sudo DIFFUSE_NO_FIREWALL=1 apt-get install ./diffuse-node-agent_cpu_amd64.deb
```

The ports are still listed, and on the coordinator the decision is on the audit
trail.

## Who the rules let in

**The private networks the machine is on, read from its interfaces when the
rules are written, and nothing else:** `10.0.0.0/8`, `172.16.0.0/12`,
`192.168.0.0/16`, IPv4 link-local, and IPv6 unique local and link-local. An
interface with a public address gets no rule, so on a machine that has one the
ports are not on the Internet. A bridge on the machine, Docker's for instance, is
a private network too.

```
7443  control plane: heartbeats and slices, mTLS         from 192.168.178.0/24 (wlan0)
```

**Letting in more is named out loud:**

```bash
# a network behind a router, besides the ones the machine is on
sudo diffuse-coordinator firewall open --from local,10.20.0.0/16

# public addresses, as some university networks use
sudo diffuse-coordinator firewall open --from 141.20.0.0/16

# every source; on a machine with a public interface, the Internet
sudo diffuse-coordinator firewall open --from any
```

The node agent takes the same `--from`, and at install the same words go in
`DIFFUSE_FIREWALL_FROM`. The choice is remembered, so a later `firewall open`
keeps it. The rules this product removes are only the ones it wrote, never one of
yours.

## When a machine changes network

The rules name networks and the coordinator's certificate names addresses. A new
address on the same network changes no rule, but a node that registered at the
coordinator's old address no longer finds it: a DHCP reservation for the
coordinator avoids all of this. When a machine moves anyway, `firewall status`
says what no longer matches, and nothing is put right by itself:

```bash
# on the coordinator's machine
sudo diffuse-coordinator firewall open
sudo diffuse-coordinator certificate renew

# on each machine that computes
sudo diffuse-node-agent firewall open
# on one that registered at the coordinator's old address
sudo diffuse-node-agent config set-coordinator https://<the new address>:7443
sudo systemctl restart diffuse-node-agent
```

**No machine is enrolled again.** Nodes trust the deployment's root, which does
not change; `certificate renew` issues only the coordinator's own certificate,
and needs the root key once.

## Enrolling by address

A node registers where it enrolled: by the coordinator's name, or by its
address. On a network that does not resolve the coordinator's name, enrol by its
address, which `token create` prints:

```bash
sudo diffuse-node-agent enroll --endpoint https://192.168.178.20:7444 --token <the token>
```

The coordinator's certificate names every address on its interfaces, so the
connection is verified by address, with no name service.

On an all-in-one machine, only 8443 needs to leave the box: bind the rest to
`127.0.0.1` and no rule is written for them.

## Who starts each connection

**Every control connection is opened by the machine that computes.** Enrolling,
registering, heartbeats, fetching a slice, training work and renewing a
certificate all go from the agent to the coordinator. The coordinator never
connects to a machine that computes.

**The data plane is the exception, and it is why a node opens 7445.** The api
connects to port 7445 on the machine that holds the first slice of a model.
When a model is split across several machines, that machine connects to 7445 on
each of the others. A machine that serves a model accepts connections on 7445,
even when it holds the whole model. A version in which machines that compute
accept no connection at all is designed and has not shipped; estates that
require it refuse the opening with `DIFFUSE_NO_FIREWALL=1` until it does.

### Port by port, by topology

| Topology | Coordinator machine | Api machine | Each machine that computes |
|---|---|---|---|
| everything on one machine | 8443 from your applications | the same machine | the same machine |
| coordinator and api together | 7443 and 7444 from your machines, 7446 from operators, 8443 from applications | the same machine | 7445 from the api machine |
| a model split across machines | as above | the same machine | 7445 from the api machine **and every other machine of that pipeline** |
| the api on a machine of its own | 7443 from the api machine as well | 8443 from applications | 7445 from the api machine |

## When a node's data port is shut

A node whose 7445 is shut enrols and shows as healthy, because every connection
it makes is outbound. It fails when it is first asked to serve, and the request
says so, naming the machine and the port:

```
503 node_unavailable: the machine holding "qwen2.5-3b" (rechner-02) does not answer
on port 7445: something on the way, most likely the firewall on rechner-02, drops
the connection. [...] The operator opens it on rechner-02 with
`sudo diffuse-node-agent firewall open`.
```

## Enrolment: open by default, closed once the park is built

When every machine has joined, close enrolment. It is the right move once the
park is built: a listener that accepts join tokens from your whole network is
only worth having while machines are joining.

```bash
sudo diffuse-coordinator firewall close-enrolment
```

By hand, the same thing, for each network `firewall status` lists on 7444:

```bash
# ufw
sudo ufw delete allow from 192.168.178.0/24 to any port 7444 proto tcp

# firewalld
sudo firewall-cmd --permanent --remove-rich-rule='rule family="ipv4" source address="192.168.178.0/24" port port="7444" protocol="tcp" accept'
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

## Checking two real computers

The installation guide carries a line-by-line checklist for two machines on one
network, with the command on each side and the expected result at each line:
install, enrol by address, serve on the second machine, reboot both, and the
same request answering. It is what the release tests prove in containers, to run
on real hardware, along with a coordinator that has a public interface and a
move to another network.

---

[Deployment](./deployment.md) - [Surfaces and threat model](./security.md)
