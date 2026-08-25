# Identity and PKI

Every connection between machines is mutually authenticated TLS. This page is
where the certificates come from.

## Two authorities, one deployment

**The root CA** is generated when the deployment is created, or adopted from
your own PKI. It signs one thing: the enrolment authority. After that it is not
needed, and `docs/INSTALL.md` tells an operator to copy it offline and delete it
from the machine on day one.

**The enrolment authority** signs node identities and service certificates. It
lives under `/var/lib/diffuse-coordinator` and the coordinator needs it to run.

The separation is what makes the first sentence possible: the key that could
mint a new authority is not on the machine, so compromising the coordinator
compromises the ability to enrol machines, not the ability to become the
deployment.

## How a machine gets an identity

```bash
sudo diffuse-coordinator token create --pool lab --max-uses 10 --ttl 24h
sudo diffuse-node-agent enroll --token DFE1-...
```

The token is presented once, over the enrolment port, which is the only surface
reachable by something that has no certificate yet. The coordinator issues a
certificate whose SAN URI is `diffuse://node/<name>`, and the agent writes it
under `/var/lib/diffuse-node-agent`, owned by the service user.

Tokens are single-use by default. Making one reusable should be a decision
rather than an accident, so a fleet rollout passes the size of the fleet.

## Identity comes from the certificate

**A node id in a request body is an assertion to be checked against the peer
certificate, never a fact.** Every service call resolves who the caller is from
the TLS session and compares it with what the payload claims; a mismatch is a
refusal that names both.

This is the single rule that makes the rest of the security model hold. A
machine cannot become another machine by asking to.

## Certificate lifetime and renewal

Node certificates are issued for 90 days and renewed automatically well before
expiry, over the connection the agent already has. `nodes` shows the remaining
days per machine, so an expiry is visible weeks before it is a problem rather
than at the moment it stops something.

## Revocation

```bash
diffuse-coordinator node revoke node-07
```

The identity is refused from that moment. The machine keeps the file, and it is
worthless: the coordinator checks its own ledger, not the certificate alone.

## Service identities

The API and the console authenticate as themselves, with roles distinct from
both `admin` and `node`. The API writes audit entries and reads placement; it
cannot enrol a machine or issue a licence. That is enforced by the permission
attached to its role, not by what the code happens to call.

## Adopting your own PKI

```bash
sudo DIFFUSE_NO_AUTO_INIT=1 apt-get install -y ./diffuse-coordinator_1.0.0_amd64.deb
sudo diffuse-coordinator init \
     --root-ca-cert /path/to/root.crt --root-ca-key /path/to/root.key
```

The enrolment authority is then derived from your root, and the whole deployment
chains to something your organisation already trusts and already audits.
