"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/admin/sidebar";
import Topbar from "@/components/layout/admin/topbar";

// Mock API data
const mockInvestorSettings = [
  {
    id: 'inv-12345',
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Main St, Springfield, USA',
    profilePicture: null,
  },
  {
    id: 'inv-67890',
    fullName: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phoneNumber: '+1 (555) 987-6543',
    address: '456 Elm St, Springfield, USA',
    profilePicture: null,
  },
];

export default function AllInvestorsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [investors, setInvestors] = useState(mockInvestorSettings);
  const [filter, setFilter] = useState("");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const filteredInvestors = investors.filter((inv) =>
    inv.fullName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />

      <div className="flex flex-col flex-1">
        <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            All Investors
          </h1>

          <input
            type="text"
            placeholder="Search by name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4 p-2 rounded border w-full max-w-md"
          />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead>
  <tr className="border-b dark:border-gray-700">
    <th className="py-2">Name</th>
    <th className="py-2">Email</th>
    <th className="py-2">Phone</th>
    <th className="py-2">Address</th>
    <th className="py-2">Actions</th>
  </tr>
</thead>
<tbody>
  {filteredInvestors.map((inv) => (
    <tr key={inv.id} className="border-b dark:border-gray-700">
      <td className="py-2">{inv.fullName}</td>
      <td className="py-2">{inv.email}</td>
      <td className="py-2">{inv.phoneNumber}</td>
      <td className="py-2">{inv.address}</td>
      <td className="py-2">
        <button
          onClick={() => alert(`Suspending ${inv.fullName}`)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Suspend
        </button>
      </td>
    </tr>
  ))}
  {filteredInvestors.length === 0 && (
    <tr>
      <td colSpan={5} className="text-center py-4">
        No investors found.
      </td>
    </tr>
  )}
</tbody>

            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
