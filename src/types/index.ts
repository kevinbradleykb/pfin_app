export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date;
  isRecurring?: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  excludeFromBudget?: boolean;
  reviewed?: boolean;
  merchantName?: string;
  originalDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  budgetedAmount: number;
  color: string;
  icon?: string;
}

export interface Budget {
  id: string;
  month: string; // Format: YYYY-MM
  categories: Category[];
  totalIncome: number;
  totalExpenses: number;
  totalBudgeted: number;
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  totalBudgeted: number;
  remainingToBudget: number;
  spentByCategory: Record<string, number>;
  balance: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export type TimePeriod = '7days' | '30days' | 'month' | 'year' | 'custom';

export interface DateRange {
  start: Date;
  end: Date;
}
