# Reference

The commands, the endpoints, the error codes and the files.

## CLI

Everything is `diffuse-coordinator <noun> <verb>`, and every noun removes with
`rm`. What follows is the shape of it; **[the complete reference](./reference/cli/index.md)**
has a page for every command and subcommand, with every flag, its default, and a
worked example: generated from the binary, so it cannot drift from what your
terminal does.

### Setup

| | |
|---|---|
| `init --org "<name>"` | create the deployment and its authority |
| `licence set <file>` | install a licence, verifying it first |
| `licence show` | entitlement, and until when |

### Machines

| | |
|---|---|
| `token create --pool <p> --max-uses <n> --ttl <d>` | a join token |
| `nodes` / `nodes --wide` | the pool; `--wide` adds the reason a slice failed |
| `node revoke <id>` | refuse an identity from now on |

On the machine itself: `diffuse-node-agent enroll --token DFE1-...`

## On a machine that computes

The agent has its own commands and its own configuration file, and they are
what you reach for when one machine has stopped working rather than the cluster.

| | |
|---|---|
| `enroll --token DFE1-...` | join this machine to a deployment |
| `status` | what this machine knows, from local files, with no network |
| `config show` | every setting in `/etc/diffuse/agent.toml`, and what it does |
| `config set-coordinator <url>` | point it at a different coordinator, checking the address first |

**[Every agent command](./reference/agent-cli/index.md)** is generated from the
binary in the same way. **[The agent configuration
file](./reference/agent-configuration.md)** explains each setting, when a change
takes effect, and how to repair a machine that is pointed at the wrong address.

### Models

| | |
|---|---|
| `model list --available` | the catalogue, from the binary, no network |
| `model pull <alias or owner/repo>` | fetch |
| `model import --from <path>` | take a file you already have |
| `model run <alias>` | pull, then serve |
| `model serve <key>` or `<key>+<adapter>` | place it |
| `model list` | what is here, with provenance |
| `model rm <key>` | remove |
| `deployment list` / `deployment rm <id>` | what is placed, and stop it |

### Training

| | |
|---|---|
| `finetune <model> <corpus.jsonl>` | import, choose, start |
| `job watch <id>` | follow to the end, then what to do next |
| `job list` / `job get <id>` / `job cancel <id>` | |
| `adapter list` / `adapter export <key> --out <path>` / `adapter rm <key>` | |
| `distill --teacher <t> --student <s> <corpus.jsonl>` | both stages |
| `eval <suite> --model <model>+<adapter>` | score both sides |
| `dataset import --from <file> --classification <word>` | |

### Access

| | |
|---|---|
| `apikey create --name <n> [--expires <d>] [--scope-models <list>]` | |
| `apikey list` / `apikey revoke <handle>` | |
| `login` / `logout` / `whoami` / `password` | |
| `account create --login <l> --role <r>` / `account disable <l>` | |
| `sessions` | who is signed in, from where |
| `audit --limit <n> [--actor <a>] [--since <d>] [--output json]` | |

Every command takes `--output json`. `--endpoint`, `--ca-cert`, `--cert` and
`--key` override the configuration file for a single invocation.

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
command was wrong, with usage. `77` a configuration error, which systemd is told
not to restart, because looping on a bad configuration file hides it.
