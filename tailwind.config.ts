import {
  pg_colors,
  pg_fonts,
  // pg_backgrounds,
} from './themes/pg-tailwindcss/tokens.cjs'

// import { getFontsWithFallback } from './app/utils/font'
// import { safelist } from './app/utils/colors'
import tailwindTypography from '@tailwindcss/typography'
import tailwindForms from '@tailwindcss/forms'
import tailwindCssPluginPinegrow from '@pinegrow/tailwindcss-plugin'

export default {
  darkMode: 'class',
  plugins: [
    tailwindTypography,
    tailwindForms,
    tailwindCssPluginPinegrow,
  ],

  theme: {
    extend: {
      // Nuxt UI can process colors extended directly, and not via plugin (as above), so the colors are added here instead of passing it to @pinegrow/tailwindcss-plugin above
      // Primary is added additionally as pp as it's required to set Nuxt UI's primary in app.config.ts. Other colors like secondary etc can be used in Nuxt UI component's color prop
      colors: { ...pg_colors, pp: pg_colors.primary },
      fontFamily: pg_fonts,
      ringColor: {
        DEFAULT: '#00B2E3', // ✅ 覆盖全局 ring 默认色
        // primary: '#00B2E3'
      },
      screens: {
        '8xl': '1440px',
        'max-sm': { 'max': '639px' },
        'max-md': { 'max': '767px' },
        'max-lg': { 'max': '1023px' },
        'max-xl': { 'max': '1279px' },
        'max-2xl': { 'max': '1535px' },
      },
    },
  },

  get content() {
    const _content = [
      './app/**/*.{vue,js,ts,jsx,tsx}',
      './components/**/*.{vue,js,ts,jsx,tsx}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      // '{.,app,*-layer}/components/**/*.{js,vue,ts}',
      // '{.,app,*-layer}/layouts/**/*.vue',
      // '{.,app,*-layer}/pages/**/*.vue',
      // '{.,app,*-layer}/plugins/**/*.{js,ts}',
      // '{.,app,*-layer}/app.vue',
      // '{.,app,*-layer}/*.{mjs,js,ts}',
      // '{.,*-layer}/nuxt.config.{js,ts}',
    ]
    return process.env.NODE_ENV === 'production'
      ? _content
      : [..._content, './_pginfo/**/*.{html,js}'] // used by Vue Desginer for live-designing during development
  },
}
