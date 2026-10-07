# Sharpe Wise Insights Project Guide

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
