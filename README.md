# DonationTrace

DonationTrace is a hackathon MVP for tracing charitable funds from donation through milestone, expense evidence, and verification.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo flow

1. Browse the featured community-school campaign.
2. Connect the demo wallet and donate.
3. Inspect the milestone, evidence, CID, and fund-flow views.
4. Open the verifier console to review a deliberately suspicious invoice.

This first implementation uses local, seeded demo state. Wallet, blockchain, IPFS, database, and AI-service integrations are intentionally represented in the UI and are the next integration steps.
