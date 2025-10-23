import React, { useMemo } from 'react';
import { useBudget } from '../contexts/BudgetContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '../utils/calculations';

export const SpendingChart: React.FC = () => {
  const { budgetSummary, categories } = useBudget();

  const chartData = useMemo(() => {
    return categories
      .filter(c => c.type === 'expense')
      .map(category => ({
        name: category.name,
        value: budgetSummary.spentByCategory[category.id] || 0,
        color: category.color,
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [budgetSummary, categories]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No spending data available. Add some expenses to see your spending breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Spending by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Category Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis tick={{ fill: '#9ca3af' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Top Spending Categories
        </h3>
        <div className="space-y-3">
          {chartData.slice(0, 5).map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-400">
                  #{index + 1}
                </span>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
