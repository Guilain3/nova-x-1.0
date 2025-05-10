
import { FinancialDocument, FinancialMetric, FinancialHealthDashboard } from '../types/types';

export interface Inconsistency {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  documentIds?: string[];
  type: 'document-mismatch' | 'ratio-warning' | 'data-integrity';
}

export function detectFinancialInconsistencies(
  documents: FinancialDocument[],
  financialHealth: FinancialHealthDashboard | null
): Inconsistency[] {
  if (!documents || documents.length === 0 || !financialHealth) return [];
  
  const inconsistencies: Inconsistency[] = [];
  
  // Group documents by type for easier access
  const incomeStatements = documents.filter(d => d.documentType === "INCOME_STATEMENT");
  const balanceSheets = documents.filter(d => d.documentType === "BALANCE_SHEET");
  const cashFlowStatements = documents.filter(d => d.documentType === "CASH_FLOW_STATEMENT");
  const taxReturns = documents.filter(d => d.documentType === "TAX_RETURN");
  const accountsReceivable = documents.filter(d => d.documentType === "ACCOUNTS_RECEIVABLE");
  const accountsPayable = documents.filter(d => d.documentType === "ACCOUNTS_PAYABLE");
  
  // 1. Check if Net Income in Income Statement matches Cash Flow Statement
  if (incomeStatements.length > 0 && cashFlowStatements.length > 0) {
    const netIncomeMetric = getMetricFromDocuments(incomeStatements, "NET_INCOME");
    const cashFlowNetIncomeMetric = getMetricFromDocuments(cashFlowStatements, "NET_INCOME");
    
    if (netIncomeMetric && cashFlowNetIncomeMetric && 
        Math.abs(netIncomeMetric.metricValue - cashFlowNetIncomeMetric.metricValue) > 0.01) {
      inconsistencies.push({
        id: `inconsistency-${inconsistencies.length + 1}`,
        title: "Net Income Mismatch",
        description: "The net income reported in the Income Statement doesn't match the starting figure in the Cash Flow Statement.",
        severity: "high",
        documentIds: [incomeStatements[0].id, cashFlowStatements[0].id],
        type: "document-mismatch"
      });
    }
  }
  
  // 2. Check if Balance Sheet balances (Assets = Liabilities + Equity)
  if (balanceSheets.length > 0) {
    const totalAssetsMetric = getMetricFromDocuments(balanceSheets, "TOTAL_ASSETS");
    const totalLiabilitiesMetric = getMetricFromDocuments(balanceSheets, "TOTAL_LIABILITIES");
    const totalEquityMetric = getMetricFromDocuments(balanceSheets, "TOTAL_EQUITY");
    
    if (totalAssetsMetric && totalLiabilitiesMetric && totalEquityMetric) {
      const difference = Math.abs(totalAssetsMetric.metricValue - 
                               (totalLiabilitiesMetric.metricValue + totalEquityMetric.metricValue));
      if (difference > 0.01) {
        inconsistencies.push({
          id: `inconsistency-${inconsistencies.length + 1}`,
          title: "Balance Sheet Imbalance",
          description: `Assets (${totalAssetsMetric.metricValue.toLocaleString()} RWF) don't equal Liabilities + Equity (${(totalLiabilitiesMetric.metricValue + totalEquityMetric.metricValue).toLocaleString()} RWF).`,
          severity: "high",
          documentIds: [balanceSheets[0].id],
          type: "data-integrity"
        });
      }
    }
  }
  
  // 3. Check if Accounts Receivable in AR report matches Balance Sheet
  if (balanceSheets.length > 0 && accountsReceivable.length > 0) {
    const balanceSheetARMetric = getMetricFromDocuments(balanceSheets, "ACCOUNTS_RECEIVABLE");
    const arReportMetric = getMetricFromDocuments(accountsReceivable, "TOTAL_RECEIVABLES");
    
    if (balanceSheetARMetric && arReportMetric && 
        Math.abs(balanceSheetARMetric.metricValue - arReportMetric.metricValue) > 0.01) {
      inconsistencies.push({
        id: `inconsistency-${inconsistencies.length + 1}`,
        title: "Accounts Receivable Mismatch",
        description: "The Accounts Receivable amount in the Balance Sheet doesn't match the total in the AR report.",
        severity: "medium",
        documentIds: [balanceSheets[0].id, accountsReceivable[0].id],
        type: "document-mismatch"
      });
    }
  }
  
  // 4. Check if reported revenue in tax return matches income statement
  if (incomeStatements.length > 0 && taxReturns.length > 0) {
    const incomeStatementRevenue = getMetricFromDocuments(incomeStatements, "REVENUE");
    const taxReturnRevenue = getMetricFromDocuments(taxReturns, "REPORTED_REVENUE");
    
    if (incomeStatementRevenue && taxReturnRevenue && 
        Math.abs(incomeStatementRevenue.metricValue - taxReturnRevenue.metricValue) > 0.01) {
      inconsistencies.push({
        id: `inconsistency-${inconsistencies.length + 1}`,
        title: "Revenue Reporting Discrepancy",
        description: "The revenue reported in your tax return doesn't match your income statement.",
        severity: "high",
        documentIds: [incomeStatements[0].id, taxReturns[0].id],
        type: "document-mismatch"
      });
    }
  }
  
  // 5. Check for unusual financial ratios based on industry standards
  if (financialHealth.currentRatio && financialHealth.currentRatio < 1.0) {
    inconsistencies.push({
      id: `inconsistency-${inconsistencies.length + 1}`,
      title: "Low Current Ratio",
      description: `Your current ratio (${financialHealth.currentRatio}) is below 1.0, indicating potential liquidity issues.`,
      severity: "medium",
      type: "ratio-warning"
    });
  }
  
  if (financialHealth.debtToEquityRatio && financialHealth.debtToEquityRatio > 2.0) {
    inconsistencies.push({
      id: `inconsistency-${inconsistencies.length + 1}`,
      title: "High Debt-to-Equity Ratio",
      description: `Your debt-to-equity ratio (${financialHealth.debtToEquityRatio}) suggests potentially excessive leverage.`,
      severity: "medium",
      type: "ratio-warning"
    });
  }
  
  // 6. Check for extreme profit margin as an indicator of potential issue
  if (financialHealth.profitMargin && (financialHealth.profitMargin > 70 || financialHealth.profitMargin < 0)) {
    inconsistencies.push({
      id: `inconsistency-${inconsistencies.length + 1}`,
      title: "Unusual Profit Margin",
      description: `Your profit margin (${financialHealth.profitMargin}%) is outside the normal range, which could indicate data errors or exceptional circumstances.`,
      severity: "medium",
      type: "ratio-warning"
    });
  }
  
  // 7. Check if metrics across different periods are consistent
  // This assumes documents have period information (not shown in your schema)
  // This is a placeholder for a real implementation that would check for period-over-period consistency
  
  // 8. Check if accounts payable in balance sheet matches accounts payable report
  if (balanceSheets.length > 0 && accountsPayable.length > 0) {
    const balanceSheetAPMetric = getMetricFromDocuments(balanceSheets, "ACCOUNTS_PAYABLE");
    const apReportMetric = getMetricFromDocuments(accountsPayable, "TOTAL_PAYABLES");
    
    if (balanceSheetAPMetric && apReportMetric && 
        Math.abs(balanceSheetAPMetric.metricValue - apReportMetric.metricValue) > 0.01) {
      inconsistencies.push({
        id: `inconsistency-${inconsistencies.length + 1}`,
        title: "Accounts Payable Mismatch",
        description: "The Accounts Payable amount in the Balance Sheet doesn't match the total in the AP report.",
        severity: "medium",
        documentIds: [balanceSheets[0].id, accountsPayable[0].id],
        type: "document-mismatch"
      });
    }
  }

  return inconsistencies;
}

// Helper function to extract a specific metric from documents
function getMetricFromDocuments(documents: FinancialDocument[], metricName: string): FinancialMetric | null {
  for (const doc of documents) {
    if (doc.metrics && Array.isArray(doc.metrics)) {
      const metric = doc.metrics.find(m => m.metricName === metricName);
      if (metric) return metric;
    }
  }
  return null;
}