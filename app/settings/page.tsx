"use client";

import { useState } from "react";

type Tab = "account" | "security" | "preferences";

const TABS: { key: Tab; label: string }[] = [
  { key: "account", label: "ACCOUNT DETAILS" },
  { key: "security", label: "SECURITY & 2FA" },
  { key: "preferences", label: "PREFERENCES" },
];

function SaveToast({ visible }: { visible: boolean }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-[#0D0D0D] border border-[#FFD600]/40 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="square" /></svg>
      <span className="font-ibm-mono text-[9px] text-[#FFD600] tracking-[1.5px]">CHANGES SAVED</span>
    </div>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 py-5 border-b border-[#1D1D1D]">
      <div className="flex flex-col gap-1 min-w-0">
        <span className="font-ibm-mono text-[10px] font-bold text-[#F5F5F0] tracking-[1px]">{label}</span>
        {desc && <span className="font-ibm-mono text-[8px] text-[#444] tracking-[0.5px] leading-[1.7]">{desc}</span>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative w-[44px] h-[24px] border-2 transition-colors ${checked ? "border-[#FFD600] bg-[#FFD600]/10" : "border-[#2D2D2D] bg-transparent"}`}
    >
      <div className={`absolute top-[2px] w-[16px] h-[16px] transition-all duration-200 ${checked ? "left-[20px] bg-[#FFD600]" : "left-[2px] bg-[#2D2D2D]"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("account");
  const [toast, setToast] = useState(false);

  // Account fields
  const [fullName, setFullName] = useState("Amanuel Ayalew");
  const [email] = useState("candidate@eaa.et");
  const [phone, setPhone] = useState("+251 911 234 567");

  // Password
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");

  // 2FA
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [twoFAMethod, setTwoFAMethod] = useState<"sms" | "email">("email");

  // Preferences
  const [lang, setLang] = useState<"en" | "am">("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [notifExam, setNotifExam] = useState(true);
  const [notifInterview, setNotifInterview] = useState(true);

  function save() {
    setToast(true);
    setTimeout(() => setToast(false), 2800);
  }

  function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (newPass.length < 8) { setPassError("MINIMUM 8 CHARACTERS REQUIRED"); return; }
    if (newPass !== confirmPass) { setPassError("PASSWORDS DO NOT MATCH"); return; }
    setPassError("");
    setCurrentPass(""); setNewPass(""); setConfirmPass("");
    save();
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-[760px] mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="font-ibm-mono text-[9px] text-[#FFD600] tracking-[2px] mb-2">[USER] // ACCOUNT SETTINGS</p>
          <h1 className="font-grotesk text-[28px] font-bold text-[#F5F5F0] tracking-[-0.5px]">SETTINGS</h1>
          <p className="font-ibm-mono text-[9px] text-[#444] tracking-[1px] mt-1">MANAGE YOUR ACCOUNT, SECURITY, AND PREFERENCES</p>
        </div>

        {/* Role badge */}
        <div className="flex items-center gap-3 mb-8 p-4 border border-[#1D1D1D] bg-[#0D0D0D]">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#FFD600] shrink-0">
            <span className="font-ibm-mono text-[9px] font-bold text-[#0A0A0A]">AA</span>
          </div>
          <div>
            <p className="font-ibm-mono text-[10px] font-bold text-[#F5F5F0] tracking-[1px]">AMANUEL AYALEW</p>
            <p className="font-ibm-mono text-[8px] text-[#555] tracking-[0.5px]">candidate@eaa.et // ROLE: CANDIDATE</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-[5px] h-[5px] rounded-full bg-[#FFD600]" />
            <span className="font-ibm-mono text-[8px] text-[#FFD600] tracking-[1px]">ACTIVE</span>
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex items-center border-b border-[#1D1D1D] mb-8 gap-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-[10px] font-ibm-mono text-[8px] tracking-[1.5px] border-b-2 transition-colors -mb-[1px] ${tab === t.key ? "border-[#FFD600] text-[#FFD600]" : "border-transparent text-[#444] hover:text-[#F5F5F0]"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Account */}
        {tab === "account" && (
          <div className="flex flex-col gap-0">
            <SettingRow label="FULL NAME" desc="Your name as it appears on official documents.">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-[220px] h-[38px] bg-[#0D0D0D] border border-[#2D2D2D] px-3 font-ibm-mono text-[10px] text-[#F5F5F0] focus:outline-none focus:border-[#FFD600] transition-colors"
              />
            </SettingRow>
            <SettingRow label="EMAIL ADDRESS" desc="Cannot be changed. Contact admin to update.">
              <div className="flex items-center gap-2 h-[38px] px-3 bg-[#0D0D0D] border border-[#1D1D1D] w-[220px]">
                <span className="font-ibm-mono text-[10px] text-[#444] truncate">{email}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#333] shrink-0"><rect x="1" y="3" width="8" height="6" stroke="currentColor" strokeWidth="1.1" /><path d="M3 3V2a2 2 0 0 1 4 0v1" stroke="currentColor" strokeWidth="1.1" /></svg>
              </div>
            </SettingRow>
            <SettingRow label="PHONE NUMBER" desc="Used for SMS notifications if enabled.">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-[220px] h-[38px] bg-[#0D0D0D] border border-[#2D2D2D] px-3 font-ibm-mono text-[10px] text-[#F5F5F0] focus:outline-none focus:border-[#FFD600] transition-colors"
              />
            </SettingRow>
            <div className="pt-6">
              <button onClick={save} className="flex items-center justify-center h-[44px] px-8 bg-[#FFD600] hover:bg-[#e6c200] transition-colors">
                <span className="font-grotesk text-[11px] font-bold text-[#0A0A0A] tracking-[2px]">SAVE CHANGES</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab: Security */}
        {tab === "security" && (
          <div className="flex flex-col gap-0">
            {/* Change password */}
            <div className="pb-6 border-b border-[#1D1D1D] mb-6">
              <h2 className="font-ibm-mono text-[9px] font-bold text-[#F5F5F0] tracking-[1.5px] mb-5">CHANGE PASSWORD</h2>
              <form onSubmit={handlePasswordChange} className="flex flex-col gap-4 max-w-[400px]">
                {[
                  { label: "CURRENT PASSWORD", val: currentPass, set: setCurrentPass },
                  { label: "NEW PASSWORD", val: newPass, set: setNewPass },
                  { label: "CONFIRM NEW PASSWORD", val: confirmPass, set: setConfirmPass },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-2">
                    <label className="font-ibm-mono text-[8px] text-[#555] tracking-[1.5px]">{f.label}</label>
                    <input
                      type="password"
                      value={f.val}
                      onChange={(e) => { f.set(e.target.value); setPassError(""); }}
                      placeholder="••••••••••••"
                      className="h-[42px] bg-[#0D0D0D] border border-[#2D2D2D] px-3 font-ibm-mono text-[11px] text-[#F5F5F0] placeholder-[#333] focus:outline-none focus:border-[#FFD600] transition-colors"
                    />
                  </div>
                ))}
                {passError && <span className="font-ibm-mono text-[8px] text-red-400 tracking-[0.5px]">{passError}</span>}
                <button type="submit" className="h-[42px] bg-[#FFD600] hover:bg-[#e6c200] transition-colors flex items-center justify-center mt-1">
                  <span className="font-grotesk text-[11px] font-bold text-[#0A0A0A] tracking-[2px]">UPDATE PASSWORD</span>
                </button>
              </form>
            </div>

            {/* 2FA */}
            <div className="flex flex-col gap-5">
              <h2 className="font-ibm-mono text-[9px] font-bold text-[#F5F5F0] tracking-[1.5px]">TWO-FACTOR AUTHENTICATION (2FA)</h2>
              <div className="flex items-start gap-3 p-4 border border-[#FFD600]/15 bg-[#FFD600]/04">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#FFD600] mt-[1px] shrink-0"><path d="M6 1l5 2.5v3.5c0 2.5-5 5-5 5S1 9.5 1 7V3.5L6 1z" stroke="currentColor" strokeWidth="1.2" /></svg>
                <p className="font-ibm-mono text-[8px] text-[#555] tracking-[0.5px] leading-[1.8]">
                  2FA IS REQUIRED FOR ALL ADMIN AND RECRUITER ACCOUNTS UNDER ETHIOPIAN DATA PROTECTION PROCLAMATION NO. 1329/2023.
                </p>
              </div>
              <SettingRow label="ENABLE 2FA" desc="Adds a second verification step at login.">
                <Toggle checked={twoFAEnabled} onChange={() => { setTwoFAEnabled((v) => !v); save(); }} />
              </SettingRow>
              {twoFAEnabled && (
                <SettingRow label="2FA METHOD" desc="How you receive your one-time code.">
                  <div className="flex items-center gap-0 border border-[#2D2D2D]">
                    {(["email", "sms"] as const).map((m) => (
                      <button key={m} onClick={() => { setTwoFAMethod(m); save(); }} className={`px-4 py-[7px] font-ibm-mono text-[8px] tracking-[1px] transition-colors ${twoFAMethod === m ? "bg-[#FFD600] text-[#0A0A0A] font-bold" : "text-[#555] hover:text-[#F5F5F0]"}`}>
                        {m.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </SettingRow>
              )}
              <div className="pt-2">
                <div className="flex items-center gap-3 p-4 border border-[#1D1D1D] bg-[#0D0D0D]">
                  <div className="flex items-center justify-center w-[28px] h-[28px] border border-[#2D2D2D] shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="5" width="10" height="7" stroke="#555" strokeWidth="1.2" /><path d="M3 5V4a3 3 0 0 1 6 0v1" stroke="#555" strokeWidth="1.2" strokeLinecap="square" /></svg>
                  </div>
                  <div>
                    <p className="font-ibm-mono text-[8px] text-[#555] tracking-[0.5px]">SESSION TOKEN</p>
                    <p className="font-ibm-mono text-[7px] text-[#333] tracking-[0.3px] mt-0.5">JWT // EXPIRES IN 8 HRS // DEVICE: CHROME/LINUX</p>
                  </div>
                  <button className="ml-auto font-ibm-mono text-[7px] text-[#FF6B35] hover:text-red-400 tracking-[1px] transition-colors">REVOKE</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Preferences */}
        {tab === "preferences" && (
          <div className="flex flex-col gap-0">
            <SettingRow label="INTERFACE LANGUAGE" desc="Sets the display language across all portals.">
              <div className="flex items-center gap-0 border border-[#2D2D2D]">
                {(["en", "am"] as const).map((l) => (
                  <button key={l} onClick={() => { setLang(l); save(); }} className={`px-4 py-[7px] font-ibm-mono text-[9px] tracking-[1.5px] transition-colors ${lang === l ? "bg-[#FFD600] text-[#0A0A0A] font-bold" : "text-[#555] hover:text-[#F5F5F0]"}`}>
                    {l === "en" ? "EN / ENGLISH" : "አማ / AMHARIC"}
                  </button>
                ))}
              </div>
            </SettingRow>
            <SettingRow label="COLOUR THEME" desc="Visual mode for the interface.">
              <div className="flex items-center gap-0 border border-[#2D2D2D]">
                {(["dark", "light"] as const).map((t) => (
                  <button key={t} onClick={() => { setTheme(t); save(); }} className={`px-4 py-[7px] font-ibm-mono text-[9px] tracking-[1.5px] transition-colors ${theme === t ? "bg-[#FFD600] text-[#0A0A0A] font-bold" : "text-[#555] hover:text-[#F5F5F0]"}`}>
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </SettingRow>

            <h2 className="font-ibm-mono text-[9px] font-bold text-[#F5F5F0] tracking-[1.5px] pt-6 pb-4 border-t border-[#1D1D1D] mt-2">NOTIFICATION PREFERENCES</h2>
            <SettingRow label="EMAIL NOTIFICATIONS" desc="Receive updates via email.">
              <Toggle checked={notifEmail} onChange={() => { setNotifEmail((v) => !v); save(); }} />
            </SettingRow>
            <SettingRow label="SMS NOTIFICATIONS" desc="Receive updates via text message.">
              <Toggle checked={notifSMS} onChange={() => { setNotifSMS((v) => !v); save(); }} />
            </SettingRow>
            <SettingRow label="EXAM REMINDERS" desc="Alerts before exam deadlines.">
              <Toggle checked={notifExam} onChange={() => { setNotifExam((v) => !v); save(); }} />
            </SettingRow>
            <SettingRow label="INTERVIEW UPDATES" desc="Notifications for invitations and confirmations.">
              <Toggle checked={notifInterview} onChange={() => { setNotifInterview((v) => !v); save(); }} />
            </SettingRow>

            <div className="pt-6 flex items-start gap-3 p-4 border border-[#1D1D1D] bg-[#0D0D0D] mt-6">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#444] mt-[1px] shrink-0"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" /><path d="M6 5v3M6 3.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" /></svg>
              <p className="font-ibm-mono text-[8px] text-[#444] tracking-[0.5px] leading-[1.8]">
                LANGUAGE AND THEME CHANGES APPLY TO YOUR NEXT SESSION. NOTIFICATION PREFERENCES TAKE EFFECT IMMEDIATELY.
              </p>
            </div>
          </div>
        )}
      </div>

      <SaveToast visible={toast} />
    </div>
  );
}
