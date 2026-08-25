# Glossary

The words this product uses, and what each one means here specifically.

**Adapter.** The output of a fine-tuning run: a small set of weights that is a
delta against a base model, not a model of its own. Carries its whole
provenance, and survives everything except `adapter rm`.

**Agent.** The process on a machine that computes. Registers, reports what the
machine has, fetches its slice, and spawns a worker. Owns no decisions.

**Air-gapped.** A deployment with no route to the internet. The intended case
rather than a special mode: nothing is fetched at install and nothing when a
node is given a model.

**Backend.** The library that executes a model. Two ship inside the agent
package: the *fast backend*, llama.cpp, for quantised GGUF; and the *reference
backend*, PyTorch, for safetensors.

**Catalogue.** The short list of models the build knows by name, compiled into
the binary. Every entry points at the publisher's own repository and was loaded
and made to answer before being written down.

**Classification.** What a dataset is, in your organisation's words. Declared,
never detected. Copied onto every adapter trained from it.

**Context.** The number of tokens a deployment is sized for. Not the model's
advertised maximum, because taking a 128k advertisement literally would refuse
a 7B on a 24 GB card for a context nobody asked for.

**Coordinator.** The one machine that decides: placement, identity,
entitlement, audit. Holds the deployment.

**Deployment.** Both a running placement of a model, and the whole installation.
Context makes it obvious; when it does not, this documentation says "the
deployment's state" for the second.

**Distillation.** Training a small model from a large one's output
distributions rather than from written answers.

**Enrolment.** How a machine gets an identity. A token once, then a certificate
for ever.

**Enrolment authority.** The certificate authority that signs node identities.
Distinct from the root, which signs it and is then removed from the machine.

**GGUF.** A quantised model file format, read by the fast backend. Never split
across machines, never fine-tuned.

**LoRA.** Low-rank adaptation. Training a small number of added parameters
while the model itself stays frozen, which is what makes training on a machine
park possible at all.

**Mixture of experts.** An architecture where each layer holds several expert
sub-networks and a router picks a few per token. Split by layer with all of a
layer's experts kept together, when the layout has been verified.

**Node.** A machine that computes, once enrolled. Identified by its certificate.

**Placement.** The decision about where a model goes, and the estimate behind
it. Refuses rather than crashing.

**Pool.** A named group of machines. A model can be placed in one pool and a
training job in another.

**Provenance.** The recorded chain behind an artefact: where the bytes came
from, their digest, the licence declared, who ran the command and when.

**Quantisation.** Storing weights at reduced precision. Q4_K_M is the usual
target: the point where a model still behaves like itself and an ordinary
machine can hold it.

**Retained mass.** In distillation, the fraction of the teacher's probability
distribution kept at the chosen top-k. Below a floor the run pauses.

**Safetensors.** The unquantised weight format, read by the reference backend.
The only format that can be split across machines or fine-tuned.

**Seat.** One enrolled machine, against the licence.

**Served name.** The string a request puts in `"model"`. The model key, plus the
adapter when one is merged, and never the catalogue name.

**Slice.** The layers of a model that one machine holds. A machine fetches only
the tensors for its own slice.

**Soft labels.** What a teacher recorded about a corpus: its distribution over
the vocabulary at each position, not the single token it would have picked.

**Suite.** A dataset with an `expected` answer on each row, used for scoring.

**Token.** Two meanings, and this documentation keeps them apart: a *join
token*, used once to enrol a machine, and a *text token*, the unit a model
generates.

**Worker.** The Python process the agent spawns to load weights and compute.
No network reach, only the cards the placement was sized against.
