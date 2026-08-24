# Codex native PPTX

Use this route for local PPTX creation, editing, template following, rendering, or inspection when Codex exposes its bundled workspace dependency runtime. This is a host-specific implementation of the provider-neutral workflow; do not invoke another broad presentation skill as a second orchestrator.

## Runtime contract

1. Call the host's workspace-dependency loader before running presentation builders or helpers.
2. Use the returned Node executable, Node package directory, and override binary directory exactly as provided. Do not infer paths, substitute global packages, or install replacements.
3. Read the current bundled Artifact Tool quick start and API docs before authoring. Locate them from the installed primary-runtime presentation package at runtime; do not hardcode a versioned cache path.
4. Build from a writable task-specific directory. Put builders and scratch renders there, keep the source deck unchanged, and write only final deliverables to the requested output location.
5. Use JavaScript ES modules with `@oai/artifact-tool`. Do not use `python-pptx` or an obsolete Python Artifact Tool API for this route.
6. If the host exposes an artifact-operation marker, run it successfully once immediately before the first create or edit action. Do not run it for read-only inspection.

If the bundled runtime or required API docs are unavailable, report the missing component and stop this route. Do not silently switch renderers when that would change editability, template fidelity, notes, or output compatibility.

## Existing decks and templates

Treat a user-designated source deck or template as the design authority:

- inspect every relevant source slide plus its master and layout relationships;
- reuse inherited masters, layouts, placeholders, fonts, guides, and recurring elements;
- edit slides for one-off changes, layouts for repeated changes, and masters only for intentional global changes;
- preserve original `ppt/theme/theme*.xml` parts when the source theme is part of the contract;
- never claim template fidelity from source-code inspection alone—render representative descendants and compare them visually;
- preserve the source file and export a new copy unless in-place editing was explicitly requested.

A deck supplied only as content is not automatically a visual template. Distinguish source material from a user-designated design reference.

## New decks

Use the user's reference or explicit visual direction when supplied. Otherwise define a restrained deck-level visual system before choosing layouts. Keep narrative, visible copy, source evidence, and production notes separate.

Use native objects for text, charts, tables, and simple diagrams when editability matters. Use searched or generated raster assets for photographic, illustrative, or highly aesthetic visuals. Avoid recreating decorative images with programmatic shapes.

For an ordinary editable new deck, keep the Fast Native builder compact and deterministic. Add Quality Native staging only when complex vector work, template fidelity, typography, or a representative render demonstrates a meaningful benefit. A slower pipeline is not inherently a higher-quality result.

## Verification and delivery

Before delivery:

1. render every slide;
2. inspect each slide at full size and a contact sheet for sequence-level rhythm;
3. run available overflow or canvas-boundary checks;
4. fix unintended overlap, clipping, wrapping, broken connectors, unresolved placeholders, font substitution, chart/data mismatch, and inconsistent recurring elements;
5. re-render every repaired slide;
6. confirm notes, links, citations, theme, masters, and editability survive export;
7. open the final PPTX in the target application when available.

When verifying editability, recurse into grouped shapes and record editable text/vector objects versus pictures. Do not infer flattening from top-level group containers or infer editability from a renderer name.

Follow the host's current file-citation rules for source and output artifacts. Cite final deliverables, not scratch builders, previews, or QA intermediates.
