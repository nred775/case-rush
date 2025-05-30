/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
  "rotate-y-180",
  "perspective",
  "transform-style-preserve-3d",
  "backface-hidden",
  {
    pattern: /bg-(gray|orange|purple|yellow|fuchsia)-(400|500)/,
  },
  {
    pattern: /text-(gray|orange|purple|yellow|fuchsia)-(100|400)/,
  },
  {
    pattern: /border-(gray|orange|purple|yellow|fuchsia)-400/,
  }
],

  theme: {
    extend: {
  keyframes: {
    'pulse-slow': {
      '0%, 100%': { transform: 'scale(1)', opacity: '1' },
      '50%': { transform: 'scale(1.05)', opacity: '0.9' },
    },
    fadeInUp: {
      '0%': { opacity: '0', transform: 'translateY(10px) scale(0.95)' },
      '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
    },
  },
  animation: {
    'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
    'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
  },
  dropShadow: {
    'indigo-glow': '0 0 12px rgba(99, 102, 241, 0.7)',
  },
  backgroundImage: {
    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  },
}

  },
  plugins: [require('tailwind-scrollbar-hide'),],
}
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        shakeX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        }
      },
      animation: {
        shakeX: 'shakeX 0.3s infinite',
      }
    }
  }
}

