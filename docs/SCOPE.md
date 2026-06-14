# SCOPE.md

## Assignment Scope

This project is a shared expense management application inspired by Splitwise.

The application supports:

* User management
* Group management
* Expense tracking
* Multiple split types
* Settlement tracking
* CSV import
* Balance calculation
* Anomaly reporting

---

## Anomalies Found During CSV Analysis

### 1. Duplicate Expenses

Potential duplicate expense records with similar descriptions, dates and amounts.

Action:
Flagged for review.

---

### 2. Inconsistent User Names

Examples:

* Priya
* priya
* Priya S
* Rohan
* rohan

Action:
Normalized names before processing.

---

### 3. Missing Currency

Some expense records have no currency value.

Action:
Imported with warning and default currency policy.

---

### 4. Missing Payer

Some expenses do not specify who paid.

Action:
Flagged as anomaly.

---

### 5. Settlement Logged As Expense

Example:

"Rohan paid Aisha back"

Action:
Converted into settlement transaction.

---

### 6. Mixed Currency Records

Dataset contains INR and USD expenses.

Action:
Stored separately and reported.

---

### 7. Negative Amounts

Refund transactions exist.

Action:
Stored as refund entries.

---

### 8. Zero Amount Transactions

Action:
Flagged for review.

---

### 9. Ambiguous Dates

Different date formats appear in dataset.

Action:
Parsed and logged if ambiguous.

---

### 10. Historical Membership Violations

Expenses may include members after they left the group.

Action:
Flagged during import.

---

## Database Schema

User

* id
* name
* email
* password

Group

* id
* name

GroupMember

* userId
* groupId
* joinedAt
* leftAt

Expense

* id
* description
* amount
* currency
* date
* splitType

Settlement

* id
* payerId
* receiverId
* amount
* date

Anomaly

* id
* rowNumber
* type
* description
* actionTaken
