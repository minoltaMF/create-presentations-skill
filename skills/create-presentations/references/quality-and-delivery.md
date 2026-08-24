# Quality and delivery

## Content

- Every slide has one clear communication job.
- Audience-visible copy matches the approved plan.
- Internal prompts, layout instructions, model controls, and production notes are not visible.
- Numbers, dates, percentages, filenames, URLs, names, and table values are checked.
- Sources and externally researched claims are traceable in notes or an accompanying ledger.
- Every externally sourced non-trivial claim and asset has a source block in speaker notes when the output format supports notes.
- Speaker notes support the presenter without duplicating the slide verbatim.

## Visual

- The deck reads as one visual system.
- Adjacent pages vary in silhouette and rhythm.
- Hierarchy remains clear at presentation distance.
- Images are sharp, intentionally cropped, and not reused without reason.
- No accidental UI-like cards, fake buttons, excessive pills, or decorative clutter.
- Charts and diagrams are simpler than the explanation they replace.

## File

- Page count and aspect ratio are correct.
- No unintended overlap, clipping, wrapping, or off-canvas content remains.
- Fonts and CJK fallbacks render correctly.
- Notes, links, citations, alt text, charts, tables, and animations survive the chosen format.
- Source-deck masters, layouts, placeholders, and theme parts survive when template fidelity is part of the request.
- Editable, rasterized, and unsupported regions are disclosed.
- Native editability checks inspect grouped objects recursively and distinguish editable text/vector objects from full-slide pictures.
- PPTX opens in the target PowerPoint/Keynote environment when available.
- PDF pagination and fonts are inspected.
- HTML works in its target browser and offline when promised.
- Interactive HTML verifies navigation, notes/presenter behavior, audience-screen sync when provided, reduced motion, and zero unintended scroll overflow.

Classify QA findings as blocking failures or advisories. Font portability and static-geometry uncertainty can be advisory after successful target-host rendering; clipping, missing glyphs, content drift, broken navigation, false editability claims, and failed opening remain blockers.

## Image-based copy review

When OCR or another text inspection method is available:

1. normalize whitespace, punctuation, and full/half-width forms;
2. compare required visible copy;
3. flag unexpected structured tokens and internal instruction leakage;
4. inspect low-confidence regions manually;
5. accept a harmless difference when the user prefers it over another paid generation.

Do not use OCR to infer truth or rewrite the source copy.

## Final handoff

Provide:

- final deck files;
- requested editable source;
- speaker notes and source ledger when applicable;
- a short statement of route, model/backend, page count, and limitations;
- a manifest for multi-route, costly, or audited work.
- backend, accepted-sample, and per-slide provenance when visual production was paid, retried, or delegated.

Remove scratch renders, temporary prompts, caches, failed variants, and duplicate exports unless the user requests them.
