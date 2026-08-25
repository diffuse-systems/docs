# Diffuse Enterprise

Distributed inference, fine-tuning and distillation on machines an organisation
already owns.

## What it is

A control plane and a set of agents. You install the coordinator on one machine
and the agent on every machine that should compute. The coordinator places
models, issues identities, holds the audit trail and serves an
OpenAI-compatible API; the agents load slices of models and generate tokens.

A model that fits on one machine runs there. One that does not is split across
several, connected as a pipeline. Neither case requires anything to leave the
building.

## Who it is for

Organisations with three things in common: hardware sitting idle, data that
cannot go to a third party, and no appetite for a bill that scales with
curiosity.

In practice that has meant universities with teaching labs that are empty at
night, hospitals and clinics under medical confidentiality rules, public
administrations, and companies whose legal department has already said no to
the obvious answer. Initially in German-speaking Europe, where the regulatory
pressure and the installed hardware coincide.

## What it replaces

**A rented cloud cluster.** The usual answer to "we want to run a model" is an
hourly GPU instance. That is the right answer for a spike and a poor one for a
department with three hundred workstations that are idle sixteen hours a day.

**A single expensive machine.** The other usual answer is to buy one server with
enough memory for the largest model anybody might want. This lets four ordinary
machines hold that model between them, and lets the same four serve smaller
models independently the rest of the time.

**A proof of concept that cannot go to production.** Running a model on a laptop
is a demonstration. What makes it a deployment is identity, audit, entitlement,
placement that refuses rather than crashes, and packages that install with one
command. Those are the parts this product is mostly made of.

## What it is not

Not a model. Not a hosted service. Not a way to make one request faster: this
release has pipeline parallelism, so splitting a model across machines lets you
run a model you otherwise could not, at roughly the speed of the slowest slice.
It does not divide latency by the number of machines, and anybody who tells you
otherwise about a pipeline is selling something.

Not multimodal yet. Text and documents in, text out. Vision is designed and not
built.

## The shape of a deployment

```
   your applications
          │  HTTPS, OpenAI-compatible
          ▼
     ┌─────────┐        ┌──────────────┐
     │   API   │───────▶│ Coordinator  │
     └─────────┘  mTLS  └──────┬───────┘
                               │ mTLS
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        ┌──────────┐     ┌──────────┐     ┌──────────┐
        │ node-01  │     │ node-02  │     │ node-03  │
        │  agent   │     │  agent   │     │  agent   │
        │ + worker │     │ + worker │     │ + worker │
        └──────────┘     └──────────┘     └──────────┘
```

Every arrow is mutually authenticated TLS, including in development. A node's
identity comes from its certificate, never from anything it claims about itself
in a request.

## Getting started

Two commands on the coordinator machine, two on each machine that computes.
[Deployment](/enterprise/deployment) has the detail; the short version is that
there is no script to run and nothing is downloaded when a node is given a
model, because the packages contain both inference backends and everything they
import.

[Model support](/enterprise/model-support) is the page to read before choosing
what to run.
