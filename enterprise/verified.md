# What has been verified, and how

**Verified on 2026-08-29, against the published 1.3.1 packages.**

This page reports one exercise: an attacker placed on the same network as a
running deployment, and eleven things it was unable to do. Everything below was
measured, and every measurement is reproducible with a command you can run
against your own deployment.

Two things it deliberately does not do. It does not say the product is secure,
and it does not say your data is protected. It reports what a specific check
found on a specific day, on specific artefacts, and it is dated for that reason:
a security claim with no date ages badly.

**The check installs the published packages, not a source tree.** The
coordinator and the agent it exercises are the `.deb` files a customer
downloads, byte for byte. That is what separates this from a self assessment.

## The setup

Three machines on one network:

- a coordinator with its API, a licence installed, and a model served;
- one node agent, enrolled the ordinary way;
- a third machine with IP connectivity to both **and nothing else**: no node
  certificate, no key, no trusted certificate authority, no join token.

The third machine is the attacker. It has the product's own binaries, because
those are downloadable by anybody and withholding them would model an attacker
who is politely under equipped. What it does not have is any material.

**Every attempt is paired with the equivalent legitimate request**, on the same
deployment, at the same moment. A refusal on its own proves nothing: a
coordinator that is down refuses everything. The pair is the evidence.

## The prompt does not appear on the wire

The first question anybody asks about a distributed inference platform is
whether the text people type crosses the network in the clear.

An inference was run carrying a string nothing else on the machine would
produce. In the same window, a second string was sent between the same two
machines over a plain TCP connection. Both were looked for in a packet capture
taken at the agent's own network interface.

```
capture: 8962 bytes
the inference's sentinel appears 0 times
the plaintext control's sentinel appears 1 times
```

The model answered with the first string, so it was carried in the request and
in the response. It is absent from the capture. The second string, sent in the
clear, is present once in the same capture.

That second string is the point. Without it, "no plaintext found" would be a
statement about a capture that might have been empty, or taken on the wrong
interface, or never written to disk. The control proves the capture would have
shown plaintext if there had been any.

## Two regimes, port by port

These are different promises, and conflating them is how a security page becomes
misleading.

| port | what it carries | client certificate | TLS 1.0 | 1.1 | 1.2 | 1.3 |
|---|---|---|---|---|---|---|
| 7443 | coordinator and agents | **required and verified** | refused | refused | refused | negotiated |
| 7444 | enrolment | no, a join token that pins the authority | refused | refused | refused | negotiated |
| 8443 | `/v1`, the customer API | **no, by decision** | refused | refused | refused | negotiated |

**Between nodes**, both sides present a certificate and both verify it against
the deployment's own certificate authority. Model slices and activations travel
here.

**On `/v1`, there is deliberately no client certificate, and that is a decision
rather than a gap.** Any OpenAI client works against this endpoint without
modification, and a developer holding an SDK cannot present a client
certificate. Requiring one would make the product unusable for the thing it
exists to do. Authorisation there is a bearer key, and what was checked is that
the key is required, verified, and that a refusal reaches the audit trail with
the caller's address and the key's prefix, never the key.

## The eleven checks

| attempt | what happened | the control beside it |
|---|---|---|
| passive listening during an inference | prompt absent from 8962 captured bytes | plaintext control present once |
| inter node connection, no client certificate | server sent `alert certificate required` | the real agent negotiated TLS 1.3 |
| inter node connection, a certificate this deployment never issued | server sent `alert certificate unknown` | the real agent negotiated TLS 1.3 |
| a machine asking to be called by an existing node's name | the name still belongs to one node | the machine joined under a name the coordinator assigned |
| `/v1` with no `Authorization` header | 401, `invalid_api_key`, audited | a real key answered 200 |
| `/v1` with a bearer key that was never issued | 401, `invalid_api_key`, audited | a real key answered 200 |
| `http://` to the API port | connection refused at the protocol level | `https://` answered |
| asking for TLS 1.2 or older | nothing below 1.3 negotiated on any port | TLS 1.3 negotiated on all three |
| replaying a join token already spent | refused: the token's uses are exhausted | a fresh token was issued |
| a forged join token | refused: its checksum does not match | a fresh token was issued |
| a fresh token on the machine the others refused | **it enrolled** | this is what proves the two refusals above were about the token and not the machine |

Eleven checks, no failures, no attempt succeeded.

The last row is the one that makes the other two mean anything. A machine that
cannot enrol for some unrelated reason would produce the same two refusals.

## Two properties worth naming

**Join tokens and API keys carry a checksum.** A token or a key with a single
character wrong is refused on its shape, before any lookup happens. A mistyped
credential never reaches the database.

**A refused credential on `/v1` gets one answer, whichever way it was wrong.**
Absent, malformed, or well formed but never issued: the same status, the same
code, the same body. Telling them apart would let somebody probing learn whether
a guess had the right shape, which is the difference that makes searching
worthwhile. The audit trail distinguishes them for the operator; the caller is
told one thing. A test compares the three answers byte for byte so that a future
change cannot make the message more helpful and reopen that difference.

## What this does not prove

This section is as important as the ones above, and a security page without one
is a security page to be suspicious of.

**An attacker who already holds a node certificate and its key is not tested.**
Stolen material is a different threat with different mitigations, and none of
them are exercised here.

**Anybody with shell access to a machine in the deployment is not tested.**

**Application level attacks are not tested**: prompt injection, resource
exhaustion, malicious model weights, anything concerning what the model itself
does with what it is given.

**The web console's session handling is not tested here.**

**No cryptanalysis was performed.** This shows that TLS is negotiated, enforced,
and carrying the traffic. It says nothing about cipher strength beyond the
versions reported.

**The observer was given more power than the attacker has.** On a bridged
network, a third machine does not see traffic between two others, so a capture
from the attacker's own position would have been empty, and an empty capture
proves nothing at all. The capture above was taken inside the agent's own
network namespace: it sees every byte the agent sends and receives. What holds
against an observer with that much access holds against one with less, but the
reader should know that is the shape of the argument.

**One exercise, one day, one configuration.** It is a check that the protections
this product describes are switched on and working. It is not a penetration
test, and it is not a substitute for one.

## Running it against your own deployment

The check is part of the product's repository, so what is written above is not
something you have to take on trust.

```bash
ci/adversary.sh 1.3.1
```

It builds the three machines, runs the eleven checks, and prints the table. It
needs Docker, the published packages in `target/packages`, and a licence. Any
attempt that succeeds is reported as a critical defect and stops the run.

If you are evaluating the product and want the check run against a build you
chose rather than one we chose, that is a reasonable thing to ask for and the
answer is the same command.

---

[Surfaces and threat model](./security.md) - [Deployment](./deployment.md)
