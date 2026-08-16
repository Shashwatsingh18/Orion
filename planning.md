# DonationTrace — Project Plan

## 1. Hackathon objective

Build a polished MVP demonstrating that a donor can:

1. Discover a campaign.
2. Donate using a wallet.
3. See their transaction confirmed on-chain.
4. Track campaign milestones.
5. See expenses and evidence.
6. Verify that evidence is linked to an immutable hash/CID.
7. Understand where campaign funds have gone.

The demo should take **3–5 minutes** and tell one clear story.

## 2. MVP scope

### Must have

- [ ] Wallet connection
- [ ] Campaign list
- [ ] Campaign details
- [ ] Donation transaction
- [ ] Smart contract escrow
- [ ] Milestones
- [ ] Expense submission
- [ ] Evidence upload
- [ ] IPFS CID generation
- [ ] Evidence hash
- [ ] AI verification result
- [ ] Donor fund-flow view
- [ ] On-chain transaction links
- [ ] Basic admin/verifier dashboard

### Should have

- [ ] Transparency score
- [ ] Donation receipt
- [ ] Campaign creation
- [ ] Milestone approval
- [ ] Expense categories
- [ ] Duplicate evidence detection
- [ ] Charts

### Nice to have

- [ ] ERC-4337 smart account
- [ ] Gas sponsorship
- [ ] ZK privacy
- [ ] DAO verifier voting
- [ ] Multi-chain support
- [ ] Mobile PWA
- [ ] Notifications

## 3. User journeys

### Donor

```text
Connect wallet
  -> Browse campaign
  -> Open campaign
  -> Donate
  -> Transaction confirmed
  -> View donation receipt
  -> Track milestone
  -> Inspect expenses
  -> Open evidence
```

### Campaign manager

```text
Connect wallet
  -> Create campaign
  -> Define milestones
  -> Receive donations
  -> Submit expense
  -> Upload evidence
  -> Request verification
  -> Receive milestone approval
  -> Release funds
```

### Verifier

```text
Open pending evidence
  -> Inspect invoice
  -> Review AI findings
  -> Compare amount
  -> Approve / reject
  -> Approval recorded
  -> Eligible funds released
```

## 4. Smart contract milestones

### Phase 1 — Contract foundation

- [ ] Campaign contract
- [ ] Donation function
- [ ] Milestone creation
- [ ] Escrow accounting
- [ ] Withdrawal/release
- [ ] Access control
- [ ] Events
- [ ] Emergency pause

### Phase 2 — Evidence

- [ ] Evidence hash
- [ ] CID reference
- [ ] Evidence submission
- [ ] Verification status
- [ ] Approval flow

### Phase 3 — Hardening

- [ ] Reentrancy tests
- [ ] Access-control tests
- [ ] Edge cases
- [ ] Fuzz tests
- [ ] Deployment scripts

## 5. Frontend milestones

### Sprint 1

- [ ] App shell
- [ ] Wallet connection
- [ ] Landing page
- [ ] Campaign cards

### Sprint 2

- [ ] Campaign detail
- [ ] Donation modal
- [ ] Transaction states
- [ ] Fund allocation chart

### Sprint 3

- [ ] NGO dashboard
- [ ] Evidence upload
- [ ] Verification dashboard

### Sprint 4

- [ ] Donor trace
- [ ] Transparency score
- [ ] Responsive polish
- [ ] Loading/error states

## 6. AI verification MVP

Do not attempt to build a general fraud detector.

Focus on structured evidence verification.

Input:

```text
Invoice image/PDF
Claimed amount
Claimed category
Campaign milestone
```

Output:

```json
{
  "amount_found": 79840,
  "claimed_amount": 80000,
  "currency": "INR",
  "duplicate_probability": 0.02,
  "consistency_score": 0.94,
  "risk_level": "LOW",
  "findings": []
}
```

The AI result is advisory.

## 7. Demo data

Create one realistic campaign:

**Build a Community School**

```text
Goal: $10,000

Milestone 1 — Foundation       $2,000
Milestone 2 — Construction     $4,000
Milestone 3 — Furniture        $2,000
Milestone 4 — Final inspection $2,000
```

Prepare:

- 2 verified invoices
- 1 suspicious invoice
- 1 duplicate invoice
- Several donations
- Completed and pending milestones

## 8. Judging strategy

### Problem

Charitable donations can have poor visibility after the initial donation.

### Solution

A blockchain-backed trail connects:

```text
Donation -> Milestone -> Expense -> Evidence -> Verification
```

### Differentiator

Do not pitch it as:

> "Blockchain donation platform."

Pitch it as:

> **"A verifiable financial trail for charitable funds."**

### Demo moment

Submit a suspicious invoice.

Show:

```text
AI Verification
Risk: HIGH

Amount mismatch
Duplicate evidence detected
Milestone budget exceeded

RECOMMENDATION: BLOCK
```

Then show that the smart-contract rules prevent unauthorized release.

## 9. Definition of done

The MVP is ready when a judge can:

- connect a wallet;
- donate on testnet;
- see the donation in the campaign;
- follow the funds through milestones;
- inspect an expense;
- inspect its evidence;
- see the evidence hash/CID;
- understand the AI verification;
- verify the corresponding blockchain transaction.

## 10. Explicit non-goals

For the hackathon, do not build:

- A real NGO payment system
- Production financial compliance
- Full identity/KYC infrastructure
- A custom blockchain
- Complex DAO governance
- Real-world securities/tokenized ownership
- Fully autonomous AI fund release

These can become future roadmap items.
