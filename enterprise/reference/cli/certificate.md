# `diffuse-coordinator certificate`

This machine's certificate: the names and addresses nodes reach it by.

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
