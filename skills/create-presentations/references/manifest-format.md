# Deck manifest format

Use `create-presentations-manifest-v1` for audited, multi-route, or paid-generation work.

```json
{
  "schemaVersion": "create-presentations-manifest-v1",
  "title": "Example deck",
  "slideCount": 12,
  "routes": ["visual_pptx", "hybrid_pptx"],
  "models": {
    "planning": "claude-or-codex",
    "image": "gpt-image-2"
  },
  "cost": {
    "currency": "USD",
    "actual": 2.16,
    "hardLimit": 10
  },
  "slides": [
    {
      "id": "slide-01",
      "status": "passed",
      "attempts": 1,
      "output": "slides/slide-01.png"
    }
  ],
  "outputs": [
    {
      "route": "visual_pptx",
      "path": "deck-visual.pptx",
      "sha256": "...",
      "byteSize": 123456
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

Allowed slide statuses:

- `pending`
- `generated`
- `passed`
- `needs_review`
- `accepted`
- `failed`

The validator checks structure, page coverage, route outputs, hashes, and the cost hard limit. It does not call a model, inspect credentials, upload files, or judge factual truth.
