# DonationTrace — Progress

## Current status

**Phase:** Planning / Architecture

**Overall completion:** 0%

The project has not yet entered implementation.

---

## 1. Foundation

- [ ] Repository initialized
- [ ] Monorepo structure created
- [ ] Environment configuration
- [ ] README created
- [ ] License selected
- [ ] CI configured

## 2. Smart contracts

- [ ] Foundry project initialized
- [ ] Campaign contract
- [ ] Donation accounting
- [ ] Milestone system
- [ ] Escrow
- [ ] Evidence references
- [ ] Verification roles
- [ ] Release mechanism
- [ ] Emergency pause
- [ ] Unit tests
- [ ] Fuzz tests
- [ ] Testnet deployment

## 3. Backend

- [ ] PostgreSQL database
- [ ] Prisma schema
- [ ] Campaign API
- [ ] Donation indexing
- [ ] Evidence API
- [ ] Verification job system
- [ ] Transparency calculation

## 4. IPFS

- [ ] Storage provider selected
- [ ] Upload service
- [ ] SHA-256 hashing
- [ ] CID persistence
- [ ] Evidence retrieval
- [ ] File validation

## 5. AI verification

- [ ] FastAPI service
- [ ] OCR pipeline
- [ ] Invoice extraction
- [ ] Amount validation
- [ ] Duplicate detection
- [ ] Campaign-budget checks
- [ ] Risk scoring
- [ ] Human-readable explanation

## 6. Frontend

- [ ] Next.js application
- [ ] Design system
- [ ] Wallet connection
- [ ] Campaign discovery
- [ ] Campaign details
- [ ] Donation flow
- [ ] Donation receipt
- [ ] Fund-flow visualization
- [ ] NGO dashboard
- [ ] Evidence upload
- [ ] Verification dashboard
- [ ] Transparency score

## 7. Testing

- [ ] Contract unit tests
- [ ] Contract integration tests
- [ ] API tests
- [ ] AI verification tests
- [ ] Upload tests
- [ ] Wallet flow tests
- [ ] End-to-end donation test
- [ ] Failure-state testing

## 8. Security review

- [ ] Reentrancy review
- [ ] Access-control review
- [ ] Integer/accounting review
- [ ] Signature/replay review
- [ ] Pause mechanism review
- [ ] Evidence manipulation review
- [ ] Backend privilege review
- [ ] Sensitive-data review

## 9. Demo preparation

- [ ] Seed demo campaign
- [ ] Seed donations
- [ ] Create realistic milestones
- [ ] Create verified evidence
- [ ] Create suspicious evidence
- [ ] Create duplicate evidence
- [ ] Verify end-to-end flow
- [ ] Prepare demo wallet
- [ ] Prepare backup deployment
- [ ] Prepare 3-minute pitch

---

# Change log

## 2026-08-17

### Added

- Initial architecture
- MVP scope
- Recommended technology stack
- Smart-contract direction
- AI verification concept
- Donor and NGO user journeys
- Security requirements
- Hackathon demo plan

### Next milestone

**Repository + contract skeleton**

Target:

```text
apps/
  web/

packages/
  contracts/
  config/
  shared/

services/
  verifier/

infra/
  docker/
```

After the repository is created, update this file after every meaningful implementation milestone.

---

# Status convention

Use:

- `[ ]` Not started
- `[-]` In progress
- `[x]` Completed

Keep this file factual. Do not mark features complete until they work end-to-end.
