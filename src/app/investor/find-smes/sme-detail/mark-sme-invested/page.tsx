"use client"

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "../../../dashboard/layout";
import { IoChevronBack } from "react-icons/io5";
import { SME, fetchSmeById } from "../../../mockdata/SmeInfo";
// Uncomment when ready to use the investment service
// import { markSmeAsInvested, InvestmentData as ServiceInvestmentData } from "../../../../mockdata/investmentService";

interface InvestmentData {
  smeId: string;
  amount: number | null;
  equity: number | null;
  investmentDate: string | null;
  notes: string;
}

const MarkSmeInvested: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [smeTitle, setSmeTitle] = useState<string>("");
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    smeId: id || "",
    amount: null,
    equity: null,
    investmentDate: null,
    notes: ""
  });

  useEffect(() => {
    const loadSmeTitle = async () => {
      if (!id) {
        setError("SME ID not found");
        setLoading(false);
        return;
      }

      try {
        const smeData = await fetchSmeById(id);
        
        if (!smeData) {
          setError("SME not found");
          setLoading(false);
          return;
        }
        
        setSmeTitle(smeData.title);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching SME details:", err);
        setError("Failed to load SME details. Please try again later.");
        setLoading(false);
      }
    };

    loadSmeTitle();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setInvestmentData({
      ...investmentData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Import the investment service at the top of the file
      // import { markSmeAsInvested } from "../../../../mockdata/investmentService";
      
      // In a real application, this would be an API call to save the investment data
      console.log("Investment data to be saved:", investmentData);
      
      // When connected to a real backend, use the service:
      // await markSmeAsInvested({
      //   ...investmentData,
      //   investorId: "current-user-id", // This would come from authentication
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to the SME detail page
      router.push(`/investor/find-smes/sme-detail?id=${id}`);
      
      // In a real application, you might want to show a success message
    } catch (err) {
      console.error("Error saving investment data:", err);
      setError("Failed to save investment data. Please try again later.");
      setLoading(false);
    }
  };

  if (loading && !smeTitle) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {/* Back button */}
        <div className="flex justify-between items-center mb-4">
          <Link href={`/investor/find-smes/sme-detail?id=${id}`}>
            <button className="flex items-center text-blue-600">
              <IoChevronBack className="mr-1" /> Back to SME Detail
            </button>
          </Link>
          <div className="text-sm breadcrumbs">
            <ul className="flex">
              <li><Link href="/investor" className="text-gray-500">Investor</Link></li>
              <li><Link href="/investor/find-smes" className="text-gray-500">Find SMEs</Link></li>
              <li><Link href={`/investor/find-smes/sme-detail?id=${id}`} className="text-gray-500">SME Detail</Link></li>
            </ul>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">Mark as Invested</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <p className="text-lg mb-2">Confirm your investment in this SME:</p>
            <h2 className="text-2xl font-bold text-blue-600">{smeTitle}</h2>
            <p className="text-sm text-gray-500 mt-2">This information is for your tracking only and will not be shared publicly.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="amount" className="block text-gray-700 mb-2">
                Investment Amount <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount (e.g., 50,000)"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="equity" className="block text-gray-700 mb-2">
                Equity %
              </label>
              <input
                type="number"
                id="equity"
                name="equity"
                placeholder="Enter equity"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="investmentDate" className="block text-gray-700 mb-2">
                Investment Date
              </label>
              <input
                type="date"
                id="investmentDate"
                name="investmentDate"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="notes" className="block text-gray-700 mb-2">
                Notes <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Add any relevant details (e.g., equity percentage, agreement terms)"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium"
                disabled={loading}
              >
                {loading ? "Processing..." : "Mark as Invested"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default MarkSmeInvested;