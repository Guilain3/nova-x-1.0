// Types for our investors data
export interface Investor {
    id: string;
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    avatarUrl: string;
    investorType: 'angel' | 'vc' | 'corporate' | 'family_office' | 'institutional';
    investmentRange: string;
    portfolioSize: number;
    website?: string;
    verificationDate: string;
    preferredSectors: string[];
    location: string;
    bio: string;
  }
  
  // Mock data
  const mockInvestorData: Investor[] = [
    {
      id: 'inv-001',
      name: 'Sarah Johnson',
      title: 'Managing Partner',
      company: 'Horizon Ventures',
      email: 'sarah.johnson@horizonvc.com',
      phone: '+1 (415) 555-0123',
      avatarUrl: '/mock-avatars/investor1.jpg',
      investorType: 'vc',
      investmentRange: '$500K - $2M',
      portfolioSize: 18,
      website: 'https://horizonvc.com',
      verificationDate: '2025-03-15T14:30:00Z',
      preferredSectors: ['Fintech', 'Healthcare', 'SaaS'],
      location: 'San Francisco, CA',
      bio: 'Sarah has over 15 years of experience in venture capital with a focus on early-stage technology startups.'
    },
    {
      id: 'inv-002',
      name: 'Michael Chen',
      title: 'Angel Investor',
      company: 'Independent',
      email: 'michael.chen@example.com',
      phone: '+1 (650) 555-0187',
      avatarUrl: '/mock-avatars/investor2.jpg',
      investorType: 'angel',
      investmentRange: '$50K - $250K',
      portfolioSize: 12,
      verificationDate: '2025-01-08T09:45:00Z',
      preferredSectors: ['E-commerce', 'AI', 'Consumer Tech'],
      location: 'Palo Alto, CA',
      bio: 'Former CTO of TechGiant, now investing in and advising early-stage startups.'
    },
    {
      id: 'inv-003',
      name: 'Emily Rodriguez',
      title: 'Investment Director',
      company: 'Future Fund',
      email: 'e.rodriguez@futurefund.com',
      phone: '+1 (212) 555-0156',
      avatarUrl: '/mock-avatars/investor3.jpg',
      investorType: 'vc',
      investmentRange: '$1M - $5M',
      portfolioSize: 24,
      website: 'https://futurefund.com',
      verificationDate: '2025-02-20T11:15:00Z',
      preferredSectors: ['Cleantech', 'Sustainability', 'GreenTech'],
      location: 'New York, NY',
      bio: 'Emily focuses on investments that drive sustainable innovation and positive environmental impact.'
    },
    {
      id: 'inv-004',
      name: 'David Kim',
      title: 'Director of Strategic Investments',
      company: 'TechCorp Global',
      email: 'd.kim@techcorp.com',
      phone: '+1 (206) 555-0199',
      avatarUrl: '/mock-avatars/investor4.jpg',
      investorType: 'corporate',
      investmentRange: '$2M - $10M',
      portfolioSize: 15,
      website: 'https://techcorp.com/ventures',
      verificationDate: '2024-11-30T15:45:00Z',
      preferredSectors: ['Enterprise Software', 'Cloud Infrastructure', 'Cybersecurity'],
      location: 'Seattle, WA',
      bio: 'Leading TechCorp s strategic investment initiatives to identify emerging technologies that complement our product ecosystem.'
    },
    {
      id: 'inv-005',
      name: 'Olivia Williams',
      title: 'Principal',
      company: 'Summit Capital',
      email: 'o.williams@summitcap.com',
      phone: '+1 (617) 555-0172',
      avatarUrl: '/mock-avatars/investor5.jpg',
      investorType: 'vc',
      investmentRange: '$500K - $3M',
      portfolioSize: 31,
      website: 'https://summitcap.com',
      verificationDate: '2025-04-05T10:30:00Z',
      preferredSectors: ['Biotech', 'Digital Health', 'Life Sciences'],
      location: 'Boston, MA',
      bio: 'Olivia specializes in healthcare innovation, with a background in biomedical engineering and healthcare administration.'
    },
    {
      id: 'inv-006',
      name: 'Robert Patel',
      title: 'Managing Director',
      company: 'Sequoia Family Office',
      email: 'robert.patel@sequoiafamily.com',
      phone: '+1 (305) 555-0134',
      avatarUrl: '/mock-avatars/investor6.jpg',
      investorType: 'family_office',
      investmentRange: '$1M - $8M',
      portfolioSize: 22,
      website: 'https://sequoiafamilyoffice.com',
      verificationDate: '2025-01-22T13:15:00Z',
      preferredSectors: ['Real Estate Tech', 'Financial Services', 'Consumer Brands'],
      location: 'Miami, FL',
      bio: 'Robert manages investments for one of Florida s largest family offices, with a focus on long-term value creation.'
    },
    {
      id: 'inv-007',
      name: 'Jessica Lee',
      title: 'Partner',
      company: 'Catalyst Ventures',
      email: 'j.lee@catalystventures.com',
      phone: '+1 (512) 555-0193',
      avatarUrl: '/mock-avatars/investor7.jpg',
      investorType: 'vc',
      investmentRange: '$250K - $3M',
      portfolioSize: 28,
      website: 'https://catalystventures.com',
      verificationDate: '2024-12-10T09:00:00Z',
      preferredSectors: ['EdTech', 'Future of Work', 'Productivity Tools'],
      location: 'Austin, TX',
      bio: 'Jessica invests in companies transforming how we learn and work, with particular interest in remote collaboration tools.'
    },
    {
      id: 'inv-008',
      name: 'Thomas Anderson',
      title: 'Angel Investor',
      company: 'Independent',
      email: 't.anderson@example.com',
      phone: '+1 (720) 555-0165',
      avatarUrl: '/mock-avatars/investor8.jpg',
      investorType: 'angel',
      investmentRange: '$25K - $200K',
      portfolioSize: 9,
      verificationDate: '2025-03-28T16:45:00Z',
      preferredSectors: ['Consumer Apps', 'Gaming', 'Entertainment'],
      location: 'Denver, CO',
      bio: 'Serial entrepreneur who successfully exited three tech startups, now mentoring and investing in the next generation.'
    },
    {
      id: 'inv-009',
      name: 'Maria Garcia',
      title: 'Investment Manager',
      company: 'Global Growth Investments',
      email: 'm.garcia@ggi.com',
      phone: '+1 (213) 555-0176',
      avatarUrl: '/mock-avatars/investor9.jpg',
      investorType: 'institutional',
      investmentRange: '$5M - $20M',
      portfolioSize: 42,
      website: 'https://globalgrowth.com',
      verificationDate: '2025-02-07T11:30:00Z',
      preferredSectors: ['Infrastructure', 'Energy', 'Transportation'],
      location: 'Los Angeles, CA',
      bio: 'Maria represents an institutional fund focused on growth-stage companies with proven revenue models and global potential.'
    },
    {
      id: 'inv-010',
      name: 'James Wilson',
      title: 'Chief Investment Officer',
      company: 'Evergreen Family Office',
      email: 'j.wilson@evergreenfo.com',
      phone: '+1 (312) 555-0188',
      avatarUrl: '/mock-avatars/investor10.jpg',
      investorType: 'family_office',
      investmentRange: '$2M - $15M',
      portfolioSize: 27,
      website: 'https://evergreenfo.com',
      verificationDate: '2025-01-15T14:00:00Z',
      preferredSectors: ['AgTech', 'Food Innovation', 'Sustainability'],
      location: 'Chicago, IL',
      bio: 'James leads investment strategy for a multi-generational family office with a focus on sustainable and impactful businesses.'
    },
    {
      id: 'inv-011',
      name: 'Sophia Martinez',
      title: 'Venture Partner',
      company: 'BlueSky Ventures',
      email: 's.martinez@blueskyvc.com',
      phone: '+1 (404) 555-0143',
      avatarUrl: '/mock-avatars/investor11.jpg',
      investorType: 'vc',
      investmentRange: '$500K - $4M',
      portfolioSize: 19,
      website: 'https://blueskyvc.com',
      verificationDate: '2025-03-05T10:15:00Z',
      preferredSectors: ['MarTech', 'E-commerce', 'Consumer Brands'],
      location: 'Atlanta, GA',
      bio: 'Sophia specializes in consumer-facing startups with strong brand potential and innovative marketing approaches.'
    },
    {
      id: 'inv-012',
      name: 'Daniel Park',
      title: 'Corporate Development',
      company: 'TechFusion Inc.',
      email: 'd.park@techfusion.com',
      phone: '+1 (408) 555-0159',
      avatarUrl: '/mock-avatars/investor12.jpg',
      investorType: 'corporate',
      investmentRange: '$1M - $8M',
      portfolioSize: 11,
      website: 'https://techfusion.com/investments',
      verificationDate: '2024-12-20T13:45:00Z',
      preferredSectors: ['IoT', 'Hardware', 'Smart Home'],
      location: 'San Jose, CA',
      bio: 'Daniel leads TechFusion s strategic investments, focusing on hardware and IoT startups that can enhance our product ecosystem.'
    },
    {
      id: 'inv-013',
      name: 'Emma Thompson',
      title: 'Angel Investor',
      company: 'Independent',
      email: 'e.thompson@example.com',
      phone: '+1 (503) 555-0192',
      avatarUrl: '/mock-avatars/investor13.jpg',
      investorType: 'angel',
      investmentRange: '$50K - $300K',
      portfolioSize: 15,
      verificationDate: '2025-02-18T09:30:00Z',
      preferredSectors: ['Health & Wellness', 'D2C Brands', 'Retail Tech'],
      location: 'Portland, OR',
      bio: 'Former retail executive and brand builder, now investing in innovative consumer companies and wellness technologies.'
    },
    {
      id: 'inv-014',
      name: 'Jonathan Miller',
      title: 'Senior Investment Director',
      company: 'Pioneer Ventures',
      email: 'j.miller@pioneervc.com',
      phone: '+1 (214) 555-0177',
      avatarUrl: '/mock-avatars/investor14.jpg',
      investorType: 'vc',
      investmentRange: '$1M - $6M',
      portfolioSize: 23,
      website: 'https://pioneervc.com',
      verificationDate: '2025-01-30T14:15:00Z',
      preferredSectors: ['B2B SaaS', 'DevTools', 'Enterprise AI'],
      location: 'Dallas, TX',
      bio: 'Jonathan focuses on B2B software investments, with expertise in enterprise sales and scaling SaaS companies.'
    },
    {
      id: 'inv-015',
      name: 'Aisha Khan',
      title: 'Investment Partner',
      company: 'Global Innovation Fund',
      email: 'a.khan@gif.com',
      phone: '+1 (202) 555-0168',
      avatarUrl: '/mock-avatars/investor15.jpg',
      investorType: 'institutional',
      investmentRange: '$3M - $15M',
      portfolioSize: 34,
      website: 'https://globalinnovationfund.com',
      verificationDate: '2025-04-10T11:00:00Z',
      preferredSectors: ['Climate Tech', 'Renewable Energy', 'Sustainable Agriculture'],
      location: 'Washington, DC',
      bio: 'Aisha represents a major institutional fund focused on technologies addressing climate change and global sustainability challenges.'
    }
  ];
  
  // Simulating an API call with a delay
  export const fetchInvestorData = async (): Promise<Investor[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would be an API call:
    // return await fetch('/api/investors').then(res => res.json())
    
    return mockInvestorData;
  };