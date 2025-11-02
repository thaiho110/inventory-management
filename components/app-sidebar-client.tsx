"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "./app-sidebar";

export default function AppSidebarClient() {
  const restrictedPaths = ["/handler/sign-in", "/handler/sign-up", "/sign-in", "/sign-up"];
  const pathname = usePathname() ?? "/";

  if (restrictedPaths.includes(pathname)) {
    return null;
  }
  

  return <AppSidebar pathname={pathname} />;
}