# BudgetFlow - Personal Finance App

A modern personal finance application built with React, TypeScript, and Tailwind CSS. Inspired by zero-based budgeting principles to help you take control of your finances.

## Features

### Zero-Based Budgeting
- Assign every dollar of income to expense categories
- Visual indicators showing when you've achieved zero-based budget
- Track remaining funds that need to be budgeted

### Transaction Management
- Add income and expenses with detailed categorization
- Support for recurring transactions (daily, weekly, monthly, yearly)
- Quick transaction entry with date tracking
- Filter and sort transactions by type, date, or amount
- Delete transactions with one click

### Budget Categories
- Pre-configured expense categories (Housing, Food, Transportation, etc.)
- Custom category creation with color coding
- Real-time budget vs. actual spending tracking
- Visual progress bars showing budget utilization
- Color-coded alerts (green/yellow/red) for spending status

### Analytics & Visualizations
- **Pie Chart**: Visual breakdown of spending by category
- **Bar Chart**: Category comparison for easy analysis
- **Top 5 Categories**: Quick view of highest spending areas
- Real-time calculations of totals and balances

### Dashboard
- Overview of total income, expenses, and balance
- Budget status at a glance
- Quick access to recent transactions
- Category budget summary

### Privacy-Focused
- All data stored locally in your browser (LocalStorage)
- No server-side data collection
- Your financial data never leaves your device

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Beautiful icon set
- **date-fns** - Date manipulation utilities

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## Usage Guide

### 1. Add Income
- Click "Add Transaction" button
- Select "Income" type
- Enter amount and choose income category (Salary, Freelance, etc.)
- Set the date and add description (optional)
- Submit to add the transaction

### 2. Create Budget
- Go to the "Budget" tab
- Set budgeted amounts for each expense category
- Watch the zero-based budget indicator
- Aim to assign all income to categories (remaining = $0)

### 3. Track Expenses
- Add expense transactions throughout the month
- View real-time progress against your budget
- Monitor category spending with visual progress bars

### 4. Analyze Spending
- Visit the "Analytics" tab
- Review pie chart for spending distribution
- Check bar chart for category comparisons
- Identify top spending categories

### 5. Add Custom Categories
- In the Budget tab, click "Add Category"
- Enter category name and budget amount
- Choose a color for visual identification
- Save to create your custom category

## Project Structure

```
src/
├── components/         # React components
│   ├── Dashboard.tsx          # Main dashboard view
│   ├── TransactionForm.tsx    # Add transaction modal
│   ├── TransactionList.tsx    # Transaction history
│   ├── CategoryBudget.tsx     # Budget management
│   └── SpendingChart.tsx      # Analytics charts
├── contexts/          # React Context for state management
│   └── BudgetContext.tsx      # Global budget state
├── types/             # TypeScript type definitions
│   └── index.ts               # All app types
├── utils/             # Utility functions
│   ├── calculations.ts        # Budget calculations
│   └── storage.ts             # LocalStorage helpers
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## Features in Detail

### Zero-Based Budgeting
This app implements the zero-based budgeting methodology where:
- Every dollar of income is assigned to a specific expense category
- Income - Budgeted Amount = 0 (ideally)
- Helps prevent overspending and ensures intentional money management

### Data Persistence
All data is stored in browser LocalStorage:
- Transactions are saved automatically
- Categories and budgets persist across sessions
- No account required, no data sent to servers
- Clear browser data to reset the app

### Responsive Design
- Mobile-friendly interface
- Tablet and desktop optimized layouts
- Dark mode support (follows system preferences)
- Accessible color contrasts

## Customization

### Adding New Categories
Default categories are defined in `src/utils/storage.ts`. You can modify the `getDefaultCategories` function to customize initial categories.

### Changing Colors
The color scheme is defined in `tailwind.config.js`. Modify the primary color palette to match your preferences.

### Currency Format
Currency formatting is handled in `src/utils/calculations.ts`. Change the locale and currency code to match your region.

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with LocalStorage support

## Contributing

This is a personal project, but feel free to fork and customize for your own needs!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Inspired by BudgetFlow and similar zero-based budgeting apps
- Built with modern web technologies for optimal performance
- Designed with privacy and user control in mind
