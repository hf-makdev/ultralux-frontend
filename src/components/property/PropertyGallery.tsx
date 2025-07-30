'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PropertyCard } from './PropertyCard'
import { PropertyFilters } from './PropertyFilters'
import { Property, PropertyFilterState } from '@/types'

interface PropertyGalleryProps {
  properties: Property[]
  neighborhood?: string
  initialFilters?: PropertyFilterState
  loading?: boolean
}

export const PropertyGallery = ({ 
  properties, 
  neighborhood,
  initialFilters = {},
  loading = false
}: PropertyGalleryProps) => {
  const [filters, setFilters] = useState<PropertyFilterState>(initialFilters)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'newest' | 'size'>('price-desc')

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter(property => {
      if (filters.propertyType && property.type !== filters.propertyType) {
        return false
      }
      if (filters.propertyStyle && property.style !== filters.propertyStyle) {
        return false
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange
        if (property.price < min || property.price > max) {
          return false
        }
      }
      return true
    })

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-desc':
          return b.price - a.price
        case 'price-asc':
          return a.price - b.price
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'size':
          return (b.sqft || 0) - (a.sqft || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [properties, filters, sortBy])

  if (loading) {
    return <PropertyGallerySkeleton />
  }

  return (
    <div className="bg-white py-12">
      <div className="luxury-container">
        {/* Gallery Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-ultralux-charcoal mb-4">
              {neighborhood ? (
                <>
                  Ultra-Luxury Properties in{' '}
                  <span className="text-ultralux-gold">{neighborhood}</span>
                </>
              ) : (
                'Ultra-Luxury Properties'
              )}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-ultralux-gray"
              >
                <span className="font-semibold text-ultralux-charcoal">
                  {filteredAndSortedProperties.length}
                </span>{' '}
                exceptional properties available
                {filteredAndSortedProperties.length > 0 && (
                  <span className="text-sm ml-2">
                    • Starting from ${Math.min(...filteredAndSortedProperties.map(p => p.price)).toLocaleString()}
                  </span>
                )}
              </motion.p>

              {/* View Controls */}
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-ultralux-charcoal focus:ring-2 focus:ring-ultralux-gold focus:border-transparent font-medium"
                >
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="newest">Newest First</option>
                  <option value="size">Largest First</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-white text-ultralux-charcoal shadow-sm'
                        : 'text-gray-600 hover:text-ultralux-charcoal'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-white text-ultralux-charcoal shadow-sm'
                        : 'text-gray-600 hover:text-ultralux-charcoal'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <PropertyFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
          </motion.div>
        </div>

        {/* Properties Grid/List */}
        <AnimatePresence mode="wait">
          {filteredAndSortedProperties.length > 0 ? (
            <motion.div
              key={`${viewMode}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
              {filteredAndSortedProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                >
                  <PropertyCard
                    property={property}
                    priority={index < 6} // Prioritize first 6 images
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState onClearFilters={() => setFilters({})} />
          )}
        </AnimatePresence>

        {/* Load More / Pagination */}
        {filteredAndSortedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <button className="luxury-button luxury-button-primary">
              Load More Properties
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

const PropertyGallerySkeleton = () => (
  <div className="bg-white py-12">
    <div className="luxury-container">
      <div className="mb-12">
        <div className="h-12 bg-gray-200 rounded-lg mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded mb-8 w-1/3 animate-pulse" />
        <div className="h-20 bg-gray-200 rounded-xl animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4" />
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  </div>
)

const EmptyState = ({ onClearFilters }: { onClearFilters: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="text-center py-20"
  >
    <div className="max-w-md mx-auto">
      {/* Luxury Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-ultralux-gold to-ultralux-gold-dark rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <svg 
          className="w-10 h-10 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </motion.div>

      <h3 className="text-2xl font-display font-bold text-ultralux-charcoal mb-4">
        No Properties Found
      </h3>
      
      <p className="text-ultralux-gray mb-8 leading-relaxed">
        We couldn't find any properties matching your criteria. 
        Try adjusting your filters to discover more luxury properties.
      </p>

      <motion.button
        onClick={onClearFilters}
        className="luxury-button luxury-button-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Clear All Filters
      </motion.button>
    </div>
  </motion.div>
)