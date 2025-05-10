"use client";
import {
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlarmClock,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartArea } from "lucide-react";

export default function DashboardPage() {
  const [data] = useState([
    { day: "10", amount: 40000 },
    { day: "11", amount: 60000 },
    { day: "12", amount: 50000 },
    { day: "13", amount: 70000 },
    { day: "14", amount: 60000 },
    { day: "15", amount: 80000 },
    { day: "16", amount: 65000 },
    { day: "17", amount: 80234 }, // Peak value
    { day: "18", amount: 62000 },
    { day: "19", amount: 70000 },
  ]);

  const repaymentData = [
    { name: "On-time Payments", value: 50 },
    { name: "Late Payments", value: 50 },
  ];
  const COLORS = ["#0000BF", "#EF4444"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#0000BF] dark:text-[#0000BF]">
        Dashboard
      </h1>
      <h1 className="font-bold">Good morning, Kigali craft</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Welcome to your dashboard. Here you can manage your applications and
        view key insights.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 text-[#0000BF]">
        <StatCard
          title="Available Credit"
          value="RWF 10,000,000"
          percentage="10.0%"
          positive
          subtitle="Available to the SME."
        />
        <StatCard
          title="Loan Balance"
          value="RWF 3,500,000"
          percentage="3.0%"
          positive={false}
          subtitle="Last 30 Days"
        />
        <StatCard
          title="Next Repayment"
          value="RWF 500,000"
          percentage="3.2%"
          positive
          subtitle="15th Sept"
        />
        <StatCard
          title="Credit Score"
          value="750"
          percentage="8.3%"
          positive
          subtitle="Good"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Loan Status */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Loan and Funding Application Status
          </h2>
          <ul className="mt-4 space-y-2">
            <StatusItem label="Approved" value={100} />
            <StatusItem label="In Review" value={200} />
            <StatusItem label="Rejected" value={200} />
          </ul>
        </div>

        {/* Monthly Cash Flow Chart */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">Monthly Cash Flow</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#0000BF"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Insights & Payments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Repayment Performance */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Repayment Performance</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={repaymentData}
                cx="50%"
                cy="50%"
                innerRadius={60} // Creates the donut effect
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {repaymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            Trending up by <span className="text-green-500">5.2%</span> this
            month
          </p>
        </div>

        {/* Upcoming Payments */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">
            Upcoming Payments and Alerts
          </h2>
          <div className="space-y-4">
            <PaymentItem
              time="9:00 AM"
              title="BRD Development Grant"
              status="Applied"
              statusColor="bg-[#34C759]"
              completed
            />
            <PaymentItem
              time="9:00 AM"
              title="Capital seed Iteze imbere"
              status="Apply soon"
              statusColor="bg-[#0000BF]"
            />
            <PaymentItem
              time="9:00 AM"
              title="Micro loan Igurize"
              status="Apply soon"
              statusColor="bg-[#0000BF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for Statistics Card
function StatCard({
  title,
  value,
  percentage,
  positive,
  subtitle,
}: {
  title: string;
  value: string;
  percentage: string;
  positive: boolean;
  subtitle?: string;
}) {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm font-medium">
        {title}
        <span
          className={`flex items-center text-xs font-semibold ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {percentage}
        </span>
      </div>
      <p className="text-[#0000BF] dark:text-blue-400 text-2xl font-bold">
        {value}
      </p>
      {subtitle && (
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Component for Loan Status
function StatusItem({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex justify-between text-gray-700 dark:text-gray-300">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </li>
  );
}

// Component for Payment Item
function PaymentItem({
  time,
  title,
  status,
  statusColor,
  completed = false,
}: {
  time: string;
  title: string;
  status: string;
  statusColor: string;
  completed?: boolean;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      <div className="flex items-center space-x-3">
        {completed ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <AlarmClock className="text-blue-500" size={20} />
        )}
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
            {completed ? "Done at" : "Upcoming"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {title}
      </p>
      <span
        className={`text-white text-xs font-semibold px-3 py-1 rounded-lg ${statusColor}`}
      >
        {status}
      </span>
    </div>
  );
}
