import React, { useState } from 'react';
import { Contract } from 'ethers';
import { Award } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  contract: Contract | null;
  isIssuer: boolean;
}

export function CertificateIssuer({ contract, isIssuer }: Props) {
  const [recipient, setRecipient] = useState('');
  const [courseName, setCourseName] = useState('');
  const [issuedCertificateId, setIssuedCertificateId] = useState<string | null>(null);

  const issueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !isIssuer) return;

    try {
      const tx = await contract.issueCertificate(recipient, courseName);
      
      toast.promise(tx.wait(), {
        loading: 'Issuing certificate...',
        success: 'Certificate issued successfully!',
        error: 'Error issuing certificate'
      });

      const receipt = await tx.wait();
      const event = receipt.logs[0];
      const certificateId = event.args[2];
      setIssuedCertificateId(certificateId.toString());

      setRecipient('');
      setCourseName('');
    } catch (error) {
      toast.error('Error issuing certificate');
      console.error(error);
    }
  };

  if (!isIssuer) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-700">You need to be an authorized issuer to issue certificates.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Issue Certificate</h2>
      
      <form onSubmit={issueCertificate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="0x..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter course name"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Award className="h-4 w-4 mr-2" />
          Issue Certificate
        </button>
      </form>

      {issuedCertificateId && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <h3 className="text-sm font-medium text-green-800">Certificate Issued Successfully!</h3>
          <p className="mt-1 text-sm text-green-700">
            Certificate ID: {issuedCertificateId}
          </p>
          <p className="mt-2 text-xs text-green-600">
            Save this ID for future reference. It can be used to verify the certificate.
          </p>
        </div>
      )}
    </div>
  );
}