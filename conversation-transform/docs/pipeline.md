# Conversation Transform Experiments

## Objective

Use real conversational material (phone pranks, support calls, complaint calls, radio calls) as a base for:

- conversational datasets
- multilingual dialogue datasets
- code-switching datasets
- intent tagging
- emotion tagging
- conversational transformation experiments

The focus is not comedy extraction.
The focus is preserving realistic conversational dynamics.

---

## Initial Test Material

### Source

Isidro Montalvo prank calls.

Current experimental unit:

- Seguro móvil #1

Approx usable range:

- 00:04 -> 03:13

Reason:

The reveal section is excluded to preserve realism.

---

## Minimal Experimental Pipeline

RAW AUDIO
↓
Conversation Segmentation
↓
Speaker Separation
↓
Conversational Cleaning
↓
Intent / Emotion Tagging
↓
Light Code-Switch Injection
↓
Dataset Export

---

## Current Ideas

Potential future layers:

- semantic inversion
- semantic drift
- conversational role inversion
- emotional polarity transforms
- multilingual augmentation
- synthetic variants

But initially the objective is to preserve natural dialogue as much as possible.

---

## Example Intent Tags

- claim_verification
- incident_explanation
- fraud_suspicion
- escalation
- policy_enforcement
- complaint
- negotiation

---

## Example Emotion Tags

- neutral
- calm
- defensive
- accusatory
- irritated
- serious

---

## Notes

Real conversations already contain:

- interruptions
- hesitations
- overlaps
- emotional escalation
- repair structures
- realistic turn-taking

These properties are valuable for conversational AI datasets.
