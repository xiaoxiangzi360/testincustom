import { r as useHead, g as useRoute } from './server.mjs';
import { useSchemaOrg, defineWebSite, defineWebPage } from '@unhead/schema-org';
import { computed } from 'vue';
import { u as useOptimizeImage } from './optimize-image-BybfjNrn.mjs';

var _a, _b;
const pg_colors = {
  primary: {
    DEFAULT: "#00b2e3"
  },
  secondary: {
    DEFAULT: "#4c1003"
  }
};
const pg_font_urls = [
  "https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900|Kalam:300,400,700&display=swap"
];
const pg_background_urls = {
  "design-image-large": "bg.jpg"
};
const heroImageUrl = pg_background_urls["design-image-large"];
const siteMeta = {
  title: "Incustom",
  description: "Incustom – A one-stop product customization platform to easily create your own unique items.",
  logo: "incustom.png",
  author: "Pinegrow",
  url: "https://incustom.com",
  ogImageUrl: "og-image.jpg",
  // absolute url (or) from public folder
  generator: "https://vuedesigner.com",
  twitter: "@vuedesigner",
  // default
  titleSeparator: "|"
};
const checkDarkTheme = "/* eslint-disable */\n/* prettier-ignore */\n// @ts-nocheck\n\n;(() => {\n  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches\n  const setting = localStorage.getItem('vueuse-color-scheme') || 'auto'\n  if (setting === 'dark' || (prefersDark && setting !== 'light'))\n    document.documentElement.classList.toggle('dark', true)\n})()\n";
const useHeadAndMeta = (pageMeta) => {
  var _a2;
  const {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    ogImageUrl: siteOgImageUrl,
    generator: siteGenerator,
    author,
    twitter,
    titleSeparator
  } = siteMeta;
  const link = [
    // ...[
    //   '/fonts/barlow-7cHpv4kjgoGqM7E_Ass52Hs.woff2',
    //   '/fonts/firacode-uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7Ng.woff2',
    //   '/fonts/barlow-7cHpv4kjgoGqM7E_DMs5.woff2',
    // ].map(
    //   (href) =>
    //     ({
    //       rel: 'preload',
    //       as: 'font',
    //       type: 'font/woff2',
    //       crossorigin: '',
    //       href,
    //     } as const),
    // ),
    {
      rel: "icon",
      // type: 'image/x-icon',
      type: "image/png",
      href: "/favicon.ico"
    }
  ];
  const noscript = [];
  const canonicalUrl = pageMeta.canonicalUrl || siteUrl;
  {
    link.push({ rel: "canonical", href: canonicalUrl.href });
  }
  if (pg_font_urls.length) {
    const googleapis = "https://fonts.googleapis.com";
    const gstatic = "https://fonts.gstatic.com";
    link.push(
      { rel: "dns-prefetch", href: googleapis },
      { rel: "dns-prefetch", href: gstatic },
      { rel: "preconnect", crossorigin: "anonymous", href: googleapis },
      { rel: "preconnect", crossorigin: "anonymous", href: gstatic },
      {
        rel: "preload",
        as: "style",
        onload: "this.onload=null;this.rel='stylesheet'",
        href: pg_font_urls.toString()
      }
    );
    noscript.push(
      `<link rel="stylesheet" crossorigin="anonymous" href="${pg_font_urls.toString()}" />`
    );
  }
  const title = pageMeta.title ? `${pageMeta.title} ${titleSeparator} ${siteTitle}` : siteTitle;
  useHead({
    title,
    // title is either defined statically within the astro page or dynamically by adding it to the page's frontmatter, and it is resolved here.
    // Other unused params - titleTemplate, templateParams
    titleTemplate: null,
    // Instead of setting other meta here, useSeoMeta is used.
    meta: [
      {
        name: "twitter:url",
        content: canonicalUrl.href
      }
    ],
    // useScript can also be used to load scripts
    script: [{ innerHTML: checkDarkTheme, once: true }],
    link,
    noscript,
    htmlAttrs: { lang: "en-US" },
    bodyAttrs: {},
    style: []
  });
  const description = pageMeta.description || siteDescription;
  const generator = pageMeta.generator || siteGenerator;
  const keywords = (_a2 = pageMeta.tags) == null ? void 0 : _a2.toString();
  let siteOgImage = siteUrl;
  try {
    siteOgImage = new URL(siteOgImageUrl, siteUrl).href;
  } catch (err) {
  }
  const ogImage = pageMeta.ogImage || siteOgImage || heroImageUrl;
  if (ogImage.src) {
    ogImage.url = ogImage.src;
    delete ogImage.src;
  }
  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { name: "author", content: author },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "generator", content: generator },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: title },
      { property: "og:url", content: canonicalUrl.href },
      { property: "og:site_name", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: title },
      { name: "twitter:site", content: twitter },
      { name: "twitter:creator", content: "@techakayy" }
    ]
  });
  useSchemaOrg([
    defineWebSite({
      name: title
    }),
    defineWebPage()
  ]);
};
const primary = (_a = pg_colors.primary) == null ? void 0 : _a.DEFAULT;
const secondary = (_b = pg_colors.secondary) == null ? void 0 : _b.DEFAULT;
const useOgImage = () => {
  const { title, logo, description, author, twitter } = siteMeta;
  const fromBg = secondary;
  const toBg = primary;
  const ogImageOptions = {
    component: "OgCard",
    title,
    // description: '', // use page description instead
    summary: description,
    fromBg,
    toBg,
    // image: '~/assets/images/hero1.jpg',
    logo,
    author,
    twitter
  };
  const route = useRoute();
  const ogImage = computed(() => route.meta.ogImage || heroImageUrl);
  const { optimizeImage } = useOptimizeImage();
  const theOgImageOptimized = {
    ...optimizeImage(
      ogImage.value,
      /* options */
      {
        modifiers: {
          width: 1200,
          height: 600,
          fit: "fill"
          // can be cover, contain, fill, inside, outside
        }
        // placeholder: false, // placeholder image before the actual image is fully loaded.
      }
    )
  };
  const theOgImage = theOgImageOptimized.src;
  return {
    theOgImage,
    ogImageOptions
  };
};

export { useOgImage as a, useHeadAndMeta as u };
