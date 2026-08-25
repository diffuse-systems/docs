<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="dx-footer">
    <div class="dx-footer__inner">
      <div class="dx-footer__brand">
        <img class="dx-footer__logo" src="/mark.png" alt="" aria-hidden="true" />
        <div>
          <p class="dx-footer__name">Diffuse Systems</p>
          <p class="dx-footer__tag">Run, fine-tune and distil language models on the machines you already own.</p>
          <div class="dx-footer__badges">
            <span>your hardware</span>
            <span>your data</span>
            <span>no telemetry</span>
          </div>
        </div>
      </div>

      <nav class="dx-footer__cols">
        <div class="dx-footer__col">
          <p class="dx-footer__head">Enterprise</p>
          <a href="/enterprise/introduction">Introduction</a>
          <a href="/enterprise/model-support">Model support</a>
          <a href="/enterprise/deployment">Deployment</a>
        </div>
        <div class="dx-footer__col">
          <p class="dx-footer__head">Using it</p>
          <a href="/enterprise/serving">Serving</a>
          <a href="/enterprise/fine-tuning">Fine-tuning</a>
          <a href="/enterprise/distillation">Distillation</a>
        </div>
        <div class="dx-footer__col">
          <p class="dx-footer__head">Reference</p>
          <a href="/enterprise/reference">CLI and API</a>
          <a href="/enterprise/security">Security</a>
          <a href="/enterprise/governance/licensing">Licensing</a>
        </div>
        <div class="dx-footer__col">
          <p class="dx-footer__head">Elsewhere</p>
          <a href="https://diffuse-systems.com">diffuse-systems.com</a>
          <a href="/open/">Diffuse Open</a>
        </div>
      </nav>
    </div>

    <div class="dx-footer__bar">
      <span>&copy; {{ year }} Diffuse Systems &middot; Enterprise is commercial software. Open is AGPL-3.0.</span>
      <span class="dx-footer__pulse"><i></i> nothing leaves your deployment</span>
    </div>
  </footer>
</template>
