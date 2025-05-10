import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Starting to seed database...')

  // Add some initial industries
  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Agriculture',
  ]

  for (const industry of industries) {
    await prisma.industry.upsert({
      where: { name: industry },
      update: {},
      create: {
        name: industry,
        description: `${industry} industry`,
      },
    })
  }
  console.log('Industries seeded')

  // Seed education categories
  const educationCategories = [
    { name: 'financial-literacy', label: 'Financial literacy' },
    { name: 'loan-funding', label: 'Loan & Funding Guidance' },
    { name: 'investment', label: 'Investment Readiness' },
    { name: 'risk', label: 'Risk Management' },
    { name: 'compliance', label: 'Compliance and KYC' },
  ]

  for (const category of educationCategories) {
    await prisma.educationCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }
  console.log('Education categories seeded')

  // Seed educational resources
  const educationalResources = [
    {
      title: 'Understanding cash flow',
      author: 'Susan Paz',
      category: 'financial-literacy',
      thumbnail: '/cashflow-thumbnail.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=hMBN6yTIDb0',
    },
    {
      title: 'How to prepare financial documents',
      author: 'Susan Paz',
      category: 'financial-literacy',
      thumbnail: '/financial-docs-thumbnail.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=NquuY41FrrA',
    },
    {
      title: 'Managing debt and repayments',
      author: 'Susan Paz',
      category: 'financial-literacy',
      thumbnail: '/debt-management-thumbnail.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=nR3LBBV1DHk',
    },
  ]

  await prisma.educationalResource.deleteMany({})
  
  for (const resource of educationalResources) {
    await prisma.educationalResource.create({
      data: resource,
    })
  }
  console.log('Educational resources seeded')

  // Seed financing options
  const financingOptions = [
    {
      name: 'Nova X',
      period: 'Period',
      amount: 'RWF 5,000,000',
      frequency: 'per month',
      iconText: 'N',
      order: 1,
    },
    {
      name: 'BRD Government Grant',
      period: 'Period',
      amount: 'RWF 5,000,000',
      frequency: 'per month',
      iconText: 'B',
      order: 2,
    },
    {
      name: 'BRD Government Grant',
      period: 'Period',
      amount: 'RWF 5,000,000',
      frequency: 'per month',
      iconText: 'B',
      order: 3,
    },
  ]

  await prisma.financingOption.deleteMany({})
  
  for (const option of financingOptions) {
    await prisma.financingOption.create({
      data: option,
    })
  }
  console.log('Financing options seeded')

  // Seed improvement steps
  const improvementSteps = [
    {
      title: 'Financial Health Improvement',
      type: 'Recommendation',
      iconText: 'F',
      content: "We recommend improving your financial health before reapplying. You can use FinTrack to monitor your business's revenue, profitability, and cash flow.",
      ctaText: 'FinTrack',
      ctaLink: '/fintrack',
      order: 1,
    },
    {
      title: 'Documents Updates',
      type: 'Missing Documents !',
      iconText: 'D',
      content: 'Ensure you have all required documentation ready for your next application.',
      ctaText: 'Upload',
      ctaLink: '/upload',
      order: 2,
    },
  ]

  await prisma.improvementStep.deleteMany({})
  
  for (const step of improvementSteps) {
    await prisma.improvementStep.create({
      data: step,
    })
  }
  console.log('Improvement steps seeded')

  // Seed support options
  const supportOptions = [
    {
      title: 'Call Us on 21210',
      iconType: 'Phone',
      link: 'tel:21210',
    },
    {
      title: 'Text us',
      iconType: 'Message',
      link: 'sms:21210',
    },
  ]

  await prisma.supportOption.deleteMany({})
  
  for (const option of supportOptions) {
    await prisma.supportOption.create({
      data: option,
    })
  }
  console.log('Support options seeded')

  // Seed ineligibility reasons
  const ineligibilityReasons = [
    {
      title: 'Insufficient financial health',
      description: 'low revenue, negative cash flow, etc',
      canUpload: false,
      order: 1,
    },
    {
      title: 'Missing documentation',
      description: 'missing financial statements, tax records.',
      canUpload: true,
      order: 2,
    },
    {
      title: 'Insufficient business history',
      description: 'not in operation long enough',
      canUpload: false,
      order: 3,
    },
    {
      title: 'Low credit score',
      description: 'The credit score is very low.',
      canUpload: false,
      order: 4,
    },
  ]

  await prisma.ineligibilityReason.deleteMany({})
  
  for (const reason of ineligibilityReasons) {
    await prisma.ineligibilityReason.create({
      data: reason,
    })
  }
  console.log('Ineligibility reasons seeded')

  console.log('Database seeding completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })