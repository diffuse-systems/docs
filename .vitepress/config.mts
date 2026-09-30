import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const site = join(dirname(fileURLToPath(import.meta.url)), '..')

// **The command reference as a tree: program, group, command.** Built from the
// pages themselves when the site builds, the first line of each naming its
// command, so a command added to a program is in the sidebar the moment its
// page is synced and one removed cannot leave an entry that leads nowhere. The
// pages are generated in each program's repository and copied here by
// `packaging/sync-cli-reference.sh` in diffuse-enterprise; editing one here is
// editing something the next copy overwrites.
function commandTree(dir: string, program: string): DefaultTheme.SidebarItem {
  const base = `/enterprise/reference/${dir}`
  const commands = readdirSync(join(site, 'enterprise/reference', dir))
    .filter((file) => file.endsWith('.md') && file !== 'index.md')
    .map((file) => {
      const title = readFileSync(join(site, 'enterprise/reference', dir, file), 'utf8')
        .split('\n', 1)[0]
      const words = title.match(/^# `([^`]+)`$/)?.[1].split(' ') ?? []
      if (words[0] !== program || words.length < 2 || words.length > 3) {
        throw new Error(`${dir}/${file} does not open on a ${program} command: ${title}`)
      }
      return { path: words.slice(1), link: `${base}/${file.slice(0, -'.md'.length)}` }
    })
  const byName = (a: { path: string[] }, b: { path: string[] }) =>
    a.path.join(' ').localeCompare(b.path.join(' '))

  return {
    text: program,
    link: `${base}/`,
    collapsed: true,
    items: commands
      .filter((command) => command.path.length === 1)
      .sort(byName)
      .map((command) => {
        const subcommands = commands
          .filter((sub) => sub.path.length === 2 && sub.path[0] === command.path[0])
          .sort(byName)
          .map((sub) => ({ text: sub.path[1], link: sub.link }))
        return subcommands.length
          ? { text: command.path[0], link: command.link, collapsed: true, items: subcommands }
          : { text: command.path[0], link: command.link }
      }),
  }
}

// Two product trees, never mixed on one page. Enterprise is the commercial
// product and comes first; Open is the public project, kept as a mirror and
// deliberately not promoted.
export default defineConfig({
  title: 'Diffuse Systems',
  description:
    'Run, fine-tune and distil language models on the machines you already own.',
  lang: 'en-US',
  base: process.env.DEPLOY_BASE || '/',
  cleanUrls: true,
  appearance: 'dark',

  // Every .md under the root is a page unless excluded, and the repository's
  // own README is not documentation. Without this it ships as /README.html.
  srcExclude: ['README.md'],

  // No remote anything. VitePress bundles its own fonts and the local search
  // index is built at compile time, so a visitor's browser talks to this host
  // and to nothing else. A product that sells sovereignty cannot have a site
  // that phones a CDN.
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#08090d' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Diffuse Systems' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Distributed inference, fine-tuning and distillation on your own hardware.',
      },
    ],
  ],

  themeConfig: {
    logo: '/mark.png',
    siteTitle: 'Diffuse Systems',
    outline: { level: [2, 3], label: 'On this page' },
    search: { provider: 'local' },

    nav: [
      { text: 'Enterprise', link: '/enterprise/introduction', activeMatch: '/enterprise/' },
      { text: 'Open', link: '/open/', activeMatch: '/open/' },
      { text: 'diffuse-systems.com', link: 'https://diffuse-systems.com' },
    ],

    sidebar: {
      '/enterprise/': [
        {
          text: 'Diffuse Enterprise',
          items: [
            { text: 'Introduction', link: '/enterprise/introduction' },
            { text: 'Why Diffuse Enterprise', link: '/enterprise/why' },
            { text: 'Use cases', link: '/enterprise/use-cases' },
            { text: 'Model support', link: '/enterprise/model-support' },
          ],
        },
        {
          text: 'Architecture',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/enterprise/architecture/' },
            { text: 'Coordinator', link: '/enterprise/architecture/coordinator' },
            { text: 'Node agent', link: '/enterprise/architecture/node-agent' },
            { text: 'API', link: '/enterprise/architecture/api' },
            { text: 'Console', link: '/enterprise/architecture/console' },
            { text: 'Worker and backends', link: '/enterprise/architecture/worker' },
          ],
        },
        {
          text: 'Deployment',
          items: [
            { text: 'Installing and operating', link: '/enterprise/deployment' },
            { text: 'Network and ports', link: '/enterprise/network' },
          ],
        },
        {
          text: 'Using it',
          items: [
            { text: 'Serving', link: '/enterprise/serving' },
            { text: 'Chat interface', link: '/enterprise/chat' },
            { text: 'Fine-tuning', link: '/enterprise/fine-tuning' },
            { text: 'Distillation', link: '/enterprise/distillation' },
          ],
        },
        {
          text: 'Governance',
          collapsed: false,
          items: [
            { text: 'Identity and PKI', link: '/enterprise/governance/identity' },
            { text: 'Roles and permissions', link: '/enterprise/governance/rbac' },
            { text: 'Audit', link: '/enterprise/governance/audit' },
            { text: 'Licensing', link: '/enterprise/governance/licensing' },
          ],
        },
        {
          text: 'Security',
            items: [
              { text: 'Surfaces and threat model', link: '/enterprise/security' },
              { text: 'What has been verified', link: '/enterprise/verified' },
            ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'Overview', link: '/enterprise/reference' },
            commandTree('cli', 'diffuse-coordinator'),
            commandTree('agent-cli', 'diffuse-node-agent'),
            commandTree('chat-cli', 'diffuse-chat'),
            { text: 'The agent configuration file', link: '/enterprise/reference/agent-configuration' },
            { text: 'Glossary', link: '/enterprise/glossary' },
          ],
        },
        {
          text: 'Practicalities',
          items: [
            { text: 'Use cases', link: '/enterprise/use-cases' },
            { text: 'Troubleshooting', link: '/enterprise/troubleshooting' },
            { text: 'Limitations', link: '/enterprise/limitations' },
            { text: 'FAQ', link: '/enterprise/faq' },
            { text: 'Roadmap', link: '/enterprise/roadmap' },
          ],
        },
      ],
      '/open/': [
        {
          text: 'Introduction',
          items: [
            { text: 'The open project', link: '/open/' },
            { text: 'What is Diffuse', link: '/open/introduction/what-is-diffuse' },
            { text: 'How it works', link: '/open/introduction/how-it-works' },
            { text: 'Use cases', link: '/open/use-cases' },
            { text: 'Comparison', link: '/open/comparison' },
            { text: 'Open and Enterprise', link: '/open/compared' },
          ],
        },
        {
          text: 'Get started',
          items: [
            { text: 'Installation', link: '/open/start/installation' },
            { text: 'Quickstart', link: '/open/start/quickstart' },
            { text: 'Running a node', link: '/open/running-a-node' },
          ],
        },
        {
          text: 'Concepts',
          collapsed: false,
          items: [
            { text: 'Pipeline', link: '/open/concepts/pipeline' },
            { text: 'Model support', link: '/open/concepts/model-support' },
            { text: 'Diffusion', link: '/open/concepts/diffusion' },
            { text: 'Performance', link: '/open/concepts/performance' },
            { text: 'Gossip', link: '/open/concepts/gossip' },
            { text: 'Replication', link: '/open/concepts/replication' },
            { text: 'NAT relay', link: '/open/concepts/nat-relay' },
            { text: 'Trust', link: '/open/concepts/trust' },
          ],
        },
        {
          text: 'Guides',
          collapsed: true,
          items: [
            { text: 'Chat', link: '/open/guides/chat' },
            { text: 'Query', link: '/open/guides/query' },
            { text: 'Multimodal', link: '/open/guides/multimodal' },
            { text: 'Marketplace', link: '/open/guides/marketplace' },
            { text: 'Host a node', link: '/open/guides/host' },
            { text: 'Run a server', link: '/open/guides/server' },
            { text: 'Choosing a model', link: '/open/guides/choosing-a-model' },
            { text: 'Self-hosting', link: '/open/self-hosting' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'CLI', link: '/open/reference/cli' },
            { text: 'API', link: '/open/reference/api' },
          ],
        },
        {
          text: 'Performance',
          items: [{ text: 'Benchmarks', link: '/open/benchmarks' }],
        },
        {
          text: 'Trust',
          items: [
            { text: 'Privacy and threat model', link: '/open/privacy' },
            { text: 'Troubleshooting', link: '/open/troubleshooting' },
            { text: 'Limitations', link: '/open/limitations' },
          ],
        },
        {
          text: 'Resources',
          items: [
            { text: 'FAQ', link: '/open/faq' },
            { text: 'Glossary', link: '/open/glossary' },
            { text: 'Roadmap', link: '/open/roadmap' },
          ],
        },
      ],
    },

    footer: {
      message: 'Diffuse Enterprise is commercial software. Diffuse Open is AGPL-3.0.',
      copyright: 'Copyright (c) 2026 Diffuse Systems',
    },

    docFooter: { prev: 'Previous', next: 'Next' },
  },
})
