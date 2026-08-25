# Roadmap

What is being built, in the order it is being built. No dates, because a date
we published and missed would be worth less than the honesty of not giving one.

## Now

**Serving hardening.** Continuous batching so that concurrent requests share a
forward pass rather than queueing behind one another. A drain, so a machine can
be taken out of service without failing the requests it is holding. Enforcement
of the availability windows that are currently recorded and respected only at
placement. Replicas of a slice, so a machine that goes away does not take a
deployment with it.

**RPM packaging.** RHEL and SUSE, built against a glibc floor those
distributions actually ship. Deliberately a separate piece of work rather than a
flag on the Debian build.

## Next

**Serving several models at once.** Today a deployment serves one and refuses
the second with the command to stop the first. The refusal is honest and it is
not where this should end.

**Vision.** A vision-language model reading an image, designed and not built.
The architecture keeps tensor and shard descriptors modality-agnostic where that
costs nothing, so this is an addition rather than a rewrite.

**A richer console.** The pages exist; what is missing is depth. Placement
visible as a diagram, the audit trail filterable the way the CLI already allows,
and adapters comparable side by side.

## Later

**Full fine-tuning**, where the hardware justifies it. On a machine park it does
not, and the arithmetic is on the
[fine-tuning page](/enterprise/fine-tuning#why-lora-and-not-full-fine-tuning).
On a small cluster of well-connected machines with cards, it might.

**Tensor parallelism**, so that several cards on one machine serve one request
faster rather than only holding more.

**Audio and video.** Long-term scope. Nothing is designed.

## Not planned

**Pre-training a model from scratch.** Not what this is for.

**A hosted service.** The entire proposition is that the software runs on your
hardware. Offering to run it on ours would be selling the thing our customers
are trying to leave.

**Telemetry, however anonymous.** Not a feature that has been deferred. It is a
thing we will not add.

## How this list changes

By customers asking. The serving-hardening work is at the top because three
separate conversations arrived at the same missing piece within a month. If
something you need is in "later" and it is blocking you, say so: that is the
mechanism.
