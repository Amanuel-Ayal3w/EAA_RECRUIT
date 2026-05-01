import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: userId, role } = session.user;

  // Candidates only see their own applications
  if (role === "candidate") {
    const list = await db
      .select()
      .from(applications)
      .where(eq(applications.candidateId, userId))
      .orderBy(desc(applications.createdAt));
    return NextResponse.json(list);
  }

  // Recruiters and admins see all
  const list = await db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "candidate") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { jobId, cvUrl } = body;

  if (!jobId) {
    return NextResponse.json({ error: "jobId is required" }, { status: 400 });
  }

  const [application] = await db
    .insert(applications)
    .values({
      jobId,
      candidateId: session.user.id,
      cvUrl,
      status: "applied",
    })
    .returning();

  return NextResponse.json(application, { status: 201 });
}
