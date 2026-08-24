---
name: create-presentations
description: Create, edit, review, repair, and deliver presentations in PPTX, Google Slides, image-based, hybrid, PDF, or HTML formats. Use for slide decks, PowerPoint, templates, speaker notes, or presentation audits; route Codex-native PPTX work through the bundled artifact runtime and costly visual work through recorded per-slide production.
---

# Create Presentations

Build the deck as a coherent communication artifact, not a sequence of decorated text boxes. Keep narrative, visible copy, visual direction, production state, and delivery format distinct so each can be revised without starting over.

## Route the task first

1. Identify whether the user wants to create, edit, restyle, repair, review, convert, or deliver a deck.
2. Inspect every supplied source and deck before proposing structure. Preserve originals unless an in-place edit is explicitly requested.
3. Route existing native Google Slides through the available Google Slides capability. Do not round-trip through PPTX unless the user asks.
4. Choose one primary production route:
   - **Native**: editable text, charts, tables, and shapes.
   - **Visual**: full-slide images for maximum fidelity.
   - **Hybrid**: editable key content over high-fidelity visual layers.
   - **Template**: inherit a supplied deck's masters, layouts, fonts, and spacing.
   - **HTML**: portable or interactive web presentation.
5. Read [production-profiles.md](references/production-profiles.md) to choose Fast Native, Quality Native, Template Native, Visual Locked, Hybrid, Interactive HTML, or Google Native. Default an ordinary editable new PPTX to Fast Native; upgrade only when the brief justifies the extra production cost.
6. Read [codex-native-pptx.md](references/codex-native-pptx.md) for local PPTX work in Codex. It owns Artifact Tool runtime setup, source-deck fidelity, rendering, and host delivery rules.
7. Read [visual-production.md](references/visual-production.md) for Visual or image-heavy Hybrid routes, especially when generation is paid, retried, or delegated.
8. Use [model-and-tool-routing.md](references/model-and-tool-routing.md) when selecting models, image backends, renderers, or file tools; use [workflow.md](references/workflow.md) for new decks and [quality-and-delivery.md](references/quality-and-delivery.md) before delivery.
9. Copy the reusable Brief, page-plan, visible-copy, source-ledger, QA, or manifest templates from `assets/` when the task benefits from durable working files.

Do not force extra confirmation steps when the user already supplied the required decisions and authorization. Pause only for a missing choice that materially changes content, cost, external data use, or output compatibility. Do not install a renderer or dependency without the user's approval when the host does not already provide it.

## Build the deck

### Establish the brief

Capture the problem, audience, use context, desired response, source material, approximate page count, visual preference, delivery target, and research boundary. Treat page count as a planning range unless the user requires an exact count.

If inputs are sparse, propose a useful brief and label assumptions. If research is requested, distinguish supplied material, researched evidence, and authorial viewpoint. Preserve source links in notes or an accompanying source ledger; do not print internal research labels on the slide unless requested.

### Plan page narratives

Give every slide one communication job. Describe each page with a flexible narrative or Markdown instruction containing only what that page needs:

- audience-visible copy and structured values;
- evidence or asset references;
- intended visual role and hierarchy;
- optional title, page number, and speaker notes.

Do not force every slide into title/body/bullets. Vary page roles across covers, transitions, comparisons, processes, data, evidence, quotes, cases, demonstrations, and closings while preserving one narrative arc.

### Define one deck-level visual system

Choose a visual direction before producing the full deck: aspect ratio, palette, typography, density, image treatment, composition freedom, title behavior, page-number behavior, and recurring motifs. Use one visual system across the deck by default; allow page-level deviations only when they serve the story.

Read [visual-systems.md](references/visual-systems.md) when selecting or adapting a style. Show visual references or a representative sample when visual ambiguity is high. After the direction is selected, prioritize the result and refinements instead of repeatedly showing the full style catalog.

### Produce with the selected route

- For **Native**, choose Fast, Quality, or Template Native from the production-profile criteria. Use the host's strongest direct native renderer and keep important text, charts, tables, shapes, and notes editable. In Codex, prefer its bundled Artifact Tool runtime.
- For **Visual**, generate each full-slide image through one selected backend, record the per-slide result, then assemble the approved images without adding visible overlays.
- For **Hybrid**, preserve an approved visual master while rebuilding key text and structured data as native objects. Mark complex visual regions as raster rather than pretending they are editable.
- For **Template**, inspect the source deck's masters and layouts, duplicate inherited structures, and edit them in place. Preserve theme parts and do not flatten the source merely for convenience.
- For **HTML**, keep assets portable; test navigation, presenter behavior, overflow, reduced motion, and offline behavior when promised; and provide a static fallback when compatibility matters. Disclose that an image-wrapped PPTX fallback is not editable.

Keep the text model and image model independent. A deck may use Claude or Codex for reasoning, another model for research or copy, and gpt-image-2 or Nano Banana for visuals.

For paid, multi-route, or audited production, persist stable slide IDs, the selected backend, prompt records, source-asset mappings, attempts, state, and QA evidence. Delegation is optional: use it only when the runtime supports it and the task authorizes it; the primary agent remains responsible for source truth, selected outputs, and final QA.

### Inspect and revise

Render every slide. Inspect individual pages at full size and use a contact sheet for deck-level rhythm. Fix content mismatch, overflow, wrapping, crop, alignment, weak hierarchy, repeated layouts, illegible charts, inconsistent fonts, broken connectors, and accidental instruction leakage. Re-render after repairs.

Prefer a human review decision or a local deterministic repair before another paid image generation. Regenerate only the affected slide unless the visual system itself changed.

### Deliver

Return the requested final formats and a concise summary. Include speaker notes, source blocks for externally sourced claims and assets, accessibility notes, editability limits, and a manifest when they matter. Keep temporary prompts, previews, caches, and intermediate assets out of the final delivery folder.

## Preserve visible-copy integrity

Separate audience-visible text from visual instructions, production notes, and model controls. For image-based slides, provide the image model with an explicit visible-copy block and tell it not to render other prompt text. Compare rendered text with approved copy when OCR or visual inspection is available.

Record differences without declaring a user-approved claim true or false. Unexpected dates, numbers, percentages, filenames, URLs, and internal instructions deserve explicit review. Never use OCR output to rewrite the approved source copy automatically.

## Keep the workflow portable

- Use the strongest available text model for each role; do not assume Codex, Claude, GPT, or Gemini is always present.
- Use built-in tools when available, otherwise use an explicitly configured provider or local renderer.
- Never embed credentials in the skill, deck, prompt ledger, source notes, or delivered files.
- Respect user-supplied templates, fonts, logos, and licensing constraints.
- Report actual evidence: a source file, render, test, or opened output is stronger than a plan or model claim.

## Validate delivery evidence

For multi-route or paid-generation work, write a compact JSON manifest and validate it with:

```bash
python3 scripts/validate_deck_manifest.py path/to/deck-manifest.json
```

Run `python3 scripts/validate_deck_manifest.py --self-test` to test the validator without external services. See [manifest-format.md](references/manifest-format.md) for the schema.

## Acknowledge borrowed methods

This workflow synthesizes ideas from image-first deck skills, native PowerPoint tooling, template-following systems, portable HTML decks, and Render-Inspect-Revise research. It does not require or silently execute any upstream runtime. Read [influences.md](references/influences.md) when modifying this skill or reusing upstream code.
