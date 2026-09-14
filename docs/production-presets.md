# Production presets

Status: implemented in the synchronized web editor for physical testing.

Production presets apply a complete first edit to an already selected Camera A/B pair. They combine a normalized shot plan, a default audio source, and editable on-screen graphics. They never alter the original recordings and they do not upload media.

## How to use a preset

1. Open the multicamera editor directly or choose a preset in the preset library.
2. Add the original recordings and assign Camera A and Camera B.
3. Analyze the audio or restore a saved offset.
4. Choose a production preset and select **Apply preset**.
5. Edit the channel/show name, main title, and the Camera A/B names.
6. Review the loaded cuts. `S` on the timeline means a split A+B composition.
7. Choose the audio source and export the finished WebM.

Applying a preset replaces the current visual cut plan. The previous plan remains available through **Undo cut**. Choosing **Free multicamera edit** removes preset graphics but leaves the current cuts intact.

## Pre-recording human-form guide

The news-studio prototype now represents the planned composition with the same reusable faceless human form: first one full-body studio figure, then two waist-up figures in split screen. This is a recording guide, separate from the post-recording A/B/S edit plan described below.

The current implementation, explicit exclusions, next step, and later animation ideas are tracked in [Human-form guides](human-figure-guides.md).

### Prebuilt HTML/SVG scene loop

`core/prebuilt-guides.js` registers scene guides that were created beforehand in Norberta Chatelli. A catalog card previews the original HTML/SVG, **Use preset** opens rehearsal with its identifier, and the rehearsal screen loads the same artifact over the camera. Starting rehearsal or recording resets the scene clock; finishing pauses it.

The first connected case is `friends-front-back`, explicitly labeled **Friends · S04E01 · “For the record…” → “front and back”**. Its source remains in `norbertachatelli`, while Uizador ships a release copy under `web/prebuilt-guides/`. It remains an HTML/SVG guide; no runtime scene generation, external scene hosting, or video conversion is required.

## Breaking News

Default plan:

| Timeline position | Composition | Intended shot |
|---:|---|---|
| 0% | A | Anchor close-up |
| 18% | S | Anchor/reporter split screen |
| 50% | B | Reporter close-up |
| 72% | S | Split-screen exchange |
| 90% | A | Anchor close |

Included graphics:

- LIVE or BREAKING badge;
- editable channel name;
- editable headline;
- separate anchor and reporter lower-third labels.

## Video Podcast

Default plan:

| Timeline position | Composition | Intended shot |
|---:|---|---|
| 0% | S | Host/guest two-shot |
| 20% | A | Host close-up |
| 42% | B | Guest close-up |
| 64% | S | Two-shot reaction |
| 82% | A | Host close |

Included graphics:

- editable show name;
- editable episode title;
- separate host and guest labels;
- a podcast badge and graphic theme.

## Project data

Project checkpoint `uizador.multicam.project.v0.9` stores the production block both for the active edit and inside every ordered pair profile:

```json
{
  "production": {
    "preset_id": "breaking-news",
    "graphics": {
      "brand": "UIZADOR NEWS",
      "headline": "BREAKING NEWS · DEVELOPING STORY",
      "name_a": "ANCHOR · STUDIO",
      "name_b": "REPORTER · LIVE",
      "urgent": true
    }
  }
}
```

Visual decision `S` means that the renderer places Camera A and Camera B side by side. The live phone preview remains lightweight at three sampled visual updates per second; the final local render uses the original video streams at full frame cadence.

## Current limits

- Graphics are intentionally simple and static.
- One global audio mode is selected for the edit: A, B, Mix, or None.
- Chroma key, animated transitions, background replacement, and music licensing are separate later phases.
- The first export format remains WebM.

## Physical acceptance checks

- Apply each preset to a short synchronized pair.
- Confirm every A, B, and S segment at the expected relative position.
- Change all four text fields and, for news, toggle the urgent badge.
- Export landscape and portrait samples and verify that no label is clipped.
- Save the `.uizador` project, reopen it, relink media, and verify the preset and graphics.
- Confirm that preview playback still works after export.

