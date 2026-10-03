import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard, FolderKanban, CheckSquare2, UsersRound, CalendarDays,
  BarChart3, Settings as SettingsIcon, Search, Bell, Plus, ArrowUpRight, MoreHorizontal,
  ChevronRight, Clock3, CircleCheck, Circle, ListFilter, Sparkles,
  Menu, X, Target, MessageCircle, Paperclip, Activity, Zap, Command,
  Sun, Moon, TrendingUp, Check, AlertCircle, SlidersHorizontal
} from "lucide-react";
import "./styles.css";

const projects = [
  { id:1, name:"Nexa Mobile", tag:"Product", color:"#7c5cff", progress:82, tasks:"18/22", due:"Oct 08", members:["AR","MK","JS"], status:"On track" },
  { id:2, name:"Atlas Website", tag:"Marketing", color:"#11b981", progress:64, tasks:"16/25", due:"Oct 14", members:["ST","AR","NP"], status:"On track" },
  { id:3, name:"Finova Dashboard", tag:"Engineering", color:"#f59e0b", progress:48, tasks:"12/25", due:"Oct 21", members:["MK","DV","ST"], status:"At risk" },
  { id:4, name:"Luma Campaign", tag:"Brand", color:"#ef5da8", progress:91, tasks:"20/22", due:"Oct 05", members:["NP","AR"], status:"On track" }
];

const tasksSeed = [
  {id:1,title:"Finalize onboarding flow",project:"Nexa Mobile",priority:"High",due:"Today",assignee:"AR",done:false},
  {id:2,title:"Review responsive layouts",project:"Atlas Website",priority:"Medium",due:"Tomorrow",assignee:"ST",done:true},
  {id:3,title:"Build analytics cards",project:"Finova Dashboard",priority:"High",due:"Oct 06",assignee:"MK",done:false},
  {id:4,title:"Prepare launch checklist",project:"Luma Campaign",priority:"Low",due:"Oct 07",assignee:"NP",done:false},
  {id:5,title:"QA notification states",project:"Nexa Mobile",priority:"Medium",due:"Oct 09",assignee:"JS",done:false}
];

const members = [
  {name:"Arun Raj",role:"Product Designer",initials:"AR",color:"#7c5cff",work:86},
  {name:"Maya Krish",role:"Frontend Engineer",initials:"MK",color:"#11b981",work:72},
  {name:"Sudarshan",role:"Project Manager",initials:"ST",color:"#ef5da8",work:91},
  {name:"Nithya P",role:"Marketing Lead",initials:"NP",color:"#f59e0b",work:64}
];

function Avatar({text,color="#7c5cff", small=false}) {
  return <span className={"avatar "+(small?"avatar-sm":"")} style={{background:color}}>{text}</span>
}

function Sidebar({page,setPage,mobileOpen,setMobileOpen,dark,setDark}) {
  const nav = [
    ["Overview", LayoutDashboard],
    ["Projects", FolderKanban],
    ["My Tasks", CheckSquare2],
    ["Team", UsersRound],
    ["Calendar", CalendarDays],
    ["Insights", BarChart3]
  ];
  return <aside className={"sidebar "+(mobileOpen?"open":"")}>
    <div className="brand"><div className="brand-mark"><Sparkles size={17}/></div><span>orbit</span><button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={19}/></button></div>
    <div className="workspace"><div className="workspace-logo">O</div><div><b>Orbit Studio</b><small>Product team</small></div><ChevronRight size={15}/></div>
    <nav>
      <div className="nav-label">WORKSPACE</div>
      {nav.map(([label,Icon])=><button key={label} className={"nav-item "+(page===label?"active":"")} onClick={()=>{setPage(label);setMobileOpen(false)}}><Icon size={18}/><span>{label}</span>{label==="My Tasks"&&<em>5</em>}</button>)}
      <div className="nav-label space">MANAGE</div>
      <button className={"nav-item "+(page==="Settings"?"active":"")} onClick={()=>setPage("Settings")}><SettingsIcon size={18}/><span>Settings</span></button>
    </nav>
    <div className="sidebar-bottom">
      <div className="upgrade"><div className="upgrade-icon"><Zap size={16}/></div><b>Make work flow</b><p>Unlock smart automations.</p><button>Explore Pro <ArrowUpRight size={13}/></button></div>
      <div className="profile"><Avatar text="ST" color="#ef5da8"/><div><b>Sudhasun T</b><small>Administrator</small></div><MoreHorizontal size={17}/></div>
    </div>
  </aside>
}

function Topbar({page,setMobileOpen,dark,setDark}) {
  return <header className="topbar">
    <button className="menu-btn" onClick={()=>setMobileOpen(true)}><Menu size={21}/></button>
    <div className="crumb"><span>Workspace</span><ChevronRight size={14}/><b>{page}</b></div>
    <div className="top-actions">
      <button className="search-btn"><Search size={18}/><span>Search anything</span><kbd><Command size={11}/>K</kbd></button>
      <button className="icon-btn"><Bell size={18}/><i></i></button>
      <button className="icon-btn" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
    </div>
  </header>
}

function Progress({value,color="#7c5cff"}) {
  return <div className="progress"><span style={{width:value+"%",background:color}}/></div>
}

function Overview({setPage}) {
  const [range,setRange]=useState("This week");
  return <div className="page">
    <section className="hero">
      <div><div className="eyebrow"><span className="pulse"></span> Friday, October 03, 2026</div><h1>Good morning, Sudhasun <span>✦</span></h1><p>Here’s what’s moving across your workspace today.</p></div>
      <button className="primary" onClick={()=>setPage("Projects")}><Plus size={17}/> New project</button>
    </section>
    <section className="stats-grid">
      <Stat icon={FolderKanban} label="Active projects" value="12" trend="+2" note="vs last month"/>
      <Stat icon={CheckSquare2} label="Tasks completed" value="86" trend="+18%" note="vs last week"/>
      <Stat icon={Target} label="On-time delivery" value="94%" trend="+6%" note="vs last month"/>
      <Stat icon={Clock3} label="Hours tracked" value="128h" trend="+12h" note="this week"/>
    </section>
    <section className="dashboard-grid">
      <div className="panel project-panel">
        <div className="panel-head"><div><h2>Active projects</h2><p>Keep an eye on your team's momentum.</p></div><button className="text-btn" onClick={()=>setPage("Projects")}>View all <ArrowUpRight size={14}/></button></div>
        <div className="project-list">{projects.slice(0,3).map(p=><ProjectRow key={p.id} project={p}/>)}</div>
      </div>
      <div className="panel">
        <div className="panel-head"><div><h2>Weekly velocity</h2><p>Tasks completed across the team.</p></div><select value={range} onChange={e=>setRange(e.target.value)}><option>This week</option><option>Last week</option><option>This month</option></select></div>
        <div className="chart"><div className="chart-grid">{[100,75,50,25,0].map(n=><span key={n}>{n}</span>)}</div><div className="bars">{[42,58,46,72,65,88,78].map((n,i)=><div className="bar-col" key={i}><div className="bar" style={{height:n+"%"}}></div><small>{["M","T","W","T","F","S","S"][i]}</small></div>)}</div></div>
      </div>
    </section>
    <section className="dashboard-grid lower">
      <div className="panel">
        <div className="panel-head"><div><h2>My focus</h2><p>Tasks that need your attention.</p></div><button className="icon-link" onClick={()=>setPage("My Tasks")}><ArrowUpRight size={16}/></button></div>
        <div className="focus-list">{tasksSeed.slice(0,4).map(t=><TaskRow key={t.id} task={t}/>)}</div>
      </div>
      <div className="panel activity-panel">
        <div className="panel-head"><div><h2>Recent activity</h2><p>Latest updates from your team.</p></div><Activity size={18} className="muted"/></div>
        <ActivityItem avatar="MK" color="#11b981" text={<><b>Maya</b> completed <strong>Review responsive layouts</strong></>} time="8 min ago"/>
        <ActivityItem avatar="AR" color="#7c5cff" text={<><b>Arun</b> commented on <strong>Nexa Mobile</strong></>} time="24 min ago"/>
        <ActivityItem avatar="NP" color="#f59e0b" text={<><b>Nithya</b> moved <strong>Luma Campaign</strong> to Done</>} time="1 hr ago"/>
        <ActivityItem avatar="ST" color="#ef5da8" text={<><b>You</b> created <strong>Finova Dashboard</strong></>} time="2 hrs ago"/>
      </div>
    </section>
  </div>
}

function Stat({icon:Icon,label,value,trend,note}) {
  return <div className="stat-card"><div className="stat-top"><div className="stat-icon"><Icon size={17}/></div><span className="trend"><TrendingUp size={13}/>{trend}</span></div><strong>{value}</strong><b>{label}</b><small>{note}</small></div>
}

function ProjectRow({project}) {
  return <div className="project-row"><div className="project-symbol" style={{background:project.color+"18",color:project.color}}><FolderKanban size={18}/></div><div className="project-main"><div className="row-title"><b>{project.name}</b><span className={project.status==="At risk"?"risk":""}>{project.status}</span></div><div className="row-meta"><span>{project.tag}</span><span>{project.tasks} tasks</span><span>Due {project.due}</span></div><Progress value={project.progress} color={project.color}/></div><div className="members">{project.members.map((m,i)=><Avatar key={m} text={m} small color={["#7c5cff","#11b981","#ef5da8"][i]}/>)}</div></div>
}

function TaskRow({task, compact=false}) {
  const [done,setDone]=useState(task.done);
  return <div className={"task-row "+(done?"done":"")}><button className="check" onClick={()=>setDone(!done)}>{done?<Check size={13}/>:<Circle size={17}/>}</button><div className="task-copy"><b>{task.title}</b><small>{task.project}</small></div>{!compact&&<span className={"priority "+task.priority.toLowerCase()}>{task.priority}</span>}<span className="due">{task.due}</span><Avatar text={task.assignee} small color="#7c5cff"/></div>
}

function ActivityItem({avatar,color,text,time}) {
  return <div className="activity-item"><Avatar text={avatar} small color={color}/><div><p>{text}</p><small>{time}</small></div></div>
}

function Projects() {
  const [filter,setFilter]=useState("All");
  return <div className="page">
    <section className="hero"><div><div className="eyebrow">PROJECTS</div><h1>Your projects</h1><p>Plan, build, and ship great work together.</p></div><button className="primary"><Plus size={17}/> New project</button></section>
    <div className="toolbar"><div className="tabs">{["All","On track","At risk","Completed"].map(x=><button key={x} className={filter===x?"selected":""} onClick={()=>setFilter(x)}>{x}</button>)}</div><button className="secondary"><SlidersHorizontal size={16}/> Filter</button></div>
    <div className="project-cards">{projects.map(p=><ProjectCard key={p.id} p={p}/>)}</div>
  </div>
}

function ProjectCard({p}) {
  return <article className="project-card"><div className="card-top"><div className="project-symbol large" style={{background:p.color+"18",color:p.color}}><FolderKanban size={20}/></div><button className="dots"><MoreHorizontal size={18}/></button></div><span className="tag">{p.tag}</span><h3>{p.name}</h3><p>Product workspace with milestones, tasks and team goals.</p><div className="card-progress"><div><small>Progress</small><b>{p.progress}%</b></div><Progress value={p.progress} color={p.color}/></div><div className="card-footer"><div className="members">{p.members.map((m,i)=><Avatar key={m} text={m} small color={["#7c5cff","#11b981","#ef5da8"][i]}/>)}</div><span><CalendarDays size={14}/> {p.due}</span></div></article>
}

function MyTasks() {
  const [tasks,setTasks]=useState(tasksSeed);
  const [active,setActive]=useState("All");
  const filtered=tasks.filter(t=>active==="All" || (active==="Completed"?t.done:!t.done));
  return <div className="page"><section className="hero"><div><div className="eyebrow">PERSONAL WORKSPACE</div><h1>My tasks</h1><p>Everything assigned to you, in one focused view.</p></div><button className="primary"><Plus size={17}/> Add task</button></section>
    <div className="task-summary"><div><span>Today</span><b>{tasks.filter(t=>!t.done).length}</b></div><div><span>Completed</span><b>{tasks.filter(t=>t.done).length}</b></div><div><span>High priority</span><b>{tasks.filter(t=>t.priority==="High"&&!t.done).length}</b></div></div>
    <div className="panel task-panel"><div className="task-toolbar"><div className="tabs">{["All","Active","Completed"].map(x=><button key={x} className={active===x?"selected":""} onClick={()=>setActive(x)}>{x}</button>)}</div><button className="secondary"><ListFilter size={16}/> Sort</button></div>
    <div className="task-head"><span>Task</span><span>Priority</span><span>Due</span><span>Owner</span></div>
    {filtered.map(t=><TaskRow key={t.id} task={t}/>)}</div>
  </div>
}

function Team() {
  return <div className="page"><section className="hero"><div><div className="eyebrow">PEOPLE</div><h1>Your team</h1><p>See who's working on what and keep everyone aligned.</p></div><button className="primary"><Plus size={17}/> Invite member</button></section>
    <div className="team-toolbar"><div className="search-field"><Search size={17}/><input placeholder="Search teammates..." /></div><button className="secondary"><ListFilter size={16}/> All roles</button></div>
    <div className="team-grid">{members.map(m=><div className="member-card" key={m.name}><div className="member-head"><Avatar text={m.initials} color={m.color}/><button className="dots"><MoreHorizontal size={18}/></button></div><h3>{m.name}</h3><p>{m.role}</p><div className="workload"><div><span>Workload</span><b>{m.work}%</b></div><Progress value={m.work} color={m.color}/></div><div className="member-footer"><span><CheckSquare2 size={14}/> {Math.round(m.work/20)+4} active tasks</span><button><MessageCircle size={14}/> Chat</button></div></div>)}</div>
  </div>
}

function Calendar() {
  const days=["29","30","1","2","3","4","5"]; const events=[{d:1,t:"Nexa kickoff",c:"#7c5cff"},{d:2,t:"Design review",c:"#11b981"},{d:3,t:"Sprint demo",c:"#ef5da8"},{d:5,t:"Luma launch",c:"#f59e0b"}];
  return <div className="page"><section className="hero"><div><div className="eyebrow">OCTOBER 2026</div><h1>Team calendar</h1><p>Deadlines, milestones, and meetings at a glance.</p></div><button className="primary"><Plus size={17}/> Add event</button></section>
    <div className="calendar panel"><div className="calendar-head"><div><h2>October 2026</h2><p>Week 40 · Monday start</p></div><div className="calendar-nav"><button>‹</button><button>Today</button><button>›</button></div></div><div className="weekdays">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(x=><span key={x}>{x}</span>)}</div><div className="days">{days.map((d,i)=><div className={"day "+(d==="3"?"today":"")} key={i}><span>{d}</span>{events.filter(e=>String(e.d)===d).map(e=><div className="event" key={e.t} style={{borderLeftColor:e.c}}>{e.t}</div>)}</div>)}</div></div>
  </div>
}

function Insights() {
  return <div className="page"><section className="hero"><div><div className="eyebrow">WORKSPACE ANALYTICS</div><h1>Insights</h1><p>Understand delivery health without digging through reports.</p></div><button className="secondary"><CalendarDays size={16}/> Last 30 days</button></section>
    <div className="stats-grid"><Stat icon={Target} label="Goal completion" value="87%" trend="+9%" note="vs previous period"/><Stat icon={Zap} label="Team velocity" value="42" trend="+14%" note="tasks / week"/><Stat icon={AlertCircle} label="Blocked tasks" value="7" trend="-3" note="vs last week"/><Stat icon={CircleCheck} label="Projects shipped" value="8" trend="+2" note="this quarter"/></div>
    <div className="dashboard-grid"><div className="panel"><div className="panel-head"><div><h2>Delivery trend</h2><p>Completed work over the last 8 weeks.</p></div></div><div className="line-chart"><div className="line-fill"></div><svg viewBox="0 0 700 220" preserveAspectRatio="none"><polyline points="0,180 90,155 180,165 270,105 360,120 450,75 540,92 700,38" fill="none" stroke="currentColor" strokeWidth="4"/><circle cx="700" cy="38" r="6" fill="currentColor"/></svg></div></div><div className="panel"><div className="panel-head"><div><h2>Project health</h2><p>Current delivery status.</p></div></div><div className="health-list"><Health label="On track" count="9" width="75" cls="good"/><Health label="At risk" count="2" width="17" cls="warn"/><Health label="Blocked" count="1" width="8" cls="bad"/></div></div></div>
  </div>
}

function Health({label,count,width,cls}) { return <div className="health"><div><span><i className={cls}></i>{label}</span><b>{count}</b></div><Progress value={width}/></div> }

function Settings() {
  return <div className="page"><section className="hero"><div><div className="eyebrow">WORKSPACE</div><h1>Settings</h1><p>Configure your workspace experience.</p></div></section><div className="settings-grid"><div className="panel settings-nav"><button className="selected">General</button><button>Notifications</button><button>Members & roles</button><button>Appearance</button></div><div className="panel settings-content"><h2>Workspace details</h2><p>Basic information shown across your Orbit workspace.</p><label>Workspace name<input defaultValue="Orbit Studio"/></label><label>Workspace URL<input defaultValue="orbit-studio"/></label><label>Workspace description<textarea defaultValue="A focused product team building thoughtful digital experiences." /></label><button className="primary">Save changes</button></div></div></div>
}

function App() {
  const [page,setPage]=useState("Overview");
  const [mobileOpen,setMobileOpen]=useState(false);
  const [dark,setDark]=useState(false);
  const content = useMemo(()=>({Overview:<Overview setPage={setPage}/>,Projects:<Projects/>, "My Tasks":<MyTasks/>,Team:<Team/>,Calendar:<Calendar/>,Insights:<Insights/>,Settings:<Settings/>}[page] || <Overview setPage={setPage}/>),[page]);
  return <div className={"app "+(dark?"dark":"")}><Sidebar {...{page,setPage,mobileOpen,setMobileOpen,dark,setDark}}/><main><Topbar {...{page,setMobileOpen,dark,setDark}}/>{content}</main>{mobileOpen&&<div className="overlay" onClick={()=>setMobileOpen(false)} />}</div>
}

createRoot(document.getElementById("root")).render(<App />);