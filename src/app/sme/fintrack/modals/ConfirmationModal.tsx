import React from 'react';
import { FinancialDocument } from '@/types/fintrack';
import { ShieldCheck } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  document: FinancialDocument | null;
  accessType: 'investors' | 'nova' | null;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, document, accessType }) => {
  if (!isOpen || !document || !accessType) return null;
  const entityName = accessType === 'investors' ? 'Investors' : 'NOVA X';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-semibold mb-3 text-blue-700 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-500" /> Confirm Access
        </h3>
        <p className="text-gray-700 mb-2">
          Grant <span className="font-semibold">{entityName}</span> access to:
          <br />
          <span className="text-blue-600 font-medium">"{document.name}"</span>?
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {accessType === 'investors'
            ? 'This allows potential investors to review this financial document.'
            : 'NOVA X will store this file securely under your blockchain profile.'}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;