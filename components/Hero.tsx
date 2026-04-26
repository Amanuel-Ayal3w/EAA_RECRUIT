"use client";

import { useEffect, useState } from "react";
import GlitchText from "@/components/GlitchText";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative flex flex-col items-center w-full min-h-[100svh] overflow-hidden bg-[#0A0A0A]">
      {/* Vercel-style grid background */}
      <div className="absolute inset-0 z-0">
        {/* Fine grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Subtle radial glow from center — yellow tinted */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,214,0,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-6 md:px-[120px] pt-[140px] pb-[80px] md:pt-[160px] md:pb-[100px]">
        {/* Badge */}
        <div className="flex items-center gap-[8px] h-[32px] px-[12px] md:px-[16px] bg-[#FFD600]/10 border-2 border-[#FFD600]">
          <div className="w-[6px] h-[6px] bg-[#FFD600] shrink-0 rounded-full" />
          <span className="font-ibm-mono text-[9px] md:text-[11px] font-bold text-[#FFD600] tracking-[1px] md:tracking-[2px] whitespace-nowrap">
            [AI-POWERED] // ETHIOPIAN AVIATION ACADEMY RECRUITMENT PLATFORM
          </span>
        </div>

        <div className="h-8 md:h-10" />

        {/* Headline */}
        <h1 className="font-grotesk text-[clamp(36px,9vw,88px)] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.0] text-center w-full max-w-[1100px] text-balance">
          <GlitchText text="THE FUTURE OF" speed={45} delay={100} />
          <br />
          <span className="text-[#FFD600]">
            <GlitchText text="AVIATION" speed={45} delay={300} />
          </span>
          <br />
          <GlitchText text="RECRUITMENT." speed={45} delay={500} />
        </h1>

        <div className="h-6 md:h-8" />

        {/* Subheading */}
        <p className="font-ibm-mono text-[13px] md:text-[15px] text-[#AAAAAA] tracking-[1px] leading-[1.6] text-center w-full max-w-[680px]">
          AN AI-POWERED PLATFORM FOR ETHIOPIAN AIRLINES AND THE ETHIOPIAN
          AVIATION ACADEMY. TRANSPARENT, FAIR, AND FAST-TRACK HIRING IN UNDER
          4 WEEKS.
        </p>

        <div className="h-10 md:h-12" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#"
            className="flex items-center justify-center w-full sm:w-[200px] h-[56px] bg-[#FFD600] hover:bg-[#e6c200] transition-colors"
          >
            <span className="font-grotesk text-[12px] font-bold text-[#0A0A0A] tracking-[2px]">
              REGISTER NOW
            </span>
          </a>
          <a
            href="#jobs"
            className="flex items-center justify-center w-full sm:w-[200px] h-[56px] bg-[#0A0A0A]/60 border-2 border-[#2D2D2D] hover:border-[#FFD600] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="font-ibm-mono text-[12px] text-[#AAAAAA] tracking-[2px] hover:text-[#F5F5F0] transition-colors">
              BROWSE JOBS &gt;
            </span>
          </a>
        </div>

        <div className="h-6" />

        <p className="font-ibm-mono text-[11px] text-[#666666] tracking-[2px] text-center">
          FAST-TRACK CYCLE // DATA STAYS IN ETHIOPIA // COMPLIANT WITH PROCLAMATION NO. 1329/2023
        </p>

        <div className="h-16 md:h-20" />

        {/* Stats strip */}
        <div
          className="flex flex-col sm:flex-row items-stretch w-full max-w-[860px] border border-[#2D2D2D]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
          }}
        >
          {[
            { value: "< 4 WEEKS", label: "RECRUITMENT CYCLE" },
            { value: "AI-PARSED", label: "CV PROCESSING" },
            { value: "XAI SCORED", label: "EXPLAINABLE RESULTS" },
            { value: "100% LOCAL", label: "DATA SOVEREIGNTY" },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center gap-1 py-5 flex-1 ${
                i < arr.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[#2D2D2D]" : ""
              }`}
              style={{
                background:
                  i === 0
                    ? "rgba(255,214,0,0.06)"
                    : "rgba(10,10,10,0.6)",
              }}
            >
              <span className="font-grotesk text-[18px] md:text-[22px] font-bold text-[#FFD600] tracking-[-0.5px]">
                {stat.value}
              </span>
              <span className="font-ibm-mono text-[9px] md:text-[10px] text-[#666666] tracking-[1.5px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
