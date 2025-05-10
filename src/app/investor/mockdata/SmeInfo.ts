// Enhanced mock data for SMEs with more detailed information

export interface SME {
  id: string;
  imageUrl: string;
  videoUrl?: string;
  title: string;
  location: string;
  category: string;
  foundedYear: number;
  employeeCount: number;
  description: string;
  requiredAmount: number;
  minimumInvestment: number;
  equityOffer: number;
  creditScore: {
    score: number;
    grade: string;
  };
  ceo: {
    name: string;
    title: string;
  };
  // Added contact information
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  financials: {
    monthlyRevenue: Record<string, number>;
    monthlyExpenses: Record<string, number>;
    monthlyCashFlow: Record<string, number>;
  };
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    fileUrl: string;
  }[];
  reviews: {
    id: string;
    reviewerName: string;
    reviewerLocation: string;
    reviewerImageUrl: string;
    content: string;
    date: string;
  }[];
  detailsUrl: string;
}

// Update mockSmeData with contact information for each SME
export const mockSmeData: SME[] = [
  {
    id: "1",
    imageUrl: "https://img.freepik.com/free-photo/african-man-harvesting-vegetables_23-2151441303.jpg",
   // videoUrl: "https://example.com/agritech-video.mp4", // Placeholder for the video URL
    title: "AgriTech",
    location: "Kigali, Rwanda",
    category: "Agriculture",
    foundedYear: 2019,
    employeeCount: 22,
    description: "The main source of revenue comes from growing strawberry fruits using a modern farming method called hydroponic farming. This approach enhances production, allowing the business to sell to traders such as supermarkets and individual consumers who require the produce.",
    requiredAmount: 30000000,
    minimumInvestment: 5000000,
    equityOffer: 12,
    creditScore: {
      score: 1000,
      grade: "A+"
    },
    ceo: {
      name: "Guilaine Ndahiro",
      title: "CEO / Founder"
    },
    // Added contact information
    contactInfo: {
      email: "info@agritech.rw",
      phone: "+250 788 123 456",
      website: "www.agritech.rw"
    },
    financials: {
      monthlyRevenue: {
        "Jan": 230000,
        "Feb": 320000,
        "Mar": 280000,
        "Apr": 220000,
        "May": 350000,
        "Jun": 290000
      },
      monthlyExpenses: {
        "Jan": 150000,
        "Feb": 210000,
        "Mar": 190000,
        "Apr": 130000,
        "May": 220000,
        "Jun": 180000
      },
      monthlyCashFlow: {
        "10": 40,
        "11": 45,
        "12": 55,
        "13": 48,
        "14": 52,
        "15": 60,
        "16": 65,
        "17": 90,
        "18": 70,
        "19": 75,
        "20": 80,
        "21": 72,
        "22": 78,
        "23": 68,
        "24": 74
      }
    },
    documents: [
      {
        id: "doc1",
        name: "Bank Statement - Q1 2023",
        type: "financial",
        uploadDate: "2023-04-15",
        fileUrl: "/documents/agritech/bank-statement-q1-2023.pdf"
      },
      {
        id: "doc2",
        name: "Business Plan",
        type: "planning",
        uploadDate: "2022-11-10",
        fileUrl: "/documents/agritech/business-plan-2023.pdf"
      },
      {
        id: "doc3",
        name: "Financial Projections",
        type: "financial",
        uploadDate: "2023-01-20",
        fileUrl: "/documents/agritech/financial-projections-2023-2025.xlsx"
      },
      {
        id: "doc4",
        name: "Registration Certificate",
        type: "legal",
        uploadDate: "2019-06-12",
        fileUrl: "/documents/agritech/registration-certificate.pdf"
      }
    ],
    reviews: [
      {
        id: "rev1",
        reviewerName: "Grace Uwase",
        reviewerLocation: "Green Field, Kigali, Rwanda",
        reviewerImageUrl: "/images/reviewers/grace-uwase.jpg",
        content: "AgriTech has consistently met or exceeded their projections. The team is responsive and transparent about challenges.",
        date: "2023-03-15"
      }
    ],
    detailsUrl: "/investments/agritech"
  },
  {
    id: "2",
    imageUrl: "https://img.freepik.com/free-photo/robot-with-trash_1048-3575.jpg",
    title: "TechSolutions",
    location: "Nairobi, Kenya",
    category: "Technology",
    foundedYear: 2020,
    employeeCount: 15,
    description: "Developing innovative software solutions for small businesses across East Africa with focus on inventory management and point-of-sale systems that work efficiently even in areas with limited internet connectivity.",
    requiredAmount: 25000000,
    minimumInvestment: 3000000,
    equityOffer: 10,
    creditScore: {
      score: 850,
      grade: "B+"
    },
    ceo: {
      name: "David Kinyua",
      title: "CEO / Co-Founder"
    },
    // Added contact information
    contactInfo: {
      email: "info@techsolutions.ke",
      phone: "+254 722 987 654",
      website: "www.techsolutions.ke"
    },
    financials: {
      monthlyRevenue: {
        "Jan": 180000,
        "Feb": 210000,
        "Mar": 195000,
        "Apr": 230000,
        "May": 250000,
        "Jun": 240000
      },
      monthlyExpenses: {
        "Jan": 120000,
        "Feb": 130000,
        "Mar": 135000,
        "Apr": 125000,
        "May": 140000,
        "Jun": 145000
      },
      monthlyCashFlow: {
        "10": 35,
        "11": 40,
        "12": 45,
        "13": 50,
        "14": 55,
        "15": 50,
        "16": 60,
        "17": 55,
        "18": 65,
        "19": 70,
        "20": 65,
        "21": 60,
        "22": 70,
        "23": 65,
        "24": 70
      }
    },
    documents: [
      {
        id: "doc1",
        name: "Bank Statement - 2023",
        type: "financial",
        uploadDate: "2023-05-20",
        fileUrl: "/documents/techsolutions/bank-statement-2023.pdf"
      },
      {
        id: "doc2",
        name: "Product Roadmap",
        type: "planning",
        uploadDate: "2023-02-15",
        fileUrl: "/documents/techsolutions/product-roadmap-2023.pdf"
      },
      {
        id: "doc3",
        name: "Client Contracts",
        type: "legal",
        uploadDate: "2023-01-10",
        fileUrl: "/documents/techsolutions/client-contracts-2023.pdf"
      }
    ],
    reviews: [
      {
        id: "rev1",
        reviewerName: "John Mbeki",
        reviewerLocation: "Westlands, Nairobi, Kenya",
        reviewerImageUrl: "/images/reviewers/john-mbeki.jpg",
        content: "Their inventory management solution has transformed our retail business. The team at TechSolutions is highly skilled and responsive.",
        date: "2023-02-10"
      }
    ],
    detailsUrl: "/investments/techsolutions"
  },
  {
    id: "3",
    imageUrl: "https://img.freepik.com/free-photo/vibrant-fashion-textile-pattern-collection-display-generative-ai_188544-9090.jpg",
    title: "AfriTextiles",
    location: "Addis Ababa, Ethiopia",
    category: "Manufacturing",
    foundedYear: 2018,
    employeeCount: 35,
    description: "Creating sustainable, high-quality textiles using traditional methods combined with modern production techniques. Our products celebrate African heritage while meeting international quality standards.",
    requiredAmount: 45000000,
    minimumInvestment: 8000000,
    equityOffer: 15,
    creditScore: {
      score: 920,
      grade: "A"
    },
    ceo: {
      name: "Selam Bekele",
      title: "CEO / Founder"
    },
    // Added contact information
    contactInfo: {
      email: "info@afritextiles.et",
      phone: "+251 911 876 543",
      website: "www.afritextiles.et"
    },
    financials: {
      monthlyRevenue: {
        "Jan": 320000,
        "Feb": 350000,
        "Mar": 380000,
        "Apr": 310000,
        "May": 400000,
        "Jun": 420000
      },
      monthlyExpenses: {
        "Jan": 240000,
        "Feb": 260000,
        "Mar": 280000,
        "Apr": 250000,
        "May": 290000,
        "Jun": 300000
      },
      monthlyCashFlow: {
        "10": 45,
        "11": 50,
        "12": 55,
        "13": 60,
        "14": 65,
        "15": 70,
        "16": 65,
        "17": 75,
        "18": 80,
        "19": 70,
        "20": 75,
        "21": 80,
        "22": 75,
        "23": 70,
        "24": 75
      }
    },
    documents: [
      {
        id: "doc1",
        name: "Bank Statement - 2023",
        type: "financial",
        uploadDate: "2023-06-05",
        fileUrl: "/documents/afritextiles/bank-statement-2023.pdf"
      },
      {
        id: "doc2",
        name: "Export Licenses",
        type: "legal",
        uploadDate: "2022-12-15",
        fileUrl: "/documents/afritextiles/export-licenses.pdf"
      },
      {
        id: "doc3",
        name: "Manufacturing Process Overview",
        type: "operational",
        uploadDate: "2023-03-20",
        fileUrl: "/documents/afritextiles/manufacturing-process.pdf"
      },
      {
        id: "doc4",
        name: "Supplier Agreements",
        type: "legal",
        uploadDate: "2023-01-18",
        fileUrl: "/documents/afritextiles/supplier-agreements.pdf"
      }
    ],
    reviews: [
      {
        id: "rev1",
        reviewerName: "Tigist Haile",
        reviewerLocation: "Bole, Addis Ababa, Ethiopia",
        reviewerImageUrl: "/images/reviewers/tigist-haile.jpg",
        content: "AfriTextiles combines traditional craftsmanship with modern business acumen. Their growth trajectory is impressive and sustainable.",
        date: "2023-04-22"
      }
    ],
    detailsUrl: "/investments/afritextiles"
  }
];

// This function mimics what a data fetching function would do
export const fetchSmeData = async (): Promise<SME[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSmeData;
};

// Function to fetch a single SME by ID
export const fetchSmeById = async (id: string): Promise<SME | undefined> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSmeData.find(sme => sme.id === id);
};

// Function to fetch documents for an SME
export const fetchSmeDocuments = async (smeId: string): Promise<SME['documents']> => {
  const sme = await fetchSmeById(smeId);
  return sme?.documents || [];
};

// Function to fetch reviews for an SME
export const fetchSmeReviews = async (smeId: string): Promise<SME['reviews']> => {
  const sme = await fetchSmeById(smeId);
  return sme?.reviews || [];
};