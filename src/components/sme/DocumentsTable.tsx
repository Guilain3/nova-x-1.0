// Enhanced DocumentsTable.tsx
import React, { useMemo } from "react";
import { Download, Key, Trash } from "lucide-react";
import { FinancialDocument } from "@/types/fintrack";
import AccessInfoModal from "../../app/sme/fintrack/modals/AccesInfoModal";

interface DocumentsTableProps {
  documents: FinancialDocument[];
  selectedRows: string[];
  searchQuery: string;
  sortField: string | null;
  sortDirection: "asc" | "desc";
  fileTypeFilter: string | null;
  showNameSortMenu: boolean;
  showTypeSortMenu: boolean;
  toggleSortMenu: (menu: "name" | "type") => void;
  setSortField: (field: string) => void;
  setSortDirection: (dir: "asc" | "desc") => void;
  setFileTypeFilter: (filter: string | null) => void;
  onSelectRow: (id: string) => void;
  onDownload: (doc: FinancialDocument) => void;
  onDelete: (doc: FinancialDocument) => void;
  onShare: (doc: FinancialDocument) => void;
  showAccessInfo: string | null;
  toggleAccessInfo: (docId: string) => void;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({
  documents,
  selectedRows,
  searchQuery,
  sortField,
  sortDirection,
  fileTypeFilter,
  onSelectRow,
  onDownload,
  onDelete,
  onShare,
  showAccessInfo,
  toggleAccessInfo,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getKeyIconColor = (doc: FinancialDocument) => {
    if (doc.accessStatus === "granted")
      return "text-green-600 hover:text-green-800";
    if (doc.accessStatus === "denied") return "text-red-600 hover:text-red-800";
    return "text-blue-600 hover:text-blue-800";
  };

  // Memoize filtered documents
  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.documentType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = fileTypeFilter
        ? doc.fileType.toLowerCase() === fileTypeFilter.toLowerCase()
        : true;
      return matchesSearch && matchesType;
    });
  }, [documents, searchQuery, fileTypeFilter]);

  // Memoize sorted documents
  const sorted = useMemo(() => {
    if (!sortField) return filtered;

    return [...filtered].sort((a, b) => {
      const valueA = a[sortField as keyof FinancialDocument];
      const valueB = b[sortField as keyof FinancialDocument];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (sortField === "uploadDate") {
        return sortDirection === "asc"
          ? new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
          : new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
      return 0;
    });
  }, [filtered, sortField, sortDirection]);

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100">
      <table className="w-full" aria-label="Documents Table">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-8 p-4">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                aria-label="Select all documents"
              />
            </th>
            <th className="text-left p-4 text-blue-700 font-semibold">
              File Name
            </th>
            <th className="text-left p-4 text-blue-700 font-semibold">
              File Size
            </th>
            <th className="text-left p-4 text-blue-700 font-semibold">
              File Type
            </th>
            <th className="text-left p-4 text-blue-700 font-semibold">
              Date of Upload
            </th>
            <th className="text-left p-4 text-blue-700 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.length > 0 ? (
            sorted.map((doc, i) => (
              <tr
                key={doc.id}
                className={`border-t transition ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(doc.id)}
                    onChange={() => onSelectRow(doc.id)}
                    className="rounded border-gray-300"
                    aria-label={`Select document ${doc.name}`}
                  />
                </td>
                <td className="p-4 truncate max-w-[200px]" title={doc.name}>
                  {doc.name}
                </td>
                <td className="p-4">{doc.fileSize}</td>
                <td className="p-4">{doc.fileType}</td>
                <td className="p-4">{formatDate(doc.uploadDate)}</td>
                <td className="p-4">
                  <div className="flex space-x-4 relative items-center">
                    <button
                      onClick={() => onShare(doc)}
                      className={`cursor-pointer ${getKeyIconColor(
                        doc
                      )} transition-colors relative`}
                      title="Share access"
                      aria-label={`Share access for ${doc.name}`}
                      onMouseEnter={() => toggleAccessInfo(doc.id)}
                      onMouseLeave={() => toggleAccessInfo("")}
                    >
                      <Key className="w-5 h-5" />
                      {showAccessInfo === doc.id && (
                        <AccessInfoModal
                          document={doc}
                          onClose={() => toggleAccessInfo("")}
                          onAccessGrant={() =>
                            console.log(`Access granted for ${doc.name}`)
                          }
                          onAccessDeny={() =>
                            console.log(`Access denied for ${doc.name}`)
                          }
                        />
                      )}
                    </button>
                    <button
                      onClick={() => onDownload(doc)}
                      className="cursor-pointer hover:text-blue-800 transition-colors"
                      title="Download file"
                      aria-label={`Download document ${doc.name}`}
                    >
                      <Download className="w-5 h-5 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDelete(doc)}
                      className="cursor-pointer hover:text-red-800 transition-colors"
                      title="Delete file"
                      aria-label={`Delete document ${doc.name}`}
                    >
                      <Trash className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-t">
              <td colSpan={6} className="py-16 text-center text-gray-500">
                No documents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;
