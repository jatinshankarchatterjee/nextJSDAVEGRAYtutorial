import React from "react";
import { ThemeProvider } from "next-themes";
import Headerdash from "@/components/header-dash";
import { Toaster } from "@/components/ui/toaster";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Headerdash />
        {children}
      </ThemeProvider>
      <Toaster />
    </div>
  );
}
