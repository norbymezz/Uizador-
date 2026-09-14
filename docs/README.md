# Uizador documentation

This index separates the current product contract, operational testing material, future capabilities, and store preparation.

## Start here

| Document | Purpose | Status |
|---|---|---|
| [Multicamera concept](multicamera-concept.md) | Director/camera flow, audible timing marks, repeated takes, and local recording. | Core |
| [Master test plan](test-plan.md) | Test phases, evidence, acceptance criteria, and defect reporting. | Core |
| [Two-phone test checklist](two-phone-test-checklist.md) | Exact procedure for the first physical session. | Ready |
| [Portable `.uizador` format](uizador-project-format.md) | Non-destructive project contract. | Implemented v1 |
| [In-app help](../web/help/index.html) | Short user-facing explanations. | Evolving |

## Production design

- [Shot and movement library](shot-and-movement-library.md)
- [Breaking News and Video Podcast presets](production-presets.md)
- [Background music fragment: selection, timing, export, and tests](background-music.md)
- [Human-form guides: decisions, status, and next steps](human-figure-guides.md)
- [Remote session concept](remote-session-concept.md)
- [Localization](localization.md)

## Android and Play Store preparation

- [Play Store readiness](play-store-readiness.md)
- [Play Console submission pack](play-console-submission-pack.md)
- [Store listing draft](store-listing-draft.md)
- [Play Store creative brief](play-store-creative-brief.md)
- [Data Safety working draft](data-safety-working-draft.md)
- [Privacy policy inputs](privacy-policy-inputs.md)

## Source of truth

- Test IDs and cases: `core/test-catalog.js`
- Test execution and exported results: `web/test-center/index.html`
- Portable project validation: `schemas/uizador-project-v1.schema.json`
- Public prototype: [Uizador on GitHub Pages](https://norbymezz.github.io/Uizador-/web/app-home/)
- The first validation cycle does not require chroma key, virtual backgrounds, remote sessions, or store publication.
- Store copy must never promise a capability that the published build does not perform.

## Current known gaps

- Production graphics are static. Camera audio uses one global A/B/Mix/None mode; one independent music fragment can be mixed across the export range.
- Beat detection, beat snapping, fades, ducking, chroma key, animated transitions, and background replacement are later phases.
- Physical Android tests must verify split-screen framing and safe text areas in every export orientation.

