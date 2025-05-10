"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SmeData {
  id: string;
  businessName: string;
  email: string;
  status: "PENDING" | "APPROVED" | "SUSPENDED" | "REJECTED";
  phone: string;
  kycDocuments: {
    id: string;
    type: string;
    status: string;
    fileUrl: string;
  }[];
  subscription: {
    plan: string;
    expiresOn: string;
  } | null;
}

export default function SmeTable({ data }: { data: SmeData[] }) {
  const getActionLink = (sme: SmeData) => {
    const id = sme.id;
    if (sme.status === "PENDING") return `/admin/smes/${id}/kyc-details`;
    if (sme.status === "APPROVED" || sme.status === "SUSPENDED") return `/admin/smes/${id}/sme-details`;
    return `/admin/smes/${id}/sme-details`;
  };

  const getActionLabel = (status: string) => {
    switch (status) {
      case "PENDING": return "Review KYC";
      case "APPROVED": return "View Business";
      case "SUSPENDED": return "View Business";
      case "REJECTED": return "View Details";
    }
  };

  return (
    <div className="p-4">
      <table className="min-w-full border border-gray-200 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">Business Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sme) => (
            <tr key={sme.id} className="border-t">
              <td className="p-2">{sme.businessName}</td>
              <td className="p-2">{sme.email}</td>
              <td className="p-2">
                <Badge variant={
                  sme.status === "PENDING" ? "default" :
                  sme.status === "APPROVED" ? "success" :
                  sme.status === "REJECTED" ? "destructive" : "warning"
                }>
                  {sme.status}
                </Badge>
              </td>
              <td className="p-2">
                <Link href={getActionLink(sme)}>
                  <Button size="sm">{getActionLabel(sme.status)}</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
