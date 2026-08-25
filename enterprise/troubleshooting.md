# Troubleshooting

The failures people actually meet, and what each one means.

The first move is almost always the same:

```bash
diffuse-coordinator nodes --wide
```

That shows every machine, its health, what it is doing, and the reason in full
for anything that failed. A great many questions end there.

## The coordinator will not start

```bash
sudo systemctl status diffuse-coordinator
sudo journalctl -u diffuse-coordinator -n 50 --no-pager
```

**Exit code 77** is a configuration error, and systemd is deliberately told not
to restart it: looping on a bad configuration file hides the message. The log
line names the file and the problem.

**"a certificate its own trust store cannot verify"** is a half-cleaned machine:
the enrolment authority and the service certificates were removed by different
commands and only one survived. The message names both files. The fix is to
finish the removal and start over, or restore the backup.

## A machine will not enrol

**"this does not look like a Diffuse join token"** means the whole token was not
pasted. It begins with `DFE1-` and is long.

**"the token has been used the maximum number of times"** is what it says.
Issue another; `--max-uses` exists for fleets.

**"a machine that already holds an identity"** is not an error. Running `enroll`
twice does nothing the second time, on purpose, because a second identity is a
second node record and a second licence seat.

**"the licence covers N machines and N are enrolled"**: revoke a machine you no
longer use, or ask us for more seats.

## A node is enrolled but not healthy

```bash
sudo journalctl -u diffuse-node-agent -n 50 --no-pager
```

**"No module named 'llama_cpp'"** means the wrong package variant is installed:
the CPU package on a machine that needs CUDA, or the reverse. Both backends ship
inside the package, so this is never a missing download. The message names the
package to install.

**"cannot read /etc/diffuse/agent.toml: Permission denied"** means you are
running the command as yourself on a machine where the file belongs to the
service user. Use `sudo`, or add yourself to the `diffuse` group.

## A model will not serve

**"needs X GB free and the largest machine here has Y"**: the refusal arrives
before anything is downloaded. Take a smaller size, free memory, or enrol a
machine that has it.

**"is a GGUF model, and splitting needs safetensors"**: the model is too large
for any single machine and a GGUF is never split. Take the publisher's
safetensors.

**"this deployment already serves X"**: one model at a time.
`deployment rm <id>` first.

**"no model X. Acquire it first"** with a model you are sure you have: you are
probably typing the hub reference and it was filed under a key. The refusal now
names the key it is filed under. `model list` shows both columns.

## The API returns an error

**401** `invalid_api_key`: no key, or one that is not recognised. Keys are shown
once and stored hashed, so a lost key is reissued rather than recovered.

**403** `insufficient_scope`: a valid key, outside its scope. Re-sending it will
not help, which is why this is 403 and not 401.

**404** `model_not_found`: check `GET /v1/models`. If an adapter is merged, the
name is `<model>-<adapter>` and the base name alone stops resolving, so that a
request cannot be ambiguous about which weights answered.

**503** `node_unavailable`: a machine holding a slice could not load it or has
gone. The message names the machine, and `nodes --wide` shows the identical
line.

## A training run fails

**"is a GGUF model, and fine-tuning needs the original safetensors weights"**:
refused at creation, before anything was spent.

**The run paused after the first step** because the step measured more memory
than the estimate cleared. The message names both figures and what to change.
The checkpoint is kept.

**"a dataset needs a classification"**: declared, never detected. Pass
`--classification` with a word your organisation uses. `finetune` defaults it to
`internal`.

**Loss flattens high.** The adapter learned little. More epochs, a higher rank,
or more targeted projections.

**The model answers your new fact everywhere**, including to unrelated
questions. That is overfitting and it is common on small models. Fewer epochs,
a larger base model, or a broader corpus.
[Fine-tuning](/enterprise/fine-tuning#what-a-small-model-actually-learns) has a
worked example of exactly this.

## The console

**A certificate warning in the browser** is expected on a deployment using its
own authority: your browser has never seen it. Import `/etc/diffuse/ca.crt`
into the trust store, or put a certificate your workstations already trust in
the `[operator]` section so nobody has to.

**Signed out after changing your password** is deliberate: changing a password
revokes every session of that account, including the one that changed it.

**An action is refused with an origin mismatch** means the page was reached by
one name and the request carried another. Reach the console by the name in its
certificate.

## Getting help

```bash
diffuse-coordinator audit --limit 50
diffuse-coordinator licence show
diffuse-coordinator nodes --wide
```

Those three, plus the journal of whatever failed, are what we will ask for.
contact@diffuse-systems.com.
