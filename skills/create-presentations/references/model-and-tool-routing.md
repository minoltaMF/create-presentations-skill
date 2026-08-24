# Model and tool routing

Choose by capability, not brand loyalty. Keep content reasoning, research, image generation, and file rendering as separate roles.

## Text and reasoning models

- **Codex**: strong when the task combines deck planning with code, data processing, file inspection, or renderer automation.
- **Claude**: strong for long-source synthesis, narrative development, tone, and iterative editorial collaboration.
- **GPT/OpenAI text models**: strong for structured outputs, tool orchestration, research integrations, and mixed content workflows.
- **Gemini text models**: useful for long multimodal context, Google-native workflows, and mixed document/image inputs.
- **Other or local models**: use when privacy, cost, latency, or deployment constraints dominate; validate structured output carefully.

Use the currently available model if it meets the task. Do not require a provider switch for stylistic preference alone.

## Image models

- **gpt-image-2 / current OpenAI image model**: use for high-fidelity full-slide composition, text-aware visual pages, editing, and controlled variants when available.
- **Nano Banana / Gemini Image**: use for reference-driven generation, multi-image composition, visual consistency, and natural-language edits when available.
- **Ideogram or another text-focused image model**: consider for poster-like pages with short, prominent typography.
- **Flux, local, or other configured models**: use when cost, local control, or a specific visual style matters.

Always confirm the actual callable model and supported output size at runtime. Product nicknames and model identifiers change.

For generated text-heavy slides:

1. Minimize visible copy.
2. Separate visible copy from instructions.
3. Prefer one whole-slide composition over separately generated decorative pieces when visual fidelity is the priority.
4. Inspect rendered text; use native or hybrid output if exact editability matters more than image fidelity.

## Renderers and formats

- For an ordinary editable new PPTX, prefer the direct `fast-native` profile. Use `quality-native` only when complex native detail, brand precision, or representative evidence justifies its higher startup cost.
- In Codex, use the bundled Artifact Tool runtime for local PPTX work when it is available; read `codex-native-pptx.md` before authoring.
- In other hosts, use the strongest available native presentation API, PptxGenJS, or equivalent for editable PPTX.
- Use a full-slide image assembler for Visual decks.
- Use native text plus raster visual layers for Hybrid decks.
- Use a supplied template's real masters/layouts for template-following work.
- Use a portable HTML renderer for interactive or browser-first delivery.
- Use Google Slides tooling directly when editing an existing native Google Slides deck.

Do not convert through an intermediate format when it would destroy masters, editability, notes, animations, or layout fidelity.

For Visual or image-heavy Hybrid production, read `visual-production.md` and record the selected backend, sample decision, per-slide state, and QA evidence when cost or auditability matters.

Read `production-profiles.md` before choosing a slower native pipeline or representing an HTML export as PPTX. Route labels describe delivery contracts, not dependencies on a particular upstream Skill.

## Cost and retries

Estimate paid image calls as `slides x attempts x per-image cost`. Respect any user hard limit. Do not repeat a paid call after quota exhaustion, authentication failure, or a non-retryable provider error. When a page needs another attempt, explain the reason and regenerate only that page.
