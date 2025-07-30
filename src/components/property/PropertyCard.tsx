'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { HeartIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  priority?: boolean
  viewMode?: 'grid' | 'list'
  onFavoriteToggle?: (propertyId: string) => void
  isFavorited?: boolean
}

export const PropertyCard = ({ 
  property, 
  priority = false,
  viewMode = 'grid',
  onFavoriteToggle,
  isFavorited = false
}: PropertyCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return `$${price.toLocaleString()}`
  }

  const formatAddress = (address: string) => {
    const parts = address.split(',')
    return parts.length > 1 ? parts.slice(0, 2).join(',') : address
  }

  const handleCardClick = () => {
    window.location.href = `/properties/${property.id}`
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFavoriteToggle?.(property.id)
  }

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this luxury property: ${formatPrice(property.price)}`,
        url: `${window.location.origin}/properties/${property.id}`,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/properties/${property.id}`)
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-card overflow-hidden group cursor-pointer hover:shadow-luxury transition-all duration-500"
        whileHover={{ y: -2 }}
        onClick={handleCardClick}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden">
            <Image
              src={property.mainImage}
              alt={property.title}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-700 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              priority={priority}
              sizes="(max-width: 768px) 100vw, 40vw"
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-ultralux-gold border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Status Badge */}
            {property.status && property.status !== 'active' && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-ultralux-gold text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {property.status}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                onClick={handleFavoriteClick}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isFavorited ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-700" />
                )}
              </motion.button>
              <motion.button
                onClick={handleShareClick}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShareIcon className="w-5 h-5 text-gray-700" />
              </motion.button>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-ultralux-charcoal mb-2 line-clamp-2 group-hover:text-ultralux-gold transition-colors duration-300">
                  {property.title}
                </h3>
                <p className="text-ultralux-gray text-lg">
                  {formatAddress(property.address)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-ultralux-charcoal">
                  {formatPrice(property.price)}
                </p>
                {property.sqft && (
                  <p className="text-sm text-ultralux-gray">
                    ${Math.round(property.price / property.sqft)}/sqft
                  </p>
                )}
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center space-x-6 mb-4 text-ultralux-gray">
              <span className="flex items-center">
                <span className="font-semibold text-ultralux-charcoal">{property.bedrooms}</span>
                <span className="ml-1">bed</span>
              </span>
              <span className="flex items-center">
                <span className="font-semibold text-ultralux-charcoal">{property.bathrooms}</span>
                <span className="ml-1">bath</span>
              </span>
              {property.sqft && (
                <span className="flex items-center">
                  <span className="font-semibold text-ultralux-charcoal">{property.sqft.toLocaleString()}</span>
                  <span className="ml-1">sqft</span>
                </span>
              )}
            </div>

            {/* Key Features */}
            {property.keyFeatures && property.keyFeatures.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {property.keyFeatures.slice(0, 4).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                  {property.keyFeatures.length > 4 && (
                    <span className="bg-ultralux-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                      +{property.keyFeatures.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Agent Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <Image
                  src={property.agent.image}
                  alt={property.agent.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-ultralux-charcoal">{property.agent.name}</p>
                  <p className="text-sm text-ultralux-gray">Luxury Specialist</p>
                </div>
              </div>
              <motion.button
                className="flex items-center space-x-1 text-ultralux-gold hover:text-ultralux-gold-dark font-medium transition-colors"
                whileHover={{ x: 4 }}
              >
                <EyeIcon className="w-4 h-4" />
                <span>View Details</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid View
  return (
    <motion.div
      className="bg-white rounded-xl shadow-card overflow-hidden group cursor-pointer hover:shadow-luxury transition-all duration-500"
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.mainImage}
          alt={property.title}
          fill
          className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-ultralux-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Price & Location Overlay */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-2xl font-bold text-white mb-1">
            {formatPrice(property.price)}
          </p>
          <p className="text-white/90 text-sm">
            {formatAddress(property.address)}
          </p>
        </div>

        {/* Status Badge */}
        {property.status && property.status !== 'active' && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-ultralux-gold text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              {property.status}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={handleFavoriteClick}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isFavorited ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-700" />
            )}
          </motion.button>
          <motion.button
            onClick={handleShareClick}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShareIcon className="w-5 h-5 text-gray-700" />
          </motion.button>
        </div>

        {/* Image Counter */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
            1 / {property.images.length}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-ultralux-charcoal mb-2 line-clamp-2 group-hover:text-ultralux-gold transition-colors duration-300">
          {property.title}
        </h3>
        
        <p className="text-ultralux-gray mb-4">
          {formatAddress(property.address)}
        </p>

        {/* Property Meta */}
        <div className="flex items-center space-x-4 text-sm text-ultralux-gray mb-4">
          <span className="flex items-center">
            <span className="font-semibold text-ultralux-charcoal">{property.bedrooms}</span>
            <span className="ml-1">bed</span>
          </span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span className="flex items-center">
            <span className="font-semibold text-ultralux-charcoal">{property.bathrooms}</span>
            <span className="ml-1">bath</span>
          </span>
          {property.sqft && (
            <>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="flex items-center">
                <span className="font-semibold text-ultralux-charcoal">{property.sqft.toLocaleString()}</span>
                <span className="ml-1">sqft</span>
              </span>
            </>
          )}
        </div>

        {/* Key Features */}
        {property.keyFeatures && property.keyFeatures.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {property.keyFeatures.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                >
                  {feature}
                </span>
              ))}
              {property.keyFeatures.length > 3 && (
                <span className="bg-ultralux-gold text-white px-2 py-1 rounded text-xs font-medium">
                  +{property.keyFeatures.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Agent Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Image
              src={property.agent.image}
              alt={property.agent.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-ultralux-charcoal text-sm">{property.agent.name}</p>
              <p className="text-xs text-ultralux-gray">Luxury Specialist</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-ultralux-charcoal">
              {formatPrice(property.price)}
            </p>
            {property.sqft && (
              <p className="text-xs text-ultralux-gray">
                ${Math.round(property.price / property.sqft)}/sqft
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}