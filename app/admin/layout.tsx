"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "DASHBOARD",
    href: "/admin",
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
    label: "USER MANAGEMENT",
    href: "/admin/users",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 13c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    label: "JOB OVERSIGHT",
    href: "/admin/jobs",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="3" width="12" height="10" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 3V2a2 2 0 0 1 4 0v1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 7h12" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: "SECURITY LOGS",
    href: "/admin/logs",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="12" height="12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 5h6M4 7h6M4 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    label: "CONFIGURATION",
    href: "/admin/config",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.41 1.41M9.66 9.66l1.41 1.41M2.93 11.07l1.41-1.41M9.66 4.34l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-full min-h-screen bg-[#0A0A0A] font-grotesk">
      {/* Mobile overlay */}
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
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-[60px] px-4 border-b border-[#1D1D1D] shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-[8px]">
              <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#FFD600] shrink-0">
                <span className="font-ibm-mono text-[8px] font-bold text-[#0A0A0A] tracking-[1px]">EAA</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-ibm-mono text-[9px] font-bold text-[#F5F5F0] tracking-[2px]">ADMIN</span>
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

        {/* System status pill */}
        {!collapsed && (
          <div className="px-4 pt-4">
            <div className="flex items-center gap-[6px] px-3 py-[6px] bg-[#FFD600]/05 border border-[#FFD600]/15">
              <div className="w-[5px] h-[5px] rounded-full bg-[#FFD600] animate-pulse shrink-0" />
              <span className="font-ibm-mono text-[8px] text-[#FFD600] tracking-[1px]">SYSTEM ONLINE</span>
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex flex-col gap-[2px] px-2 pt-4 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-[10px] px-3 py-[10px] transition-all duration-150 group relative
                  ${isActive
                    ? "bg-[#FFD600]/08 text-[#FFD600]"
                    : "text-[#555] hover:text-[#F5F5F0] hover:bg-[#1A1A1A]"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFD600]" />
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

        {/* Sidebar footer */}
        <div className="px-4 pb-4 border-t border-[#1D1D1D] pt-4 shrink-0">
          {!collapsed && (
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[26px] h-[26px] bg-[#1A1A1A] border border-[#2D2D2D] flex items-center justify-center shrink-0">
                  <span className="font-ibm-mono text-[8px] text-[#888]">AD</span>
                </div>
                <div className="flex flex-col leading-none min-w-0">
                  <span className="font-ibm-mono text-[9px] text-[#F5F5F0] tracking-[1px] truncate">ADMIN USER</span>
                  <span className="font-ibm-mono text-[7px] text-[#444] tracking-[0.5px]">admin@eaa.et</span>
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

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 min-h-screen">
        {/* Top bar */}
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
              EAA RECRUIT / ADMIN PORTAL
            </span>
          </div>
          <div className="flex items-center gap-[20px]">
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

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
