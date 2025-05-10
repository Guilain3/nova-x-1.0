// This file shows how to integrate the Dashboard component into your existing structure
// app/dashboard/page.tsx

"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/admin/sidebar";
import Topbar from "@/components/layout/admin/topbar";
import Dashboard from "./Dashboard"; // Import the Dashboard component

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

interface TopbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function DashboardPage(): React.ReactNode {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = (): void => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        closeSidebar={closeSidebar} 
      />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        {/* Page Content */}
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Dashboard
              </h1>
              
              {/* Dashboard Component */}
              <Dashboard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}