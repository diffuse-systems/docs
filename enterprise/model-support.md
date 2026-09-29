# Model support

Which models run, which are split across machines, and which are refused. This
is the page to read before choosing a model, and the rules on it are the ones
the product actually enforces rather than a statement of intent.

## The short answer

```
Is the model a GGUF file?

  YES ──> llama.cpp runs it, whole, on one machine that holds it.
          Whatever architecture llama.cpp computes. Never split.

  NO, safetensors ──> Is its architecture one this build is proven on?

          NO  ──> refused, by name, before anything is fetched;
                  its GGUF build is served whole
          YES ──> whole on one machine that holds it, or, when none
                  does and you allow it, split by layer across machines
```

Everything that is served can also be fine-tuned and distilled, with the
restrictions noted under [fine-tuning](#what-fine-tuning-and-distillation-need).

## Two backends, two rules

**A GGUF file** is computed by llama.cpp, the fast backend, whole on one
machine. Which architectures it computes is llama.cpp's list, and the catalogue
entries are the ones this build verified by asking each a question it cannot
answer by luck.

**A safetensors model** is computed by the reference backend, which is what can
hold part of a model, and **only for architectures it has been proven on**:

| Dense | Mixture of experts |
|---|---|
| `llama`, `mistral`, `qwen2`, `qwen3`, `gemma`, `gemma2`, `cohere`, `granite`, `olmo`, `olmo2`, `stablelm`, `starcoder2`, `phi3`, `smollm3` | `mixtral`, `qwen2_moe`, `qwen3_moe`, `granitemoe`, `olmoe`, `gpt_oss` |

The name is `model_type` in the model's `config.json`. **Proven** means this:
a model of each family, computed by the product whole, cut in two and cut in
three, gives the logits transformers' own code gives, to float32 rounding, at
every step of a prompt longer than its sliding window and of the decoding after
it. That comparison is a test the product carries, and the package build runs
it again with the libraries it ships and refuses to build if one family
disagrees.

**Any other architecture is refused** for serving, evaluation and distillation,
with its name and the verified list, rather than computed and possibly wrong.
Its GGUF build is served whole. It can still be fine-tuned, which uses
transformers' own code.

::: warning Corrected in 1.3.3
Until 1.3.3 the list was longer, and five of its families were computed
**wrongly** on the reference backend, whole and split, with no warning: Granite,
Granite MoE, Gemma, Gemma 2 and Cohere. Each applies a scaling outside its
layers that the product's slice left out, and a real Granite answered fluent
nonsense. They are correct and proven since 1.3.3; answers, evaluation scores
and distillation labels produced with them on the reference backend before it
should be produced again. GGUF builds, on llama.cpp, were not affected.
:::

## Splitting across machines

When no single machine can hold the model, and you allow it with
`--allow-split`, the coordinator cuts it into slices, one per machine, connected
as a pipeline. `--nodes N --allow-split` asks for a pipeline across exactly N
machines even when one would hold it; `--nodes N` alone is refused, naming the
missing flag.

**A GGUF file is never split, on any number of machines.** The reason is
mechanical rather than a policy: llama.cpp loads a model file as a whole, and a
slice of a GGUF is not a GGUF. Asked to split one, the product refuses with the
format as the reason, first and alone. If you need that model across a pool,
take the publisher's safetensors instead.

**A safetensors model splits if its architecture is on the list above**, dense
or mixture of experts. A layer boundary is a clean cut for all of them: nothing
crosses it but the hidden state, and a mixture of experts keeps all of a layer's
experts on one machine, since the router runs inside the layer that owns it.
Hybrid stacks that interleave state-space layers with attention are not on the
list: a boundary that carries recurrent state is not a boundary.

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
conversion, and every entry was downloaded, checked against its digest, loaded
by the backend the node package ships and **made to answer correctly** before it
was written down: "What is the capital of France?" must answer Paris. Generating
tokens is not enough, since a model computed wrongly generates fluent nonsense. The catalogue is compiled
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
| GGUF, fits on one machine | **Runs**, whole, on llama.cpp |
| GGUF, too large for any machine, or asked to split | **Refused**, the format given as the reason |
| Safetensors, a proven architecture, fits on one machine | **Runs**, whole |
| Safetensors, a proven architecture, too large, `--allow-split` | **Runs**, split by layer, experts of a layer kept together |
| Safetensors, any other architecture | **Refused** for serving, evaluation and distillation, before anything is fetched; its GGUF build runs whole |
| `--nodes N` without `--allow-split` | **Refused**, naming the flag |
| Fine-tuning, safetensors | **Supported**; training runs transformers' own code, not the product's slice |
| Fine-tuning, GGUF | **Refused at creation**, with how to obtain trainable weights |
| Distillation | **Supported** with a safetensors student; a quantised teacher is fine, a safetensors teacher must be a proven architecture |
