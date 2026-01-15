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
  render: {
    compressor: {
      // 启用缓存压缩
      gzip: true
    },
  },
  // Before Nuxt 4 migration
  // srcDir: 'app',
  // serverDir: fileURLToPath(new URL('server', import.meta.url)),
  // dir: {
  //   public: fileURLToPath(new URL('public', import.meta.url)),
  //   modules: fileURLToPath(new URL('modules', import.meta.url)),
  // },

  experimental: {
    componentIslands: false,
  },
  generate: {
    fallback: true, // ✅ 自動生成404.html兜底
  },
  nitro: {
    // preset: 'netlify',
    preset: 'vercel',
        // 优化：启用压缩和缓存
    compressPublicAssets: true,
    // 优化：启用服务端缓存
    storage: {
      cache: {
        driver: 'memory',
        max: 1000,
        ttl: 60 * 60 * 1000, // 1小时
      }
    },
    devProxy: {
      '/api/': {
        target: 'https://mallapi.incustom.com',
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
      script: [
        // 优化：延迟加载 GTM，使用 defer 和延迟执行
        {
          key: 'gtm-loader',
          type: 'text/javascript',
          defer: true,
          children: `
            // 延迟加载 GTM，等待页面交互或滚动
            function loadGTM() {
              if (window.dataLayer) return;
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WLSVXPKK');
            }
            // 页面加载完成后延迟 2 秒加载，或用户交互时立即加载
            if (document.readyState === 'complete') {
              setTimeout(loadGTM, 2000);
            } else {
              window.addEventListener('load', function() { setTimeout(loadGTM, 2000); });
              ['mousedown', 'touchstart', 'scroll'].forEach(function(event) {
                window.addEventListener(event, loadGTM, { once: true, passive: true });
              });
            }
          `,
        },
        // 优化：延迟加载 Meta Pixel
        {
          key: 'meta-pixel',
          type: 'text/javascript',
          defer: true,
          children: `
            // 延迟加载 Meta Pixel
            function loadMetaPixel() {
              if (window.fbq) return;
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1715265472507752');
              fbq('track', 'PageView');
            }
            // 页面加载完成后延迟 3 秒加载，或用户交互时立即加载
            if (document.readyState === 'complete') {
              setTimeout(loadMetaPixel, 3000);
            } else {
              window.addEventListener('load', function() { setTimeout(loadMetaPixel, 3000); });
              ['mousedown', 'touchstart', 'scroll'].forEach(function(event) {
                window.addEventListener(event, loadMetaPixel, { once: true, passive: true });
              });
            }
          `,
        },
      ],
      noscript: [
        {
          children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WLSVXPKK"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          tagPosition: 'bodyOpen'
        },
        {
          key: 'meta-pixel-noscript',
          children: `
            <img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1715265472507752&ev=PageView&noscript=1"
            />
          `,
          tagPosition: 'bodyOpen'
        }
      ]
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
      addComponent({
        name: 'BaseIcon',
        filePath: '@/components/BaseIcon.vue',
        priority: 100,
      })
    },
  ],
 routeRules: {
    '/.well-known/apple-developer-merchantid-domain-association': {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600'
      }
    },
        '/product/**': {
      ssr: true,
      prerender: false,
      // 启用 ISR（增量静态再生）缓存
      isr: 3600, // 缓存1小时
    },
    // 首页预渲染
    '/': {
      prerender: true,
      headers: { 'Cache-Control': 's-maxage=3600' }
    },
    // API 路由不缓存
    '/api/**': { cors: true, headers: { 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS' } },
  },
  colorMode: {
    preference: 'light',
  },
  runtimeConfig: {
    public: {
    	 paypalClientId: 'AWVya-REAJ9WaVV8Mzm56_EXtp__TyhjRapzK8JTmePsjqTYCcpDnUAyUIJyQgkBPlNmHR7h3hL472el',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://mallapi.incustom.com',
      airwallexEnv: process.env.NUXT_PUBLIC_AIRWALLEX_ENV || 'prod',
      gmpApiKey: process.env.GMP_API_KEY,
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
      collections: ['heroicons', 'material-symbols'],

    },
  },

  // Global styles
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/custom.css',
    'lite-youtube-embed/src/lite-yt-embed.css',
  ],
  plugins: [
    { src: '~/plugins/clarity.js', mode: 'client' },
    { src: '~/plugins/chaty.client.ts', mode: 'client' },
    { src: '~/plugins/tiktok-pixel.client.ts', mode: 'client' }

  ],
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    // 优化：启用图片优化（如果支持的话）
    format: ['webp', 'png', 'jpg'],
    // 优化：设置默认质量
    quality: 82,
    // 优化：启用 IPX provider（如果可用）
    // provider: 'ipx',
    provider: 'none', // 如果 CDN 已经处理图片，保持 none
    imgAttributes: {
      loading: 'lazy',
      decoding: 'async'
    },
    // 优化：添加默认 sizes
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
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
      'cdn.incustom.com',
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
