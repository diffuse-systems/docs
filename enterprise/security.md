# Security

Every surface that is reachable from outside a process, what it is exposed to,
and what is not mitigated. The last part is the point: a threat model that only
lists defences is a brochure.

## Principles

**Mutual TLS everywhere, TLS 1.3 only.** No plaintext transport exists, in any
configuration, including development defaults. There is no flag that turns it
off.

**Identity from the certificate.** A node id in a payload is checked against the
peer certificate. A mismatch is refused and named.

**Nothing leaves the deployment.** No telemetry, no activation, no licence
heartbeat, no font from a CDN, no analytics anywhere in the product or its
console.

**Refuse rather than degrade.** A placement that does not fit is refused with
the arithmetic. There is deliberately no `--force`: a flag that overrides a
safety check gets used in exactly the situation it exists to prevent.

## The surfaces

| Surface | Port | Reachable by | Authenticated by |
|---|---|---|---|
| Coordinator control | 7443 | agents, API, admin clients | mTLS |
| Enrolment | 7444 | any machine on the network | a single-use token, then mTLS |
| Console and operator gRPC | 7446 | operators' browsers | session cookie, or mTLS for gRPC |
| Public API | 8443 | customer applications | bearer API key over TLS |
| Node data plane | ephemeral | the previous slice in the pipeline | mTLS |

### Enrolment, 7444

The only surface reachable by something with no certificate. A token is
single-use by default, carries a time to live, and is stored hashed. A stolen
token is worth one machine until it expires or is spent, and revoking the
resulting identity is one command.

Not mitigated: a token intercepted before use is indistinguishable from the
machine you meant to enrol. Treat one like a password when you paste it, and
prefer short lifetimes.

### The public API, 8443

Keys are hashed at rest, shown once, and can carry an expiry and a scope. Rate
limits are per key.

Not mitigated: a key with wide scope is a key with wide scope. Scope them, and
give a reporting service a key that reaches one model.

### The console, 7446

Three layers against cross-site request forgery: `SameSite=Strict`, an `Origin`
compared against the `Host`, and a double-submit token. Content security policy
with no `unsafe-inline` and no `unsafe-eval`. Fonts embedded in the binary.

Not mitigated: an operator's workstation is trusted. A session cookie stolen
from a compromised browser works until it is revoked or expires.

### The worker

Runs with no network reach, only the accelerators the placement was sized
against, and a model directory it does not choose. Document extraction runs in a
separate short-lived process because a malformed PDF is both a plausible attack
and a plausible accident.

Not mitigated: a model file is executable content in the sense that a malicious
GGUF could target a parser bug in a backend. The coordinator parses and vets
headers before a node ever sees a file, and a file that fails is refused with
the reason, but the backends are third-party C++ and the residual risk is
theirs.

### Model acquisition

A catalogue name is resolved by the coordinator against its own compiled-in
table. A caller never sends a URL, so no caller can make the machine holding the
deployment's authority fetch one. Digests are checked and a mismatch deletes the
file rather than warning about it.

Not mitigated: `model pull <owner>/<repo>` does reach a public hub over TLS,
because that is what the command is. Air-gapped sites use `model import --from`
and reach nothing.

## What we do not claim

**Not a hardened multi-tenant boundary.** A deployment is one organisation.
Roles separate people inside it who are broadly trusted; they are not a sandbox
between mutually hostile tenants.

**No confidential computing.** Weights and activations are in ordinary memory on
ordinary machines. Somebody with root on a node can read what that node is
processing. Physical and administrative control of the machines is the boundary.

**No protection against a compromised coordinator.** It holds the enrolment
authority; whoever holds that can mint identities. This is why the root key is
copied offline and deleted on day one, so the blast radius stops at enrolment
rather than reaching the deployment's own identity.

**Cryptography is not ours.** rustls for transport, Ed25519 for licences,
Argon2 for passwords, SHA-256 for digests. We wrote none of it and that is
deliberate.

## Reporting something

If you find a vulnerability, tell us before you tell anyone else, and we will
tell you what we are doing about it and when. Contact details are on
[diffuse-systems.com](https://diffuse-systems.com).
