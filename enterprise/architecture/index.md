# Architecture

Five components. Each has its own page; this one says what talks to what and
why the boundaries fall where they do.

| Component | Language | Listens on | Talks to |
|---|---|---|---|
| [Coordinator](/enterprise/architecture/coordinator) | Rust | 7443 (mTLS gRPC), 7444 (enrolment), 7446 (console) | everything |
| [Node agent](/enterprise/architecture/node-agent) | Rust | a data port per loaded slice | the coordinator, and the next slice |
| [API](/enterprise/architecture/api) | Rust | 8443 (TLS) | the coordinator |
| [Console](/enterprise/architecture/console) | Rust, server-rendered | 7446, inside the coordinator | the coordinator's own services |
| [Worker](/enterprise/architecture/worker) | Python | a Unix socket | the agent that spawned it |

## Why these boundaries

**The control plane is Rust and the ML runtime is Python.** Placement,
identity, audit and entitlement are long-lived, concurrent and must not crash;
model loading needs the ecosystem that exists, which is Python. The worker sits
behind a stable gRPC contract so it can be replaced without touching anything
that decides.

**The API is a separate process from the coordinator.** It is the only listener
customer applications reach, and it holds no state and no key beyond its own
identity. A compromise there is a compromise of a process that can resolve a
model name and forward tokens, not of the deployment's certificate authority.

**The console lives inside the coordinator** rather than beside it, because it
authenticates with the same accounts and authorises with the same permission
checks. A second process would mean a second place that decides who may do
what, and that is exactly the drift you cannot afford in the part that grants
access.

## The wire

Protobuf over gRPC, with the contracts in `proto/` as the single source of
truth. Messages are versioned and wire compatibility is never broken silently.

Mutual TLS on every connection, TLS 1.3 only, with no plaintext transport even
in development defaults. Identity derives from the certificate's SAN URI: a
node id in a request body is an assertion to be checked against the peer
certificate, never a fact.

The operator plane splits by ALPN on one port: `h2` reaches gRPC, `http/1.1`
reaches the console.

## What crosses a machine boundary during a request

For a model split across three machines, one completion is: the API resolves
the name and opens a stream to the first slice; that machine runs its layers
and passes the hidden state to the second; the third holds the output head and
emits tokens, which travel back along the same path.

The hidden state is what crosses, not the prompt. Only the first machine sees
the prompt text, and only the last produces tokens.
