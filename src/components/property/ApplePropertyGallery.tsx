'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Squares2X2Icon, 
  ListBulletIcon, 
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Property, PropertyFilterState } from '@/types'
import { ApplePropertyCard } from './ApplePropertyCard'
import { PropertyFilters } from './PropertyFilters'

interface ApplePropertyGalleryProps {
  properties: Property[]
  loading?: boolean
  showFilters?: boolean
}

export const ApplePropertyGallery = ({ 
  properties, 
  loading = false, 
  showFilters = true 
}: ApplePropertyGalleryProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<PropertyFilterState>({})

  // Filter and search properties
  const filteredProperties = useMemo(() => {
    let filtered = [...properties]

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.neighborhood.toLowerCase().includes(query) ||
        property.keyFeatures?.some(feature => 
          feature.toLowerCase().includes(query)
        )
      )
    }

    // Apply filters
    if (filters.propertyType) {
      filtered = filtered.filter(property => property.type === filters.propertyType)
    }

    if (filters.propertyStyle) {
      filtered = filtered.filter(property => property.style === filters.propertyStyle)
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      filtered = filtered.filter(property => 
        property.price >= min && property.price <= max
      )
    }

    if (filters.neighborhood) {
      filtered = filtered.filter(property => 
        property.neighborhood.toLowerCase().replace(/\s+/g, '-') === filters.neighborhood
      )
    }

    return filtered
  }, [properties, searchQuery, filters])

  const handleFavoriteToggle = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId)
      } else {
        newFavorites.add(propertyId)
      }
      return newFavorites
    })
  }

  const clearAllFilters = () => {
    setFilters({})
    setSearchQuery('')
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0)

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="h-8 bg-gray-200 rounded-button w-48 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-20 bg-gray-200 rounded-button animate-pulse" />
            <div className="h-10 w-20 bg-gray-200 rounded-button animate-pulse" />
          </div>
        </div>
        
        {/* Loading Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-apple shadow-card overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header with Search and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ultralux-gray" />
          <input
            type="text"
            placeholder="Search properties, neighborhoods, features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-apple focus:ring-2 focus:ring-ultralux-gold/20 focus:border-ultralux-gold transition-all duration-200 text-sm font-medium placeholder-ultralux-gray"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-4 h-4 text-ultralux-gray" />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Results Count */}
          <div className="text-sm text-ultralux-gray font-medium">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-button p-1">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-button transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white text-ultralux-charcoal shadow-apple'
                  : 'text-ultralux-gray hover:text-ultralux-charcoal'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Squares2X2Icon className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-button transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white text-ultralux-charcoal shadow-apple'
                  : 'text-ultralux-gray hover:text-ultralux-charcoal'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ListBulletIcon className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Filters Toggle */}
          {showFilters && (
            <motion.button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`flex items-center gap-2 px-4 py-2 rounded-button border transition-all duration-200 ${
                showFiltersPanel || activeFiltersCount > 0
                  ? 'bg-ultralux-gold text-white border-ultralux-gold'
                  : 'bg-white text-ultralux-charcoal border-gray-200 hover:border-ultralux-gold'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FunnelIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      <AnimatePresence>
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 p-4 bg-ultralux-gold/5 rounded-apple border border-ultralux-gold/20"
          >
            <span className="text-sm font-medium text-ultralux-charcoal">
              Active filters:
            </span>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="bg-ultralux-gold/10 text-ultralux-gold px-3 py-1 rounded-full text-xs font-medium">
                  Search: "{searchQuery}"
                </span>
              )}
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null
                let displayValue = value
                if (key === 'priceRange' && Array.isArray(value)) {
                  displayValue = `$${(value[0] / 1000000).toFixed(1)}M - $${(value[1] / 1000000).toFixed(1)}M`
                }
                return (
                  <span key={key} className="bg-ultralux-gold/10 text-ultralux-gold px-3 py-1 rounded-full text-xs font-medium">
                    {displayValue}
                  </span>
                )
              })}
            </div>
            <motion.button
              onClick={clearAllFilters}
              className="ml-auto text-ultralux-gold hover:text-ultralux-gold-dark text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Clear all
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFiltersPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Properties Grid/List */}
      <AnimatePresence mode="wait">
        {filteredProperties.length > 0 ? (
          <motion.div
            key={`${viewMode}-${filteredProperties.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'
                : 'space-y-6 lg:space-y-8'
            }
          >
            {filteredProperties.map((property, index) => (
              <ApplePropertyCard
                key={property.id}
                property={property}
                viewMode={viewMode}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorited={favorites.has(property.id)}
                index={index}
                priority={index < 3}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 lg:py-24"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="w-12 h-12 text-ultralux-gray" />
              </div>
              <h3 className="text-xl font-display font-bold text-ultralux-charcoal mb-3">
                No properties found
              </h3>
              <p className="text-ultralux-gray mb-6">
                Try adjusting your search criteria or filters to find more properties.
              </p>
              {activeFiltersCount > 0 && (
                <motion.button
                  onClick={clearAllFilters}
                  className="inline-flex items-center px-6 py-3 bg-ultralux-gold text-white rounded-apple font-medium hover:bg-ultralux-gold-dark transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear all filters
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}