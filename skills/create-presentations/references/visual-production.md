# Visual production

Use this reference for full-slide Visual decks and image-heavy Hybrid decks, especially when image calls are paid, retried, audited, or divided among workers.

## Freeze the production contract

Before generating final pages, retain one source of truth for each stable slide ID:

- approved audience-visible copy and structured values;
- slide role and composition intent;
- source claims and required assets;
- deck-level visual system;
- selected image backend and supported input-image behavior;
- speaker-note intent;
- output path and current state.

Do not let prompts, OCR, a renderer, or a worker silently rewrite approved copy or claims.

## Sample only when it reduces risk

Generate one representative sample when visual direction is ambiguous, the hardest page is technically uncertain, or generation cost is meaningful. Choose a page that exercises the real typography, imagery, and density risk—not automatically the cover.

The sample is optional when the user already approved the direction, backend, compatibility, and budget. Record an accepted sample's slide ID and generation method so later pages can use it as a style reference without copying its composition.

## Backend and per-slide state

Choose the backend by actual capability and keep it fixed for the run unless the user approves a change. Record why a fallback was used; do not switch providers merely because file handling is easier.

Use these states:

- `pending`: planned but not generated;
- `generated`: a candidate exists but has not passed QA;
- `needs_review`: human or source verification is required;
- `passed`: QA passed;
- `accepted`: explicitly approved sample or exception;
- `failed`: generation or validation failed and is not being represented as complete.

For each generated slide, record the backend, prompt record, required source assets, attempt count, selected output, and QA evidence. Persist successful pages before retries and regenerate only the affected page unless the visual system changed.

## Optional delegation

Parallel slide workers are useful only when the runtime supports them and delegation is authorized. The primary agent owns the deck context, stable IDs, selected backend, source mappings, final copy, accepted outputs, and final QA. Give each worker a self-contained single-slide job; do not assume it can see the full source or conversation.

If delegation is unavailable, continue sequentially unless the user required parallel production. Do not turn a missing worker into an artificial blocker.

## QA and assembly

Inspect the original generated image for copy accuracy, source-asset inclusion, style consistency, crop, and artifacts before assembly. Prefer backend editing or a targeted retry for a localized defect.

Assemble only `passed` or `accepted` pages. Keep full-slide Visual pages visually locked; do not imply that their text or charts are editable. For Hybrid delivery, rebuild only the agreed key text and structured elements as native objects.

Use the delivery manifest for costly, multi-route, or audited work. Its production block and per-slide provenance should agree with the actual selected backend and accepted sample.
