"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Mark(){return <div className="mdMark"><span>MD</span><i/></div>}

export default function Landing(){
 const router=useRouter(); const [entered,setEntered]=useState(false);
 const enter=()=>{setEntered(true);setTimeout(()=>router.push("/hub"),420)};
 return <main className={"landing "+(entered?"landingExit":"")}>
  <div className="landingGrid"/>
  <div className="landingTop"><div className="brandLockup"><Mark/><div><b>Material Depot</b><small>INTELLIGENCE HUB</small></div></div><span className="demoPill">PRIVATE PRODUCT PREVIEW · DEMO DATA</span></div>
  <section className="landingHero">
   <div className="landingCopy">
    <span className="overline">BUSINESS INTELLIGENCE · HOME INTERIORS</span>
    <h1>See the market.<br/><em>Decide with clarity.</em></h1>
    <p>Material Depot Intelligence Hub brings pricing, materials, suppliers and commercial signals into one decision-ready workspace.</p>
    <div className="landingCta"><button onClick={enter}>Enter Intelligence Hub <span>↗</span></button><span>Built for category, pricing &amp; retail decisions</span></div>
   </div>
   <div className="signalCanvas" aria-hidden="true">
    <div className="signalHeader"><span>LIVE INTELLIGENCE VIEW</span><b>06.24</b></div>
    <div className="signalMetric"><small>MARKET MOVEMENT</small><strong>+12.8%</strong><span>selected material index</span></div>
    <svg viewBox="0 0 520 220" preserveAspectRatio="none"><path d="M0 180 C55 176 72 143 116 154 S175 185 214 137 S273 89 315 117 S371 164 408 91 S466 52 520 30" fill="none" stroke="currentColor" strokeWidth="2.2"/><path d="M0 180 C55 176 72 143 116 154 S175 185 214 137 S273 89 315 117 S371 164 408 91 S466 52 520 30 L520 220 L0 220Z" fill="currentColor" opacity=".08"/></svg>
    <div className="signalLabels"><span>PRICE</span><span>DEMAND</span><span>SUPPLY</span></div>
    <div className="floatingNode n1">Laminates <b>+8.4%</b></div><div className="floatingNode n2">Quartz <b>+4.1%</b></div><div className="floatingNode n3">12 signals <b>need review</b></div>
   </div>
  </section>
  <section className="landingProof"><div><b>01</b><span>Market intelligence</span><small>Competitive movement, trends and signals</small></div><div><b>02</b><span>Material intelligence</span><small>Products, pricing and demand context</small></div><div><b>03</b><span>Decision workspace</span><small>Insights that lead to measurable action</small></div></section>
  <footer className="landingFooter"><span>Material Depot Intelligence Hub</span><span>Self-initiated product case study · Bengaluru</span></footer>
 </main>
}