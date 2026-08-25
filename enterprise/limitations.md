# Limitations

What this product does not do, stated before you find out. A page like this is
cheaper for both of us than a pilot that ends in a surprise.

## It does not make one request faster

Splitting a model across machines is **pipeline parallelism**: machine one runs
layers 0 to 19, passes the hidden state to machine two, and so on. That lets you
run a model no single machine could hold. It does not divide latency by the
number of machines, and with the network hop it is slightly slower than the same
model on one machine that could hold it.

There is no tensor parallelism in this release. Multiple cards on one machine
hold more; they do not serve one request faster.

## One model at a time, per deployment

Asking to serve a second is refused, with the name of what is running and the
command to stop it. Serving several models concurrently is planned and not
built.

## A GGUF is never split

Whatever the pool size. The backend that would execute a slice loads a model
file whole and has no notion of a partial model. A GGUF too large for any single
machine is refused, and the refusal says the format is the reason rather than
suggesting more machines.

## Fine-tuning needs safetensors

A quantised file has discarded the precision a gradient step needs. Since every
catalogue entry is GGUF, fine-tuning a catalogue model is refused at creation.

## LoRA only

Full fine-tuning is not supported, and on a machine park it would not work: the
measured contrast is 176 MB against 30.4 GB of network per step for a 7B at
batch 4. [Fine-tuning](/enterprise/fine-tuning#why-lora-and-not-full-fine-tuning)
has the arithmetic.

Pre-training a model from scratch is not supported and is not on the roadmap.

## Text and documents only

Text in, text out, plus PDF and text file extraction. Vision is designed and
not built. Audio and video are long-term scope and nothing more.

## Debian and Ubuntu only, today

Packages are built against glibc 2.36, which covers Debian 12 and newer and
Ubuntu 22.04 LTS and newer. RPM packaging for RHEL and SUSE is a separate piece
of work and is not published. Linux on x86_64; there is no Windows or macOS
agent.

## No published performance figures

Deliberately, until they are measured on hardware we can name. Throughput
depends on the model, the quantisation, the context, the accelerator and the
network between machines, and a number from a developer's workstation would be
marketing.

## Not a multi-tenant boundary

A deployment is one organisation. Roles separate people inside it who are
broadly trusted; they are not a sandbox between mutually hostile tenants.

## No confidential computing

Weights and activations are in ordinary memory on ordinary machines. Somebody
with root on a node can read what that node is processing. Physical and
administrative control of the machines is the boundary, and it is the boundary
this product assumes you already have.

## Availability windows are recorded, not enforced

A pool offered only between 19:00 and 07:00 is respected when a training job is
placed, and a job longer than the window is refused with the window. Nothing
stops a machine being used outside it, and nothing suspends work at the boundary.

## What a compromised coordinator costs

It holds the enrolment authority, so whoever holds it can mint node identities.
This is why the root key is copied offline and deleted on day one: the blast
radius stops at enrolment rather than reaching the deployment's own identity.

## Things that are planned

Serving several models at once. Continuous batching and a drain for rolling
restarts. Replicas of a slice for availability. RPM packaging. Vision. None of
these are in this release, and none of them are dates.
