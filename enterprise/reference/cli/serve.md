# `diffuse-coordinator serve`

Run the coordinator: mTLS gRPC listener plus the node registry.

## Synopsis

```
diffuse-coordinator serve [OPTIONS]
```

## Options

| flag | type | default | description |
|---|---|---|---|
| `--config <CONFIG>` | path | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file |
| `--listen-addr <LISTEN_ADDR>` | address and port, `0.0.0.0:7443` | `$DIFFUSE_LISTEN_ADDR` | Address to bind the mTLS gRPC listener to |
| `--provisioning-listen-addr <PROVISIONING_LISTEN_ADDR>` | address and port, `0.0.0.0:7443` | `$DIFFUSE_PROVISIONING_LISTEN_ADDR` | Address to bind the provisioning (enrolment) listener to |
| `--operator-listen-addr <OPERATOR_LISTEN_ADDR>` | address and port, `0.0.0.0:7443` | `$DIFFUSE_OPERATOR_LISTEN_ADDR` | Address to bind the operator plane to, where people log in |
| `--advertise-endpoint <ADVERTISE_ENDPOINT>` | text | `$DIFFUSE_ADVERTISE_ENDPOINT` | How this coordinator is reachable from a node, e.g. https://coordinator.internal:7443. Handed to every machine that enrols |
| `--state-dir <STATE_DIR>` | path | `$DIFFUSE_STATE_DIR` | Directory holding durable coordinator state (the identity ledger and, from milestone 1, join tokens and the enrolment CA) |
| `--licence <LICENCE>` | path | `/etc/diffuse/licence` | The signed licence file |
| `--agent-binary-dir <AGENT_BINARY_DIR>` | path | `$DIFFUSE_AGENT_BINARY_DIR` | Directory of agent binaries the installer serves, named diffuse-node-agent-&lt;os&gt;-&lt;arch&gt; |
| `--heartbeat-interval-ms <HEARTBEAT_INTERVAL_MS>` | integer | `$DIFFUSE_HEARTBEAT_INTERVAL_MS` | Heartbeat cadence handed to agents, in milliseconds |
| `--eviction-after-missed <EVICTION_AFTER_MISSED>` | integer | `$DIFFUSE_EVICTION_AFTER_MISSED` | Missed heartbeats tolerated before a node is evicted |
| `--audit-retention-days <AUDIT_RETENTION_DAYS>` | integer | `$DIFFUSE_AUDIT_RETENTION_DAYS` | How long audit entries are kept, in days. 0 keeps everything, and says so once at startup |
| `--ready-file <READY_FILE>` | path | `$DIFFUSE_READY_FILE` | Write the bound addresses to this file once the listeners are up |
| `--ca-cert <CA_CERT>` | path | `$DIFFUSE_CA_CERT` | The deployment CA certificate (PEM) |
| `--cert <CERT>` | path | `$DIFFUSE_CERT` | This process's certificate chain (PEM) |
| `--key <KEY>` | path | `$DIFFUSE_KEY` | This process's private key (PEM) |

## Notes

Normally started by systemd rather than by hand; the package installs the unit. Run it in a terminal when you want to watch it start.

## Examples

```bash
$ diffuse-coordinator serve --config /etc/diffuse/coordinator.toml
```

```
2026-09-29T23:24:26.469142Z  INFO diffuse_coordinator: coordinator listening (mTLS, TLS 1.3 only) addr=0.0.0.0:7443 heartbeat_interval_ms=5000 eviction_after_missed=3
2026-09-29T23:24:26.469529Z  INFO diffuse_coordinator: provisioning listener up (TLS 1.3, server-authenticated, token-authorized) addr=0.0.0.0:7444 advertise=https://coordinator.internal:7443
```

---

[← All commands](index.md)
