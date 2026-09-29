# `diffuse-coordinator certificate renew`

Issue this machine's certificate again, for the names and addresses it has now.

The repair when this machine's addresses change: a node that dials an address the certificate does not name refuses the connection. Nodes keep their identities and nothing is enrolled again, since what they trust is the deployment's root, which does not change.

The certificate is signed by that root, so this needs the root key: `init` wrote it beside the state and asked for it to be taken offline. Names the previous certificate covered are kept; an address this machine no longer has is dropped unless it is named again with --host.

## Synopsis

```
diffuse-coordinator certificate renew [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | `$DIFFUSE_COORDINATOR_CONFIG` | Configuration file, read for the state directory and the control port |
| `--host` | `<HOSTS>` | - | A name or an address to cover besides this machine's own: a load balancer's name, the outside of a NAT. Repeatable |
| `--root-ca-key` | `<ROOT_CA_KEY>` | - | The deployment root CA private key (PEM), when it is no longer in the state directory. Read once, not stored |
| `--cert-dir` | `<CERT_DIR>` | `/etc/diffuse` | Where the certificates are |
| `--no-restart` | flag | - | Write the certificate, but do not restart anything |

## Notes

When this machine's addresses change. Nodes are not enrolled again: what they trust is the deployment's root, which does not change. Needs the root key, read once: from the state directory, or `--root-ca-key` once it is offline. On the audit trail as `certificate.renew`.

## Examples

```bash
$ sudo diffuse-coordinator certificate renew
```

```
This machine's certificate, /etc/diffuse/coordinator.crt, now covers:

    localhost, rechner-01, rechner-01.fritz.box, rechner-01.local, 127.0.0.1,
    10.77.5.2

  No longer covered, since this machine no longer has them: 192.168.178.20.

  On the audit trail: diffuse-coordinator audit --action certificate.renew

  coordinator   running
  api           running

  Nodes keep their identities, and nothing is enrolled again: what they trust
  is this deployment's root, which has not changed. A node that registers at
  an address this machine no longer has is pointed at the new one, on it:

    sudo diffuse-node-agent config set-coordinator https://10.77.5.2:7443
    sudo systemctl restart diffuse-node-agent
```

---

[← `diffuse-coordinator certificate`](certificate.md) · [All commands](index.md)
