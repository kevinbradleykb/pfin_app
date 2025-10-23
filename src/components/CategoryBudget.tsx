import React, { useState } from 'react';
import { useBudget } from '../contexts/BudgetContext';
import { formatCurrency, getCategoryProgress } from '../utils/calculations';
import { Edit2, Plus } from 'lucide-react';

export const CategoryBudget: React.FC = () => {
  const { categories, budgetSummary, updateCategory, addCategory } = useBudget();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    budgetedAmount: '',
    color: '#3b82f6',
  });

  const expenseCategories = categories.filter(c => c.type === 'expense');

  const handleEdit = (categoryId: string, currentAmount: number) => {
    setEditingId(categoryId);
    setEditAmount(currentAmount.toString());
  };

  const handleSave = (categoryId: string) => {
    const amount = parseFloat(editAmount);
    if (!isNaN(amount) && amount >= 0) {
      updateCategory(categoryId, { budgetedAmount: amount });
    }
    setEditingId(null);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name && newCategory.budgetedAmount) {
      addCategory({
        name: newCategory.name,
        type: newCategory.type,
        budgetedAmount: parseFloat(newCategory.budgetedAmount),
        color: newCategory.color,
      });
      setNewCategory({
        name: '',
        type: 'expense',
        budgetedAmount: '',
        color: '#3b82f6',
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Budget Categories
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Assign your income to expense categories
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {showAddForm && (
        <div className="card bg-gray-50 dark:bg-gray-900">
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category name"
                value={newCategory.name}
                onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                className="input-field"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Budget amount"
                value={newCategory.budgetedAmount}
                onChange={e => setNewCategory({ ...newCategory, budgetedAmount: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="color"
                value={newCategory.color}
                onChange={e => setNewCategory({ ...newCategory, color: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <button type="submit" className="btn-primary flex-1">
                Add Category
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {expenseCategories.map(category => {
          const spent = budgetSummary.spentByCategory[category.id] || 0;
          const progress = getCategoryProgress(category.budgetedAmount, spent);

          return (
            <div key={category.id} className="card">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {editingId === category.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.01"
                          value={editAmount}
                          onChange={e => setEditAmount(e.target.value)}
                          className="w-32 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSave(category.id)}
                          className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Budgeted: {formatCurrency(category.budgetedAmount)}
                        </span>
                        <button
                          onClick={() => handleEdit(category.id, category.budgetedAmount)}
                          className="p-1 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Spent: {formatCurrency(spent)}
                    </span>
                    <span
                      className={`font-medium ${
                        progress.status === 'good'
                          ? 'text-green-600'
                          : progress.status === 'warning'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {formatCurrency(progress.remaining)} remaining
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        progress.status === 'good'
                          ? 'bg-green-500'
                          : progress.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{
                        width: `${Math.min(progress.percentage, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {progress.percentage.toFixed(1)}% of budget used
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
