"use client";

import { useState, useRef, useCallback } from "react";

const jobs = [
  {
    id: "JOB-001", title: "Senior Pilot (B787)", department: "Flight Operations",
    openings: 4, deadline: "30 May 2025", match: 94,
    tags: ["ATPL", "B787 Type Rating", "5+ Yrs PIC"],
    desc: "Command Boeing 787 aircraft on Ethiopian Airlines international routes. Requires ATPL, ICAO English L4+, and 5 years PIC experience.",
  },
  {
    id: "JOB-002", title: "Junior Cabin Crew", department: "In-Flight Services",
    openings: 12, deadline: "15 May 2025", match: 71,
    tags: ["Customer Service", "First Aid", "Amharic/English"],
    desc: "Provide exceptional passenger experience on domestic and international flights. Must hold valid First Aid certificate.",
  },
  {
    id: "JOB-003", title: "Avionics Technician", department: "Maintenance & Engineering",
    openings: 6, deadline: "22 May 2025", match: 88,
    tags: ["Avionics Diploma", "ILS Calibration", "EASA Part-66"],
    desc: "Maintain and repair avionics systems on wide-body aircraft. EASA Part-66 Module 11/13 preferred.",
  },
  {
    id: "JOB-004", title: "Flight Instructor", department: "EAA Academy",
    openings: 3, deadline: "10 Jun 2025", match: 61,
    tags: ["CPL", "FI Rating", "500+ Hrs"],
    desc: "Train student pilots at the Ethiopian Aviation Academy on Cessna 172 and Diamond DA40 aircraft.",
  },
  {
    id: "JOB-005", title: "Air Traffic Controller", department: "ATC Operations",
    openings: 5, deadline: "01 Jun 2025", match: 55,
    tags: ["ICAO ATCO", "Radar Endorsed", "ECAA License"],
    desc: "Provide safe and efficient ATC services at Bole International Airport. ECAA license and radar endorsement required.",
  },
];

type UploadStage = "idle" | "extracting" | "embedding" | "done";

function matchColor(score: number) {
  if (score >= 85) return "#FFD600";
  if (score >= 65) return "#E6C200";
  if (score >= 45) return "#888";
  return "#FF6B35";
}

function MatchBadge({ score }: { score: number }) {
  return (
    <div
      className="flex items-center justify-center px-2 py-[3px]"
      style={{ background: `${matchColor(score)}12`, border: `1px solid ${matchColor(score)}40` }}
    >
      <span className="font-ibm-mono text-[8px] font-bold" style={{ color: matchColor(score) }}>
        {score}% MATCH
      </span>
    </div>
  );
}

// ─── Smart CV Upload Modal ─────────────────────────────────────────────────────
function UploadModal({ job, onClose }: { job: typeof jobs[0]; onClose: () => void }) {
  const [stage, setStage] = useState<UploadStage>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback((name: string) => {
    setFileName(name);
    setStage("extracting");
    setTimeout(() => setStage("embedding"), 2200);
    setTimeout(() => setStage("done"), 4200);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) simulateUpload(file.name);
    },
    [simulateUpload]
  );

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) simulateUpload(file.name);
  };

  const stageProgress: Record<UploadStage, number> = { idle: 0, extracting: 40, embedding: 80, done: 100 };
  const stageLabel: Record<UploadStage, string> = {
    idle: "WAITING FOR FILE",
    extracting: "EXTRACTING TEXT FROM CV...",
    embedding: "GENERATING VECTOR EMBEDDINGS...",
    done: "PROFILE READY — SUBMISSION COMPLETE",
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D] border border-[#2D2D2D] w-full max-w-[560px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1D1D1D]">
          <div className="flex flex-col gap-[2px]">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-[14px] bg-[#FFD600]" />
              <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">SMART CV UPLOADER</span>
            </div>
            <span className="font-grotesk text-[16px] font-bold text-[#F5F5F0] pl-[18px]">{job.title}</span>
            <span className="font-ibm-mono text-[7px] text-[#444] pl-[18px]">{job.department} // {job.id}</span>
          </div>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] flex items-center justify-center text-[#444] hover:text-[#F5F5F0] border border-[#2D2D2D] transition-colors"
            aria-label="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
            </svg>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => stage === "idle" && inputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 h-[160px] border-2 border-dashed transition-all cursor-pointer"
            style={{ borderColor: dragOver ? "#FFD600" : stage !== "idle" ? "#2D2D2D" : "#2D2D2D", background: dragOver ? "#FFD60008" : "#111" }}
          >
            <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" onChange={handleFile} />
            {stage === "idle" ? (
              <>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-[#444]">
                  <path d="M14 4v14M7 11l7-7 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                  <path d="M4 22h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-ibm-mono text-[9px] text-[#555] tracking-[1px]">DRAG & DROP YOUR CV HERE</span>
                  <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">PDF / DOCX / IMAGE — MAX 10MB</span>
                </div>
                <button className="px-4 py-[6px] border border-[#2D2D2D] font-ibm-mono text-[8px] text-[#555] hover:text-[#F5F5F0] hover:border-[#555] tracking-[1px] transition-colors">
                  OR BROWSE FILES /
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="font-ibm-mono text-[8px] text-[#F5F5F0] tracking-[1px]">{fileName}</span>
                {stage !== "done" && (
                  <div className="w-[28px] h-[28px] border-2 border-[#FFD600] border-t-transparent rounded-full animate-spin" />
                )}
                {stage === "done" && (
                  <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#FFD600]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#0A0A0A" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-ibm-mono text-[8px] text-[#555] tracking-[1px]">{stageLabel[stage]}</span>
              <span className="font-ibm-mono text-[8px]" style={{ color: stage === "done" ? "#FFD600" : "#555" }}>
                {stageProgress[stage]}%
              </span>
            </div>
            <div className="w-full h-[3px] bg-[#1A1A1A]">
              <div
                className="h-full bg-[#FFD600] transition-all duration-700"
                style={{ width: `${stageProgress[stage]}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-[1px] bg-[#1D1D1D]">
            {[
              { label: "TEXT EXTRACTION (OCR + PDF PARSE)", active: stage === "extracting", done: stage === "embedding" || stage === "done" },
              { label: "VECTOR EMBEDDING GENERATION",        active: stage === "embedding",  done: stage === "done" },
              { label: "SEMANTIC MATCH WITH JOB PROFILE",    active: false,                  done: stage === "done" },
            ].map((step) => (
              <div key={step.label} className="flex items-center gap-3 px-4 py-3 bg-[#0D0D0D]">
                <div
                  className="flex items-center justify-center w-[16px] h-[16px] shrink-0 border"
                  style={{ borderColor: step.done ? "#FFD600" : step.active ? "#FFD600" : "#2D2D2D", background: step.done ? "#FFD600" : "transparent" }}
                >
                  {step.done && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2 4-4" stroke="#0A0A0A" strokeWidth="1.4" strokeLinecap="square" />
                    </svg>
                  )}
                  {step.active && <div className="w-[4px] h-[4px] bg-[#FFD600] animate-pulse" />}
                </div>
                <span
                  className="font-ibm-mono text-[8px] tracking-[1px]"
                  style={{ color: step.done ? "#FFD600" : step.active ? "#F5F5F0" : "#333" }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Submit */}
          {stage === "done" && (
            <button
              onClick={onClose}
              className="w-full h-[48px] bg-[#FFD600] font-ibm-mono text-[9px] font-bold text-[#0A0A0A] tracking-[2px] hover:bg-[#E6C200] transition-colors"
            >
              SUBMIT APPLICATION /
            </button>
          )}

          <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">
            Your data is processed locally and stored on Ethiopian servers — Proclamation 1329/2023 compliant.
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FindJobsPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");
  const [applying, setApplying] = useState<typeof jobs[0] | null>(null);

  const depts = ["ALL", ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filtered = jobs.filter((j) => {
    const matchesDept = deptFilter === "ALL" || j.department === deptFilter;
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto flex flex-col gap-8">
      {applying && <UploadModal job={applying} onClose={() => setApplying(null)} />}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-ibm-mono text-[9px] text-[#444] tracking-[2px]">[02] // FIND JOBS</span>
        <h1 className="font-grotesk text-[24px] md:text-[32px] font-bold text-[#F5F5F0] tracking-[-1px]">Job Listings</h1>
        <p className="font-ibm-mono text-[10px] text-[#555] tracking-[0.5px]">
          Active openings at Ethiopian Airlines and the Ethiopian Aviation Academy. Match scores are based on your uploaded profile.
        </p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]">
            <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-[#F5F5F0] font-ibm-mono text-[10px] pl-8 pr-4 py-3 focus:outline-none focus:border-[#FFD600] placeholder:text-[#333] transition-colors tracking-[0.5px]"
          />
        </div>
        <div className="flex items-center gap-[1px] bg-[#1D1D1D] flex-wrap">
          {depts.map((d) => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              className="px-3 py-3 font-ibm-mono text-[7px] tracking-[1px] transition-colors whitespace-nowrap"
              style={{ background: deptFilter === d ? "#FFD600" : "#0D0D0D", color: deptFilter === d ? "#0A0A0A" : "#555" }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Job cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1D1D1D]">
        {filtered.map((job) => (
          <div key={job.id} className="bg-[#0D0D0D] p-5 flex flex-col gap-4 hover:bg-[#111] transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-[3px]">
                <span className="font-grotesk text-[15px] font-bold text-[#F5F5F0]">{job.title}</span>
                <span className="font-ibm-mono text-[8px] text-[#444] tracking-[1px]">{job.department}</span>
              </div>
              <MatchBadge score={job.match} />
            </div>

            <p className="font-ibm-mono text-[9px] text-[#555] leading-relaxed tracking-[0.3px]">{job.desc}</p>

            <div className="flex flex-wrap gap-[1px] bg-[#1D1D1D]">
              {job.tags.map((tag) => (
                <span key={tag} className="font-ibm-mono text-[7px] text-[#888] bg-[#0D0D0D] px-2 py-[4px] tracking-[0.5px]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#111]">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-[1px]">
                  <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">OPENINGS</span>
                  <span className="font-ibm-mono text-[11px] font-bold text-[#F5F5F0]">{job.openings}</span>
                </div>
                <div className="w-[1px] h-[24px] bg-[#1D1D1D]" />
                <div className="flex flex-col gap-[1px]">
                  <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">DEADLINE</span>
                  <span className="font-ibm-mono text-[9px] text-[#888]">{job.deadline}</span>
                </div>
              </div>
              <button
                onClick={() => setApplying(job)}
                className="px-4 h-[34px] bg-[#FFD600] font-ibm-mono text-[8px] font-bold text-[#0A0A0A] tracking-[1.5px] hover:bg-[#E6C200] transition-colors"
              >
                APPLY /
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex items-center justify-center py-16 border border-[#1D1D1D]">
          <span className="font-ibm-mono text-[9px] text-[#333] tracking-[1px]">NO JOBS MATCH YOUR SEARCH</span>
        </div>
      )}
    </div>
  );
}
