/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'mint-light': '#F1F6F4',
        'mint-mid':   '#D9E8E2',
        'brand-yellow': '#FFC801',
        'brand-orange': '#FF9932',
        'teal-deep':  '#114C5A',
        'navy':       '#172B36',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-up':        'fadeUp 0.5s ease-out both',
        'fade-in':        'fadeIn 0.4s ease-out both',
        'float':          'float 5s ease-in-out infinite',
        'float-reverse':  'floatReverse 6s ease-in-out infinite',
        'spin-slow':      'spinSlow 20s linear infinite',
        'marquee':        'marquee 35s linear infinite',
        'pulse-glow':     'pulseGlow 2.5s ease-in-out infinite',
        'shimmer':        'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(14px)' },
        },
        spinSlow: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,200,1,0)' },
          '50%':      { boxShadow: '0 0 24px 6px rgba(255,200,1,0.25)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
