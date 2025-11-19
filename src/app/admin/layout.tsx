import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  try {
    jwt.verify(token!, process.env.JWT_SECRET!);
  } catch {
    return <div className="text-red-600">Access denied. Not authorized.</div>;
  }

  return <>{children}</>;
}
