import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { jobs, applications } from "@/db/schema";
import { eq, count, sql, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = session.user;
  if (role !== "recruiter" && role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Active job count
  const [{ activeCycles }] = await db
    .select({ activeCycles: count() })
    .from(jobs)
    .where(eq(jobs.status, "active"));

  // Total applicants across active jobs
  const [{ totalApplicants }] = await db
    .select({ totalApplicants: count() })
    .from(applications)
    .innerJoin(jobs, eq(applications.jobId, jobs.id))
    .where(eq(jobs.status, "active"));

  // Application counts per status (for funnel)
  const statusCounts = await db
    .select({ status: applications.status, cnt: count() })
    .from(applications)
    .groupBy(applications.status);

  const byStatus = Object.fromEntries(statusCounts.map((r) => [r.status, r.cnt]));

  const funnelData = [
    { name: "APPLIED",      value: byStatus["applied"]    ?? 0, fill: "var(--c-accent)" },
    { name: "AI SCREENED",  value: byStatus["screening"]  ?? 0, fill: "var(--c-accent-hover)" },
    { name: "INTERVIEWED",  value: byStatus["interview"]  ?? 0, fill: "#B39900" },
    { name: "OFFERED",      value: (byStatus["offer"] ?? 0) + (byStatus["hired"] ?? 0), fill: "#805E00" },
  ];

  // Active jobs with applied + screened counts, TTF in days since posted
  const activeJobsRaw = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      dept: jobs.department,
      createdAt: jobs.createdAt,
      applied: count(applications.id),
      screened: sql<number>`CAST(COUNT(CASE WHEN ${applications.status} IN ('screening','interview','offer','hired') THEN 1 END) AS INTEGER)`,
    })
    .from(jobs)
    .leftJoin(applications, eq(applications.jobId, jobs.id))
    .where(eq(jobs.status, "active"))
    .groupBy(jobs.id, jobs.title, jobs.department, jobs.createdAt)
    .orderBy(desc(jobs.createdAt))
    .limit(4);

  const activeJobs = activeJobsRaw.map((j) => ({
    id: j.id,
    title: (j.title ?? "").toUpperCase(),
    dept: j.dept ?? "",
    applied: j.applied,
    screened: Number(j.screened),
    ttf: j.createdAt
      ? Math.floor((Date.now() - new Date(j.createdAt).getTime()) / 86_400_000)
      : 0,
  }));

  const avgTtfDays =
    activeJobs.length > 0
      ? Math.round(activeJobs.reduce((s, j) => s + j.ttf, 0) / activeJobs.length)
      : 0;

  return NextResponse.json({
    kpis: { activeCycles, totalApplicants, avgTtfDays },
    funnelData,
    activeJobs,
  });
}
