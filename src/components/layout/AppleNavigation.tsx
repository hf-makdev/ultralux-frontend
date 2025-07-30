'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Neighborhood } from '@/types'

interface AppleNavigationProps {
  neighborhoods: Neighborhood[]
  currentPath: string
}

export const AppleNavigation = ({ neighborhoods, currentPath }: AppleNavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-apple border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="luxury-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <a href="/" className="text-2xl lg:text-3xl font-display font-bold text-ultralux-charcoal tracking-tight">
              UltraLux
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-button text-sm font-medium transition-all duration-200 ${
                  currentPath === link.href
                    ? 'text-ultralux-gold bg-ultralux-gold/10'
                    : 'text-ultralux-charcoal hover:text-ultralux-gold hover:bg-ultralux-gold/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Neighborhoods Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsNeighborhoodOpen(!isNeighborhoodOpen)}
                className="flex items-center px-4 py-2 rounded-button text-sm font-medium text-ultralux-charcoal hover:text-ultralux-gold hover:bg-ultralux-gold/5 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Neighborhoods
                <motion.div
                  animate={{ rotate: isNeighborhoodOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="ml-1 w-4 h-4" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isNeighborhoodOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-apple border border-gray-200/50 shadow-apple-lg py-2"
                  >
                    <div className="px-4 py-2 text-xs font-medium text-ultralux-gray uppercase tracking-wider border-b border-gray-100 mb-2">
                      Exclusive Neighborhoods
                    </div>
                    {neighborhoods.map((neighborhood) => (
                      <motion.a
                        key={neighborhood.slug}
                        href={`/neighborhoods/${neighborhood.slug}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-ultralux-gold/5 transition-colors duration-200"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div>
                          <div className="font-medium text-ultralux-charcoal text-sm">
                            {neighborhood.name}
                          </div>
                          <div className="text-xs text-ultralux-gray mt-0.5">
                            Avg: ${(neighborhood.averagePrice / 1000000).toFixed(1)}M
                          </div>
                        </div>
                        <div className="text-xs text-ultralux-gray">
                          {neighborhood.totalProperties} properties
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-button text-ultralux-charcoal hover:bg-ultralux-gold/5 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-3 text-base font-medium rounded-button transition-all duration-200 ${
                      currentPath === link.href
                        ? 'text-ultralux-gold bg-ultralux-gold/10'
                        : 'text-ultralux-charcoal hover:text-ultralux-gold hover:bg-ultralux-gold/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}

                {/* Mobile Neighborhoods */}
                <div className="pt-4 border-t border-gray-200/50 mt-4">
                  <div className="px-4 py-2 text-xs font-medium text-ultralux-gray uppercase tracking-wider">
                    Neighborhoods
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {neighborhoods.slice(0, 4).map((neighborhood, index) => (
                      <motion.a
                        key={neighborhood.slug}
                        href={`/neighborhoods/${neighborhood.slug}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-ultralux-gold/5 rounded-button transition-colors duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navLinks.length + index) * 0.1, duration: 0.3 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div>
                          <div className="font-medium text-ultralux-charcoal text-sm">
                            {neighborhood.name}
                          </div>
                          <div className="text-xs text-ultralux-gray">
                            ${(neighborhood.averagePrice / 1000000).toFixed(1)}M avg
                          </div>
                        </div>
                        <div className="text-xs text-ultralux-gray">
                          {neighborhood.totalProperties}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background blur effect when mobile menu is open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden -z-10"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  )
}