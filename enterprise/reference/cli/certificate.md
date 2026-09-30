# `diffuse-coordinator certificate`

This machine's certificate: the names and addresses nodes reach it by.

## What you do with it

The certificate this machine presents to nodes, people and applications, on
7443, 7444, 7446 and 8443. It names every address and name the machine had
when it was issued.

### After the coordinator's address changed

A node dialling an address the certificate does not name is refused at the
handshake. Issue it again for the addresses the machine has now; nodes are not
enrolled again:

```bash
sudo diffuse-coordinator certificate renew
```

[`certificate renew`](certificate-renew.md) restarts the coordinator and the
api when it is done, and says which addresses it covers now and which it no
longer does.

### When the root key is offline

The renewal reads the deployment's root key once. Bring it on a medium, point
at it, and take it away again:

```bash
sudo diffuse-coordinator certificate renew --root-ca-key /media/usb/root-ca.key
```

[`certificate renew`](certificate-renew.md)

### Behind a load balancer or a NAT

Add the name or the address machines reach this one by, when it is not one of
its own:

```bash
sudo diffuse-coordinator certificate renew --host coordinator.klinik.example --host 203.0.113.10
```

[`certificate renew`](certificate-renew.md)

### Renew now, restart later

```bash
sudo diffuse-coordinator certificate renew --no-restart
sudo systemctl restart diffuse-coordinator diffuse-api
```

[`certificate renew`](certificate-renew.md)

## Synopsis

```
diffuse-coordinator certificate <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`renew`](certificate-renew.md) | Issue this machine's certificate again, for the names and addresses it has now |

## Notes

The certificate this machine presents on 7443, 7444, 7446 and 8443. `init` issues it for every address on this machine's interfaces and the names its network gives it, so a node can enrol by address on a network with no name service for it.

## Examples

---

[← All commands](index.md)
