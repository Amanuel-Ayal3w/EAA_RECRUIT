"use client";

import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell,
} from "recharts";

const shortlistData = [
  { name: "Amanuel Tadesse",  role: "Senior Pilot",    match: 94, cvScore: 96, examScore: 91, stage: "INTERVIEWED" },
  { name: "Hana Girma",       role: "Senior Pilot",    match: 91, cvScore: 89, examScore: 94, stage: "INTERVIEWED" },
  { name: "Eden Tadesse",     role: "Flight Engineer", match: 74, cvScore: 80, examScore: 68, stage: "SCREENED" },
  { name: "Dawit Bekele",     role: "Flight Engineer", match: 78, cvScore: 80, examScore: 74, stage: "SCREENED" },
  { name: "Selam Haile",      role: "Cabin Crew Lead", match: 82, cvScore: 85, examScore: 79, stage: "SCREENED" },
];

const accuracyTrend = [
  { week: "W1", accuracy: 88 },
  { week: "W2", accuracy: 90 },
  { week: "W3", accuracy: 91 },
  { week: "W4", accuracy: 89 },
  { week: "W5", accuracy: 93 },
  { week: "W6", accuracy: 95 },
];

const roleBreakdown = [
  { role: "Senior Pilot",    applied: 142, screened: 28, shortlisted: 5 },
  { role: "Flight Engineer", applied: 89,  screened: 14, shortlisted: 4 },
  { role: "Cabin Crew Lead", applied: 201, screened: 41, shortlisted: 8 },
  { role: "Avionics Tech.",  applied: 68,  screened: 17, shortlisted: 3 },
];

const scatterData = [
  { cv: 96, exam: 91, match: 94, name: "Amanuel" },
  { cv: 89, exam: 94, match: 91, name: "Hana" },
  { cv: 80, exam: 74, match: 78, name: "Dawit" },
  { cv: 85, exam: 79, match: 82, name: "Selam" },
  { cv: 74, exam: 68, match: 71, name: "Yonas" },
  { cv: 55, exam: 62, match: 58, name: "Tigist" },
  { cv: 49, exam: 45, match: 47, name: "Samuel" },
  { cv: 29, exam: 33, match: 30, name: "Abel" },
];

const TooltipStyle: React.CSSProperties = {
  background: "#111", border: "1px solid #2D2D2D", borderRadius: 0,
  padding: "8px 12px", fontFamily: "var(--font-ibm-plex-mono), monospace",
  fontSize: "9px", color: "#F5F5F0", letterSpacing: "1px",
};

function matchColor(score: number) {
  if (score >= 85) return "#FFD600";
  if (score >= 65) return "#E6C200";
  return "#888";
}

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-ibm-mono text-[9px] text-[#444] tracking-[2px]">[{index}]</span>
      <div className="w-[3px] h-[14px] bg-[#FFD600] shrink-0" />
      <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">{children}</span>
    </div>
  );
}

export default function ReportsPage() {
  const [exported, setExported] = useState(false);

  function handleExport() {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  }

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex flex-col gap-1">
          <span className="font-ibm-mono text-[9px] text-[#444] tracking-[2px]">[06] // REPORTS & ANALYTICS</span>
          <h1 className="font-grotesk text-[24px] md:text-[32px] font-bold text-[#F5F5F0] tracking-[-1px]">
            Reports & Analytics
          </h1>
          <p className="font-ibm-mono text-[10px] text-[#555] tracking-[0.5px]">
            Exportable shortlists, AI accuracy trends, and per-role funnel analytics
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-3 border border-[#FFD600] hover:bg-[#FFD600]/08 transition-colors"
        >
          {exported ? (
            <span className="font-ibm-mono text-[9px] text-[#FFD600] tracking-[1.5px]">EXPORTED /</span>
          ) : (
            <span className="font-ibm-mono text-[9px] text-[#FFD600] tracking-[1.5px]">EXPORT CSV /</span>
          )}
        </button>
      </div>

      {/* Shortlist table */}
      <div className="mb-8">
        <SectionLabel index="A">CURRENT SHORTLIST</SectionLabel>
        <div className="border border-[#1D1D1D] bg-[#0D0D0D]">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 bg-[#111] border-b border-[#1D1D1D] items-center">
            {["NAME / ROLE", "MATCH %", "CV SCORE", "EXAM SCORE", "STAGE"].map((h) => (
              <span key={h} className="font-ibm-mono text-[7px] text-[#444] tracking-[1.5px]">{h}</span>
            ))}
          </div>
          {shortlistData.map((c, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-4 border-b border-[#111] items-center hover:bg-[#111] transition-colors"
            >
              <div className="flex flex-col gap-[2px]">
                <span className="font-ibm-mono text-[9px] text-[#F5F5F0]">{c.name}</span>
                <span className="font-ibm-mono text-[7px] text-[#444]">{c.role}</span>
              </div>
              <span className="font-grotesk text-[15px] font-bold" style={{ color: matchColor(c.match) }}>{c.match}%</span>
              <span className="font-ibm-mono text-[9px] text-[#888]">{c.cvScore}%</span>
              <span className="font-ibm-mono text-[9px] text-[#888]">{c.examScore}%</span>
              <span
                className="font-ibm-mono text-[7px] px-2 py-[2px] tracking-[1px]"
                style={{ color: c.stage === "INTERVIEWED" ? "#FFD600" : "#888", background: c.stage === "INTERVIEWED" ? "#FFD60014" : "#88888814" }}
              >
                {c.stage}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* AI Accuracy trend */}
        <div className="p-5 border border-[#1D1D1D] bg-[#0D0D0D]">
          <SectionLabel index="B">AI MATCH ACCURACY TREND (%)</SectionLabel>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={accuracyTrend}>
              <XAxis
                dataKey="week"
                tick={{ fill: "#444", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)", letterSpacing: "1px" }}
                axisLine={{ stroke: "#1D1D1D" }} tickLine={false}
              />
              <YAxis
                tick={{ fill: "#444", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)" }}
                axisLine={false} tickLine={false} width={32} domain={[80, 100]} unit="%" />
              <Tooltip contentStyle={TooltipStyle} cursor={{ stroke: "#2D2D2D", strokeWidth: 1 }} />
              <Line type="monotone" dataKey="accuracy" stroke="#FFD600" strokeWidth={1.5}
                dot={{ r: 3, fill: "#FFD600", strokeWidth: 0 }}
                activeDot={{ r: 4, fill: "#FFD600" }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="font-ibm-mono text-[8px] text-[#333] mt-3 tracking-[0.5px]">
            Accuracy measured by recruiter acceptance rate of AI-recommended shortlist
          </p>
        </div>

        {/* CV vs Exam scatter */}
        <div className="p-5 border border-[#1D1D1D] bg-[#0D0D0D]">
          <SectionLabel index="C">CV SCORE vs. EXAM SCORE CORRELATION</SectionLabel>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart>
              <XAxis
                type="number" dataKey="cv" name="CV Score"
                tick={{ fill: "#444", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)" }}
                axisLine={{ stroke: "#1D1D1D" }} tickLine={false} domain={[20, 100]} unit="%" label={{ value: "CV %", position: "insideBottom", offset: -2, fill: "#333", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)" }}
              />
              <YAxis
                type="number" dataKey="exam" name="Exam Score"
                tick={{ fill: "#444", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)" }}
                axisLine={false} tickLine={false} width={32} domain={[20, 100]} unit="%"
              />
              <ZAxis range={[40, 40]} />
              <Tooltip contentStyle={TooltipStyle} cursor={{ strokeDasharray: "3 3", stroke: "#2D2D2D" }} />
              <Scatter data={scatterData} name="Candidates">
                {scatterData.map((entry, i) => (
                  <Cell key={i} fill={matchColor(entry.match)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Role breakdown */}
      <div className="mb-8">
        <SectionLabel index="D">ROLE-LEVEL FUNNEL BREAKDOWN</SectionLabel>
        <div className="border border-[#1D1D1D] bg-[#0D0D0D]">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-4 px-5 py-3 bg-[#111] border-b border-[#1D1D1D] items-center">
            {["ROLE", "APPLIED", "SCREENED", "SHORTLISTED", "SCREEN RATE", "SHORTLIST RATE"].map((h) => (
              <span key={h} className="font-ibm-mono text-[7px] text-[#444] tracking-[1.5px]">{h}</span>
            ))}
          </div>
          {roleBreakdown.map((r, i) => {
            const screenRate = Math.round((r.screened / r.applied) * 100);
            const shortlistRate = Math.round((r.shortlisted / r.screened) * 100);
            return (
              <div key={i} className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-4 px-5 py-4 border-b border-[#111] items-center hover:bg-[#111] transition-colors">
                <span className="font-ibm-mono text-[9px] text-[#F5F5F0]">{r.role}</span>
                <span className="font-grotesk text-[13px] font-bold text-[#F5F5F0]">{r.applied}</span>
                <span className="font-grotesk text-[13px] font-bold text-[#888]">{r.screened}</span>
                <span className="font-grotesk text-[13px] font-bold text-[#FFD600]">{r.shortlisted}</span>
                <span className="font-ibm-mono text-[9px]" style={{ color: screenRate >= 20 ? "#FFD600" : "#888" }}>{screenRate}%</span>
                <span className="font-ibm-mono text-[9px]" style={{ color: shortlistRate >= 20 ? "#FFD600" : "#888" }}>{shortlistRate}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grouped bar by role */}
      <div className="p-5 border border-[#1D1D1D] bg-[#0D0D0D]">
        <SectionLabel index="E">PIPELINE VOLUME BY ROLE</SectionLabel>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={roleBreakdown} barGap={2} barSize={14}>
            <XAxis
              dataKey="role"
              tick={{ fill: "#444", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)", letterSpacing: "1px" }}
              axisLine={{ stroke: "#1D1D1D" }} tickLine={false}
            />
            <YAxis tick={{ fill: "#444", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip contentStyle={TooltipStyle} cursor={{ fill: "rgba(255,214,0,0.04)" }} />
            <Bar dataKey="applied" fill="#2D2D2D" name="Applied" />
            <Bar dataKey="screened" fill="#888" name="Screened" />
            <Bar dataKey="shortlisted" fill="#FFD600" name="Shortlisted" />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3">
          {[{ label: "APPLIED", color: "#2D2D2D" }, { label: "SCREENED", color: "#888" }, { label: "SHORTLISTED", color: "#FFD600" }].map((l) => (
            <div key={l.label} className="flex items-center gap-[6px]">
              <div className="w-[8px] h-[8px]" style={{ background: l.color, border: l.color === "#2D2D2D" ? "1px solid #444" : "none" }} />
              <span className="font-ibm-mono text-[7px] text-[#555]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
