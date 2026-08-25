# docs.diffuse-systems.com

The documentation, built with VitePress. Two product trees that are never
mixed on one page:

| | |
|---|---|
| `enterprise/` | Diffuse Enterprise, the commercial product |
| `open/` | Diffuse Open, the public project, kept as a mirror |

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # into .vitepress/dist
npm run preview
```

The marketing site is a separate repository and a separate domain,
`diffuse-systems.com`.

## Publishing

A push to `main` builds and publishes to GitHub Pages.

Two details are load-bearing and easy to break:

- **`CNAME` lives in `public/`, not at the repository root.** VitePress
  publishes `.vitepress/dist`, and `public/` is the only directory copied into
  it verbatim. A root `CNAME` would never reach the artifact and the custom
  domain would drop on every deploy.
- **`base` stays `/`.** The site is served from the root of its own domain.
  The `DEPLOY_BASE` environment variable in `.vitepress/config.mts` exists
  only for a project-page preview under a path prefix.

## Rules this site follows

**Nothing loads from a third party.** VitePress bundles its own fonts and the
search index is built at compile time, so a visitor's browser talks to this
host and to nothing else. No Algolia, no analytics, no CDN.

**No performance figure that has not been measured** on hardware we can name.

**No emoji, no em dash.**

## Licence

The documentation is proprietary. Diffuse Open, which it documents, is
AGPL-3.0 and lives in its own repository.
