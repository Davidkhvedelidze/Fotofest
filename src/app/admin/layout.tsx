import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Let individual pages handle their own authentication
  // The login page handles showing itself, and admin/page.tsx handles redirecting to login
  return <>{children}</>;
}
