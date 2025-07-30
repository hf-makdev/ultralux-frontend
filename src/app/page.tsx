'use client'

import Image from 'next/image'
import { AppleNavigation } from '@/components/layout/AppleNavigation'
import { AppleHero } from '@/components/layout/AppleHero'
import { ApplePropertyGallery } from '@/components/property/ApplePropertyGallery'
import { mockNeighborhoods, getFeaturedProperties } from '@/data/mockData'

export default function Home() {
  const handleExploreNeighborhoods = () => {
    // Smooth scroll to property gallery
    const propertySection = document.getElementById('properties')
    propertySection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-ultralux-off-white">
      {/* Navigation */}
      <AppleNavigation 
        neighborhoods={mockNeighborhoods} 
        currentPath="/" 
      />

      {/* Hero Section */}
      <AppleHero
        headline="Data-Driven Insight. Unparalleled Access. The Future of Miami Luxury Real Estate."
        subheadline="Discover ultra-luxury properties in Miami&apos;s most exclusive neighborhoods"
        ctaText="Explore Miami Neighborhoods"
        onCtaClick={handleExploreNeighborhoods}
      />

      {/* Featured Properties Section */}
      <section id="properties" className="py-16 lg:py-24 bg-white">
        <div className="luxury-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ultralux-charcoal mb-4 lg:mb-6 tracking-tight">
              Featured Ultra-Luxury Properties
            </h2>
            <p className="text-lg lg:text-xl text-ultralux-gray max-w-3xl mx-auto font-light leading-relaxed">
              Explore our curated selection of Miami&apos;s most exclusive properties, 
              each offering unparalleled luxury and sophistication.
            </p>
          </div>
          
          <ApplePropertyGallery 
            properties={getFeaturedProperties(6)} 
            loading={false}
            showFilters={false}
          />
        </div>
      </section>

      {/* Neighborhoods Preview Section */}
      <section className="py-16 lg:py-24 bg-ultralux-off-white">
        <div className="luxury-container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ultralux-charcoal mb-4 lg:mb-6 tracking-tight">
              Exclusive Neighborhoods
            </h2>
            <p className="text-lg lg:text-xl text-ultralux-gray max-w-3xl mx-auto font-light leading-relaxed">
              From Fisher Island to Star Island, discover Miami&apos;s most prestigious addresses 
              where luxury meets lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mockNeighborhoods.slice(0, 6).map((neighborhood, index) => (
              <div
                key={neighborhood.slug}
                className="group relative overflow-hidden rounded-apple shadow-card hover:shadow-apple-lg transition-all duration-300 cursor-pointer border border-gray-100/50"
                onClick={() => window.location.href = `/neighborhoods/${neighborhood.slug}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">
                      {neighborhood.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-3 line-clamp-2">
                      {neighborhood.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold">
                          ${(neighborhood.averagePrice / 1000000).toFixed(1)}M avg
                        </p>
                        <p className="text-sm text-white/80">
                          {neighborhood.totalProperties} properties
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="luxury-button luxury-button-primary">
              View All Neighborhoods
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ultralux-charcoal text-white py-16 lg:py-20">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-ultralux-gold mb-4 lg:mb-6 tracking-tight">
                UltraLux
              </h3>
              <p className="text-gray-300 mb-6 lg:mb-8 max-w-md font-light leading-relaxed">
                Miami&apos;s premier ultra-luxury real estate platform, connecting discerning 
                buyers with the finest properties in the most exclusive neighborhoods.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-ultralux-gold transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-ultralux-gold transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.132-1.552-.684-.94-.684-2.08 0-3.02.684-.94 1.835-1.552 3.132-1.552 1.297 0 2.448.611 3.132 1.552.684.94.684 2.08 0 3.02-.684.94-1.835 1.552-3.132 1.552z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/properties" className="text-gray-400 hover:text-white transition-colors">Properties</a></li>
                <li><a href="/neighborhoods" className="text-gray-400 hover:text-white transition-colors">Neighborhoods</a></li>
                <li><a href="/analytics" className="text-gray-400 hover:text-white transition-colors">Market Analytics</a></li>
                <li><a href="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Miami, FL</li>
                <li>+1 (305) 555-0123</li>
                <li>info@ultralux.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UltraLux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
