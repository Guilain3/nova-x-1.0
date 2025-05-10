"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Briefcase, FileText, CreditCard, ArrowLeft } from "lucide-react";
import React from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { smeList } from "@/app/admin/smes/mockdata"; // assuming mock data is imported

export default function SmeDetailsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { id } = useParams();

  const sme = smeList.find((sme) => sme.id === id);
  const businessName = sme?.businessName ?? "Unknown SME";

  const tabs = [
    {
      label: "SME Details",
      path: `/admin/smes/${id}/sme-details`,
      icon: <Briefcase className="w-4 h-4 mr-2" />,
    },
    {
      label: "KYC Details",
      path: `/admin/smes/${id}/kyc-details`,
      icon: <FileText className="w-4 h-4 mr-2" />,
    },
    {
      label: "Subscription",
      path: `/admin/smes/${id}/sme-subscription`,
      icon: <CreditCard className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">
            SME Profile Overview <span className="text-gray-700">– {businessName}</span>
          </h1>
          <Link
            href="/admin/smes"
            className="flex items-center text-sm text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to All SMEs
          </Link>
        </div>

        <div className="flex space-x-6 border-b border-gray-200 mb-6">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link key={tab.label} href={tab.path} className="flex items-center">
                <span
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="bg-white rounded-md shadow-sm p-4">{children}</div>
      </div>
    </AdminLayout>
  );
}
