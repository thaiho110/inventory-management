// app/providers.tsx

"use client";

import type { ReactNode } from 'react';
import { ThemeProvider } from "next-themes";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client"; // Adjust path if needed
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebarClient from "@/components/app-sidebar-client";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StackProvider app={stackClientApp}>
        <StackTheme>
          <SidebarProvider>
            <AppSidebarClient />
            <main className="w-full">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </StackTheme>
      </StackProvider>
    </ThemeProvider>
  );
}