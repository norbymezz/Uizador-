# Requirements Tracking

## Purpose

Track explicit quantitative and structural requirements extracted from:

- ABAB Movie & TV Dialogue Annotation Guidelines
- multilingual code-switching project specifications
- vendor delivery requirements

This document exists to avoid:

- assumption drift
- incompatible schemas
- invalid dataset composition
- incorrect code-switch proportions
- annotation mismatch

---

# IMPORTANT

All experimental transformations must be checked against the original guideline requirements before considering a dataset valid or deliverable.

---

## Current Quantitative Constraints

### Language Distribution

Project requirement mentions approximately:

- 70% primary language
- 30% English

This must be verified continuously during:

- code-switch injection
- augmentation
- transcript adaptation
- synthetic variant generation

---

## Current Working Hypothesis

Prefer:

- minimal artificial modification
- maximal preservation of real conversational structure

Only inject enough code-switching to satisfy project requirements.

---

## Validation Targets

Need future validation scripts for:

- language percentage
- speaker balance
- duration balance
- overlap frequency
- utterance distribution
- annotation completeness
- required metadata presence

---

## Traceability Principle

Whenever a rule or percentage is used:

- indicate source document
- indicate section/page if possible
- avoid undocumented assumptions

---

## Examples of Future Checks

### Language Ratio

Example:

- Spanish tokens: 70%
- English tokens: 30%

### Conversation Duration

Need to verify:

- minimum usable segment duration
- total required audio hours
- segment count

### Annotation Completeness

Verify presence of:

- timestamps
- speaker labels
- language labels
- overlap handling
- emotion/intent labels if required

---

## Operational Principle

Do not over-engineer transformations before checking:

1. official requirements
2. acceptance thresholds
3. annotation compatibility
4. deliverable validity

---

## Current Experimental Source Files

- Seguro movil #1
- Mejores bromas #64
- Mejores bromas #73

These are currently exploratory material for:

- segmentation
- annotation experiments
- conversational structure analysis
- controlled code-switch insertion
