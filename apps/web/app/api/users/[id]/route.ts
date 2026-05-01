import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

function adminOnly(role: string) {
  return role !== "admin"
    ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
    : null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const guard = adminOnly(session.user.role);
  if (guard) return guard;

  const { id } = await params;
  const [found] = await db.select().from(user).where(eq(user.id, id));

  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(found);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const guard = adminOnly(session.user.role);
  if (guard) return guard;

  const { id } = await params;
  const body = await req.json();
  const { name, role } = body;

  const VALID_ROLES = ["admin", "recruiter", "candidate"];
  if (role && !VALID_ROLES.includes(role)) {
    return NextResponse.json(
      { error: `role must be one of: ${VALID_ROLES.join(", ")}` },
      { status: 400 }
    );
  }

  const [updated] = await db
    .update(user)
    .set({
      ...(name && { name }),
      ...(role && { role }),
      updatedAt: new Date(),
    })
    .where(eq(user.id, id))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const guard = adminOnly(session.user.role);
  if (guard) return guard;

  const { id } = await params;

  // Prevent self-deletion
  if (id === session.user.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  const [deleted] = await db.delete(user).where(eq(user.id, id)).returning();
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
