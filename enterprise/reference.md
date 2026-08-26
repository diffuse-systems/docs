# Reference

The commands, the endpoints, the error codes and the files.

## CLI

Everything is `diffuse-coordinator <noun> <verb>`, and every noun removes with
`rm`. What follows is the shape of it; **[the complete reference](./reference/cli/index.md)**
has a page for every command and subcommand, with every flag, its default, and a
worked example — generated from the binary, so it cannot drift from what your
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
| 400 | `invalid_request_error` | the request is malformed; the message says which field |
| 401 | `invalid_api_key` | no key, or a key that is not recognised |
| 403 | `insufficient_scope` | a valid key, outside its scope. Re-sending will not help |
| 404 | `model_not_found` | nothing of that name is served. `GET /v1/models` lists what is |
| 413 | `context_length_exceeded` | the prompt is longer than the deployment's context |
| 429 | `rate_limit_exceeded` | this key's limit. `Retry-After` says when |
| 503 | `node_unavailable` | a machine holding a slice could not load or has gone. The message names it |
| 503 | `no_capacity` | every slot is busy. Not a fault |
| 500 | `server_error` | a fault on our side, with what was reported |

A 503 naming a node is the same sentence an operator sees under
`nodes --wide`. That is on purpose: when a developer forwards the error, the
operator recognises it.

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
