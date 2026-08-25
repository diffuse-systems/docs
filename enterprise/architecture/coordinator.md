# Coordinator

One per deployment. The machine that decides.

## What it holds

The things that cannot be rebuilt from a package:

- the **enrolment certificate authority** and its private key
- every **node identity** ever issued, and their revocations
- **human accounts**, sessions and roles
- **API keys**, hashed, with their scopes and expiry
- the **audit trail**
- **datasets**, **adapters** and the **model index**

All of it under `/var/lib/diffuse-coordinator`, which is the one directory a
backup must contain. See [Deployment](/enterprise/deployment#backup-and-restore).

## What it decides

**Placement.** Given a model and a pool, which machine or machines will hold it,
and whether that is possible at all. The estimate names every term it is made of
(frozen weights, adapters, gradients, optimiser, activations, runtime, plus
headroom) so a refusal tells an operator which one to change. There is no flag
that overrides it.

**Identity.** A machine presents a join token once and receives a certificate.
Afterwards it authenticates with that certificate and the token is spent.

**Entitlement.** How many machines the licence covers, until when, and which
capabilities are enabled. Checked at enrolment rather than at request time, so
a licence that has run out does not take a running deployment down mid-request.

## Ports

| Port | Protocol | For |
|---|---|---|
| 7443 | mTLS gRPC | agents, the API, and administrative clients |
| 7444 | TLS | enrolment only; the one surface a machine reaches before it has an identity |
| 7446 | TLS, ALPN split | `h2` for gRPC, `http/1.1` for the console |

Enrolment is a separate port because it is the only surface reachable by
something that does not yet have a certificate, and separating it makes that
boundary a firewall rule rather than a code path.

## Running it

A systemd unit, `Type=exec`, running as the `diffuse` service user, with
`RestartPreventExitStatus=77` so a configuration error stops rather than loops.
The package installs it, starts it, and reports the service's own log if it did
not come up.

## State and its ordering

The state database is SQLite with migrations applied at open. Two properties
are worth knowing:

**Provenance is denormalised on purpose.** An adapter carries the dataset's
classification as its own column rather than joining to the dataset. A dataset
can be deleted; what was trained from it must not thereby become unclassified.

**A registry entry never outlives its bytes silently.** An adapter survives the
deletion of its deployment and of the base model it was trained on, and is
removed only by being removed.
