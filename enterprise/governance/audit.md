# Audit

Who did what, when, and what was refused.

## What is recorded

Every administrative action and every refusal, with the actor resolved from
their certificate or session, the action, the outcome, the reason when there is
one, and the time. Enrolments, revocations, model imports, deployments, key
issuance, job creation, licence installation, sign-ins and failed sign-ins.

```bash
diffuse-coordinator audit --limit 50
diffuse-coordinator audit --actor alice --since 7d
diffuse-coordinator audit --outcome refused
```

Refusals are recorded as deliberately as successes. An audit trail that only
contains what worked cannot answer whether somebody tried.

## What is never recorded

**Customer content.** Not prompts, not completions, not the rows of a training
corpus, not a document's text. Not in the trail, not in the job row, not in an
adapter's provenance, not in a log line.

That is asserted by tests rather than promised: the suite sends a sentinel
through a real request and then searches every column of every audit row and
both service logs for it. The check has a positive control, because an assertion
that a string is absent passes trivially in an environment where nothing
happened.

What is recorded about a dataset is its key, its digest, its row count and the
classification you declared. Enough to answer "what was this trained on" without
holding what it contained.

## The trail is append-only

Rows are written and never updated or deleted by any code path in the product.
There is no command that edits the trail, and the absence is the feature.

## Classifications

Every dataset import records what the data is, in your organisation's own
words. **Declared, never detected**: this product does not scan your data and
does not claim to.

The classification is copied onto every adapter trained from that corpus rather
than joined to it, so deleting the corpus cannot make an artefact
unclassified. It is the one place denormalisation is correct.

## Getting it out

```bash
diffuse-coordinator audit --output json --since 30d > audit.json
```

For a SIEM, a log shipper, or the auditor who asked. The coordinator can also
log in JSON to its journal, so an existing collector picks it up with no
integration work.

## Retention

The trail is kept for the life of the deployment unless you remove it. It lives
in the state database under `/var/lib/diffuse-coordinator` and is therefore in
your backups, which is the answer to how long it survives.
