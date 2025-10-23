import React from 'react';
import { useBudget } from '../contexts/BudgetContext';
import { formatCurrency } from '../utils/calculations';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { budgetSummary } = useBudget();

  const stats = [
    {
      label: 'Total Income',
      value: budgetSummary.totalIncome,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Total Expenses',
      value: budgetSummary.totalExpenses,
      icon: TrendingDown,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Total Budgeted',
      value: budgetSummary.totalBudgeted,
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Balance',
      value: budgetSummary.balance,
      icon: Wallet,
      color: budgetSummary.balance >= 0 ? 'text-green-600' : 'text-red-600',
      bg: budgetSummary.balance >= 0 ? 'bg-green-50' : 'bg-red-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your financial overview at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {formatCurrency(stat.value)}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Zero-Based Budget Alert */}
      <div
        className={`card ${
          budgetSummary.remainingToBudget === 0
            ? 'border-2 border-green-500'
            : 'border-2 border-yellow-500'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Zero-Based Budget Status
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {budgetSummary.remainingToBudget === 0
                ? 'Perfect! Every dollar has a job.'
                : 'You have money that needs to be assigned to categories.'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remaining to Budget
            </p>
            <p
              className={`text-2xl font-bold ${
                budgetSummary.remainingToBudget === 0
                  ? 'text-green-600'
                  : 'text-yellow-600'
              }`}
            >
              {formatCurrency(budgetSummary.remainingToBudget)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
