<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import DxFooter from './components/DxFooter.vue'

const { Layout } = DefaultTheme

// Two effects, both first-party and both optional: a reading progress line, and
// headings, tables and code blocks that arrive as they are reached. The `js`
// class is what lets the stylesheet hide them at all, so a reader without
// scripting sees the page rather than an empty column.
let observer: IntersectionObserver | null = null
let onScroll: (() => void) | null = null

function watchContent() {
  if (!observer) return
  document
    .querySelectorAll('.vp-doc h2, .vp-doc table, .vp-doc div[class*="language-"]')
    .forEach((el) => {
      if (!el.classList.contains('dx-seen')) observer!.observe(el)
    })
}

onMounted(() => {
  document.documentElement.classList.add('js')

  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  onScroll = () => {
    const h = document.documentElement
    const max = h.scrollHeight - h.clientHeight
    h.style.setProperty('--dx-read', String(max > 0 ? h.scrollTop / max : 0))
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  if (calm || !('IntersectionObserver' in window)) {
    document
      .querySelectorAll('.vp-doc h2, .vp-doc table, .vp-doc div[class*="language-"]')
      .forEach((el) => el.classList.add('dx-seen'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('dx-seen')
          observer!.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  )

  watchContent()
  // Client-side navigation replaces the article, so the new one is watched too.
  const repeat = setInterval(watchContent, 700)
  onUnmounted(() => clearInterval(repeat))
})

onUnmounted(() => {
  if (onScroll) window.removeEventListener('scroll', onScroll)
  if (observer) observer.disconnect()
})
</script>

<template>
  <Layout>
    <template #layout-top>
      <div class="dx-progress" aria-hidden="true"></div>
      <div class="dx-bg" aria-hidden="true">
        <div class="dx-bg__aurora"></div>
        <div class="dx-bg__grid"></div>
      </div>
    </template>
    <template #layout-bottom>
      <DxFooter />
    </template>
  </Layout>
</template>
