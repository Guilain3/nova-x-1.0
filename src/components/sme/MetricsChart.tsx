// Enhanced MetricsChart.tsx
import React from 'react';
import { FileQuestion, TrendingUp, Percent, Banknote, BarChart3, LineChart } from 'lucide-react';
import { FinancialHealthDashboard } from '@/types/fintrack';

interface MetricsChartProps {
  documentsPresent: boolean;
  progress: number;
  financialHealth: FinancialHealthDashboard | null;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ documentsPresent, progress, financialHealth }) => {
  if (!documentsPresent) {
    return (
      <div className="text-center py-6 bg-white p-6 rounded-2xl shadow">
        <div className="bg-blue-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
          <FileQuestion className="h-10 w-10 text-blue-600" />
        </div>
        <p className="text-gray-600 font-medium mb-1 text-lg">No financial data available</p>
        <p className="text-sm text-gray-500 max-w-xs mx-auto">
          Upload your financial documents to see detailed metrics and insights about your financial health.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-4 text-blue-800">Financial Metrics Overview</h2>
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#2563EB" strokeWidth="10" strokeDasharray={`${progress * 2.82} 282.7`} />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold text-blue-700">{progress}%</div>
          <div className="text-sm text-gray-500">Processed</div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Metric icon={<TrendingUp className="text-blue-600 w-4 h-4" />} label="Revenue Growth" value={`${financialHealth?.revenueGrowth || 0}%`} />
        <Metric icon={<Percent className="text-purple-600 w-4 h-4" />} label="Profit Margin" value={`${financialHealth?.profitMargin || 0}%`} />
        <Metric icon={<Banknote className="text-orange-500 w-4 h-4" />} label="Operating Profit" value={`${financialHealth?.operatingProfit?.toLocaleString() || 0} RWF`} />
        <Metric icon={<BarChart3 className="text-red-500 w-4 h-4" />} label="Net Profit Margin" value={`${financialHealth?.netProfitMargin || 0}%`} />
        <Metric icon={<LineChart className="text-blue-500 w-4 h-4" />} label="EBITDA" value={`${financialHealth?.ebitda?.toLocaleString() || 0} RWF`} />
      </div>
    </div>
  );
};

const Metric = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 text-sm text-gray-700">
    <div className="bg-gray-100 rounded-full p-1">{icon}</div>
    <div className="font-medium">{label}:</div>
    <div className="ml-auto font-semibold text-blue-800">{value}</div>
  </div>
);

export default MetricsChart;
