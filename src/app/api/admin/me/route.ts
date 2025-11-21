import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth-utils";

export async function GET() {
  const isAuthenticated = await verifyAdminToken();

  if (isAuthenticated) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
