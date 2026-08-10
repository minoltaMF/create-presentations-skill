# Influences, licenses, and reuse boundary

`create-presentations` is an original, provider-neutral workflow. It combines reviewed methods without bundling or silently executing upstream runtimes.

## Referenced projects and methods

| Source | License / status | Ideas retained | Not bundled |
| --- | --- | --- | --- |
| [codex-ppt-skill](https://github.com/ningzimu/codex-ppt-skill) | MIT | Outline, style, representative sample, per-slide image jobs, full-slide assembly, notes, visual QA | Provider code, credentials, fixed orchestration, arbitrary path behavior |
| [Bento](https://github.com/nyblnet/bento) | MIT | Portable single-file HTML, presenter interaction, agent-editable document thinking | Editor, CRDT, relay, updater, permission runtime |
| [Agent Skills specification](https://github.com/agentskills/agentskills) | Public specification | `SKILL.md`, progressive disclosure, scripts/references/assets layout | No runtime dependency |
| [skills CLI](https://github.com/vercel-labs/skills) | Open source | Cross-agent discovery and installation | No bundled CLI |
| [Anthropic Skills](https://github.com/anthropics/skills) | Mixed per-directory terms | Complex Skill packaging and document workflow references | No source-available PPT implementation copied |
| Native PPTX / PptxGenJS / Artifact workflows | Tool-specific licenses | Editable objects, master/layout preservation, rendering and overlap checks | No renderer bundled by this repository |
| Baoyu-style slide workflows | Method reference | Content planning, visual storytelling, contact-sheet review | No upstream runtime copied |
| DeepPresenter / PPTAgent research | Research reference | Render–Inspect–Revise loop | No sidecar, model, or service bundled |

## Original synthesis

The distinctive workflow is:

`flexible page narratives → one deck-level visual system → independent text/image model routing → Native/Visual/Hybrid/Template/HTML route choice → visible-copy integrity → human-review-first revision → evidence-backed delivery`

Method inspiration does not grant permission to copy source code, fonts, templates, or media. Check the exact upstream license and retain attribution before reusing any upstream file.

The AI-generated README visual in this repository was produced specifically for this project and contains no third-party logo or text.
