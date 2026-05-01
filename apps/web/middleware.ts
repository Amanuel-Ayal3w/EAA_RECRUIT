import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const ROLE_HOME: Record<string, string> = {
  admin: "/admin",
  recruiter: "/dashboard",
  candidate: "/candidate",
};

const PROTECTED = ["/admin", "/dashboard", "/candidate"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const sessionCookie = getSessionCookie(req);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Fetch session to get the user's role
  const sessionRes = await fetch(
    new URL("/api/auth/get-session", req.url).toString(),
    { headers: { cookie: req.headers.get("cookie") ?? "" } }
  );

  if (!sessionRes.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const data = await sessionRes.json();
  const role: string = data?.user?.role ?? "candidate";
  const home = ROLE_HOME[role] ?? "/login";

  // Redirect to correct portal if accessing the wrong one
  const onWrongPortal = PROTECTED.some(
    (p) => pathname.startsWith(p) && !pathname.startsWith(home)
  );

  if (onWrongPortal) {
    return NextResponse.redirect(new URL(home, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/candidate/:path*"],
};
