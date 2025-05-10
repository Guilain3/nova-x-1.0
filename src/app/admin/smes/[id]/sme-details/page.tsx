"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { smeList } from "@/app/admin/smes/mockdata";
import { Mail, Phone, Briefcase, ShieldCheck, Ban, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SmeInfoPage() {
  const { id } = useParams();
  const sme = smeList.find((item) => item.id === id);

  const [status, setStatus] = useState(sme?.status || "");

  if (!sme) return <div className="p-6">SME not found.</div>;

  const handleStatusToggle = () => {
    if (status === "APPROVED") setStatus("SUSPENDED");
    else if (status === "SUSPENDED") setStatus("APPROVED");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-700">Business Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <Briefcase className="text-blue-600 w-5 h-5 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Business Name</p>
            <p className="text-base font-semibold">{sme.businessName}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="text-blue-600 w-5 h-5 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-semibold">{sme.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="text-blue-600 w-5 h-5 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-base font-semibold">{sme.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="text-blue-600 w-5 h-5 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <Badge
              variant={
                status === "PENDING"
                  ? "default"
                  : status === "APPROVED"
                  ? "success"
                  : status === "REJECTED"
                  ? "destructive"
                  : "warning"
              }
            >
              {status}
            </Badge>
          </div>
        </div>
      </div>

      {(status === "APPROVED" || status === "SUSPENDED") && (
        <div className="pt-4">
          <Button
            onClick={handleStatusToggle}
            variant={status === "APPROVED" ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {status === "APPROVED" ? (
              <>
                <Ban className="w-4 h-4" />
                Suspend Business
              </>
            ) : (
              <>
                <RefreshCcw className="w-4 h-4" />
                Unsuspend Business
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
