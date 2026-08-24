# Deck manifest format

Use `create-presentations-manifest-v1` for audited, multi-route, or paid-generation work.

```json
{
  "schemaVersion": "create-presentations-manifest-v1",
  "title": "Example deck",
  "slideCount": 12,
  "routes": ["visual_pptx", "hybrid_pptx"],
  "routeProfiles": {
    "visual_pptx": "visual-locked",
    "hybrid_pptx": "hybrid"
  },
  "models": {
    "planning": "claude-or-codex",
    "image": "gpt-image-2"
  },
  "cost": {
    "currency": "USD",
    "actual": 2.16,
    "hardLimit": 10
  },
  "production": {
    "selectedBackend": "built-in-image-tool",
    "sampleStatus": "accepted",
    "sampleSlideId": "slide-03",
    "delegation": "not-used"
  },
  "slides": [
    {
      "id": "slide-01",
      "status": "passed",
      "attempts": 1,
      "output": "slides/slide-01.png",
      "backend": "built-in-image-tool",
      "promptRecord": "prompts/slide-01.json",
      "qaEvidence": "renders/slide-01.png"
    }
  ],
  "outputs": [
    {
      "route": "visual_pptx",
      "path": "deck-visual.pptx",
      "sha256": "...",
      "byteSize": 123456,
      "editability": "visual-locked"
    }
  ]
}
```

Allowed routes:

- `native_pptx`
- `visual_pptx`
- `hybrid_pptx`
- `html`
- `pdf`
- `google_slides`

Optional route profiles make the speed/editability decision explicit:

- `fast-native`
- `quality-native`
- `template-native`
- `visual-locked`
- `hybrid`
- `interactive-html`
- `google-native`

When `routeProfiles` is present, it must map every requested route to a compatible profile. Output `editability`, when present, must be `editable`, `partially-editable`, `visual-locked`, or `source-editable`. A Visual PPTX or PDF must not claim native editability.

Allowed slide statuses:

- `pending`
- `generated`
- `passed`
- `needs_review`
- `accepted`
- `failed`

Optional production fields are recommended for Visual or image-heavy Hybrid work:

- `selectedBackend`: the one approved backend for the production run;
- `sampleStatus`: `not-used`, `pending`, `accepted`, or `rejected`;
- `sampleSlideId`: required when the sample is accepted and must match a slide ID;
- `delegation`: `not-used`, `sequential`, `parallel`, or `mixed`.

When `production` is present, every `generated`, `passed`, or `accepted` slide must record a `backend` matching `selectedBackend`. `promptRecord` and `qaEvidence` are optional paths, but must be non-empty strings when present.

The validator checks structure, page coverage, route outputs, hashes, cost limits, accepted-sample identity, and backend consistency. It does not call a model, inspect credentials, upload files, or judge factual truth.
