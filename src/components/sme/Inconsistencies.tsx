// Enhanced Inconsistencies.tsx
import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { Inconsistency } from '@/utils/financialInconsistencyDetector';

interface InconsistenciesProps {
  inconsistencies: Inconsistency[];
  onGenerateReport?: () => void;
}

const Inconsistencies: React.FC<InconsistenciesProps> = ({ inconsistencies, onGenerateReport }) => {
  if (!inconsistencies.length) return null;

  const getLabel = (type: string) => {
    switch (type) {
      case 'document-mismatch': return 'Document Mismatch';
      case 'ratio-warning': return 'Unusual Ratio';
      default: return 'Data Integrity Issue';
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border border-orange-200';
      default: return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-red-100">
      <div className="flex items-center mb-4">
        <ShieldAlert className="text-red-600 mr-2" />
        <h3 className="text-lg font-bold text-red-700">Inconsistencies Detected</h3>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start mb-4">
          <AlertCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-600 mb-1">Heads Up!</p>
            <p className="text-sm text-red-600">
              We found {inconsistencies.length} inconsistencies in your financial data. Review them carefully.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {inconsistencies.map((issue) => (
            <div key={issue.id} className="border-t border-red-100 pt-3">
              <p className="font-semibold text-red-700 text-sm">{issue.title}</p>
              <p className="text-sm text-gray-700 mb-1">{issue.description}</p>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getSeverityStyle(issue.severity)}`}>
                  {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Priority
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  {getLabel(issue.type)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {onGenerateReport && (
          <div className="mt-6 text-right">
            <button
              className="text-sm px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              onClick={onGenerateReport}
            >
              Generate Inconsistency Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inconsistencies;
