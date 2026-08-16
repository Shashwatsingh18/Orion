# DonationTrace — Architecture

## 1. Overview

DonationTrace is a blockchain-backed donation transparency platform that lets donors trace funds from donation through campaign milestones and verified expenses.

The blockchain is used for **ownership, financial state, milestone rules, and tamper-evident references**. Large/private documents remain off-chain.

### Core flow

```text
Donor
  |
  v
Web App
  |
  +--> Wallet / Smart Account
  |
  v
Donation Campaign Smart Contract
  |
  +--> Donations
  +--> Milestones
  +--> Escrowed Funds
  +--> Release Rules
  |
  v
NGO / Campaign Manager
  |
  +--> Submit expense
  +--> Upload evidence
  |
  v
IPFS / Decentralized Storage
  |
  +--> CID
  +--> Document hash
  |
  v
AI Verification Service
  |
  +--> OCR / extraction
  +--> Duplicate detection
  +--> Consistency checks
  +--> Confidence score
  |
  v
Human / Community Verification
  |
  v
Blockchain record
```

## 2. Recommended stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js + TypeScript | Fast hackathon development and strong UX |
| UI | Tailwind CSS + shadcn/ui | Fast, polished interface |
| Wallet | wagmi + viem | Mature EVM integration |
| Smart account | ERC-4337 compatible account | Better UX and programmable permissions |
| Blockchain | Base Sepolia for MVP | Low-cost EVM testnet with strong ecosystem |
| Contracts | Solidity + OpenZeppelin | Secure, standard primitives |
| Contract tooling | Foundry | Fast testing, scripting and deployment |
| Backend | Next.js Route Handlers / TypeScript | Keeps MVP architecture simple |
| Database | PostgreSQL + Prisma | Campaign metadata and indexing |
| Storage | IPFS | Decentralized evidence references |
| AI | Python FastAPI service | Flexible document analysis |
| OCR | Tesseract or managed OCR | Extract invoice/receipt text |
| Auth | Wallet signature + optional email | Web3-native authentication |
| Indexing | Ponder or direct event indexing | Fast blockchain-derived read model |
| Deployment | Vercel + managed Postgres + IPFS provider | Simple hackathon operations |

## 3. Design principles

### Blockchain should store facts, not files

Never put full invoices, images or personal documents on-chain.

Store:

- campaign identifier
- donor transaction
- milestone state
- approved amount
- evidence CID
- evidence hash
- verification status
- timestamps
- important approvals

### Off-chain systems should be treated as derived state

PostgreSQL is a read-optimized index/cache. The blockchain remains authoritative for financial state.

If PostgreSQL and chain data disagree, rebuild the database from blockchain events.

### AI is advisory, not sovereign

AI verification must never be the sole authority for releasing large amounts of money.

The system should produce:

```text
AI confidence
Verification findings
Evidence references
Recommended action
```

A trusted verifier, DAO vote, campaign admin, or predefined approval policy makes the final decision.

## 4. Major components

### Frontend

Responsibilities:

- Campaign discovery
- Donation flow
- Donation receipt
- Fund-flow visualization
- Campaign creation
- Milestone management
- Evidence submission
- Verification dashboard
- Transparency score

### Smart contracts

Suggested contract modules:

```text
DonationFactory
    |
    +-- Campaign
          |
          +-- Donation accounting
          +-- Milestones
          +-- Escrow
          +-- Evidence references
          +-- Release rules
          +-- Emergency pause
```

Use OpenZeppelin components for:

- AccessControl
- ReentrancyGuard
- Pausable
- SafeERC20
- Ownable where appropriate

### Backend

Responsibilities:

- Campaign metadata
- User profiles
- Search
- Evidence metadata
- AI verification jobs
- Notification state
- Analytics
- Blockchain event indexing

The backend must not be able to arbitrarily modify on-chain financial state.

### Storage

Evidence pipeline:

```text
File
  |
  v
SHA-256 hash
  |
  +--> IPFS upload --> CID
  |
  v
AI analysis
  |
  v
Verification result
  |
  v
Evidence record
  |
  v
On-chain CID/hash reference
```

## 5. Smart contract model

Conceptual structures:

```solidity
struct Campaign {
    address owner;
    address treasury;
    uint256 goal;
    uint256 raised;
    uint256 released;
    bool active;
}

struct Milestone {
    uint256 amount;
    bytes32 metadataHash;
    bool approved;
    bool released;
}

struct Evidence {
    bytes32 contentHash;
    string cid;
    uint8 verificationScore;
}
```

Donation accounting should distinguish:

```text
totalDonated
totalCommitted
totalReleased
totalRemaining
```

Do not infer balances solely from UI values.

## 6. Security model

### Threats

- Reentrancy
- Unauthorized fund release
- Malicious campaign owner
- Fake evidence
- Duplicate evidence
- Oracle/AI manipulation
- Signature replay
- Frontend compromise
- Metadata tampering
- Private information accidentally published

### Mitigations

- OpenZeppelin security primitives
- Checks-effects-interactions
- Role-based permissions
- Nonces for signatures
- Chain ID validation
- Contract pause mechanism
- Evidence hashes
- Content-addressed storage
- Human approval for high-risk releases
- Testnet-only MVP
- No sensitive personal data on-chain

## 7. Data ownership

| Data | Location |
|---|---|
| Donation amount | Blockchain |
| Donor wallet | Blockchain |
| Milestone status | Blockchain |
| Released funds | Blockchain |
| Evidence CID | Blockchain |
| Evidence file | IPFS |
| AI analysis | PostgreSQL |
| Search/index data | PostgreSQL |
| Campaign description | PostgreSQL + optional content hash |
| Sensitive personal data | Avoid storing; if unavoidable, encrypted off-chain |

## 8. API boundaries

Example endpoints:

```text
GET  /api/campaigns
GET  /api/campaigns/:id
POST /api/campaigns
POST /api/evidence
POST /api/verification
GET  /api/donations/:wallet
GET  /api/campaigns/:id/transparency
```

Blockchain writes should generally happen from the user's wallet or an explicitly authorized relayer, not from an unrestricted backend wallet.

## 9. Deployment architecture

```text
                    Internet
                       |
                 Vercel / CDN
                       |
                    Next.js
                 /           \
                /             \
          PostgreSQL        Wallet
                |              |
                |              v
                |        Base Sepolia
                |              |
                |       DonationTrace
                |         contracts
                |
          AI Verification
                |
             FastAPI
                |
             IPFS
```

## 10. Future architecture

After the hackathon:

- Multi-chain support
- ERC-4337 sponsored transactions
- Independent verifier network
- ZK privacy for sensitive donor/campaign data
- DAO governance
- Reputation-based NGO verification
- Stablecoin treasury management
- Mobile app
- Real-world payment rails
- Formal contract verification
