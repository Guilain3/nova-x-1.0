import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Save the feedback to the database
    const feedback = await prisma.feedbackSubmission.create({
      data: {
        message
        // Add userId if you have authentication
        // userId: session?.user?.id
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
      id: feedback.id
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}