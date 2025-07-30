'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface AppleHeroProps {
  headline: string
  subheadline: string
  ctaText: string
  onCtaClick: () => void
}

export const AppleHero = ({
  headline,
  subheadline,
  ctaText,
  onCtaClick
}: AppleHeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== 'undefined') {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        })
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ultralux-off-white via-gray-50 to-ultralux-off-white">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 149, 0, 0.1) 0%, transparent 50%)`,
          }}
          animate={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 149, 0, 0.1) 0%, transparent 50%)`,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-ultralux-gold/30 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: 0 
            }}
            animate={{
              y: [null, -20, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20">
        {/* Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-ultralux-gold/10 backdrop-blur-sm border border-ultralux-gold/20 text-ultralux-gold text-sm font-medium mb-8 lg:mb-12"
        >
          <span className="w-2 h-2 bg-ultralux-gold rounded-full mr-2 animate-pulse" />
          Ultra-Luxury Real Estate
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-ultralux-charcoal mb-6 lg:mb-8 leading-tight tracking-tight"
        >
          {headline.split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + index * 0.1, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              className="inline-block mr-3 lg:mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-ultralux-gray mb-12 lg:mb-16 font-body font-light max-w-4xl mx-auto leading-relaxed"
        >
          {subheadline}
        </motion.p>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button
            onClick={onCtaClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 lg:px-10 lg:py-5 text-base lg:text-lg font-medium font-accent text-white bg-ultralux-gold rounded-apple shadow-apple overflow-hidden"
            whileHover={{ 
              scale: 1.02, 
              y: -2,
              boxShadow: '0 12px 30px rgba(255, 149, 0, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Button Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-ultralux-gold-dark to-ultralux-gold"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center">
              {ctaText}
              <motion.svg
                className="ml-2 w-5 h-5 lg:w-6 lg:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>

            {/* Hover Ripple Effect */}
            <motion.div
              className="absolute inset-0 rounded-apple"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 1, 
                opacity: 0.1,
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 2.0, duration: 1 }}
          className="absolute bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 hidden md:flex"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center text-ultralux-gray"
          >
            <span className="text-xs font-accent uppercase tracking-wider mb-2 font-medium">
              Discover More
            </span>
            <motion.div
              className="w-6 h-10 border-2 border-ultralux-gray/30 rounded-full p-1"
              whileHover={{ borderColor: 'rgba(255, 149, 0, 0.5)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-1 h-3 bg-ultralux-gray/50 rounded-full mx-auto"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}