"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Eye,
  Briefcase,
  Factory,
  CalendarDays,
  ArrowRightCircle,
} from "lucide-react";
import { motion } from "framer-motion";

// Remove the Layout import and wrapping

const DashboardPage = () => {
  const stats = {
    totalInvested: "RWF 10,000,000",
    activeInvestments: 5,
    totalSMEsContacted: 5,
    lastContactedSME: "MediCare Innovations",
    totalSMEsViewed: 45,
    topIndustry: "Tech",
    industriesInvested: ["Tech", "Healthcare", "FinTech"],
    mostInvested: "FinTech",
  };

  const recommendedSMEs = [
    { id: 1, name: "AgriBoost", industry: "Agriculture", requiredAmount: 100000 },
    { id: 2, name: "MediCare", industry: "Healthcare", requiredAmount: 200000 },
    { id: 3, name: "FinVerse", industry: "FinTech", requiredAmount: 150000 },
  ];

  const recentActivity = [
    { id: 1, name: "AgriBoost", industry: "Agriculture", date: "2023-10-05" },
    { id: 2, name: "MediCare", industry: "Healthcare", date: "2023-10-04" },
    { id: 3, name: "FinVerse", industry: "FinTech", date: "2023-10-03" },
  ];

  const currentHour = new Date().getHours();
  const greeting =
    "Good " + (currentHour < 12 ? "Morning" : currentHour < 18 ? "Afternoon" : "Evening");

  return (
    <div className="bg-blue-50 min-h-screen p-6 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
        <div className="text-sm text-gray-500 space-x-1">
          <Link href="/investor" className="hover:text-blue-600">
            Investor
          </Link>
          <span>/</span>
          <span className="text-blue-700">Dashboard</span>
        </div>
      </div>

      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{greeting}, Guilaine!</h2>
        <p className="text-gray-500">Here's how things are going today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Invested"
          value={stats.totalInvested}
          subtitle={`${stats.activeInvestments} Active Investments`}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          gradient="from-blue-600 to-blue-800"
        />
        <StatCard
          title="SMEs Contacted"
          value={stats.totalSMEsContacted.toString()}
          subtitle={`Last: ${stats.lastContactedSME}`}
          icon={<Users className="w-6 h-6 text-white" />}
          gradient="from-sky-500 to-blue-600"
        />
        <StatCard
          title="SMEs Viewed"
          value={stats.totalSMEsViewed.toString()}
          subtitle={`Top: ${stats.topIndustry}`}
          icon={<Eye className="w-6 h-6 text-white" />}
          gradient="from-cyan-500 to-sky-700"
        />
        <StatCard
          title="Industries"
          value={stats.industriesInvested.join(", ")}
          subtitle={`Most: ${stats.mostInvested}`}
          icon={<Briefcase className="w-6 h-6 text-white" />}
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      {/* Recommended SMEs */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-6">🚀 Recommended SMEs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedSMEs.map((sme, i) => (
            <motion.div
              key={sme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group bg-gradient-to-tr from-white via-blue-50 to-white p-5 border border-blue-100 rounded-xl shadow hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-blue-700">{sme.name}</h4>
                <Factory className="text-blue-400" />
              </div>
              <p className="text-gray-600">
                Industry: <span className="font-medium">{sme.industry}</span>
              </p>
              <p className="text-gray-600">
                Required Amount:{" "}
                <span className="font-semibold text-blue-600">RWF {sme.requiredAmount.toLocaleString()}</span>
              </p>
              <div className="mt-4">
                <Link
                  href={`/investor/find-smes/sme-detail?id=${sme.id}`}
                  className="flex items-center text-sm text-blue-600 hover:underline"
                >
                  View Details <ArrowRightCircle className="ml-2 h-4 w-4" />
                </Link>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-6">🕒 Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex items-center justify-between border-b border-blue-100 pb-3"
            >
              <div>
                <h4 className="text-md font-medium text-blue-800">{activity.name}</h4>
                <p className="text-sm text-gray-500">Industry: {activity.industry}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <CalendarDays className="w-4 h-4" />
                <span>{activity.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

// Helper component
const StatCard = ({ title, value, subtitle, icon, gradient }: any) => (
  <div className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-xl shadow`}>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-md font-semibold">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm">{subtitle}</p>
  </div>
);