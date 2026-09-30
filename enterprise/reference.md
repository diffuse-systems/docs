# Reference

The commands, the endpoints, the error codes and the files.

## Commands

Three programs, each on its own machine. Each has a reference generated from
the program itself: a page for every command, with its synopsis, its flags
with their types and defaults, and examples, so a page cannot disagree with
what your terminal does.

| program | where it runs | |
|---|---|---|
| `diffuse-coordinator` | the coordinator's machine | [every command](./reference/cli/index.md) |
| `diffuse-node-agent` | every machine that computes | [every command](./reference/agent-cli/index.md) |
| `./diffuse-chat` | the machine that runs the chat interface | [every command](./reference/chat-cli/index.md) |

Each group of commands opens on what you do with it, in commands meant to be
copied. Every one of those commands is parsed by the program's own parser
before a release, and links the page of each command it runs.

| to | start at |
|---|---|
| install the licence, and see what it allows | [`licence`](./reference/cli/licence.md) |
| serve a model | [`model`](./reference/cli/model.md) |
| open the network to the machines, and close it | [`firewall`](./reference/cli/firewall.md), and on each machine [the agent's](./reference/agent-cli/firewall.md) |
| add a machine | [`token`](./reference/cli/token.md), then on the machine [`enroll`](./reference/agent-cli/index.md) |
| remove a machine | [`node`](./reference/cli/node.md) |
| give an application access | [`apikey`](./reference/cli/apikey.md) |
| a chat interface that acts for each person | [`identity`](./reference/cli/identity.md), then [`diffuse-chat`](./reference/chat-cli/index.md) |
| read the audit trail, or export a period | [`audit`](./reference/cli/audit.md) |
| fine-tune or distil | [`job`](./reference/cli/job.md) |
| the coordinator moved | [`certificate`](./reference/cli/certificate.md) |

**[The agent configuration file](./reference/agent-configuration.md)** explains
each setting of `/etc/diffuse/agent.toml`, when a change takes effect, and how
to repair a machine that is pointed at the wrong address.

## API

Base `https://<host>:8443/v1`, bearer token, OpenAI-compatible.

| | |
|---|---|
| `POST /chat/completions` | streaming with `"stream": true` |
| `POST /completions` | |
| `GET /models` | the names requests must use |
| `POST /files` | a document, returns extracted text |

The name in `"model"` is what `GET /models` lists. A deployment serving an
adapter answers as `<model>-<adapter>` and not under the base name.

## Error codes

| HTTP | `code` | Means |
|---|---|---|
| 400 | `unsupported_parameter`, `empty_messages`, `invalid_request` and the document codes | the request is malformed; the message says which field |
| 401 | `invalid_api_key` | no key, or a key that is not recognised |
| 401 | `api_key_expired` | it expired on the date given; the operator issues a new one |
| 403 | `model_not_permitted` | a valid key, outside its scope. Re-sending will not help |
| 403 | `licence_expired` | the deployment's licence; the operator's to renew |
| 404 | `model_not_found` | nothing of that name is served. `GET /v1/models` lists what is |
| 429 | `rate_limit_exceeded` | this key's limit. `Retry-After` says when |
| 429 | `capacity` | every machine is busy. Not a fault |
| 502 | `generation_interrupted` | the machine computing the answer stopped partway; retry the request |
| 503 | `model_loading` | still loading; retry in a few seconds |
| 503 | `node_unavailable` | a machine the model needs is away, restarting or unreachable; the message says whether to retry |
| 503 | `model_unavailable` | not served until the operator acts: a machine was removed or could not load it |
| 503 | `coordinator_unavailable` | the api cannot reach its coordinator; retry in a few seconds |
| 504 | `timeout` | the generation ran past the deployment's limit |
| 500 | `server_error` | a fault on our side, with a reference |

`docs/API.md` in the product is the complete list.

**No error names a machine, an address or a command.** Each ends with
`Reference: chatcmpl-…`: a developer forwards it, and the operator finds the
machine, the port, the cause and the command under it, in the api's journal and
on the audit trail.

## Files

| Path | |
|---|---|
| `/etc/diffuse/coordinator.toml` | endpoint, ports, state directory, pool defaults |
| `/etc/diffuse/agent.toml` | the coordinator's address, and this machine's label |
| `/etc/diffuse/api.env` | where the API finds the coordinator, and its limits |
| `/etc/diffuse/ca.crt` | the deployment CA, world-readable, for developers |
| `/var/lib/diffuse-coordinator` | **the deployment.** Back this up |
| `/var/lib/diffuse-node-agent` | this machine's identity and its slices |
| `/var/lib/diffuse-models` | drop a model here to import it |
| `/var/lib/diffuse/datasets` | drop a corpus here; an example and a README are already in it |

## Exit codes

`0` success. `1` a refusal you can act on, with the reason on stderr. `2` the
command was wrong, with usage. `77`, from `diffuse-node-agent` only: this
machine's certificate has expired, which restarting cannot fix, so systemd is
told not to restart it. [Enrol the machine again](./reference/agent-cli/enroll.md)
with a new token.
