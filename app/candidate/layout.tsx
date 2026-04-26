"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "MY DASHBOARD",
    href: "/candidate",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="0" y="0" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8" y="0" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
        <rect x="0" y="8" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8" y="8" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: "FIND JOBS",
    href: "/candidate/jobs",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 9l3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    label: "MY APPLICATIONS",
    href: "/candidate/applications",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="12" height="12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 5h6M4 7h6M4 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    label: "TECHNICAL EXAMS",
    href: "/candidate/exams",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="3" width="12" height="10" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 3V2a2 2 0 0 1 4 0v1M4 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    ),
  },
  {
    label: "MY FEEDBACK",
    href: "/candidate/feedback",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 4v4M7 10v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    label: "MY PROFILE",
    href: "/candidate/profile",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="4" r="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 13c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
];

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-full min-h-screen bg-[#0A0A0A] font-grotesk">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col bg-[#0D0D0D] border-r border-[#1D1D1D]
          transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:h-screen md:sticky md:top-0
          ${collapsed ? "md:w-[60px]" : "md:w-[220px]"}
          w-[220px]
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[60px] px-4 border-b border-[#1D1D1D] shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-[8px]">
              <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#FFD600] shrink-0">
                <span className="font-ibm-mono text-[8px] font-bold text-[#0A0A0A] tracking-[1px]">EAA</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-ibm-mono text-[9px] font-bold text-[#F5F5F0] tracking-[2px]">CANDIDATE</span>
                <span className="font-ibm-mono text-[7px] text-[#555] tracking-[1px]">PORTAL</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#FFD600] mx-auto">
              <span className="font-ibm-mono text-[7px] font-bold text-[#0A0A0A]">E</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="hidden md:flex items-center justify-center w-[22px] h-[22px] text-[#444] hover:text-[#FFD600] transition-colors shrink-0"
            aria-label="Toggle sidebar"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              {collapsed ? (
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
              ) : (
                <path d="M10 6H2M6 2L2 6l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
              )}
            </svg>
          </button>
        </div>

        {/* Action alert pill */}
        {!collapsed && (
          <div className="px-4 pt-4">
            <div className="flex items-center gap-[6px] px-3 py-[6px] bg-[#FFD600]/05 border border-[#FFD600]/15">
              <div className="w-[5px] h-[5px] rounded-full bg-[#FFD600] animate-pulse shrink-0" />
              <span className="font-ibm-mono text-[8px] text-[#FFD600] tracking-[1px]">1 ACTION REQUIRED</span>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex flex-col gap-[2px] px-2 pt-4 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-[10px] px-3 py-[10px] transition-all duration-150 relative
                  ${isActive
                    ? "bg-[#FFD600]/08 text-[#FFD600]"
                    : "text-[#555] hover:text-[#F5F5F0] hover:bg-[#1A1A1A]"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFD600]" />
                )}
                {item.href === "/candidate/exams" && !collapsed && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[#FFD600]" />
                )}
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="font-ibm-mono text-[9px] tracking-[1.5px] whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 pb-4 border-t border-[#1D1D1D] pt-4 shrink-0">
          {!collapsed && (
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[26px] h-[26px] bg-[#1A1A1A] border border-[#2D2D2D] flex items-center justify-center shrink-0">
                  <span className="font-ibm-mono text-[8px] text-[#888]">AT</span>
                </div>
                <div className="flex flex-col leading-none min-w-0">
                  <span className="font-ibm-mono text-[9px] text-[#F5F5F0] tracking-[1px] truncate">AMANUEL T.</span>
                  <span className="font-ibm-mono text-[7px] text-[#444] tracking-[0.5px]">candidate@eaa.et</span>
                </div>
              </div>
              <Link
                href="/"
                className="font-ibm-mono text-[8px] text-[#444] hover:text-[#FFD600] tracking-[1px] transition-colors mt-1"
              >
                BACK TO SITE /
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 min-h-screen">
        {/* Topbar */}
        <header className="flex items-center justify-between h-[60px] px-6 border-b border-[#1D1D1D] shrink-0 bg-[#0D0D0D] sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-[#555] hover:text-[#F5F5F0] transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </button>
            <span className="font-ibm-mono text-[9px] text-[#444] tracking-[1.5px]">
              EAA RECRUIT / CANDIDATE PORTAL
            </span>
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="flex items-center gap-[8px]">
              <button className="font-ibm-mono text-[8px] text-[#555] hover:text-[#FFD600] tracking-[1px] transition-colors">EN</button>
              <div className="w-[1px] h-[10px] bg-[#2D2D2D]" />
              <button className="font-ibm-mono text-[8px] text-[#444] hover:text-[#F5F5F0] tracking-[1px] transition-colors">አማ</button>
            </div>
            <div className="w-[1px] h-[16px] bg-[#1D1D1D]" />
            <div className="font-ibm-mono text-[8px] text-[#444] tracking-[1px]">
              {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
            </div>
            <div className="w-[1px] h-[16px] bg-[#1D1D1D]" />
            <div className="flex items-center gap-[6px]">
              <div className="w-[5px] h-[5px] rounded-full bg-[#FFD600]" />
              <span className="font-ibm-mono text-[8px] text-[#FFD600] tracking-[1px]">LIVE</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
