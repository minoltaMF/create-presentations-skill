# Prompt recipes

These recipes are starting points. Remove fields that do not affect the task.

## Create from a topic

```text
Use $create-presentations.

Topic:
Audience:
Use context:
Desired audience response:
Available materials:
Research boundary:
Page range:
Visual direction:
Production route:
Text/reasoning model:
Image model:
Final formats:

First produce the Brief, page narratives, and one representative sample.
```

## Create from mixed source files

```text
Use $create-presentations. Inspect every attached source before planning.
Separate supplied facts, researched evidence, and authorial viewpoint.
Keep source links in speaker notes or a source ledger.
Recommend the page count and production route after inspecting the materials.
```

## Image-first Visual deck

```text
Use $create-presentations with the Visual route.
Freeze approved visible copy before generating images.
Keep all visual instructions and model controls out of the rendered slide.
Generate one representative page first, then regenerate only failed pages.
Hard cost limit: USD ___. No automatic paid retry.
```

## Compare visual directions

```text
Use $create-presentations and inspect the bundled style gallery.
Keep the subject, visible copy, aspect ratio, and page role identical.
Propose no more than three materially different directions for this audience.
Each direction must differ in composition, typography, image treatment, and tone—not only palette.
Generate one representative slide per direction, record the prompt and backend,
then recommend one Design DNA for the full deck.
```

The public repository includes sixteen original comparisons under `assets/style-gallery/` and a downloadable Visual Locked style-showcase PPTX.

## Editable Hybrid deck

```text
Use $create-presentations with the Hybrid route.
Preserve a high-fidelity visual master, but rebuild titles, key body copy,
numbers, charts, and table labels as native editable objects.
Mark complex visual regions as rasterized instead of pretending they are editable.
```

## Follow an existing template

```text
Use $create-presentations and treat the attached PPTX as the visual source.
Inspect its masters, layouts, fonts, guides, and representative slides.
Duplicate and fill inherited layouts; do not flatten or approximately redraw them.
Preserve brand assets and disclose any unsupported feature.
```

## Audit or repair an existing deck

```text
Use $create-presentations to audit this deck before editing.
Prioritize narrative gaps, content mismatch, overflow, weak hierarchy,
repeated silhouettes, CJK font problems, broken crops, and source gaps.
Preserve all unaffected content and deliver a non-destructive revised copy.
```
