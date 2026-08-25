# Model support

Which models run, which are split across machines, and which are refused. This
is the page to read before choosing a model, and the rules on it are the ones
the product actually enforces rather than a statement of intent.

## The short answer

```
Does the model fit on one machine in the pool?

  YES ──> It runs there, whole. Any architecture the backend can load.
          Dense, mixture of experts, hybrid. GGUF or safetensors.
          This is the ordinary case.

  NO  ──> Can it be split?

          safetensors AND a known layout ──> split across machines by layer
          GGUF                           ──> refused, whatever the pool size
          unknown layout                 ──> refused, and the message says why
```

Everything that is served can also be fine-tuned and distilled, with one
exception noted under [fine-tuning](#what-fine-tuning-and-distillation-need).

## Running whole: the ordinary case

If a model fits on one machine, its architecture does not matter. The backend
loads the file and serves it. There is no list of blessed architectures for this
path, and there is nothing to check beyond memory.

| | |
|---|---|
| Formats | GGUF and safetensors |
| Architectures | anything the backend loads: dense, mixture of experts, hybrid state-space, whatever ships next |
| What decides | free memory on one machine, measured against the model plus its context |

This is worth stating plainly because the interesting engineering is in the
other case, and that can leave the impression that splitting is normal. It is
not. A 7B model quantised to four bits is about four gigabytes and runs on a
laptop. Most deployments never split anything.

## Splitting across machines

When no single machine can hold the model, the coordinator can cut it into
slices, one per machine, connected as a pipeline. That path has two conditions,
and both are checked before anything is downloaded.

### Condition one: safetensors

**A GGUF file is never split, on any number of machines.**

The reason is mechanical rather than a policy. Splitting means one machine holds
layers 0 to 19 and another holds 20 to 39, and each loads only its own tensors.
The fast backend that executes GGUF loads a model file as a whole; it has no
notion of a partial model, and a slice of a GGUF is not a GGUF. Handing it one
would not produce a degraded model, it would produce an error.

So a GGUF too large for any single machine is refused, and the refusal says
this rather than suggesting more machines would help. If you need that model
across a pool, take the publisher's safetensors instead.

### Condition two: a layout that has been verified

Cutting a model at a layer boundary is only correct if a layer boundary is a
clean cut. Two families are known to be:

| Layout | Split | Why |
|---|---|---|
| **Dense homogeneous stack** | yes | every layer has the same shape, and nothing crosses a boundary except the hidden state |
| **Mixture of experts, stacked** | yes, with all of a layer's experts on one machine | the router runs inside the layer that owns it, so a whole layer is still a clean cut |
| **Anything else** | no | it is served whole, and split is refused by name |

The third row is the honest one. An architecture this build has not verified is
not split, whether or not it looks like it should be. That includes hybrid
stacks that interleave state-space layers with attention: a boundary that
carries recurrent state is not a boundary, and a model split there loads, runs
at full speed and produces nonsense. Serving it whole is always available.

The refusal names the architecture and says it is served whole rather than
implying the model is unsupported.

## What happens when a model is refused

Never silently, and never after the download. The check runs against the
publisher's own metadata before the first byte is fetched, and the message
carries what was wrong, both relevant numbers, and what to do instead. A
refusal for memory looks like this:

```
phi4:14b needs 11.8 GB free to serve and the largest machine here has 4.2 GB.
Nothing was downloaded, so nothing was spent finding this out.

Options:
  • a smaller size, from `model list --available`
  • free memory on a node, or enrol one that has it
  • fetch it anyway and let placement decide against the real file
```

There is no flag that overrides a safety check by pretending the arithmetic is
different. The last option exists because a measured figure can be wrong for
unusual hardware, and it fetches the file so the coordinator can decide against
the real thing rather than against an estimate.

## Where models come from

Two routes, and they are equally supported.

**A built-in catalogue** of models this build knows by name. Every entry points
at the model publisher's own repository on Hugging Face, never a third party's
conversion, and every entry was downloaded, checked against its digest, parsed,
loaded and made to answer before it was written down. The catalogue is compiled
into the binary, so `model list --available` works on a machine with no route
out.

**Your own files.** `model import --from <path>` takes a directory or a file you
already have, with the same verification, the same tensor index and the same
provenance record. An air-gapped site uses this path exclusively, and a model
whose licence you accepted yourself arrives this way.

Neither route makes the product fetch a URL a caller chose. The coordinator
resolves a catalogue name against its own compiled-in table, which is what makes
it acceptable for the machine holding a deployment's certificate authority to
fetch anything at all.

## What fine-tuning and distillation need

Everything that serves can be trained on, with one restriction that follows from
the file format rather than from the feature.

**Fine-tuning needs safetensors.** A quantised file has discarded the precision a
gradient step needs and carries no optimizer state; there is nothing there to
train, on any machine. Since every catalogue entry is GGUF, fine-tuning a
catalogue model is refused at creation, before a node fetches anything, with the
two ways to get trainable weights.

**Distillation is split in two.** The student is trained, so it needs
safetensors. The teacher is only read, so a quantised teacher is a legitimate
and often sensible choice: it is the larger of the two and the one you would
rather not hold in full precision.

## Accelerators

| | |
|---|---|
| CPU | supported; the reference backend computes in float32 on a CPU, so a bfloat16 file doubles when it loads |
| NVIDIA, whole model in VRAM | supported |
| NVIDIA, partial offload | supported; the layers that fit go to the card, the rest stay in system memory |
| Mixed CPU and GPU pipelines | supported; a pool of unlike machines is the case this product was built for |
| Multiple cards on one machine | supported for holding a larger model; a request is served by one card at a time, since there is no tensor parallelism in this release |

That last row is worth reading twice: more cards hold more, they do not make one
request faster.

::: tip Performance figures
None are published here. Throughput and latency depend on the model, the
quantisation, the context, the accelerator and the network between machines, and
a number measured on a developer's workstation would be marketing rather than
information. Figures will be published when they have been measured on
representative hardware, with the hardware named.
:::

## Summary table

| Situation | Result |
|---|---|
| Fits on one machine, any architecture, any format | **Runs**, whole |
| Too large, safetensors, dense stack | **Runs**, split by layer |
| Too large, safetensors, stacked mixture of experts | **Runs**, split by layer, experts of a layer kept together |
| Too large, safetensors, unverified layout | **Refused for splitting**, served whole if it fits somewhere |
| Too large, GGUF, any pool size | **Refused**, and the message says the format is the reason |
| Fine-tuning, safetensors | **Supported** |
| Fine-tuning, GGUF | **Refused at creation**, with how to obtain trainable weights |
| Distillation, safetensors student | **Supported**, quantised teacher is fine |
