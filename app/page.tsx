"use client";

import { FormEvent, useState } from "react";

type View = "discover" | "campaign" | "trace" | "verify";

type CampaignData = { id: string; name: string; category: string; location: string; description: string; goal: number; raised: number; score: number; supporters: number; art: string };
type Transaction = { id: string; campaign: string; amount: number; token: string; date: string; status: "Confirmed" | "Processing"; hash: string; note: string };

const initialCampaigns: CampaignData[] = [
  { id: "school", name: "Build a Community School", category: "Education", location: "Maharashtra, India", description: "Help build safe classrooms and opportunity for 240 children in rural Maharashtra.", goal: 10000, raised: 7420, score: 92, supporters: 128, art: "school" },
  { id: "water", name: "Clean Water for Kheda", category: "Water", location: "Gujarat, India", description: "Install a solar-powered water station for three villages.", goal: 6500, raised: 3810, score: 88, supporters: 76, art: "water" },
  { id: "clinic", name: "Mobile Health Clinic", category: "Health", location: "Rajasthan, India", description: "Bring primary care and medicines to remote communities.", goal: 12000, raised: 2960, score: 90, supporters: 51, art: "clinic" }
];

const initialTransactions: Transaction[] = [
  { id: "t1", campaign: "Build a Community School", amount: 250, token: "USDC", date: "Today, 10:42 AM", status: "Confirmed", hash: "0x7ac1b690…e92f", note: "Foundation milestone" },
  { id: "t2", campaign: "Clean Water for Kheda", amount: 50, token: "USDC", date: "Aug 12, 2026", status: "Confirmed", hash: "0x183ad278…4c1a", note: "Water station equipment" },
  { id: "t3", campaign: "Build a Community School", amount: 100, token: "USDC", date: "Aug 03, 2026", status: "Confirmed", hash: "0x985bf4d2…11c9", note: "Foundation milestone" }
];

const milestones = [
  { name: "Foundation", amount: 2000, spent: 1840, state: "Completed", tone: "done" },
  { name: "Construction", amount: 4000, spent: 2180, state: "In progress", tone: "active" },
  { name: "Furniture", amount: 2000, spent: 0, state: "Locked", tone: "locked" },
  { name: "Final inspection", amount: 2000, spent: 0, state: "Locked", tone: "locked" }
];

const expenses = [
  { label: "Concrete & rebar", amount: "$1,240", vendor: "BuildRight Supplies", status: "Verified", risk: "LOW", cid: "bafybeig…7k2m" },
  { label: "Masonry labor", amount: "$600", vendor: "Asha Construction", status: "Verified", risk: "LOW", cid: "bafybeid…f9qz" },
  { label: "Steel beams", amount: "$800", vendor: "Nexa Materials", status: "Review required", risk: "HIGH", cid: "bafybeih…3xkp" }
];

function Money({ value }: { value: number }) { return <>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)}</>; }

export default function Home() {
  const [view, setView] = useState<View>("discover");
  const [connected, setConnected] = useState(false);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selectedCampaignId, setSelectedCampaignId] = useState("school");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [donation, setDonation] = useState(100);
  const [receipt, setReceipt] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const selectedCampaign = campaigns.find((campaign) => campaign.id === selectedCampaignId) ?? campaigns[0];

  const donate = (event: FormEvent) => {
    event.preventDefault();
    if (!connected) {
      setConnected(true);
      return;
    }
    setCampaigns((current) => current.map((campaign) => campaign.id === selectedCampaign.id ? { ...campaign, raised: campaign.raised + donation, supporters: campaign.supporters + 1 } : campaign));
    setTransactions((current) => [{ id: crypto.randomUUID(), campaign: selectedCampaign.name, amount: donation, token: "USDC", date: "Just now", status: "Confirmed", hash: `0x${Math.random().toString(16).slice(2, 10)}…e92f`, note: "Campaign contribution" }, ...current]);
    setReceipt(true);
  };
  const nav = (next: View) => { setView(next); setReceipt(false); };
  const openCampaign = (id: string) => { setSelectedCampaignId(id); nav("campaign"); };
  const createCampaign = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "New community project");
    const goal = Number(form.get("goal")) || 5000;
    const campaign: CampaignData = { id: crypto.randomUUID(), name, category: String(form.get("category") || "Community"), location: String(form.get("location") || "India"), description: String(form.get("description") || "A new community-led project with transparent milestones."), goal, raised: 0, score: 0, supporters: 0, art: "new" };
    setCampaigns((current) => [campaign, ...current]); setSelectedCampaignId(campaign.id); setShowCreate(false); nav("campaign");
  };

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => nav("discover")} aria-label="DonationTrace home"><span className="brand-mark">↗</span><span>Donation<span>Trace</span></span></button>
        <nav aria-label="Primary navigation">
          <button className={view === "discover" ? "selected" : ""} onClick={() => nav("discover")}>Discover</button>
          <button className={view === "trace" ? "selected" : ""} onClick={() => nav("trace")}>My trace</button>
          <button className={view === "verify" ? "selected" : ""} onClick={() => nav("verify")}>Verifier</button>
        </nav>
        <button className={connected ? "wallet connected" : "wallet"} onClick={() => setConnected(!connected)}>{connected ? "0x6A3…B17E" : "Connect wallet"}</button>
      </header>

      {view === "discover" && <Discover campaigns={campaigns} onOpen={openCampaign} onCreate={() => setShowCreate(true)} />}
      {view === "campaign" && <Campaign campaign={selectedCampaign} donation={donation} setDonation={setDonation} connected={connected} donate={donate} receipt={receipt} onBack={() => nav("discover")} onTrace={() => nav("trace")} />}
      {view === "trace" && <Trace transactions={transactions} onCampaign={() => openCampaign(selectedCampaignId)} />}
      {view === "verify" && <Verifier reviewed={reviewed} setReviewed={setReviewed} />}
      {showCreate && <CreateCampaign onClose={() => setShowCreate(false)} onCreate={createCampaign} />}
    </main>
  );
}

function Discover({ campaigns, onOpen, onCreate }: { campaigns: CampaignData[]; onOpen: (id: string) => void; onCreate: () => void }) {
  return <>
    <section className="hero"><p className="eyebrow">Transparent giving, built in</p><h1>Give to something<br /><em>you can actually follow.</em></h1><p className="hero-copy">Choose a cause, contribute with USDC, and see a clear receipt and the verified use of funds—like a payment history for your impact.</p><div className="hero-actions"><button className="primary" onClick={() => onOpen(campaigns[0].id)}>Choose a campaign <span>→</span></button><button className="outline" onClick={onCreate}>+ Create campaign</button></div><div className="hero-orb one" /><div className="hero-orb two" /></section>
    <section className="section campaign-preview"><div className="section-heading"><div><p className="eyebrow">CAMPAIGNS</p><h2>Choose where your money goes.</h2></div><button className="outline" onClick={onCreate}>+ Add campaign</button></div><div className="campaign-list">{campaigns.map((campaign) => <article className="campaign-card compact" key={campaign.id}><div className={`campaign-art ${campaign.art}`}><span>{campaign.category}</span></div><div className="campaign-info"><div className="card-top"><span className="pill">{campaign.category}</span><span className="score">● {campaign.score || "New"} {campaign.score ? "score" : "campaign"}</span></div><h3>{campaign.name}</h3><p>{campaign.description}</p><div className="progress"><div style={{ width: `${Math.min(campaign.raised / campaign.goal * 100, 100)}%` }} /></div><div className="amount-row"><strong><Money value={campaign.raised} /></strong><span>of <Money value={campaign.goal} /> goal</span><span className="supporters">{campaign.supporters} supporters</span></div><div className="card-bottom"><span>◉ Base Sepolia · USDC</span><button className="primary small" onClick={() => onOpen(campaign.id)}>Contribute →</button></div></div></article>)}</div></section>
    <section className="trust-strip"><div><b>On-chain</b><span>Funds are publicly traceable</span></div><div><b>Evidence-backed</b><span>Every expense has proof</span></div><div><b>Human verified</b><span>AI supports expert review</span></div></section>
  </>;
}

function Campaign({ campaign, donation, setDonation, connected, donate, receipt, onBack, onTrace }: { campaign: CampaignData; donation: number; setDonation: (n: number) => void; connected: boolean; donate: (e: FormEvent) => void; receipt: boolean; onBack: () => void; onTrace: () => void }) {
  return <section className="page section"><button className="back" onClick={onBack}>← Back to campaigns</button><div className="campaign-head"><div><p className="eyebrow">{campaign.category.toUpperCase()} · {campaign.location.toUpperCase()}</p><h1>{campaign.name}</h1><p>{campaign.description}</p></div><div className="transparency"><span>Transparency score</span><b>{campaign.score || "—"}</b>{campaign.score > 0 && <><small>/100</small><p>Excellent</p></>}</div></div><div className="campaign-grid"><div><section className="stats"><div><span>Raised</span><b><Money value={campaign.raised} /></b><small>of <Money value={campaign.goal} /> goal</small></div><div><span>Contributors</span><b>{campaign.supporters}</b><small>people supporting this</small></div><div><span>Token accepted</span><b>USDC</b><small>Base Sepolia</small></div></section>{campaign.id === "school" ? <><section className="panel"><div className="panel-heading"><div><p className="eyebrow">Fund flow</p><h2>Where funds are going</h2></div><span className="chain-label">◉ On-chain</span></div><div className="flow"><div><b><Money value={campaign.raised} /></b><span>Donated</span></div><i>→</i><div><b>$6,020</b><span>Committed</span></div><i>→</i><div><b>$1,840</b><span>Verified</span></div><i>→</i><div><b>$1,840</b><span>Released</span></div></div></section><section className="panel"><div className="panel-heading"><div><p className="eyebrow">Milestones</p><h2>Progress, tied to proof</h2></div></div><div className="milestones">{milestones.map((m, i) => <div className="milestone" key={m.name}><span className={`step ${m.tone}`}>{m.tone === "done" ? "✓" : i + 1}</span><div><b>{m.name}</b><small>{m.state} · <Money value={m.spent} /> of <Money value={m.amount} /></small></div><div className="mini-progress"><i style={{ width: `${m.spent / m.amount * 100}%` }} /></div><span className={`status ${m.tone}`}>{m.state}</span></div>)}</div></section><section className="panel"><div className="panel-heading"><div><p className="eyebrow">Verified expenses</p><h2>Evidence you can inspect</h2></div><button className="text-button">View all →</button></div><div className="expenses">{expenses.map(e => <div className="expense" key={e.label}><div className="file-icon">⌁</div><div><b>{e.label}</b><small>{e.vendor} · Evidence CID: {e.cid}</small></div><strong>{e.amount}</strong><span className={`status ${e.risk === "HIGH" ? "danger" : "done"}`}>{e.status}</span><button className="icon-button" aria-label="Open evidence">↗</button></div>)}</div></section></> : <section className="panel empty-state"><span>◌</span><h2>This campaign is ready for support</h2><p>Its first milestone and evidence trail will appear after the campaign manager publishes them.</p></section>}</div><aside className="donation-panel"><p className="eyebrow">Contribute with USDC</p><h2>Support this campaign.</h2>{receipt ? <div className="receipt"><span className="success-icon">✓</span><h3>Payment confirmed</h3><p><b><Money value={donation} /> USDC</b> was contributed to <b>{campaign.name}</b>.</p><code>Base Sepolia · recorded on-chain</code><button className="primary full" onClick={onTrace}>Open transaction history →</button></div> : <form onSubmit={donate}><label>Amount in USDC</label><div className="input-wrap"><span>$</span><input type="number" min="1" value={donation} onChange={e => setDonation(Number(e.target.value))} /></div><div className="quick-amounts">{[25, 50, 100, 250].map(n => <button type="button" className={n === donation ? "active" : ""} key={n} onClick={() => setDonation(n)}>${n}</button>)}</div><div className="donation-note"><span>⌁</span><p>Pay in test USDC. You will get a clear payment receipt and see this transaction in My Trace.</p></div><button className="primary full" type="submit">{connected ? `Pay ${donation} USDC` : "Connect wallet to continue"} →</button><small className="form-foot">◉ Base Sepolia · Testnet only</small></form>}</aside></div></section>;
}

function Trace({ transactions, onCampaign }: { transactions: Transaction[]; onCampaign: () => void }) {
  const [selected, setSelected] = useState(transactions[0]?.id);
  const active = transactions.find((transaction) => transaction.id === selected) ?? transactions[0];
  return <section className="page section trace"><p className="eyebrow">MY TRACE</p><h1>Your contribution <em>history.</em></h1><p className="lead">Like your payment history, but every contribution tells you what campaign received it, which token was used, and where to verify it.</p><div className="history-layout"><section className="history-list"><div className="history-summary"><span>Total given</span><b><Money value={transactions.reduce((sum, transaction) => sum + transaction.amount, 0)} /></b><small>{transactions.length} payments · USDC on Base Sepolia</small></div><h2>Recent activity</h2>{transactions.map((transaction) => <button className={`transaction ${selected === transaction.id ? "active" : ""}`} key={transaction.id} onClick={() => setSelected(transaction.id)}><span className="transaction-icon">↑</span><span className="transaction-copy"><b>Paid to {transaction.campaign}</b><small>{transaction.date} · {transaction.status}</small></span><span className="transaction-amount"><b>−{transaction.amount} {transaction.token}</b><small>≈ ${transaction.amount}.00</small></span></button>)}</section>{active && <section className="payment-detail"><div className="detail-token"><span>USDC</span><b>−{active.amount}.00</b><small>USD Coin · Base Sepolia</small></div><div className="payment-status"><span className="success-icon">✓</span><div><b>{active.status}</b><small>{active.date}</small></div></div><dl><div><dt>Paid to</dt><dd>{active.campaign}</dd></div><div><dt>Purpose</dt><dd>{active.note}</dd></div><div><dt>Network</dt><dd>Base Sepolia</dd></div><div><dt>Transaction ID</dt><dd><code>{active.hash}</code></dd></div></dl><button className="primary full" onClick={onCampaign}>View campaign & fund use →</button><button className="detail-link">↗ View on block explorer</button></section>}</div></section>;
}

function CreateCampaign({ onClose, onCreate }: { onClose: () => void; onCreate: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="modal-backdrop" role="presentation"><section className="create-modal" role="dialog" aria-modal="true" aria-label="Create campaign"><div className="panel-heading"><div><p className="eyebrow">CAMPAIGN MANAGER</p><h2>Create a campaign</h2></div><button className="icon-button close" onClick={onClose}>×</button></div><p className="modal-copy">Start with a clear goal. You can add milestones and evidence after creating the campaign.</p><form onSubmit={onCreate}><label>Campaign name<input name="name" placeholder="e.g. Restore a local playground" required /></label><div className="form-grid"><label>Category<select name="category"><option>Community</option><option>Education</option><option>Health</option><option>Water</option></select></label><label>Fundraising goal (USDC)<input name="goal" type="number" min="1" placeholder="5000" required /></label></div><label>Location<input name="location" placeholder="City, country" required /></label><label>What will this fund?<textarea name="description" placeholder="Describe the real-world outcome donors will help make possible." required /></label><button className="primary full" type="submit">Create campaign →</button></form></section></div>;
}

function Verifier({ reviewed, setReviewed }: { reviewed: boolean; setReviewed: (value: boolean) => void }) { const result = reviewed ? "APPROVED" : "BLOCK RECOMMENDED"; return <section className="page section verifier"><div className="verifier-head"><div><p className="eyebrow">VERIFIER CONSOLE</p><h1>Evidence review queue</h1><p>AI findings are advisory. Your decision controls whether funds become eligible for release.</p></div><span className="queue">1 pending review</span></div><div className="review-grid"><section className="invoice"><div className="paper"><p>NEXA MATERIALS</p><small>GSTIN: 27AADCN4093D1Z8</small><hr/><h3>TAX INVOICE</h3><div className="paper-row"><span>Steel beams (12)</span><b>₹79,840</b></div><div className="paper-row"><span>GST</span><b>₹14,371</b></div><hr/><div className="paper-total"><span>Total</span><b>₹94,211</b></div><small>Invoice #NM-2026-0817</small></div><p className="file-meta">Invoice.pdf · 1.2 MB · SHA-256: 3a7c…98f1</p><button className="outline full">↗ Open IPFS evidence</button></section><section className="findings"><div className="panel-heading"><div><p className="eyebrow">AI verification</p><h2>{reviewed ? "Review recorded" : "Risk signals detected"}</h2></div><span className={reviewed ? "status done" : "status danger"}>{reviewed ? "APPROVED" : "HIGH RISK"}</span></div><div className="metric-row"><div><span>Amount found</span><b>₹79,840</b></div><div><span>Claimed amount</span><b>₹80,000</b></div><div><span>Consistency</span><b>94%</b></div></div>{!reviewed && <div className="alerts"><div><span>!</span><div><b>Duplicate evidence detected</b><p>93% match with invoice NM-2026-0712 previously submitted to a different campaign.</p></div></div><div><span>!</span><div><b>Milestone budget exceeded</b><p>Claim would put Construction at 112% of its approved budget.</p></div></div></div>}<div className="recommendation"><span>AI recommendation</span><b>{result}</b><p>{reviewed ? "Approval was recorded to the campaign evidence registry." : "Do not release funds until the campaign manager provides corrected evidence."}</p></div>{!reviewed && <div className="decision"><button className="danger-button" onClick={() => setReviewed(true)}>Approve with exception</button><button className="primary" onClick={() => setReviewed(true)}>Reject evidence</button></div>}</section></div></section>; }
