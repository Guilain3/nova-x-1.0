// Place this file in the 'mockdata' folder alongside SmeInfo.ts

import { SME } from './SmeInfo';

// Interface for investment data
export interface InvestmentData {
  id?: string;
  smeId: string;
  investorId: string;
  amount: number | null;
  equity: number | null;
  investmentDate: string | null;
  notes: string;
  createdAt?: Date;
}

// In-memory storage for investments (for mock purposes)
let mockInvestments: InvestmentData[] = [];

// Function to mark an SME as invested
export const markSmeAsInvested = async (investmentData: InvestmentData): Promise<InvestmentData> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate a unique ID
  const newInvestment: InvestmentData = {
    ...investmentData,
    id: Math.random().toString(36).substring(2, 15),
    createdAt: new Date(),
  };

  // Add to mock storage
  mockInvestments.push(newInvestment);
  
  return newInvestment;
};

// Function to get all investments for a specific investor
export const getInvestorInvestments = async (investorId: string): Promise<InvestmentData[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockInvestments.filter(investment => investment.investorId === investorId);
};

// Function to check if an investor has invested in a specific SME
export const hasInvestedInSme = async (investorId: string, smeId: string): Promise<boolean> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockInvestments.some(investment => 
    investment.investorId === investorId && investment.smeId === smeId
  );
};

// Function to get a specific investment
export const getInvestmentById = async (investmentId: string): Promise<InvestmentData | undefined> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockInvestments.find(investment => investment.id === investmentId);
};

// Function to update an existing investment
export const updateInvestment = async (
  investmentId: string, 
  updatedData: Partial<InvestmentData>
): Promise<InvestmentData | undefined> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const index = mockInvestments.findIndex(investment => investment.id === investmentId);
  
  if (index !== -1) {
    mockInvestments[index] = {
      ...mockInvestments[index],
      ...updatedData
    };
    return mockInvestments[index];
  }
  
  return undefined;
};  