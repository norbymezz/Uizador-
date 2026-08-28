# Master test plan

This document defines how Uizador is tested without confusing a promising demonstration with a reliable feature. The executable catalog lives in `core/test-catalog.js`; results are tracked in `web/test-center/index.html`.

## First validation target

The first physical session validates only the essential mechanism:

1. two phones join the same session;
2. the second phone joins through the QR code;
3. both devices record locally;
4. every recording contains the common start signature and end clap;
5. files are identified unambiguously;
6. audio and image remain together;
7. A/B recordings can be aligned and played synchronously;
8. camera A/B decisions remain reversible.

## Allowed results

| Result | Meaning |
|---|---|
| Not tested | Not executed on this build and device pair. |
| Pass | The expected result was obtained and evidence was preserved. |
| Fail | The test ran, but the result was wrong or incomplete. |
| Blocked | A dependency, permission, device, or missing feature prevented execution. |

A test does not pass because it “looks right.” Synchronization tests must preserve the original files and record the measured offset.

## Execution order

1. Individual device preflight.
2. Local two-phone session and short recording.
3. File verification and audio-mark inspection.
4. Automatic synchronization and manual refinement.
5. Playback, rewind controls, and live/paused A/B switching.
6. Recovery from permissions, disconnection, locking, and low storage.
7. Portable `.uizador` project, multi-file media library, relinking, mute persistence, and non-destructive editing.
8. Remote sessions only after the local mechanism is reliable.
9. Android release and Play Console validation before distribution.

## Minimum entry conditions

- Two charged Android phones
- At least 1 GB free on each device
- HTTPS access to the tested build
- Camera and microphone verified individually
- Director volume audible, without headphones
- Both microphones able to capture the director's common timing marks
- Tested commit/build recorded in the Test Center

## Minimum accepted output

The initial run succeeds only if:

- both phones connect and become ready;
- each expected local file is complete and contains audio;
- the common start signature and end clap are recognizable;
- camera and take identity can be reconstructed;
- an A/B offset is calculated and preserved;
- a visible and audible common action aligns within the measured error;
- playback remains aligned after pausing and resuming;
- only the selected A/B button is illuminated;
- either audio track can be muted independently;
- a project can retain more than two media references and restore its active pair;
- saved offsets, cuts, mute state, and playback position survive reopening;
- no recording disappears without explanation.

## Evidence

Preserve together:

- device preflight reports;
- Test Center JSON export;
- untouched original videos;
- screenshots or screen recording of director status;
- offset and drift measurements;
- tested commit/build;
- reproducible defect reports.

Recommended folder: `YYYY-MM-DD_deviceA_deviceB_build`.

## Defect report

Every failure includes: test ID, build, phones, network, exact steps, expected result, actual result, frequency, affected filenames, evidence, and whether media loss was possible. After a fix, rerun the failed case and the blocking cases in the same phase.


## Multi-file project regression

The following checks run after every media-library or project-format change:

1. Load an older two-file synchronization report.
2. Relink its original A/B videos.
3. Add at least two additional videos in one selection.
4. Switch the active A/B pair without losing the first pair from the library.
5. Mute A, save, reopen, and confirm that A remains muted while B remains audible.
6. Confirm that offsets and cuts remain attached to the intended active pair.
7. Save a v0.5 `.uizador` checkpoint and reopen it.
8. Verify media identity by name, size, duration, and SHA-256.
9. Confirm that missing originals are reported as needing relink rather than silently replaced.


## Two-step mobile editor regression

1. Open the preparation step and add or relink multiple media files.
2. Select the active A/B pair.
3. Confirm that **Continue to editing** remains disabled until both files are analyzed.
4. Continue to the editing step and verify that file inputs and the long media list are no longer visible.
5. Edit offset, mute state, playback position, and A/B cuts.
6. Use **Change videos** and confirm that the library, permissions, current pair, offset, and cuts remain in memory.
7. Choose another pair, analyze it, and return to editing.
8. Save and reopen the project without losing media references or edit state.
