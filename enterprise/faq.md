# Frequently asked questions

## Does anything leave our network?

No. There is no telemetry, no activation call, no licence heartbeat and no
usage report. The licence is verified against a key already in the binary, on
the machine, offline.

The exceptions are the ones you invoke: `model pull` reaches a public model hub
because that is what the command is, and the console loads nothing at all. An
air-gapped deployment uses `model import --from` and reaches nothing ever.

## Do we need GPUs?

No. A four-gigabyte model runs on an ordinary workstation with enough memory,
and the CPU path is supported rather than tolerated. A card makes generation
faster and lets one machine hold more.

## How many machines do we need?

One, to start. Splitting exists for models too large for any single machine and
is not the normal case. Most deployments serve a model that fits on one machine
and use the others for other models, or for training.

## Which models can we run?

Anything the backend can load, when it fits on one machine. When it does not,
only safetensors with a verified layout are split, and a GGUF is never split.
[Model support](/enterprise/model-support) is the page that says this precisely.

## Can we fine-tune any model we serve?

Fine-tuning needs safetensors, so a quantised GGUF is refused at creation with
the two ways to obtain trainable weights. Everything in the built-in catalogue
is GGUF, so this is the first thing most people meet.

## Is it OpenAI-compatible?

For chat completions, completions, models and file upload, yes: point an
existing SDK at your host, give it your CA certificate, and it works unchanged.
There is no assistants API and no fine-tuning API, and fine-tuning deliberately
happens on the operator's side rather than on an application key.

## What happens when the licence expires?

Enrolling a new machine is refused. Nothing that is running stops, no request is
interrupted and no model is unloaded. Software that stops working when a
purchase order is late is software an operations team learns to fear.

## Can we run it in a cloud?

Yes. It is ordinary software on ordinary Linux machines, and a rented instance
is a machine. Most customers choose this product because they do not want that,
but nothing prevents it.

## What do we back up?

One directory: `/var/lib/diffuse-coordinator`. It holds the enrolment
authority, every node identity, the accounts, the API keys, the audit trail,
the datasets and every adapter. [Deployment](/enterprise/deployment#backup-and-restore)
has the procedure.

## What happens if the coordinator machine dies?

Restore that directory onto a new machine before letting the package generate
anything, and the nodes reconnect on their next heartbeat without being
touched. Without a backup the deployment cannot be recovered, and the audit
trail is the part that is genuinely gone.

## Who can see the prompts?

The machine that holds the first slice sees the prompt text; the others see
activations. Nothing reaches the audit trail, the job rows or the logs, and
that is asserted by tests rather than promised.

## Can we use our own certificate authority?

Yes. `init --root-ca-cert --root-ca-key` derives the enrolment authority from
your root, so the whole deployment chains to something your organisation
already trusts.

## Do you support single sign-on?

OpenID Connect, with group claims mapped to roles. A deployment configured for
it but not entitled starts, says so, and carries on with local accounts.

## Is there a Windows or macOS agent?

No. Linux on x86_64, packaged for Debian and Ubuntu today. RPM packaging for
RHEL and SUSE is a separate piece of work and is not published yet.

## How is it priced?

Per machine, for a term. No metering, no per-token charge and no usage report,
because collecting one would mean sending it somewhere.

## What if we find a security problem?

Write to contact@diffuse-systems.com before you tell anyone else, and we will
tell you what we are doing about it and when.
