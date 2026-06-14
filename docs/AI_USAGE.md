# AI_USAGE.md

## AI Tools Used

* ChatGPT
* GitHub Copilot (if used)

---

## Purpose

AI was used to:

* Generate boilerplate code
* Review database schema
* Suggest anomaly detection logic
* Generate documentation drafts

---

## Incorrect AI Outputs Found

### Case 1

Issue:

AI suggested automatically deleting duplicate expenses.

Problem:

Legitimate expenses could be removed.

Correction:

Duplicates are flagged for user review.

---

### Case 2

Issue:

AI suggested converting USD expenses directly to INR.

Problem:

Exchange rates were unavailable.

Correction:

Original currencies are stored separately.

---

### Case 3

Issue:

AI suggested treating negative amounts as invalid.

Problem:

Negative transactions may represent refunds.

Correction:

Negative transactions are stored as refunds.
