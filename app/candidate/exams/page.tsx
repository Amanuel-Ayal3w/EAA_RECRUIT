"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Exam Data ─────────────────────────────────────────────────────────────────
const questions = [
  {
    id: 1,
    type: "mcq" as const,
    text: "During a B787 pressurization system failure at FL380, which of the following is the correct immediate action?",
    options: [
      "Continue flight and notify ATC",
      "Don oxygen masks, initiate emergency descent to FL100, declare MAYDAY",
      "Reduce cabin altitude manually and continue cruise",
      "Notify cabin crew and passengers only",
    ],
    correct: 1,
  },
  {
    id: 2,
    type: "mcq" as const,
    text: "What is the standard ICAO phraseology for a pilot reporting 'ready for departure' at a controlled aerodrome?",
    options: [
      "'[Callsign] ready for takeoff'",
      "'[Callsign] holding short [runway], ready'",
      "'[Callsign] [position], ready for departure'",
      "'[Callsign] requesting takeoff clearance'",
    ],
    correct: 2,
  },
  {
    id: 3,
    type: "descriptive" as const,
    text: "Explain the concept of Crew Resource Management (CRM) and describe two specific scenarios in aviation where CRM principles directly prevented a potential accident.",
    placeholder: "Describe your understanding of CRM and provide two detailed scenarios...",
  },
  {
    id: 4,
    type: "mcq" as const,
    text: "Under ICAO Annex 6, what is the minimum required fuel for an IFR flight to an alternate aerodrome if weather minima cannot be met at the destination?",
    options: [
      "Fuel to alternate + 30 min reserve at cruise",
      "Fuel to destination + 45 min final reserve",
      "Fuel to alternate + 45 min at 1500ft holding speed",
      "Fuel to destination + alternate + 30 min contingency",
    ],
    correct: 2,
  },
  {
    id: 5,
    type: "descriptive" as const,
    text: "A passenger becomes medically incapacitated mid-flight over the Indian Ocean. Describe the decision-making process and coordination steps you would take as PIC.",
    placeholder: "Outline your step-by-step decision process as PIC, including coordination with ATC, cabin crew, and medical ground support...",
  },
];

const EXAM_DURATION_SECONDS = 45 * 60; // 45 minutes

type Stage = "identity" | "exam" | "submitted";

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

// ─── Identity Check ────────────────────────────────────────────────────────────
function IdentityCheck({ onConfirm }: { onConfirm: () => void }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] p-6">
      <div className="w-full max-w-[480px] flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-[3px] h-[20px] bg-[#FFD600]" />
            <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">IDENTITY VERIFICATION</span>
          </div>
          <h1 className="font-grotesk text-[24px] font-bold text-[#F5F5F0] tracking-[-1px]">
            Before You Begin
          </h1>
          <p className="font-ibm-mono text-[9px] text-[#555] leading-relaxed tracking-[0.3px]">
            This is a proctored AI assessment for the position of Senior Pilot (B787). Once started, the 45-minute timer cannot be paused. Tab-switching is monitored.
          </p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#2D2D2D] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 py-3 border-b border-[#1D1D1D]">
            <div className="w-[36px] h-[36px] bg-[#1A1A1A] border border-[#2D2D2D] flex items-center justify-center shrink-0">
              <span className="font-ibm-mono text-[10px] text-[#888]">AT</span>
            </div>
            <div className="flex flex-col gap-[1px]">
              <span className="font-ibm-mono text-[9px] text-[#F5F5F0] tracking-[1px]">AMANUEL TADESSE</span>
              <span className="font-ibm-mono text-[7px] text-[#444]">CANDIDATE ID: C001 // APP-001</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[1px] bg-[#1D1D1D]">
            {[
              { label: "EXAM", value: "Flight Operations Technical" },
              { label: "QUESTIONS", value: `${questions.length} (${questions.filter(q => q.type === "mcq").length} MCQ, ${questions.filter(q => q.type === "descriptive").length} DESC)` },
              { label: "DURATION", value: "45 MINUTES" },
              { label: "PROCTORED", value: "YES — AI MONITORED" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-[2px] bg-[#0D0D0D] px-3 py-3">
                <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">{item.label}</span>
                <span className="font-ibm-mono text-[8px] text-[#888]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <button
            onClick={() => setChecked((v) => !v)}
            className="flex items-center justify-center w-[18px] h-[18px] border shrink-0 mt-[1px] transition-all"
            style={{ borderColor: checked ? "#FFD600" : "#2D2D2D", background: checked ? "#FFD600" : "transparent" }}
          >
            {checked && (
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 4l2 2 4-4" stroke="#0A0A0A" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            )}
          </button>
          <span className="font-ibm-mono text-[8px] text-[#555] leading-relaxed tracking-[0.3px]">
            I confirm that I am Amanuel Tadesse and that I will complete this assessment independently without external assistance, in accordance with EAA Proclamation 1329/2023 guidelines.
          </span>
        </div>

        <button
          onClick={onConfirm}
          disabled={!checked}
          className="w-full h-[52px] font-ibm-mono text-[9px] font-bold tracking-[2px] transition-all"
          style={{
            background: checked ? "#FFD600" : "#1A1A1A",
            color: checked ? "#0A0A0A" : "#333",
            cursor: checked ? "pointer" : "not-allowed",
          }}
        >
          CONFIRM IDENTITY & START EXAM /
        </button>
      </div>
    </div>
  );
}

// ─── Exam Engine ───────────────────────────────────────────────────────────────
function ExamEngine({ onSubmit }: { onSubmit: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [tabWarnings, setTabWarnings] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current!); onSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [onSubmit]);

  // Tab-switch detection
  useEffect(() => {
    const handler = () => {
      if (document.hidden) setTabWarnings((w) => w + 1);
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  const q = questions[current];
  const answered = Object.keys(answers).length;
  const isUrgent = timeLeft < 300;

  const setAnswer = useCallback((val: string | number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: val }));
  }, [q.id]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)]">
      {/* Sticky exam bar */}
      <div className="sticky top-[60px] z-10 flex items-center justify-between px-6 py-3 bg-[#0D0D0D] border-b border-[#1D1D1D]">
        <div className="flex items-center gap-4">
          <span className="font-ibm-mono text-[8px] text-[#444] tracking-[1px]">
            Q{current + 1}/{questions.length}
          </span>
          <div className="flex items-center gap-[2px]">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-[20px] h-[5px] transition-all"
                style={{
                  background: i === current ? "#FFD600" : answers[questions[i].id] !== undefined ? "#FFD60040" : "#1D1D1D",
                }}
              />
            ))}
          </div>
          <span className="font-ibm-mono text-[7px] text-[#333]">{answered}/{questions.length} ANSWERED</span>
        </div>

        <div className="flex items-center gap-4">
          {tabWarnings > 0 && (
            <div className="flex items-center gap-2 px-3 py-[4px] border border-[#FF6B35]/40 bg-[#FF6B35]/08">
              <div className="w-[5px] h-[5px] rounded-full bg-[#FF6B35]" />
              <span className="font-ibm-mono text-[7px] text-[#FF6B35] tracking-[1px]">{tabWarnings} TAB SWITCH{tabWarnings > 1 ? "ES" : ""} DETECTED</span>
            </div>
          )}
          <div
            className="flex items-center gap-2 px-4 py-[6px]"
            style={{ background: isUrgent ? "#FF6B3514" : "#FFD60008", border: `1px solid ${isUrgent ? "#FF6B3540" : "#FFD60030"}` }}
          >
            <div className={`w-[5px] h-[5px] rounded-full ${isUrgent ? "bg-[#FF6B35] animate-pulse" : "bg-[#FFD600]"}`} />
            <span className="font-ibm-mono text-[10px] font-bold tracking-[2px]" style={{ color: isUrgent ? "#FF6B35" : "#FFD600" }}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Question nav sidebar */}
        <aside className="hidden md:flex flex-col w-[200px] shrink-0 border-r border-[#1D1D1D] bg-[#0D0D0D] p-4 gap-[2px]">
          <span className="font-ibm-mono text-[7px] text-[#333] tracking-[1px] mb-2">QUESTIONS</span>
          {questions.map((q, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="flex items-center gap-3 px-3 py-2 text-left transition-all"
              style={{
                background: i === current ? "#FFD60010" : "transparent",
                borderLeft: i === current ? "2px solid #FFD600" : "2px solid transparent",
              }}
            >
              <span className="font-ibm-mono text-[8px] tracking-[1px]" style={{ color: i === current ? "#FFD600" : answers[questions[i].id] !== undefined ? "#888" : "#333" }}>
                Q{i + 1}
              </span>
              <span className="font-ibm-mono text-[7px] tracking-[0.5px]" style={{ color: "#333" }}>
                {q.type === "mcq" ? "MCQ" : "DESC"}
              </span>
              {answers[questions[i].id] !== undefined && (
                <div className="w-[5px] h-[5px] rounded-full bg-[#FFD600] ml-auto shrink-0" />
              )}
            </button>
          ))}
        </aside>

        {/* Main question */}
        <div className="flex-1 p-6 md:p-10 flex flex-col gap-6 max-w-[760px]">
          <div className="flex items-center gap-3">
            <span
              className="font-ibm-mono text-[7px] px-2 py-[3px] tracking-[1px]"
              style={{ color: q.type === "mcq" ? "#FFD600" : "#888", background: q.type === "mcq" ? "#FFD60010" : "#88888810", border: `1px solid ${q.type === "mcq" ? "#FFD60030" : "#2D2D2D"}` }}
            >
              {q.type === "mcq" ? "MULTIPLE CHOICE" : "DESCRIPTIVE"}
            </span>
            <span className="font-ibm-mono text-[7px] text-[#333] tracking-[1px]">QUESTION {current + 1} OF {questions.length}</span>
          </div>

          <p className="font-grotesk text-[16px] md:text-[18px] text-[#F5F5F0] leading-relaxed">
            {q.text}
          </p>

          {q.type === "mcq" && (
            <div className="flex flex-col gap-[1px] bg-[#1D1D1D]">
              {q.options!.map((opt, i) => {
                const selected = answers[q.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswer(i)}
                    className="flex items-center gap-4 px-5 py-4 text-left transition-all bg-[#0D0D0D] hover:bg-[#111]"
                    style={{ borderLeft: selected ? "3px solid #FFD600" : "3px solid transparent" }}
                  >
                    <div
                      className="flex items-center justify-center w-[20px] h-[20px] shrink-0 border rounded-full transition-all"
                      style={{ borderColor: selected ? "#FFD600" : "#2D2D2D", background: selected ? "#FFD600" : "transparent" }}
                    >
                      {selected && <div className="w-[8px] h-[8px] rounded-full bg-[#0A0A0A]" />}
                    </div>
                    <span className="font-ibm-mono text-[9px] tracking-[0.5px] leading-relaxed" style={{ color: selected ? "#F5F5F0" : "#555" }}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "descriptive" && (
            <div className="flex flex-col gap-2">
              <textarea
                value={(answers[q.id] as string) ?? ""}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={(q as { placeholder?: string }).placeholder ?? ""}
                rows={8}
                className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-[#F5F5F0] font-ibm-mono text-[10px] p-4 focus:outline-none focus:border-[#FFD600] placeholder:text-[#222] resize-none tracking-[0.3px] leading-relaxed transition-colors"
              />
              <div className="flex items-center justify-between">
                <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">
                  Your answer will be vectorized and compared against the ideal response model.
                </span>
                <span className="font-ibm-mono text-[7px] text-[#444]">
                  {((answers[q.id] as string) ?? "").length} chars
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1D1D1D]">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="flex items-center gap-2 px-4 h-[38px] border border-[#2D2D2D] font-ibm-mono text-[8px] text-[#555] hover:text-[#F5F5F0] hover:border-[#555] transition-colors disabled:opacity-30 disabled:cursor-not-allowed tracking-[1px]"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
              </svg>
              PREV
            </button>

            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
                className="flex items-center gap-2 px-4 h-[38px] bg-[#1A1A1A] border border-[#2D2D2D] font-ibm-mono text-[8px] text-[#F5F5F0] hover:border-[#FFD600] transition-colors tracking-[1px]"
              >
                NEXT
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                </svg>
              </button>
            ) : (
              <button
                onClick={onSubmit}
                className="flex items-center gap-2 px-6 h-[38px] bg-[#FFD600] font-ibm-mono text-[8px] font-bold text-[#0A0A0A] tracking-[1.5px] hover:bg-[#E6C200] transition-colors"
              >
                SUBMIT EXAM /
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Submitted screen ──────────────────────────────────────────────────────────
function SubmittedScreen() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] p-6">
      <div className="flex flex-col items-center gap-6 text-center max-w-[420px]">
        <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#FFD600]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12l5 5L20 7" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-grotesk text-[24px] font-bold text-[#F5F5F0] tracking-[-1px]">Exam Submitted</h2>
          <p className="font-ibm-mono text-[9px] text-[#555] leading-relaxed tracking-[0.3px]">
            Your responses have been securely submitted. The AI engine will now vectorize your descriptive answers and score your exam. Results will appear in your Feedback page within 24 hours.
          </p>
        </div>
        <div className="flex flex-col gap-[1px] w-full bg-[#1D1D1D]">
          {[
            { label: "EXAM", value: "Flight Operations Technical" },
            { label: "STATUS", value: "PROCESSING..." },
            { label: "RESULT ETA", value: "WITHIN 24 HOURS" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-4 py-3 bg-[#0D0D0D]">
              <span className="font-ibm-mono text-[8px] text-[#333] tracking-[1px]">{item.label}</span>
              <span className="font-ibm-mono text-[8px] text-[#888] tracking-[1px]">{item.value}</span>
            </div>
          ))}
        </div>
        <a
          href="/candidate/feedback"
          className="w-full flex items-center justify-center h-[44px] bg-[#FFD600] font-ibm-mono text-[9px] font-bold text-[#0A0A0A] tracking-[1.5px] hover:bg-[#E6C200] transition-colors"
        >
          VIEW FEEDBACK PAGE /
        </a>
        <a href="/candidate" className="font-ibm-mono text-[8px] text-[#444] hover:text-[#FFD600] tracking-[1px] transition-colors">
          BACK TO DASHBOARD /
        </a>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExamsPage() {
  const [stage, setStage] = useState<Stage>("identity");

  return (
    <>
      {stage === "identity" && <IdentityCheck onConfirm={() => setStage("exam")} />}
      {stage === "exam" && <ExamEngine onSubmit={() => setStage("submitted")} />}
      {stage === "submitted" && <SubmittedScreen />}
    </>
  );
}
