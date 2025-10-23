import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Transaction, Category, BudgetSummary } from '../types';
import {
  saveTransactions,
  loadTransactions,
  saveCategories,
  loadCategories,
} from '../utils/storage';
import { calculateBudgetSummary } from '../utils/calculations';

interface BudgetContextType {
  transactions: Transaction[];
  categories: Category[];
  budgetSummary: BudgetSummary;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    totalBudgeted: 0,
    remainingToBudget: 0,
    spentByCategory: {},
    balance: 0,
  });

  // Load data on mount
  useEffect(() => {
    const loadedTransactions = loadTransactions();
    const loadedCategories = loadCategories();
    setTransactions(loadedTransactions);
    setCategories(loadedCategories);
  }, []);

  // Recalculate budget summary when data changes
  useEffect(() => {
    const summary = calculateBudgetSummary(transactions, categories, currentMonth);
    setBudgetSummary(summary);
  }, [transactions, categories, currentMonth]);

  // Save transactions when they change
  useEffect(() => {
    if (transactions.length > 0 || localStorage.getItem('pfin_transactions')) {
      saveTransactions(transactions);
    }
  }, [transactions]);

  // Save categories when they change
  useEffect(() => {
    if (categories.length > 0) {
      saveCategories(categories);
    }
  }, [categories]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        categories,
        budgetSummary,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        addCategory,
        updateCategory,
        deleteCategory,
        currentMonth,
        setCurrentMonth,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
