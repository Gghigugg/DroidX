"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, ShieldCheck, Sparkles } from "lucide-react";
import { planGoal, type GoalKind } from "@/src/agents/manager";
import { AGENTS } from "@/src/agents/registry";

const goals: {id:GoalKind;title:string;description:string}[]=[
 {id:"content-plan",title:"Plan content",description:"Research, reel ideas, scripts and weekly calendar"},
 {id:"community",title:"Community workflow",description:"Triage comments, draft replies and safety review"},
 {id:"analytics",title:"Analyze performance",description:"Summarize insights and propose measurable tests"},
 {id:"brand-research",title:"Find partnerships",description:"Research brand-fit and creator collaboration leads"}
];

export default function TasksPage(){
 const [goal,setGoal]=useState<GoalKind>("content-plan");
 const [brief,setBrief]=useState("");
 const [created,setCreated]=useState(false);
 const plan=useMemo(()=>planGoal(goal),[goal]);
 return <main className="planner-shell">
  <header className="directory-header"><Link href="/" className="back-link"><ArrowLeft size={16}/> Dashboard</Link><div className="directory-brand"><span><ClipboardList size={18}/></span><div><b>Task Planner</b><small>CHIEF MANAGER WORKFLOW</small></div></div><Link className="back-link" href="/agents">Agent team →</Link></header>
  <section className="planner-intro"><div className="eyebrow"><Sparkles size={14}/> SUPERVISED WORKFLOWS</div><h1>Give the team a goal.</h1><p>Preview how the Chief Manager breaks a goal into specialist tasks. This version plans locally only; it does not save or execute tasks.</p></section>
  <div className="planner-layout"><section className="planner-panel"><h2>1. Choose a workflow</h2><div className="goal-options">{goals.map(g=><button key={g.id} className={"goal-option "+(goal===g.id?"selected":"")} onClick={()=>{setGoal(g.id);setCreated(false)}}><span><b>{g.title}</b><small>{g.description}</small></span>{goal===g.id&&<CheckCircle2 size={18}/>}</button>)}</div><h2>2. Add context (optional)</h2><textarea value={brief} onChange={e=>{setBrief(e.target.value);setCreated(false)}} placeholder="Example: Plan 5 reels for an AI photo editing page, aimed at beginners…" rows={4}/><button className="planner-primary" onClick={()=>setCreated(true)}>Preview task plan <ArrowRight size={16}/></button>{created&&<p className="planner-confirm">Plan preview generated locally. Tasks have not been saved or run.</p>}</section>
  <section className="planner-panel"><div className="plan-heading"><div><h2>Manager's task breakdown</h2><p>{plan.length} planned specialist steps</p></div><span className="plan-mark"><ShieldCheck size={17}/></span></div>{brief.trim()&&<div className="brief-preview"><b>Your brief</b><p>{brief}</p></div>}<div className="plan-list">{plan.map((task,i)=>{const agent=AGENTS.find(a=>a.id===task.assignedAgentId);return <article key={task.assignedAgentId+"-"+i} className="plan-item"><span className="step-number">{String(i+1).padStart(2,"0")}</span><div className="plan-item-main"><b>{task.title}</b><span>{agent?.name??task.assignedAgentId}</span><p>{task.reason}</p></div>{task.requiresHumanReview&&<span className="review-dot" title="Human review required"><ShieldCheck size={14}/></span>}</article>})}</div><div className="planner-note"><ShieldCheck size={16}/><span>Live DMs and publishing stay disabled. Human approval is required before public-facing actions.</span></div></section></div>
  <footer className="directory-footer"><span>Preview only · No Instagram account connected</span><Link href="/agents">Explore all agents →</Link></footer>
 </main>;
}
