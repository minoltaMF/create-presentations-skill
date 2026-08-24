# Production profiles

Choose the delivery format and editability contract first, then choose how much production time and visual fidelity the task justifies. Use one primary profile per output; do not stack broad presentation orchestrators.

| Profile | Delivery | Relative speed | Use when |
| --- | --- | --- | --- |
| `fast-native` | Editable PPTX | Fastest | A new deck needs reliable editable text, shapes, charts, notes, and ordinary visual polish without a demanding source template. |
| `quality-native` | Editable PPTX | Slower | Brand precision, complex vector composition, unusual typography, or high-detail native authoring justifies more planning and QA. |
| `template-native` | Editable PPTX | Depends on template | A supplied deck's masters, layouts, placeholders, theme, or animations are authoritative. |
| `visual-locked` | Image-based PPTX/PDF | Medium to costly | Whole-slide visual fidelity matters more than editability. |
| `hybrid` | Partially editable PPTX | Medium to costly | Key copy and data must remain editable over high-fidelity raster visual layers. |
| `interactive-html` | Browser presentation | Medium | Presenter mode, audience-screen sync, responsive interaction, or portable web delivery is part of the request. |
| `google-native` | Editable Google Slides | Depends on API | The source or target is an existing native Google Slides deck. |

## Default decision

- When the user requests an editable new PPTX and gives no complex template, animation, or vector-art requirement, start with `fast-native`.
- Promote to `quality-native` only when the brief or a representative render demonstrates a real detail gap. Do not pay a large startup cost merely because a more elaborate pipeline exists.
- Choose `interactive-html` only when browser delivery or interaction is valuable. HTML may also export a static PDF or image-based PPTX fallback, but that fallback is visually locked.
- Choose `visual-locked` deliberately. Never describe text inside a full-slide image as editable.
- If the user supplied a native template, prefer `template-native` over either new-deck native profile.

## Fast native contract

Use the host's direct native renderer with a compact deck-level system and reusable layout helpers. Keep the builder deterministic and avoid unneeded intermediate formats or dependency installation.

Render every slide, inspect the full deck and representative pages, and verify slide count, notes, fonts, clipping, and editable-object presence. Fast does not mean skipping delivery QA.

## Quality native contract

Freeze the page plan and visual system before authoring. Use editable native text and shapes or a verified vector-to-native path, retain the source project, and separate blocking failures from portability or geometry advisories.

Inspect grouped objects recursively when checking editability; a top-level group is not evidence that the text inside it is flattened. Measure the final artifact rather than trusting the authoring method's label.

## Interactive HTML contract

Test the real browser runtime at the intended 16:9 viewport. Verify slide count, keyboard/pointer navigation, notes, presenter and audience-screen synchronization when provided, reduced-motion behavior, scroll overflow, asset loading, and offline behavior when promised.

Provide a static fallback when compatibility matters. If the fallback is an image-wrapped PPTX, label it as non-editable and keep the HTML as the native source.

## Compare profiles with evidence

When `fast-native` and `quality-native` are both plausible, build the same representative two or three pages from the same frozen copy. Compare:

- elapsed production time and dependency/setup cost;
- full-size render quality and deck-level rhythm;
- editable text, shape, chart, table, and image structure;
- blocking failures versus advisory warnings;
- target-host opening behavior and repair effort.

Do not promote a slower profile unless it produces a meaningful advantage for the actual brief.
