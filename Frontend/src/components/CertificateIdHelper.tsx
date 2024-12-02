import React from 'react';
import { HelpCircle, ExternalLink } from 'lucide-react';

export function CertificateIdHelper() {
  return (
    <div className="bg-blue-50 p-4 rounded-md mb-4">
      <div className="flex items-start">
        <HelpCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
        <div>
          <h4 className="text-sm font-medium text-blue-800 mb-1">How to find a Certificate ID?</h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>1. Certificate IDs are generated when certificates are issued</li>
            <li>2. You can find them in two ways:</li>
            <li className="ml-4">
              a. Check the transaction receipt after issuing a certificate
            </li>
            <li className="ml-4">
              b. View the CertificateIssued event logs on{' '}
              <a 
                href="https://sepolia.lineascan.build/address/0x4CB974B10696773C2925cF0bBBc327c5F3B42355#events" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Linea Scan
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
            <li>3. Certificate IDs start from 1 and increment by 1 for each new certificate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}