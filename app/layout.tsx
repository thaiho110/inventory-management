import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarClient from "@/components/app-sidebar-client";
import { ThemeProvider } from "next-themes";
import {Analytics} from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IMS - Inventory Management System",
  description: "Professional inventory management system for tracking and managing your products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StackProvider app={stackClientApp}>
              <StackTheme>
                <SidebarProvider>
                  <AppSidebarClient/>
                  <main className="w-full flex flex-col min-h-screen">
                    <div className="sticky top-0 z-40 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 backdrop-blur-sm supports-[backdrop-filter]:bg-white/95 dark:supports-[backdrop-filter]:bg-slate-950/95">
                      <SidebarTrigger className="p-4" />
                    </div>
                    <div className="flex-1 p-6">
                      {children}
                    </div>
                    <Analytics />
                  </main>
                </SidebarProvider>
              </StackTheme>
            </StackProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}
