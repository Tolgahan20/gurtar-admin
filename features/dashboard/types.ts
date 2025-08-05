export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  banned: number;
  retentionRate: number;
  avgLoginFrequency: number;
  avgOrdersPerUser: number;
  avgSpendingPerUser: number;
  growthRate: number;
}

export interface BusinessStats {
  total: number;
  active: number;
  inactive: number;
  verified: number;
  unverified: number;
  byCity: Record<string, number>;
  growthRate: number;
  avgResponseTime: number;
  avgOrdersPerBusiness: number;
  avgRevenuePerBusiness: number;
}

export interface ContactStats {
  total: number;
  pending: number;
  resolved: number;
  trend: number;
  status: string;
}

export interface OrderStats {
  total: number;
  totalCo2Saved: number;
  totalMoneySaved: number;
  avgOrderValue: number;
  avgCo2SavedPerOrder: number;
  growthRate: number;
  peakHours: Record<string, number>;
  peakDays: Record<string, number>;
}

export interface RegistrationStats {
  daily: number;
  weekly: number;
  monthly: number;
  biMonthly: number;
}

export interface CategoryData {
  categoryId: string;
  name: string;
  orderCount: number;
  percentage: number;
}

export interface BusinessCategoryData {
  categoryId: string;
  name: string;
  businessCount: number;
  percentage: number;
}

export interface CategoryStats {
  popularByOrders: CategoryData[];
  popularByBusinesses: BusinessCategoryData[];
  growthRates: Record<string, number>;
}

export interface CityStats {
  mostActiveByOrders: string[];
  mostActiveByUsers: string[];
  growthRates: Record<string, number>;
}

export interface SatisfactionStats {
  avgRating: number;
  ratingDistribution: Record<string, number>;
  avgResponseTime: number;
  satisfactionTrend: number;
}

export interface SavingsStats {
  businessCo2Saved: Record<string, number>;
  businessMoneySaved: Record<string, number>;
  userCo2Saved: Record<string, number>;
  userMoneySaved: Record<string, number>;
}

export interface DashboardStats {
  users: UserStats;
  businesses: BusinessStats;
  contact: ContactStats;
  orders: OrderStats;
  registrations: RegistrationStats;
  categories: CategoryStats;
  cities: CityStats;
  satisfaction: SatisfactionStats;
  businessCo2Saved: Record<string, number>;
  businessMoneySaved: Record<string, number>;
  userCo2Saved: Record<string, number>;
  userMoneySaved: Record<string, number>;
}

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
} 