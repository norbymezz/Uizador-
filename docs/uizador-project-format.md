# Uizador project format

Status: experimental version 1.

## Purpose

A `.uizador` project preserves editable state rather than a rendered movie. It can describe:

- multiple scenes and takes;
- any number of video and audio media items;
- camera roles and active comparison pairs;
- synchronization offsets, drift, confidence, and detected timing marks;
- reversible A/B cut decisions;
- mute and playback state;
- guides, presets, titles, effects, transitions, and captions;
- enough media identity to relink moved originals safely.

## Project and export metadata

Project v0.8 stores human-readable naming and output layout without embedding or modifying media:

```json
{
  "project": {"name": "Birthday scene 02"},
  "export_settings": {
    "file_name": "birthday-scene-final",
    "layout": "portrait"
  }
}
```

Supported checkpoint layouts are `landscape` (1280×720), `portrait` (720×1280), and `square` (720×720).

## Media library and active pair

A project is not limited to two files. The media library is an array. The synchronized editor selects two library entries as the current A/B pair.

```json
{
  "media_items": [
    {
      "id": "media-a1",
      "name": "take-01-director.webm",
      "size": 1234567,
      "type": "video/webm",
      "last_modified": 1787860000000,
      "duration_sec": 14.83,
      "sha256": "..."
    },
    {
      "id": "media-b1",
      "name": "take-01-camera.webm",
      "size": 1200000,
      "type": "video/webm",
      "duration_sec": 14.81,
      "sha256": "..."
    }
  ],
  "active_pair": {
    "camera_a_media_id": "media-a1",
    "camera_b_media_id": "media-b1"
  }
}
```

Further takes and cameras remain in `media_items` while another pair is edited. Scene, take, and camera-role metadata will be attached to each item as capture metadata becomes available.

Each ordered pair has an independent profile:

```json
{
  "pair_states": {
    "media-a1::media-b1": {
      "camera_a_media_id": "media-a1",
      "camera_b_media_id": "media-b1",
      "sync": {"camera_b_offset_ms": 10, "confidence": 0.85},
      "cuts": [{"t": 0, "camera": "A"}],
      "audio": {"mode": "A", "camera_a_muted": false, "camera_b_muted": true},
      "playback": {"position_sec": 4.2, "selected_camera": "A"},
      "export_range": {"start_sec": 1.25, "end_sec": 12.8}
    }
  }
}
```

Changing the active pair saves the previous profile before restoring or creating the next one.

## Lightweight and portable modes

### Lightweight project

Stores metadata, captions, edit decisions, and external media references identified by SHA-256, size, duration, and name. It does not copy the original videos.

Advantages: small files, fast saves, and frequent checkpoints.

Limitation: if originals move or permissions expire, the user must authorize them again. Uizador matches selected files against stored identity.

### Portable package

The canonical container is a standard ZIP with MIME `application/vnd.uizador.project+zip`. It may contain:

```text
mimetype
manifest.json
captions/
effects/
presets/
thumbnails/
proxies/
media/
```

Originals are optional. Before embedding them, Uizador must show the estimated package size and available-space implications.

The current synchronization prototype writes a readable JSON-based `.uizador` checkpoint for rapid testing. It is migration input for the canonical ZIP container; it is not yet the final packaged representation.

## Synchronization and editing state

The current checkpoint preserves:

- automatic and manually refined camera-B offset;
- analysis confidence;
- active A/B media IDs;
- all reversible cut decisions;
- common playback position;
- selected camera;
- explicit audio source mode (A, B, Mix, or None);
- media names, sizes, MIME types, timestamps, durations, and SHA-256 hashes.

Canonical project time will use integer microseconds to avoid floating-point accumulation in long projects.

## Relinking and paths

Absolute phone or computer paths are private, platform-specific, and not portable. They must not be written into a shared project.

On Android, the application may retain a user-authorized content URI locally. That URI belongs to local application state, not to the portable manifest. On the web, the user may need to select the original files again. Uizador then verifies hash, size, duration, and name.

## Integrity and security

The importer must:

- reject absolute paths and `..` traversal;
- limit file count and total extraction size;
- verify CRC for package entries and SHA-256 for linked media;
- never execute package content;
- not trust extensions or declared MIME types alone;
- ignore compatible unknown fields;
- never store session tokens, credentials, or live signed URLs.

## Versioning and compatibility

- Format versions change only for incompatible interpretation rules.
- New optional fields do not require a major version.
- Readers should preserve unknown compatible fields when saving.
- Migrations create a copy and never overwrite the only project.
- Existing `uizador.multicam.edl.v0.2`, project v0.3, and v0.4 JSON checkpoints remain accepted by the synchronization prototype.
- Project v0.5 introduces `media_items` and `active_pair`.
- Project v0.6 introduces `pair_states`, keyed by the ordered A/B media IDs. Each pair preserves its own offset, confidence, cuts, mute state, playback position, selected camera, and duration.
- Project v0.7 replaces ambiguous independent mute controls with an explicit audio source mode while retaining legacy mute fields for migration.
- Project v0.8 adds project naming, configurable download names, landscape/portrait/square output layouts, and the non-destructive export range.

## Current validation target

1. Open an older two-file synchronization report.
2. Relink both originals.
3. Add additional videos to the media library.
4. choose a different active A/B pair;
5. preserve offsets, cuts, mute state, and playback position;
6. save v0.5;
7. reload it and relink all media without losing editing decisions.

The verifiable canonical schema remains in `schemas/uizador-project-v1.schema.json`; it will be updated when the JSON checkpoint is promoted into the packaged manifest.
