---
name: create-presentations
description: Create, edit, review, repair, and deliver professional presentations across PowerPoint/PPTX, image-based decks, editable native or hybrid slides, PDF, HTML, and Google Slides workflows. Use when working from a topic, prompt, outline, article, report, research, template, existing deck, or supplied assets; when choosing between Codex, Claude, GPT, Gemini or other text models; or when using image models such as gpt-image-2, Nano Banana/Gemini Image, or another available image backend.
---

# Create Presentations

Build the deck as a coherent communication artifact, not a sequence of decorated text boxes. Keep narrative, visible copy, visual direction, generation method, and delivery format distinct so each can be revised without starting over.

## Route the task first

1. Identify whether the user wants to create, edit, restyle, repair, review, convert, or deliver a deck.
2. Inspect all supplied files before proposing structure. Preserve an existing deck unless an in-place edit is explicitly requested.
3. Choose one primary production route:
   - **Native**: editable text, charts, tables, and shapes.
   - **Visual**: full-slide images for maximum fidelity.
   - **Hybrid**: editable key content over high-fidelity visual layers.
   - **Template**: inherit a supplied deck's masters, layouts, fonts, and spacing.
   - **HTML**: portable or interactive web presentation.
4. Use [model-and-tool-routing.md](references/model-and-tool-routing.md) when selecting models, image backends, renderers, or file tools.
5. Use [workflow.md](references/workflow.md) for new decks and [quality-and-delivery.md](references/quality-and-delivery.md) before delivery.
6. Copy the reusable Brief, page-plan, visible-copy, source-ledger, QA, or manifest templates from `assets/` when the task benefits from durable working files.

Do not force extra confirmation steps when the user already supplied the required decisions and authorization. Pause only for a missing choice that materially changes content, cost, external data use, or output compatibility.

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

- For **Native**, use the best available presentation renderer and keep important text, charts, tables, and shapes editable.
- For **Visual**, generate each full-slide image through the selected image backend, then assemble the images into PPTX without adding visible overlays.
- For **Hybrid**, preserve an approved visual master while rebuilding key text and structured data as native objects. Mark complex visual regions as raster rather than pretending they are editable.
- For **Template**, duplicate and edit inherited layouts instead of flattening or recreating them approximately.
- For **HTML**, keep assets portable, test offline behavior when requested, and provide a static fallback when compatibility matters.

Keep the text model and image model independent. A deck may use Claude or Codex for reasoning, another model for research or copy, and gpt-image-2 or Nano Banana for visuals.

### Inspect and revise

Render every slide. Inspect individual pages at full size and use a contact sheet for deck-level rhythm. Fix content mismatch, overflow, wrapping, crop, alignment, weak hierarchy, repeated layouts, illegible charts, inconsistent fonts, and accidental instruction leakage.

Prefer a human review decision or a local deterministic repair before another paid image generation. Regenerate only the affected slide unless the visual system itself changed.

### Deliver

Return the requested final formats and a concise summary. Include speaker notes, sources, accessibility notes, editability limits, and a manifest when they matter. Keep temporary prompts, previews, caches, and intermediate assets out of the final delivery folder.

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
