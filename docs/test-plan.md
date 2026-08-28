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
- the audio source can be selected explicitly as A, B, Mix, or None;
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
3. Confirm that the primary action remains disabled until both Camera A and Camera B are assigned.
4. For a new pair, confirm the action reads **Analyze and continue**; for a saved pair, confirm it reads **Continue with saved sync**.
5. Continue to the editing step and verify that file inputs and the long media list are no longer visible.
6. Edit offset, mute state, playback position, and A/B cuts.
7. Use **Change videos** and confirm that the library, permissions, current pair, offset, and cuts remain in memory.
8. Choose another pair, analyze it, and return to editing.
9. Save and reopen the project without losing media references or edit state.


## File-input clearing regression

1. Add multiple files to the media library and select an active A/B pair.
2. Analyze the pair and create at least one cut.
3. Use **Clear file fields**.
4. Confirm that the visible native file inputs become empty.
5. Confirm that the media library, active A/B selectors, object URLs, offset, mute state, cuts, and enabled editing step remain unchanged.
6. Confirm that editing still works while the optional quick-load A/B inputs are empty.
7. Reload the page separately and confirm that a full reload—unlike clearing fields—does require relinking browser-protected files.


## Media-library clearing regression

1. Add several files, select A/B, analyze, and create cuts.
2. Confirm that **Clear fields** only resets native file-input labels.
3. Choose **Clear library**, cancel the confirmation, and verify that nothing changes.
4. Choose it again and confirm.
5. Verify that the library and active A/B media are removed, playback stops, and the preparation step is shown.
6. Verify that offset and cut decisions remain available for intentional relinking.
7. Verify that **Continue to editing** is disabled until a new A/B pair is linked and analyzed.
8. Confirm that **Reset cuts** remains the separate action for discarding edit decisions.


## Independent pair-state regression

1. Add four videos and create pair A1/B1.
2. Analyze A1/B1; set a recognizable offset, mute combination, playback position, and several cuts.
3. Return to preparation and choose A2/B2.
4. Confirm that A2/B2 starts with a new profile rather than inheriting A1/B1 decisions.
5. Analyze and edit A2/B2 with different values.
6. Switch back to A1/B1 and verify restoration of its original offset, confidence, cuts, mute state, position, duration, and selected camera.
7. Switch again to A2/B2 and verify its independent profile.
8. Save project v0.6, reload, relink all four media files, and repeat both restorations.
9. Open a v0.5 project and confirm migration of its single global state into the legacy active pair.
10. Clear the library, relink files, and confirm that preserved pair profiles are not overwritten with null media IDs.


## Saved synchronization preservation regression

1. Save a project with a distinctive manual offset for an A/B pair.
2. Reload the project and relink its original media.
3. Confirm that the preparation step shows **Continue with saved synchronization**.
4. Continue without pressing reanalyze.
5. Verify that audio envelopes are decoded for display while the stored offset, confidence, cuts, mute state, position, and selected camera remain unchanged.
6. Return to preparation and press **Reanalyze audio**.
7. Cancel the replacement warning and verify that the saved offset remains unchanged.
8. Reanalyze only after confirming, and verify that the new estimate intentionally replaces the pair profile.


## Local edited-video export regression

1. Relink a synchronized A/B pair and open the editing step.
2. Create at least three alternating A/B segments and choose a recognizable non-zero offset.
3. Mute one source track and leave the other audible.
4. Press **Create edited video** and keep the page visible until progress reaches 100%.
5. Confirm that Android downloads a single `.webm` file and that neither original changes.
6. Play the downloaded file outside Uizador from beginning to end.
7. Verify every camera change occurs at its saved cut time and no black frame appears where the selected source is available.
8. Verify picture and the enabled audio remain synchronized at the start, middle, and end.
9. Repeat with the opposite audio mute selection.
10. Start another export, cancel it, and confirm no incomplete result is presented as finished.
11. Upload the downloaded file manually only as a separate compatibility check; YouTube integration is not an MVP requirement.


## English UI and progress-indicator regression

1. Confirm that every visible heading, label, button, status, warning, and downloaded filename is in English.
2. Confirm that the preparation screen has one multi-file library input and no separate quick-load Camera A/B inputs.
3. Confirm that full filenames—including extensions—appear in the library and both camera selectors.
4. Confirm that Step 01 and Step 02 use editorial typography and an underline, have no button background, cannot receive focus, and do not suggest that they are tappable.
5. Confirm that audio reanalysis appears in the editing step beside synchronization controls, not as a duplicate setup action.


## Contextual clearing controls regression

1. Confirm **Open a saved project** is the first control in the preparation card.
2. Confirm its **Clear** button only clears the native project-file field and does not unload the project already in memory.
3. Confirm **Add videos to library** has its own adjacent **Clear** button and that it does not remove linked library items.
4. Confirm **Clear library** appears beside the media-library heading and still requires confirmation.
5. Confirm **Clear A** and **Clear B** appear beside their respective selectors.
6. Clear one camera assignment and verify that its media remains listed in the library, the other assignment remains intact, and the primary continue action becomes disabled.
7. Reassign the cleared camera and verify that the saved pair profile can be restored.
8. Confirm the former detached full-width clearing buttons no longer appear at the bottom of the preparation card.


## Non-destructive export-range regression

1. Open a synchronized edit and move the common playhead past unwanted material at the beginning.
2. Press **Set start**, move near the desired finish, and press **Set end**.
3. Confirm the timeline shades everything outside the selected range and displays exact start/end timestamps.
4. Save the `.uizador` project, reopen it, relink the media, and verify that the export range is restored with the pair profile.
5. Export and verify that the downloaded video begins and ends at the selected common-timeline positions while preserving A/B cuts, offset, and enabled audio.
6. Confirm the original videos and cut timestamps remain unchanged.
7. Press **Full length**, save, reopen, and verify that a null saved end still means the complete remaining duration rather than time zero.
8. Attempt to set the start after the end and the end before the start; confirm both invalid ranges are rejected.


## Explicit audio-source regression

1. Open an edited A/B pair and select **Audio A**.
2. Play across several camera cuts and confirm the picture changes while only A remains audible.
3. Repeat with **Audio B**, **Mix A + B**, and **No audio**.
4. Confirm exactly one audio-source button is highlighted at a time.
5. Save project v0.7, reopen it, relink the media, and confirm the selected source is restored for that pair.
6. Assign another pair, choose a different audio source, and verify both pair profiles remain independent.
7. Export each mode and confirm the downloaded file matches the preview selection without changing audio at visual cuts.
8. Open a v0.6 project containing only legacy camera mute flags and confirm it maps correctly: A enabled → Audio A, B enabled → Audio B, both enabled → Mix, both muted → No audio.
