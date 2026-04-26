"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const TooltipStyle: React.CSSProperties = {
  background: "#111", border: "1px solid #2D2D2D", borderRadius: 0,
  padding: "8px 12px", fontFamily: "var(--font-ibm-plex-mono), monospace",
  fontSize: "9px", color: "#F5F5F0", letterSpacing: "1px",
};

// ─── Application Pulse Timeline ───────────────────────────────────────────────
const applications = [
  {
    id: "APP-001",
    role: "Senior Pilot (B787)",
    department: "Flight Operations",
    appliedDate: "12 Apr 2025",
    steps: [
      { label: "CV RECEIVED",    done: true,  active: false },
      { label: "AI PROCESSING",  done: true,  active: false },
      { label: "SHORTLISTED",    done: true,  active: false },
      { label: "EXAM INVITED",   done: false, active: true  },
      { label: "INTERVIEW",      done: false, active: false },
      { label: "DECISION",       done: false, active: false },
    ],
  },
  {
    id: "APP-002",
    role: "Avionics Technician",
    department: "Maintenance & Engineering",
    appliedDate: "20 Apr 2025",
    steps: [
      { label: "CV RECEIVED",   done: true,  active: false },
      { label: "AI PROCESSING", done: true,  active: false },
      { label: "SHORTLISTED",   done: false, active: true  },
      { label: "EXAM INVITED",  done: false, active: false },
      { label: "INTERVIEW",     done: false, active: false },
      { label: "DECISION",      done: false, active: false },
    ],
  },
];

// ─── Skill Summary data ────────────────────────────────────────────────────────
const skills = [
  { term: "B787 Type Rating",        weight: 97, category: "Certification" },
  { term: "Navigation Systems",      weight: 92, category: "Technical"     },
  { term: "ATPL License",            weight: 95, category: "Certification" },
  { term: "IFR Operations",          weight: 88, category: "Technical"     },
  { term: "Crew Resource Management",weight: 84, category: "Soft Skill"    },
  { term: "ICAO English L5",         weight: 91, category: "Certification" },
  { term: "Safety Management",       weight: 79, category: "Soft Skill"    },
  { term: "Meteorology",             weight: 75, category: "Technical"     },
];

const skillChartData = skills.map((s) => ({ name: s.term.split(" ").slice(0, 2).join(" "), value: s.weight, category: s.category }));

function categoryColor(cat: string) {
  if (cat === "Certification") return "#FFD600";
  if (cat === "Technical") return "#E6C200";
  return "#888";
}

// ─── Action cards ─────────────────────────────────────────────────────────────
const actions = [
  {
    priority: "HIGH",
    title: "Exam Invitation: Senior Pilot (B787)",
    desc: "You have been invited to take the Flight Operations Technical Exam. Timer starts on entry.",
    href: "/candidate/exams",
    cta: "START EXAM /",
  },
];

export default function CandidateDashboard() {
  const [lang, setLang] = useState<"EN" | "AM">("EN");

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto flex flex-col gap-8">

      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <span className="font-ibm-mono text-[9px] text-[#444] tracking-[2px]">[01] // MY DASHBOARD</span>
        <h1 className="font-grotesk text-[24px] md:text-[32px] font-bold text-[#F5F5F0] tracking-[-1px]">
          {lang === "EN" ? "Application Control Center" : "የማመልከቻ መቆጣጠሪያ ማዕከል"}
        </h1>
        <p className="font-ibm-mono text-[10px] text-[#555] tracking-[0.5px]">
          {lang === "EN" ? "Real-time status of your applications and AI-parsed skill profile." : "የእርስዎ ማመልከቻዎች እና የ AI የተተነተነ ክህሎት መገለጫ ሁኔታ።"}
        </p>
      </div>

      {/* Action Required */}
      {actions.map((action) => (
        <div key={action.title} className="border border-[#FFD600]/30 bg-[#FFD600]/04 p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-[3px] h-[40px] bg-[#FFD600]" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-ibm-mono text-[7px] text-[#FFD600] bg-[#FFD600]/10 px-2 py-[2px] tracking-[1px]">
                  {action.priority} PRIORITY
                </span>
                <span className="font-ibm-mono text-[7px] text-[#444] tracking-[1px]">ACTION REQUIRED</span>
              </div>
              <span className="font-grotesk text-[14px] font-bold text-[#F5F5F0]">{action.title}</span>
              <span className="font-ibm-mono text-[9px] text-[#555]">{action.desc}</span>
            </div>
          </div>
          <div className="md:ml-auto shrink-0">
            <Link
              href={action.href}
              className="inline-flex items-center justify-center px-6 h-[40px] bg-[#FFD600] font-ibm-mono text-[9px] font-bold text-[#0A0A0A] tracking-[1.5px] hover:bg-[#E6C200] transition-colors"
            >
              {action.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Application Pulse */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-[3px] h-[14px] bg-[#FFD600] shrink-0" />
          <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">APPLICATION PULSE</span>
        </div>
        <div className="flex flex-col gap-[1px] bg-[#1D1D1D]">
          {applications.map((app) => (
            <div key={app.id} className="bg-[#0D0D0D] px-5 py-5 flex flex-col gap-5">
              {/* App header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-[3px]">
                  <span className="font-grotesk text-[14px] font-bold text-[#F5F5F0]">{app.role}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-ibm-mono text-[8px] text-[#444] tracking-[1px]">{app.department}</span>
                    <div className="w-[1px] h-[10px] bg-[#2D2D2D]" />
                    <span className="font-ibm-mono text-[8px] text-[#444] tracking-[1px]">APPLIED {app.appliedDate.toUpperCase()}</span>
                  </div>
                </div>
                <span className="font-ibm-mono text-[8px] text-[#333] tracking-[1px] shrink-0">{app.id}</span>
              </div>

              {/* Timeline steps */}
              <div className="flex items-center w-full gap-0 overflow-x-auto">
                {app.steps.map((step, i) => (
                  <div key={step.label} className="flex items-center flex-1 min-w-[80px]">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="flex items-center justify-center w-[22px] h-[22px] shrink-0 transition-all"
                        style={{
                          background: step.done ? "#FFD600" : step.active ? "#FFD600/10" : "#111",
                          border: step.active ? "2px solid #FFD600" : step.done ? "2px solid #FFD600" : "2px solid #2D2D2D",
                        }}
                      >
                        {step.done && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4l2 2 4-4" stroke="#0A0A0A" strokeWidth="1.4" strokeLinecap="square" />
                          </svg>
                        )}
                        {step.active && <div className="w-[6px] h-[6px] bg-[#FFD600] animate-pulse" />}
                      </div>
                      <span
                        className="font-ibm-mono text-[6px] text-center tracking-[0.5px] whitespace-nowrap"
                        style={{ color: step.done ? "#FFD600" : step.active ? "#FFD600" : "#333" }}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < app.steps.length - 1 && (
                      <div className="h-[2px] flex-1 mx-1 shrink-0" style={{ background: step.done ? "#FFD600" : "#1D1D1D" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Summary */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-[3px] h-[14px] bg-[#FFD600] shrink-0" />
          <div className="flex flex-col gap-[2px]">
            <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">AI SKILL SUMMARY</span>
            <span className="font-ibm-mono text-[7px] text-[#333] tracking-[1px]">WHAT THE SYSTEM SEES IN YOUR PROFILE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1D1D1D]">
          {/* Tag cloud */}
          <div className="bg-[#0D0D0D] p-5 flex flex-col gap-4">
            <span className="font-ibm-mono text-[8px] text-[#444] tracking-[1.5px]">EXTRACTED TERMS</span>
            <div className="flex flex-wrap gap-[1px] bg-[#1D1D1D]">
              {skills.map((s) => (
                <div
                  key={s.term}
                  className="flex items-center gap-2 bg-[#0D0D0D] px-3 py-2"
                >
                  <div className="w-[4px] h-[4px] rounded-full shrink-0" style={{ background: categoryColor(s.category) }} />
                  <span className="font-ibm-mono text-[8px] tracking-[0.5px]" style={{ color: categoryColor(s.category) }}>
                    {s.term}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-2">
              {["Certification", "Technical", "Soft Skill"].map((cat) => (
                <div key={cat} className="flex items-center gap-[5px]">
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: categoryColor(cat) }} />
                  <span className="font-ibm-mono text-[7px] text-[#444]">{cat.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart of skill weights */}
          <div className="bg-[#0D0D0D] p-5 flex flex-col gap-4">
            <span className="font-ibm-mono text-[8px] text-[#444] tracking-[1.5px]">TERM RELEVANCE WEIGHTS</span>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={skillChartData} layout="vertical" barSize={8} margin={{ left: 0, right: 20 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category" dataKey="name" width={100}
                  tick={{ fill: "#555", fontSize: 7, fontFamily: "var(--font-ibm-plex-mono)", letterSpacing: "0.5px" }}
                  axisLine={false} tickLine={false}
                />
                <Tooltip contentStyle={TooltipStyle} cursor={{ fill: "rgba(255,214,0,0.04)" }} />
                <Bar dataKey="value" radius={0} name="RELEVANCE %">
                  {skillChartData.map((entry, i) => (
                    <Cell key={i} fill={categoryColor(entry.category)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#1D1D1D]">
        {[
          { label: "BROWSE JOBS",   href: "/candidate/jobs",         sub: "Find new openings" },
          { label: "VIEW EXAMS",    href: "/candidate/exams",        sub: "1 exam pending" },
          { label: "MY FEEDBACK",   href: "/candidate/feedback",     sub: "See your AI scores" },
          { label: "MY PROFILE",    href: "/candidate/profile",      sub: "Update skills cloud" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col gap-2 p-5 bg-[#0D0D0D] hover:bg-[#111] transition-colors group"
          >
            <span className="font-ibm-mono text-[8px] text-[#555] group-hover:text-[#FFD600] tracking-[1.5px] transition-colors">
              {link.label} /
            </span>
            <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">{link.sub}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
