
// File: src/types/fintrack.ts
export interface FinancialMetric {
  id: string;
  metricName: string;
  metricValue: number;
  metricUnit: string | null;
}

export interface FinancialDocument {
  id: string;
  name: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  documentType: string;
  fileUrl: string;
  metrics: FinancialMetric[];
  isShared?: boolean;
  accessStatus?: "granted" | "denied" | null;
  accessGrantedTo?: "investors" | "nova" | null;
}

export interface CreditScore {
  id: string;
  score: number;
  previousScore: number | null;
  scoreDifference: number | null;
  scoreCategory: string;
  reportUrl: string | null;
}

export interface FinancialHealthDashboard {
  id: string;
  overallHealth: number;
  revenueGrowth: number | null;
  profitMargin: number | null;
  operatingProfit: number | null;
  netProfitMargin: number | null;
  ebitda: number | null;
  currentRatio: number | null;
  debtToEquityRatio: number | null;
  workingCapital: number | null;
}
