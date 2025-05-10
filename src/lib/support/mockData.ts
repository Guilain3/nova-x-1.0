export const mockData = {
    education: {
      categories: [
        { id: 'financial-literacy', label: 'Financial literacy' },
        { id: 'loan-funding', label: 'Loan & Funding Guidance' },
        { id: 'investment', label: 'Investment Readiness' },
        { id: 'risk', label: 'Risk Management' },
        { id: 'compliance', label: 'Compliance and KYC' },
      ],
      resources: [
        {
          id: 1,
          title: 'Understanding cash flow',
          author: 'Leila Garhani',
          category: 'financial-literacy',
          thumbnail: '/cashflow-thumbnail.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=hMBN6yTIDb0',
        },
        {
          id: 2,
          title: 'How to prepare financial documents',
          author: 'Susan Paz',
          category: 'financial-literacy',
          thumbnail: '/financial-docs-thumbnail.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=NquuY41FrrA',
        },
        {
          id: 3,
          title: 'Managing debt and repayments',
          author: 'Susan Paz',
          category: 'financial-literacy',
          thumbnail: '/debt-management-thumbnail.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=nR3LBBV1DHk',
        },
      ]
    },
    financing: {
      title: 'Alternative Financing products',
      options: [
        {
          id: 1,
          name: 'Nova X',
          period: 'Period',
          amount: 'RWF 5,000,000',
          frequency: 'per month',
          icon: 'N'
        },
        {
          id: 2,
          name: 'BRD Government Grant',
          period: 'Period',
          amount: 'RWF 5,000,000',
          frequency: 'per month',
          icon: 'B'
        },
        {
          id: 3,
          name: 'BRD Government Grant',
          period: 'Period',
          amount: 'RWF 5,000,000',
          frequency: 'per month',
          icon: 'B'
        },
      ]
    },
    improve: {
      title: 'Improve Eligibility',
      steps: [
        {
          id: 1,
          title: 'Financial Health Improvement',
          type: 'Recommendation',
          icon: 'F',
          content: 'We recommend improving your financial health before reapplying. You can use FinTrack to monitor your business\'s revenue, profitability, and cash flow.',
          expanded: true,
          cta: 'FinTrack'
        },
        {
          id: 2,
          title: 'Documents Updates',
          type: 'Missing Documents !',
          icon: 'D',
          content: 'Ensure you have all required documentation ready for your next application.',
          expanded: false,
          cta: 'Upload'
        }
      ]
    },
    feedback: {
      title: 'Your message',
      placeholder: 'Type your message here',
      buttonText: 'Send message'
    },
    support: {
      contactOptions: [
        {
          id: 1,
          title: 'Call Us on 21210',
          icon: 'Phone'
        },
        {
          id: 2,
          title: 'Text us',
          icon: 'Message'
        }
      ]
    },
    reasons: [
      {
        id: 1,
        title: 'Insufficient financial health',
        description: 'low revenue, negative cash flow, etc',
        canUpload: false
      },
      {
        id: 2,
        title: 'Missing documentation',
        description: 'missing financial statements, tax records.',
        canUpload: true
      },
      {
        id: 3,
        title: 'Insufficient business history',
        description: 'not in operation long enough',
        canUpload: false
      },
      {
        id: 4,
        title: 'Low credit score',
        description: 'The credit score is very low.',
        canUpload: false
      }
    ]
  };