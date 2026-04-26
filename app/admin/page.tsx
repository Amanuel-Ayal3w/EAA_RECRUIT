"use client";

import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

// ─── Mock data ───────────────────────────────────────────────────────────────
const applicationVolume = [
  { day: "MON", count: 24 },
  { day: "TUE", count: 41 },
  { day: "WED", count: 38 },
  { day: "THU", count: 55 },
  { day: "FRI", count: 62 },
  { day: "SAT", count: 29 },
  { day: "SUN", count: 18 },
];

const resourceUsage = [
  { time: "00:00", cpu: 18, ram: 42 },
  { time: "04:00", cpu: 12, ram: 38 },
  { time: "08:00", cpu: 47, ram: 61 },
  { time: "12:00", cpu: 72, ram: 74 },
  { time: "16:00", cpu: 68, ram: 70 },
  { time: "20:00", cpu: 34, ram: 55 },
  { time: "Now",   cpu: 41, ram: 59 },
];

const regionData = [
  { name: "ADDIS ABABA", value: 44 },
  { name: "OROMIA",      value: 22 },
  { name: "AMHARA",      value: 17 },
  { name: "TIGRAY",      value: 8  },
  { name: "OTHER",       value: 9  },
];

const REGION_COLORS = ["var(--c-accent)", "var(--c-accent-hover)", "#CCB000", "#B39900", "var(--c-text-dim)"];

const genderData = [
  { name: "MALE",   value: 58 },
  { name: "FEMALE", value: 42 },
];

const GENDER_COLORS = ["var(--c-accent)", "var(--c-border)"];

// ─── Sub-components ───────────────────────────────────────────────────────────
function KPICard({
  label,
  value,
  sub,
  trend,
  accent = false,
}: {
  label: string;
  value: string;
  sub: string;
  trend?: string;
  accent?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-3 p-5 border border-[var(--c-border-soft)] bg-[var(--c-bg-elev)]"
      style={accent ? { borderColor: "var(--c-accent)", background: "rgba(255,214,0,0.03)" } : {}}
    >
      <div className="flex items-center justify-between">
        <span className="font-ibm-mono text-[9px] text-[var(--c-text-muted)] tracking-[1.5px]">{label}</span>
        {trend && (
          <span
            className="font-ibm-mono text-[8px] px-[6px] py-[2px] tracking-[1px]"
            style={{
              color: trend.startsWith("+") ? "var(--c-accent)" : "var(--c-warn)",
              background: trend.startsWith("+") ? "rgba(255,214,0,0.08)" : "rgba(255,107,53,0.08)",
            }}
          >
            {trend}
          </span>
        )}
      </div>
      <span
        className="font-grotesk text-[36px] font-bold leading-none tracking-[-1px]"
        style={{ color: accent ? "var(--c-accent)" : "var(--c-text)" }}
      >
        {value}
      </span>
      <span className="font-ibm-mono text-[8px] text-[var(--c-text-dim)] tracking-[0.5px]">{sub}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-[3px] h-[14px] bg-[var(--c-accent)] shrink-0" />
      <span className="font-ibm-mono text-[9px] text-[var(--c-text-sub)] tracking-[2px]">{children}</span>
    </div>
  );
}

const CustomTooltipStyle: React.CSSProperties = {
  background: "var(--c-bg)",
  border: "1px solid var(--c-border)",
  borderRadius: 0,
  padding: "8px 12px",
  fontFamily: "var(--font-ibm-plex-mono), monospace",
  fontSize: "9px",
  color: "var(--c-text)",
  letterSpacing: "1px",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="flex flex-col gap-1 mb-8">
        <span className="font-ibm-mono text-[9px] text-[var(--c-text-dim)] tracking-[2px]">[01] // DASHBOARD</span>
        <h1 className="font-grotesk text-[24px] md:text-[32px] font-bold text-[var(--c-text)] tracking-[-1px]">
          System Overview
        </h1>
        <p className="font-ibm-mono text-[10px] text-[var(--c-text-muted)] tracking-[0.5px]">
          Real-time recruitment pulse — EAA Recruit platform
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[var(--c-border-soft)] mb-8">
        <KPICard
          label="TOTAL APPLICATIONS"
          value="1,284"
          sub="All time from Applications table"
          trend="+12%"
          accent
        />
        <KPICard
          label="AI PARSE SUCCESS RATE"
          value="97.3%"
          sub="CV parser pass rate (failed: 34)"
          trend="+2.1%"
        />
        <KPICard
          label="AVG. SIMILARITY SCORE"
          value="0.742"
          sub="Mean cv_vector cosine match"
          trend="+0.03"
        />
        <KPICard
          label="ACTIVE JOB POSTINGS"
          value="11"
          sub="Open positions across 3 roles"
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Application Volume */}
        <div className="p-5 border border-[var(--c-border-soft)] bg-[var(--c-bg-elev)]">
          <SectionLabel>APPLICATION VOLUME — WEEKLY</SectionLabel>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={applicationVolume}>
              <XAxis
                dataKey="day"
                tick={{ fill: "var(--c-text-dim)", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)", letterSpacing: "1px" }}
                axisLine={{ stroke: "var(--c-border-soft)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--c-text-dim)", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={CustomTooltipStyle}
                cursor={{ stroke: "var(--c-border)", strokeWidth: 1 }}
                labelStyle={{ color: "var(--c-text-sub)", marginBottom: 4 }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--c-accent)"
                strokeWidth={1.5}
                dot={{ r: 3, fill: "var(--c-accent)", strokeWidth: 0 }}
                activeDot={{ r: 4, fill: "var(--c-accent)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Usage */}
        <div className="p-5 border border-[var(--c-border-soft)] bg-[var(--c-bg-elev)]">
          <SectionLabel>SERVER RESOURCE USAGE</SectionLabel>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-[6px]">
              <div className="w-[8px] h-[2px] bg-[var(--c-accent)]" />
              <span className="font-ibm-mono text-[8px] text-[var(--c-text-muted)]">CPU %</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="w-[8px] h-[2px] bg-[var(--c-warn)]" />
              <span className="font-ibm-mono text-[8px] text-[var(--c-text-muted)]">RAM %</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={resourceUsage}>
              <XAxis
                dataKey="time"
                tick={{ fill: "var(--c-text-dim)", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)", letterSpacing: "1px" }}
                axisLine={{ stroke: "var(--c-border-soft)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--c-text-dim)", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)" }}
                axisLine={false}
                tickLine={false}
                width={28}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip
                contentStyle={CustomTooltipStyle}
                cursor={{ stroke: "var(--c-border)", strokeWidth: 1 }}
                labelStyle={{ color: "var(--c-text-sub)", marginBottom: 4 }}
              />
              <Line type="monotone" dataKey="cpu" stroke="var(--c-accent)" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="ram" stroke="var(--c-warn)" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 — Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region breakdown */}
        <div className="p-5 border border-[var(--c-border-soft)] bg-[var(--c-bg-elev)]">
          <SectionLabel>CANDIDATE GEOGRAPHY (REGION)</SectionLabel>
          <div className="flex items-center gap-6">
            <PieChart width={130} height={130}>
              <Pie
                data={regionData}
                cx={60}
                cy={60}
                innerRadius={36}
                outerRadius={58}
                dataKey="value"
                strokeWidth={0}
              >
                {regionData.map((_, i) => (
                  <Cell key={i} fill={REGION_COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
            <div className="flex flex-col gap-[8px] flex-1">
              {regionData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[6px] h-[6px] shrink-0" style={{ background: REGION_COLORS[i] }} />
                    <span className="font-ibm-mono text-[8px] text-[var(--c-text-muted)] tracking-[1px]">{item.name}</span>
                  </div>
                  <span className="font-ibm-mono text-[8px] text-[var(--c-text)]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gender + Bar */}
        <div className="p-5 border border-[var(--c-border-soft)] bg-[var(--c-bg-elev)]">
          <SectionLabel>CANDIDATE DEMOGRAPHICS (GENDER)</SectionLabel>
          <div className="flex items-center gap-6 mb-4">
            <PieChart width={130} height={130}>
              <Pie
                data={genderData}
                cx={60}
                cy={60}
                innerRadius={36}
                outerRadius={58}
                dataKey="value"
                strokeWidth={0}
              >
                {genderData.map((_, i) => (
                  <Cell key={i} fill={GENDER_COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
            <div className="flex flex-col gap-[10px] flex-1">
              {genderData.map((item, i) => (
                <div key={item.name} className="flex flex-col gap-[4px]">
                  <div className="flex items-center justify-between">
                    <span className="font-ibm-mono text-[8px] text-[var(--c-text-muted)] tracking-[1px]">{item.name}</span>
                    <span className="font-ibm-mono text-[8px] text-[var(--c-text)]">{item.value}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-[var(--c-bg-muted)]">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${item.value}%`, background: GENDER_COLORS[i] }}
                    />
                  </div>
                </div>
              ))}
              <p className="font-ibm-mono text-[7px] text-[var(--c-text-faint)] tracking-[0.5px] mt-2">
                Monitored for fairness compliance per EEO mandate
              </p>
            </div>
          </div>

          {/* Score distribution bar chart */}
          <SectionLabel>SHORTLIST SCORE DISTRIBUTION</SectionLabel>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={[
              { range: "0–40",  count: 12 },
              { range: "41–60", count: 38 },
              { range: "61–70", count: 55 },
              { range: "71–85", count: 89 },
              { range: "86+",   count: 42 },
            ]} barSize={18}>
              <XAxis
                dataKey="range"
                tick={{ fill: "var(--c-text-dim)", fontSize: 8, fontFamily: "var(--font-ibm-plex-mono)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip contentStyle={CustomTooltipStyle} cursor={{ fill: "rgba(255,214,0,0.04)" }} />
              <Bar dataKey="count" fill="var(--c-accent)" radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
