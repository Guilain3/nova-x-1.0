import { mockData } from "@/lib/support/mockData";
import { Link } from "lucide-react";
import Links from "next/link";

const ReasonsForIneligibility = () => {
  return (
    <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Reasons for Ineligibility</h2>
      
      <div className="space-y-6">
        {mockData.reasons.map(reason => (
          <div key={reason.id} className="pb-4 border-b last:border-0 flex justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-700">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
            {reason.canUpload && (
              <Links href="/dashboard/financials/fintrack">
                <button className="px-6 py-2 bg-blue-700 text-white rounded h-10">
                  Upload
                </button>
              </Links>
              
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsForIneligibility;