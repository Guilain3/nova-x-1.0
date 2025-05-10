"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, BarChart2, Users } from "lucide-react";

// Simple mock data
const investorData = [
  { name: "Investor A", industry: "Fintech", date: "18/04/2025" },
  { name: "Investor B", industry: "Technology", date: "17/04/2025" },
  { name: "Investor C", industry: "Healthcare", date: "16/04/2025" },
];

const complianceData = [
  { document: "Business Registration", status: "Verified" },
  { document: "Tax Certificate", status: "Pending" },
  { document: "Financial Statements", status: "Verified" },
];

const ReportsPage: React.FC = () => {
  // Simple download function
  const handleDownload = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj => Object.values(obj).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart2 className="w-6 h-6" /> Reports Dashboard
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" /> Export All
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Credit Score</p>
              <p className="text-2xl font-bold">720</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <BarChart2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Investor Views</p>
              <p className="text-2xl font-bold">{investorData.length}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Compliance</p>
              <p className="text-2xl font-bold">
                {Math.round((complianceData.filter(d => d.status === "Verified").length / complianceData.length) * 100)}%
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Investor Activity */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Investor Activity</h2>
          <Button 
            variant="outline" 
            onClick={() => handleDownload(investorData, "investor-activity")}
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investor</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investorData.map((inv, idx) => (
              <TableRow key={idx}>
                <TableCell>{inv.name}</TableCell>
                <TableCell>{inv.industry}</TableCell>
                <TableCell>{inv.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Compliance Status */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Document Compliance</h2>
          <Button 
            variant="outline" 
            onClick={() => handleDownload(complianceData, "compliance-report")}
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complianceData.map((doc, idx) => (
              <TableRow key={idx}>
                <TableCell>{doc.document}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    doc.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {doc.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ReportsPage;