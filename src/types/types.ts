// types.ts
// Types to be imported by your inconsistency detector

export interface FinancialMetric {
    id: string;
    metricName: string;
    metricValue: number;
    metricUnit: string | null;
    metricCategory?: string;
    displayOrder?: number;
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