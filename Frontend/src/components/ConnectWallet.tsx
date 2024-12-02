import React from 'react';
import { Wallet } from 'lucide-react';

interface Props {
  onConnect: () => Promise<void>;
  account: string;
}

export function ConnectWallet({ onConnect, account }: Props) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      {account ? (
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-green-500" />
          <span className="text-sm">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        </div>
      ) : (
        <button
          onClick={onConnect}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </button>
      )}
    </div>
  );
}