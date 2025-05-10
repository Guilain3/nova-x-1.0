import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { SME } from '../../mockdata/SmeInfo';

interface ContactModalProps {
  sme: SME;
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ sme, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Contact {sme.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaEnvelope className="text-blue-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a 
                  href={`mailto:${sme.contactInfo.email}`} 
                  className="text-blue-600 hover:underline"
                >
                  {sme.contactInfo.email}
                </a>
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaPhone className="text-green-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a 
                  href={`tel:${sme.contactInfo.phone}`} 
                  className="text-gray-900 hover:text-blue-600"
                >
                  {sme.contactInfo.phone}
                </a>
              </div>
            </div>
            
            {/* Website (if available) */}
            {sme.contactInfo.website && (
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaGlobe className="text-purple-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a 
                    href={`https://${sme.contactInfo.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {sme.contactInfo.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;