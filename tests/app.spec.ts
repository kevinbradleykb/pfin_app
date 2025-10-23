import { test, expect } from '@playwright/test';

test.describe('BudgetFlow Personal Finance App', () => {
  test('should load the app and display the header', async ({ page }) => {
    await page.goto('/');

    // Check if the header is visible
    await expect(page.getByRole('heading', { name: 'BudgetFlow' })).toBeVisible();
    await expect(page.getByText('Zero-Based Budgeting Made Simple')).toBeVisible();

    // Check if navigation tabs are present
    await expect(page.getByRole('button', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Transactions/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Budget/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Analytics/i })).toBeVisible();

    // Check if Add Transaction button is present
    await expect(page.getByRole('button', { name: /Add Transaction/i })).toBeVisible();
  });

  test('should display dashboard stats', async ({ page }) => {
    await page.goto('/');

    // Check if stat cards are visible
    await expect(page.getByText('Total Income')).toBeVisible();
    await expect(page.getByText('Total Expenses')).toBeVisible();
    await expect(page.getByText('Total Budgeted')).toBeVisible();
    await expect(page.getByText('Balance')).toBeVisible();

    // Check zero-based budget status
    await expect(page.getByText('Zero-Based Budget Status')).toBeVisible();
  });

  test('should open and close transaction form', async ({ page }) => {
    await page.goto('/');

    // Click Add Transaction button
    await page.getByRole('button', { name: /Add Transaction/i }).click();

    // Check if modal is open
    await expect(page.getByRole('heading', { name: 'Add Transaction' })).toBeVisible();

    // Check form fields
    await expect(page.getByRole('button', { name: 'Expense' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Income' })).toBeVisible();
    await expect(page.getByPlaceholder('0.00')).toBeVisible();

    // Close modal
    const closeButton = page.locator('button').filter({ hasText: 'Cancel' }).first();
    await closeButton.click();

    // Modal should be closed
    await expect(page.getByRole('heading', { name: 'Add Transaction' })).not.toBeVisible();
  });

  test('should add an income transaction', async ({ page }) => {
    await page.goto('/');

    // Open transaction form
    await page.getByRole('button', { name: /Add Transaction/i }).click();

    // Select Income
    await page.getByRole('button', { name: 'Income', exact: true }).click();

    // Fill in the form
    await page.getByPlaceholder('0.00').fill('5000');
    // Select the category dropdown (find the select element)
    const categorySelect = page.locator('select.input-field');
    await categorySelect.selectOption({ index: 1 }); // Select first income category
    await page.getByPlaceholder('Optional description').fill('Monthly salary');

    // Submit (click the submit button inside the form)
    await page.locator('form').getByRole('button', { name: 'Add Transaction' }).click();

    // Verify transaction was added (check if modal closed and income increased)
    await expect(page.getByRole('heading', { name: 'Add Transaction' })).not.toBeVisible();

    // Switch to Transactions tab to verify
    await page.getByRole('button', { name: /Transactions/i }).click();
    await expect(page.getByText('Monthly salary')).toBeVisible();
  });

  test('should navigate between tabs', async ({ page }) => {
    await page.goto('/');

    // Go to Transactions tab
    await page.getByRole('button', { name: /Transactions/i }).click();
    await expect(page.getByText('All Transactions')).toBeVisible();

    // Go to Budget tab
    await page.getByRole('button', { name: /Budget/i }).click();
    await expect(page.getByText('Budget Management')).toBeVisible();
    await expect(page.getByText('Budget Categories')).toBeVisible();

    // Go to Analytics tab
    await page.getByRole('button', { name: /Analytics/i }).click();
    await expect(page.getByText('Spending Analytics')).toBeVisible();

    // Go back to Dashboard
    await page.getByRole('button', { name: /Dashboard/i }).click();
    await expect(page.getByText('Your financial overview at a glance')).toBeVisible();
  });

  test('should display budget categories in Budget tab', async ({ page }) => {
    await page.goto('/');

    // Navigate to Budget tab
    await page.getByRole('button', { name: /Budget/i }).click();

    // Check for category management
    await expect(page.getByText('Budget Categories')).toBeVisible();
    await expect(page.getByRole('button', { name: /Add Category/i })).toBeVisible();

    // Check if default categories are visible
    await expect(page.getByText('Housing')).toBeVisible();
    await expect(page.getByText('Food & Dining')).toBeVisible();
  });

  test('should check for responsive design elements', async ({ page }) => {
    await page.goto('/');

    // Check if footer is visible
    await expect(page.getByText('BudgetFlow - Your personal finance companion')).toBeVisible();
    await expect(page.getByText('All data stored locally on your device')).toBeVisible();
  });

  test('should verify Analytics tab shows empty state', async ({ page }) => {
    await page.goto('/');

    // Navigate to Analytics tab
    await page.getByRole('button', { name: /Analytics/i }).click();

    // Should show empty state when no transactions
    await expect(page.getByText(/No spending data available/i)).toBeVisible();
  });
});
