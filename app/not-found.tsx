"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WAYPOINTS = [
  { time: "08:00", label: "ORIGIN: ADDIS ABABA (ADD)", status: "DEPARTED" },
  { time: "??:??", label: "TRANSIT: REQUESTED ROUTE", status: "DIVERTED" },
  { time: "—:——", label: "DESTINATION: NOT FOUND", status: "UNAVAILABLE" },
];

export default function NotFound() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 800);
    return () => clearInterval(id);
  }, []);

  const dots = ".".repeat((tick % 3) + 1);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6 py-16 overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,214,0,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[640px] gap-10 w-full">

        {/* Animated aircraft SVG */}
        <div className="relative w-full h-[120px] flex items-center justify-center">
          <div
            className="absolute"
            style={{
              animation: "float404 4s ease-in-out infinite",
            }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
              {/* Fuselage */}
              <path d="M10 30 Q40 20 80 28 Q100 30 110 30 Q100 32 80 32 Q40 40 10 30Z" fill="#FFD600" />
              {/* Wing */}
              <path d="M45 29 L30 10 L55 26Z" fill="#FFD600" opacity="0.7" />
              {/* Tail */}
              <path d="M12 29 L5 20 L14 28Z" fill="#FFD600" opacity="0.6" />
              {/* Engine */}
              <ellipse cx="60" cy="34" rx="10" ry="4" fill="#1A1A1A" stroke="#FFD600" strokeWidth="1" />
              {/* Exhaust dots */}
              <circle cx="50" cy="34" r="1.5" fill="#FFD600" opacity="0.4" />
              <circle cx="45" cy="34" r="1" fill="#FFD600" opacity="0.2" />
            </svg>
          </div>
          {/* Dashed flight path */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center px-8">
            <div className="flex-1 border-t-2 border-dashed border-[#1D1D1D]" />
            <div className="w-3 h-3 border-2 border-[#FFD600]/40 rotate-45 mx-4 shrink-0" />
            <div className="flex-1 border-t-2 border-dashed border-[#FFD600]/20" />
          </div>
        </div>

        <style>{`
          @keyframes float404 {
            0%, 100% { transform: translateY(0px) rotate(-2deg); }
            50% { transform: translateY(-14px) rotate(2deg); }
          }
        `}</style>

        {/* Error code */}
        <div>
          <p className="font-ibm-mono text-[9px] text-[#FFD600] tracking-[3px] mb-3">[SYS-404] // ROUTE NOT FOUND</p>
          <h1 className="font-grotesk text-[80px] md:text-[120px] font-bold text-[#F5F5F0] leading-none tracking-[-4px]">
            4<span className="text-[#FFD600]">0</span>4
          </h1>
          <h2 className="font-grotesk text-[20px] md:text-[26px] font-bold text-[#F5F5F0] tracking-[-0.5px] mt-2 text-balance">
            THIS FLIGHT HAS BEEN DIVERTED
          </h2>
          <p className="font-ibm-mono text-[11px] text-[#555] tracking-[0.5px] leading-[1.8] mt-3">
            THE ROUTE YOU REQUESTED DOES NOT EXIST IN OUR SYSTEM. THE AIRSPACE MAY HAVE CHANGED OR THE URL IS INCORRECT{dots}
          </p>
        </div>

        {/* Flight log */}
        <div className="w-full border border-[#1D1D1D] bg-[#0D0D0D]">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-[#1D1D1D]">
            <div className="w-[5px] h-[5px] rounded-full bg-red-500 animate-pulse" />
            <span className="font-ibm-mono text-[8px] text-[#555] tracking-[1.5px]">FLIGHT LOG // NAVIGATION REPORT</span>
          </div>
          {WAYPOINTS.map((wp, i) => (
            <div key={i} className={`flex items-center justify-between gap-4 px-5 py-4 ${i < WAYPOINTS.length - 1 ? "border-b border-[#1D1D1D]" : ""}`}>
              <span className="font-ibm-mono text-[9px] text-[#333] tracking-[1px] w-[40px] shrink-0">{wp.time}</span>
              <span className="font-ibm-mono text-[9px] text-[#888] tracking-[0.5px] flex-1 text-left">{wp.label}</span>
              <span className={`font-ibm-mono text-[8px] tracking-[1px] shrink-0 ${wp.status === "DEPARTED" ? "text-[#FFD600]" : wp.status === "DIVERTED" ? "text-orange-400" : "text-red-400"}`}>
                {wp.status}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link href="/" className="flex flex-1 items-center justify-center h-[52px] bg-[#FFD600] hover:bg-[#e6c200] transition-colors">
            <span className="font-grotesk text-[11px] font-bold text-[#0A0A0A] tracking-[2px]">RETURN TO BASE (HOME)</span>
          </Link>
          <Link href="/login" className="flex flex-1 items-center justify-center h-[52px] border-2 border-[#2D2D2D] hover:border-[#FFD600] transition-colors">
            <span className="font-ibm-mono text-[9px] text-[#888] hover:text-[#FFD600] tracking-[1.5px] transition-colors">GO TO SIGN IN</span>
          </Link>
        </div>

        <p className="font-ibm-mono text-[8px] text-[#2D2D2D] tracking-[0.5px]">
          EAA RECRUIT // FLIGHT CONTROL SYSTEM v2.4.1
        </p>
      </div>
    </div>
  );
}
