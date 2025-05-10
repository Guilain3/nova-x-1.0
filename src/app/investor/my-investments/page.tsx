import React from 'react';
import Layout from "../dashboard/layout";

// Define types for our investment data
type Investment = {
  id: string;
  companyName: string;
  industry: string;
  investedDate: string;
  amount: number;
  equity: number;
  contact: string;
  status: 'active' | 'exited' | 'pending';
  logo?: string;
};

// Mock data - this will be replaced with API calls later
const mockInvestments: Investment[] = [
  {
    id: '1',
    companyName: 'GreenTech Solutions',
    industry: 'Renewable Energy',
    investedDate: '10/15/2024',
    amount: 15000,
    equity: 2.5,
    contact: 'greentech@gmail.com',
    status: 'active',
    logo: '/images/green-tech.png' 
  },
  {
    id: '2',
    companyName: 'HealthAI',
    industry: 'Healthcare Technology',
    investedDate: '03/22/2024',
    amount: 25000,
    equity: 3.2,
    contact: 'healthai@gmail.com',
    status: 'active',
    logo: '/images/health-ai.png'
  },
  {
    id: '3',
    companyName: 'UrbanFarm',
    industry: 'AgriTech',
    investedDate: '01/10/2023',
    amount: 10000,
    equity: 1.8,
    contact: 'urbanfarm@gmail.com',
    status: 'exited',
    logo: '/images/urban-farm.png' 
  },
  {
    id: '4',
    companyName: 'QuantumSecure',
    industry: 'Cybersecurity',
    investedDate: '05/05/2024',
    amount: 30000,
    equity: 4.0,
    contact: 'quantumsecure@gmail.com',
    status: 'pending',
    logo: '/images/quantum-secure.png' 
  }
];

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const MyInvestmentsPage: React.FC = () => {
  const investments = mockInvestments;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Investments</h1>
          <p className="text-gray-600 mt-2">Track and manage all your investment portfolios</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investments.map((investment) => (
            <div 
              key={investment.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Card Header with Dark Blue Accent */}
              <div className="bg-[#0000BF] px-6 py-4">
                <div className="flex items-center">
                  {investment.logo && (
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 overflow-hidden">
                      <img 
                        src={investment.logo} 
                        alt={`${investment.companyName} logo`} 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-white">{investment.companyName}</h2>
                    <p className="text-sm text-blue-200">{investment.industry}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Invested on:</span>
                    <span className="font-medium text-gray-800">{investment.investedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-blue-900">{formatCurrency(investment.amount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Equity:</span>
                    <span className="font-medium text-blue-900">{investment.equity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      investment.status === 'active' ? 'bg-green-100 text-green-800' :
                      investment.status === 'exited' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-900">Contact:</span> {investment.contact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary section */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Investment Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-blue-100">Total Invested</p>
              <p className="text-2xl font-bold">
                {formatCurrency(investments.reduce((sum, inv) => sum + inv.amount, 0))}
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-blue-100">Active Investments</p>
              <p className="text-2xl font-bold">
                {investments.filter(inv => inv.status === 'active').length}
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-blue-100">Total Equity</p>
              <p className="text-2xl font-bold">
                {investments.reduce((sum, inv) => sum + inv.equity, 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyInvestmentsPage;