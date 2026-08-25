# Diffuse Open

The open-source project this company grew out of. Still maintained, still free,
and not the product the rest of this site is about.

## What it is

Large language models running on a peer-to-peer network of ordinary machines.
Volunteers run a client, the network splits a model across whoever is online,
and a prompt is answered by a pipeline of strangers' computers without any of
them seeing the conversation.

AGPL-3.0. A working prototype on the public internet, rough in places, alive.

## Why it exists

The premise is uncomfortable and worth stating rather than implying: **the model
you talk to answers to somebody, and it is not you.** Large providers have
signed government contracts covering uses their own policies flagged as
dangerous, and the one that refused specific lines was moved against. A decade
earlier the same shape appeared in programmes that pulled user data straight
from the servers of the largest companies.

Diffuse Open is a refusal of that pattern by construction rather than by policy:
there is no server to subpoena, no account to correlate and no prompt log to
seize, because none of the three exists.

## How it works

Your own device tokenizes the prompt and runs the first layers. What leaves is
transformed mathematics, not your words.

```
   your device                 the network                  your device
  ┌───────────┐   activations  ┌───────┐   ┌───────┐   logits   ┌───────────┐
  │ tokenize  │───(encrypted)─▶│ node  │──▶│ node  │──(enc.)──▶ │  decode   │
  │ layers 0-2│                │ 2-14  │   │ 14-24 │            │  the token│
  └───────────┘                └───────┘   └───────┘            └───────────┘
   prompt stays here        blind, encrypted middle        answer forms here
```

Each hop is end-to-end encrypted with X25519 and ChaCha20-Poly1305. There is no
certificate authority: keys are bound to node identities, which is the only
arrangement that works when there is nobody to be the authority.

## What works today

| | |
|---|---|
| **Runs the impossible** | Models too large for one machine run across many small ones, split by layer |
| **Organises itself** | No master and no server. Nodes find each other by signed gossip, measure their own hardware, and take the slice the network needs most |
| **Heals** | When a node drops, the others re-replicate its slice |
| **Keeps your words home** | Your device runs the first layers; only activations leave |
| **Reaches every contributor** | Nodes behind NAT serve through an encrypted relay, so a home machine can give as well as take |
| **Streams** | Token by token as the network generates, not one delayed block |
| **Takes any machine** | An old laptop gives what it can; slices are sized to real measured memory |

## Honest limits

The project's own threat model is blunt and this summary keeps it that way.

Diffuse Open hides **what you say**. Your prompt does not leave your device in
clear text and the mathematics is encrypted between nodes.

It does **not** hide **that you are talking**. It does not mask your address by
default, and a node still sees the raw activations it is asked to compute.
Turning those back into words is hard, and how hard is partly your decision:
keeping more layers on your own machine raises the cost. It is made difficult,
not proven impossible.

::: warning Read the threat model first
Before trusting it with anything that matters, read `THREAT_MODEL.md` in the
repository. It states what is protected, from whom, and what is not.
:::

## Which one you want

[Enterprise and Open compared](/open/compared) sets them side by side. The short
version:

**Open** if you are curious, want to donate spare cycles, are studying
distributed inference, or want to read how any of this works.

**Enterprise** if an auditor will eventually ask you a question, if your data
cannot sit on a stranger's machine, or if you need somebody to call.

## Where it is

[github.com/diffuse-systems](https://github.com/diffuse-systems). This site does
not mirror the repository's documentation; a second copy of a document is a
second copy to keep true.
