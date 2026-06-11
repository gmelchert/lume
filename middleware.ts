import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionToken } from "./lib/session";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (cookie !== (await sessionToken())) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/admin/:path*" };
