"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/admin/sidebar";
import Topbar from "@/components/layout/admin/topbar";

// ✅ Step 1: MOCK DATA (place this at the top of the file)
const mockLogs = [
  {
    id: "1",
    user: "Admin Jane",
    action: "Approved SME KYC",
    timestamp: "2025-05-01 14:32",
    status: "SUCCESS",
  },
  {
    id: "2",
    user: "System",
    action: "Database Backup Completed",
    timestamp: "2025-05-01 13:15",
    status: "SUCCESS",
  },
  {
    id: "3",
    user: "Admin John",
    action: "Suspended SME 'QuickPay'",
    timestamp: "2025-05-01 12:48",
    status: "WARNING",
  },
  {
    id: "4",
    user: "Admin Jane",
    action: "Failed Login Attempt",
    timestamp: "2025-05-01 12:30",
    status: "FAILED",
  },
];

export default function SystemLogsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Page Body */}
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">
            System Logs
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            A detailed list of platform events, admin actions, and system activities.
          </p>

          {/* Logs Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="text-left px-4 py-3">User</th>
                  <th className="text-left px-4 py-3">Action</th>
                  <th className="text-left px-4 py-3">Timestamp</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600 dark:text-gray-200">
                {mockLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3">{log.user}</td>
                    <td className="px-4 py-3">{log.action}</td>
                    <td className="px-4 py-3">{log.timestamp}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          log.status === "SUCCESS"
                            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                            : log.status === "WARNING"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
                            : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
