"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;