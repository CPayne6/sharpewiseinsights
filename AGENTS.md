# Sharpe Wise Insights Project Guide

## Working with a non-technical owner

The owner should be able to describe a change in everyday language. The agent handles locating files, editing code, running commands, and verifying the result. Explain decisions by their visible effect on the website. Do not assume the owner knows Git, DNS, build tools, or terminal commands.

- Use the existing brand and architecture to make routine implementation decisions. Ask concise questions only when the answer affects content, account access, cost, or the requested outcome.
- Complete the requested work, including a local preview and relevant checks. Report what changed, how to view it, and whether it is local, committed, pushed, or confirmed live.
- An instruction to edit is not automatically an instruction to publish. When the owner says "push to main", "publish", or "make it live", perform the authorized publishing steps below. Do not repeatedly request approval already provided for the current work.
- Warn before a production push that it can update the public site automatically. Never claim a successful Git push proves a successful Netlify deployment.
- Preserve unrelated work. Never force-push, discard uncommitted changes, delete submissions, or overwrite DNS records as a routine shortcut.
- If account access is unavailable, finish everything possible locally and give the owner the exact remaining dashboard steps. Do not ask them to paste passwords or access tokens into chat.

### Example requests the owner can give an agent

- "Change this paragraph and show me the local preview."
- "Replace the hero with this photo, optimize it for mobile, and push to main."
- "Check that each header link matches the section order and works on mobile."
- "Help me get inquiry notifications at my company email."
- "Find out why the latest Netlify deployment failed and fix it."
- "Undo the last published change without losing the other work."

## Technical context and where to edit

- Repository: `https://github.com/CPayne6/sharpewiseinsights`.
- Production branch: `main`. Hosting target: Netlify.
- Current public address: `https://sharpewiseinsights.netlify.app/`. Check actual deployment settings before changing it.
- Astro generates static pages. There is no application database, custom server, or account system currently.
- Runtime requirement: Node.js `>=22.12.0`. Use the pnpm version pinned in `package.json` (`pnpm@10.26.2` at the time of writing).
- `src/pages/index.astro`: homepage composition and primary page copy.
- `src/data/site.ts`: navigation, process stages, service descriptions, and evaluation journey choices.
- `src/components/`: shared header, footer, service cards, process stages, and conversation form.
- `src/layouts/BaseLayout.astro`: shared document structure, tab title, description, and favicon link.
- `src/styles/global.css`: brand tokens, shared typography, layout, and responsive styles. Component-specific styles also live in their `.astro` files.
- `public/images/`: locally hosted images. `public/favicon.svg`: the cursive SWI browser-tab icon.
- `netlify.toml`: build command `pnpm build` and publish directory `dist`.
- `docs/forms.md`: inquiry setup and troubleshooting. `docs/image-sources.md`: source of the current hero image.
- `dist/`, `.astro/`, and `node_modules/` are generated. Do not edit or commit them.

## Local preview and verification

Run commands from the repository directory, not the owner's home folder. Install dependencies with `pnpm install` when needed, then use `pnpm dev -- --host 127.0.0.1`. Reuse a running preview instead of starting duplicates. Give the owner the actual URL reported by Astro, usually `http://127.0.0.1:4321/`.

For each change, verify the relevant behavior. Run `pnpm build` before handoff or publication; this is a production build, not a substitute for checking browser interactions. For navigation, check every target ID, mobile menu behavior, section order, and sticky-header offsets. For styling, inspect narrow and wide layouts when browser tooling is available. State clearly if only the build could be verified.

If a command fails because of workspace permissions, use the environment's approval mechanism for that operation. Do not silently change folders, delete generated files, or change system permissions to bypass the error. If dependencies or the Node version are the cause, explain the cause and fix only what the project needs.

## Publishing changes to Netlify

### Existing Git-connected project

1. Inspect `git status`, the current branch, and `git remote -v`. Run `git fetch origin` and check whether `main` has changed remotely. Integrate remote changes without overwriting the owner's work.
2. Finish the requested edits and run `pnpm build`. Review the exact files being published. Exclude secrets, local reference documents, generated builds, and unrelated changes.
3. Stage the intended file paths, then commit with a clear message. A commit records the change locally; a push sends it to GitHub.
4. When publishing is requested and the reviewed work is on `main`, run `git push origin main`. Never use `--force`. If working on a feature branch, integrate it into `main` using a reviewed merge or pull request instead of pushing to an unintended branch.
5. Netlify normally starts a production deployment from a push to its configured production branch when continuous deployment and automatic publishing are enabled. Check the Deploys dashboard or an authenticated deployment tool. Confirm the published deploy corresponds to the pushed commit.
6. Check the live page and affected assets after deployment. Report the commit, live URL, and verification result. If access to deployment status is unavailable, report "pushed; deployment not yet verified" and give the owner the dashboard check.

Do not push after every intermediate edit. Publish a completed, verified change. Treat a source push as potentially public even if the repository is private.

### First-time connection or reconnection

In Netlify, import the GitHub repository and authorize access to it. Use `main` as the production branch, the repository root as the base directory, `pnpm build` as the build command, and `dist` as the publish directory. `netlify.toml` already records the build settings. Avoid adding an SPA catch-all rewrite: Astro produces separate static routes, including `/thank-you/`.

For a manual upload, Netlify expects the contents of a successful `dist/` build, not the source folder. Prefer the existing Git connection so future changes deploy consistently.

## Inquiry form and email delivery

The `Conversation.astro` component emits a real static form named `conversation`, with `method="POST"`, `data-netlify="true"`, a hidden `form-name`, named inputs, and a `bot-field` honeypot. Its success route is `/thank-you/`. Keep these attributes and field names aligned when editing the form.

- Enable form detection in the Netlify Forms dashboard, then redeploy. This account setting cannot be enabled just by adding an HTML attribute.
- Confirm `conversation` is registered. Set submission notifications using the owner's actual company email. Never fabricate a recipient address.
- Local Astro preview validates inputs but deliberately does not send inquiries. Explain this when the owner tests locally.
- Test live submissions only when authorized, use clearly identified test data, and verify receipt in the Forms dashboard or the recipient inbox. Do not send real personal data as a diagnostic probe.
- A thank-you URL can return HTTP 200 on a normal visit while a form POST fails. Check form registration and detection before assuming the page is missing. Netlify normally removes `data-netlify` from processed deployed forms; an unchanged attribute is a clue that processing did not run.
- If submissions are stored but email is missing, check notification configuration and spam folders. Do not claim receipt based only on a redirect.

## Images, domains, and recovery

### Replacing images or the tab icon

Use the owner's supplied image or a selected stock source. Do not generate photos unless requested. Download assets into the repository instead of hotlinking. Record their source, provide useful alt text, and optimize dimensions and compression. The current hero uses 600px and 1200px WebP versions with responsive `srcset`; aim for roughly 200 KB or less per hero variant when quality permits. Check the crop at desktop and mobile widths. When changing the favicon, update its version query in `BaseLayout.astro` to avoid stale browser caches.

### Custom domains

Connecting a custom domain and HTTPS are supported on Netlify's Free plan; domain registration and renewal are separate costs. Verify current official pricing before making cost promises. Have the owner identify the domain and registrar, add the domain in Netlify, and follow the exact DNS records Netlify provides. Inspect existing records first, preserve email-related MX/TXT records, and verify HTTPS after DNS resolves. Never buy a domain or change nameservers without the owner's explicit request.

### Recovering from a failed or unwanted release

Check the Netlify build log and failing commit before changing code. If a build fails, verify which earlier deploy is still serving the public site. For an authorized source rollback, use `git revert <commit>` and verify the resulting build before pushing; avoid rewriting shared history. Netlify can also republish a prior successful deploy through its dashboard. If using that option, reconcile the source afterward so the next push does not restore the unwanted change. Do not promise recovery or a live fix until verified.

Official operational references:

- Deploys: https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/
- Forms: https://docs.netlify.com/manage/forms/setup/
- Notifications: https://docs.netlify.com/manage/forms/notifications/
- Domains: https://docs.netlify.com/manage/domains/get-started-with-domains/

## Purpose and brand

This is the public website for **Sharpe Wise Insights (SWI)**, an independent program-evaluation practice. The site should help organizations understand, articulate, evaluate, and demonstrate their impact through thoughtful, evidence-informed evaluation.

### Core proposition

> Meaningful evaluation begins with understanding.

SWI does not begin by asking what can be measured. It begins by asking what matters. The site should make the program's architecture, pathways to change, and meaningful evidence feel clear and considered.

### Voice

- Never use em dashes in website copy, metadata, labels, or interface text. Use a period, comma, colon, parentheses, or a short sentence instead.
- Rigorous without performing complexity.
- Interpretive, not merely descriptive.
- Strong in its conclusions while respecting uncertainty, complexity, and the limits of evidence.
- Human and precise; do not use inflated corporate language or unsupported claims.
- Prefer language such as: *uncover, make visible, articulate, illuminate, evidence-informed, intended impact, pathways to change, what becomes possible.*

### Design direction

- Light, soft, airy, and editorial, not dark, dense, or busy.
- Use the brand colours: `#48601C` (moss green) and `#FFFBEB` (off-white), with quiet natural supporting tones.
- Favour intentional whitespace, large serif display type, fine rules, and restrained motion.
- Use conceptual, thoughtful imagery without prominent people; never add imagery simply to fill space.
- The supplied video reference establishes the desired visual direction, not copy or company facts.

### Required information architecture

- The wordmark links to the top of the homepage. Do not add a separate Home navigation link.
- Approach: **Explore → Explain → Examine → Evidence → Evolve**
- What We Do: Evaluation Foundations; Measurement & Instrument Design; Program Evaluation; Evaluation Strategy & Capacity
- Do not add a Work navigation link or section unless requested. Never invent case studies, results, or testimonials.
- About
- Start a Conversation

## Architecture

Use Astro's static-first model. Keep the initial site deployable as a static site; introduce server-side code only for a defined requirement such as a production form handler.

```text
src/
  components/       Reusable presentational components, grouped by concern when needed
  data/             Typed, local structured content for navigation, services, and process stages
  layouts/          Shared page shells, metadata, header, and footer composition
  pages/            File-based routes; keep page modules thin and compose components
  styles/           Global tokens, reset, typography, and small shared utilities
  content/          Content collections only when editorial content or case studies are introduced
public/
  images/           Optimized, public static assets
  fonts/            Self-hosted fonts only when licensing and performance warrant it
```

### Implementation rules

- Build pages from small `.astro` components before reaching for a client framework.
- Ship zero client-side JavaScript by default. Use a `<script>` only for narrowly scoped progressive enhancement (for example, the mobile menu).
- Use semantic HTML first: `header`, `nav`, `main`, `section`, `article`, `footer`, and correctly associated form labels.
- Every meaningful image requires useful `alt` text. Decorative imagery must use an empty `alt` attribute.
- Use CSS custom properties from `src/styles/global.css`; do not scatter colour values or typography constants across components.
- Prefer responsive CSS with fluid sizing (`clamp`, grid, flexbox). Test at narrow mobile, tablet, and desktop widths.
- Keep content in `src/data/` rather than large hard-coded arrays inside page files.
- Use Astro's built-in image tooling for imported content images whenever practical. Keep only truly static/public files under `public/images`.
- Never add fake client names, testimonials, outcome statistics, case studies, email addresses, or team biographies.
- A form UI may be implemented locally, but it must not claim to submit data until a real form endpoint is configured.

## Workflow

1. Read this file and inspect the existing structure before editing.
2. Make focused changes using reusable components and data modules.
3. Run `pnpm build` after implementation. Address all build errors.
4. For visual changes, run `pnpm dev -- --host 127.0.0.1` or the project-approved background dev workflow and inspect representative responsive views when tooling permits.
5. Keep changes accessible, performant, and consistent with the SWI voice.

## Commands

```bash
pnpm dev
pnpm build
pnpm preview
```

## References

- Architecture and copy source: `C:\Users\cpayn\Downloads\Website Architecture.pdf`
- Visual reference: `C:\Users\cpayn\Downloads\Screen Recording 2026-09-10 at 6.15.52 PM.mov.mp4`
- Astro docs: https://docs.astro.build
