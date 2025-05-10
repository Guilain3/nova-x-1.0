"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/admin/sidebar";
import Topbar from "@/components/layout/admin/topbar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample subscription data with investors
const allSubscriptions = [
  {
    id: 1,
    name: "AgriTech Solutions",
    type: "SME",
    plan: "Premium",
    amount: 299,
    status: "Active",
    startDate: "2023-05-15",
    renewalDate: "2024-05-15",
    paymentMethod: "Credit Card"
  },
  {
    id: 2,
    name: "TechNova Inc.",
    type: "SME",
    plan: "Business",
    amount: 199,
    status: "Active",
    startDate: "2023-06-20",
    renewalDate: "2024-06-20",
    paymentMethod: "Bank Transfer"
  },
  {
    id: 3,
    name: "John Smith",
    type: "Investor",
    plan: "Professional",
    amount: 149,
    status: "Active",
    startDate: "2023-04-10",
    renewalDate: "2024-04-10",
    paymentMethod: "Credit Card"
  },
  {
    id: 4,
    name: "ServicePro",
    type: "SME",
    plan: "Starter",
    amount: 99,
    status: "Cancelled",
    startDate: "2023-03-05",
    endDate: "2023-09-05",
    paymentMethod: "PayPal"
  },
  {
    id: 5,
    name: "Sarah Johnson",
    type: "Investor",
    plan: "Professional",
    amount: 149,
    status: "Active",
    startDate: "2023-07-01",
    renewalDate: "2024-07-01",
    paymentMethod: "Bank Transfer"
  },
  {
    id: 6,
    name: "QuickRetail",
    type: "SME",
    plan: "Business",
    amount: 199,
    status: "Pending",
    startDate: "2023-08-12",
    renewalDate: "2024-08-12",
    paymentMethod: "Credit Card"
  },
  {
    id: 7,
    name: "Michael Chen",
    type: "Investor", 
    plan: "Professional",
    amount: 149,
    status: "Active",
    startDate: "2023-09-01",
    renewalDate: "2024-09-01",
    paymentMethod: "Credit Card"
  },
  {
    id: 8,
    name: "Emily Wilson",
    type: "Investor",
    plan: "Professional",
    amount: 149,
    status: "Active",
    startDate: "2023-10-15",
    renewalDate: "2024-10-15",
    paymentMethod: "Bank Transfer"
  }
];

// Data for charts
const subscriptionTrends = [
  { month: "Jan", sme: 12, investor: 8 },
  { month: "Feb", sme: 15, investor: 10 },
  { month: "Mar", sme: 18, investor: 12 },
  { month: "Apr", sme: 22, investor: 15 },
  { month: "May", sme: 25, investor: 18 },
  { month: "Jun", sme: 28, investor: 20 },
];

const planDistribution = [
  { name: "Starter", value: 15 },
  { name: "Business", value: 35 },
  { name: "Premium", value: 25 },
  { name: "Professional", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AllSubscriptionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Filter subscriptions
  const filteredSubscriptions = allSubscriptions.filter(sub => {
    const typeMatch = typeFilter === "all" || sub.type.toLowerCase() === typeFilter;
    const statusMatch = statusFilter === "all" || sub.status.toLowerCase() === statusFilter;
    const planMatch = planFilter === "all" || sub.plan.toLowerCase() === planFilter;
    return typeMatch && statusMatch && planMatch;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page Body */}
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            All Subscriptions
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Manage and analyze subscription records of SMEs and Investors.
          </p>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="sme">SME</option>
                  <option value="investor">Investor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan</label>
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">All Plans</option>
                  <option value="starter">Starter</option>
                  <option value="business">Business</option>
                  <option value="premium">Premium</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subscription Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Renewal/End Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Method</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredSubscriptions.length > 0 ? (
                    filteredSubscriptions.map((sub) => (
                      <tr key={sub.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sub.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sub.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sub.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sub.plan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">${sub.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            sub.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                            sub.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sub.startDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sub.renewalDate || sub.endDate || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{sub.paymentMethod}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No subscriptions match the selected filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Subscription Trends
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={subscriptionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sme" stroke="#8884d8" name="SME Subscriptions" />
                    <Line type="monotone" dataKey="investor" stroke="#82ca9d" name="Investor Subscriptions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Plan Distribution
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {planDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}