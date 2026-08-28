# Uizador

**Uizador turns two or more phones into a coordinated multicamera recording setup.** A director phone creates a session, the other cameras join through a QR code, and every device records locally at full quality.

> Current status: working web prototype under active physical testing. It is not a production release yet.

## Try it now

- [Open the multicamera session](https://norbymezz.github.io/Uizador-/web/multicamera-session/)
- [Run the device preflight check](https://norbymezz.github.io/Uizador-/web/preflight/)
- [Synchronize and select two recordings](https://norbymezz.github.io/Uizador-/web/sync-preview/)
- [Open the test center](https://norbymezz.github.io/Uizador-/web/test-center/)
- [Browse scene presets](https://norbymezz.github.io/Uizador-/web/preset-library/)

## Current workflow

1. The director creates a session.
2. Other phones scan the QR code or enter the session code.
3. Every phone grants camera and microphone permission.
4. The director configures duration, number of takes, pause time, and camera movement.
5. All devices record locally.
6. One audible start signature and an end clap are captured by every nearby phone.
7. The original files are loaded into the synchronization view.
8. Audio envelopes estimate the offset; the user can refine it manually and choose camera A or B.

## Prototype screenshots

<p align="center">
  <img src="docs/images/audio-sync-analysis.jpg" width="360" alt="Audio envelope analysis and automatic offset estimation">
  <img src="docs/images/multicamera-cut-selection.jpg" width="360" alt="Synchronized camera A and B cut selection">
</p>

The screenshots show real files recorded during the first two-phone test: audio-envelope comparison, estimated offset, manual correction, synchronized preview, and reversible A/B cut decisions.

## What already works

- QR/code session joining with PeerJS
- Director and remote-camera readiness
- Local camera and microphone capture
- Configurable scene duration and repeated takes
- Three-pulse start signature and end clap
- Local take retention without download prompts between repetitions
- Audio-envelope offset estimation and manual adjustment on a shared time grid
- Synchronized A/B playback, reversible cuts, precise seeking, and independent track mute
- Two-step mobile workflow: project/media preparation followed by focused montage editing
- Multi-file media library with selectable active A/B pairs
- Independent synchronization and montage profiles for every ordered A/B pair
- Portable non-destructive `.uizador` projects with media identity, hashes, offsets, cuts, mute state, and playback state
- Device diagnostics and a versioned test catalog

## Immediate testing priorities

- Validate synchronization across different Android phones and browsers
- Measure offset and drift over longer recordings
- Preserve complete evidence for each test run
- Improve file transfer from remote cameras to the director
- Validate multi-file project reopen and automatic media relinking
- Confirm that camera switching and mute state survive save/reopen
- Improve remote-camera transfer to the director and final batch-download verification

## Test evidence

- [2026-08-28: four-file media library and active-pair validation](docs/test-results/2026-08-28-media-library.md)

## Planned capabilities

Scene templates, teleprompter guidance, remote sessions, chroma key, virtual backgrounds, subtitles, titles, transitions, sound effects, news/interview layouts, and Android/Play Store packaging are planned in phases. They must not delay validation of recording, recovery, and synchronization.

## Documentation

- [Documentation index](docs/README.md)
- [Multicamera concept](docs/multicamera-concept.md)
- [Master test plan](docs/test-plan.md)
- [Two-phone test checklist](docs/two-phone-test-checklist.md)
- [Shot and movement library](docs/shot-and-movement-library.md)
- [Portable project format](docs/uizador-project-format.md)
- [Remote session concept](docs/remote-session-concept.md)
- [Play Store readiness](docs/play-store-readiness.md)

## Privacy and media ownership

Recordings remain on each phone until the user explicitly shares or exports them. Uizador must not upload original media automatically. Project files store editing decisions and media references without modifying the originals.

## Legal direction

Uizador provides original camera, staging, and editing templates. It is not intended to redistribute copyrighted film clips, dialogue, music, or performances. Users are responsible for the media they record, import, and publish.

## Development

The repository also preserves Uizador's earlier audiovisual-reinterpretation experiments. The multicamera prototype is the current product-validation track.

Contributions, reproducible bug reports, device information, and test evidence are welcome.
