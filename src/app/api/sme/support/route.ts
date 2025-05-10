import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all support data
    const [
      educationCategories,
      educationalResources,
      financingOptions,
      improvementSteps,
      supportOptions,
      ineligibilityReasons
    ] = await Promise.all([
      prisma.educationCategory.findMany({ orderBy: { id: 'asc' } }),
      prisma.educationalResource.findMany({ orderBy: { id: 'asc' } }),
      prisma.financingOption.findMany({ orderBy: { id: 'asc' } }),
      prisma.improvementStep.findMany({ orderBy: { order: 'asc' } }),
      prisma.supportOption.findMany({ orderBy: { id: 'asc' } }),
      prisma.ineligibilityReason.findMany({ orderBy: { order: 'asc' } })
    ]);

    // Format the data to match the frontend structure
    return NextResponse.json({
      education: {
        categories: educationCategories.map(cat => ({
          id: cat.name,
          label: cat.label
        })),
        resources: educationalResources.map(resource => ({
          id: resource.id,
          title: resource.title,
          author: resource.author,
          category: resource.category,
          thumbnail: resource.thumbnail,
          videoUrl: resource.videoUrl
        }))
      },
      financing: {
        title: 'Alternative Financing products',
        options: financingOptions.map(option => ({
          id: option.id,
          name: option.name,
          period: option.period,
          amount: option.amount,
          frequency: option.frequency,
          icon: option.iconText
        }))
      },
      improve: {
        title: 'Improve Eligibility',
        steps: improvementSteps.map(step => ({
          id: step.id,
          title: step.title,
          type: step.type,
          icon: step.iconText,
          content: step.content,
          expanded: step.order === 1, // First item expanded by default
          cta: step.ctaText
        }))
      },
      feedback: {
        title: 'Your message',
        placeholder: 'Type your message here',
        buttonText: 'Send message'
      },
      support: {
        contactOptions: supportOptions.map(option => ({
          id: option.id,
          title: option.title,
          icon: option.iconType
        }))
      },
      reasons: ineligibilityReasons.map(reason => ({
        id: reason.id,
        title: reason.title,
        description: reason.description,
        canUpload: reason.canUpload
      }))
    });
  } catch (error) {
    console.error('Error fetching support data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch support data' },
      { status: 500 }
    );
  }
}