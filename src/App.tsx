import React, { useState } from 'react';
import { BudgetProvider } from './contexts/BudgetContext';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { CategoryBudget } from './components/CategoryBudget';
import { SpendingChart } from './components/SpendingChart';
import { Wallet, LayoutDashboard, PieChart, List, Settings } from 'lucide-react';

type Tab = 'dashboard' | 'transactions' | 'budget' | 'analytics';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions' as Tab, label: 'Transactions', icon: List },
    { id: 'budget' as Tab, label: 'Budget', icon: Wallet },
    { id: 'analytics' as Tab, label: 'Analytics', icon: PieChart },
  ];

  return (
    <BudgetProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    BudgetFlow
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Zero-Based Budgeting Made Simple
                  </p>
                </div>
              </div>
              <TransactionForm />
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <Dashboard />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TransactionList />
                <CategoryBudget />
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  All Transactions
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  View and manage all your income and expenses
                </p>
              </div>
              <TransactionList />
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Budget Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Assign every dollar to a category for zero-based budgeting
                </p>
              </div>
              <CategoryBudget />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Spending Analytics
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Visualize your spending patterns and trends
                </p>
              </div>
              <SpendingChart />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              BudgetFlow - Your personal finance companion. All data stored locally on your device.
            </p>
          </div>
        </footer>
      </div>
    </BudgetProvider>
  );
}

export default App;
