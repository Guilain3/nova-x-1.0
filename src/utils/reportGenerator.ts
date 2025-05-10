// Improved credit score report generator without problematic donut chart
import { FinancialDocument, FinancialHealthDashboard, CreditScore } from '@/types/types';
import { Inconsistency } from '@/utils/financialInconsistencyDetector';
import { format } from 'date-fns';

export function generateCreditScoreReport(
  creditScore: CreditScore | null,
  financialHealth: FinancialHealthDashboard | null,
  documents: FinancialDocument[],
  inconsistencies: Inconsistency[]
): string {
  if (!creditScore) return '';
  
  const today = format(new Date(), 'MMMM dd, yyyy');
  const scoreCategory = getScoreCategory(creditScore.score);
  
  // Generate document summary - simplified
  const documentSummary = documents.length > 0 
    ? `Based on ${documents.length} financial document${documents.length > 1 ? 's' : ''} uploaded between ${format(new Date(documents[documents.length-1].uploadDate), 'MMM dd, yyyy')} and ${format(new Date(documents[0].uploadDate), 'MMM dd, yyyy')}.`
    : 'No documents have been uploaded yet.';
  
  // Determine score trend icon and text
  const scoreTrend = creditScore.scoreDifference 
    ? creditScore.scoreDifference > 0 
      ? `<span class="trend positive">▲ +${Math.abs(creditScore.scoreDifference)}</span>`
      : `<span class="trend negative">▼ -${Math.abs(creditScore.scoreDifference)}</span>`
    : '';
  
  // Calculate score percentage (assuming 850 max score)
  const scorePercentage = Math.min(100, Math.round((creditScore.score / 850) * 100));
  
  // Generate mini-insights for quick view
  const miniInsights = generateMiniInsights(financialHealth);
  
  // Generate top 2-3 recommendations (shortened)
  const shortRecommendations = generateShortRecommendations(creditScore, financialHealth);
  
  // Assemble the compact report
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Credit Score Report - ${today}</title>
      <style>
        /* Base styles */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.4;
          color: #333;
          background: white;
          font-size: 13px;
          margin: 0;
          padding: 0;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        /* Report container */
        .report-container {
          max-width: 500px;
          margin: 0 auto;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        /* Header */
        .report-header {
          background: #0066CC;
          color: white;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .report-header h1 {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }
        
        .report-date {
          font-size: 13px;
          opacity: 0.9;
        }
        
        .logo {
          height: 28px;
          width: 28px;
        }
        
        /* Body */
        .report-body {
          padding: 16px;
        }
        
        /* Score section */
        .score-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .score-info {
          display: flex;
          flex-direction: column;
        }
        
        .score {
          font-size: 48px;
          font-weight: bold;
          color: ${getScoreColor(creditScore.score)};
          line-height: 1;
        }
        
        .score-category {
          font-size: 16px;
          color: ${getScoreColor(creditScore.score)};
          margin-top: 4px;
          font-weight: 500;
        }
        
        .trend {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-top: 4px;
        }
        
        .trend.positive {color: #22C55E;}
        .trend.negative {color: #EF4444;}
        
        /* Score meter  */
        .score-meter-container {
          width: 140px;
          margin-top: 4px;
          margin-bottom: 24px; /* Extra space for the pointer marker */
          position: relative;
        }
        
        .score-meter {
          width: 140px;
          height: 16px;
          background-color: #f5f5f5;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          position: relative;
        }
        
        .score-meter-bar {
          height: 16px;
          background: linear-gradient(to right, #EF4444, #FACC15, #22C55E);
          width: ${scorePercentage}%;
          border-radius: 8px;
        }
        
        /* Arrow pointer that appears at the current percentage position */
        .score-meter-pointer {
          position: absolute;
          left: ${scorePercentage}%;
          top: 20px; /* Position it below the meter */
          transform: translateX(-50%); /* Center it at the percentage point */
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-top: 8px solid #333; /* Arrow pointing down from the bar */
        }
        
        /* Percentage text below the pointer */
        .score-meter-text {
          position: absolute;
          left: ${scorePercentage}%;
          top: 28px; /* Position it below the pointer */
          transform: translateX(-50%); /* Center it */
          font-weight: bold;
          font-size: 12px;
          color: #333;
          white-space: nowrap;
        }
        
        /* Scale labels */
        .score-meter-scale {
          display: flex;
          justify-content: space-between;
          width: 140px;
          padding: 0;
          font-size: 10px;
          color: #666;
          margin-top: 24px; /* Space for the pointer and percentage */
        }
        
        /* Summary */
        .summary {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 4px;
          font-size: 14px;
          margin-bottom: 16px;
        }
        
        /* Insights grid */
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .insight-card {
          background: #f9f9f9;
          border-radius: 4px;
          padding: 12px;
          font-size: 14px;
          border-left: 3px solid #0066CC;
        }
        
        .insight-card h3 {
          font-size: 14px;
          margin-bottom: 4px;
          font-weight: 600;
        }
        
        .insight-card p {
          margin: 0;
        }
        
        .insight-value {
          font-weight: 600;
        }
        
        /* Status chips */
        .status-chip {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 500;
          margin-left: 4px;
        }
        
        .status-healthy {
          background: rgba(34, 197, 94, 0.1);
          color: #22C55E;
        }
        
        .status-caution {
          background: rgba(250, 204, 21, 0.1);
          color: #FACC15;
        }
        
        .status-concern {
          background: rgba(239, 68, 68, 0.1);
          color: #EF4444;
        }
        
        /* Section titles */
        .section-title {
          font-size: 16px;
          color: #0066CC;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        /* Recommendations */
        .recommendations {
          background: rgba(59, 130, 246, 0.05);
          border-radius: 4px;
          padding: 12px;
        }
        
        .recommendation {
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px dashed rgba(0,0,0,0.1);
        }
        
        .recommendation:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .recommendation h3 {
          font-size: 14px;
          margin-bottom: 4px;
          font-weight: 600;
        }
        
        /* Footer */
        .report-footer {
          text-align: center;
          font-size: 11px;
          color: #888;
          padding-top: 12px;
          margin-top: 16px;
          border-top: 1px solid #e0e0e0;
        }
      </style>
    </head>
    <body>
      <div class="report-container">
        <div class="report-header">
          <div>
            <h1>Credit Score Report</h1>
            <div class="report-date">${today}</div>
          </div>
          <div class="logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="white"/>
              <path d="M4 8V16L12 20V12L4 8Z" fill="white"/>
              <path d="M12 12V20L20 16V8L12 12Z" fill="white"/>
            </svg>
          </div>
        </div>
        
        <div class="report-body">
          <div class="score-section">
            <div class="score-info">
              <div class="score">${creditScore.score}</div>
              <div class="score-category">${scoreCategory}</div>
              ${scoreTrend}
            </div>
            
            <div class="score-meter-container">
              <div class="score-meter">
                <div class="score-meter-bar"></div>
              </div>
              <!-- Pointer that marks the exact position -->
              <div class="score-meter-pointer"></div>
              <!-- Text showing the percentage -->
              <div class="score-meter-text">${scorePercentage}%</div>
              <!-- Scale markers -->
              <div class="score-meter-scale">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Exc</span>
              </div>
            </div>
          </div>
          
          <div class="summary">
            ${documentSummary}
          </div>
          
          <div class="insights-grid">
            ${miniInsights}
          </div>
          
          <div class="section-title">Key Recommendations</div>
          <div class="recommendations">
            ${shortRecommendations}
          </div>
        </div>
        
        <div class="report-footer">
          <p>© ${new Date().getFullYear()} FinTrack. This report is for informational purposes only.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getScoreCategory(score: number): string {
  if (score >= 800) return 'Excellent';
  if (score >= 700) return 'Very Good';
  if (score >= 650) return 'Good';
  if (score >= 550) return 'Fair';
  return 'Poor';
}

function getScoreColor(score: number): string {
  if (score >= 800) return '#22C55E'; // Green
  if (score >= 700) return '#3B82F6'; // Blue
  if (score >= 650) return '#FACC15'; // Yellow
  if (score >= 550) return '#F97316'; // Orange
  return '#EF4444'; // Red
}

function generateMiniInsights(financialHealth: FinancialHealthDashboard | null): string {
  if (!financialHealth) return '<div class="insight-card"><h3>No Data</h3><p>Financial health data not available</p></div>';
  
  // Only display the most important metrics
  return `
    <div class="insight-card">
      <h3>Profit Margin</h3>
      <p>
        <span class="insight-value">${financialHealth.profitMargin || 0}%</span>
        ${getStatusChip(financialHealth.profitMargin || 0, 15)}
      </p>
    </div>
    
    <div class="insight-card">
      <h3>Current Ratio</h3>
      <p>
        <span class="insight-value">${financialHealth.currentRatio || 0}</span>
        ${getRatioStatusChip(financialHealth.currentRatio || 0, 1.5, 1)}
      </p>
    </div>
    
    <div class="insight-card">
      <h3>Debt-to-Equity</h3>
      <p>
        <span class="insight-value">${financialHealth.debtToEquityRatio || 0}</span>
        ${getDebtEquityStatusChip(financialHealth.debtToEquityRatio || 0)}
      </p>
    </div>
    
    <div class="insight-card">
      <h3>Overall Health</h3>
      <p>
        <span class="insight-value">${financialHealth.overallHealth}%</span>
        ${getStatusChip(financialHealth.overallHealth, 80)}
      </p>
    </div>
  `;
}

function getStatusChip(value: number, threshold: number): string {
  if (value >= threshold) return '<span class="status-chip status-healthy">Good</span>';
  if (value >= threshold * 0.7) return '<span class="status-chip status-caution">Fair</span>';
  return '<span class="status-chip status-concern">Low</span>';
}

function getRatioStatusChip(value: number, good: number, warning: number): string {
  if (value >= good) return '<span class="status-chip status-healthy">Good</span>';
  if (value >= warning) return '<span class="status-chip status-caution">Fair</span>';
  return '<span class="status-chip status-concern">Low</span>';
}

function getDebtEquityStatusChip(value: number): string {
  if (value <= 0.5) return '<span class="status-chip status-healthy">Low</span>';
  if (value <= 1.5) return '<span class="status-chip status-caution">Med</span>';
  return '<span class="status-chip status-concern">High</span>';
}

function generateShortRecommendations(creditScore: CreditScore, financialHealth: FinancialHealthDashboard | null): string {
  let recommendations = '';
  let count = 0;
  
  // Limit to 3 most important recommendations
  if (financialHealth && (financialHealth.debtToEquityRatio || 0) > 1 && count < 3) {
    count++;
    recommendations += `
      <div class="recommendation">
        <h3>Reduce Debt Load</h3>
        <p>Your debt-to-equity ratio of ${financialHealth.debtToEquityRatio} is high. Consider debt reduction strategies.</p>
      </div>
    `;
  }
  
  if (financialHealth && (financialHealth.currentRatio || 0) < 1.5 && count < 3) {
    count++;
    recommendations += `
      <div class="recommendation">
        <h3>Improve Liquidity</h3>
        <p>Build up cash reserves to boost your current ratio of ${financialHealth.currentRatio}.</p>
      </div>
    `;
  }
  
  if (financialHealth && (financialHealth.profitMargin || 0) < 15 && count < 3) {
    count++;
    recommendations += `
      <div class="recommendation">
        <h3>Increase Margin</h3>
        <p>Your profit margin (${financialHealth.profitMargin}%) can be improved through pricing or cost strategies.</p>
      </div>
    `;
  }
  
  if (creditScore.score < 650 && count < 3) {
    count++;
    recommendations += `
      <div class="recommendation">
        <h3>Boost Credit Score</h3>
        <p>Address outstanding liabilities and maintain consistent repayment schedules.</p>
      </div>
    `;
  }
  
  if (count === 0) {
    recommendations += `
      <div class="recommendation">
        <h3>Continue Good Practices</h3>
        <p>Your financial metrics look healthy. Maintain your current financial management.</p>
      </div>
    `;
  }
  
  return recommendations;
}