"use client";

import { smeList } from "./mockdata";
import SmeTable from "../../../components/admin/SmeTable";
import AdminLayout from "../../../components/layout/admin/AdminLayout";

export default function AdminSMEsPage() {
  const tableData = smeList.map(
    ({ id, businessName, email, status, phone, kycDocuments, subscription }) => ({
      id,
      businessName,
      email,
      status: status as "PENDING" | "APPROVED" | "SUSPENDED" | "REJECTED",
      phone: phone || "N/A",
      kycDocuments: kycDocuments || [],
      subscription: subscription || null,
    })
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">Registered SMEs</h1>
            <p className="text-sm text-gray-500 mt-1">
              View, approve, suspend or inspect all SME accounts
            </p>
          </div>

          <div className="px-4 py-1.5 bg-blue-100 text-blue-800 font-semibold text-sm rounded-full shadow-sm border border-blue-300">
            Total SMEs: {tableData.length}
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-0 overflow-hidden">
          <SmeTable data={tableData} />
        </div>
      </div>
    </AdminLayout>
  );
}
