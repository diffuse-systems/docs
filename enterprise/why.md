# Why Diffuse Enterprise

Most organisations already run a language model somewhere. Almost none of them
could survive being asked to prove who used it, on what, and under whose
authority.

This page is the long version of that argument: what a dev-tool deployment
looks like when an auditor examines it, and what was built instead.

## The deployment you probably have

Somebody on a team wanted to try a model, so they installed an inference
server. It worked, so a second team did the same. There is a notebook
somewhere, a container started in March, and a workstation under a desk that
several people now depend on.

Every part of that is reasonable and the whole is unauditable. Here is why,
control by control.

### Access: an open port is an open door

The usual inference server binds a port and serves whoever reaches it. That is
correct for a laptop and becomes a finding the moment the port is opened to the
network.

**There is no token, no account, no identity and no rate limit.** Anyone who can
route to the host can send requests, read the answers, and exhaust the machine.
The access control is the firewall rule, and firewall rules are edited by people
in a hurry at the end of a sprint.

### Transport: plaintext across the estate

The default is HTTP, because the default was written for a loopback address.
Prompts, uploaded documents and completions then cross the corporate network
unencrypted.

Where transport encryption is a stated control, that single unchanged default is
the difference between a deployment and an incident report.

### Identity: nobody is anybody

There is no notion of who made a request. Not a certificate, not an account, not
a key.

Every question beginning with "who" is therefore unanswerable rather than
difficult. Who submitted that summary on the fourteenth? Who ran the extraction
that produced this document? The logs hold an address, and the address is a
proxy.

### Audit: nothing is written down

No record of who deployed which weights, who replaced them, who was refused, or
what was refused. A log of stack traces is not an audit trail, and
reconstructing one from three teams' shell histories is not evidence.

### Governance: no centre, so no control

Each team runs its own. Nobody can enumerate how many models are running, on
what hardware, under which model licences, against which data.

A control you cannot enumerate is a control you do not have. That sentence is
usually the one that ends the meeting.

### Reach: available to the few

Because it is somebody's machine, it serves that team. The rest of the
organisation does without, or starts a second one, and now there are two of
everything to not audit.

## What that costs in a regulated environment

Under GDPR, medical confidentiality, financial supervision or
critical-infrastructure rules, the above are not remarks in an annexe. They are
controls that were not implemented:

| The control | The finding |
|---|---|
| Access control on the service | none; the network is the control |
| Encryption in transit | not enabled |
| Attribution of actions to identities | not possible |
| Audit logging and retention | absent |
| Segregation of duties | no roles exist |
| Asset inventory | no central register of what runs where |
| Data flow documentation | unknown, per team |

Any one of these stops a project in a regulated environment. Together they mean
the deployment does not get remediated, it gets rebuilt.

## What was built instead

Each of these exists because the thing above it does not.

**Mutual TLS on every connection, TLS 1.3 only.** No plaintext transport in any
configuration, including development defaults, and no flag that turns it off.

**Identity from the certificate.** A node's identity is its certificate's SAN
URI. A node id in a request body is an assertion checked against the peer
certificate, never a fact. A machine cannot become another machine by asking.

**Enrolment through a single-use token**, on the only port reachable by
something without a certificate. Revoking an identity is one command and takes
effect on the next request.

**API keys with expiry and scope**, hashed at rest, shown once. A reporting
service gets a key that reaches one model and stops working on a date you chose.

**Roles**, so the people who deploy a model are not necessarily the people who
read the trail, and both appear under their own name.

**An append-only audit trail** of every administrative action and every refusal.
Refusals are recorded as deliberately as successes, because a trail holding only
what worked cannot answer whether somebody tried.

**Customer content never reaches that trail.** Not prompts, not completions, not
the rows of a corpus, not a document's text. Asserted by tests that send a
sentinel through a real request and then search every column of every audit row
and both service logs for it, with a positive control so the assertion cannot
pass on an empty trail.

**One coordinator** holding the identities, the entitlement, the placement and
the trail. Enumerating what runs where is one command.

**One endpoint for the organisation**, OpenAI-compatible, so existing clients
work unchanged and access is granted and withdrawn centrally rather than by who
knows which port.

::: tip What this does and does not do
None of it makes an audit pass by itself. What it does is make the answers
exist: the trail is there to produce, the identities are there to enumerate, and
the transport was never in question. That is the difference between preparing
for an audit and rebuilding for one.
:::

## Where it runs

On-premises is where this started and it was never the limit. What the product
requires is that the machines answer to you, not that they sit in your building.

### The fleet you already own

Teaching labs, workstations, a rack that is half used. Idle capacity becomes
serving capacity, and a model too large for any one machine runs across several.
Nothing was bought for this.

### Your own cloud account

GPU instances in your own account, your own network, under your own policy. It
is still your infrastructure: the account is yours, the weights are yours, the
audit trail is yours, and the data does not enter a third party's inference
service.

**You pay for a machine rather than for tokens.** A workload that would cost per
million tokens indefinitely costs an instance-hour, and the bill stops when you
stop the instance. For a steady internal workload that arithmetic usually
favours the machine, and you can check it before committing rather than after.

### One box on a desk

This is the case that changed recently and is worth knowing about.

An **AMD Ryzen AI Halo** or an **NVIDIA DGX Spark** carries 128 GB of unified
memory in a compact, quiet, wall-socket case. AMD states its platform supports
models up to 200 billion parameters; those are the vendor's figures for the
hardware, not a throughput measurement of ours.

What it means here is that one machine on a desk holds a large model whole, for
an entire organisation, with no split at all.

Worth stating plainly, because the splitting story can leave the impression that
this product is for people without capable hardware. **Splitting is the fallback
for machines that cannot hold a model; it is never the requirement.** On one such
box the coordinator places the model whole, and everything else — the identities,
the roles, the trail, the entitlement, the endpoint — is identical.

The same is true of a data-centre accelerator, and of a server with enough
system memory. The question placement asks is only ever whether the model fits.

## What we do not claim

**Not a hardened multi-tenant boundary.** A deployment is one organisation.

**No confidential computing.** Weights and activations sit in ordinary memory.
Somebody with root on a node can read what that node is processing.
Administrative control of the machines is the boundary this product assumes.

**Not a compliance certificate.** We provide the controls and the evidence they
produce. Whether your programme accepts them is between you and your auditor,
and we would rather help you check that before a pilot than after.

[Security and threat model](/enterprise/security) states every surface and what
is not mitigated.
