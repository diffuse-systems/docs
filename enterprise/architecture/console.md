# Console

A web interface on port 7446, served by the coordinator itself.

## What it is for

The operator's view: the pool, the models, the runs, the API keys, the audit
trail, the licence. Enough to run a deployment without a terminal, and not a
replacement for the CLI, which remains the surface that scripts and
configuration management use.

## What it is made of

Server-rendered HTML with a small amount of first-party JavaScript for the
theme toggle, the collapsible menu, table sorting, copy buttons and the pool
refresh. No framework, no bundler, no npm, and no third-party script.

The content security policy has no `unsafe-inline` and no `unsafe-eval`. Fonts
are embedded in the binary rather than fetched, so the console works on a
machine with no route out and tells no one that it was opened.

## What it hides is never the security

Every restriction the interface applies is enforced server side as well, and
the interface only declines to offer what would be refused anyway. A person who
crafts the request by hand meets the same permission check, and the audit row
is written either way.

## Sessions

An account signs in with a password, receives a session cookie that is
`HttpOnly`, `Secure` and `SameSite=Strict`, and the coordinator revokes every
session of an account when its password changes.

Cross-site request forgery is refused in three layers: the cookie's `SameSite`,
an `Origin` compared against the `Host`, and a double-submit token. An `Origin`
of `null` is treated as absent rather than as foreign, because that is what an
opaque origin means and refusing it would break legitimate cases.

## The pages

| | |
|---|---|
| Pool | every machine, health, what it holds, what it is doing |
| Models | what is served, the catalogue, and one action per card |
| Jobs | training and distillation runs, with a loss curve on the detail page |
| Keys | issue and revoke, with the key shown once and a ready request |
| Audit | who did what, when, and what was refused |
| Licence | what this deployment is entitled to, and until when |

The loss curve is a server-rendered SVG. A charting library would be a
third-party script on a page that is not allowed to load one, and a line through
a thousand points is arithmetic.
