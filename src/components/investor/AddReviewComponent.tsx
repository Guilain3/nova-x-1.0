"use client";

import React, { useState } from 'react';
import { number } from 'zod';
// import { v4 as uuidv4 } from 'uuid';
 // You may need to install this package

interface AddReviewProps {
  smeId: string;
  onReviewAdded: (review: ReviewData) => void;
  onCancel: () => void;
}

export interface ReviewData {
  id: number;
  reviewerName: string;
  reviewerLocation: string;
  reviewerImageUrl: string | null;
  content: string;
  date: string;
}

const AddReviewComponent: React.FC<AddReviewProps> = ({ smeId, onReviewAdded, onCancel }) => {
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerLocation, setReviewerLocation] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!reviewerName.trim() || !reviewerLocation.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create a new review object
      const newReview: ReviewData = {
        id: Date.now(),
        reviewerName,
        reviewerLocation,
        reviewerImageUrl: null, // No image upload for now
        content,
        date: new Date().toISOString(),
      };
      
      // In a real app, this would be an API call
      // Simulate a delay for the mock "API" call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Pass the new review up to the parent component
      onReviewAdded(newReview);
      
      // Reset the form
      setReviewerName('');
      setReviewerLocation('');
      setContent('');
      
    } catch (err) {
      console.error('Error adding review:', err);
      setError('Failed to add review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-semibold mb-4">Add Your Review</h3>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="reviewerName"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="reviewerLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Your Location
            </label>
            <input
              type="text"
              id="reviewerLocation"
              value={reviewerLocation}
              onChange={(e) => setReviewerLocation(e.target.value)}
              placeholder="City, Country"
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReviewComponent;