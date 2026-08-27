# Serving

Getting a model answering requests, and what happens between the command and
the first token.

## Two ways to get a model

**By name**, from a catalogue compiled into the binary:

```bash
diffuse-coordinator model list --available    # answered from the binary, no network
```

```
NAME                 FAMILY                            SIZE  NEEDS  QUANT
qwen2.5:0.5b         Qwen 2.5 Instruct                 0.5G   0.8G  Q4_K_M
falcon3:1b           Falcon 3 Instruct                 1.1G   2.0G  Q4_K_M
qwen2.5-coder:1.5b   Qwen 2.5 Coder Instruct           1.1G   2.0G  Q4_K_M
granite3.3:2b        IBM Granite 3.3 Instruct          1.5G   3.0G  Q4_K_M
qwen2.5:3b           Qwen 2.5 Instruct                 2.1G   3.8G  Q4_K_M
granite4:7b-a1b      IBM Granite 4.0 Tiny (MoE)        4.2G   7.8G  Q4_K_M
phi4:14b             Phi 4                             9.1G  11.8G  Q4_K
```

```bash
sudo diffuse-coordinator model run qwen2.5:3b
```

`model run` is `pull` then `serve`, because "get me a model running" is one
intention and splitting it across two commands leaves people with weights on
disk and nothing serving.

**From a file you already have**, which is the primary path for an air-gapped
site:

```bash
sudo mv your-model.gguf /var/lib/diffuse-models/
sudo diffuse-coordinator model import --from /var/lib/diffuse-models/your-model.gguf
sudo diffuse-coordinator model serve your-model
```

Both routes record the same provenance: where the bytes came from, the digest of
the file, the licence the source declared, who ran the command and when.

## The catalogue

Every entry points at the model publisher's own repository, never a third
party's conversion, and every entry was downloaded, verified against its digest,
loaded and made to generate before it was written down. Sixteen models at
present, from about 490 MB to 9 GB, including one mixture of experts.

The catalogue is compiled in rather than fetched, which is three decisions at
once: a coordinator holding a deployment's authority is a machine many customers
will not give an internet route; a manifest on disk is a file an attacker who
reaches the machine can edit to point a name at their own weights; and the
alias is resolved by the coordinator against its own table, so no caller can
make it fetch a URL of their choosing.

Applying the publisher rule strictly leaves models out, and the reasons differ.
Some publishers ship safetensors only, so there is no official quantised file to
point at. Google's Gemma is published in GGUF and is gated, and this product
never authenticates to a hub, so a name for it would be a name that always
fails. Those models reach a deployment through `model import --from`, with the
same verification, once you have accepted whatever terms they carry.

## Placement

When you serve a model, the coordinator decides where it goes and tells you why:

```
Serving qwen2.5-3b-instruct.

  placement   whole, in RAM
  reason      2.1 GB resident against 11.4 GB free on node-01
  context     4096

  slice 0   layers   0..36   node-01      2.1 GB   whole model
```

The tiers, in the order they are tried: whole model in VRAM, partial offload
with some layers on the card, whole model in RAM, then a split across machines
if the model allows it. [Model support](/enterprise/model-support) is the page
that says which models allow it.

A placement that cannot be made is refused with both numbers and something to do
about each. Nothing is downloaded first.

## Calling it

`model run` ends by printing the name to use and a request you can paste:

```bash
curl https://your-host:8443/v1/chat/completions \
  --cacert /etc/diffuse/ca.crt \
  -H "Authorization: Bearer $DIFFUSE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen2.5-3b-instruct","messages":[{"role":"user","content":"Hello"}]}'
```

The name is not the catalogue name. The catalogue calls it `qwen2.5:3b`, the
deployment it produces is `qwen2.5-3b-instruct`, and it is the second that `/v1`
accepts. `GET /v1/models` is always the authority on that.

Give developers `/etc/diffuse/ca.crt` and any OpenAI client works unchanged. The
file is world-readable on purpose: it is a public certificate, and making
developers ask an administrator for it was friction with no security in it.

## API keys

```bash
diffuse-coordinator apikey create --name reporting-service
```

```
API key created.

  handle   ak_7Kq2mXvB
  name     reporting-service
  scope    every model
  expires  never

  dfk_live_9tR4wQ2xLm7vB3nK8sYpC6zF1aH5jD0e

This is the only time the key is shown. A request you can paste:

    curl https://coordinator.internal:8443/v1/chat/completions \
      --cacert /etc/diffuse/ca.crt \
      -H "Authorization: Bearer dfk_live_9tR4wQ2xLm7vB3nK8sYpC6zF1aH5jD0e" \
      -H "Content-Type: application/json" \
      -d '{"model":"qwen2.5-3b-instruct","messages":[{"role":"user","content":"Hello"}]}'
```

Shown once, stored hashed. A key can be given an expiry and a scope, either a
list of models or a pool, and the scope is checked by the coordinator at the
moment the model is resolved.

## One model at a time

This release serves one model per deployment. Asking to serve a second is
refused, with the name of what is running and the command to stop it, rather
than silently replacing something that requests are arriving for.

## When something is wrong

```bash
diffuse-coordinator nodes --wide
```

```
NODE     POOL  HEALTH   RAM       DEVICE      SLICE   TOK/S  FWD P50  EXPIRES
node-01  lab   healthy  62.7 GiB  cuda:0      0..36    41.2    18ms      89d
node-02  lab   healthy  15.5 GiB  cpu (idle)  -           -       -      89d

node-02 FAILED
  the fast backend needs a dependency this machine does not have: No module
  named 'llama_cpp'. Both backends ship inside the node-agent package, so this
  means the package installed here is not the one this machine needs.
```

```bash
diffuse-coordinator deployment list    # what is placed where
sudo journalctl -u diffuse-node-agent -f
```

A slice that cannot load reports why, and the same sentence reaches the caller
as a server error naming the machine. If the API says a node could not load a
model, `nodes --wide` on the coordinator shows you the identical line.
