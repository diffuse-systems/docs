# API

The only listener a customer's own applications reach.

## What it speaks

An OpenAI-compatible subset on `/v1`, over ordinary TLS on port 8443. Existing
clients work unchanged: point the SDK at `https://your-host:8443/v1`, give it
the deployment's CA certificate, and it behaves.

| Endpoint | |
|---|---|
| `POST /v1/chat/completions` | streaming and non-streaming |
| `POST /v1/completions` | |
| `GET /v1/models` | what is being served, under the names requests must use |
| `POST /v1/files` | a document to extract text from |

No assistants API, no fine-tuning API. Fine-tuning happens on the operator's
side, with the operator's authorisation, and exposing it to an application key
would be exposing the ability to spend a cluster.

## What it does not hold

State, or any key beyond its own identity. It resolves a model name by asking
the coordinator, and the coordinator checks the key's scope at that moment,
where the name has just become a real deployment. One place decides and one
place writes the audit row.

## Names

The name a request puts in `"model"` is what `GET /v1/models` lists, and it is
not always the model's key. A deployment serving an adapter over a base answers
as `<model>-<adapter>` and no longer under the base name alone.

That is an audit property rather than a convenience. If a fine-tune answered
under the base model's name, a request, its log line and its audit row would all
name weights that had not produced the tokens, and nobody holding the transcript
could tell the original from the fine-tune. Asking for the base name while an
adapter is merged returns a 404 that names the adapter and the name to use.

## Keys

Issued by an operator, shown once, stored hashed. A key can expire and can be
scoped to particular models or to a pool. A key outside its scope gets 403
rather than 401: re-sending the credential will not help, and the distinction
matters to whoever is debugging.

## Errors

The envelope is OpenAI's, so a client's error handling works. What is inside is
this product's: a server-side failure names the machine and what it reported,
because the operator can see the same line under `nodes --wide` and the two
should say the same thing.
