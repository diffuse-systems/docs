# `diffuse-coordinator firewall close-enrolment`

Close enrolment, once every machine has joined.

Machines already in the pool are unaffected: their heartbeats and slices travel over connections they open to the control plane.

## Synopsis

```
diffuse-coordinator firewall close-enrolment [OPTIONS]
```

## Options

| flag | value | default | description |
|---|---|---|---|
| `--config` | `<CONFIG>` | - | The coordinator's configuration, read for the ports. Defaults to the packaged one |
| `--api-env` | `<API_ENV>` | `/etc/diffuse/api.env` | The api's environment file, read for its port |

## Notes

The right move once the park is built. On the audit trail as `firewall.close_enrolment`.

## Examples

```bash
$ sudo diffuse-coordinator firewall close-enrolment
```

```
Enrolment (7444) is closed in ufw. New machines cannot join. What ran:

    sudo ufw delete allow 7444/tcp

  What this does not affect: machines already in the pool. Their heartbeats,
  slices, training work and certificate renewals travel over connections each
  of them opens to the control plane, not to 7444.
```

---

[← `diffuse-coordinator firewall`](firewall.md) · [All commands](index.md)
