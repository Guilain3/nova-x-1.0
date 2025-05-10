// File: src/app/dashboard/fintrack/hooks/useFintrackData.ts
import { useState, useEffect } from "react";
import {
  FinancialDocument,
  FinancialHealthDashboard,
  CreditScore,
} from "@/types/fintrack";
import {
  detectFinancialInconsistencies,
  Inconsistency,
} from "@/utils/financialInconsistencyDetector";

export function useFintrackData() {
  const [documents, setDocuments] = useState<FinancialDocument[]>([]);
  const [financialHealth, setFinancialHealth] =
    useState<FinancialHealthDashboard | null>(null);
  const [creditScore, setCreditScore] = useState<CreditScore | null>(null);
  const [inconsistencies, setInconsistencies] = useState<Inconsistency[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [docsRes, healthRes, scoreRes] = await Promise.all([
        fetch("/api/sme/fintrack/documents"),
        fetch("/api/sme/fintrack/financial-health"),
        fetch("/api/sme/fintrack/credit-score"),
      ]);

      const [docsData, healthData, scoreData] = await Promise.all([
        docsRes.json(),
        healthRes.json(),
        scoreRes.json(),
      ]);

      setDocuments(Array.isArray(docsData) ? docsData : []);
      setFinancialHealth(healthData);
      setCreditScore(scoreData);
      setProgress(healthData?.overallHealth || 0);

      const inconsistencies = detectFinancialInconsistencies(
        docsData,
        healthData
      );
      setInconsistencies(inconsistencies);
    } catch (err) {
      console.error("Error fetching fintrack data:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, documentType: string) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", documentType);

      const res = await fetch("/api/sme/fintrack/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      await fetchAllData();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      const res = await fetch(`/api/sme/fintrack/documents/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete");
      await fetchAllData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const grantAccess = async (id: string, accessType: "investors" | "nova") => {
    try {
      const res = await fetch(`/api/sme/fintrack/documents/access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, access: true, accessType }),
      });

      if (!res.ok) throw new Error("Failed to grant access");
      await fetchAllData();
    } catch (err) {
      console.error("Grant access error:", err);
    }
  };

  const denyAccess = async (id: string) => {
    try {
      const res = await fetch(`/api/sme/fintrack/documents/access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, access: false }),
      });

      if (!res.ok) throw new Error("Failed to deny access");
      await fetchAllData();
    } catch (err) {
      console.error("Deny access error:", err);
    }
  };

  return {
    documents,
    financialHealth,
    creditScore,
    inconsistencies,
    loading,
    uploading,
    progress,
    uploadFile,
    deleteDocument,
    grantAccess,
    denyAccess,
    refresh: fetchAllData,
  };
}
