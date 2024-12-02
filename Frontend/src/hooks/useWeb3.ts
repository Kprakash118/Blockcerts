import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, Contract, ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, CHAIN_CONFIG } from '../config/contract';

export function useWeb3() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState<string>('');
  const [isIssuer, setIsIssuer] = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      // Switch to Linea Sepolia network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CHAIN_CONFIG.chainId }],
        });
      } catch (switchError: any) {
        // If the chain hasn't been added to MetaMask
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [CHAIN_CONFIG],
          });
        } else {
          throw switchError;
        }
      }

      const web3Provider = new BrowserProvider(window.ethereum);
      setProvider(web3Provider);

      const signer = await web3Provider.getSigner();
      const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contractInstance);

      // Check if connected account is an issuer
      const issuerStatus = await contractInstance.isIssuers(accounts[0]);
      setIsIssuer(issuerStatus);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      setAccount(accounts[0] || '');
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return {
    provider,
    contract,
    account,
    isIssuer,
    connectWallet
  };
}