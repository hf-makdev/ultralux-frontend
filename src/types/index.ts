// UltraLux Type Definitions

export interface Property {
  id: string
  mlsId: string
  title: string
  address: string
  neighborhood: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft?: number
  type: PropertyType
  style?: PropertyStyle
  status?: PropertyStatus
  mainImage: string
  images: string[]
  videos?: PropertyVideo[]
  keyFeatures?: string[]
  description?: string
  aiAnalysis?: PropertyAnalysis
  agent: Agent
  createdAt: string
  updatedAt: string
}

export interface PropertyAnalysis {
  pros: string[]
  cons: string[]
  marketInsights: string
  investmentAnalysis: string
  score: number
}

export interface PropertyVideo {
  url: string
  type: 'tour' | 'drone' | 'lifestyle'
  thumbnail: string
  duration?: number
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  image: string
  bio?: string
  specialties: string[]
}

export interface Neighborhood {
  slug: string
  name: string
  description: string
  averagePrice: number
  totalProperties: number
  image: string
}

export interface MarketStats {
  averagePrice: number
  activeListings: number
  recentSales: number
  priceTrend: 'up' | 'down' | 'stable'
  medianPricePerSqft: number
  averageDaysOnMarket: number
}

export type PropertyType = 'single-family' | 'condo' | 'townhouse' | 'penthouse'
export type PropertyStyle = 'new' | 'waterfront' | 'no-waterfront'
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'new'

export interface PropertyFilterState {
  propertyType?: PropertyType
  propertyStyle?: PropertyStyle
  priceRange?: [number, number]
  neighborhood?: string
}

export interface LeadCaptureData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  propertyId: string
}

export interface PropertySearchFilters {
  priceRange?: [number, number]
  propertyType?: PropertyType
  propertyStyle?: PropertyStyle
  neighborhood?: string
  limit?: number
  offset?: number
}