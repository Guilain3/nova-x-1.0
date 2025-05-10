'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { mockData } from '@/lib/support/mockData';

const SupportTab = () => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    try {
      // In a real app, you would use fetch or axios to send the message
      // await fetch('/api/support/message', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message })
      // });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show confirmation and close modal
      setShowConfirmation(true);
      setShowMessageModal(false);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      {/* Contact options grid */}
      <div className="grid grid-cols-2 gap-20 max-w-lg">
        {mockData.support.contactOptions.map(option => (
          <div 
            key={option.id} 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => option.icon === 'Message' && setShowMessageModal(true)}
          >
            <div className="w-16 h-16 bg-blue-700 text-white rounded-lg flex items-center justify-center mb-4">
              {option.icon === 'Phone' ? <Icons.Phone /> : <Icons.Message />}
            </div>
            <h3 className="text-lg font-medium">{option.title}</h3>
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex mt-16">
        {/* <Link 
          href="#" 
          className="mr-4 px-4 py-2 border border-blue-700 text-blue-700 rounded flex items-center"
        >
          <svg width="20" height="20" className="mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 17V11M12 8V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Explore more
        </Link> */}
        <Link 
          href="/sme/dashboard" 
          className="px-4 py-2 bg-blue-700 text-white rounded flex items-center"
        >
          <Icons.Home />
          <span className="ml-2">Go back home</span>
        </Link>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your message</h2>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg h-32 resize-none mb-4"
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            
            <button
              className="w-full py-3 bg-blue-700 text-white rounded-lg font-medium disabled:bg-blue-400"
              onClick={handleSendMessage}
              disabled={!message.trim() || loading}
            >
              {loading ? 'Sending...' : 'Send message'}
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold mb-2">Message Sent</h2>
            <p className="text-gray-600 mb-6">Your message has been sent to Nova X. We'll get back to you shortly.</p>
            
            <button
              className="px-6 py-2 bg-blue-700 text-white rounded-lg font-medium"
              onClick={() => setShowConfirmation(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTab;