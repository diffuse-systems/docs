# Licensing

What a deployment is entitled to, and until when.

## The licence file

A short signed document naming the organisation, the edition, how many machines
it covers, until when, and which capabilities are enabled.

```bash
sudo diffuse-coordinator licence set ./licence
diffuse-coordinator licence show
```

`licence set` verifies the signature and the contents **before** replacing
anything, so a wrong file cannot take a running deployment down.

## What it constrains

| | |
|---|---|
| Machines | how many may be enrolled at once |
| Term | when the subscription ends, and how long the grace period runs |
| Capabilities | training, distillation, the fast backend, SSO |

## What expiry does, day by day

| | 30 days out | Expired, in grace | Past grace |
|---|---|---|---|
| Serving on `/v1` | works | works | refused |
| Requests in flight | - | - | finish, never killed |
| New jobs | accepted | accepted | refused |
| Jobs already running | - | - | run to completion |
| Enrolling a machine | works | works | refused |
| Certificate renewal | works | works | **works** |
| Administration commands | works, with a notice | works, with a notice | refused |
| Licence install and status | works | works | works |
| Audit, read and export | works | works | works |
| Export of your adapters and datasets | works | works | works |
| Your data on disk | untouched | untouched | untouched |

**The subscription bites on use, never on giving back what is yours.** A lapsed
licence stops the deployment from doing things. It never stops you retrieving
the adapters you trained on your own corpus, the datasets you imported, or the
audit trail you may be required to produce.

Two of those rows are deliberate rather than incidental. **Requests and jobs
already running are never interrupted**: a three-day fine-tuning run killed on
the calendar day is hostile and earns nothing. And **certificate renewal keeps
working past grace**, because a node's identity lives ninety days and renews at
sixty: if renewal stopped, a fleet would die of expired identities within a
month and a renewed licence would no longer bring it back. The sanction for
expiry is refusal of service, never the destruction of your ability to return.

## Seats

One enrolled machine is one seat. Re-enrolling a machine that already has an
identity does nothing and says so, precisely so that a repeated command does not
cost a seat. Revoking a machine returns its seat.

```bash
diffuse-coordinator licence show
diffuse-coordinator nodes
```

## Signatures

The coordinator verifies against public keys compiled into the binary. A licence
signed by a key it does not know is refused by name rather than accepted with a
warning.

Development licences exist and are signed with a key published in the product's
own source. They are useful for evaluation and for the test suite, and every
coordinator that loads one **says so in its log on every start**. If you are
paying for this product and see that line, ask us for a real one.

## Renewal

A renewal is a new file with a later date, installed over the old one. Nothing
restarts and nothing is interrupted.

We track expiry on our side and reach out before it matters, because a licence
expiring on your cluster is an outage you did not schedule and neither of us
wants that conversation.

## Air-gapped

Nothing about licensing needs a network. There is no activation call, no
heartbeat to a vendor, and no online check of any kind. The file is verified
against a key already in the binary, on the machine, offline, for ever.

That is not a concession to air-gapped sites, it is the design. A product that
phones home to confirm you may use it is a product that decides for you, and
that is the thing our customers are trying to escape.
