"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "./app-sidebar";

export default function AppSidebarClient() {
  const restrictedPaths = ["/auth/login", "/onboarding"];
  const pathname = usePathname() ?? "/";

  

  return <AppSidebar pathname={pathname} />;
}