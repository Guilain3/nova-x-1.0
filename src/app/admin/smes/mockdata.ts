// /admin/sme/mockData.ts

export const smeList = [
    {
      id: "1",
      businessName: "TechGrow Ltd",
      status: "PENDING",
      email: "info@techgrow.com",
      phone: "+250788000001",
      kycDocuments: [
        { id: "k1", type: "ID", status: "PENDING", fileUrl: "#" },
        { id: "k2", type: "TIN", status: "PENDING", fileUrl: "#" },
      ],
      subscription: null,
    },
    {
      id: "2",
      businessName: "AgriChain",
      status: "APPROVED",
      email: "contact@agrichain.com",
      phone: "+250788000002",
      kycDocuments: [
        { id: "k1", type: "ID", status: "APPROVED", fileUrl: "#" },
      ],
      subscription: {
        plan: "Premium",
        expiresOn: "2025-12-31",
      },
    },
    {
      id: "3",
      businessName: "HealthBridge",
      status: "SUSPENDED",
      email: "hello@healthbridge.com",
      phone: "+250788000003",
      kycDocuments: [],
      subscription: null,
    },
    {
      id: "4",
      businessName: "QuickPay",
      status: "REJECTED",
      email: "support@quickpay.com",
      phone: "+250788000004",
      kycDocuments: [],
      subscription: null,
    },
  ];
  