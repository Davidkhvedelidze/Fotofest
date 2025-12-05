import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not set in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ role: "admin" }, secret, {
      expiresIn: "7d",
    });

    const res = NextResponse.json({ success: true });

    // Use secure cookie only in production
    const isProduction = process.env.NODE_ENV === "production";

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
