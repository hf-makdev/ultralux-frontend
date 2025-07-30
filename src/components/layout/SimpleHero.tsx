'use client'

import { motion } from 'framer-motion'

interface SimpleHeroProps {
  headline: string
  subheadline: string
  ctaText: string
  onCtaClick: () => void
}

export const SimpleHero = ({
  headline,
  subheadline,
  ctaText,
  onCtaClick
}: SimpleHeroProps) => {

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ultralux-charcoal via-ultralux-charcoal-light to-ultralux-charcoal">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10" />
      
      {/* Hero Content */}
      <div className="relative z-30 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-accent mb-8"
        >
          <span className="w-2 h-2 bg-ultralux-gold rounded-full mr-2 animate-pulse"></span>
          Ultra-Luxury Real Estate
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
        >
          {headline}
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 font-light font-body max-w-3xl mx-auto leading-relaxed"
        >
          {subheadline}
        </motion.p>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            onClick={onCtaClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold font-accent text-white bg-ultralux-gold rounded-lg shadow-luxury overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
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
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}