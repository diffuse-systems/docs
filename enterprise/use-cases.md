# Use cases

Four shapes of deployment, drawn from the conversations that led to this
product. If yours is not here, the pattern is probably close to one of them.

## A university department

**What they have.** Three hundred workstations in teaching labs, idle from six
in the evening until eight in the morning, plus a handful of machines with
cards bought for a research project that ended.

**What they want.** A model students can use for coursework, and a model
researchers can fine-tune on their own corpora without a grant application per
experiment.

**What it looks like.** The coordinator on a small server. Agents on the lab
machines, enrolled with one token and a scheduling window that says the pool is
available between 19:00 and 07:00. A 7B model quantised to four bits runs whole
on any one of them; a larger model is split across four.

```bash
sudo diffuse-coordinator token create --pool teaching \
     --schedule "Mo-Fr 19:00-07:00" --max-uses 300 --ttl 30d
```

**What decides it.** Cost, and the fact that student prompts are university
data. A cloud subscription for three hundred people is an annual line item; the
machines are already bought and already powered.

## A hospital or clinic

**What they have.** A rack that is not allowed a route to the internet, and
data that is not allowed to leave the building under any interpretation of any
rule.

**What they want.** Summarisation and extraction over documents that cannot be
sent anywhere, with an audit trail that satisfies the person who will
eventually ask.

**What it looks like.** Air-gapped. The offline bundle arrives on physical
media, the packages install from it, models arrive the same way and are
imported from a directory. No activation, no licence heartbeat, no telemetry,
because none of those exist.

```bash
sudo diffuse-coordinator model import --from /var/lib/diffuse-models/model.gguf
diffuse-coordinator audit --since 30d --output json > /var/log/diffuse-audit.json
```

**What decides it.** That the product works with no route out at all, and that
the audit trail records every action and every refusal while never recording
customer content.

## A company with a legal department

**What they have.** A perfectly good cloud budget and a legal opinion that says
no.

**What they want.** The capability their competitors have, on infrastructure
their counsel will sign off on, with an answer to "where does the data go" that
is one sentence long.

**What it looks like.** A few machines in their own data centre or at a
European host. Roles so that the people who may deploy a model are not the
people who may read the audit trail. API keys scoped per application, expiring.

```bash
diffuse-coordinator apikey create --name claims-drafting \
     --scope-models qwen2.5-7b-instruct --expires 90d
```

**What decides it.** Sovereignty as a contractual fact rather than a promise:
the software cannot phone home because there is no code in it that does.

## A public administration

**What they have.** Procurement rules, a long horizon, and an obligation to
explain decisions.

**What they want.** Something they can run for years, understand, and audit,
that does not become a different product every quarter because a vendor changed
its mind.

**What it looks like.** A conservative deployment on Debian stable, upgraded
deliberately. The four documents that ship inside the package are the
documentation of record. Licences are per machine for a term, with no metering
and no usage report.

**What decides it.** That the failure modes are documented, including the ones
we do not mitigate, and that the threat model has a section saying what is not
claimed.

## Where it does not fit

Worth being direct, since a pilot that fails helps nobody.

**Latency-critical single requests.** Splitting a model across machines lets
you run a model you otherwise could not, at roughly the speed of the slowest
slice. It does not divide latency by the number of machines.

**Very high concurrency on modest hardware.** This is a machine park, not a
serving farm. If you need thousands of concurrent conversations, you need
hardware sized for that, and the same is true anywhere.

**Training a model from scratch.** Fine-tuning and distillation, yes.
Pre-training, no, and it is not on the roadmap.

**Anything multimodal beyond documents.** Text and documents in, text out.
Images are designed and not built.
