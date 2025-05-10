"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sme/Sidebar";
import Topbar from "../../components/layout/sme/Topbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      {mounted && (
        <>
          <aside
            className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-md z-50 transition-transform duration-300 ease-in-out
              ${
                isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
              }`}
          >
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          </aside>

          {/* Overlay for closing the sidebar on mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={(e) => {
                // Prevent closing when clicking inside the sidebar
                if (e.target === e.currentTarget) setIsSidebarOpen(false);
              }}
            />
          )}
        </>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-10 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Topbar (Responsive to Sidebar) */}
        <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
