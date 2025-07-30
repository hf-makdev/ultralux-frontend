/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Apple-Inspired Design System Colors
      colors: {
        'ultralux-charcoal': {
          DEFAULT: '#1D1D1F',      // Apple's space gray
          light: '#424245',        // Apple's secondary gray
          dark: '#000000',         // True black like Apple
        },
        'ultralux-off-white': '#FBFBFD',       // Apple's off-white
        'ultralux-gold': {
          DEFAULT: '#FF9500',      // Apple's orange accent
          light: '#FFCC02',        // Apple's yellow accent
          dark: '#FF6600',         // Deeper orange
        },
        'ultralux-gray': '#86868B',            // Apple's system gray
        'ultralux-blue': '#007AFF',            // Apple's system blue
        'ultralux-green': '#34C759',           // Apple's system green
      },
      
      // Apple-Inspired Typography
      fontFamily: {
        'display': ['Futura', 'Avenir Next', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        'body': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Avenir Next', 'Inter', 'system-ui', 'sans-serif'],
        'accent': ['Futura', 'Avenir Next', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
      
      // Enhanced Responsive Breakpoints
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      
      // Enhanced Spacing for Apple-like Layouts
      spacing: {
        '15': '3.75rem',  // 60px
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '112': '28rem',   // 448px
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
        '160': '40rem',   // 640px
      },
      
      // Apple-inspired Border Radius
      borderRadius: {
        'card': '1rem',       // 16px for property cards
        'button': '0.75rem',  // 12px for buttons
        'apple': '1.25rem',   // 20px Apple-style
        'apple-lg': '1.5rem', // 24px Large Apple-style
      },
      
      // Apple-style Shadows
      boxShadow: {
        'card': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'hero': '0 32px 64px rgba(0, 0, 0, 0.15)',
        'luxury': '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
        'apple': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'apple-lg': '0 8px 25px rgba(0, 0, 0, 0.15)',
      },
      
      // Apple-style Animation Durations
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      
      // Apple-inspired Animation Curves
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.1, 1)',
        'apple': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'apple-spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      // Background Gradients
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, rgba(45,55,72,0.9) 0%, rgba(45,55,72,0.6) 100%)',
        'gradient-card-overlay': 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
        'gradient-luxury': 'linear-gradient(45deg, #2D3748 0%, #4A5568 100%)',
      },
      
      // Custom Aspect Ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '5/4': '5 / 4',
      },
      
      // Responsive Container Sizes
      maxWidth: {
        '8xl': '88rem',   // 1408px
        '9xl': '96rem',   // 1536px
      },
      
      // Custom Animation Keyframes
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'luxury-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      
      // Apple-style Animations
      animation: {
        'fade-in': 'fade-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'luxury-pulse': 'luxury-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'apple-bounce': 'apple-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      
      // Enhanced Typography Scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.0125em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.0125em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.0125em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.0375em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.0625em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.075em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.1em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.125em' }],
      },
    },
  },
  plugins: [
    // Add line clamp utilities
    require('@tailwindcss/line-clamp'),
  ],
}