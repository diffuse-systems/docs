# Node agent

One per machine that computes. It owns no decisions.

## What it does

Registers with the coordinator, reports what the machine has, fetches the slice
it is assigned, spawns a worker to load it, and serves the part of a request
that belongs to its layers.

## What it reports

On registration and on every heartbeat: cores, total and available memory,
accelerators and their free VRAM, and the agent version. That is what placement
is decided against, so it is measured rather than configured.

Availability windows are reported too. A machine offered only between 19:00 and
07:00 says so, and a training run longer than the window is refused with the
window rather than started and killed.

## What it fetches

Only the tensors for its own slice. A machine holding layers 20 to 39 downloads
those and nothing else, from the coordinator, checked against a digest that was
promised in the plan.

Auxiliary files follow the same path: the tokenizer for the first slice, the
output head for the last, an adapter's own bytes when one is merged.

## Backends

Both ship inside the package: llama.cpp for quantised GGUF, PyTorch for
safetensors. Around 260 MB compressed and close to a gigabyte installed, and
that is deliberate. Nothing is downloaded when a node is given a model, so
there is no step that can fail on a machine with no route out.

Two variants exist and the file name says which: `_cpu_` and `_cu124_`.
Installing the wrong one is visible immediately, and the agent names the package
to install instead.

## Identity

Written once at enrolment, under `/var/lib/diffuse-node-agent`, owned by the
service user. Running `enroll` twice does nothing the second time: a machine
that already holds an identity says so and stops, because a second identity is
a second node record and a second licence seat.

## Failure

A slice that cannot load fails visibly. The state reaches the coordinator, shows
in `nodes --wide` with the reason in full, and the API returns it to the caller
as a server error naming the machine. The alternative, retrying forever while
requests time out, is the failure mode this design exists to avoid.
