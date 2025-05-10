export interface EducationCategory {
    id: string;
    label: string;
  }
  
  export interface EducationResource {
    id: number;
    title: string;
    author: string;
    category: string;
    thumbnail: string;
    videoUrl: string;
  }
  
  export interface FinancingOption {
    id: number;
    name: string;
    period: string;
    amount: string;
    frequency: string;
    icon: string;
  }
  
  export interface ImprovementStep {
    id: number;
    title: string;
    type: string;
    icon: string;
    content: string;
    expanded: boolean;
    cta: string;
  }
  
  export interface SupportOption {
    id: number;
    title: string;
    icon: string;
  }
  
  export interface IneligibilityReason {
    id: number;
    title: string;
    description: string;
    canUpload: boolean;
  }