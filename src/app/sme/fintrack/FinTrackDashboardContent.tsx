// File: src/app/dashboard/fintrack/FinTrackDashboardContent.tsx
import React, { useRef, useState } from "react";
import UploadBox from "../../../components/sme/UploadBox";
import DocumentsTable from "../../../components/sme/DocumentsTable";
import MetricsChart from "../../../components/sme/MetricsChart";
import Inconsistencies from "../../../components/sme/Inconsistencies";
import CreditScoreCard from "../../../components/sme/CreditScoreCard";
import ShareModal from "./modals/ShareModal";
import AccessModal from "./modals/AccessModal";
import ConfirmationModal from "./modals/ConfirmationModal";
import { useFintrackData } from "./hooks/useFintrackData";
import { generateAndDownloadReport } from "@/utils/reportUtils";
import { FinancialDocument } from "@/types/fintrack";

const FinTrackDashboardContent = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDocumentType, setSelectedDocumentType] =
    useState<string>("BANK_STATEMENT");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [fileTypeFilter, setFileTypeFilter] = useState<string | null>(null);
  const [showNameSortMenu, setShowNameSortMenu] = useState(false);
  const [showTypeSortMenu, setShowTypeSortMenu] = useState(false);
  const [showAccessInfo, setShowAccessInfo] = useState<string | null>(null);

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [selectedAccessType, setSelectedAccessType] = useState<
    "investors" | "nova" | null
  >(null);
  const [currentDocument, setCurrentDocument] =
    useState<FinancialDocument | null>(null);

  const {
    documents,
    financialHealth,
    creditScore,
    inconsistencies,
    progress,
    loading,
    uploading,
    uploadFile,
    deleteDocument,
    grantAccess,
    denyAccess,
  } = useFintrackData();

  const handleSortMenu = (menu: "name" | "type") => {
    setShowNameSortMenu(menu === "name" ? !showNameSortMenu : false);
    setShowTypeSortMenu(menu === "type" ? !showTypeSortMenu : false);
  };

  const handleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAccessGrantSelection = (type: "investors" | "nova") => {
    setSelectedAccessType(type);
    setShowAccessModal(false);
    setShowConfirmationModal(true);
  };

  const handleAccessConfirm = async () => {
    try {
      if (currentDocument && selectedAccessType) {
        await grantAccess(currentDocument.id, selectedAccessType);
      }
    } catch (err) {
      console.error("Access grant failed:", err);
    } finally {
      setShowConfirmationModal(false);
      setSelectedAccessType(null);
    }
  };

  const handleAccessDeny = async () => {
    try {
      if (currentDocument) {
        await denyAccess(currentDocument.id);
      }
    } catch (err) {
      console.error("Access deny failed:", err);
    } finally {
      setShowAccessModal(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await uploadFile(file, selectedDocumentType);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleDocumentDelete = async () => {
    try {
      if (currentDocument) {
        await deleteDocument(currentDocument.id);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setShowDeleteModal(false);
      setCurrentDocument(null);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading FinTrack Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      {(showShareModal || showDeleteModal) && (
        <ShareModal
          isOpen={showShareModal || showDeleteModal}
          onClose={() => {
            setShowShareModal(false);
            setShowDeleteModal(false);
          }}
          onConfirm={() => {
            if (showDeleteModal) handleDocumentDelete();
            else setShowShareModal(false);
          }}
          documentName={currentDocument?.name || ""}
          action={showDeleteModal ? "delete" : "share"}
        />
      )}

      {currentDocument && showAccessModal && (
        <AccessModal
          document={currentDocument}
          onClose={() => setShowAccessModal(false)}
          onAccessGrant={handleAccessGrantSelection}
          onAccessDeny={handleAccessDeny}
        />
      )}

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleAccessConfirm}
        document={currentDocument}
        accessType={selectedAccessType}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">FinTrack Dashboard</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <UploadBox
            isUploading={uploading}
            selectedDocumentType={selectedDocumentType}
            onDocumentTypeChange={setSelectedDocumentType}
            onFileSelected={handleFileUpload}
            fileInputRef={fileInputRef}
            onUploadSuccess={function (newDocument: FinancialDocument): void {
              throw new Error("Function not implemented.");
            }}
            onUploadError={function (error: string): void {
              throw new Error("Function not implemented.");
            }}
          />

          <DocumentsTable
            documents={documents}
            selectedRows={selectedRows}
            searchQuery={searchQuery}
            sortField={sortField}
            sortDirection={sortDirection}
            fileTypeFilter={fileTypeFilter}
            showNameSortMenu={showNameSortMenu}
            showTypeSortMenu={showTypeSortMenu}
            toggleSortMenu={handleSortMenu}
            setSortField={setSortField}
            setSortDirection={setSortDirection}
            setFileTypeFilter={setFileTypeFilter}
            onSelectRow={handleRowSelection}
            onDownload={(doc) => window.open(doc.fileUrl, "_blank")}
            onDelete={(doc) => {
              setCurrentDocument(doc);
              setShowDeleteModal(true);
            }}
            onShare={(doc) => {
              setCurrentDocument(doc);
              setShowShareModal(true);
            }}
            showAccessInfo={showAccessInfo}
            toggleAccessInfo={setShowAccessInfo}
          />
        </div>

        <div className="space-y-6">
          <MetricsChart
            documentsPresent={documents.length > 0}
            progress={progress}
            financialHealth={financialHealth}
          />

          <Inconsistencies
            inconsistencies={inconsistencies}
            onGenerateReport={() =>
              generateAndDownloadReport(
                creditScore,
                financialHealth,
                documents,
                inconsistencies
              )
            }
          />

          <CreditScoreCard
            creditScore={creditScore}
            documentsPresent={documents.length > 0}
            financialHealth={financialHealth}
            documents={documents}
            inconsistencies={inconsistencies}
          />
        </div>
      </div>
    </div>
  );
};

export default FinTrackDashboardContent;
