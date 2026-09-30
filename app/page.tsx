"use client";

import { useEffect, useMemo, useState } from "react";

type Category = { name: string; share: number; margin: number; revenue: string; trend: number };
type Store = { name: string; visits: string; quotes: string; conversion: number; revenue: string; gm: number };
type PriceRow = { item: string; category: string; price: string; median: string; pci: number; signal: string };

const categories: Category[] = [
  { name: "Tiles", share: 31.8, margin: 28.4, revenue: "₹58.0L", trend: 8.2 },
  { name: "Laminates", share: 24.6, margin: 29.7, revenue: "₹44.9L", trend: 14.6 },
  { name: "Wall Panels", share: 16.9, margin: 36.1, revenue: "₹30.8L", trend: 18.1 },
  { name: "Quartz", share: 13.1, margin: 34.8, revenue: "₹23.9L", trend: 5.4 },
  { name: "Flooring", share: 8.7, margin: 30.2, revenue: "₹15.9L", trend: 2.7 },
  { name: "Boards & Edgebands", share: 4.9, margin: 33.6, revenue: "₹8.9L", trend: 11.3 },
];

const stores: Store[] = [
  { name: "Indiranagar", visits: "1,842", quotes: "412", conversion: 22.4, revenue: "₹38.6L", gm: 31.2 },
  { name: "HSR Layout", visits: "1,615", quotes: "367", conversion: 22.7, revenue: "₹34.9L", gm: 32.8 },
  { name: "Whitefield", visits: "1,504", quotes: "326", conversion: 21.7, revenue: "₹31.5L", gm: 30.1 },
  { name: "Koramangala", visits: "1,336", quotes: "318", conversion: 23.8, revenue: "₹29.8L", gm: 34.0 },
  { name: "Jayanagar", visits: "1,190", quotes: "254", conversion: 21.3, revenue: "₹24.6L", gm: 29.4 },
];

const prices: PriceRow[] = [
  { item: "Lamina Oak 08", category: "Laminates", price: "₹1,249", median: "₹1,149", pci: 1.09, signal: "Review" },
  { item: "Urban Stone Grey", category: "Tiles", price: "₹118/sqft", median: "₹112/sqft", pci: 1.05, signal: "Review" },
  { item: "Linea Walnut", category: "Wall Panels", price: "₹189/sqft", median: "₹205/sqft", pci: 0.92, signal: "Protect" },
  { item: "Carrara Soft", category: "Quartz", price: "₹395/sqft", median: "₹410/sqft", pci: 0.96, signal: "Protect" },
  { item: "Terrazzo Sand", category: "Tiles", price: "₹96/sqft", median: "₹101/sqft", pci: 0.95, signal: "Test" },
  { item: "Sierra Ash", category: "Laminates", price: "₹1,095", median: "₹1,070", pci: 1.02, signal: "Monitor" },
];

const navItems = [
  ["overview", "Overview"], ["pricing", "Pricing"], ["categories", "Categories"],
  ["stores", "Experience Centres"], ["funnel", "Funnel"], ["analyst", "AI Analyst"],
  ["methodology", "Methodology"],
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    tag: "M4 5.5V10l9.5 9.5 5-5L9 5H4zM7.5 8A.5.5 0 1 0 7.5 7a.5.5 0 0 0 0 1z",
    layers: "M12 4 21 9l-9 5-9-5 9-5zm-9 9 9 5 9-5m-18 5 9 5 9-5",
    store: "M4 10v10h16V10M3 10l2-6h14l2 6M8 10v10M16 10v10",
    funnel: "M4 5h16l-6 7v6l-4 2v-8L4 5z",
    spark: "M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z",
    book: "M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4zm0 0v13a3 3 0 0 0 3 3",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
    search: "m20 20-4.5-4.5M9.5 17a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z",
    chevron: "m6 9 6 6 6-6",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    user: "M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] ?? paths.grid} /></svg>;
}

function Bar({ value, max = 100 }: { value: number; max?: number }) {
  return <div className="bar"><i style={{ width: `${Math.min(100, (value / max) * 100)}%` }} /></div>;
}

export default function Home() {
  const [period, setPeriod] = useState("6M");
  const [category, setCategory] = useState("All categories");
  const [selectedStore, setSelectedStore] = useState("Jayanagar");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const sections = navItems.map(([id]) => document.getElementById(id));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0.05, 0.25, 0.5] });
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const filteredPrices = useMemo(() => {
    const term = search.trim().toLowerCase();
    return prices.filter(p => (category === "All categories" || p.category === category) && (!term || [p.item,p.category,p.signal].join(" ").toLowerCase().includes(term)));
  }, [category, search]);

  const selected = stores.find(s => s.name === selectedStore) ?? stores[0];

  function askAnalyst() {
    if (!query.trim()) return;
    const answer = query.toLowerCase().includes("margin")
      ? "In the demo model, gross margin is up 1.4 pp. The main modeled driver is mix: wall panels carry a higher margin profile while deep-discount orders reduced."
      : query.toLowerCase().includes("price")
      ? "Start with high-volume SKUs above 1.05x PCI and below their category margin benchmark. Test a small cohort before a broad revision."
      : query.toLowerCase().includes("store") || query.toLowerCase().includes("jayanagar")
      ? "Jayanagar is the first diagnostic candidate in this model: lowest quote conversion at 21.3% and 29.4% GM. Review follow-up time, product availability and objections."
      : "For this demo, I would trace the question from metric → segment → driver → operational action, then validate the hypothesis with the relevant internal dataset.";
    setQuery("");
    window.setTimeout(() => window.alert(answer), 10);
  }

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brandBlock">
          <div className="brandMark">MD</div>
          <div><div className="brand">Material Depot</div><div className="brandSub">INTELLIGENCE HUB</div></div>
        </div>
        <div className="workspaceLabel">WORKSPACE</div>
        <nav className="nav">
          {navItems.map(([id,label], i) => <a key={id} className={activeSection === id ? "active" : ""} href={`#${id}`}><Icon name={["grid","tag","layers","store","funnel","spark","book"][i]} /><span>{label}</span>{id === "analyst" && <em>AI</em>}</a>)}
        </nav>
        <div className="sideBottom">
          <button className="demoButton" onClick={() => setProfileOpen(true)}><div className="avatar">PA</div><div className="person"><b>Pranavi Addanki</b><small>Business Analyst · Demo</small></div><Icon name="chevron" /></button>
          <div className="demoNote">Portfolio workspace<br/>Data is simulated for demonstration.</div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="crumb"><span>Workspace</span><b>/</b><strong>Business Intelligence</strong></div>
          <div className="topActions">
            <div className="searchBox"><Icon name="search" /><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search SKUs, categories..." /></div>
            <button className="iconButton" aria-label="Notifications" onClick={()=>setNotificationsOpen(v=>!v)}><Icon name="bell" /><span className="notificationDot"/></button>
            <button className="profileMini" onClick={()=>setProfileOpen(true)}><span>PA</span><Icon name="chevron" /></button>
          </div>
          {notificationsOpen && <div className="popover notificationPanel"><b>3 items need review</b><span>12 SKUs are above modeled competitor median.</span><span>Jayanagar quote conversion is the lowest.</span><span>Laminates discount depth needs investigation.</span></div>}
        </header>

        <section className="hero" id="overview">
          <div>
            <div className="eyebrow">Retail analytics · Bengaluru · self-initiated case study</div>
            <h1>A decision layer for<br/><i>home-interior retail.</i></h1>
            <p>Turn pricing, category, store and funnel signals into a short list of decisions a commercial team can actually act on.</p>
            <div className="heroActions"><a className="primaryBtn" href="#pricing">Explore pricing <Icon name="arrow"/></a><a className="textBtn" href="#methodology">View methodology</a></div>
          </div>
          <div className="heroAside">
            <div className="demoBadge"><span/> DEMO DATA · SIMULATED</div>
            <div className="heroQuestion">Five questions.<br/><strong>One operating view.</strong></div>
            <div className="questionList"><span>01 Pricing</span><span>02 Category mix</span><span>03 Store funnel</span><span>04 Diagnosis</span><span>05 Action</span></div>
          </div>
        </section>

        <section className="controlRow">
          <div className="periods">{["1M","3M","6M","12M"].map(p=><button key={p} className={period===p?"selected":""} onClick={()=>setPeriod(p)}>{p}</button>)}</div>
          <div className="controlHint">Showing modeled performance · <b>{period}</b> window</div>
          <button className="exportBtn" onClick={()=>window.alert("Demo export: in a production build this would generate a CSV/Excel snapshot.")}>Export snapshot</button>
        </section>

        <section className="kpiGrid">
          {[["Revenue","₹182.4L","+11.8%","vs prior period"],["Gross margin","31.6%","+1.4 pp","vs prior period"],["AOV","₹46,280","+6.2%","vs prior period"],["Order conversion","8.7%","+0.8 pp","vs prior period"]].map(k=><div className="kpiCard" key={k[0]}><div className="kpiLabel">{k[0]}</div><div className="kpiValue">{k[1]}</div><div className="kpiDelta">↑ {k[2]} <span>{k[3]}</span></div><div className="sparkline"><i/><i/><i/><i/><i/><i/></div></div>)}
        </section>

        <section className="sectionBlock" id="categories">
          <div className="sectionHead"><div><span className="sectionNo">01</span><h2>Category pulse</h2><p>Where revenue is coming from — and where margin quality is changing.</p></div><select value={category} onChange={e=>setCategory(e.target.value)}><option>All categories</option>{categories.map(c=><option key={c.name}>{c.name}</option>)}</select></div>
          <div className="categoryGrid">{categories.map(c=><button key={c.name} className={category===c.name?"categoryCard selected": "categoryCard"} onClick={()=>setCategory(category===c.name?"All categories":c.name)}><div className="categoryTop"><span>{c.name}</span><b>+{c.trend}%</b></div><div className="categoryRevenue">{c.revenue}</div><Bar value={c.share} max={35}/><div className="categoryMeta"><span>{c.share}% revenue share</span><span>{c.margin}% margin</span></div></button>)}</div>
          <div className="insightStrip"><span className="tag">READ</span><b>Wall Panels</b> show the strongest modeled growth and margin profile. <span>Use the category cards to filter the pricing view below.</span></div>
        </section>

        <section className="sectionBlock" id="pricing">
          <div className="sectionHead"><div><span className="sectionNo">02</span><h2>Pricing intelligence</h2><p>Find where price position and margin quality are pulling in different directions.</p></div><div className="legend"><span className="legendDot green"/> protect <span className="legendDot amber"/> review <span className="legendDot red"/> investigate</div></div>
          <div className="pricingLayout">
            <div className="tableCard">
              <div className="tableToolbar"><b>{filteredPrices.length} comparable items</b><span>PCI = MD price ÷ simulated competitor median</span></div>
              <table className="dataTable"><thead><tr><th>Item</th><th>Category</th><th>MD price</th><th>Comp. median</th><th>PCI</th><th>Action</th></tr></thead><tbody>{filteredPrices.map(p=><tr key={p.item}><td><b>{p.item}</b><small>Comparable SKU · modeled</small></td><td>{p.category}</td><td>{p.price}</td><td>{p.median}</td><td><span className={`pci ${p.pci>1.05?"high":p.pci<0.98?"low":"mid"}`}>{p.pci.toFixed(2)}x</span></td><td><span className={`signal ${p.signal.toLowerCase()}`}>{p.signal}</span></td></tr>)}</tbody></table>
            </div>
            <div className="pricingCard"><span className="miniLabel">OPPORTUNITY MATRIX</span><h3>Price is a lever,<br/><i>not the strategy.</i></h3><div className="matrix"><span className="axis y">Margin →</span><div className="quadrant q1">Protect<br/><small>healthy margin<br/>competitive price</small></div><div className="quadrant q2">Review<br/><small>price gap<br/>needs testing</small></div><div className="quadrant q3">Fix<br/><small>low margin<br/>high price</small></div><div className="quadrant q4">Test<br/><small>volume upside<br/>possible</small></div><span className="axis x">Price position →</span></div><p>Start with high-volume items in the “Review” zone. Test a cohort, then measure conversion and contribution margin together.</p></div>
          </div>
        </section>

        <section className="sectionBlock" id="stores">
          <div className="sectionHead"><div><span className="sectionNo">03</span><h2>Experience centre intelligence</h2><p>Move from store averages to the specific operating question behind them.</p></div></div>
          <div className="storeLayout">
            <div className="storeList">{stores.map(s=><button key={s.name} className={selectedStore===s.name?"storeRow selected":"storeRow"} onClick={()=>setSelectedStore(s.name)}><span className="storeName">{s.name}</span><span>{s.revenue}</span><span>{s.conversion}%</span><span className="rowArrow">→</span></button>)}</div>
            <div className="storeDetail"><div className="detailHeader"><div><span className="miniLabel">SELECTED CENTRE</span><h3>{selected.name}</h3></div><span className="statusPill">{selected.conversion < 22 ? "Needs investigation" : "On track"}</span></div><div className="detailMetrics"><div><small>Visits</small><b>{selected.visits}</b></div><div><small>Quotes</small><b>{selected.quotes}</b></div><div><small>Quote conversion</small><b>{selected.conversion}%</b></div><div><small>Gross margin</small><b>{selected.gm}%</b></div></div><div className="storeFunnel"><div><span>Visits</span><Bar value={100}/></div><div><span>Consultations</span><Bar value={54}/></div><div><span>Quotes</span><Bar value={selected.conversion} max={100}/></div><div><span>Orders</span><Bar value={42}/></div></div><div className="detailCallout"><b>Suggested investigation</b><p>Pair this metric with BM notes: follow-up SLA, product availability, quote revisions and common client objections.</p></div></div>
          </div>
        </section>

        <section className="sectionBlock" id="funnel">
          <div className="sectionHead"><div><span className="sectionNo">04</span><h2>Funnel leak detector</h2><p>A metric tells you where the drop is. The operating context tells you why.</p></div></div>
          <div className="funnelVisual">{[["Visitor","100%"],["Consult","54%"],["Lead","34%"],["Quote","24%"],["Order","10%"]].map((x,i)=><div className="funnelStep" key={x[0]}><div className="funnelBar" style={{height:`${Math.max(28,Number(x[1].replace("%",""))/2)}px`}}/><b>{x[1]}</b><span>{x[0]}</span>{i<4&&<small>↓</small>}</div>)}</div>
          <div className="funnelGrid"><div className="analysisCard"><span className="tag danger">LARGEST DROP</span><h3>Quote → order</h3><p>The modeled funnel loses the most volume after a quote is issued. Do not assume price is the cause.</p><div className="causeList"><span>Follow-up delay <b>?</b></span><span>Availability mismatch <b>?</b></span><span>Competitor comparison <b>?</b></span><span>Quote complexity <b>?</b></span></div></div><div className="analysisCard"><span className="tag">NEXT CALL</span><h3>Ask the store BM</h3><p>“What changed between quote creation and order confirmation this week?”</p><div className="quote">Ground-level context turns a dashboard signal into a testable hypothesis.</div></div></div>
        </section>

        <section className="sectionBlock analystSection" id="analyst">
          <div className="sectionHead"><div><span className="sectionNo">05</span><h2>AI analyst workspace</h2><p>A restrained analyst copilot — grounded in the demo metrics, not a generic chatbot.</p></div><span className="aiMark">AI · EVIDENCE MODE</span></div>
          <div className="analystGrid"><div className="aiIntro"><div className="orb"><Icon name="spark"/></div><h3>Ask a business question.</h3><p>Try “Why did margin move?”, “Where should pricing look?” or “Which store needs investigation?”</p><div className="promptChips">{["Why did margin move?","Where should pricing look?","Which store needs investigation?"].map(q=><button key={q} onClick={()=>setQuery(q)}>{q}</button>)}</div><div className="aiInput"><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAnalyst()} placeholder="Ask the analyst..." /><button onClick={askAnalyst}><Icon name="arrow"/></button></div></div><div className="evidencePanel"><div className="evidenceHead"><span>LAST ANALYSIS</span><b>Model evidence</b></div><div className="evidenceRow"><span>Finding</span><strong>Jayanagar has the lowest quote conversion.</strong></div><div className="evidenceRow"><span>Metric</span><strong>21.3% <small>vs 23.8% best centre</small></strong></div><div className="evidenceRow"><span>Hypothesis</span><strong>Follow-up, availability or objection handling.</strong></div><div className="evidenceRow"><span>Next step</span><strong>Validate with BM notes before pricing action.</strong></div></div></div>
        </section>

        <section className="sectionBlock profileSection" id="methodology">
          <div className="sectionHead"><div><span className="sectionNo">06</span><h2>Workspace & methodology</h2><p>The project should be transparent enough that an interviewer can trust the analysis.</p></div></div>
          <div className="profileGrid"><div className="profileCard"><div className="largeAvatar">PA</div><span className="miniLabel">SIGNED-IN USER</span><h3>Pranavi Addanki</h3><p>Business Analyst · Portfolio workspace</p><div className="profileStats"><span><b>7</b> views today</span><span><b>12</b> saved insights</span></div><button onClick={()=>setProfileOpen(true)}>Open profile settings →</button></div><div className="methodCard"><div className="methodRow"><b>Simulated</b><span>SKU costs, orders, store traffic, funnel events, competitor observations and financial metrics.</span></div><div className="methodRow"><b>Analyst-defined</b><span>Thresholds, benchmark weights, opportunity flags and recommended tests.</span></div><div className="methodRow"><b>To operationalise</b><span>SKU master, vendor cost, order lines, inventory, store sales, web events, leads/quotes and price snapshots.</span></div><div className="boundary">DEMO DATA · This is a self-initiated case study. It does not access Material Depot internal systems.</div></div></div>
        </section>
        <footer>Material Depot Intelligence Hub · Business Analyst case study · Built by Pranavi Addanki · Simulated data for demonstration</footer>
      </main>

      {profileOpen && <div className="modalBackdrop" onClick={()=>setProfileOpen(false)}><div className="profileModal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setProfileOpen(false)}>×</button><div className="largeAvatar">PA</div><span className="miniLabel">SIGNED-IN USER</span><h2>Pranavi Addanki</h2><p>Business Analyst · Portfolio workspace</p><div className="setting"><span>Workspace</span><b>Material Depot Intelligence Hub</b></div><div className="setting"><span>Data mode</span><b>Simulated / Demo</b></div><div className="setting"><span>Last activity</span><b>Today · 5:42 PM</b></div><button className="primaryBtn full" onClick={()=>setProfileOpen(false)}>Back to workspace</button></div></div>}
    </div>
  );
}