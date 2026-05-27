# Guideline Extract

## Purpose

Extract explicit operational constraints and annotation rules from:

- ABAB Movie & TV Dialogue Annotation Guidelines
- multilingual code-switching project requirements

This document exists to:

- centralize requirements
- preserve traceability
- avoid undocumented assumptions
- support future validation scripts
- maintain compatibility with annotation workflows

---

# Quantitative Requirements

## Language Distribution

Specified requirement:

- approximately 70% primary locale language
- approximately 30% English

Operational consequence:

- code-switch insertion must be measured
- transformations must preserve naturalness
- synthetic augmentation should not exceed required ratios unnecessarily

Current strategy:

- minimal intervention
- preserve original conversational structure whenever possible

Source:

- multilingual project specification

---

# Conversational Requirements

## Natural Code-Switching

Code-switching should sound natural and conversational.

Avoid:

- direct mechanical translation
- unnatural bilingual alternation
- excessive English density

Operational implication:

Prefer:

- technical support terminology
- insurance terminology
- telecom terminology
- customer support expressions

Examples:

- claim
- support
- verification
- incident
- policy
- account

Source:

- multilingual project specification

---

# Audio Structure Requirements

## Dual Channel Audio

Requirement:

- separate speakers by channel

Operational implication:

Future recreated conversations may require:

- AGENT on left channel
- CUSTOMER on right channel

Current exploratory material is still mixed-source audio.

Source:

- multilingual project specification

---

# Annotation Requirements

## Speaker Consistency

Speaker identity must remain stable across the conversation.

Operational implication:

Current experiments should preserve:

- stable speaker IDs
- stable role attribution

Source:

- ABAB guidelines

---

## Overlap Handling

Conversational overlaps must be annotated consistently.

Operational implication:

Do not over-clean interruptions or conversational collisions.

Source:

- ABAB guidelines

---

## Conversational Realism

Disfluencies and natural speech phenomena are important.

Operational implication:

Avoid excessive transcript normalization.

Preserve when useful:

- hesitations
- interruptions
- repairs
- fillers
- emotional escalation

Source:

- ABAB guidelines

---

# Current Experimental Material

## Current Sources

- Seguro movil #1
- Mejores bromas #64
- Mejores bromas #73

---

# Current Operational Philosophy

The project focus is:

- realistic conversational dynamics
- conversational structure preservation
- annotation compatibility
- controlled augmentation

The project focus is NOT:

- humor extraction
- joke preservation
- aggressive synthetic rewriting

---

# Future Validation Targets

Need future scripts for:

- language ratio validation
- metadata completeness
- speaker balance
- segment duration
- annotation coverage
- overlap frequency
- code-switch density
