// UploadBox.tsx
import React, { useState } from "react";
import { CloudUpload } from "lucide-react";
import { FinancialMetric } from "@/types/types";

interface FinancialDocument {
  id: string;
  name: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  documentType: string;
  fileUrl: string;
  metrics: FinancialMetric[]; // Update to match the expected type
}

interface UploadBoxProps {
  onUploadSuccess: (
    newDocument: import("@/types/fintrack").FinancialDocument
  ) => void;
  onUploadError: (error: string) => void;
  isUploading: boolean;
  selectedDocumentType: string;
  onDocumentTypeChange: (type: string) => void;
  onFileSelected: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const documentTypes = [
  { value: "BANK_STATEMENT", label: "Bank Statement" },
  { value: "RRA_TAX_CLEARANCE", label: "RRA tax clearance certificate" },
];

const UploadBox: React.FC<UploadBoxProps> = ({
  onUploadSuccess,
  onUploadError,
  selectedDocumentType,
  onDocumentTypeChange,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle file selection and upload
  const [documents, setDocuments] = useState<FinancialDocument[]>([]);

  const handleFileUpload = async (file: File) => {
    if (!file || !selectedDocumentType) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", selectedDocumentType);
      formData.append("name", file.name);
      formData.append("smeId", "1"); // You need to get this from somewhere

      const response = await fetch("/api/sme/fintrack/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      onUploadSuccess(result.document);
    } catch (error) {
      console.error("Upload failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload document";
      onUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-2 border-dashed border-blue-400 rounded-xl p-8 bg-white mb-6">
      <div className="text-center">
        <CloudUpload className="w-12 h-12 text-blue-600 mx-auto mb-4" />

        {/* Document Type Selection Dropdown with Description */}
        <div className="mb-4">
          <label
            htmlFor="documentType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Document Type
          </label>
          <select
            id="documentType"
            value={selectedDocumentType}
            onChange={(e) => onDocumentTypeChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Dynamic Description Based on Selection */}
          <div className="mt-2 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
            {selectedDocumentType === "BANK_STATEMENT"
              ? "Upload your at least 6 months bank statement to estimate your financial health of business. Supported formats: PDF, CSV."
              : "Upload your Rwanda Revenue Authority tax clearance certificate. Required for tax compliance verification. Supported format: PDF."}
          </div>
        </div>

        {isUploading ? (
          <div className="flex flex-col items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-lg text-gray-600">Uploading your document...</p>
          </div>
        ) : (
          <>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 cursor-pointer hover:bg-gray-50"
              onClick={handleBrowseClick}
            >
              <p className="text-lg text-gray-600">
                Click to select file or drag & drop
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: PDF, XLS, XLSX, CSV
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.xls,.xlsx,.csv"
              />
            </div>
            <button
              onClick={handleBrowseClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Files
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadBox;
