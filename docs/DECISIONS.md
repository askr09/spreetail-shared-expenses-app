# DECISIONS.md

## Decision 1: Use SQLite

Options Considered:

1. PostgreSQL
2. SQLite

Chosen:

SQLite

Reason:

SQLite is a relational database, requires no additional setup, and allows rapid development. The schema can be migrated to PostgreSQL later.

---

## Decision 2: Handle Duplicate Expenses

Options Considered:

1. Delete automatically
2. Keep all entries
3. Flag for review

Chosen:

Flag for review

Reason:

Automatic deletion could remove legitimate expenses. The user should review duplicates before deletion.

---

## Decision 3: Normalize User Names

Options Considered:

1. Keep names exactly as imported
2. Normalize names

Chosen:

Normalize names

Reason:

Names such as "Priya", "priya", and "Priya S" likely refer to the same user.

---

## Decision 4: Handle Missing Currency

Options Considered:

1. Reject row
2. Import with warning

Chosen:

Import with warning

Reason:

Data should not be lost due to a missing field.

---

## Decision 5: Handle Negative Amounts

Options Considered:

1. Treat as invalid
2. Treat as refund

Chosen:

Treat as refund

Reason:

Negative transactions commonly represent refunds or reversals.

---

## Decision 6: Settlement Transactions

Options Considered:

1. Store as expense
2. Store as settlement

Chosen:

Store as settlement

Reason:

Repayments do not represent new spending and should not affect expense totals.

---

## Decision 7: Historical Membership

Options Considered:

1. Ignore membership dates
2. Validate membership dates

Chosen:

Validate membership dates

Reason:

Members should only participate in expenses during the period they belong to the group.

---

## Decision 8: Currency Conversion

Options Considered:

1. Auto-convert currencies
2. Store original currency

Chosen:

Store original currency

Reason:

No exchange rate information exists in the dataset. Automatic conversion would introduce assumptions.
