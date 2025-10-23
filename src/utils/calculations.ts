import type { Transaction, BudgetSummary, Category } from '../types';
import { startOfMonth, endOfMonth, isWithinInterval, subDays } from 'date-fns';

export const calculateBudgetSummary = (
  transactions: Transaction[],
  categories: Category[],
  month: Date = new Date()
): BudgetSummary => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);

  const monthTransactions = transactions.filter(t =>
    !t.excludeFromBudget &&
    isWithinInterval(t.date, { start: monthStart, end: monthEnd })
  );

  const totalIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBudgeted = categories
    .filter(c => c.type === 'expense')
    .reduce((sum, c) => sum + c.budgetedAmount, 0);

  const spentByCategory: Record<string, number> = {};
  categories.forEach(category => {
    spentByCategory[category.id] = monthTransactions
      .filter(t => t.category === category.id)
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const remainingToBudget = totalIncome - totalBudgeted;
  const balance = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    totalBudgeted,
    remainingToBudget,
    spentByCategory,
    balance,
  };
};

export const getTransactionsByPeriod = (
  transactions: Transaction[],
  days: number
): Transaction[] => {
  const startDate = subDays(new Date(), days);
  return transactions.filter(t => t.date >= startDate);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getCategoryProgress = (
  budgeted: number,
  spent: number
): { percentage: number; remaining: number; status: 'good' | 'warning' | 'over' } => {
  const percentage = budgeted > 0 ? (spent / budgeted) * 100 : 0;
  const remaining = budgeted - spent;

  let status: 'good' | 'warning' | 'over' = 'good';
  if (percentage >= 100) status = 'over';
  else if (percentage >= 80) status = 'warning';

  return { percentage, remaining, status };
};
