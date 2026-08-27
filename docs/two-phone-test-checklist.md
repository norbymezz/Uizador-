# Two-phone test checklist

Use this checklist for the first physical Uizador session. Record results in the [Test Center](../web/test-center/index.html).

## Device preflight

On each phone, open the [preflight page](../web/preflight/index.html):

1. grant camera and microphone permission;
2. verify the camera preview and audio meter;
3. record five seconds;
4. play the complete test recording;
5. save the diagnostic JSON;
6. label the reports Phone A and Phone B.

## Short synchronization run

1. Open the [multicamera session](../web/multicamera-session/index.html) on the director phone.
2. Create a session.
3. Scan the QR code with the second phone.
4. Confirm that Camera B appears connected.
5. Set duration to **5 seconds**, pre-roll to **2 seconds**, takes to **1**, and movement to **Fixed camera**.
6. Set the director phone's media volume high. The remote phone does not need to emit a separate timing sound.
7. Prepare both cameras and grant permissions.
8. Wait for **All cameras are ready**.
9. Start the take.
10. After the third beep, make one clearly visible hand clap in view of both cameras.
11. Wait for the end clap and both local downloads.

The single physical sound emitted by the director is the synchronization reference captured by both microphones. Independent beeps on every phone would include network latency and are not the primary local-session reference.

## File handling

The current prototype saves each recording locally. Transfer the remote camera file to the director without transcoding it—for example, Quick Share or WhatsApp as a document. Preserve both originals.

## Synchronization check

1. Open [Synchronize recordings](../web/sync-preview/index.html).
2. Load the director file as Camera A and the remote file as Camera B.
3. Run audio analysis.
4. Record the estimated offset and confidence.
5. Play from before the start signature.
6. Check the three beeps, visible hand clap, and end clap.
7. Refine the offset manually if needed.
8. Switch A → B → A during playback.
9. Pause and verify that a cut can also be placed precisely.
10. Record whether synchronization remains stable after pause/resume.

## Current control gap

The player currently needs explicit rewind, jump-back, jump-forward, and frame-step buttons. Record this as a known limitation rather than improvising around it.

## Report

Record device models, Android/browser versions, network, distance, filenames, estimated and corrected offset, confidence, drift, permission/download issues, and whether A/B switching worked during playback and while paused.
