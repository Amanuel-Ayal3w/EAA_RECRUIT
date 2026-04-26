"use client";

import { useState } from "react";

const initialSkills = [
  { id: 1,  term: "B787 Type Rating",          category: "Certification", weight: 97, manual: false },
  { id: 2,  term: "ATPL License (ECAA)",        category: "Certification", weight: 95, manual: false },
  { id: 3,  term: "ICAO English Level 5",       category: "Certification", weight: 91, manual: false },
  { id: 4,  term: "Navigation Systems",         category: "Technical",     weight: 92, manual: false },
  { id: 5,  term: "IFR Operations",             category: "Technical",     weight: 88, manual: false },
  { id: 6,  term: "Crew Resource Management",   category: "Soft Skill",    weight: 84, manual: false },
  { id: 7,  term: "Safety Management Systems",  category: "Soft Skill",    weight: 79, manual: false },
  { id: 8,  term: "Meteorology",                category: "Technical",     weight: 75, manual: false },
  { id: 9,  term: "Emergency Procedures",       category: "Technical",     weight: 90, manual: false },
  { id: 10, term: "Air Law (ICAO Annex 2)",      category: "Certification", weight: 87, manual: false },
];

function categoryColor(cat: string) {
  if (cat === "Certification") return "#FFD600";
  if (cat === "Technical") return "#E6C200";
  return "#888";
}

const CATEGORIES = ["Certification", "Technical", "Soft Skill"] as const;

export default function ProfilePage() {
  const [skills, setSkills] = useState(initialSkills);
  const [newTerm, setNewTerm] = useState("");
  const [newCat, setNewCat] = useState<typeof CATEGORIES[number]>("Technical");
  const [personalInfo, setPersonalInfo] = useState({
    name: "Amanuel Tadesse",
    email: "amanuel.t@example.com",
    phone: "+251 91 234 5678",
    location: "Addis Ababa, Ethiopia",
    experience: "12",
  });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "skills">("info");

  const removeSkill = (id: number) => setSkills((prev) => prev.filter((s) => s.id !== id));

  const addSkill = () => {
    if (!newTerm.trim()) return;
    setSkills((prev) => [
      ...prev,
      { id: Date.now(), term: newTerm.trim(), category: newCat, weight: 70, manual: true },
    ]);
    setNewTerm("");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Compute relative font sizes for the cloud
  const maxWeight = Math.max(...skills.map((s) => s.weight));
  const minWeight = Math.min(...skills.map((s) => s.weight));

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <span className="font-ibm-mono text-[9px] text-[#444] tracking-[2px]">[06] // MY PROFILE</span>
          <h1 className="font-grotesk text-[24px] md:text-[32px] font-bold text-[#F5F5F0] tracking-[-1px]">My Profile</h1>
          <p className="font-ibm-mono text-[10px] text-[#555] tracking-[0.5px]">
            Manage personal information and your AI-visible Skills Cloud.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 h-[44px] font-ibm-mono text-[8px] font-bold tracking-[1.5px] transition-all"
          style={{ background: saved ? "#E6C200" : "#FFD600", color: "#0A0A0A" }}
        >
          {saved ? "SAVED /" : "SAVE CHANGES /"}
        </button>
      </div>

      {/* Avatar + summary strip */}
      <div className="flex items-center gap-5 bg-[#0D0D0D] border border-[#1D1D1D] p-5">
        <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#FFD600] shrink-0">
          <span className="font-grotesk text-[22px] font-bold text-[#0A0A0A]">AT</span>
        </div>
        <div className="flex flex-col gap-[3px]">
          <span className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">{personalInfo.name}</span>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-ibm-mono text-[8px] text-[#555] tracking-[0.5px]">{personalInfo.email}</span>
            <div className="w-[1px] h-[10px] bg-[#2D2D2D]" />
            <span className="font-ibm-mono text-[8px] text-[#555] tracking-[0.5px]">{personalInfo.location}</span>
            <div className="w-[1px] h-[10px] bg-[#2D2D2D]" />
            <span className="font-ibm-mono text-[8px] text-[#555] tracking-[0.5px]">{personalInfo.experience} YRS EXPERIENCE</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-[5px] bg-[#FFD600]/08 border border-[#FFD600]/20 shrink-0">
          <div className="w-[5px] h-[5px] rounded-full bg-[#FFD600]" />
          <span className="font-ibm-mono text-[7px] text-[#FFD600] tracking-[1px]">PROFILE COMPLETE</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-[1px] bg-[#1D1D1D]">
        {(["info", "skills"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-6 py-3 font-ibm-mono text-[8px] tracking-[1.5px] transition-all"
            style={{ background: activeTab === tab ? "#FFD60012" : "#0D0D0D", color: activeTab === tab ? "#FFD600" : "#555", borderBottom: activeTab === tab ? "2px solid #FFD600" : "2px solid transparent" }}
          >
            {tab === "info" ? "PERSONAL INFO" : "SKILLS CLOUD"}
          </button>
        ))}
      </div>

      {/* Personal Info Tab */}
      {activeTab === "info" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1D1D1D]">
          {[
            { label: "FULL NAME",          key: "name",       type: "text" },
            { label: "EMAIL ADDRESS",      key: "email",      type: "email" },
            { label: "PHONE NUMBER",       key: "phone",      type: "tel" },
            { label: "LOCATION / CITY",    key: "location",   type: "text" },
            { label: "YEARS OF EXPERIENCE",key: "experience", type: "number" },
          ].map((field) => (
            <div key={field.key} className="flex flex-col gap-2 bg-[#0D0D0D] p-5">
              <label className="font-ibm-mono text-[7px] text-[#444] tracking-[1.5px]">{field.label}</label>
              <input
                type={field.type}
                value={personalInfo[field.key as keyof typeof personalInfo]}
                onChange={(e) => setPersonalInfo((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="bg-[#111] border border-[#2D2D2D] text-[#F5F5F0] font-ibm-mono text-[10px] px-4 py-3 focus:outline-none focus:border-[#FFD600] transition-colors tracking-[0.5px]"
              />
            </div>
          ))}

          <div className="flex flex-col gap-3 bg-[#0D0D0D] p-5">
            <label className="font-ibm-mono text-[7px] text-[#444] tracking-[1.5px]">LANGUAGE PREFERENCE</label>
            <div className="flex items-center gap-[1px] bg-[#1D1D1D]">
              {["ENGLISH", "AMHARIC"].map((lang) => (
                <button
                  key={lang}
                  className="flex-1 py-3 font-ibm-mono text-[8px] tracking-[1px] transition-all"
                  style={{ background: lang === "ENGLISH" ? "#FFD600" : "#0D0D0D", color: lang === "ENGLISH" ? "#0A0A0A" : "#555" }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills Cloud Tab */}
      {activeTab === "skills" && (
        <div className="flex flex-col gap-6">
          {/* Visual cloud */}
          <div className="bg-[#0D0D0D] border border-[#1D1D1D] p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-[14px] bg-[#FFD600] shrink-0" />
              <div className="flex flex-col gap-[2px]">
                <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">AI SKILLS CLOUD</span>
                <span className="font-ibm-mono text-[7px] text-[#333] tracking-[1px]">SIZE = RELEVANCE WEIGHT // COLOR = CATEGORY</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center min-h-[120px]">
              {[...skills].sort((a, b) => b.weight - a.weight).map((skill) => {
                const normalised = (skill.weight - minWeight) / (Math.max(1, maxWeight - minWeight));
                const fontSize = 9 + normalised * 12; // 9px → 21px
                const opacity = 0.5 + normalised * 0.5;
                return (
                  <div
                    key={skill.id}
                    className="group relative flex items-center gap-1 cursor-default"
                  >
                    <span
                      className="font-ibm-mono font-bold tracking-[0.5px] transition-all"
                      style={{ fontSize: `${fontSize}px`, color: categoryColor(skill.category), opacity }}
                    >
                      {skill.term}
                    </span>
                    {skill.manual && (
                      <span className="font-ibm-mono text-[7px] text-[#444]">(+)</span>
                    )}
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="hidden group-hover:flex items-center justify-center w-[14px] h-[14px] text-[#FF6B35] bg-[#0A0A0A] border border-[#FF6B35]/30 absolute -top-[6px] -right-[6px]"
                      aria-label={`Remove ${skill.term}`}
                    >
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <path d="M1 1l4 4M5 1L1 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 pt-3 border-t border-[#111]">
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center gap-[5px]">
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: categoryColor(cat) }} />
                  <span className="font-ibm-mono text-[7px] text-[#444]">{cat.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add new skill */}
          <div className="bg-[#0D0D0D] border border-[#1D1D1D] p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-[14px] bg-[#FFD600] shrink-0" />
              <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">ADD SKILL MANUALLY</span>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. EASA Part-66 Module 7"
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                className="flex-1 bg-[#111] border border-[#2D2D2D] text-[#F5F5F0] font-ibm-mono text-[10px] px-4 py-3 focus:outline-none focus:border-[#FFD600] placeholder:text-[#222] transition-colors tracking-[0.5px]"
              />
              <div className="flex items-center gap-[1px] bg-[#1D1D1D] shrink-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewCat(cat)}
                    className="px-3 py-3 font-ibm-mono text-[7px] tracking-[1px] transition-all whitespace-nowrap"
                    style={{ background: newCat === cat ? "#FFD600" : "#0D0D0D", color: newCat === cat ? "#0A0A0A" : "#555" }}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={addSkill}
                className="px-5 py-3 bg-[#FFD600] font-ibm-mono text-[8px] font-bold text-[#0A0A0A] tracking-[1.5px] hover:bg-[#E6C200] transition-colors shrink-0"
              >
                ADD /
              </button>
            </div>
          </div>

          {/* Skills list table */}
          <div className="border border-[#1D1D1D] bg-[#0D0D0D]">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-[#111] border-b border-[#1D1D1D]">
              {["SKILL TERM", "CATEGORY", "WEIGHT", ""].map((h) => (
                <span key={h} className="font-ibm-mono text-[7px] text-[#444] tracking-[1.5px]">{h}</span>
              ))}
            </div>
            {skills.map((skill) => (
              <div key={skill.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-[#111] items-center hover:bg-[#111] transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-ibm-mono text-[9px] text-[#F5F5F0] truncate">{skill.term}</span>
                  {skill.manual && (
                    <span className="font-ibm-mono text-[6px] text-[#444] px-1 py-[1px] border border-[#2D2D2D] shrink-0">MANUAL</span>
                  )}
                </div>
                <span
                  className="font-ibm-mono text-[7px] px-2 py-[2px] tracking-[1px] whitespace-nowrap"
                  style={{ color: categoryColor(skill.category), background: `${categoryColor(skill.category)}10` }}
                >
                  {skill.category.toUpperCase()}
                </span>
                <div className="flex items-center gap-2 w-[100px]">
                  <div className="flex-1 h-[3px] bg-[#1A1A1A]">
                    <div className="h-full" style={{ width: `${skill.weight}%`, background: categoryColor(skill.category) }} />
                  </div>
                  <span className="font-ibm-mono text-[8px] text-[#888] shrink-0">{skill.weight}</span>
                </div>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="font-ibm-mono text-[7px] text-[#333] hover:text-[#FF6B35] tracking-[0.5px] transition-colors"
                >
                  REMOVE /
                </button>
              </div>
            ))}
          </div>

          <span className="font-ibm-mono text-[7px] text-[#333] tracking-[0.5px]">
            Skills extracted by AI are read-only by default. Manually added skills are marked and will be re-verified on your next CV upload.
          </span>
        </div>
      )}
    </div>
  );
}
