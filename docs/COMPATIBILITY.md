# Compatibility

The Skill uses the shared `SKILL.md` convention and avoids agent-specific tool names in its core workflow.

## Agents

- Codex
- Claude Code
- Cursor and other Agent Skills-compatible clients
- OpenClaw / Hermes Agent when their Skill loader supports the same folder structure

Installation paths and model/tool availability differ by host. The Skill describes capability roles and lets the host select its actual tools.

## Models and providers

The Skill does not include a model client. It can route work to any capability available to the host, including:

- Codex, Claude, GPT, Gemini, or local text/reasoning models;
- gpt-image-2, Nano Banana / Gemini Image, Ideogram, Flux, or another image backend;
- native PowerPoint/Google Slides tooling, Artifact Tool, PptxGenJS, or portable HTML renderers.

Provider nicknames and model IDs change. Confirm the current callable ID, output dimensions, pricing, and retry behavior at runtime.

## Formats

- PPTX: Native, Visual, Hybrid, or Template route
- PDF: final handoff or review format
- HTML: portable or interactive presentation
- Google Slides: use native tooling for existing Google Slides decks; import a verified PPTX only for net-new delivery when appropriate

## Security and cost

- API keys stay in the host environment.
- No automatic runtime download is required.
- External research and paid generation should follow the user's consent and cost limit.
- Authentication, quota exhaustion, invalid requests, and other non-retryable errors must not trigger automatic paid retry.
