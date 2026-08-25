# Open and Enterprise, compared

They share ideas and no code. The differences are not a feature list, they are
two answers to one question: **who is trusted?**

## The question that decides everything

Open assumes nobody is. There is no operator, no membership, no identity worth
having, so the design spends its effort on making the middle of the pipeline
blind: encrypted hops, activations rather than text, layers kept on your own
machine.

Enterprise assumes the organisation running it is trusted, and that it will have
to prove what it did. So the design spends its effort on identity, authorisation
and an audit trail, and the machines are known rather than anonymous.

Neither is a better version of the other. A network of strangers cannot have an
audit trail, because there is nobody with standing to read one and no way to
attribute an action to a person. An organisation's cluster must have one,
because somebody will eventually ask.

## Side by side

| | Open | Enterprise |
|---|---|---|
| Who runs the machines | volunteers, anywhere | one organisation, its own hardware |
| Who is trusted | nobody | the organisation's own operators |
| Membership | anyone, anonymously | an identity issued by a coordinator |
| Transport | X25519 and ChaCha20-Poly1305, no authority | mutual TLS 1.3, identity from the certificate |
| Discovery | signed gossip | a coordinator that places deliberately |
| Availability | whoever happens to be online | machines an operator enrolled |
| Placement | the slice the network needs most | an estimate that refuses rather than crashes |
| Fine-tuning | no | LoRA adapters, with provenance |
| Distillation | no | teacher and student on the same cluster |
| Audit | none, by design | every action and every refusal |
| Entitlement | none | a signed licence, checked offline |
| Console | none | a web interface for operators |
| Support | the issue tracker | a commercial agreement |
| Licence | AGPL-3.0 | proprietary |

## What Enterprise took from Open

The idea that a model can be cut by layer and run as a pipeline across machines
that were never meant to hold it. That is the load-bearing insight and it came
from the open project.

Everything below it was rewritten. Enterprise is a Rust control plane with a
Python worker behind a versioned gRPC contract, mutual TLS everywhere, an
identity system, an audit trail and a placement engine that refuses. None of
that code is shared, and the licences would not permit it if it were.

## What Open has that Enterprise does not

**Anonymity.** Enterprise knows exactly which machine did what, on purpose. That
is the feature an auditor wants and the opposite of what a volunteer network
offers.

**Reach.** Open can use a machine anywhere in the world without anybody
provisioning it. Enterprise reaches the machines an operator enrolled and no
others, also on purpose.
