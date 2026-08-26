# `diffuse-coordinator serve`

Run the coordinator: mTLS gRPC listener plus the node registry.

## Synopsis

```
diffuse-coordinator serve [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file |
| `--listen-addr` | `<LISTEN_ADDR>` | `$DIFFUSE_LISTEN_ADDR` | Address to bind the mTLS gRPC listener to |
| `--provisioning-listen-addr` | `<PROVISIONING_LISTEN_ADDR>` | `$DIFFUSE_PROVISIONING_LISTEN_ADDR` | Address to bind the provisioning (enrolment) listener to |
| `--operator-listen-addr` | `<OPERATOR_LISTEN_ADDR>` | `$DIFFUSE_OPERATOR_LISTEN_ADDR` | Address to bind the operator plane to, where people log in |
| `--advertise-endpoint` | `<ADVERTISE_ENDPOINT>` | `$DIFFUSE_ADVERTISE_ENDPOINT` | How this coordinator is reachable from a node, e.g. https://coordinator.internal:7443. Handed to every machine that enrols |
| `--state-dir` | `<STATE_DIR>` | `$DIFFUSE_STATE_DIR` | Directory holding durable coordinator state (the identity ledger and, from milestone 1, join tokens and the enrolment CA) |
| `--licence` | `<LICENCE>` | `/etc/diffuse/licence` | The signed licence file |
| `--agent-binary-dir` | `<AGENT_BINARY_DIR>` | `$DIFFUSE_AGENT_BINARY_DIR` | Directory of agent binaries the installer serves, named diffuse-node-agent-&lt;os&gt;-&lt;arch&gt; |
| `--heartbeat-interval-ms` | `<HEARTBEAT_INTERVAL_MS>` | `$DIFFUSE_HEARTBEAT_INTERVAL_MS` | Heartbeat cadence handed to agents, in milliseconds |
| `--eviction-after-missed` | `<EVICTION_AFTER_MISSED>` | `$DIFFUSE_EVICTION_AFTER_MISSED` | Missed heartbeats tolerated before a node is evicted |
| `--audit-retention-days` | `<AUDIT_RETENTION_DAYS>` | `$DIFFUSE_AUDIT_RETENTION_DAYS` | How long audit entries are kept, in days. 0 keeps everything, and says so once at startup |
| `--ready-file` | `<READY_FILE>` | `$DIFFUSE_READY_FILE` | Write the bound addresses to this file once the listeners are up |
| `--ca-cert` | `<CA_CERT>` | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert` | `<CERT>` | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key` | `<KEY>` | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Notes

Normally started by systemd rather than by hand; the package installs the unit. Run it in a terminal when you want to watch it start.

## Examples

```bash
$ diffuse-coordinator serve --config /etc/diffuse/coordinator.toml
```

```
INFO listening for nodes and operators on 0.0.0.0:7443
INFO provisioning listener on 0.0.0.0:7444
INFO operator plane on 0.0.0.0:7446
INFO licence: enterprise, 8 nodes, until 2027-06-30
```

---

[← All commands](index.md)
