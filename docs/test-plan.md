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
7. Portable `.uizador` project and non-destructive editing.
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
