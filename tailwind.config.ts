import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'rgb(var(--color-brand-50) / <alpha-value>)',
          100: 'rgb(var(--color-brand-100) / <alpha-value>)',
          300: 'rgb(var(--color-brand-300) / <alpha-value>)',
          500: 'rgb(var(--color-brand-500) / <alpha-value>)',
          700: 'rgb(var(--color-brand-700) / <alpha-value>)'
        },
        olive: {
          200: 'rgb(var(--color-olive-200) / <alpha-value>)',
          600: 'rgb(var(--color-olive-600) / <alpha-value>)'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
