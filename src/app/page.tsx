"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, Award, BrainCircuit,
  BriefcaseBusiness, Check, Code2, Cpu, Globe2,
  GraduationCap, Layers3, Menu, Moon, Network, Shield,
  Sparkles, Sun, X, Zap,
} from "lucide-react";


function GithubMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.77 2.1 3.4 1.49.1-.73.39-1.23.7-1.51-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

const projects = [
{number:"01",name:"Prelight",type:"AI INFRASTRUCTURE",status:"ACTIVE BUILD",description:"An AI infrastructure change-safety system that tests proposed inference changes against controlled baselines before rollout.",stack:["Python","FastAPI","Nemotron","Nebius","Next.js"],accent:"green",icon:Cpu,details:["Analyzes proposed model-serving configuration changes.","Runs controlled baseline and candidate inference experiments.","Compares TTFT, latency, throughput and errors before producing rollout guidance."],href:"https://github.com/sujeeth777/prelight"},
{number:"02",name:"AI Phishing URL Detector",type:"MACHINE LEARNING / SECURITY",status:"IN DEVELOPMENT",description:"A Flask application and JSON API that classifies URLs as phishing or legitimate using a trained scikit-learn model and risk-pattern checks.",stack:["Python","Flask","Scikit-learn","Pandas","ML"],accent:"green",icon:Shield,details:["Works with URL-derived signals for binary classification.","Loads a saved scikit-learn model and applies high-risk pattern checks.","Exposes a prediction API with confidence and extracted feature values."],href:"https://github.com/sujeeth777/AI-Phishing-URL-Detector"},
{number:"03",name:"Ecosystem Stress Prediction",type:"AI / ENVIRONMENTAL DATA",status:"RESEARCH PROTOTYPE",description:"A Western Ghats study using MODIS vegetation indices and NASA POWER weather data to explore indicator-based ecosystem stress patterns.",stack:["Python","Streamlit","MODIS","NASA POWER","Random Forest"],accent:"green",icon:BrainCircuit,details:["Builds monthly environmental observations from vegetation and weather sources.","Trains Decision Tree and Random Forest classifiers.","The stress label is an educational proxy, not verified habitat-loss ground truth."],href:"https://github.com/sujeeth777/ecosystem_stress_project"},
{number:"04",name:"Hospital Management System",type:"DATABASE / FULL-STACK",status:"ACADEMIC PROJECT",description:"An academic hospital database system combining Oracle SQL, Embedded SQL in C, and an interactive web dashboard with patient workflows.",stack:["Oracle 23ai","SQL","Pro*C","Python","Flask"],accent:"green",icon:Layers3,details:["Models normalized hospital workflows across patients, doctors, appointments and billing.","Demonstrates joins, constraints, cursors and ACID transaction handling.","Includes an admin dashboard and patient self-service portal."],href:"https://github.com/sujeeth777/Hospital_Project_DBMS"},
{number:"05",name:"Farm Produce Management",type:"FULL-STACK / DATABASE",status:"ACADEMIC PROJECT",description:"A MERN inventory and sales management application for farm produce, stock tracking, categories and transaction history.",stack:["React","Bootstrap","Node.js","Express","MongoDB"],accent:"green",icon:Code2,details:["Supports produce and category CRUD operations with search and filtering.","Records sales with stock deduction and overselling checks.","Provides dashboard analytics, authentication and a sales ledger."],href:"https://github.com/sujeeth777/Farm_Produce_DBMS"},
{number:"06",name:"YouTube AI Summarizer",type:"GENERATIVE AI / AUTOMATION",status:"REPOSITORY DEMO",description:"A Python-based YouTube transcript summarization project developed as an AI learning build.",stack:["Python","YouTube","NLP","Summarization"],accent:"green",icon:Sparkles,details:["Repository contains a Python script for the summarization workflow.","A practical introduction to applying AI to video content."],href:"https://github.com/sujeeth777/AICTE-project"}
];

const experience = [
  { role: "AI Engineer Intern", company: "Rapha MedTech", date: "APR — MAY 2026", mode: "REMOTE", note: "Worked across artificial intelligence and data analysis." },
  { role: "Cybersecurity Intern", company: "Redynox", date: "JUN — JUL 2025", mode: "REMOTE", note: "Explored cybersecurity and networking through practical security tasks." },
  { role: "Microsoft AI & Azure Intern", company: "Edunet Foundation", date: "MAY — JUN 2025", mode: "REMOTE", note: "Completed an AI-focused internship involving Microsoft Azure; built a YouTube video summarizer." },
  { role: "Cybersecurity Intern", company: "Pinnacle Labs", date: "MAY — JUN 2025", mode: "REMOTE", note: "Gained hands-on exposure to cybersecurity concepts and workflows." },
];

const skillGroups = [
  { title: "Artificial Intelligence", icon: BrainCircuit, skills: ["Machine Learning", "PyTorch", "Scikit-learn", "LLMs", "Transformers"] },
  { title: "Cybersecurity", icon: Shield, skills: ["Network Security", "Web App Security", "Phishing Analysis", "Linux"] },
  { title: "Networking", icon: Network, skills: ["TCP/IP", "DNS", "Routing", "Switching", "Network Fundamentals"] },
  { title: "Development", icon: Code2, skills: ["Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "SQL", "Git"] },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Orbital() {
  return (
    <div className="orbital-wrap" aria-label="Abstract animated orbital illustration">
      <div className="orbital-grid" />
      <motion.div className="orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} />
      <motion.div className="orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
      <motion.div className="orbit orbit-three" animate={{ rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: "linear" }} />
      <motion.div className="orb-core" animate={{ scale: [1, 1.045, 1], boxShadow: ["0 0 45px #2563eb30", "0 0 85px #2563eb65", "0 0 45px #2563eb30"] }} transition={{ duration: 5, repeat: Infinity }}>
        <div className="core-inner"><Cpu size={42} strokeWidth={1.25} /><span>SS</span></div>
      </motion.div>
      <span className="orbit-tag tag-top">AI / ML</span>
      <span className="orbit-tag tag-right">SYSTEMS</span>
      <span className="orbit-tag tag-bottom">SECURITY</span>
      <span className="orbit-tag tag-left">NETWORKS</span>
      <div className="orbit-cross cross-a" /><div className="orbit-cross cross-b" />
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [github, setGithub] = useState<{ followers: number; repos: number; publicGists: number } | null>(null);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/sujeeth777")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((d) => setGithub({ followers: d.followers ?? 0, repos: d.public_repos ?? 0, publicGists: d.public_gists ?? 0 }))
      .catch(() => setGithub(null));
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const navItems = [["About", "#about"], ["Work", "#work"], ["Experience", "#experience"], ["Skills", "#skills"], ["Credentials", "#credentials"]];

  return (
    <main className={light ? "site light-theme" : "site"}>
      <div className="noise" />
      <header className="topbar">
        <a href="#home" className="brand" onClick={closeMenu}><span className="brand-mark">S<span>.</span></span><span className="brand-name">SUJEETH<span>/</span></span></a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
          <a href="#contact" className="nav-contact" onClick={closeMenu}>Let&apos;s talk <ArrowUpRight size={14} /></a>
        </nav>
        <div className="top-actions">
          <button className="icon-button theme-button" onClick={() => setLight(!light)} aria-label="Toggle color theme">{light ? <Moon size={17} /> : <Sun size={17} />}</button>
          <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: .6 }}>
            <div className="hero-kicker"><span className="status-pulse" /> COMPUTER SCIENCE UNDERGRADUATE <span className="kicker-line" /></div>
            <h1>Engineering <span className="gradient-text">intelligent</span><br />systems. Defending<br /><span className="outline-text">what matters.</span></h1>
            <p className="hero-lede">I&apos;m Sri Sujeeth — a CSE undergraduate building at the intersection of artificial intelligence, cybersecurity and software systems.</p>
            <div className="hero-ctas">
              <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="/resume/sujeeth%20CV.pdf" download>Download resume <ArrowDownRight size={17} /></a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/sujeeth777" target="_blank" rel="noreferrer"><GithubMark size={16} /> GitHub <ArrowUpRight size={12} /></a>
              <span className="social-divider" />
              <span className="mono-label">BASED IN INDIA</span>
            </div>
          </motion.div>
        </div>
        <motion.div className="hero-art" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .2 }}><Orbital /></motion.div>
        <div className="hero-index"><span>01</span><span className="index-rule" /><span>INTRODUCTION</span></div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      </section>

      <section className="ticker" aria-label="Areas of focus"><div className="ticker-track">{Array.from({ length: 2 }).map((_, i) => <div className="ticker-set" key={i}><span>ARTIFICIAL INTELLIGENCE</span><Sparkles /><span>CYBERSECURITY</span><Shield /><span>NETWORK ENGINEERING</span><Network /><span>FULL-STACK DEVELOPMENT</span><Code2 /><span>ARTIFICIAL INTELLIGENCE</span><Sparkles /></div>)}</div></section>

      <section className="about-section section-shell section-pad" id="about">
        <div className="about-aside"><span className="eyebrow"><span className="eyebrow-dot" /> 01 / ABOUT</span><div className="aside-vertical">A LITTLE CONTEXT <span /></div></div>
        <div className="about-main">
          <SectionHeading eyebrow="THE PERSON BEHIND THE BUILDS" title={<>Curiosity is the<br /><span className="gradient-text">starting point.</span></>} />
          <div className="about-columns">
            <p className="about-lead">I&apos;m a Computer Science and Engineering student at <strong>Karunya Institute of Technology and Sciences</strong>, graduating in 2028.</p>
            <div className="about-detail"><p>I enjoy understanding how things work beneath the surface — from the models that learn patterns to the networks that move information and the security practices that keep systems resilient.</p><p>My approach is simple: learn the fundamentals, build something real, measure what matters, and keep improving.</p><a className="text-link" href="https://github.com/sujeeth777" target="_blank" rel="noreferrer">A little more on GitHub <ArrowUpRight size={15} /></a></div>
          </div>
          <div className="about-facts">
            <div><GraduationCap /><span>EDUCATION</span><strong>B.Tech · CSE</strong><small>Karunya Institute of Technology</small></div>
            <div><Globe2 /><span>LOCATION</span><strong>India</strong><small>Open to learning everywhere</small></div>
            <div><Zap /><span>INTERESTS</span><strong>AI · Security · Networks</strong><small>Building at the intersections</small></div>
          </div>
        </div>
      </section>

      <section className="work-section section-shell section-pad" id="work">
        <SectionHeading eyebrow="02 / SELECTED WORK" title={<>Ideas turned into<br /><span className="gradient-text">experiments.</span></>} text="A selection of things I've been building, exploring and learning from. Each project is a work in progress or a learning milestone — not a claim of finished production software." />
        <div className="project-grid">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return <motion.button key={p.number} className={`project-card project-${p.accent}`} onClick={() => setActiveProject(p)} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .5, delay: (i % 2) * .08 }}>
              <div className="project-card-top"><span className="project-number">{p.number} / 06</span><span className="project-status">{p.status}</span></div>
              <div className="project-icon"><Icon size={25} strokeWidth={1.5} /></div>
              <span className="project-type">{p.type}</span><h3>{p.name}</h3><p>{p.description}</p>
              <div className="project-stack">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
              <div className="project-card-bottom"><span>EXPLORE CASE STUDY</span><span className="round-arrow"><ArrowUpRight size={17} /></span></div>
            </motion.button>;
          })}
        </div>
        <div className="work-footnote"><span className="eyebrow-dot" /> Each card links directly to its source repository. Project status and technical claims are aligned with available documentation.</div>
      </section>

      <section className="experience-section section-shell section-pad" id="experience">
        <div className="experience-intro"><SectionHeading eyebrow="03 / EXPERIENCE" title={<>Learning by<br /><span className="gradient-text">doing the work.</span></>} text="A growing foundation shaped by internships, team contributions and practical problem-solving." /><div className="experience-stamp"><BriefcaseBusiness size={21} /><span>PROFESSIONAL<br />JOURNEY</span></div></div>
        <div className="timeline">{experience.map((e, i) => <motion.div className="timeline-item" key={e.company + e.date} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: i * .08 }}><div className="timeline-marker"><span>{String(i + 1).padStart(2, "0")}</span></div><div className="timeline-content"><div className="timeline-meta"><span>{e.date}</span><span>{e.mode}</span></div><h3>{e.role}</h3><h4>{e.company}</h4><p>{e.note}</p></div><ArrowUpRight className="timeline-arrow" size={19} /></motion.div>)}</div>
      </section>

      <section className="skills-section section-shell section-pad" id="skills">
        <SectionHeading eyebrow="04 / TOOLKIT" title={<>Tools are useful.<br /><span className="gradient-text">Fundamentals matter.</span></>} text="Areas and technologies I've been learning and applying across coursework, internships and personal builds." />
        <div className="skills-grid">{skillGroups.map((g, i) => { const Icon = g.icon; return <motion.div className="skill-card" key={g.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}><div className="skill-card-head"><Icon size={21} /><span>0{i + 1}</span></div><h3>{g.title}</h3><div className="skill-pills">{g.skills.map(s => <span key={s}>{s}</span>)}</div></motion.div>; })}</div>
      </section>

      <section className="github-section section-shell section-pad">
        <div className="github-panel"><div className="github-glow" /><div className="github-copy"><span className="eyebrow"><span className="eyebrow-dot" /> THE CODE, IN PUBLIC</span><h2>Built in the open.<br /><span className="gradient-text">Improved every day.</span></h2><p>GitHub is where experiments become code, ideas get tested and the learning stays visible.</p><a className="button button-primary" href="https://github.com/sujeeth777" target="_blank" rel="noreferrer">Visit my GitHub <GithubMark size={17} /></a></div><div className="github-stats">{github ? <><div><strong>{github.repos}</strong><span>PUBLIC REPOSITORIES</span></div><div><strong>{github.followers}</strong><span>FOLLOWERS</span></div><div><strong>{github.publicGists}</strong><span>PUBLIC GISTS</span></div></> : <div className="github-loading"><GithubMark size={30} /><span>Live GitHub profile data</span><small>Open the profile to explore repositories</small></div>}<a href="https://github.com/sujeeth777?tab=repositories" target="_blank" rel="noreferrer" className="github-stat-link">EXPLORE REPOSITORIES <ArrowUpRight size={14} /></a></div></div>
      </section>

      <section className="credentials-section section-shell section-pad" id="credentials">
        <div className="credentials-copy"><SectionHeading eyebrow="05 / CREDENTIALS" title={<>Proof over<br /><span className="gradient-text">promises.</span></>} text="Certifications and badges belong here only when they are earned and verifiable. No placeholder awards, no inflated credentials." /></div>
        <div className="credentials-empty"><div className="credential-icon"><Award size={27} /></div><span className="mono-label">VERIFIED CREDENTIALS</span><h3>Your next badge<br />will go here.</h3><p>This gallery is ready for verified certificates and Credly badges as they are completed.</p><a className="text-link" href="https://www.credly.com/" target="_blank" rel="noreferrer">Explore Credly <ArrowUpRight size={15} /></a></div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-orbit"><div /><div /><div /></div>
        <span className="eyebrow"><span className="eyebrow-dot" /> 06 / YOUR TURN</span>
        <h2>Have a good<br /><span className="gradient-text">problem to solve?</span></h2>
        <p>I&apos;m always interested in thoughtful conversations, interesting projects and opportunities to learn with good people.</p>
        <a className="button button-primary contact-button" href="https://github.com/sujeeth777" target="_blank" rel="noreferrer">Connect on GitHub <ArrowUpRight size={17} /></a>
        <span className="contact-note">A direct email and LinkedIn link will appear here once confirmed.</span>
      </section>

      <footer className="footer section-shell"><a href="#home" className="brand"><span className="brand-mark">S<span>.</span></span><span className="brand-name">SUJEETH<span>/</span></span></a><span className="footer-copy">DESIGNED WITH CURIOSITY. BUILT WITH INTENT.</span><div className="footer-links"><a href="https://github.com/sujeeth777" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubMark size={17} /></a><a href="#home" aria-label="Back to top"><ArrowUp size={17} /></a></div><small>© {2026} SRI SUJEETH SIRIVELLA</small></footer>

      <AnimatePresence>{activeProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)}><motion.div className="project-modal" initial={{ opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16 }} onClick={e => e.stopPropagation()}><button className="modal-close icon-button" onClick={() => setActiveProject(null)} aria-label="Close project details"><X /></button><span className="eyebrow"><span className="eyebrow-dot" /> {activeProject.number} / {activeProject.type}</span><span className="project-status modal-status">{activeProject.status}</span><h2>{activeProject.name}</h2><p className="modal-description">{activeProject.description}</p><h4>WHAT I EXPLORED</h4><ul>{activeProject.details.map(d => <li key={d}><Check size={16} />{d}</li>)}</ul><h4>TECHNOLOGIES</h4><div className="project-stack modal-stack">{activeProject.stack.map(s => <span key={s}>{s}</span>)}</div><a className="button button-primary modal-link" href={activeProject.href} target="_blank" rel="noreferrer">Explore GitHub profile <ArrowUpRight size={16} /></a></motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}
