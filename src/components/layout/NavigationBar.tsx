'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Neighborhood } from '@/types'

interface NavigationBarProps {
  neighborhoods: Neighborhood[]
  currentPath: string
}

export const NavigationBar = ({ neighborhoods, currentPath }: NavigationBarProps) => {
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/properties', label: 'Properties' },
    { href: '/analytics', label: 'Market Analytics' },
    { href: '/blog', label: 'Blog' },
    { href: '/team', label: 'Our Team' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="luxury-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <a href="/" className="block">
              <h1 className="text-3xl font-display font-bold text-ultralux-charcoal tracking-tight">
                UltraLux
              </h1>
              <div className="w-full h-0.5 bg-gradient-to-r from-ultralux-gold to-ultralux-gold-light mt-1"></div>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Neighborhoods Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNeighborhoodOpen(!isNeighborhoodOpen)}
                className="flex items-center space-x-2 text-ultralux-charcoal hover:text-ultralux-gold transition-colors duration-300 font-medium"
              >
                <span>Neighborhoods</span>
                <motion.div
                  animate={{ rotate: isNeighborhoodOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isNeighborhoodOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-80 bg-white rounded-xl shadow-luxury border border-gray-100 py-3 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-ultralux-charcoal-light uppercase tracking-wide">
                        Ultra-Luxury Markets
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {neighborhoods.map((neighborhood) => (
                        <motion.a
                          key={neighborhood.slug}
                          href={`/neighborhoods/${neighborhood.slug}`}
                          className="block px-4 py-3 text-ultralux-charcoal hover:bg-gray-50 hover:text-ultralux-gold transition-all duration-200 border-l-2 border-transparent hover:border-ultralux-gold"
                          whileHover={{ x: 4 }}
                          onClick={() => setIsNeighborhoodOpen(false)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{neighborhood.name}</div>
                              <div className="text-sm text-gray-500">
                                ${(neighborhood.averagePrice / 1000000).toFixed(1)}M avg
                              </div>
                            </div>
                            <div className="text-xs text-ultralux-gold font-medium">
                              {neighborhood.totalProperties} properties
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main Navigation Links */}
            {navLinks.map((link) => (
              <NavLink 
                key={link.href} 
                href={link.href} 
                currentPath={currentPath}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-ultralux-charcoal hover:text-ultralux-gold transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="luxury-container py-6 space-y-6">
              {/* Mobile Neighborhoods */}
              <div>
                <h3 className="text-lg font-semibold text-ultralux-charcoal mb-4">
                  Neighborhoods
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {neighborhoods.slice(0, 6).map((neighborhood) => (
                    <a
                      key={neighborhood.slug}
                      href={`/neighborhoods/${neighborhood.slug}`}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-ultralux-gold hover:text-white transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{neighborhood.name}</span>
                        <span className="text-sm opacity-75">
                          ${(neighborhood.averagePrice / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="border-t border-gray-200 pt-6">
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`block py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                        currentPath === link.href
                          ? 'bg-ultralux-gold text-white'
                          : 'text-ultralux-charcoal hover:bg-gray-100'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Dropdown overlay */}
      {isNeighborhoodOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsNeighborhoodOpen(false)}
        />
      )}
    </nav>
  )
}

const NavLink = ({ 
  href, 
  children, 
  currentPath 
}: {
  href: string
  children: React.ReactNode
  currentPath: string
}) => {
  const isActive = currentPath === href
  
  return (
    <motion.a
      href={href}
      className={`relative text-sm font-medium transition-colors duration-300 ${
        isActive
          ? 'text-ultralux-gold'
          : 'text-ultralux-charcoal hover:text-ultralux-gold'
      }`}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-ultralux-gold rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.a>
  )
}