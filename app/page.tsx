"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const stats=[["10K+","homes reached"],["1,000+","designers & architects"],["₹5M+","annualized revenue"],["01","decision layer"]];

export default function Landing(){
 const router=useRouter(); const [busy,setBusy]=useState(false);
 function enter(){setBusy(true);setTimeout(()=>router.push("/hub/dashboard"),280)}
 return <main className="newLanding">
  <nav className="landingNav"><div className="wordmark"><span className="wordmarkMark">MD</span><div><strong>material<span>depot</span></strong><small>INTELLIGENCE</small></div></div><div className="navCenter"><span>BUSINESS INTELLIGENCE</span><span>PRICING</span><span>MATERIALS</span><span>SUPPLIERS</span></div><div className="navRight"><span className="liveDot"/> PRIVATE PREVIEW <button onClick={enter}>{busy?"OPENING…":"OPEN HUB"} <b>↗</b></button></div></nav>
  <section className="landingStage">
   <div className="landingStatement"><p className="kicker">SELF-INITIATED BUSINESS ANALYTICS PRODUCT · BENGALURU</p><h1>Turn messy market signals into <i>clear decisions.</i></h1><p className="landingLead">A decision workspace designed around the questions category, pricing and retail leaders actually need to answer — not another dashboard full of charts.</p><div className="landingActions"><button className="solidCta" onClick={enter}>Enter Intelligence Hub <b>→</b></button><span>DEMO DATA · SIMULATED FOR CASE STUDY</span></div></div>
   <div className="heroConsole">
    <div className="consoleTop"><span><i className="statusLight"/> DECISION CONSOLE</span><span>LIVE MODEL · 06:24</span></div>
    <div className="consoleHeadline"><div><small>COMMERCIAL SIGNAL</small><strong>Pricing pressure</strong><span>12 collections need review</span></div><div className="consoleScore"><b>82</b><small>signal strength</small></div></div>
    <svg className="heroChart" viewBox="0 0 640 250" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#79a98b" stopOpacity=".3"/><stop offset="1" stopColor="#79a98b" stopOpacity="0"/></linearGradient></defs><path d="M0 205 C50 195 72 174 112 185 S175 213 216 157 S278 120 318 143 S368 181 414 91 S500 86 548 67 S610 38 640 24 L640 250 L0 250Z" fill="url(#area)"/><path d="M0 205 C50 195 72 174 112 185 S175 213 216 157 S278 120 318 143 S368 181 414 91 S500 86 548 67 S610 38 640 24" fill="none" stroke="#9bc4a9" strokeWidth="3"/></svg>
    <div className="consoleRows"><div><span>PRICE INDEX</span><b>108.4</b><em>+8.4%</em></div><div><span>DEMAND</span><b>HIGH</b><em>+12.1%</em></div><div><span>MARGIN QUALITY</span><b>31.6%</b><em>+1.4pp</em></div></div>
   </div>
  </section>
  <section className="landingQuestions"><div><span>01</span><b>What should we change?</b><p>Price position, margin quality and competitor movement in one view.</p></div><div><span>02</span><b>Where is the leak?</b><p>Trace store and quote conversion from signal to likely cause.</p></div><div><span>03</span><b>What happens next?</b><p>Turn evidence into a testable action, owner and follow-up.</p></div></section>
  <section className="landingStats">{stats.map(s=><div key={s[0]}><strong>{s[0]}</strong><span>{s[1]}</span></div>)}</section>
  <footer className="landingFoot"><span>Material Depot Intelligence Hub</span><span>Business Analyst case study · Bengaluru · v2</span></footer>
 </main>
}