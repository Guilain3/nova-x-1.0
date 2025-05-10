"use client";

import { useParams } from "next/navigation";
import { smeList } from "@/app/admin/smes/mockdata";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, XCircle, Eye } from "lucide-react";

export default function KycDetailsPage() {
  const { id } = useParams();
  const sme = smeList.find((item) => item.id === id);

  if (!sme) return <div className="p-6">SME not found.</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-700">KYC Documents</h2>

      {sme.kycDocuments.length === 0 ? (
        <p className="text-gray-500">No documents submitted.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sme.kycDocuments.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-md">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>

                <div className="flex-1 space-y-1">
                  <p className="text-sm text-gray-500">Document Type</p>
                  <h3 className="text-lg font-semibold">{doc.type}</h3>

                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant={
                        doc.status === "PENDING"
                          ? "default"
                          : doc.status === "APPROVED"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {doc.status}
                    </Badge>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </div>

                  {doc.status === "PENDING" && (
                    <div className="flex gap-3 mt-3">
                      <Button
                        size="sm"
                        variant="default"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
