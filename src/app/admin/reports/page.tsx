"use client";

import { useState, useRef } from "react";
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
  AreaChart,
  Area,
} from "recharts";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Sample data - replace with your actual data
const investorData = [
  { name: "Jan", investments: 12, amount: 24000 },
  { name: "Feb", investments: 19, amount: 38000 },
  { name: "Mar", investments: 15, amount: 30000 },
  { name: "Apr", investments: 28, amount: 56000 },
  { name: "May", investments: 32, amount: 64000 },
  { name: "Jun", investments: 24, amount: 48000 },
];

const smeData = [
  { name: "Jan", registrations: 8, funding: 18000 },
  { name: "Feb", registrations: 12, funding: 32000 },
  { name: "Mar", registrations: 10, funding: 25000 },
  { name: "Apr", registrations: 15, funding: 42000 },
  { name: "May", registrations: 18, funding: 50000 },
  { name: "Jun", registrations: 14, funding: 38000 },
];

const sectorDistribution = [
  { name: "Agriculture", value: 35 },
  { name: "Technology", value: 25 },
  { name: "Manufacturing", value: 20 },
  { name: "Services", value: 15 },
  { name: "Retail", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("investors");
  const reportRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Prepare CSV data
  const investorCSVData = [
    ["Month", "Number of Investments", "Total Amount ($)"],
    ...investorData.map(item => [item.name, item.investments, item.amount])
  ];

  const smeCSVData = [
    ["Month", "New Registrations", "Funding Received ($)"],
    ...smeData.map(item => [item.name, item.registrations, item.funding])
  ];

  // Export to PDF function
  const exportToPDF = () => {
    const input = reportRef.current;
    const title = activeTab === "investors" ? "Investor Analytics Report" : "SME Analytics Report";
    const date = new Date().toLocaleDateString();

    if (!input) {
      console.error("Report container is not available.");
      return;
    }

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.text(title, 15, 15);
      pdf.text(`Generated on: ${date}`, pdfWidth - 60, 15);
      pdf.addImage(imgData, 'PNG', 15, 25, pdfWidth - 30, pdfHeight - 30);
      pdf.save(`${title.toLowerCase().replace(/ /g, '_')}_${date}.pdf`);
    });
  };

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
            Reports
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            View system usage reports, investor trends, SME activities, and platform analytics.
          </p>

          {/* Tabs and Export Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`py-2 px-4 font-medium ${activeTab === "investors" 
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400" 
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}
                onClick={() => setActiveTab("investors")}
              >
                Investor Analytics
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === "smes" 
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400" 
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}
                onClick={() => setActiveTab("smes")}
              >
                SME Analytics
              </button>
            </div>
            
            <div className="flex space-x-2">
              <CSVLink 
                data={activeTab === "investors" ? investorCSVData : smeCSVData}
                filename={`${activeTab}_report_${new Date().toISOString().slice(0, 10)}.csv`}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Export CSV
              </CSVLink>
              <button 
                onClick={exportToPDF}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Export PDF
              </button>
            </div>
          </div>

          {/* Report Content (with ref for PDF export) */}
          <div ref={reportRef} className="space-y-6">
            {/* Investor Reports */}
            {activeTab === "investors" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Investment Activity (Last 6 Months)
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={investorData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="investments" name="Number of Investments" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="amount" name="Total Amount ($)" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Investment Trend
                    </h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={investorData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="amount" stroke="#ff7300" name="Amount ($)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Sector Distribution
                    </h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sectorDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {sectorDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SME Reports */}
            {activeTab === "smes" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    SME Activity (Last 6 Months)
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={smeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="registrations" stackId="1" stroke="#8884d8" fill="#8884d8" name="New Registrations" />
                        <Area type="monotone" dataKey="funding" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Funding Received ($)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Funding Trend
                    </h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={smeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="funding" stroke="#ff7300" name="Funding ($)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Registration Growth
                    </h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={smeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="registrations" name="New Registrations" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}