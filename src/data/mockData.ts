import { Property, Neighborhood, Agent } from '@/types'

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Ivan Chorney',
    email: 'ivan@ultralux.com',
    phone: '+1 (305) 555-0123',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Luxury real estate specialist with over 15 years of experience in Miami\'s ultra-high-end market.',
    specialties: ['Waterfront Properties', 'New Construction', 'Investment Properties']
  },
  {
    id: '2',
    name: 'Mike Martirena',
    email: 'mike@ultralux.com',
    phone: '+1 (305) 555-0124',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    bio: 'Award-winning agent specializing in luxury condominiums and penthouses in Miami\'s most exclusive neighborhoods.',
    specialties: ['Penthouses', 'Luxury Condos', 'International Clients']
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    email: 'sofia@ultralux.com',
    phone: '+1 (305) 555-0125',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b865?w=400&h=400&fit=crop&crop=face',
    bio: 'Bilingual luxury specialist with expertise in Coral Gables and Pinecrest markets.',
    specialties: ['Single Family Homes', 'Historic Properties', 'Family Estates']
  }
]

// Mock Neighborhoods
export const mockNeighborhoods: Neighborhood[] = [
  {
    slug: 'fisher-island',
    name: 'Fisher Island',
    description: 'The most exclusive private island community in Miami, accessible only by ferry or yacht.',
    averagePrice: 25400000,
    totalProperties: 12,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'
  },
  {
    slug: 'bal-harbour',
    name: 'Bal Harbour',
    description: 'Sophisticated beachfront living with world-class shopping and dining.',
    averagePrice: 18700000,
    totalProperties: 24,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
  },
  {
    slug: 'star-island',
    name: 'Star Island',
    description: 'Celebrity-favorite island with stunning waterfront estates and complete privacy.',
    averagePrice: 35200000,
    totalProperties: 8,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
  },
  {
    slug: 'coral-gables',
    name: 'Coral Gables',
    description: 'Historic Mediterranean Revival architecture meets modern luxury living.',
    averagePrice: 12800000,
    totalProperties: 18,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
  },
  {
    slug: 'indian-creek',
    name: 'Indian Creek',
    description: 'Ultra-exclusive island village known as "Billionaire Bunker" with unparalleled security.',
    averagePrice: 45600000,
    totalProperties: 6,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop'
  },
  {
    slug: 'key-biscayne',
    name: 'Key Biscayne',
    description: 'Tropical island paradise with pristine beaches and family-friendly luxury.',
    averagePrice: 16200000,
    totalProperties: 15,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  }
]

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: '1',
    mlsId: 'A11234567',
    title: 'Spectacular Waterfront Estate on Fisher Island',
    address: '7942 Fisher Island Dr, Miami Beach, FL 33109',
    neighborhood: 'Fisher Island',
    price: 28500000,
    bedrooms: 6,
    bathrooms: 8,
    sqft: 12500,
    type: 'single-family',
    style: 'waterfront',
    status: 'active',
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop'
    ],
    keyFeatures: ['Ocean Views', 'Private Dock', 'Wine Cellar', 'Home Theater', 'Pool & Spa'],
    description: 'Magnificent waterfront estate offering unparalleled luxury and privacy on exclusive Fisher Island.',
    agent: mockAgents[0],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    aiAnalysis: {
      pros: ['Prime Fisher Island location', 'Direct ocean access', 'Stunning architectural design', 'Complete privacy'],
      cons: ['Ferry access only', 'High maintenance costs'],
      marketInsights: 'Fisher Island properties have appreciated 12% year-over-year, making this an excellent investment opportunity.',
      investmentAnalysis: 'This property represents exceptional value in the ultra-luxury market with strong rental potential.',
      score: 9.2
    }
  },
  {
    id: '2',
    mlsId: 'A11234568',
    title: 'Ultra-Modern Penthouse in Bal Harbour',
    address: '10201 Collins Ave PH, Bal Harbour, FL 33154',
    neighborhood: 'Bal Harbour',
    price: 22000000,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 8200,
    type: 'penthouse',
    style: 'new',
    status: 'active',
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&h=800&fit=crop'
    ],
    keyFeatures: ['360° Views', 'Smart Home Technology', 'Private Elevator', 'Rooftop Terrace'],
    description: 'Breathtaking penthouse with panoramic ocean and city views in prestigious Bal Harbour.',
    agent: mockAgents[1],
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: '3',
    mlsId: 'A11234569',
    title: 'Magnificent Estate on Star Island',
    address: '46 Star Island Dr, Miami Beach, FL 33139',
    neighborhood: 'Star Island',
    price: 42000000,
    bedrooms: 8,
    bathrooms: 12,
    sqft: 18500,
    type: 'single-family',
    style: 'waterfront',
    status: 'new',
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop'
    ],
    keyFeatures: ['Private Beach', 'Guest House', 'Tennis Court', 'Helicopter Pad', 'Art Gallery'],
    description: 'Unparalleled luxury estate on exclusive Star Island with 200 feet of waterfront.',
    agent: mockAgents[0],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    mlsId: 'A11234570',
    title: 'Historic Mediterranean Villa in Coral Gables',
    address: '1234 Coral Way, Coral Gables, FL 33134',
    neighborhood: 'Coral Gables',
    price: 15800000,
    bedrooms: 7,
    bathrooms: 9,
    sqft: 11200,
    type: 'single-family',
    style: 'no-waterfront',
    status: 'active',
    mainImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop'
    ],
    keyFeatures: ['Historic Architecture', 'Lush Gardens', 'Original Details', 'Chef\'s Kitchen'],
    description: 'Beautifully restored Mediterranean villa showcasing timeless elegance and modern amenities.',
    agent: mockAgents[2],
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    mlsId: 'A11234571',
    title: 'Contemporary Luxury Condo in Bal Harbour',
    address: '9705 Collins Ave #2301, Bal Harbour, FL 33154',
    neighborhood: 'Bal Harbour',
    price: 12500000,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 4800,
    type: 'condo',
    style: 'new',
    status: 'active',
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop'
    ],
    keyFeatures: ['Ocean Views', 'High-End Finishes', 'Concierge Service', 'Beach Access'],
    description: 'Sophisticated contemporary residence with direct beach access and five-star amenities.',
    agent: mockAgents[1],
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z'
  },
  {
    id: '6',
    mlsId: 'A11234572',
    title: 'Exclusive Waterfront Estate on Key Biscayne',
    address: '658 Harbor Dr, Key Biscayne, FL 33149',
    neighborhood: 'Key Biscayne',
    price: 19200000,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 9500,
    type: 'single-family',
    style: 'waterfront',
    status: 'active',
    mainImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop'
    ],
    keyFeatures: ['Bayfront Location', 'Deep Water Dock', 'Resort-Style Pool', 'Outdoor Kitchen'],
    description: 'Stunning bayfront estate offering the perfect blend of tropical luxury and sophisticated design.',
    agent: mockAgents[2],
    createdAt: '2024-01-10T13:00:00Z',
    updatedAt: '2024-01-10T13:00:00Z'
  },
  {
    id: '7',
    mlsId: 'A11234573',
    title: 'Billionaire Bunker Mansion on Indian Creek',
    address: '4 Indian Creek Island Rd, Indian Creek, FL 33154',
    neighborhood: 'Indian Creek',
    price: 55000000,
    bedrooms: 10,
    bathrooms: 15,
    sqft: 22000,
    type: 'single-family',
    style: 'waterfront',
    status: 'active',
    mainImage: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&h=800&fit=crop'
    ],
    keyFeatures: ['Ultra-Private Island', 'Golf Course Views', 'Professional Security', 'Multiple Pools', 'Wine Room'],
    description: 'The ultimate in privacy and luxury on the world-renowned Indian Creek Island.',
    agent: mockAgents[0],
    createdAt: '2024-01-09T08:30:00Z',
    updatedAt: '2024-01-09T08:30:00Z'
  },
  {
    id: '8',
    mlsId: 'A11234574',
    title: 'Modern Architectural Masterpiece in Coral Gables',
    address: '789 Miracle Mile, Coral Gables, FL 33134',
    neighborhood: 'Coral Gables',
    price: 11200000,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7800,
    type: 'single-family',
    style: 'new',
    status: 'pending',
    mainImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop'
    ],
    keyFeatures: ['Modern Design', 'Smart Technology', 'Infinity Pool', 'Green Building'],
    description: 'Award-winning contemporary design meets sustainable luxury in prestigious Coral Gables.',
    agent: mockAgents[2],
    createdAt: '2024-01-08T15:45:00Z',
    updatedAt: '2024-01-08T15:45:00Z'
  }
]

// Helper functions
export const getPropertiesByNeighborhood = (neighborhood: string): Property[] => {
  return mockProperties.filter(property => 
    property.neighborhood.toLowerCase() === neighborhood.toLowerCase()
  )
}

export const getNeighborhoodBySlug = (slug: string): Neighborhood | undefined => {
  return mockNeighborhoods.find(neighborhood => neighborhood.slug === slug)
}

export const getFeaturedProperties = (count: number = 6): Property[] => {
  return mockProperties
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count)
}