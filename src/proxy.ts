import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_LOGIN_PATH = "/admin/login";

const base64UrlToUint8Array = (value: string): Uint8Array => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const timingSafeEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
};

const verifyJwt = async (token: string, secret: string): Promise<boolean> => {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
    if (!encodedHeader || !encodedPayload || !encodedSignature) {
      return false;
    }

    const header = JSON.parse(
      new TextDecoder().decode(base64UrlToUint8Array(encodedHeader))
    ) as { alg?: string };
    if (header.alg !== "HS256") {
      return false;
    }

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlToUint8Array(encodedPayload))
    ) as { exp?: number };

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false;
    }

    const data = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, data));
    const expectedSignature = base64UrlToUint8Array(encodedSignature);
    return timingSafeEqual(signature, expectedSignature);
  } catch (error) {
    console.error("JWT verification failed in proxy", error);
    return false;
  }
};

const buildRedirectUrl = (request: NextRequest): string => {
  const nextUrl = request.nextUrl;
  const redirectPath = `${nextUrl.pathname}${nextUrl.search}`;
  const loginUrl = new URL(ADMIN_LOGIN_PATH, nextUrl.origin);
  loginUrl.searchParams.set("redirect", redirectPath);
  return loginUrl.toString();
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith(ADMIN_LOGIN_PATH)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      return NextResponse.redirect(buildRedirectUrl(request));
    }

    const isValid = await verifyJwt(token, secret);
    if (!isValid) {
      return NextResponse.redirect(buildRedirectUrl(request));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
