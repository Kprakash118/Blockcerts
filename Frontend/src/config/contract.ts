export const CONTRACT_ADDRESS = '0x4CB974B10696773C2925cF0bBBc327c5F3B42355';
export const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "address","name": "_issuer","type": "address"}],
    "name": "addIssuer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "address","name": "recipient","type": "address"},
      {"indexed": false,"internalType": "string","name": "courseName","type": "string"},
      {"indexed": false,"internalType": "uint256","name": "certificateId","type": "uint256"}
    ],
    "name": "CertificateIssued",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "address","name": "_recipient","type": "address"},
      {"internalType": "string","name": "_courseName","type": "string"}
    ],
    "name": "issueCertificate",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_certificateId","type": "uint256"}],
    "name": "revokeCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_certificateId","type": "uint256"}],
    "name": "verifyCertificate",
    "outputs": [
      {"internalType": "bool","name": "exists","type": "bool"},
      {"internalType": "bool","name": "isValid","type": "bool"},
      {"internalType": "address","name": "recipient","type": "address"},
      {"internalType": "string","name": "courseName","type": "string"},
      {"internalType": "uint256","name": "issuanceDate","type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "","type": "address"}],
    "name": "isIssuers",
    "outputs": [{"internalType": "bool","name": "","type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const CHAIN_CONFIG = {
  chainId: '0xe705',  // 59141 in hex
  chainName: 'Linea Sepolia',
  rpcUrls: ['https://linea-sepolia.infura.io'],
  blockExplorerUrls: ['https://sepolia.lineascan.build'],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  }
};