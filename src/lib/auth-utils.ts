import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { logError } from "@/lib/services/logger";
import { sanitizeRedirectUrl, validateRedirectUrl } from "@/lib/utils/redirect";

export async function verifyAdminToken(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return false;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      logError({ message: "JWT_SECRET is not set" });
      return false;
    }

    jwt.verify(token, secret);
    return true;
  } catch (error) {
    logError({ message: "Admin token verification failed", error });
    return false;
  }
}

export { sanitizeRedirectUrl, validateRedirectUrl };
