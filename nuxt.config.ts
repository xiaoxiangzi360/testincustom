import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'pathe'
import { addComponent } from 'nuxt/kit'
import presetIcons from '@unocss/preset-icons'
import { bundledLanguages } from 'shiki'

import siteMeta from './app/site'
const {
  title,
  description,
  url,
  defaultLocale,
  identity,
  twitter,
  trailingSlash,
  titleSeparator,
} = siteMeta

export default defineNuxtConfig({
  extends: [
    './app-nuxtui-layer', // NavBar and Footer components
  ],

  ssr: true,
  // devtools: { enabled: false }, // enabled by default, disable when using standalone Vue devtools

  // Preparation for Nuxt 4 migration
  future: {
    compatibilityVersion: 4,
  },

  // Before Nuxt 4 migration
  // srcDir: 'app',
  // serverDir: fileURLToPath(new URL('server', import.meta.url)),
  // dir: {
  //   public: fileURLToPath(new URL('public', import.meta.url)),
  //   modules: fileURLToPath(new URL('modules', import.meta.url)),
  // },

  experimental: {
    componentIslands: true,
  },
  nitro: {
    // preset: 'netlify',
    preset: 'vercel',
    devProxy: {
      '/api/': {
        target: 'https://testapi.incustom.com',
        // target: 'http://192.168.8.52:50500',
        changeOrigin: true,
        prependPath: false,
      }
    },
  },

  app: {
    baseURL: '/', // defaulted by nuxt
    // Look into HeadAndMeta.vue for the rest
    head: {
      meta: [{ charset: 'utf-8' }], // defaulted by nuxt
    },
  },

  modules: [
    '@pinegrow/nuxt-module',
    '@unocss/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    // '@nuxtjs/html-validator',
    '@nuxt/image',
    '@vee-validate/nuxt',
    '@nuxtjs/seo',
    // '@nuxtjs/fontaine', // blocked by https://github.com/nuxt-modules/fontaine/issues/342
    '@nuxtjs/critters',
    // '@nuxt/icon', // Pre-included by @nuxt/ui
    'nuxt-icon', // To be replaced with @nuxt-icon (above), once NuxtSEO drops using this/becomes stable..
    '@nuxt/eslint',
    '@nuxt/ui',
    function () {
      addComponent({
        name: 'UIcon',
        filePath: '@/components/BaseIcon.vue',
        priority: 100,
      })
    },
  ],
  routeRules: {
    '/productdetail/**': { ssr: false }, // 或 false，根据您的需求
  },
  colorMode: {
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://testapi.incustom.com',
      paypalClientId: 'AZEq1Z4PN2jcETI7JFSFvXGwe0dX8xHKlUOKh9N53ysbzHeJ6OonvPHFd1L5XJz90xX1SPP3X6Xp_P__',
      // apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://192.168.8.52:50500',
    }
  },
  ui: {
    // safelistColors: [
    //   'primary',
    //   'secondary',
    //   'tertiary',
    //   'success',
    //   'warning',
    //   'error',
    //   'info',
    // ],
  },

  // https://dev.to/jacobandrewsky/improving-performance-of-nuxt-with-fontaine-5dim
  // blocked by https://github.com/nuxt-modules/fontaine/issues/342
  // fontMetrics: {
  //   fonts: ['Inter', 'Kalam'],
  // },

  // https://dev.to/jacobandrewsky/optimizing-css-performance-in-nuxt-with-critters-4k8i
  critters: {
    // Options passed directly to critters: https://github.com/GoogleChromeLabs/critters#critters-2
    config: {
      // Default: 'media'
      preload: 'swap',
    },
  },

  icon: {
    componentName: 'NuxtIcon', // Instead of NuxtIcon, prefer using UIcon. Nuxt UI's UIcon is overridden with a local component `BaseIcon` that uses UnoCSS Preset-Icons which allows us to use any icons from the iconify iconsets and is very efficient in terms of automatic treeshaking.
    serverBundle: {
      collections: ['heroicons'],
    },
  },

  // Global styles
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/custom.css',
    'lite-youtube-embed/src/lite-yt-embed.css',
  ],

  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  image: {
    // sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw', // Global sizes not yet supported, has to be specified in NuxtImg or NuxtPicture tags - https://github.com/nuxt/image/issues/216
    // densities: [1,2], // default
    // quality: 80, // can be overridden as NuxtImg prop
    format: ['webp', 'png', 'jpg'], // default is ['webp']
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },

    // TODO: Currently image optimization is paused until some bugs in Nuxt Image modules are fixed
    // provider: 'ipx',
    provider: 'none',

    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 80,
          height: 80,
        },
      },
    },
    // netlify: {
    //   baseURL: url,
    // },
    domains: [
      'images.unsplash.com',
      'fakestoreapi.com',
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'gravatar.com',
      'erp.dropsure.com',
      'image.distributetop.com',
      's2.loli.net',
    ],

    alias: {
      unsplash: 'https://images.unsplash.com',
    },
    vite: {
      resolve: {
        alias: {
          'ohash/utils': 'ohash/dist/utils.mjs'
        }
      }
    }
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  content: {
    // Before Nuxt 4 migration
    sources: {
      content: {
        driver: 'fs',
        base: resolve(__dirname, 'app/content'),
      },
    },
    markdown: {
      anchorLinks: false,
      rehypePlugins: [
        [
          'rehype-external-links',
          {
            target: '_blank',
            rel: ['noopener'],
            test: (node: any) => /^https?:\/\//.test(node.properties.href),
          },
        ],
      ],
    },
    highlight: {
      //@ts-ignore
      langs: Object.keys(bundledLanguages),
      theme: 'dracula-soft',
    },
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  imports: {
    // dirs: ['my-components'],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'lite-youtube',
    },
  },

  sourcemap: {
    client: false,
    server: false,
  },

  routeRules: {
    '/hidden': { robots: false },
  },

  // Used by all modules in the @nuxtjs/seo collection
  // https://nuxtseo.com/docs/nuxt-seo/guides/using-the-modules
  site: {
    url,
    name: title,
    description,
    defaultLocale,
    // https://nuxtseo.com/docs/schema-org/guides/setup-identity
    identity,
    twitter,
    trailingSlash,
    titleSeparator,
  },

  robots: {
    // https://nuxtseo.com/docs/robots/api/config#blocknonseobots-boolean
    blockNonSeoBots: true,
  },

  sitemap: {
    // https://nuxtseo.com/docs/sitemap/getting-started/troubleshooting
    // Open {{site.url}}/sitemap.xml
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '12.5%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      {
        label: 'Change Frequency',
        select: 'sitemap:changefreq',
        width: '12.5%',
      },
      { label: 'Hreflangs', select: 'count(xhtml:link)', width: '12.5%' },
    ],
    // To turn off xls file when viewing sitemap.xml
    // xsl: false,
    // Remove strictNuxtContentPaths if using nuxt-content in documentDriven mode
    strictNuxtContentPaths: true,
  },

  ogImage: {
    enabled: false,
    defaults: {
      extension: 'jpeg',
    },
    // OG images and nuxtseo features can be previewed with nuxt-devtools during development. OG images can also be viewed using URL in this form - `/__og-image__/image/<path>/og.<extension>. For eg, {{site.url}}/__og-image__/image/og.png
    // fonts: ['Inter:400', 'Inter:700'],
    //
    // defaults: { width: 1200, height: 600, emojis: 'noto', renderer: 'satori', component: 'NuxtSeo', cacheMaxAgeSeconds: 60 * 60 * 24 * 3 },
    //
    // disable at a global level
    // runtimeCacheStorage: false,
  },

  linkChecker: {
    enabled: false,
    excludeLinks: ['https://twitter.com/vuedesigner'],
    report: {
      html: true,
      markdown: true,
    },
  },

  unocss: {
    presets: [
      presetIcons({
        prefix: 'i-', // default prefix, do not change
      }),
    ],
  },

  eslint: {
    // config: {
    //   stylistic: {
    //     // All are default values
    //     semi: false,
    //     quotes: 'single',
    //     blockSpacing: true,
    //     indent: 2,
    //     commaDangle: 'always-multiline',
    //     // ...
    //   },
    // },
    // ...
  },

  pinegrow: {
    liveDesigner: {
      iconPreferredCase: 'unocss', // default value (can be removed), Nuxt UI uses the unocss format for icon names
      tailwindcss: {
        /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
        configPath: 'tailwind.config.ts',
        cssPath: '@/assets/css/tailwind.css',
        // themePath: false, // Set to false so that Design Panel is not used
        // restartOnConfigUpdate: true,
        restartOnThemeUpdate: true,
      },
      // plugins: [
      //   {
      //     name: 'My Awesome Lib 3.0',
      //     key: 'my-awesome-lib',
      //     pluginPath: fileURLToPath(
      //       new URL('./web-types/my-awesome-lib.json', import.meta.url),
      //     ),
      //   },
      // ],
    },
  },

  compatibilityDate: '2025-01-14',
})
