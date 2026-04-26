"use client";

import { useState } from "react";
import {
  RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, Cell,
} from "recharts";

const TooltipStyle: React.CSSProperties = {
  background: "#111", border: "1px solid #2D2D2D", borderRadius: 0,
  padding: "8px 12px", fontFamily: "var(--font-ibm-plex-mono), monospace",
  fontSize: "9px", color: "#F5F5F0", letterSpacing: "1px",
};

function matchColor(score: number) {
  if (score >= 85) return "#FFD600";
  if (score >= 65) return "#E6C200";
  if (score >= 45) return "#888";
  return "#FF6B35";
}

const feedbacks = [
  {
    id: "APP-001",
    role: "Senior Pilot (B787)",
    department: "Flight Operations",
    submittedDate: "12 Apr 2025",
    resultDate: "13 Apr 2025",
    status: "SHORTLISTED",
    overallScore: 94,
    cvScore: 96,
    examScore: 91,
    expScore: 96,
    strengths: [
      { label: "B787 Type Rating", detail: "Exact match to required certification. Highest contributing term in your CV." },
      { label: "ATPL License (ECAA Issued)", detail: "Fully satisfies the mandatory licensing requirement per ECAA regulations." },
      { label: "ICAO English Level 5", detail: "Exceeds the Level 4+ minimum. Added 100% score to the language compliance dimension." },
      { label: "Navigation Systems Experience", detail: "12 semantic matches to avionics and navigation requirements in the JD." },
    ],
    gaps: [
      { label: "Meteorology Section (Exam)", detail: "Scored 88/100 vs ideal vector of 100. Your descriptive answer on SIGMET interpretation lacked specificity." },
      { label: "CRM Descriptive Response", detail: "Good conceptual coverage but only 2 scenarios provided; rubric expected a minimum of 3 distinct case types." },
    ],
    examComparison: [
      { question: "Emergency Procedures", candidateScore: 95, idealScore: 100 },
      { question: "Meteorology",          candidateScore: 88, idealScore: 100 },
      { question: "Air Law",              candidateScore: 91, idealScore: 100 },
      { question: "Navigation",           candidateScore: 97, idealScore: 100 },
      { question: "CRM (Descriptive)",    candidateScore: 84, idealScore: 100 },
    ],
    semanticMatches: [
      { candidate: "Mentioned 'Navigation Systems'",         requirement: "Avionics & Navigation Knowledge", score: 97 },
      { candidate: "12 yrs B787 command experience",         requirement: "5+ Years PIC Experience",         score: 95 },
      { candidate: "ICAO English Level 5 certification",     requirement: "ICAO English Level 4+",           score: 100 },
      { candidate: "Referenced 'Crew Resource Management'",  requirement: "CRM & Safety Culture",            score: 88 },
      { candidate: "ATPL — ECAA Issued",                     requirement: "Valid ATPL License",              score: 100 },
    ],
  },
  {
    id: "APP-002",
    role: "Avionics Technician",
    department: "Maintenance & Engineering",
    submittedDate: "20 Apr 2025",
    resultDate: "PENDING",
    status: "PROCESSING",
    overallScore: 0,
    cvScore: 0,
    examScore: 0,
    expScore: 0,
    strengths: [],
    gaps: [],
    examComparison: [],
    semanticMatches: [],
  },
];

export default function FeedbackPage() {
  const [selected, setSelected] = useState(feedbacks[0]);

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-ibm-mono text-[9px] text-[#444] tracking-[2px]">[05] // MY FEEDBACK</span>
        <h1 className="font-grotesk text-[24px] md:text-[32px] font-bold text-[#F5F5F0] tracking-[-1px]">
          Application Feedback
        </h1>
        <p className="font-ibm-mono text-[10px] text-[#555] tracking-[0.5px]">
          Transparent XAI-powered results — see exactly why the system scored your application the way it did.
        </p>
      </div>

      {/* Application selector */}
      <div className="flex items-center gap-[1px] bg-[#1D1D1D] flex-wrap">
        {feedbacks.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelected(f)}
            className="flex flex-col gap-[2px] px-5 py-3 text-left transition-all"
            style={{ background: selected.id === f.id ? "#FFD60012" : "#0D0D0D", borderBottom: selected.id === f.id ? "2px solid #FFD600" : "2px solid transparent" }}
          >
            <span className="font-ibm-mono text-[8px] tracking-[1px]" style={{ color: selected.id === f.id ? "#FFD600" : "#555" }}>
              {f.id}
            </span>
            <span className="font-ibm-mono text-[7px] text-[#333]">{f.role}</span>
          </button>
        ))}
      </div>

      {/* Processing state */}
      {selected.status === "PROCESSING" && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 border border-[#1D1D1D]">
          <div className="w-[40px] h-[40px] border-2 border-[#FFD600] border-t-transparent rounded-full animate-spin" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-ibm-mono text-[9px] text-[#555] tracking-[1px]">AI ENGINE PROCESSING YOUR SUBMISSION</span>
            <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">Vectorizing exam responses and computing semantic similarity — results within 24 hours.</span>
          </div>
        </div>
      )}

      {selected.status !== "PROCESSING" && (
        <>
          {/* Status + date strip */}
          <div className="flex items-center gap-4 flex-wrap">
            <div
              className="flex items-center gap-2 px-3 py-[5px]"
              style={{ background: "#FFD60010", border: "1px solid #FFD60040" }}
            >
              <div className="w-[5px] h-[5px] rounded-full bg-[#FFD600]" />
              <span className="font-ibm-mono text-[8px] text-[#FFD600] tracking-[1px]">{selected.status}</span>
            </div>
            <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">
              APPLIED: {selected.submittedDate.toUpperCase()} / RESULT: {selected.resultDate.toUpperCase()}
            </span>
          </div>

          {/* Score overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gauge */}
            <div className="bg-[#0D0D0D] border border-[#1D1D1D] p-6 flex flex-col items-center gap-4">
              <span className="font-ibm-mono text-[9px] text-[#555] tracking-[2px] self-start">OVERALL AI MATCH SCORE</span>
              <div className="relative">
                <ResponsiveContainer width={200} height={200}>
                  <RadialBarChart cx={100} cy={100} innerRadius={60} outerRadius={88} data={[{ value: selected.overallScore, fill: matchColor(selected.overallScore) }]} startAngle={220} endAngle={-40}>
                    <RadialBar dataKey="value" cornerRadius={0} background={{ fill: "#1A1A1A" }}>
                      <Cell fill={matchColor(selected.overallScore)} />
                    </RadialBar>
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-grotesk text-[48px] font-bold leading-none" style={{ color: matchColor(selected.overallScore) }}>
                    {selected.overallScore}
                  </span>
                  <span className="font-ibm-mono text-[10px] text-[#444]">%</span>
                </div>
              </div>
            </div>

            {/* Sub-scores */}
            <div className="bg-[#0D0D0D] border border-[#1D1D1D] p-6 flex flex-col justify-center gap-5">
              {[
                { label: "CV SIMILARITY (VECTOR MATCH)", value: selected.cvScore,   weight: "40%" },
                { label: "TECHNICAL EXAM SCORE",          value: selected.examScore, weight: "40%" },
                { label: "EXPERIENCE DIMENSION",          value: selected.expScore,  weight: "20%" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-[1px]">
                      <span className="font-ibm-mono text-[8px] text-[#888] tracking-[1px]">{item.label}</span>
                      <span className="font-ibm-mono text-[7px] text-[#333]">WEIGHT: {item.weight}</span>
                    </div>
                    <span className="font-grotesk text-[20px] font-bold" style={{ color: matchColor(item.value) }}>
                      {item.value}%
                    </span>
                  </div>
                  <div className="w-full h-[3px] bg-[#1A1A1A]">
                    <div className="h-full transition-all" style={{ width: `${item.value}%`, background: matchColor(item.value) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1D1D1D]">
            {/* Strengths */}
            <div className="bg-[#0D0D0D] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-[3px] h-[14px] bg-[#FFD600] shrink-0" />
                <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">STRENGTHS DETECTED</span>
              </div>
              <div className="flex flex-col gap-[1px] bg-[#1D1D1D]">
                {selected.strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 bg-[#0D0D0D]">
                    <div className="flex items-center justify-center w-[16px] h-[16px] bg-[#FFD600] shrink-0 mt-[1px]">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 4l2 2 4-4" stroke="#0A0A0A" strokeWidth="1.4" strokeLinecap="square" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <span className="font-ibm-mono text-[9px] text-[#F5F5F0]">{s.label}</span>
                      <span className="font-ibm-mono text-[7px] text-[#444] leading-relaxed">{s.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gaps */}
            <div className="bg-[#0D0D0D] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-[3px] h-[14px] bg-[#FF6B35] shrink-0" />
                <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">AREAS FOR IMPROVEMENT</span>
              </div>
              <div className="flex flex-col gap-[1px] bg-[#1D1D1D]">
                {selected.gaps.map((g, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 bg-[#0D0D0D]">
                    <div className="flex items-center justify-center w-[16px] h-[16px] border border-[#FF6B35]/50 shrink-0 mt-[1px]">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M4 2v3M4 6.5v.5" stroke="#FF6B35" strokeWidth="1.4" strokeLinecap="square" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <span className="font-ibm-mono text-[9px] text-[#F5F5F0]">{g.label}</span>
                      <span className="font-ibm-mono text-[7px] text-[#444] leading-relaxed">{g.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Semantic alignment map */}
          <div className="bg-[#0D0D0D] border border-[#1D1D1D] p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-[14px] bg-[#FFD600] shrink-0" />
              <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">SEMANTIC ALIGNMENT MAP</span>
            </div>
            <div className="flex flex-col gap-[1px] bg-[#1D1D1D]">
              {selected.semanticMatches.map((match, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3 bg-[#0D0D0D]">
                  <div className="flex flex-col gap-[3px] flex-1 min-w-0">
                    <span className="font-ibm-mono text-[8px] text-[#F5F5F0]">{match.candidate}</span>
                    <div className="flex items-center gap-2">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4h6M4 1l3 3-3 3" stroke="#444" strokeWidth="1.2" strokeLinecap="square" /></svg>
                      <span className="font-ibm-mono text-[7px] text-[#444]">{match.requirement}</span>
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-center w-[44px] h-[24px] shrink-0"
                    style={{ background: `${matchColor(match.score)}12`, border: `1px solid ${matchColor(match.score)}40` }}
                  >
                    <span className="font-ibm-mono text-[9px] font-bold" style={{ color: matchColor(match.score) }}>
                      {match.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam performance chart */}
          {selected.examComparison.length > 0 && (
            <div className="bg-[#0D0D0D] border border-[#1D1D1D] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-[3px] h-[14px] bg-[#FFD600] shrink-0" />
                <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">EXAM PERFORMANCE vs. IDEAL ANSWER VECTOR</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={selected.examComparison} barGap={2} barSize={18}>
                  <XAxis dataKey="question" tick={{ fill: "#444", fontSize: 7, fontFamily: "var(--font-ibm-plex-mono)", letterSpacing: "0.5px" }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip contentStyle={TooltipStyle} cursor={{ fill: "rgba(255,214,0,0.04)" }} />
                  <Bar dataKey="idealScore" fill="#1A1A1A" name="Ideal Vector" />
                  <Bar dataKey="candidateScore" fill="#FFD600" name="Your Score" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-[6px]"><div className="w-[8px] h-[8px] bg-[#FFD600]" /><span className="font-ibm-mono text-[7px] text-[#555]">YOUR SCORE</span></div>
                <div className="flex items-center gap-[6px]"><div className="w-[8px] h-[8px] bg-[#1A1A1A] border border-[#2D2D2D]" /><span className="font-ibm-mono text-[7px] text-[#555]">IDEAL ANSWER VECTOR</span></div>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="flex items-center justify-between border-t border-[#1D1D1D] pt-4">
            <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">
              Generated by EAA XAI Engine v2.1 — Proclamation 1329/2023 compliant. Scores are computed, not human-assigned.
            </span>
            <button className="px-4 py-2 border border-[#2D2D2D] font-ibm-mono text-[8px] text-[#555] hover:text-[#F5F5F0] hover:border-[#555] transition-colors tracking-[1px]">
              EXPORT PDF /
            </button>
          </div>
        </>
      )}
    </div>
  );
}
