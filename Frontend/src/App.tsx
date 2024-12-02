import React from 'react';
import { Toaster } from 'react-hot-toast';
import { GraduationCap } from 'lucide-react';
import { useWeb3 } from './hooks/useWeb3';
import { ConnectWallet } from './components/ConnectWallet';
import { CertificateIssuer } from './components/CertificateIssuer';
import { CertificateVerifier } from './components/CertificateVerifier';

function App() {
  const { contract, account, isIssuer, connectWallet } = useWeb3();

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">Certificate System</h1>
            </div>
            <ConnectWallet onConnect={connectWallet} account={account} />
          </div>

          {account ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CertificateIssuer contract={contract} isIssuer={isIssuer} />
              <CertificateVerifier contract={contract} />
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl text-gray-600">
                Please connect your wallet to interact with the certificate system
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;