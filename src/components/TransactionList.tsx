import React, { useState, useMemo } from 'react';
import { useBudget } from '../contexts/BudgetContext';
import { formatCurrency } from '../utils/calculations';
import { format } from 'date-fns';
import { Trash2, Filter, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export const TransactionList: React.FC = () => {
  const { transactions, categories, deleteTransaction } = useBudget();
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    if (filter !== 'all') {
      filtered = filtered.filter(t => t.type === filter);
    }

    return [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return b.date.getTime() - a.date.getTime();
      } else {
        return b.amount - a.amount;
      }
    });
  }, [transactions, filter, sortBy]);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || '#6b7280';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Recent Transactions
        </h3>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {filteredAndSortedTransactions.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No transactions yet. Add your first transaction to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAndSortedTransactions.map(transaction => (
            <div
              key={transaction.id}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${getCategoryColor(transaction.category)}20`,
                    }}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowUpCircle
                        className="w-5 h-5"
                        style={{ color: getCategoryColor(transaction.category) }}
                      />
                    ) : (
                      <ArrowDownCircle
                        className="w-5 h-5"
                        style={{ color: getCategoryColor(transaction.category) }}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {getCategoryName(transaction.category)}
                      </p>
                      {transaction.isRecurring && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                          Recurring
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {transaction.description || 'No description'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {format(transaction.date, 'MMM dd, yyyy')}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Delete transaction"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
