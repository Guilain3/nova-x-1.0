import { FC } from 'react';
import { X, Key } from 'lucide-react';

interface AccessModalProps {
  document: { documentType: string };
  onClose: () => void;
  onAccessGrant: (accessType: 'investors' | 'nova') => void;
  onAccessDeny: () => void;
}

const AccessModal: FC<AccessModalProps> = ({ document, onClose, onAccessGrant, onAccessDeny }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
            Give access to the {document.documentType.replace('_', ' ').toLowerCase()}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 border border-gray-100"
            onClick={() => onAccessGrant('investors')}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Investors</p>
                <p className="text-sm text-gray-500">Grant access to investors</p>
              </div>
            </div>
            <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-200">
              ➝
            </div>
          </div>
          <div
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 border border-gray-100"
            onClick={() => onAccessGrant('nova')}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="font-bold text-blue-800">NOVA</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">NOVA X</p>
                <p className="text-sm text-gray-500">Blockchain digital identity</p>
              </div>
            </div>
            <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-200">
              ➝
            </div>
          </div>
        </div>
        <button
          onClick={onAccessDeny}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
        >
          Deny Access
        </button>
      </div>
    </div>
  );
};

export default AccessModal;