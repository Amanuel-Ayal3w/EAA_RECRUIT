import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

function adminOnly(role: string) {
  return role !== "admin"
    ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
    : null;
}

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const guard = adminOnly(session.user.role);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const roleFilter = searchParams.get("role");

  const list = roleFilter
    ? await db.select().from(user).where(eq(user.role, roleFilter)).orderBy(desc(user.createdAt))
    : await db.select().from(user).orderBy(desc(user.createdAt));

  // Strip sensitive fields before returning
  const safe = list.map(({ ...u }) => u);
  return NextResponse.json(safe);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const guard = adminOnly(session.user.role);
  if (guard) return guard;

  const body = await req.json();
  const { email, password, name, role: newRole } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ error: "email, password, and name are required" }, { status: 400 });
  }

  // Use Better Auth's own sign-up to ensure password hashing + session tables are consistent
  const result = await auth.api.signUpEmail({
    body: { email, password, name, role: newRole ?? "recruiter" },
  });

  return NextResponse.json(result, { status: 201 });
}
