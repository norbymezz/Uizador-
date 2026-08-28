# 2026-08-28: end-to-end MVP export validation

## Result

**Pass**, based on the physical Android test performed by the project owner.

## Validated flow

1. Two recorded files were linked as camera A and camera B.
2. Saved synchronization and manual offset were restored.
3. Multiple visual A/B cut decisions were created.
4. The project was saved and reopened without losing the edit.
5. A non-destructive start and end export range was selected.
6. The timeline displayed the included range and shaded excluded material.
7. The edited WebM was rendered locally and downloaded to the phone.
8. The downloaded file played successfully and showed the intended camera changes.
9. The explicit audio-source selector offered Audio A, Audio B, Mix A + B, and No audio.
10. A selected audio mode was applied successfully to a subsequent export.

## Confirmed properties

- Original recordings remained separate and unmodified.
- Final media was available as a normal downloaded phone file.
- YouTube account integration was not required to close the MVP cycle.
- Visual camera decisions and audio-source decisions remained independent.
- The export-range UI produced the expected start and end markers.

## Evidence reported

- Screenshot of the common timeline with A/B segments.
- Export range shown as 00:04.325 → 00:11.179.
- Successful playback of the downloaded edited video.
- Successful exported result using the new four-mode audio selection.

## Scope note

This pass validates the tested short recording and Android browser. It does not yet establish long-recording drift, every Android/browser combination, low-storage recovery, or background-tab rendering reliability. Those remain separate regression targets.
