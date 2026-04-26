"use client";

import { useState } from "react";

type Role = "ADMIN" | "RECRUITER" | "CANDIDATE";
type Status = "ACTIVE" | "SUSPENDED";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  lastLogin: string;
}

const MOCK_USERS: User[] = [
  { id: "U001", name: "Amanuel Tesfaye",  email: "a.tesfaye@eaa.et",   role: "ADMIN",     status: "ACTIVE",    lastLogin: "2026-04-25 14:32" },
  { id: "U002", name: "Hana Girma",       email: "h.girma@eaa.et",     role: "RECRUITER", status: "ACTIVE",    lastLogin: "2026-04-25 09:11" },
  { id: "U003", name: "Dawit Mulugeta",   email: "d.mulugeta@eaa.et",  role: "RECRUITER", status: "ACTIVE",    lastLogin: "2026-04-24 16:47" },
  { id: "U004", name: "Selam Bekele",     email: "s.bekele@eaa.et",    role: "RECRUITER", status: "SUSPENDED", lastLogin: "2026-04-10 08:02" },
  { id: "U005", name: "Yonas Haile",      email: "y.haile@gmail.com",  role: "CANDIDATE", status: "ACTIVE",    lastLogin: "2026-04-25 11:55" },
  { id: "U006", name: "Meron Alemu",      email: "m.alemu@gmail.com",  role: "CANDIDATE", status: "ACTIVE",    lastLogin: "2026-04-25 13:20" },
  { id: "U007", name: "Bereket Tadesse",  email: "b.tadesse@gmail.com",role: "CANDIDATE", status: "ACTIVE",    lastLogin: "2026-04-23 07:39" },
  { id: "U008", name: "Tigist Woldeyohannes", email: "t.wolde@gmail.com", role: "CANDIDATE", status: "SUSPENDED", lastLogin: "2026-03-30 10:00" },
];

const ROLE_COLORS: Record<Role, { bg: string; text: string }> = {
  ADMIN:     { bg: "rgba(255,214,0,0.1)",   text: "#FFD600" },
  RECRUITER: { bg: "rgba(255,107,53,0.1)",  text: "#FF6B35" },
  CANDIDATE: { bg: "rgba(245,245,240,0.06)", text: "#888" },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-[3px] h-[14px] bg-[#FFD600] shrink-0" />
      <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">{children}</span>
    </div>
  );
}

function AddUserModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-[480px] mx-4 bg-[#0D0D0D] border border-[#2D2D2D]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1D1D1D]">
          <div className="flex items-center gap-3">
            <div className="w-[3px] h-[14px] bg-[#FFD600]" />
            <span className="font-ibm-mono text-[9px] text-[#888] tracking-[2px]">ADD INTERNAL USER</span>
          </div>
          <button onClick={onClose} className="text-[#444] hover:text-[#F5F5F0] transition-colors font-ibm-mono text-[16px]">
            ×
          </button>
        </div>
        <form className="flex flex-col gap-5 px-6 py-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          {[
            { label: "FULL NAME", placeholder: "e.g. Amanuel Tesfaye", type: "text" },
            { label: "EMAIL ADDRESS", placeholder: "name@eaa.et", type: "email" },
            { label: "TEMPORARY PASSWORD", placeholder: "Min. 12 characters", type: "password" },
          ].map(({ label, placeholder, type }) => (
            <div key={label} className="flex flex-col gap-[6px]">
              <label className="font-ibm-mono text-[8px] text-[#555] tracking-[1.5px]">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                className="w-full h-[40px] bg-[#111] border border-[#2D2D2D] px-3 font-ibm-mono text-[11px] text-[#F5F5F0] placeholder-[#333] focus:outline-none focus:border-[#FFD600] transition-colors"
              />
            </div>
          ))}
          <div className="flex flex-col gap-[6px]">
            <label className="font-ibm-mono text-[8px] text-[#555] tracking-[1.5px]">ASSIGN ROLE</label>
            <select className="w-full h-[40px] bg-[#111] border border-[#2D2D2D] px-3 font-ibm-mono text-[11px] text-[#F5F5F0] focus:outline-none focus:border-[#FFD600] transition-colors appearance-none">
              <option value="RECRUITER">RECRUITER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 h-[40px] bg-[#FFD600] font-ibm-mono text-[9px] font-bold text-[#0A0A0A] tracking-[2px] hover:bg-[#E6C200] transition-colors"
            >
              CREATE ACCOUNT
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-[40px] px-5 border border-[#2D2D2D] font-ibm-mono text-[9px] text-[#555] tracking-[1.5px] hover:text-[#F5F5F0] hover:border-[#555] transition-colors"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [roleFilter, setRoleFilter] = useState<Role | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const counts = {
    ADMIN:     users.filter((u) => u.role === "ADMIN").length,
    RECRUITER: users.filter((u) => u.role === "RECRUITER").length,
    CANDIDATE: users.filter((u) => u.role === "CANDIDATE").length,
  };

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => u.id === id ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : u)
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      {showModal && <AddUserModal onClose={() => setShowModal(false)} />}

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <span className="font-ibm-mono text-[9px] text-[#444] tracking-[2px]">[02] // USER MANAGEMENT</span>
          <h1 className="font-grotesk text-[24px] md:text-[32px] font-bold text-[#F5F5F0] tracking-[-1px]">
            Identity &amp; Access
          </h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-[8px] h-[40px] px-5 bg-[#FFD600] font-ibm-mono text-[9px] font-bold text-[#0A0A0A] tracking-[2px] hover:bg-[#E6C200] transition-colors self-start"
        >
          + ADD USER
        </button>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-3 gap-[1px] bg-[#1D1D1D] mb-8">
        {(["ADMIN", "RECRUITER", "CANDIDATE"] as Role[]).map((role) => (
          <div key={role} className="flex flex-col gap-2 p-5 bg-[#0D0D0D]">
            <span className="font-ibm-mono text-[8px] tracking-[1.5px]" style={{ color: ROLE_COLORS[role].text }}>
              {role}S
            </span>
            <span className="font-grotesk text-[32px] font-bold text-[#F5F5F0] leading-none">{counts[role]}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="SEARCH BY NAME OR EMAIL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 h-[38px] bg-[#0D0D0D] border border-[#1D1D1D] px-4 font-ibm-mono text-[10px] text-[#F5F5F0] placeholder-[#333] focus:outline-none focus:border-[#FFD600] transition-colors"
        />
        <div className="flex gap-[2px]">
          {(["ALL", "ADMIN", "RECRUITER", "CANDIDATE"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className="h-[38px] px-4 font-ibm-mono text-[8px] tracking-[1.5px] transition-colors"
              style={{
                background: roleFilter === r ? "#FFD600" : "#0D0D0D",
                color:      roleFilter === r ? "#0A0A0A" : "#555",
                border:     "1px solid #1D1D1D",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#1D1D1D] overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#1D1D1D]">
              {["ID", "NAME", "EMAIL", "ROLE", "STATUS", "LAST LOGIN", "ACTIONS"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-ibm-mono text-[8px] text-[#444] tracking-[1.5px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr
                key={user.id}
                className="border-b border-[#1A1A1A] hover:bg-[#111] transition-colors"
              >
                <td className="px-4 py-3 font-ibm-mono text-[8px] text-[#444]">{user.id}</td>
                <td className="px-4 py-3 font-grotesk text-[13px] text-[#F5F5F0]">{user.name}</td>
                <td className="px-4 py-3 font-ibm-mono text-[9px] text-[#888]">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className="font-ibm-mono text-[8px] px-2 py-[3px] tracking-[1px]"
                    style={{ background: ROLE_COLORS[user.role].bg, color: ROLE_COLORS[user.role].text }}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-[6px]">
                    <div
                      className="w-[5px] h-[5px] rounded-full shrink-0"
                      style={{ background: user.status === "ACTIVE" ? "#FFD600" : "#FF6B35" }}
                    />
                    <span
                      className="font-ibm-mono text-[8px] tracking-[1px]"
                      style={{ color: user.status === "ACTIVE" ? "#FFD600" : "#FF6B35" }}
                    >
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 font-ibm-mono text-[8px] text-[#444]">{user.lastLogin}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-[8px]">
                    <button
                      className="font-ibm-mono text-[8px] text-[#555] hover:text-[#FFD600] tracking-[1px] transition-colors"
                    >
                      RESET PWD
                    </button>
                    <span className="text-[#1D1D1D]">|</span>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className="font-ibm-mono text-[8px] tracking-[1px] transition-colors"
                      style={{ color: user.status === "ACTIVE" ? "#FF6B35" : "#FFD600" }}
                    >
                      {user.status === "ACTIVE" ? "SUSPEND" : "ACTIVATE"}
                    </button>
                    {user.role !== "ADMIN" && (
                      <>
                        <span className="text-[#1D1D1D]">|</span>
                        <button className="font-ibm-mono text-[8px] text-[#555] hover:text-[#F5F5F0] tracking-[1px] transition-colors">
                          PROMOTE
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <span className="font-ibm-mono text-[10px] text-[#333] tracking-[1.5px]">NO USERS MATCH THIS FILTER</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="font-ibm-mono text-[8px] text-[#333] tracking-[1px]">
          SHOWING {filtered.length} OF {users.length} USERS
        </span>
        <span className="font-ibm-mono text-[8px] text-[#333] tracking-[1px]">PAGE 1 / 1</span>
      </div>
    </div>
  );
}
