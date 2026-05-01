import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { applications, jobs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

const STEP_LABELS = [
  "CV RECEIVED",
  "AI PROCESSING",
  "SHORTLISTED",
  "EXAM INVITED",
  "INTERVIEW",
  "DECISION",
];

// How many steps are "done" and which index is "active" per status
const DONE_UNTIL: Record<string, number> = {
  applied:   1,
  screening: 2,
  interview: 4,
  offer:     5,
  rejected:  6,
  hired:     6,
};
const ACTIVE_AT: Record<string, number> = {
  applied:   1,
  screening: 2,
  interview: 4,
  offer:     5,
};

function getSteps(status: string | null) {
  const s = status ?? "applied";
  const doneCount = DONE_UNTIL[s] ?? 1;
  const activeIdx = ACTIVE_AT[s] ?? -1;
  return STEP_LABELS.map((label, i) => ({
    label,
    done: i < doneCount,
    active: i === activeIdx,
  }));
}

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.user.role !== "candidate") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const rows = await db
    .select({
      id: applications.id,
      status: applications.status,
      createdAt: applications.createdAt,
      title: jobs.title,
      department: jobs.department,
    })
    .from(applications)
    .innerJoin(jobs, eq(applications.jobId, jobs.id))
    .where(eq(applications.candidateId, session.user.id))
    .orderBy(desc(applications.createdAt));

  const result = rows.map((r) => ({
    id: r.id,
    role: r.title ?? "Unknown Role",
    department: r.department ?? "",
    appliedDate: r.createdAt
      ? new Date(r.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "",
    status: r.status,
    steps: getSteps(r.status),
  }));

  // Derive action banners from statuses
  const actions = rows
    .filter((r) => r.status === "interview")
    .map((r) => ({
      priority: "HIGH",
      title: `Exam Invitation: ${r.title}`,
      desc: "You have been invited to take a technical exam. Timer starts on entry.",
      href: "/candidate/exams",
      cta: "START EXAM /",
    }));

  return NextResponse.json({ applications: result, actions });
}
