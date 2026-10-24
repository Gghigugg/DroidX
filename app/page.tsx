"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowDownRight, ArrowUpRight, Bot, CalendarDays, CheckCircle2, ChevronDown, CircleHelp, Command, Filter, Instagram, LayoutDashboard, MessageCircle, MoreHorizontal, Plus, Search, Send, ShieldCheck, Sparkles, Users, Workflow } from "lucide-react";
import { AGENTS } from "@/src/agents/registry";

const tasks = [
  { id: "TASK-1042", title: "Draft replies for 8 new comments", agent: "Comment Reply Specialist", status: "approval-required", type: "Community", time: "2 min ago" },
  { id: "TASK-1041", title: "Research emerging reel formats", agent: "Trend Researcher", status: "running", type: "Research", time: "6 min ago" },
  { id: "TASK-1040", title: "Prepare next week’s content calendar", agent: "Content Calendar Agent", status: "pending", type: "Planning", time: "11 min ago" },
  { id: "TASK-1039", title: "Summarize last 7 days’ performance", agent: "Analytics Agent", status: "completed", type: "Analytics", time: "18 min ago" }
];

const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "AI Team", icon: Bot },
  { label: "Task Center", icon: Workflow },
  { label: "Inbox", icon: MessageCircle },
  { label: "Content Calendar", icon: CalendarDays },
  { label: "Analytics", icon: Activity }
];

function Status({ status }: { status: string }) {
  const labels: Record<string, string> = { "approval-required": "Needs approval", running: "Running", pending: "Queued", completed: "Completed", failed: "Failed" };
  return <span className={"status " + status}><i />{labels[status] ?? status}</span>;
}

export default function Dashboard() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => tasks.filter(t => (t.title + t.agent + t.status).toLowerCase().includes(query.toLowerCase())), [query]);
  const [showAll, setShowAll] = useState(false);
  return <main className="shell">
    <aside className="sidebar glass">
      <a className="brand" href="#"><span className="brand-mark"><Sparkles size={19}/></span><span>IG Agent <b>OS</b><small>CREATOR OPERATIONS</small></span></a>
      <div className="workspace"><div className="workspace-icon">S</div><div><strong>Creator Workspace</strong><small>Personal workspace</small></div><ChevronDown size={15}/></div>
      <div className="nav-label">WORKSPACE</div>
      {nav.map(item => <button key={item.label} className={"nav-item " + (active === item.label ? "selected" : "")} onClick={() => setActive(item.label)}><item.icon size={18}/><span>{item.label}</span>{item.label === "Task Center" && <em>4</em>}</button>)}
      <div className="sidebar-bottom"><div className="connection"><span className="connection-dot"/><div><b>Instagram not connected</b><small>Demo mode · no live actions</small></div></div><button className="help"><CircleHelp size={17}/> Help & setup</button><div className="user"><div className="avatar">S</div><div><b>Workspace owner</b><small>Free plan · local preview</small></div><MoreHorizontal size={17}/></div></div>
    </aside>
    <section className="main-area">
      <header className="topbar"><div className="crumb">Workspace <span>/</span> <b>{active}</b></div><div className="top-actions"><span className="demo-tag"><span/> DEMO DATA</span><button className="icon-btn"><Search size={17}/></button><button className="icon-btn"><Command size={17}/></button><div className="avatar small">S</div></div></header>
      <div className="content">
        <div className="welcome"><div><div className="eyebrow"><span className="live-dot"/> YOUR AI OPERATIONS CENTER</div><h1>{active === "Overview" ? "Good work starts with clarity." : active}</h1><p>One manager. 25 specialists. You stay in control.</p></div><div className="welcome-actions"><Link className="primary" href="/tasks"><Plus size={17}/> Plan a task</Link><Link className="outline" href="/agents">Explore AI team</Link></div></div>
        <div className="notice"><ShieldCheck size={19}/><div><b>Human-supervised by design</b><span>Agents can plan and draft. Sending, publishing, and account changes require approval.</span></div><button aria-label="Dismiss notice" onClick={e => e.currentTarget.parentElement?.remove()}>×</button></div>
        <div className="metrics">
          <article className="metric glass"><div className="metric-top"><span>Active agents</span><span className="metric-icon"><Bot size={17}/></span></div><div className="metric-value">26 <small>/ 26</small></div><div className="metric-foot"><span className="neutral">Roster configured</span><span>Chief + 25</span></div></article>
          <article className="metric glass"><div className="metric-top"><span>Tasks in progress</span><span className="metric-icon"><Workflow size={17}/></span></div><div className="metric-value">1</div><div className="metric-foot"><span className="up"><ArrowUpRight size={13}/> Queue active</span><span>Demo only</span></div></article>
          <article className="metric glass"><div className="metric-top"><span>Needs your review</span><span className="metric-icon review"><ShieldCheck size={17}/></span></div><div className="metric-value">1</div><div className="metric-foot"><span className="neutral">Approval gate</span><span>Draft only</span></div></article>
          <article className="metric glass"><div className="metric-top"><span>Published this week</span><span className="metric-icon"><Instagram size={17}/></span></div><div className="metric-value">—</div><div className="metric-foot"><span className="neutral">No account linked</span><span>Not available</span></div></article>
        </div>
        <div className="section-title"><div><h2>Task center</h2><p>Monitor the work your AI team is handling.</p></div><button className="text-btn" onClick={() => setShowAll(v => !v)}>{showAll ? "Show summary" : "View all tasks"} <ArrowDownRight size={15}/></button></div>
        <div className="task-panel glass"><div className="task-toolbar"><div className="tabs"><button className="tab active">All tasks <span>4</span></button><button className="tab">Approvals <span>1</span></button></div><div className="task-tools"><label><Search size={15}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tasks"/></label><button className="icon-btn"><Filter size={16}/></button></div></div>
          <div className="task-list">{(showAll ? filtered : filtered.slice(0,4)).map(task => <article className="task-row" key={task.id}><div className="task-type">{task.type === "Community" ? <MessageCircle size={17}/> : task.type === "Research" ? <Sparkles size={17}/> : task.type === "Analytics" ? <Activity size={17}/> : <CalendarDays size={17}/>}</div><div className="task-main"><b>{task.title}</b><span>{task.id} · {task.agent}</span></div><Status status={task.status}/><span className="task-time">{task.time}</span><button className="row-menu" aria-label={"More options for " + task.id}><MoreHorizontal size={18}/></button></article>)}</div>
          <div className="task-foot"><span><CheckCircle2 size={15}/> Task history is audit-ready</span><span>Sample records · no actions sent</span></div>
        </div>
        <div className="bottom-grid"><section className="team-panel glass"><div className="section-title compact"><div><h2>Your AI team</h2><p>Specialists ready for supervised tasks.</p></div><button className="icon-btn" onClick={() => setActive("AI Team")}><ArrowUpRight size={16}/></button></div><div className="agent-preview">{AGENTS.slice(0,5).map((a,i)=><div className="agent-mini" key={a.id}><div className={"agent-icon tone-"+(i%5)}><Bot size={17}/></div><div><b>{a.name}</b><span>{a.specialty}</span></div><span className="agent-state">Ready</span></div>)}</div><button className="outline wide" onClick={() => setActive("AI Team")}>Explore all 26 agents</button></section>
        <section className="quick-panel glass"><div className="section-title compact"><div><h2>Quick actions</h2><p>Start with a supervised workflow.</p></div></div><button className="quick-action" onClick={() => setShowAll(true)}><span className="quick-icon"><MessageCircle size={17}/></span><span><b>Review reply drafts</b><small>Check responses before sending</small></span><ArrowUpRight size={16}/></button><button className="quick-action" onClick={() => setActive("Content Calendar")}><span className="quick-icon"><CalendarDays size={17}/></span><span><b>Plan upcoming content</b><small>Organize ideas into a calendar</small></span><ArrowUpRight size={16}/></button><button className="quick-action" onClick={() => setActive("Analytics")}><span className="quick-icon"><Activity size={17}/></span><span><b>Review performance</b><small>Understand what is working</small></span><ArrowUpRight size={16}/></button><button className="quick-action" onClick={() => setActive("Inbox")}><span className="quick-icon"><Send size={17}/></span><span><b>Open message workspace</b><small>Connect account during setup</small></span><ArrowUpRight size={16}/></button></section></div>
        <footer className="footer"><span>IG Agent OS <b>·</b> Private by design</span><span>Prototype v0.1 <b>·</b> Live integrations not configured</span></footer>
      </div>
    </section>
  </main>;
}
