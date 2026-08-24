# Changelog

## 0.3.0 — 2026-08-24

- Added a Codex-native PPTX route using the host-provided Artifact Tool runtime without invoking a second presentation orchestrator.
- Added source-deck master, layout, theme, rendering, overflow, and delivery requirements adapted from mature native presentation workflows.
- Added optional sample, fixed-backend, stable per-slide state, provenance, and delegation guidance for Visual and Hybrid production.
- Extended the delivery manifest to validate production backend, accepted sample, and per-slide provenance when those fields are present.
- Added Fast Native, Quality Native, Template Native, Visual Locked, Hybrid, Interactive HTML, and Google Native production profiles, with Fast Native as the ordinary editable-PPTX default.
- Added route-profile and editability validation so image-wrapped HTML/PPTX fallbacks cannot be reported as editable.
- Integrated method-level lessons from ppt-master, guizang-ppt-skill, and the legacy local pptx Skill while preserving license and runtime boundaries.
- Kept implicit invocation enabled so `create-presentations` remains the default local presentation Skill.

## 0.2.0 — 2026-08-10

- Replaced the primary AI FDE demonstration with a self-referential Create Presentations worked example.
- Added sixteen original full-slide image-generation style studies and a README gallery.
- Added a downloadable 16-page Visual Locked style-showcase PPTX.
- Added a 10-page editable/Hybrid overview PPTX, self-contained HTML presentation, renders, manifests, and reproducible build source.
- Expanded visual-system guidance and documented Frontend Slides, ppt-agent-skill, and Anthropic PPTX method boundaries.

## 0.1.0 — 2026-08-10

- Initial public release of the provider-neutral `create-presentations` Skill.
- Added Native, Visual, Hybrid, Template, and HTML route guidance.
- Added model/tool routing for Codex, Claude, GPT, Gemini, gpt-image-2, Nano Banana, and other configured backends.
- Added reusable Brief, page-plan, visible-copy, source-ledger, QA, and manifest assets.
- Added a validated AI FDE example with PPTX, HTML, slide renders, and contact sheet.
- Added repository and delivery-manifest validators.
