# CLI reference

Every command of `diffuse-coordinator`, generated from the binary itself. If a page here disagrees with what your terminal prints, the page is a bug — a test regenerates all of this and fails on any difference.

## [`init`](init.md)

Prepare the state directory and derive the enrolment CA from the deployment root CA

```bash
diffuse-coordinator init --org "Klinik Beispiel" --host coordinator.internal
```

## [`serve`](serve.md)

Run the coordinator: mTLS gRPC listener plus the node registry

```bash
diffuse-coordinator serve --config /etc/diffuse/coordinator.toml
```

## [`nodes`](nodes.md)

List the nodes this coordinator currently sees

```bash
diffuse-coordinator nodes
```

## [`token`](token.md)

Create and manage join tokens

| command | what it does |
|---|---|
| [`token create`](token-create.md) | Issue a join token and print the line to paste onto a machine |
| [`token list`](token-list.md) | List tokens by handle. Secrets are not stored and cannot be shown |
| [`token revoke`](token-revoke.md) | Revoke a token |

## [`node`](node.md)

Manage node identities

| command | what it does |
|---|---|
| [`node revoke`](node-revoke.md) | Revoke a node identity: refuse it at every call and evict it now |
| [`node list-revoked`](node-list-revoked.md) | List revoked node identities |

## [`apikey`](apikey.md)

Create and manage API keys for the public inference endpoint

| command | what it does |
|---|---|
| [`apikey create`](apikey-create.md) | Issue a key and print it. Shown once; only its hash is stored |
| [`apikey list`](apikey-list.md) | List keys by handle. Secrets are not stored and cannot be shown |
| [`apikey revoke`](apikey-revoke.md) | Revoke a key. Effective on the very next request |
| [`apikey rotate`](apikey-rotate.md) | Issue the next key in place of one, and put the old one on a clock |

## [`identity`](identity.md)

Register the people a chat facade may act for

| command | what it does |
|---|---|
| [`identity import`](identity-import.md) | Import people from a CSV file. Idempotent: run it again after a change |
| [`identity list`](identity-list.md) | List the people this deployment knows |
| [`identity disable`](identity-disable.md) | Stop a gateway acting for somebody, keeping the trail that names them |
| [`identity enable`](identity-enable.md) | Let a gateway act for somebody again |

## [`model`](model.md)

Acquire, inspect and place models

| command | what it does |
|---|---|
| [`model import`](model-import.md) | Ingest a model from a directory. The path for a coordinator with no internet route, which is most of them in a regulated deployment |
| [`model pull`](model-pull.md) | Fetch a model: a name from the catalogue, or a repository on a hub |
| [`model run`](model-run.md) | Fetch a model and serve it — the two commands most people want as one |
| [`model list`](model-list.md) | List acquired models and their provenance |
| [`model rm`](model-rm.md) | Remove a model and its index |
| [`model serve`](model-serve.md) | Place a model on the nodes of a pool |

## [`deployment`](deployment.md)

Inspect and tear down deployments

| command | what it does |
|---|---|
| [`deployment list`](deployment-list.md) | List deployments and their slices |
| [`deployment rm`](deployment-rm.md) | Tear a deployment down |

## [`audit`](audit.md)

Read the audit trail: who did what, when, and what was refused

```bash
diffuse-coordinator audit --action inference --limit 3
```

## [`dataset`](dataset.md)

Import and inspect training data. Customer data, declared not detected

| command | what it does |
|---|---|
| [`dataset import`](dataset-import.md) | Ingest a file the coordinator can read |
| [`dataset list`](dataset-list.md) | List datasets and what they were declared as |
| [`dataset rm`](dataset-rm.md) | Remove a dataset, unless a job or an adapter still points at it |

## [`finetune`](finetune.md)

Fine-tune a model on a file, in one command

```bash
diffuse-coordinator finetune qwen2.5-3b berichte.jsonl
```

## [`job`](job.md)

Start, watch and stop fine-tuning runs

| command | what it does |
|---|---|
| [`job create`](job-create.md) | Start a LoRA fine-tuning run |
| [`job list`](job-list.md) | List runs, newest first |
| [`job get`](job-get.md) | One run in full, with the sentence explaining where it is |
| [`job watch`](job-watch.md) | Follow a run until it ends, then say what to do with the result |
| [`job cancel`](job-cancel.md) | Ask a run to stop at the next step boundary, keeping its checkpoint |

## [`adapter`](adapter.md)

Inspect the adapters runs produced, with their provenance

| command | what it does |
|---|---|
| [`adapter list`](adapter-list.md) | List adapters with the whole chain behind each one |
| [`adapter export`](adapter-export.md) | Write an adapter's own bytes somewhere you keep them |
| [`adapter rm`](adapter-rm.md) | Remove an adapter |

## [`eval`](eval.md)

Score a base model against a fine-tune on a suite

```bash
diffuse-coordinator eval berichte-test --model qwen2.5-3b+berichte-v1
```

## [`distill`](distill.md)

Teach a small model what a large one knows: label, train, and score

```bash
diffuse-coordinator distill --teacher qwen2.5-3b --student qwen2.5-0.5b-instruct --as berichte-klein berichte.jsonl
```

## [`licence`](licence.md)

What this deployment is entitled to, and until when

| command | what it does |
|---|---|
| [`licence show`](licence-show.md) | Show the licence this coordinator is running under |
| [`licence set`](licence-set.md) | Install a licence file and bring the deployment up on it |

## [`login`](login.md)

Sign in as a person, and keep the session on this machine

```bash
diffuse-coordinator login --endpoint https://coordinator.internal:7446
```

## [`logout`](logout.md)

End this session, here and on the coordinator

```bash
diffuse-coordinator logout
```

## [`whoami`](whoami.md)

Who this session belongs to, and what it may do

```bash
diffuse-coordinator whoami
```

## [`password`](password.md)

Change this account's own password

```bash
diffuse-coordinator password
```

## [`account`](account.md)

Human accounts: who may sign in, and as what

| command | what it does |
|---|---|
| [`account list`](account-list.md) | List the accounts |
| [`account create`](account-create.md) | Create an account with a one-time password |
| [`account role`](account-role.md) | Change what somebody may do. Ends their sessions |
| [`account disable`](account-disable.md) | Switch an account off, and revoke everything it is holding |
| [`account enable`](account-enable.md) | Switch it back on |
| [`account bootstrap`](account-bootstrap.md) | Create the first account. **Run on the coordinator host.** |
| [`account recover`](account-recover.md) | Reset a password when the identity provider is down and the password is lost. **Run on the coordinator host**, and audited like `bootstrap` |

## [`session`](session.md)

Who is signed in, from where, since when

| command | what it does |
|---|---|
| [`session list`](session-list.md) | Who is signed in |
| [`session revoke`](session-revoke.md) | End somebody else's session, now |

