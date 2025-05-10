import React, { useEffect } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentName: string;
  action: 'share' | 'delete';
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, onConfirm, documentName, action }) => {
  if (!isOpen) return null;

  const isDelete = action === 'delete';
  const icon = isDelete ? <AlertTriangle className="text-red-600" /> : <ShieldCheck className="text-blue-600" />;
  const title = isDelete ? 'Delete File' : 'Share File';
  const description = isDelete
    ? `Are you sure you want to delete "${documentName}"? This action cannot be undone.`
    : `Are you sure you want to share "${documentName}" with investors? You can revoke access later.`;

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <div className="flex items-center gap-2 mb-3 text-lg font-semibold text-gray-800" id="modal-title">
          {icon} {title}
        </div>
        <p className="text-gray-600 text-sm mb-4" id="modal-description">
          {description}
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-white ${
              isDelete ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            } focus:outline-none focus:ring-2`}
          >
            {isDelete ? 'Delete' : 'Yes, Share'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;