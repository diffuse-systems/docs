# Worker and backends

The Python process that actually loads weights and computes.

## Why Python

Because the ecosystem that loads models is Python, and pretending otherwise
would mean reimplementing model loading for every architecture that ships. The
worker sits behind a stable gRPC contract so that this is a decision about
today rather than forever.

## How it is run

The agent spawns it as a child process on a Unix socket, with the packaged
runtime on the path. It is deliberately deprived of things it does not need:

- **No network reach.** `HF_HUB_OFFLINE` and `TRANSFORMERS_OFFLINE` are set, so
  a stray call to fetch something fails loudly rather than hanging on a proxy
  that will never answer.
- **Only the cards the placement was sized against**, through
  `CUDA_VISIBLE_DEVICES`. Without that the fast backend spreads across every
  card it can see while the coordinator sized for one, and the first symptom is
  a VRAM exhaustion on a machine the estimate cleared.
- **Unbuffered output**, so a worker that dies mid-load has already written the
  line explaining why.

A worker that crashes takes down a worker. The agent stays up, reports the
reason, and the coordinator makes it visible.

## The two backends

| | Fast backend | Reference backend |
|---|---|---|
| Library | llama.cpp | PyTorch and transformers |
| Reads | GGUF | safetensors |
| Splits across machines | no | yes |
| Trains | no | yes |
| CPU compute type | as quantised | float32 |
| Architectures | what llama.cpp computes | the twenty it is proven on; any other is refused |

Both ship inside the node-agent package with every dependency they import.

**The reference backend computes a model's outer loop itself**, because a slice
holds some of the layers and a model's own `forward` runs all of them: embed,
the layers it owns, and for the last slice the final norm and the head. Some
families do more there — Granite scales its embeddings and its logits, Cohere
its logits, Gemma 2 soft-caps them — and until 1.3.3 the slice left that out,
so five families answered fluent nonsense. Each architecture it serves is now in
a table with what it does outside its layers, and each is proven by a test that
computes a model of it whole, in two slices and in three against transformers'
own code; the package build runs that test with the libraries it ships.

The last row has a consequence people meet in practice: on a CPU the reference
backend computes in float32 whatever the file said, because CPU bfloat16 is
slower than float32 on the hardware this product targets. A bfloat16 file
therefore doubles when it loads, and the memory estimate accounts for it.

## Document extraction

Text extraction from a PDF runs in its own short-lived process rather than in
the serving worker. A malformed document is a plausible attack surface and a
plausible accident, and the blast radius of both should be a process the
deployment is willing to lose.
