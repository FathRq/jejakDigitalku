/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — values live in src/styles/tokens.css
        ink: 'var(--color-ink)',
        accent: 'var(--color-accent)',
        positive: 'var(--color-positive)',
        negative: 'var(--color-negative)',
      },
      fontFamily: {
        sans: ['var(--font-story)'],
      },
    },
  },
  plugins: [],
}
