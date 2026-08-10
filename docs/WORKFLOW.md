# End-to-end workflow

This workflow scales from a five-slide internal briefing to a multi-route, image-generated deck.

## 1. Intake

Capture only decisions that materially affect the result:

- problem and desired audience response;
- supplied materials and research boundary;
- approximate page range;
- preferred visual direction or reference deck;
- target formats and editability needs;
- model/provider availability, external-data consent, and cost limit.

When these decisions are already present, proceed instead of asking again.

## 2. Brief

Write a one-sentence communication job:

> By the end, **[audience]** should **[outcome]** because **[central takeaway]**.

Record assumptions and missing evidence. Do not put internal production language onto audience-facing slides.

## 3. Narrative and page plan

1. Choose an arc suited to the job: question–analysis–answer, context–stakes–evidence–action, current–change–future, chronology, process, or learning progression.
2. Divide the deck into a small number of chapters.
3. Give each page one communication job and one visual role.
4. Keep a stable slide ID so the page can be regenerated or repaired independently.
5. Remove pages that repeat the same job without adding evidence, contrast, or momentum.

Use flexible Markdown instructions. A page may be a cover, statement, comparison, process, chart, case, quote, screenshot, visual full bleed, or closing action—not always a title and bullet list.

## 4. Content freeze

For each page, separate:

- approved visible copy;
- structured values and labels;
- source/material references;
- asset requirements;
- speaker notes;
- visual instructions that must never appear on the slide.

This is the source of truth for every delivery route. Image models, OCR, and renderers must not silently rewrite it.

## 5. Visual system

Define one deck-level system:

- aspect ratio and safe area;
- palette and contrast;
- typography and language fallbacks;
- density and whitespace rhythm;
- image, illustration, chart, and diagram treatment;
- title and page-number behavior;
- recurring grid, motif, and alignment logic;
- composition freedom.

Offer two or three materially different directions only when the user has not supplied one. Once selected, stop showing the full catalog and focus on the result.

## 6. Representative sample

Generate one representative page when visual ambiguity or paid-generation risk is meaningful. The sample should exercise the hardest combination of typography, imagery, and structure—not merely the easiest cover page.

The sample is optional when the user already approved the direction, compatibility, and budget.

## 7. Production route

- **Native:** editable text, charts, tables, shapes, and source-deck layouts.
- **Visual:** whole-slide images assembled into PPTX.
- **Hybrid:** approved visual layer plus editable key copy and structured data.
- **Template:** inherited masters/layouts filled rather than approximately recreated.
- **HTML:** portable presentation with an explicit offline/compatibility contract.

Persist each completed page before retrying another. Regenerate only the affected page unless the deck-level visual system changed.

## 8. Render–Inspect–Revise

1. Render every page.
2. Inspect a contact sheet for rhythm, repetition, silhouette variety, and color progression.
3. Inspect each page at full size for copy, crop, wrapping, alignment, legibility, and artifacts.
4. Check speaker notes, sources, links, fonts, charts, tables, animations, and editability.
5. Prefer deterministic repair or human acceptance before another paid generation.
6. Render again after every repair.

## 9. Delivery

Open the final output in the target application when available. Deliver final files, requested editable sources, and a concise description of routes, page count, model/backend, limitations, and evidence.

Use the bundled manifest for costly, multi-route, or audited delivery work.
