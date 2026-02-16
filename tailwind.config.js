/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Barlow', 'system-ui', 'sans-serif'],
        'condensed': ['Barlow Condensed', 'sans-serif'],
      },
      colors: {
        'accent': '#dc2626',
        'accent-light': '#ef4444',
        'theme-bg-primary': 'rgb(var(--bg-primary) / <alpha-value>)',
        'theme-bg-secondary': 'rgb(var(--bg-secondary) / <alpha-value>)',
        'theme-bg-tertiary': 'rgb(var(--bg-tertiary) / <alpha-value>)',
        'theme-text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'theme-text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'theme-text-tertiary': 'rgb(var(--text-tertiary) / <alpha-value>)',
        'theme-border': 'rgb(var(--border-color) / <alpha-value>)',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
