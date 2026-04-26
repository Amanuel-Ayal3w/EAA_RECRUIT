"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Stage = "APPLIED" | "SCREENED" | "EXAM PENDING" | "INTERVIEWED" | "REJECTED";

interface Candidate {
  id: string;
  name: string;
  role: string;
  match: number;
  stage: Stage;
  flag?: string;
}

const STAGES: Stage[] = ["APPLIED", "SCREENED", "EXAM PENDING", "INTERVIEWED", "REJECTED"];

const STAGE_CONFIG: Record<Stage, { color: string; count: number }> = {
  "APPLIED":      { color: "#555",    count: 5 },
  "SCREENED":     { color: "#FFD600", count: 4 },
  "EXAM PENDING": { color: "#E6C200", count: 3 },
  "INTERVIEWED":  { color: "#FF6B35", count: 2 },
  "REJECTED":     { color: "#333",    count: 2 },
};

const initialCandidates: Candidate[] = [
  { id: "C001", name: "Amanuel Tadesse", role: "Senior Pilot", match: 94, stage: "INTERVIEWED", flag: "TOP MATCH" },
  { id: "C002", name: "Hana Girma",      role: "Senior Pilot", match: 91, stage: "INTERVIEWED", flag: "TOP MATCH" },
  { id: "C003", name: "Dawit Bekele",    role: "Flight Engineer", match: 78, stage: "SCREENED" },
  { id: "C004", name: "Selam Haile",     role: "Cabin Crew Lead", match: 82, stage: "SCREENED" },
  { id: "C005", name: "Yonas Alemu",     role: "Avionics Tech.", match: 71, stage: "EXAM PENDING" },
  { id: "C006", name: "Meron Desta",     role: "Cabin Crew Lead", match: 66, stage: "EXAM PENDING" },
  { id: "C007", name: "Biruk Tesfaye",   role: "Flight Engineer", match: 60, stage: "EXAM PENDING" },
  { id: "C008", name: "Tigist Worku",    role: "Senior Pilot", match: 55, stage: "APPLIED" },
  { id: "C009", name: "Samuel Kebede",   role: "Avionics Tech.", match: 49, stage: "APPLIED" },
  { id: "C010", name: "Rahel Assefa",    role: "Cabin Crew Lead", match: 43, stage: "APPLIED" },
  { id: "C011", name: "Getnet Abebe",    role: "Senior Pilot", match: 38, stage: "APPLIED" },
  { id: "C012", name: "Liya Mengistu",   role: "Avionics Tech.", match: 35, stage: "APPLIED" },
  { id: "C013", name: "Abel Hailu",      role: "Flight Engineer", match: 29, stage: "REJECTED" },
  { id: "C014", name: "Kalkidan Wubet",  role: "Cabin Crew Lead", match: 22, stage: "REJECTED" },
  { id: "C015", name: "Mikias Solomon",  role: "Senior Pilot", match: 68, stage: "SCREENED" },
  { id: "C016", name: "Eden Tadesse",    role: "Flight Engineer", match: 74, stage: "SCREENED" },
];

function matchColor(score: number) {
  if (score >= 85) return "#FFD600";
  if (score >= 65) return "#E6C200";
  if (score >= 45) return "#888";
  return "#FF6B35";
}

function CandidateCard({
  candidate,
  onMove,
}: {
  candidate: Candidate;
  onMove: (id: string, direction: "left" | "right") => void;
}) {
  const stageIndex = STAGES.indexOf(candidate.stage);

  return (
    <div className="flex flex-col gap-3 p-3 bg-[#111] border border-[#1D1D1D] hover:border-[#2D2D2D] transition-colors group">
      {candidate.flag && (
        <div
          className="flex items-center gap-[5px] px-2 py-[3px] w-fit"
          style={{ background: "rgba(255,214,0,0.08)", borderLeft: "2px solid #FFD600" }}
        >
          <span className="font-ibm-mono text-[7px] text-[#FFD600] tracking-[1px]">{candidate.flag}</span>
        </div>
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-[2px]">
          <span className="font-ibm-mono text-[9px] text-[#F5F5F0] leading-tight">{candidate.name}</span>
          <span className="font-ibm-mono text-[7px] text-[#444] tracking-[0.5px]">{candidate.role}</span>
          <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">{candidate.id}</span>
        </div>
        {/* Match score */}
        <div
          className="flex flex-col items-center justify-center w-[44px] h-[44px] border shrink-0"
          style={{ borderColor: matchColor(candidate.match), background: `${matchColor(candidate.match)}0D` }}
        >
          <span className="font-grotesk text-[14px] font-bold leading-none" style={{ color: matchColor(candidate.match) }}>
            {candidate.match}
          </span>
          <span className="font-ibm-mono text-[6px] text-[#444]">%</span>
        </div>
      </div>

      {/* Stage badge */}
      <div className="flex items-center justify-between">
        <span
          className="font-ibm-mono text-[7px] px-2 py-[2px] tracking-[1px]"
          style={{
            color: STAGE_CONFIG[candidate.stage].color,
            background: `${STAGE_CONFIG[candidate.stage].color}14`,
          }}
        >
          {candidate.stage}
        </span>
        {/* Move arrows */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onMove(candidate.id, "left")}
            disabled={stageIndex === 0}
            className="w-[20px] h-[20px] flex items-center justify-center text-[#444] hover:text-[#FFD600] disabled:opacity-20 transition-colors"
            aria-label="Move left"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M6 4H2M4 2L2 4l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
            </svg>
          </button>
          <button
            onClick={() => onMove(candidate.id, "right")}
            disabled={stageIndex === STAGES.length - 1}
            className="w-[20px] h-[20px] flex items-center justify-center text-[#444] hover:text-[#FFD600] disabled:opacity-20 transition-colors"
            aria-label="Move right"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M2 4h4M4 2l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [roleFilter, setRoleFilter] = useState("ALL");

  const roles = ["ALL", ...Array.from(new Set(initialCandidates.map((c) => c.role)))];

  const filtered = candidates.filter((c) => roleFilter === "ALL" || c.role === roleFilter);

  function moveCandidate(id: string, direction: "left" | "right") {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const idx = STAGES.indexOf(c.stage);
        const next = direction === "right" ? idx + 1 : idx - 1;
        if (next < 0 || next >= STAGES.length) return c;
        return { ...c, stage: STAGES[next] };
      })
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-6">
        <span className="font-ibm-mono text-[9px] text-[#444] tracking-[2px]">[04] // CANDIDATE PIPELINE</span>
        <h1 className="font-grotesk text-[24px] md:text-[32px] font-bold text-[#F5F5F0] tracking-[-1px]">
          Kanban Pipeline
        </h1>
        <p className="font-ibm-mono text-[10px] text-[#555] tracking-[0.5px]">
          Move candidates through stages using the arrow controls on each card
        </p>
      </div>

      {/* Role filter */}
      <div className="flex items-center gap-[1px] bg-[#1D1D1D] mb-6 w-fit">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className="px-4 py-2 font-ibm-mono text-[8px] tracking-[1px] transition-colors"
            style={{
              background: roleFilter === role ? "#FFD600" : "#0D0D0D",
              color: roleFilter === role ? "#0A0A0A" : "#555",
            }}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Kanban board */}
      <div className="flex gap-[1px] bg-[#1D1D1D] overflow-x-auto pb-2">
        {STAGES.map((stage) => {
          const stageCandidates = filtered.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="flex flex-col min-w-[220px] flex-1 bg-[#0A0A0A]">
              {/* Column header */}
              <div className="flex items-center justify-between px-3 py-3 border-b border-[#1D1D1D] bg-[#0D0D0D] sticky top-0">
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px]" style={{ background: STAGE_CONFIG[stage].color }} />
                  <span
                    className="font-ibm-mono text-[8px] tracking-[1.5px]"
                    style={{ color: STAGE_CONFIG[stage].color }}
                  >
                    {stage}
                  </span>
                </div>
                <span className="font-ibm-mono text-[8px] text-[#444]">{stageCandidates.length}</span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-[1px] p-2 bg-[#1D1D1D] flex-1 min-h-[400px]">
                {stageCandidates.length === 0 ? (
                  <div className="flex items-center justify-center flex-1 bg-[#0A0A0A] min-h-[80px]">
                    <span className="font-ibm-mono text-[8px] text-[#2D2D2D] tracking-[1px]">EMPTY</span>
                  </div>
                ) : (
                  stageCandidates.map((c) => (
                    <CandidateCard key={c.id} candidate={c} onMove={moveCandidate} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 flex-wrap">
        <span className="font-ibm-mono text-[8px] text-[#333] tracking-[1px]">MATCH SCORE:</span>
        {[
          { label: "85–100% EXCELLENT", color: "#FFD600" },
          { label: "65–84% GOOD",        color: "#E6C200" },
          { label: "45–64% FAIR",         color: "#888" },
          { label: "&lt;45% LOW",             color: "#FF6B35" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-[6px]">
            <div className="w-[6px] h-[6px]" style={{ background: l.color }} />
            <span className="font-ibm-mono text-[7px] text-[#444]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
