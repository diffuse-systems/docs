# Chat interface

<img src="/logo.png" alt="Diffuse" width="200" />

Most people in an organisation will never call an API. They want a chat window,
and until they have one the deployment is something the platform team talks
about rather than something anybody uses.

**diffuse-chat is that window.** It is a multi-user chat interface that sits in
front of a deployment's `/v1` endpoint: people sign in, pick a model your
deployment serves, and chat. Nothing leaves your infrastructure, because the
interface runs on your machines and talks to your coordinator.

It is built on [LibreChat](https://www.librechat.ai), an open-source chat
interface, deployed **upstream and unmodified, pinned by digest**. Diffuse
Systems does not fork it and does not patch it: everything the deployment
tooling does goes through LibreChat's own configuration and its own HTTP API. A
fork is a maintenance burden a customer inherits, and this way an upstream
security fix is a digest change rather than a merge.

## Who it is for

Two profiles, one command apart, and the difference is what the audit trail can
tell you afterwards.

|  | developer | enterprise |
|---|---|---|
| who it is for | one person, one laptop | an organisation |
| credential | one ordinary API key | one **gateway** credential |
| who the deployment sees | the key | **the person who signed in** |
| an audit row reads | `apikey/V7S80Q12` | `identity/6a8f44f9 via apikey/QQ5WDKKE` |
| model catalogue | what the key may call | what **that person** may call |
| rate limits | shared by everyone | per person |
| registration | open until the first account | closed |
| who may use it | anyone who registers here | people an operator imported |

The developer profile is for trying the deployment out and for a single
engineer's daily use. Take the enterprise profile the moment "who generated
this" is a question somebody in your organisation could be asked: a regulator, a
works council, an internal auditor, or a customer. Only that profile puts a
person's name on the row.

The mechanism behind the enterprise profile is **delegated identity**: the chat
interface holds one credential that is allowed to say which user a request is
for, and the coordinator checks that claim against the people it has been told
about. It is described in full under
[Identity and PKI](/enterprise/governance/identity), and the audit rows it
produces are in [Audit](/enterprise/governance/audit).

## Before you start

This page assumes a deployment that already works: a coordinator installed and
serving at least one model. If that is not yet true, do
[Deployment](/enterprise/deployment) and [Serving](/enterprise/serving) first,
and come back when `GET /v1/models` answers.

You need two machines' worth of context, and it is worth being explicit about
which commands run where, because they are different programs:

| command | what it is | where you run it |
|---|---|---|
| `diffuse-coordinator` | the coordinator binary, installed by `diffuse-coordinator_amd64.deb` | on the **coordinator host** |
| `./diffuse-chat` | a shell script shipped **in the diffuse-chat repository** | on the **machine that will run the chat interface** |

Those two machines can be the same machine. Nothing about this requires them to
be separate, and a single workstation running both is a supported shape.

The chat host needs Docker with the compose plugin, and network access to your
coordinator's `/v1` port.

## Getting the tooling

The chat interface is not part of the coordinator packages. It is a small
repository of compose files, configuration and one script, published so you can
read exactly what will run on your own machines:

```bash
git clone https://github.com/diffuse-systems/diffuse-chat.git
cd diffuse-chat
```

Everything from here on runs from inside that directory. `./diffuse-chat` is
the script at the root of it; it is not installed by any package and there is
no copy of it on the coordinator.

## Configuring it

```bash
cp .env.example .env
```

Fill in three values, all of which come from your deployment:

| value | where it comes from |
|---|---|
| the `/v1` endpoint | your coordinator's host and API port, e.g. `https://coordinator.internal:8443/v1` |
| the path to `ca.crt` | copy `/etc/diffuse/ca.crt` from the coordinator to this machine |
| a credential | created on the coordinator, in the next step |

The certificate authority file is world-readable on the coordinator on purpose:
it is a public certificate, and it is what lets the chat interface verify that
it is talking to your deployment rather than to something that answers on the
same address.

`./diffuse-chat up` writes the rest of `.env` itself, including LibreChat's own
secrets and the service account it uses to own the shared agent, and it creates
the file mode 0600. **`.env` holds a credential and must never be committed.**

## The developer profile

One ordinary API key, created **on the coordinator**:

```bash
# on the coordinator host
diffuse-coordinator apikey create --name chat
```

Put the key it prints into `.env` on the chat host, then, from inside the
cloned repository:

```bash
./diffuse-chat up
./diffuse-chat doctor
```

Open `http://127.0.0.1:3080`, create your account, and chat. Registration closes
by itself: the next `up` sees that an account exists and shuts the door behind
you, so a port left open does not become an open sign-up page.

## The enterprise profile

Two commands **on the coordinator**. The first issues a gateway credential, the
only kind allowed to say which person a request is for; the second tells the
deployment who those people are:

```bash
# on the coordinator host
diffuse-coordinator apikey create --name chat --act-as
diffuse-coordinator identity import users.csv
```

Then, on the chat host, from inside the cloned repository:

```bash
./diffuse-chat up --enterprise
./diffuse-chat doctor
```

Registration is closed in this profile: accounts are not created here, they are
imported on the coordinator. Somebody who signs in to the chat interface but is
not in `users.csv` reaches the endpoint and is refused there, which is the
correct place for that decision to be made.

## Running it

```bash
./diffuse-chat doctor          # what is actually working, and if not, why
./diffuse-chat down            # stop it
./diffuse-chat down --volumes  # and forget the conversations and accounts
```

`doctor` is the command to run before reporting a problem. It checks the things
that break in practice: that the images running are the digests the repository
pins, that LibreChat answers, that the deployment's certificate authority is
mounted where it will be looked for, that the TLS chain validates **from inside
the container** rather than from your shell, that the endpoint accepts the
credential the way this profile expects, and that the shared agent exists and is
actually shared.

## Your own branding

`APP_TITLE` and `CUSTOM_FOOTER` are text and live in `.env`. Images go in
`branding/assets`, which is mounted over LibreChat's own asset directory, so a
customer's logo never means a rebuilt image and never means a fork. The
directory ships empty, which changes nothing.

## Conversation titles are off, and why

LibreChat can generate a title for each conversation. It is off in both
profiles, deliberately, and turning it on is a decision with two costs rather
than a preference:

- **It is a second generation per conversation**, on your own machines. Every
  conversation costs compute twice, and nobody asked for the second one.
- **It writes a model-written summary of the conversation into the chat
  interface's own database.** That is a second copy of the content, in a store
  your deployment's retention rules do not reach.

That second point is the one to weigh. The deployment's own rule is that prompts
and completions never reach its audit trail; see
[Audit](/enterprise/governance/audit). The chat interface's database is a
different store on a different machine, holding conversations, uploaded files
and, if you turn titles on, summaries as well. Back it up or do not, but treat
it as a content store you are choosing to run.

## What putting a chat interface in front of the deployment adds

Three things, and the first is the one to read before deploying the enterprise
profile.

**The gateway credential is a master key for your organisation's traffic.**
Whoever holds it can generate as any imported user. That is not a flaw in the
design, it is what delegation is, and calling it "just another API key" would be
dishonest. What bounds it: its scope is `act_as` and nothing else, so it cannot
mint a join token, revoke a node, read the audit trail or start a training run;
it never leaves the chat host, so obtaining it means already being on that
machine; and it can be rotated with an overlap, so replacing it is not an
outage:

```bash
# on the coordinator host
diffuse-coordinator apikey rotate <handle> --overlap 24h
```

Every request it makes is on the audit trail with the person in `actor` and the
credential in `via`, so `diffuse-coordinator audit --via <handle>` reads back
every account it ever spoke for. That is detection rather than prevention, and
it is the answer to "what did this credential do" on the day somebody asks.

**An identity the chat interface asserts is a claim, never a fact.** The
coordinator checks it against the people it knows: that the credential may
assert at all, that something was actually asserted, and that the subject is
somebody imported and not disabled. What it cannot do is tell a correct
assertion from a forged one, because anybody holding the credential could make
either. This is stated rather than mitigated, and the reasoning is in the
repository's own `THREAT_MODEL.md`.

**The chat interface has no privilege of its own.** It is a client. It holds no
signing key, has no node identity, is not on the machine plane, and never
reaches the coordinator's admin port. It talks to `/v1` over TLS with a bearer
token exactly as any OpenAI client does. Compromising it yields the gateway
credential and the conversations in its own database, and nothing else: no
certificate authority, no ability to enrol a machine, no way to read the
deployment's audit trail.

The full write-up, with the residual risks named and accepted, is
`THREAT_MODEL.md` in the diffuse-chat repository, and the deployment's own
surfaces are in [Security](/enterprise/security).

## The limitation to know before a user reports it

**A refusal from the deployment is not shown to the person as a refusal.**

When the coordinator refuses a delegated request, because the person was
disabled, was never imported, or could not be identified, it answers 403 with a
sentence written to be acted on:

```
the user the gateway asserted is disabled here. Re-enable them with
`diffuse-coordinator identity enable 6a8f44f9bc4f9191e4179b87`.
```

The person does not see that sentence. LibreChat fetches the model catalogue
before it calls the endpoint, the 403 refuses that fetch first, and it therefore
concludes the model is unavailable and stops. What the user reports is an
"illegal model request" or a chat that does nothing, and the model is not the
cause.

Fixing that in the interface would mean patching LibreChat, which this product
does not do. The operator's answer is one command, on the coordinator:

```bash
# on the coordinator host
diffuse-coordinator audit --via <gateway-handle> --result denied
```

Every refused assertion is on that trail, naming the identity that was
attempted, the credential it came through, and which refusal it was. Put that
command in your support runbook: it turns a confusing user report into a named
account in one step.

## Where to go next

- The repository itself, which is public and readable:
  [github.com/diffuse-systems/diffuse-chat](https://github.com/diffuse-systems/diffuse-chat)
- [Identity and PKI](/enterprise/governance/identity), for how delegated
  identity is checked
- [Audit](/enterprise/governance/audit), for what the trail records and what it
  deliberately does not
- [Serving](/enterprise/serving), for the endpoint this interface calls
