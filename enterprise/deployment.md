# Deployment

Installing, upgrading, and the two procedures you want written down before you
need them.

## Before you start: Debian 12

**The machines that compute must run Debian 12 (bookworm).** The node-agent
package requires python3 3.11 exactly, its ML wheels are built against that
ABI, so `apt` refuses it on Debian 13, Ubuntu 22.04 and Ubuntu 24.04. The
coordinator is less fussy, but a deployment needs agents.

[Limitations](./limitations.md) has the detail and the fix that would lift it.

## Before you start: a CPU with AVX2

**Every machine that serves a GGUF model needs `avx2`, `fma`, `f16c` and
`bmi2`.** The node agent ships llama.cpp built for x86-64-v3, whose oldest CPU
is Intel Haswell (2013) or AMD Excavator (2015). Check a machine before you
count it in:

```bash
grep -o -m1 -E 'avx2|fma|f16c|bmi2' /proc/cpuinfo | sort -u
```

Four lines back and the machine is fine. The package refuses to install
otherwise and names the instruction it did not find.

Worth knowing for a mixed park: Intel sold Pentium and Celeron parts well past
2013 with `avx2` switched off, so a 2019 office desktop can fail this while a
2014 laptop passes. Age is not the test, the command is.

A machine below the line can still serve safetensors models on the reference
backend, which is PyTorch and needs none of this. Install it with
`DIFFUSE_ALLOW_SLOW_CPU=1` and keep GGUF deployments off it with pools.

## Get the packages

These links always point at the newest release. They carry no version, so they
do not change between releases and neither does anything you script against
them.

```bash
curl -fsSLO https://github.com/diffuse-systems/releases/releases/latest/download/diffuse-coordinator_amd64.deb
curl -fsSLO https://github.com/diffuse-systems/releases/releases/latest/download/diffuse-node-agent_cpu_amd64.deb
curl -fsSLO https://github.com/diffuse-systems/releases/releases/latest/download/SHA256SUMS

# Check what you downloaded before you install it.
sha256sum -c SHA256SUMS
```

`sha256sum -c` prints `OK` per file. Anything else means the download is not
what was published, and the answer is to fetch it again rather than to install
it.

The version is not in the filename; it is in the package and in the release
tag. `dpkg -I diffuse-coordinator_amd64.deb | grep Version` says which one you
have.

## Two commands

On the machine that will coordinate:

```bash
sudo apt install ./diffuse-coordinator_amd64.deb
sudo diffuse-coordinator licence set ./licence
```

**The licence comes from us.** It arrives by email when your contract starts,
as one file. It is signed, so it is verified before anything is replaced and a
wrong file cannot take a running deployment down.

The first asks one question, the name of your organisation, which names the
deployment's certificate authority and appears in every certificate the cluster
issues. Then it generates that authority, creates the first administrator, and
starts the coordinator and the API. If it could not start something, it says so
and prints the service's own log rather than claiming success.

The second checks the licence before replacing anything, installs it, and hands
you the console address and the credentials for it:

```
Licence installed.

  organisation  Universitätsklinikum Freiburg
  edition       enterprise
  nodes         24
  expires       2027-06-30
  features      training, distillation, fast-backend

It is ready. Sign in at https://coordinator.internal:7446/console

  username      owner
  one-time password   7f3Kq2mXvB9t

Change it at first sign-in. This is the only time it is shown.
```

::: warning Use the package manager
`apt install ./file.deb`, never `dpkg -i`. Neither `dpkg -i` nor `rpm -i`
resolves dependencies, and a package whose dependency is missing is left
unpacked but not configured, a state from which every later apt operation on
that machine fails until somebody repairs it by hand. The leading `./` is how
apt tells a local file from a repository name.
:::

## And a machine that computes

```bash
sudo apt install ./diffuse-node-agent_cpu_amd64.deb
sudo diffuse-node-agent enroll --token DFE1-...
```

The token comes from the coordinator:

```bash
sudo diffuse-coordinator token create --pool lab --max-uses 10 --ttl 24h
```

```
Join token DCAJJWAW created.
  usable 10 times, until 2026-08-24 19:12:04Z
  this is the only time the full token is shown.

Or, if the agent binary is already deployed:
  diffuse-node-agent enroll --endpoint https://coordinator.internal:7444 \
      --token DFE1-DCAJJWAW-FSM2F90QT94QNNDFVTG9M2YB18-KDQP282HESYX3XJPMEJ2GVZVC8-FW
```

Enrolling then reports what happened:

```
Enrolled as node-01.

  identity     /var/lib/diffuse-node-agent
  coordinator  https://coordinator.internal:7443
  expires      in 89 days

This node is in the pool.
```

`enroll` writes the identity, hands it to the service user, starts the agent and
waits to see it registered. Running it twice does nothing the second time.

## What next

At this point the deployment decides and computes, and nothing is serving yet.
The rest of the journey is three pages, in the order most sites take them:

1. [Serving](/enterprise/serving), to get a model answering on `/v1`. This is
   the step that turns an installation into something a developer can call.
2. [Chat interface](/enterprise/chat), to put a chat window in front of it for
   the people in your organisation who will never call an API. It is a separate
   repository you clone on whichever machine will run it, and it is the fastest
   way to get the deployment used by somebody other than the team that
   installed it.
3. [Fine-tuning](/enterprise/fine-tuning), when a served model needs to be
   taught something only your data knows.

## All-in-one

The coordinator and an agent on the same machine is a supported and common
shape: a single workstation that both decides and computes. Install both
packages, enrol against the loopback, and everything else is identical.

```bash
sudo apt install ./diffuse-coordinator_amd64.deb
sudo apt install ./diffuse-node-agent_cpu_amd64.deb
sudo diffuse-coordinator licence set ./licence
sudo diffuse-node-agent enroll --endpoint https://127.0.0.1:7444 --token DFE1-...
```

Nothing about the security model relaxes because the two are on one host. The
agent still authenticates with a certificate, and the connection is still
mutually authenticated TLS over the loopback.

## Air-gapped

The intended case rather than an afterthought.

The offline bundle is a tar archive containing both packages, the documents and
the digests: about 275 MB. It contains no script: everything is installed by
the package manager, and the packages carry both inference backends with every
dependency they import. Nothing is fetched at install time and nothing is
fetched when a node is given a model.

On a machine with a route out:

```bash
curl -fsSLO https://github.com/diffuse-systems/releases/releases/latest/download/diffuse-enterprise.tar.gz
curl -fsSLO https://github.com/diffuse-systems/releases/releases/latest/download/SHA256SUMS

# Check it here, while you can still fetch it again.
sha256sum --ignore-missing -c SHA256SUMS
```

`--ignore-missing` because `SHA256SUMS` covers all three published assets and
you have taken one. Carry both files across, check again after the copy, then:

```bash
tar xzf diffuse-enterprise.tar.gz
cd diffuse-enterprise-*
sha256sum -c SHA256SUMS          # the bundle's own, over its contents
sudo apt install ./diffuse-coordinator_amd64.deb
```

There are two `SHA256SUMS` and they answer different questions: the one beside
the bundle says the archive is what we published, the one inside says the
packages are the ones that went in.

Models arrive the same way. Put a file on the coordinator and import it:

```bash
sudo mv your-model.gguf /var/lib/diffuse-models/
sudo diffuse-coordinator model import --from /var/lib/diffuse-models/your-model.gguf
```

`/var/lib/diffuse-models` is created at install, owned by the service user and
group-writable, so an administrator in the `diffuse` group drops a file in
without sudo. Importing from a home directory does not work and the refusal
explains why: the coordinator runs as `diffuse`, not as you, and `sudo` changes
who typed the command rather than who runs the service.

## The one thing to do by hand

Copy `/var/lib/diffuse-coordinator/root-ca.key` somewhere offline, then delete
it from the machine. It signs certificates for the whole deployment and the
coordinator does not need it to run, only to issue new service certificates,
which is rare and deliberate.

## Upgrading

Install the new package over the old one. Configuration files you have edited
are kept, the services are restarted, and the state directory is untouched.

Upgrade the coordinator first, then the agents. The wire contract is versioned
and an older agent talking to a newer coordinator is a supported state for the
length of a rolling upgrade, which is what makes it possible to do the fleet in
batches.

## Backup and restore

**One directory is irreplaceable: `/var/lib/diffuse-coordinator`.** It holds the
enrolment authority and its key, every node identity, the accounts, the API
keys, the audit trail, the datasets and every adapter. `/etc/diffuse` is worth a
copy too, for the service certificates and the configuration.

```bash
sudo systemctl stop diffuse-coordinator diffuse-api
sudo tar czf diffuse-backup-$(date +%Y%m%d).tar.gz \
     -C / var/lib/diffuse-coordinator etc/diffuse
sudo systemctl start diffuse-coordinator diffuse-api
```

The archive contains private keys. It belongs wherever your organisation keeps
key material, encrypted at rest, and not on the machine it came from.

Restoring onto a new machine, in this order, because the order is the thing that
matters:

```bash
# 1. Install without letting the package create a deployment.
sudo DIFFUSE_NO_AUTO_INIT=1 apt-get install -y ./diffuse-coordinator_amd64.deb

# 2. Put the deployment back.
sudo tar xzf diffuse-backup-YYYYMMDD.tar.gz -C /
sudo chown -R diffuse:diffuse /var/lib/diffuse-coordinator

# 3. Start it.
sudo systemctl enable --now diffuse-coordinator diffuse-api
```

Check it came back:

```bash
diffuse-coordinator nodes
```

```
NODE     POOL  HEALTH   CORES  RAM       ACCELERATOR  LAST SEEN  LICENSED
node-01  lab   healthy  16     62.7 GiB  RTX 4090     1.2s       yes
node-02  lab   healthy  8      15.5 GiB  -            0.9s       yes
```

The nodes need nothing. Their identities were issued by the authority you have
just restored, so they reconnect on their next heartbeat. If the new machine has
a different name, either give it the old name in DNS or re-enrol each node.

## Starting over

```bash
sudo apt purge diffuse-coordinator diffuse-node-agent
sudo rm -rf /var/lib/diffuse-coordinator /var/lib/diffuse-node-agent
```

`purge` removes the software and the configuration it owns. The second line is
the deployment itself, which belongs to you rather than to the package manager,
so nothing removes it on your behalf.

A half-cleaned machine is the one failure worth naming: the enrolment authority
and the service certificates are removed by different commands, and if only one
survives you have certificates signed by one authority beside a trust store
naming another. The package refuses to generate a new authority on top of half a
deployment, and the coordinator refuses to start with a certificate its own
trust store cannot verify, naming both files. Neither is a state you can reach
silently.

## If your site already has a certificate authority

```bash
sudo DIFFUSE_NO_AUTO_INIT=1 apt-get install -y ./diffuse-coordinator_amd64.deb
sudo diffuse-coordinator init \
     --root-ca-cert /path/to/root.crt --root-ca-key /path/to/root.key
sudo systemctl enable --now diffuse-coordinator diffuse-api
```

Add `--no-owner` if your accounts come from configuration management or an
identity provider rather than from `init`.
