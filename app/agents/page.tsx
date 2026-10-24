"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Bot, CheckCircle2, Search, ShieldCheck, Sparkles } from "lucide-react";
import { AGENTS } from "@/src/agents/registry";

const groups = ["All", "management", "community", "research", "content", "growth", "business", "governance"] as const;

export default function AgentsPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<(typeof groups)[number]>("All");
  const filtered = useMemo(() => AGENTS.filter(a =>
    (group === "All" || a.group === group) &&
    (a.name + " " + a.specialty + " " + a.description).toLowerCase().includes(query.toLowerCase())
  ), [query, group]);
  return <main className="directory-shell">
    <header className="directory-header"><Link href="/" className="back-link"><ArrowLeft size={16}/> Dashboard</Link><div className="directory-brand"><span><Sparkles size={18}/></span><div><b>IG Agent OS</b><small>AGENT DIRECTORY</small></div></div><span className="demo-pill">ROSTER PREVIEW</span></header>
    <section className="directory-intro"><div className="eyebrow"><Bot size={14}/> MULTI-AGENT WORKSPACE</div><h1>Your AI team, at a glance.</h1><p>One Chief Manager coordinates 25 specialist agents. Each role has a clear responsibility and review boundary.</p><div className="directory-stats"><div><b>{AGENTS.length}</b><span>Total agents</span></div><div><b>1</b><span>Chief manager</span></div><div><b>{AGENTS.filter(a=>a.requiresApproval).length}</b><span>Review-gated roles</span></div></div></section>
    <section className="directory-controls"><label className="directory-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search agent or specialty…"/></label><div className="group-filters">{groups.map(g=><button key={g} onClick={()=>setGroup(g)} className={group===g?"chosen":""}>{g==="All"?"All roles":g.replace("-", " ")}</button>)}</div></section>
    <section className="agent-grid">{filtered.map((agent,index)=><article className="agent-card" key={agent.id}><div className="agent-card-top"><span className={"agent-card-icon icon-"+(index%5)}><Bot size={19}/></span><span className="agent-number">{String(index+1).padStart(2,"0")}</span></div><h2>{agent.name}</h2><span className="agent-specialty">{agent.specialty}</span><p>{agent.description}</p><div className="agent-card-foot"><span className="group-tag">{agent.group}</span>{agent.requiresApproval?<span className="review-tag"><ShieldCheck size={12}/> Review required</span>:<span className="ready-tag"><CheckCircle2 size={12}/> Draft / research</span>}</div></article>)}</section>
    {filtered.length===0&&<div className="empty-state">No agents match this search.</div>}
    <footer className="directory-footer"><span>IG Agent OS · Human-supervised by design</span><Link href="/tasks">Open task planner →</Link></footer>
  </main>;
}
