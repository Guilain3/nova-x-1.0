// "use client";

import { ThemeProvider } from "next-themes";
// import { useEffect, useState } from "react";
import "./globals.css"; // Import global styles
import DashboardLayout from "./sme/layout";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-900">
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
