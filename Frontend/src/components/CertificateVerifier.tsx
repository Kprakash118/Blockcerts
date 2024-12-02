import React, { useState } from 'react';
import { Contract } from 'ethers';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { CertificateIdHelper } from './CertificateIdHelper';

interface Props {
  contract: Contract | null;
}

export function CertificateVerifier({ contract }: Props) {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState<any>(null);

  const verifyCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract) return;

    try {
      const result = await contract.verifyCertificate(certificateId);
      setCertificate({
        exists: result[0],
        isValid: result[1],
        recipient: result[2],
        courseName: result[3],
        issuanceDate: new Date(Number(result[4]) * 1000).toLocaleDateString()
      });
    } catch (error) {
      toast.error('Error verifying certificate');
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Verify Certificate</h2>
      
      <CertificateIdHelper />
      
      <form onSubmit={verifyCertificate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Certificate ID</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              min="1"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter certificate ID (e.g., 1)"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Search className="h-4 w-4 mr-2" />
          Verify Certificate
        </button>
      </form>

      {certificate && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-2">Certificate Details</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1">
                {certificate.exists && certificate.isValid ? (
                  <span className="px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full">Valid</span>
                ) : (
                  <span className="px-2 py-1 text-sm text-red-800 bg-red-100 rounded-full">Invalid</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Recipient</dt>
              <dd className="mt-1 text-sm text-gray-900">{certificate.recipient}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Course Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{certificate.courseName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Issuance Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{certificate.issuanceDate}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}