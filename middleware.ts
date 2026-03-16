import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("admin_session");

  // Login page: let through, but redirect already-authenticated admins to dashboard
  if (pathname === "/admin/login") {
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // All other /admin/* routes: require a valid session cookie
  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    // Preserve the intended destination so we can redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Only run on admin routes — public pages are unaffected
  matcher: ["/admin/:path*"],
};
