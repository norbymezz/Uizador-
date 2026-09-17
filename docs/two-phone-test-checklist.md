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
2. Confirm that the preset selector appears before any QR or camera controls.
3. Select **Prueba de sincronización**. Check that its card says two phones, one five-second take, fixed cameras, and the complete QR-to-download route.
4. Select **Crear sesión · Prueba de sincronización**.
5. Scan the QR code with the second phone.
6. Confirm that Camera B appears connected and both phones show the same selected preset.
7. Confirm that duration is **5 seconds**, pre-roll is **2 seconds**, takes is **1**, and movement is **Fixed camera**. These values should already be loaded by the preset.
8. Set the director phone's media volume high. The remote phone does not need to emit a separate timing sound.
9. Prepare both cameras and grant permissions.
10. Wait for **All cameras are ready**.
11. Start the take.
12. After the third beep, make one clearly visible hand clap in view of both cameras.
13. Wait for the end signature, then download both locally retained recordings and their identification manifests.
14. On the remote phone, follow the visible instruction to send its original recording and identification file to the director.

The single physical sound emitted by the director is the synchronization reference captured by both microphones. Independent beeps on every phone would include network latency and are not the primary local-session reference.

## File handling

The current prototype saves each recording locally. Transfer the remote camera file and its identification JSON to the director without transcoding—for example, with Quick Share or WhatsApp as documents. Preserve both originals. On the director phone, the completed recording screen now continues directly to file loading and synchronization.

## Synchronization check

1. On the director phone, tap **Agregar archivos y sincronizar**. If the recording was made earlier, use **Ya grabé y tengo los archivos** on the initial screen.
2. Add the director and remote files together, then assign the director file to Camera A and the remote file to Camera B.
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
