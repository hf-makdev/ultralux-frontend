'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { HeartIcon, ShareIcon, EyeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Property } from '@/types'

interface ApplePropertyCardProps {
  property: Property
  priority?: boolean
  viewMode?: 'grid' | 'list'
  onFavoriteToggle?: (propertyId: string) => void
  isFavorited?: boolean
  index?: number
}

export const ApplePropertyCard = ({ 
  property, 
  priority = false,
  viewMode = 'grid',
  onFavoriteToggle,
  isFavorited = false,
  index = 0
}: ApplePropertyCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        className="bg-white rounded-apple shadow-card border border-gray-100/50 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-apple-lg"
        whileHover={{ y: -4, scale: 1.01 }}
        onClick={handleCardClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative lg:w-2/5 aspect-[4/3] lg:aspect-auto overflow-hidden">
            <Image
              src={property.mainImage}
              alt={property.title}
              fill
              className={`object-cover transition-all duration-500 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-105' : 'scale-100'}`}
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 40vw"
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-ultralux-gold border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Status Badge */}
            {property.status && property.status !== 'active' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 left-4 z-10"
              >
                <span className="bg-ultralux-gold text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {property.status}
                </span>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              className="absolute top-4 right-4 z-10 flex space-x-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                onClick={handleFavoriteClick}
                className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-apple hover:bg-white transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isFavorited ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-ultralux-charcoal" />
                )}
              </motion.button>
              <motion.button
                onClick={handleShareClick}
                className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-apple hover:bg-white transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShareIcon className="w-5 h-5 text-ultralux-charcoal" />
              </motion.button>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-display font-bold text-ultralux-charcoal mb-2 line-clamp-2 group-hover:text-ultralux-gold transition-colors duration-300">
                  {property.title}
                </h3>
                <div className="flex items-center text-ultralux-gray text-base lg:text-lg mb-4">
                  <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  {formatAddress(property.address)}
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl lg:text-3xl font-bold text-ultralux-charcoal font-display">
                  {formatPrice(property.price)}
                </p>
                {property.sqft && (
                  <p className="text-sm text-ultralux-gray mt-1">
                    ${Math.round(property.price / property.sqft)}/sqft
                  </p>
                )}
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center space-x-6 mb-6 text-ultralux-gray">
              <div className="flex items-center">
                <span className="font-semibold text-ultralux-charcoal text-lg">{property.bedrooms}</span>
                <span className="ml-1 text-sm">bed{property.bedrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="w-1 h-1 bg-ultralux-gray rounded-full" />
              <div className="flex items-center">
                <span className="font-semibold text-ultralux-charcoal text-lg">{property.bathrooms}</span>
                <span className="ml-1 text-sm">bath{property.bathrooms !== 1 ? 's' : ''}</span>
              </div>
              {property.sqft && (
                <>
                  <div className="w-1 h-1 bg-ultralux-gray rounded-full" />
                  <div className="flex items-center">
                    <span className="font-semibold text-ultralux-charcoal text-lg">{property.sqft.toLocaleString()}</span>
                    <span className="ml-1 text-sm">sqft</span>
                  </div>
                </>
              )}
            </div>

            {/* Key Features */}
            {property.keyFeatures && property.keyFeatures.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {property.keyFeatures.slice(0, 4).map((feature, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-ultralux-gold/10 text-ultralux-gold px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </motion.span>
                  ))}
                  {property.keyFeatures.length > 4 && (
                    <span className="bg-ultralux-charcoal text-white px-3 py-1.5 rounded-full text-sm font-medium">
                      +{property.keyFeatures.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Agent Info */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <Image
                  src={property.agent.image}
                  alt={property.agent.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-ultralux-charcoal">{property.agent.name}</p>
                  <p className="text-sm text-ultralux-gray">Luxury Specialist</p>
                </div>
              </div>
              <motion.button
                className="flex items-center space-x-2 text-ultralux-gold hover:text-ultralux-gold-dark font-medium transition-colors"
                whileHover={{ x: 4 }}
              >
                <EyeIcon className="w-4 h-4" />
                <span className="text-sm">View Details</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  // Grid View
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="bg-white rounded-apple shadow-card border border-gray-100/50 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-apple-lg"
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={handleCardClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.mainImage}
          alt={property.title}
          fill
          className={`object-cover transition-all duration-500 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-ultralux-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Image Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Price & Location Overlay */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 20, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xl lg:text-2xl font-bold font-display mb-1">
            {formatPrice(property.price)}
          </p>
          <div className="flex items-center text-white/90 text-sm">
            <MapPinIcon className="w-3 h-3 mr-1" />
            {formatAddress(property.address)}
          </div>
        </motion.div>

        {/* Status Badge */}
        {property.status && property.status !== 'active' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 left-4 z-10"
          >
            <span className="bg-ultralux-gold text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
              {property.status}
            </span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="absolute top-4 right-4 z-10 flex space-x-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={handleFavoriteClick}
            className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-apple hover:bg-white transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isFavorited ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-ultralux-charcoal" />
            )}
          </motion.button>
          <motion.button
            onClick={handleShareClick}
            className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-apple hover:bg-white transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShareIcon className="w-5 h-5 text-ultralux-charcoal" />
          </motion.button>
        </motion.div>

        {/* Image Counter */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded-button text-xs backdrop-blur-sm">
            1 / {property.images.length}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 lg:p-6">
        <h3 className="text-lg lg:text-xl font-display font-bold text-ultralux-charcoal mb-2 line-clamp-2 group-hover:text-ultralux-gold transition-colors duration-300">
          {property.title}
        </h3>
        
        <div className="flex items-center text-ultralux-gray mb-4 text-sm">
          <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
          {formatAddress(property.address)}
        </div>

        {/* Property Meta */}
        <div className="flex items-center space-x-4 text-sm text-ultralux-gray mb-4">
          <div className="flex items-center">
            <span className="font-semibold text-ultralux-charcoal">{property.bedrooms}</span>
            <span className="ml-1">bed</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
          <div className="flex items-center">
            <span className="font-semibold text-ultralux-charcoal">{property.bathrooms}</span>
            <span className="ml-1">bath</span>
          </div>
          {property.sqft && (
            <>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="flex items-center">
                <span className="font-semibold text-ultralux-charcoal">{property.sqft.toLocaleString()}</span>
                <span className="ml-1">sqft</span>
              </div>
            </>
          )}
        </div>

        {/* Key Features */}
        {property.keyFeatures && property.keyFeatures.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {property.keyFeatures.slice(0, 3).map((feature, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-ultralux-gold/10 text-ultralux-gold px-2 py-1 rounded-button text-xs font-medium"
                >
                  {feature}
                </motion.span>
              ))}
              {property.keyFeatures.length > 3 && (
                <span className="bg-ultralux-charcoal text-white px-2 py-1 rounded-button text-xs font-medium">
                  +{property.keyFeatures.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Agent Info & Price */}
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
            <p className="text-lg lg:text-xl font-bold text-ultralux-charcoal font-display">
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
    </motion.article>
  )
}