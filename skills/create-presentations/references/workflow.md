# End-to-end workflow

## Intake

1. Read the prompt and every supplied source or deck.
2. Extract the presentation problem, audience, use context, desired response, page range, deadline, delivery formats, and non-negotiable assets.
3. Identify missing facts or assets that materially affect the outcome.
4. Decide whether research is unnecessary, source-limited, or web-enabled.

If the user has already authorized autonomous execution, choose sensible defaults and proceed. Do not ask again for decisions already present in the request.

## Narrative

1. Write a one-sentence thesis.
2. Define the audience change from opening state to closing state.
3. Divide the deck into 3-7 chapters.
4. Assign one communication job and one visual role to each slide.
5. Remove pages that repeat a job without adding evidence, contrast, or momentum.

For long decks, plan chapters before expanding individual pages. Expand in manageable batches and preserve stable slide identifiers.

## Content freeze

For each slide, retain:

- visible copy;
- structured values and labels;
- source or material references;
- image or chart requirements;
- speaker notes;
- visual instructions that must not appear on the slide.

Treat this as the source of truth for every delivery route. Do not let an image model, OCR result, or renderer silently alter it.

## Visual direction

Offer 2-3 materially different directions only when the user has not supplied one. Describe each with a visual reference, typography mood, palette, image treatment, density, and suitable page roles. Recommend one.

When visual generation has meaningful cost or uncertainty, make one representative sample. If the user has already authorized full generation and accepted the style risk, the sample is optional rather than a mandatory gate.

## Production

Produce pages independently while preserving deck-level tokens and stable IDs. Persist completed pages before starting retries. Keep model prompts and source notes outside the final visible deck.

For image routes, store one prompt record per slide and reuse the same model family, aspect ratio, quality level, and visual system unless a page is an intentional exception.

## Render-Inspect-Revise

1. Render all pages.
2. Inspect a contact sheet for sequence, silhouette variety, color rhythm, and repetition.
3. Inspect each page at full size for copy, crop, alignment, legibility, and artifacts.
4. Check notes, sources, links, fonts, charts, tables, animations, and editability.
5. Repair locally when possible; regenerate only affected pages.
6. Render again after every repair.

## Delivery

Open the final file in the target application when available. Deliver only final assets plus requested source files. State which formats are editable, partially editable, or visually locked.
