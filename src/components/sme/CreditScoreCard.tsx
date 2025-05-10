// Enhanced CreditScoreCard.tsx
import React from "react";
import { ArrowUp, Download, ArrowDown, AlertCircle } from "lucide-react";
import {
  CreditScore,
  FinancialHealthDashboard,
  FinancialDocument,
} from "@/types/fintrack";
import { generateAndDownloadReport } from "@/utils/reportUtils";

interface CreditScoreCardProps {
  creditScore: CreditScore | null;
  documentsPresent: boolean;
  financialHealth: FinancialHealthDashboard | null;
  documents: FinancialDocument[];
  inconsistencies: any[];
}

const CreditScoreCard: React.FC<CreditScoreCardProps> = ({
  creditScore,
  documentsPresent,
  financialHealth,
  documents,
  inconsistencies,
}) => {
  const handleDownload = () => {
    if (creditScore) {
      generateAndDownloadReport(
        creditScore,
        financialHealth,
        documents,
        inconsistencies
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto">
      <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
        📊 Current Credit Score
      </h3>

      {!documentsPresent ? (
        <div className="text-center py-6">
          <div className="bg-blue-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-10 w-10 text-blue-600" />
          </div>
          <div className="text-3xl font-bold mb-1">0</div>
          <p className="text-gray-500 mb-2">No credit score available</p>
          <p className="text-sm text-gray-400 max-w-xs mx-auto">
            Upload financial documents to generate your business credit score.
          </p>
          <button
            className="w-full bg-gray-200 text-gray-500 font-semibold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 cursor-not-allowed"
            disabled
          >
            <Download size={18} />
            Download Report
          </button>
        </div>
      ) : (
        <>
          <div className="relative w-48 h-48 mx-auto">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#22C55E"
                strokeWidth="10"
                strokeDasharray="70 282.7"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#FACC15"
                strokeWidth="10"
                strokeDasharray="40 282.7"
                strokeDashoffset="-70"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#2563EB"
                strokeWidth="10"
                strokeDasharray="80 282.7"
                strokeDashoffset="-110"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              {creditScore?.scoreDifference &&
                creditScore.scoreDifference !== 0 && (
                  <>
                    {creditScore.scoreDifference > 0 ? (
                      <ArrowUp className="mx-auto text-green-500" size={20} />
                    ) : (
                      <ArrowDown className="mx-auto text-red-500" size={20} />
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        creditScore.scoreDifference > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {Math.abs(creditScore.scoreDifference)} pts
                    </span>
                  </>
                )}
              <div className="text-2xl font-bold text-blue-800">
                {creditScore?.score || 0}
              </div>
              <div className="text-xs text-gray-500">Your credit standing</div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-4 text-xs text-gray-700">
            <ScoreRange color="bg-blue-600" range="300-499" label="Poor" />
            <ScoreRange color="bg-yellow-500" range="500-649" label="Fair" />
            <ScoreRange color="bg-orange-400" range="650-799" label="Good" />
            <ScoreRange
              color="bg-green-500"
              range="800-1000"
              label="Excellent"
            />
          </div>

          <p className="text-center text-gray-500 text-sm mt-2">
            Score updates weekly based on your uploaded financial history.
          </p>

          <button
            onClick={handleDownload}
            className="w-full bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg mt-4 flex items-center justify-center gap-2 hover:bg-blue-800"
          >
            <Download size={18} />
            Download Report
          </button>
        </>
      )}
    </div>
  );
};

const ScoreRange = ({
  color,
  range,
  label,
}: {
  color: string;
  range: string;
  label: string;
}) => (
  <div className="flex items-center gap-1">
    <span className={`w-5 h-1 ${color} rounded-full`} />
    <div className="text-gray-600 font-medium">{label}</div>
  </div>
);

export default CreditScoreCard;
