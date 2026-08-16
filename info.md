# DonationTrace — Project Information

## 1. Project name

**DonationTrace**

### Tagline

> **Follow every donation. Verify every milestone.**

Alternative:

> **A verifiable financial trail for charitable funds.**

## 2. Problem

After donating to a charitable campaign, donors often have limited visibility into how money is eventually used.

DonationTrace addresses this by creating a traceable chain:

```text
Donation
   ↓
Campaign
   ↓
Milestone
   ↓
Expense
   ↓
Evidence
   ↓
Verification
   ↓
Fund release
```

## 3. Solution

DonationTrace combines:

- Blockchain
- Smart-contract escrow
- Decentralized evidence storage
- AI-assisted document verification
- Transparent donor dashboards

The goal is not to put everything on-chain. The goal is to put the **important financial commitments and proofs of integrity** on-chain while keeping large documents off-chain.

## 4. Why blockchain?

Blockchain provides:

### Immutable financial records

Donation transactions and contract state can be independently verified.

### Programmable escrow

Funds can follow predefined milestone rules.

### Public auditability

Anyone can inspect relevant contract activity.

### Tamper-evident evidence

Evidence can be represented by content hashes/CIDs.

### Reduced dependence on a single database

The financial source of truth is decentralized.

## 5. Why AI?

Blockchain can prove:

> "This evidence reference existed and was associated with this transaction."

Blockchain cannot determine:

> "Is this invoice suspicious?"

AI helps with:

- OCR
- Amount extraction
- Invoice classification
- Duplicate detection
- Budget consistency
- Anomaly detection
- Human-readable explanations

AI should remain an **advisory verification layer** rather than an unquestionable authority.

## 6. Core features

### Transparent campaigns

Each campaign shows:

- Goal
- Raised
- Committed
- Released
- Remaining
- Milestones
- Expenses
- Verification state

### Milestone escrow

Campaign funds are associated with predefined milestones.

### Evidence management

Expenses can reference:

- Invoice
- Receipt
- Photo
- Video
- Report

### Evidence integrity

Each evidence file gets a cryptographic hash and decentralized storage reference.

### AI verification

Evidence receives:

- Confidence score
- Risk level
- Extracted values
- Findings
- Recommendation

### Donation tracing

Donors can follow their donation through campaign activity.

## 7. Transparency score

Example:

```text
Transparency Score: 92/100

On-chain accounting       100%
Evidence coverage           95%
Milestone completion        90%
Verification quality        92%
Dispute history             98%
```

The score is an informational metric, not a guarantee of legitimacy.

## 8. Roles

### Donor

- Browse campaigns
- Donate
- Track donations
- Inspect spending
- Inspect evidence

### Campaign manager

- Create campaigns
- Define milestones
- Submit expenses
- Upload evidence
- Request verification

### Verifier

- Review evidence
- Review AI findings
- Approve/reject evidence
- Participate in dispute resolution

### Protocol administrator

- Manage protocol configuration
- Pause contracts during emergencies
- Manage trusted verifier roles

## 9. Example

Campaign:

```text
Build a Community School
Goal: $10,000
```

Donations:

```text
Alice  $500
Bob    $250
Chris  $1,000
```

Milestone:

```text
Foundation
Budget: $2,000
```

Expense:

```text
Construction materials
Claimed: $800
```

Evidence:

```text
Invoice.pdf
SHA-256: ...
IPFS CID: ...
```

AI:

```text
Amount extracted: $798
Amount claimed:   $800
Duplicate:        No
Risk:             Low
Confidence:       96%
```

Verifier:

```text
APPROVED
```

Smart contract:

```text
$800 eligible for release
```

The donor can now see the entire chain.

## 10. Security and privacy

Never store sensitive personal information directly on the blockchain.

Avoid storing:

- Government IDs
- Full addresses
- Medical information
- Bank details
- Private donor information

Use hashes, CIDs, encryption and access-controlled off-chain storage where appropriate.

## 11. Hackathon positioning

### One sentence

> DonationTrace lets donors follow charitable funds from donation to verified expense using blockchain-backed milestone escrow and AI-assisted evidence verification.

### Three-part pitch

**Problem:** Donors cannot easily verify where money goes.

**Solution:** Track funds through programmable milestones and tamper-evident evidence.

**Innovation:** Combine blockchain financial guarantees with AI-assisted verification.

## 12. Future roadmap

### V2

- Independent verifier network
- Reputation system
- Better anomaly detection
- Gasless donations
- Mobile app

### V3

- ZK privacy
- Cross-chain donations
- DAO governance
- Automated reporting
- NGO reputation layer

### Long-term

DonationTrace could become an open transparency protocol where different charities, auditors and donation applications share a common verifiable financial trail.
