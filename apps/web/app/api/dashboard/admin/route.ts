import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { jobs, applications, user } from "@/db/schema";
import { eq, count, sql } from "drizzle-orm";

const DAY_ABBR = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [[{ totalApplications }], [{ activeJobs }], [{ totalUsers }]] = await Promise.all([
    db.select({ totalApplications: count() }).from(applications),
    db.select({ activeJobs: count() }).from(jobs).where(eq(jobs.status, "active")),
    db.select({ totalUsers: count() }).from(user),
  ]);

  // Application volume: last 7 days grouped by weekday
  const volumeRaw = await db.execute(
    sql`SELECT
          DATE(created_at) AS day_date,
          EXTRACT(DOW FROM created_at)::int AS dow,
          COUNT(*)::int AS cnt
        FROM applications
        WHERE created_at >= NOW() - INTERVAL '7 days'
        GROUP BY DATE(created_at), EXTRACT(DOW FROM created_at)
        ORDER BY day_date`
  );

  const applicationVolume = (volumeRaw.rows as { dow: number; cnt: number }[]).map((r) => ({
    day: DAY_ABBR[r.dow] ?? "???",
    count: Number(r.cnt),
  }));

  // Pad to 7 entries if fewer days have data yet
  const volumeResult =
    applicationVolume.length > 0
      ? applicationVolume
      : DAY_ABBR.map((d) => ({ day: d, count: 0 }));

  return NextResponse.json({
    kpis: {
      totalApplications,
      activeJobs,
      totalUsers,
    },
    applicationVolume: volumeResult,
  });
}
