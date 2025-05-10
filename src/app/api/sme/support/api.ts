import { mockData } from "@/lib/support/mockData";

// This will eventually be replaced with real API calls
export async function fetchSupportData() {
  try {
    // In development, use mock data
    if (process.env.NODE_ENV === 'development') {
      return mockData;
    }
    
    // In production, fetch from API
    const response = await fetch('/api/support');
    if (!response.ok) {
      throw new Error('Failed to fetch support data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching support data:', error);
    // Fallback to mock data if API fails
    return mockData;
  }
}

export async function submitFeedback(message: string) {
  const response = await fetch('/api/support/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit feedback');
  }
  
  return await response.json();
}