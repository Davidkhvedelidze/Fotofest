import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Allow access to login page without authentication
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // For other admin routes, check authentication via cookie
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token");

    // If no token, allow through (the layout will handle showing access denied)
    // This allows the login page redirect logic to work
    if (!token) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
