'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PropertyFilterState, PropertyType, PropertyStyle } from '@/types'

interface PropertyFiltersProps {
  filters: PropertyFilterState
  onFiltersChange: (filters: PropertyFilterState) => void
}

export const PropertyFilters = ({ filters, onFiltersChange }: PropertyFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const propertyTypes: { value: PropertyType; label: string }[] = [
    { value: 'single-family', label: 'Single Family Home' },
    { value: 'condo', label: 'Condominium' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'penthouse', label: 'Penthouse' }
  ]

  const propertyStyles: { value: PropertyStyle | 'all'; label: string }[] = [
    { value: 'all', label: 'All Properties' },
    { value: 'new', label: 'New Construction' },
    { value: 'waterfront', label: 'Waterfront' },
    { value: 'no-waterfront', label: 'No Waterfront' }
  ]

  const priceRanges: { value: [number, number] | null; label: string }[] = [
    { value: null, label: 'All Price Ranges' },
    { value: [10000000, 25000000], label: '$10M - $25M' },
    { value: [25000000, 50000000], label: '$25M - $50M' },
    { value: [50000000, 100000000], label: '$50M - $100M' },
    { value: [100000000, Infinity], label: '$100M+' }
  ]

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  const handleFilterChange = (key: keyof PropertyFilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({})
  }

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100">
      {/* Desktop Filters */}
      <div className="hidden lg:block p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FunnelIcon className="w-5 h-5 text-ultralux-charcoal" />
            <h3 className="text-lg font-semibold text-ultralux-charcoal font-accent">
              Filter Properties
            </h3>
            {activeFiltersCount > 0 && (
              <span className="bg-ultralux-gold text-white px-2 py-1 rounded-full text-xs font-medium">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-ultralux-gold hover:text-ultralux-gold-dark font-medium text-sm transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-ultralux-charcoal mb-3">
              Property Type
            </label>
            <select
              value={filters.propertyType || ''}
              onChange={(e) => handleFilterChange('propertyType', e.target.value || undefined)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-ultralux-charcoal focus:ring-2 focus:ring-ultralux-gold focus:border-transparent transition-all font-medium"
            >
              <option value="">All Types</option>
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Property Style */}
          <div>
            <label className="block text-sm font-medium text-ultralux-charcoal mb-3">
              Property Style
            </label>
            <div className="flex flex-wrap gap-2">
              {propertyStyles.map(style => (
                <motion.button
                  key={style.value}
                  onClick={() => handleFilterChange('propertyStyle', style.value === 'all' ? undefined : style.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    (filters.propertyStyle === style.value) || (!filters.propertyStyle && style.value === 'all')
                      ? 'bg-ultralux-gold text-white shadow-md'
                      : 'bg-gray-100 text-ultralux-charcoal hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {style.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-ultralux-charcoal mb-3">
              Price Range
            </label>
            <select
              value={filters.priceRange ? `${filters.priceRange[0]}-${filters.priceRange[1]}` : ''}
              onChange={(e) => {
                const range = priceRanges.find(r => 
                  r.value && `${r.value[0]}-${r.value[1]}` === e.target.value
                )
                handleFilterChange('priceRange', range?.value || undefined)
              }}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-ultralux-charcoal focus:ring-2 focus:ring-ultralux-gold focus:border-transparent transition-all font-medium"
            >
              {priceRanges.map((range, index) => (
                <option 
                  key={index} 
                  value={range.value ? `${range.value[0]}-${range.value[1]}` : ''}
                >
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Neighborhood */}
          <div>
            <label className="block text-sm font-medium text-ultralux-charcoal mb-3">
              Neighborhood
            </label>
            <select
              value={filters.neighborhood || ''}
              onChange={(e) => handleFilterChange('neighborhood', e.target.value || undefined)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-ultralux-charcoal focus:ring-2 focus:ring-ultralux-gold focus:border-transparent transition-all font-medium"
            >
              <option value="">All Neighborhoods</option>
              <option value="fisher-island">Fisher Island</option>
              <option value="bal-harbour">Bal Harbour</option>
              <option value="star-island">Star Island</option>
              <option value="coral-gables">Coral Gables</option>
              <option value="indian-creek">Indian Creek</option>
              <option value="key-biscayne">Key Biscayne</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <FunnelIcon className="w-5 h-5 text-ultralux-charcoal" />
            <span className="font-semibold text-ultralux-charcoal">
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-ultralux-gold text-white px-2 py-1 rounded-full text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </span>
          </div>
          <motion.div
            animate={{ rotate: showMobileFilters ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-5 h-5 text-ultralux-charcoal" />
          </motion.div>
        </button>

        {/* Mobile Filters Content */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 space-y-6">
                {/* Property Type Mobile */}
                <div>
                  <label className="block text-sm font-medium text-ultralux-charcoal mb-3">
                    Property Type
                  </label>
                  <select
                    value={filters.propertyType || ''}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value || undefined)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-ultralux-charcoal focus:ring-2 focus:ring-ultralux-gold focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Style Mobile */}
                <div>
                  <label className="block text-sm font-medium text-ultralux-charcoal mb-3">
                    Property Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyStyles.map(style => (
                      <button
                        key={style.value}
                        onClick={() => handleFilterChange('propertyStyle', style.value === 'all' ? undefined : style.value)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          (filters.propertyStyle === style.value) || (!filters.propertyStyle && style.value === 'all')
                            ? 'bg-ultralux-gold text-white'
                            : 'bg-gray-100 text-ultralux-charcoal hover:bg-gray-200'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Mobile */}
                <div>
                  <label className="block text-sm font-medium text-ultralux-charcoal mb-3">
                    Price Range
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => handleFilterChange('priceRange', range.value || undefined)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                          (filters.priceRange && range.value && 
                           filters.priceRange[0] === range.value[0] && 
                           filters.priceRange[1] === range.value[1]) ||
                          (!filters.priceRange && !range.value)
                            ? 'bg-ultralux-gold text-white'
                            : 'bg-gray-100 text-ultralux-charcoal hover:bg-gray-200'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Mobile */}
                {activeFiltersCount > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={clearAllFilters}
                      className="w-full flex items-center justify-center space-x-2 p-3 border border-ultralux-gold text-ultralux-gold hover:bg-ultralux-gold hover:text-white rounded-lg transition-all font-medium"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      <span>Clear All Filters</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}