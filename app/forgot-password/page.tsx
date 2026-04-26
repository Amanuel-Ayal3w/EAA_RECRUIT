"use client";

import { useState } from "react";
import Link from "next/link";

const BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

export default function ForgotPasswordPage() {
  const [lang, setLang] = useState<"en" | "am">("en");
  const [stage, setStage] = useState<"request" | "sent" | "reset" | "done">("request");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const isEn = lang === "en";

  function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(isEn ? "INVALID EMAIL FORMAT" : "ትክክለኛ ኢሜይል ያስፈልጋል");
      return;
    }
    setEmailError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStage("sent"); }, 1400);
  }

  function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) { setPassError(isEn ? "MINIMUM 8 CHARACTERS" : "ቢያንስ 8 ቁምፊዎች"); return; }
    if (newPassword !== confirmPassword) { setPassError(isEn ? "PASSWORDS DO NOT MATCH" : "የምስጢር ቃሎቹ አይዛመዱም"); return; }
    setPassError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStage("done"); }, 1400);
  }

  const Grid = () => (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0" style={BG} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,214,0,0.06) 0%, transparent 70%)" }} />
    </div>
  );

  if (stage === "done") {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6">
        <Grid />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-[420px]">
          <div className="flex items-center justify-center w-[64px] h-[64px] bg-[#FFD600]">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14l5 5L22 8" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="square" /></svg>
          </div>
          <div>
            <h1 className="font-grotesk text-[28px] font-bold text-[#F5F5F0] tracking-[-0.5px]">
              {isEn ? "PASSWORD UPDATED" : "የምስጢር ቃሉ ተዘምኗል"}
            </h1>
            <p className="font-ibm-mono text-[10px] text-[#555] tracking-[1px] leading-[1.8] mt-3">
              {isEn ? "YOUR PASSWORD HAS BEEN SUCCESSFULLY RESET. YOU CAN NOW SIGN IN WITH YOUR NEW CREDENTIALS." : "የምስጢር ቃልዎ በተሳካ ሁኔታ ተቀይሯል።"}
            </p>
          </div>
          <Link href="/login" className="flex items-center justify-center w-full h-[52px] bg-[#FFD600] hover:bg-[#e6c200] transition-colors">
            <span className="font-grotesk text-[12px] font-bold text-[#0A0A0A] tracking-[2px]">{isEn ? "SIGN IN NOW" : "አሁን ግባ"}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6 py-12">
      <Grid />
      <div className="relative z-10 w-full max-w-[420px] flex flex-col gap-7">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-[32px] h-[32px] bg-[#FFD600]">
            <span className="font-ibm-mono text-[9px] font-bold text-[#0A0A0A]">EAA</span>
          </div>
          <span className="font-ibm-mono text-[10px] font-bold text-[#F5F5F0] tracking-[2px]">EAA RECRUIT</span>
        </div>

        {/* Lang toggle */}
        <div className="flex items-center w-fit border border-[#2D2D2D]">
          {(["en", "am"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`px-4 py-[6px] font-ibm-mono text-[9px] tracking-[1.5px] transition-colors ${lang === l ? "bg-[#FFD600] text-[#0A0A0A] font-bold" : "text-[#555] hover:text-[#F5F5F0]"}`}>
              {l === "en" ? "EN" : "አማ"}
            </button>
          ))}
        </div>

        {/* Stage: Request */}
        {stage === "request" && (
          <>
            <div>
              <p className="font-ibm-mono text-[9px] text-[#FFD600] tracking-[2px] mb-2">[AUTH] // PASSWORD RECOVERY</p>
              <h1 className="font-grotesk text-[24px] font-bold text-[#F5F5F0] tracking-[-0.5px]">
                {isEn ? "FORGOT YOUR PASSWORD?" : "የምስጢር ቃልዎን ረሱ?"}
              </h1>
              <p className="font-ibm-mono text-[9px] text-[#555] tracking-[0.5px] leading-[1.8] mt-2">
                {isEn ? "ENTER YOUR REGISTERED EMAIL ADDRESS. WE'LL SEND A SECURE RESET LINK VIA SMTP." : "የተመዘገበ ኢሜይልዎን ያስገቡ። ደህንነቱ የተጠበቀ ማገናኛ እንልካለን።"}
              </p>
            </div>
            <form onSubmit={handleRequest} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-ibm-mono text-[9px] text-[#666] tracking-[1.5px]">
                  {isEn ? "EMAIL ADDRESS" : "ኢሜይል አድራሻ"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  placeholder="you@example.com"
                  className={`h-[48px] bg-[#0D0D0D] border px-4 font-ibm-mono text-[12px] text-[#F5F5F0] placeholder-[#333] focus:outline-none transition-colors ${emailError ? "border-red-500/60" : "border-[#2D2D2D] focus:border-[#FFD600]"}`}
                />
                {emailError && <span className="font-ibm-mono text-[8px] text-red-400 tracking-[0.5px]">{emailError}</span>}
              </div>
              <button type="submit" disabled={loading} className="h-[52px] bg-[#FFD600] hover:bg-[#e6c200] disabled:opacity-50 transition-colors flex items-center justify-center gap-3">
                {loading && <div className="w-[14px] h-[14px] border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />}
                <span className="font-grotesk text-[12px] font-bold text-[#0A0A0A] tracking-[2px]">{isEn ? "SEND RESET LINK" : "ማገናኛ ላክ"}</span>
              </button>
            </form>
          </>
        )}

        {/* Stage: Sent */}
        {stage === "sent" && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-ibm-mono text-[9px] text-[#FFD600] tracking-[2px] mb-2">[AUTH] // CHECK YOUR EMAIL</p>
              <h1 className="font-grotesk text-[24px] font-bold text-[#F5F5F0] tracking-[-0.5px]">
                {isEn ? "RESET LINK SENT" : "ማገናኛ ተልኳል"}
              </h1>
            </div>
            <div className="flex items-start gap-4 p-5 border border-[#FFD600]/20 bg-[#FFD600]/04">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#FFD600] mt-[2px] shrink-0">
                <rect x="1" y="4" width="18" height="13" stroke="currentColor" strokeWidth="1.4" />
                <path d="M1 4l9 8 9-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
              <div>
                <p className="font-ibm-mono text-[10px] text-[#F5F5F0] tracking-[0.5px] leading-[1.8]">
                  {isEn
                    ? `A SECURE RESET LINK HAS BEEN SENT TO ${email}. CHECK YOUR INBOX AND SPAM FOLDER.`
                    : `ደህንነቱ የተጠበቀ ማገናኛ ወደ ${email} ተልኳል።`}
                </p>
                <p className="font-ibm-mono text-[8px] text-[#444] tracking-[0.5px] mt-2">
                  {isEn ? "LINK EXPIRES IN 30 MINUTES" : "ማገናኛው በ30 ደቂቃ ውስጥ ያበቃል"}
                </p>
              </div>
            </div>
            {/* Simulate clicking the link */}
            <button
              onClick={() => setStage("reset")}
              className="flex items-center justify-center h-[48px] border-2 border-[#2D2D2D] hover:border-[#FFD600] transition-colors"
            >
              <span className="font-ibm-mono text-[9px] text-[#888] hover:text-[#FFD600] tracking-[1.5px] transition-colors">
                {isEn ? "SIMULATE: OPEN RESET LINK" : "ምሳሌ: ማገናኛ ክፈት"}
              </span>
            </button>
            <button onClick={() => setStage("request")} className="font-ibm-mono text-[8px] text-[#444] hover:text-[#FFD600] tracking-[1px] transition-colors text-center">
              {isEn ? "BACK / USE DIFFERENT EMAIL" : "ተመለስ / ሌላ ኢሜይል ተጠቀም"}
            </button>
          </div>
        )}

        {/* Stage: Reset */}
        {stage === "reset" && (
          <>
            <div>
              <p className="font-ibm-mono text-[9px] text-[#FFD600] tracking-[2px] mb-2">[AUTH] // SET NEW PASSWORD</p>
              <h1 className="font-grotesk text-[24px] font-bold text-[#F5F5F0] tracking-[-0.5px]">
                {isEn ? "CREATE NEW PASSWORD" : "አዲስ የምስጢር ቃል ፍጠር"}
              </h1>
            </div>
            <form onSubmit={handleReset} className="flex flex-col gap-5">
              {[
                { label: isEn ? "NEW PASSWORD" : "አዲስ የምስጢር ቃል", val: newPassword, set: setNewPassword },
                { label: isEn ? "CONFIRM PASSWORD" : "ያረጋግጡ", val: confirmPassword, set: setConfirmPassword },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-2">
                  <label className="font-ibm-mono text-[9px] text-[#666] tracking-[1.5px]">{f.label}</label>
                  <input
                    type="password"
                    value={f.val}
                    onChange={(e) => { f.set(e.target.value); setPassError(""); }}
                    placeholder="••••••••••••"
                    className="h-[48px] bg-[#0D0D0D] border border-[#2D2D2D] px-4 font-ibm-mono text-[12px] text-[#F5F5F0] placeholder-[#333] focus:outline-none focus:border-[#FFD600] transition-colors"
                  />
                </div>
              ))}
              {passError && <span className="font-ibm-mono text-[8px] text-red-400 tracking-[0.5px]">{passError}</span>}
              <button type="submit" disabled={loading} className="h-[52px] bg-[#FFD600] hover:bg-[#e6c200] disabled:opacity-50 transition-colors flex items-center justify-center gap-3">
                {loading && <div className="w-[14px] h-[14px] border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />}
                <span className="font-grotesk text-[12px] font-bold text-[#0A0A0A] tracking-[2px]">{isEn ? "UPDATE PASSWORD" : "የምስጢር ቃሉን ዘምን"}</span>
              </button>
            </form>
          </>
        )}

        <Link href="/login" className="font-ibm-mono text-[8px] text-[#444] hover:text-[#FFD600] tracking-[1px] transition-colors text-center">
          {isEn ? "BACK TO LOGIN" : "ወደ ግቤት ተመለስ"}
        </Link>
      </div>
    </div>
  );
}
