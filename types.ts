export interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  src: string;
  category: 'residential' | 'commercial' | 'interior' | 'high-rise';
  title: string;
}

export interface SocialLink {
  platform: 'LinkedIn' | 'Instagram' | 'Facebook' | 'TikTok' | 'YouTube';
  url: string;
  handle: string;
}

export enum GeneratorTone {
  PROFESSIONAL = 'Professional',
  LUXURY = 'Luxury',
  URGENT = 'Urgent / Opportunity', 
  STORYTELLING = 'Storytelling',
  VIRAL = 'Viral / High Energy', // New
  EDUCATIONAL = 'Educational / Expert' // New
}

export enum PlatformType {
  LINKEDIN = 'LinkedIn',
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram Caption',
  TIKTOK = 'TikTok / Reels Script', // Updated
  EMAIL = 'Email Blast',
  MLS = 'MLS Listing Description',
  HOOKS = 'Viral Hooks List' // New
}

export enum TargetAudience {
  HOMEBUYER = 'Homebuyer (Emotional)',
  INVESTOR = 'Investor (Numbers/ROI)'
}

// --- WHOLESALE ENGINE TYPES ---

export enum DealType {
  RAW_LAND = 'Raw Land',
  INFILL_LOT = 'Infill Lot (Urban)',
  INDUSTRIAL_FLEX = 'Industrial / Flex Space',
  TRUCK_PARKING = 'Truck Parking / Outdoor Storage',
  RESIDENTIAL_FIXER = 'Residential Fixer'
}

export enum OutreachStyle {
  DIRECT_BROKER = 'Professional / Broker Approach',
  PROBLEM_SOLVER = 'Problem Solver (Tax/Title Issues)',
  DEVELOPER = 'Developer / End-Buyer (Land Focus)',
  NEIGHBOR = 'Friendly Neighbor / Local'
}

export interface DealAnalysis {
  arv: number;
  repairs: number;
  sqftOrAcres: number;
  purchasePrice: number;
  strategy: 'FLIP' | 'WHOLESALE' | 'BUY_HOLD';
}