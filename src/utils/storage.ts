import type { Transaction, Category, Budget } from '../types';

const STORAGE_KEYS = {
  TRANSACTIONS: 'pfin_transactions',
  CATEGORIES: 'pfin_categories',
  BUDGETS: 'pfin_budgets',
} as const;

// Transaction Storage
export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
};

export const loadTransactions = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  if (!data) return [];

  const transactions = JSON.parse(data);
  return transactions.map((t: any) => ({
    ...t,
    date: new Date(t.date),
  }));
};

// Category Storage
export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

export const loadCategories = (): Category[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : getDefaultCategories();
};

// Budget Storage
export const saveBudgets = (budgets: Budget[]): void => {
  localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
};

export const loadBudgets = (): Budget[] => {
  const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
  return data ? JSON.parse(data) : [];
};

// Default Categories
const getDefaultCategories = (): Category[] => [
  { id: '1', name: 'Salary', type: 'income', budgetedAmount: 0, color: '#10b981' },
  { id: '2', name: 'Freelance', type: 'income', budgetedAmount: 0, color: '#34d399' },
  { id: '3', name: 'Housing', type: 'expense', budgetedAmount: 0, color: '#ef4444' },
  { id: '4', name: 'Food & Dining', type: 'expense', budgetedAmount: 0, color: '#f59e0b' },
  { id: '5', name: 'Transportation', type: 'expense', budgetedAmount: 0, color: '#3b82f6' },
  { id: '6', name: 'Utilities', type: 'expense', budgetedAmount: 0, color: '#8b5cf6' },
  { id: '7', name: 'Entertainment', type: 'expense', budgetedAmount: 0, color: '#ec4899' },
  { id: '8', name: 'Healthcare', type: 'expense', budgetedAmount: 0, color: '#14b8a6' },
  { id: '9', name: 'Shopping', type: 'expense', budgetedAmount: 0, color: '#f97316' },
  { id: '10', name: 'Savings', type: 'expense', budgetedAmount: 0, color: '#06b6d4' },
];

// Clear all data (useful for development/testing)
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
};
