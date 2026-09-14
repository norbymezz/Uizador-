# Background music fragment

Status: first end-to-end implementation completed on 2026-09-14.

## Purpose

Add a selected interval from a user-owned or authorized audio file as the background of the current edited scene. Music is a third, independent source: it does not replace or alter the Camera A/B signal used for synchronization.

## Implemented flow

1. Choose a local audio file in the synchronized editor.
2. Decode a lightweight waveform and show the source duration.
3. Scrub with the native player or tap the waveform.
4. Set the fragment start and end from the player or the two boundary sliders.
5. Audition only that fragment.
6. Choose music volume independently from Camera A/B audio.
7. Repeat the fragment by default so it fills the complete export range.
8. Preview it against the common edit clock.
9. Render it into the final WebM together with Audio A, Audio B, Mix A+B, or no camera audio.
10. Save the edit decisions and file identity in the `.uizador` checkpoint.

## Timing contract

- Camera A/B audio remains the common clock.
- `camera_b_offset_ms` is never calculated from or modified by music.
- Music time zero for the scene is `export_range.start_sec`.
- Source time begins at `background_music.start_sec`.
- If `fill_scene` is true, source time wraps at `background_music.end_sec`.
- If it is false, the music becomes silent after one pass while video and camera audio continue.

## First test source

The supplied file was inspected without adding it to the repository:

- format: MP3;
- duration: 151.562 seconds;
- sample rate: 44.1 kHz;
- channels: stereo;
- bitrate: approximately 128 kb/s;
- size: 2,425,416 bytes.

## Project persistence

The lightweight project stores the music filename, size, MIME type, last-modified time, duration, selected boundaries, volume, repeat mode, and `export_start` anchor. It does not embed the audio bytes. After reopening a project, the user must reselect the original music file before export.

## Explicitly later

- beat and onset detection;
- snapping visual cuts or guide events to beats;
- fades and crossfades;
- automatic dialogue ducking;
- multiple simultaneous music clips;
- embedding music in a portable ZIP project;
- licensing or rights management.
