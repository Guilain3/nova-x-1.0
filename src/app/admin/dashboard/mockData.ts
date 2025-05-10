// Types for our dashboard data
export interface DashboardData {
    metrics: {
      pendingKYCs: number;
      approvedSMEs: number;
      rejectedKYCs: number;
      activeSubscriptions: number;
    };
    kycQueue: KYCQueueItem[];
    subscriptions: SubscriptionItem[];
    leaderboard: LeaderboardItem[];
    activityLog: ActivityLogItem[];
  }
  
  export interface KYCQueueItem {
    id: string;
    smeName: string;
    dateSubmitted: string;
    documentUrl: string;
    notes: string;
  }
  
  export interface SubscriptionItem {
    id: string;
    smeName: string;
    plan: string;
    expiryDate: string;
    status: 'active' | 'expired' | 'pending';
  }
  
  export interface LeaderboardItem {
    id: string;
    smeName: string;
    score: number;
    lastUpdated: string;
  }
  
  export interface ActivityLogItem {
    id: string;
    timestamp: string;
    action: string;
    actor: string;
  }
  
  // Mock data for the dashboard
  const mockDashboardData: DashboardData = {
    metrics: {
      pendingKYCs: 8,
      approvedSMEs: 43,
      rejectedKYCs: 12,
      activeSubscriptions: 37,
    },
    kycQueue: [
      {
        id: 'kyc-001',
        smeName: 'TechNova Solutions',
        dateSubmitted: '2025-05-01T09:30:00Z',
        documentUrl: '/mock-files/technova-docs.pdf',
        notes: 'Missing business registration certificate',
      },
      {
        id: 'kyc-002',
        smeName: 'Green Earth Farms',
        dateSubmitted: '2025-05-02T11:45:00Z',
        documentUrl: '/mock-files/greenearth-docs.pdf',
        notes: 'All documents look complete',
      },
      {
        id: 'kyc-003',
        smeName: 'CloudSphere IT',
        dateSubmitted: '2025-05-03T14:20:00Z',
        documentUrl: '/mock-files/cloudsphere-docs.pdf',
        notes: '',
      },
      {
        id: 'kyc-004',
        smeName: 'Artisan Crafts Co.',
        dateSubmitted: '2025-05-04T10:15:00Z',
        documentUrl: '/mock-files/artisan-docs.pdf',
        notes: 'Need to verify tax ID',
      },
      {
        id: 'kyc-005',
        smeName: 'Local Delivery Services',
        dateSubmitted: '2025-05-05T16:30:00Z',
        documentUrl: '/mock-files/localdelivery-docs.pdf',
        notes: 'Awaiting additional vehicle registration documents',
      },
      {
        id: 'kyc-006',
        smeName: 'Sunrise Bakery',
        dateSubmitted: '2025-05-06T08:45:00Z',
        documentUrl: '/mock-files/sunrise-docs.pdf',
        notes: 'Health certificate expired',
      },
      {
        id: 'kyc-007',
        smeName: 'Digital Marketing Pros',
        dateSubmitted: '2025-05-06T13:10:00Z',
        documentUrl: '/mock-files/digitalmarketing-docs.pdf',
        notes: '',
      },
      {
        id: 'kyc-008',
        smeName: 'Wellness Center',
        dateSubmitted: '2025-05-07T09:00:00Z',
        documentUrl: '/mock-files/wellness-docs.pdf',
        notes: 'Pending verification of practitioner licenses',
      },
    ],
    subscriptions: [
      {
        id: 'sub-001',
        smeName: 'TechSavvy Solutions',
        plan: 'Premium',
        expiryDate: '2025-06-15T23:59:59Z',
        status: 'active',
      },
      {
        id: 'sub-002',
        smeName: 'Global Imports Ltd',
        plan: 'Basic',
        expiryDate: '2025-05-10T23:59:59Z',
        status: 'active',
      },
      {
        id: 'sub-003',
        smeName: 'Creative Designs Inc',
        plan: 'Standard',
        expiryDate: '2025-05-25T23:59:59Z',
        status: 'active',
      },
      {
        id: 'sub-004',
        smeName: 'Fresh Foods Market',
        plan: 'Premium',
        expiryDate: '2025-07-05T23:59:59Z',
        status: 'active',
      },
      {
        id: 'sub-005',
        smeName: 'Urban Transport Co.',
        plan: 'Standard',
        expiryDate: '2025-04-30T23:59:59Z',
        status: 'expired',
      },
      {
        id: 'sub-006',
        smeName: 'Healthcare Solutions',
        plan: 'Premium',
        expiryDate: '2025-06-30T23:59:59Z',
        status: 'active',
      },
      {
        id: 'sub-007',
        smeName: 'Eco-Friendly Products',
        plan: 'Basic',
        expiryDate: '2025-05-08T23:59:59Z',
        status: 'active',
      },
      {
        id: 'sub-008',
        smeName: 'Education Services Ltd',
        plan: 'Standard',
        expiryDate: '2025-06-20T23:59:59Z',
        status: 'active',
      },
      {
        id: 'sub-009',
        smeName: 'Construction Experts',
        plan: 'Premium',
        expiryDate: '2025-06-10T23:59:59Z',
        status: 'active',
      },
      {
        id: 'sub-010',
        smeName: 'Financial Advisors Group',
        plan: 'Basic',
        expiryDate: '2025-05-03T23:59:59Z',
        status: 'expired',
      },
    ],
    leaderboard: [
      {
        id: 'fin-001',
        smeName: 'Innovate Technologies',
        score: 92,
        lastUpdated: '2025-05-01T12:00:00Z',
      },
      {
        id: 'fin-002',
        smeName: 'Sustainable Solutions',
        score: 88,
        lastUpdated: '2025-05-02T14:30:00Z',
      },
      {
        id: 'fin-003',
        smeName: 'Health Plus',
        score: 85,
        lastUpdated: '2025-05-03T09:15:00Z',
      },
      {
        id: 'fin-004',
        smeName: 'Digital Nomads',
        score: 81,
        lastUpdated: '2025-05-02T16:45:00Z',
      },
      {
        id: 'fin-005',
        smeName: 'Urban Mobility',
        score: 76,
        lastUpdated: '2025-05-01T11:30:00Z',
      },
      {
        id: 'fin-006',
        smeName: 'Green Power Co.',
        score: 72,
        lastUpdated: '2025-05-04T10:00:00Z',
      },
      {
        id: 'fin-007',
        smeName: 'Smart Retail',
        score: 68,
        lastUpdated: '2025-05-05T13:20:00Z',
      },
      {
        id: 'fin-008',
        smeName: 'Logistics Plus',
        score: 65,
        lastUpdated: '2025-05-04T15:45:00Z',
      },
      {
        id: 'fin-009',
        smeName: 'Food Delivery Network',
        score: 61,
        lastUpdated: '2025-05-03T12:30:00Z',
      },
      {
        id: 'fin-010',
        smeName: 'Local Artisans Collective',
        score: 58,
        lastUpdated: '2025-05-02T10:15:00Z',
      },
    ],
    activityLog: [
      {
        id: 'act-001',
        timestamp: '2025-05-07T08:45:00Z',
        action: 'Fusion Ventures approved',
        actor: 'Admin'
      },
      {
        id: 'act-002',
        timestamp: '2025-05-07T08:30:00Z',
        action: 'EcoSolutions subscription renewed',
        actor: 'System'
      },
      {
        id: 'act-003',
        timestamp: '2025-05-07T08:15:00Z',
        action: 'MicroTech rejected',
        actor: 'Admin'
      },
      {
        id: 'act-004',
        timestamp: '2025-05-06T17:30:00Z',
        action: 'Urban Mobility notified about subscription',
        actor: 'System'
      },
      {
        id: 'act-005',
        timestamp: '2025-05-06T16:45:00Z',
        action: 'Investor viewed Digital Nomads',
        actor: 'Investor001'
      },
      {
        id: 'act-006',
        timestamp: '2025-05-06T15:20:00Z',
        action: 'Health Plus updated financial documents',
        actor: 'SME'
      },
      {
        id: 'act-007',
        timestamp: '2025-05-06T14:10:00Z',
        action: 'Agritech Solutions approved',
        actor: 'Admin'
      },
      {
        id: 'act-008',
        timestamp: '2025-05-06T12:30:00Z',
        action: 'Creative Studios rejected',
        actor: 'Admin'
      },
      {
        id: 'act-009',
        timestamp: '2025-05-06T11:15:00Z',
        action: 'Investor viewed Sustainable Solutions',
        actor: 'Investor003'
      },
      {
        id: 'act-010',
        timestamp: '2025-05-06T10:00:00Z',
        action: 'Smart Home Tech subscription renewed',
        actor: 'System'
      },
      {
        id: 'act-011',
        timestamp: '2025-05-05T16:45:00Z',
        action: 'Cloud Services Pro approved',
        actor: 'Admin'
      },
      {
        id: 'act-012',
        timestamp: '2025-05-05T15:30:00Z',
        action: 'Green Energy Co. updated financial score',
        actor: 'System'
      },
      {
        id: 'act-013',
        timestamp: '2025-05-05T14:20:00Z',
        action: 'Mobile Solutions rejected',
        actor: 'Admin'
      },
      {
        id: 'act-014',
        timestamp: '2025-05-05T13:10:00Z',
        action: 'Local Crafts subscription expired',
        actor: 'System'
      },
      {
        id: 'act-015',
        timestamp: '2025-05-05T11:45:00Z',
        action: 'Investor viewed Innovate Technologies',
        actor: 'Investor002'
      }
    ]
  };
  
  // Simulating an API call with a delay
  export const fetchDashboardData = async (): Promise<DashboardData> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would be an API call:
    // return await fetch('/api/dashboard').then(res => res.json())
    
    return mockDashboardData;
  };