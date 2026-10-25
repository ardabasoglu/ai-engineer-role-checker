# AI Engineer Role Checker

A Cloudflare Pages app for assessing readiness for agent-era engineering work.

The app is based on Laurie Voss's talk, **AI Writes the Code. So What's Left for Engineers?**

```text
https://www.youtube.com/watch?v=kspZP5BgkEU
```

The public UI shows the questionnaire. The scoring logic runs in a Cloudflare Pages Function at `/api/score`.

## Current app

- Default UI: `index.html`
- API endpoint: `POST /api/score`
- Source framework: bottleneck awareness, review, specification, product judgment, and learning path
- Production URL: `https://ai-engineer-role-checker.pages.dev/`

## Local development

```bash
npm install
npm test
npm run dev
```

Then visit:

```text
http://localhost:8788/
```

Test the API locally:

```bash
curl -X POST http://localhost:8788/api/score \
  -H 'content-type: application/json' \
  --data '{"answers":[{"id":"b1","answer":"yes"},{"id":"r1","answer":"maybe"}]}'
```

## Deploy

Cloudflare Pages project:

```text
ai-engineer-role-checker
```

Manual deploy:

```bash
npx wrangler pages deploy . --project-name=ai-engineer-role-checker --branch=main --commit-dirty=true
```

## Discovery

The app includes crawler- and AI-tool-friendly metadata:

- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `llms-full.txt`
- JSON-LD `WebApplication` schema
- Open Graph and canonical metadata

## Notes

- The raw transcript is saved locally under `docs/logic/` and ignored by git.
- The public app includes the derived scorecard, not the full transcript.
