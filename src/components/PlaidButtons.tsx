import React from 'react';
import { Download, Lock } from 'lucide-react';

export const PlaidButtons: React.FC = () => {
  const handleGetTransactions = () => {
    // TODO: Implement Plaid get transactions logic
    console.log('Get Transactions clicked');
  };

  const handleAuthenticatePlaid = () => {
    // TODO: Implement Plaid authentication logic
    console.log('Authenticate with Plaid clicked');
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleGetTransactions}
        className="btn-primary flex items-center gap-2"
      >
        <Download className="w-5 h-5" />
        Get Transactions
      </button>
      <button
        onClick={handleAuthenticatePlaid}
        className="btn-primary flex items-center gap-2"
      >
        <Lock className="w-5 h-5" />
        Authenticate with Plaid
      </button>
    </div>
  );
};
