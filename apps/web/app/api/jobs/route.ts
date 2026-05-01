import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  const role = session?.user?.role;

  // Candidates only see active jobs
  if (!role || role === "candidate") {
    const list = await db
      .select()
      .from(jobs)
      .where(eq(jobs.status, "active"))
      .orderBy(desc(jobs.createdAt));
    return NextResponse.json(list);
  }

  const list = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role;
  if (role !== "recruiter" && role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, department, description, requirements, status } = body;

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const [job] = await db
    .insert(jobs)
    .values({
      title,
      department,
      description,
      requirements,
      status: status ?? "active",
      createdBy: session.user.id,
    })
    .returning();

  return NextResponse.json(job, { status: 201 });
}
