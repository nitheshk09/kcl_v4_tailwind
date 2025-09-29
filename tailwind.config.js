/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './MyApp/app/**/*.{js,jsx,ts,tsx}',
    './MyApp/components/**/*.{js,jsx,ts,tsx}',
    './MyApp/hooks/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // Enable dark mode support
  darkMode: 'class', // or 'media' for system preference
  theme: {
    extend: {
      colors: {
        // Your specific color palette
        'custom-purple': '#401F3C',
        'custom-dark': '#080B1A',
        'custom-dark-blue': '#28162C',
        'custom-cyan': '#B7F0FC',
        'custom-white': '#FFFFFF',
        // Dark theme gradient colors
        'gradient-dark': {
          'start': '#401F3C',    // Purple
          'mid': '#080B1A',      // Dark blue/black
          'end': '#28162C',      // Dark purple
        },
        // Light theme gradient colors  
        'gradient-light': {
          'start': '#B7F0FC',    // Light cyan
          'mid': '#FFFFFF',      // White
          'end': '#B7F0FC',      // Light cyan
        },
        // Traditional theme colors with your palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#B7F0FC',    // Your light cyan
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#080B1A',    // Your dark
          900: '#401F3C',    // Your purple
          950: '#28162C',    // Your dark purple
        },
        // Background colors using your palette
        background: {
          light: '#FFFFFF',
          dark: '#080B1A',
        },
        surface: {
          light: '#B7F0FC',
          dark: '#28162C',
        },
        text: {
          light: '#080B1A',
          dark: '#FFFFFF',
        },
        border: {
          light: '#B7F0FC',
          dark: '#401F3C',
        },
        // Status colors
        success: {
          light: '#22c55e',
          dark: '#16a34a',
        },
        warning: {
          light: '#f59e0b',
          dark: '#d97706',
        },
        error: {
          light: '#ef4444',
          dark: '#dc2626',
        },
      },
      // Custom gradients using your colors
      backgroundImage: {
        // Dark theme gradients
        'gradient-dark-primary': 'linear-gradient(135deg, #401F3C 0%, #080B1A 50%, #28162C 100%)',
        'gradient-dark-secondary': 'linear-gradient(45deg, #28162C 0%, #401F3C 100%)',
        'gradient-dark-radial': 'radial-gradient(circle, #401F3C 0%, #080B1A 70%)',
        // Light theme gradients
        'gradient-light-primary': 'linear-gradient(135deg, #B7F0FC 0%, #FFFFFF 50%, #B7F0FC 100%)',
        'gradient-light-secondary': 'linear-gradient(45deg, #FFFFFF 0%, #B7F0FC 100%)',
        'gradient-light-radial': 'radial-gradient(circle, #B7F0FC 0%, #FFFFFF 70%)',
        // Mixed gradients
        'gradient-mixed': 'linear-gradient(180deg, #B7F0FC 0%, #401F3C 100%)',
        'gradient-sunset': 'linear-gradient(45deg, #401F3C 0%, #28162C 50%, #B7F0FC 100%)',
      },
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Custom fonts
      fontFamily: {
        'sans': ['System', 'ui-sans-serif', 'sans-serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Custom font sizes
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
        '5xl': ['48px', '1'],
      },
      // Custom shadows for different themes
      boxShadow: {
        'light': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'dark': '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
      },
      // Custom border radius
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      // Animation and transitions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    // Custom plugin for theme-aware utilities including gradients
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.theme-transition': {
          'transition': 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        },
        '.bg-theme': {
          'background-color': theme('colors.background.light'),
          '.dark &': {
            'background-color': theme('colors.background.dark'),
          },
        },
        '.bg-surface': {
          'background-color': theme('colors.surface.light'),
          '.dark &': {
            'background-color': theme('colors.surface.dark'),
          },
        },
        '.text-theme': {
          'color': theme('colors.text.light'),
          '.dark &': {
            'color': theme('colors.text.dark'),
          },
        },
        '.border-theme': {
          'border-color': theme('colors.border.light'),
          '.dark &': {
            'border-color': theme('colors.border.dark'),
          },
        },
        // Theme-aware gradient utilities
        '.bg-gradient-theme': {
          'background-image': 'linear-gradient(135deg, #B7F0FC 0%, #FFFFFF 50%, #B7F0FC 100%)',
          '.dark &': {
            'background-image': 'linear-gradient(135deg, #401F3C 0%, #080B1A 50%, #28162C 100%)',
          },
        },
        '.bg-gradient-theme-radial': {
          'background-image': 'radial-gradient(circle, #B7F0FC 0%, #FFFFFF 70%)',
          '.dark &': {
            'background-image': 'radial-gradient(circle, #401F3C 0%, #080B1A 70%)',
          },
        },
        '.bg-gradient-theme-vertical': {
          'background-image': 'linear-gradient(180deg, #B7F0FC 0%, #FFFFFF 100%)',
          '.dark &': {
            'background-image': 'linear-gradient(180deg, #401F3C 0%, #080B1A 100%)',
          },
        },
        '.bg-gradient-theme-diagonal': {
          'background-image': 'linear-gradient(45deg, #FFFFFF 0%, #B7F0FC 100%)',
          '.dark &': {
            'background-image': 'linear-gradient(45deg, #28162C 0%, #401F3C 100%)',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
  presets: [require('nativewind/preset')],
}
