# Running a node

Contributing a machine to the open network. Nothing here applies to Diffuse
Enterprise, which enrols machines rather than accepting them.

## Installing

One command, and nothing to build: the binary is prebuilt.

```bash
curl -fsSL https://raw.githubusercontent.com/UnlikedOne/diffuse/main/install.sh | bash
```

On Windows, in PowerShell:

```powershell
irm https://raw.githubusercontent.com/UnlikedOne/diffuse/main/install.ps1 | iex
```

That downloads the binary, checks its published checksum, sets up the Python
worker and puts everything in place. No account, no API key, no server of your
own and no Rust toolchain.

Binaries exist for Linux on x86_64 and aarch64, and for macOS on Intel and
Apple Silicon.

::: tip This is the open project's installer, not ours
Enterprise deliberately has no `curl | bash` path: it installs from signed
packages through the system package manager. The difference is the audience.
Piping a script from the internet into a shell is a reasonable trade for a
volunteer and an unreasonable one for a hospital.
:::

## Serving a slice

```bash
diffuse host --model Qwen/Qwen2.5-0.5B-Instruct
```

The node measures its own memory, asks the network which slice is most needed,
takes it, and starts serving. Logs go to the terminal and `Ctrl+C` stops it.

To join a specific network rather than the public one:

```bash
diffuse host --model Qwen/Qwen2.5-0.5B-Instruct --bootstrap http://your-sentinel:9440
```

## Behind NAT

Nothing to configure. A node that cannot accept inbound connections serves
through an encrypted relay, so a machine behind a home router contributes as
well as consumes. That was a deliberate piece of work rather than a side
effect: a network that only accepts publicly reachable machines is a network of
data centres.

## Talking to the network

```bash
diffuse chat
```

Your device tokenizes the prompt and runs the first layers itself. What leaves
is transformed mathematics. Answers stream token by token as the network
produces them.

## What you are agreeing to

Worth being explicit, because it is the opposite of the Enterprise arrangement.

**Your machine computes other people's requests.** It sees raw activations, not
text, and it cannot read what it is computing without work that is hard rather
than impossible.

**You are not anonymous to the network at the transport level.** Your address is
visible to the peers you connect to. The project hides what you say, not that
you are speaking.

**There is no operator, no support and no guarantee.** Nodes come and go, the
network heals, and a slice you were serving may move without notice.

If any of that is unacceptable for what you want to run, that is what
[Enterprise](/enterprise/introduction) is.
