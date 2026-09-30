# `diffuse-coordinator licence`

What this deployment is entitled to, and until when.

## What you do with it

### Install the first licence

The licence is a file you were sent. Install it on the coordinator's machine;
it is verified before anything is replaced, and the output lists the ports the
product opened:

```bash
sudo diffuse-coordinator licence set /tmp/klinik-2027.licence
```

[`licence set`](licence-set.md)

### See what it covers and until when

```bash
sudo diffuse-coordinator licence show
sudo diffuse-coordinator licence show --output json
```

[`licence show`](licence-show.md) gives the organisation, the edition, the
number of machines it allows and how many are active, the features and the end
date. Every administration command also says so when the end is 30 days away or
less.

### Renew it without stopping anything

A renewal is a new file with a later date. Install it over the old one: nothing
restarts and no request is interrupted.

```bash
sudo diffuse-coordinator licence set /tmp/klinik-2028.licence
sudo diffuse-coordinator licence show
```

[`licence set`](licence-set.md) · [`licence show`](licence-show.md)

### What happens when it expires

Nothing stops on the day. For 30 days of grace everything works, with a notice.
After the grace period, serving on `/v1`, new jobs, enrolling a machine and
administration commands are refused; requests and jobs already running finish;
[`licence set`](licence-set.md) and [`licence show`](licence-show.md), reading
and exporting the audit trail, exporting your adapters and datasets, and the
renewal of node certificates keep working. Installing a new licence brings
everything back at once:

```bash
sudo diffuse-coordinator licence set /tmp/klinik-2028.licence
```

## Synopsis

```
diffuse-coordinator licence <COMMAND>
```

## Commands

| command | what it does |
|---|---|
| [`show`](licence-show.md) | Show the licence this coordinator is running under |
| [`set`](licence-set.md) | Install a licence file and bring the deployment up on it |

---

[← All commands](index.md)
