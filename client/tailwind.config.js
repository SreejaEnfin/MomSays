const config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 4s infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'rotate-slow': 'spin 10s linear infinite',
        'writing': 'writing 0.6s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        writing: {
          '0%, 100%': {
            transform: 'translate(1px, -1px) rotate(30deg)',
          },
          '50%': {
            transform: 'translate(-1px, 1px) rotate(30deg)',
          },
        },
      }
    },
  },
  plugins: [],
}

export default config
