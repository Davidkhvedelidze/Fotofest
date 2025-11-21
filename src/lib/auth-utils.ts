import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyAdminToken(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return false;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not set");
      return false;
    }

    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export function validateRedirectUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }

  // Allow only http:// or https:// URLs
  if (url.startsWith("http://") || url.startsWith("https://")) {
    try {
      const parsedUrl = new URL(url);
      // Only allow http and https protocols
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  }

  // Allow internal paths (starting with /)
  if (url.startsWith("/")) {
    // Validate it's a safe path - no protocol schemes allowed
    // Reject anything that looks like a protocol (e.g., javascript:, data:, etc.)
    return !url.match(/^\/[a-zA-Z][a-zA-Z0-9+.-]*:/);
  }

  return false;
}

export function sanitizeRedirectUrl(url: string): string | null {
  if (!validateRedirectUrl(url)) {
    return null;
  }

  // For internal paths, ensure they're safe
  if (url.startsWith("/")) {
    return url;
  }

  // For external URLs, ensure they're properly formatted
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return url;
    }
  } catch {
    return null;
  }

  return null;
}
