<template>
  <div id="hero-splide" ref="rootEl" class="relative w-full max-row pt-3">
    <!-- ✅ 首屏静态 LCP 回退图：在轮播尚未挂载前先展示第0张，避免白屏 -->
    <div v-if="!isReady" class="relative w-full min-h-[300px] md:min-h-0 md:aspect-[21/9] rounded overflow-hidden">
      <picture class="absolute inset-0">
        <!-- 平板：1024–1279 -->
        <source media="(min-width:1024px) and (max-width:1279px)" :srcset="img(`${baseImages[0]}`, { w: 1280 })" />
        <!-- 桌面：≥1280 -->
        <source media="(min-width:1280px)" :srcset="img(`${baseImages[0]}`, { w: 1600 })" />
        <!-- 手机：≤1023，提供 1x/2x/3x 密度 -->
        <NuxtImg :srcset="[
          img(`${baseImages[0]}`, { h: 300 }) + ' 1x',
          img(`${baseImages[0]}`, { h: 600 }) + ' 2x',
          img(`${baseImages[0]}`, { h: 900 }) + ' 3x'
        ].join(', ')" sizes="(max-width:1023px) 100vw" :src="img(`${baseImages[0]}`, { h: 300 })" alt="Hero"
          class="w-full h-full object-cover" fetchpriority="high" decoding="sync" crossorigin="anonymous"
          draggable="false" />
      </picture>
    </div>

    <!-- ✅ 轮播（可见时再挂载） -->
    <Splide v-if="isReady" ref="carouselRef" :options="computedSplideOptions" class="overflow-hidden"
      @splide:mounted="onMountedSplide" @splide:move="onMove">
      <SplideSlide v-for="(s, i) in slides" :key="i">
        <!-- 固定纵横比，避免 CLS -->
        <div class="relative w-full min-h-[300px] md:min-h-0 md:aspect-[21/9] rounded overflow-hidden">
          <picture class="absolute inset-0">
            <!-- 平板：1024–1279 -->
            <source media="(min-width:1024px) and (max-width:1279px)" :srcset="img(baseImages[i], { w: 1280 })" />
            <!-- 桌面：≥1280 -->
            <source media="(min-width:1280px)" :srcset="img(baseImages[i], { w: 1600 })" />
            <!-- 手机：≤1023，提供 1x/2x/3x 密度 -->
            <NuxtImg :srcset="[
              img(baseImages[i], { h: 300 }) + ' 1x',
              img(baseImages[i], { h: 600 }) + ' 2x',
              img(baseImages[i], { h: 900 }) + ' 3x'
            ].join(', ')" sizes="(max-width:1023px) 100vw" :src="img(baseImages[i], { h: 300 })"
              :alt="s.title || `Banner ${i + 1}`" class="w-full h-full object-cover"
              :loading="i === 0 ? 'eager' : 'lazy'" :fetchpriority="i === 0 ? 'high' : 'auto'"
              :decoding="i === 0 ? 'sync' : 'async'" crossorigin="anonymous" draggable="false" />
          </picture>

        </div>

        <!-- 遮罩/内容 -->
        <div class="absolute inset-0 z-20 pointer-events-none">
          <!-- A款 -->
          <div v-if="s.variant === 'A'" class="h-full flex"
            :class="s.align === 'center' ? 'items-center justify-center text-center' : 'items-center'">
            <div class="pointer-events-auto" :class="s.align === 'center' ? 'px-4' : 'pl-[6%] md:pl-[10%]'">
              <h2 class="text-white font-semibold leading-tight"
                :class="['text-3xl sm:text-5xl lg:text-6xl', textShadowClass]">
                {{ s.title }}
              </h2>

              <p v-if="s.subtitle" class="mt-3 sm:mt-6 text-white whitespace-pre-line font-bold"
                :class="['text-sm sm:text-base lg:text-base', textShadowClass]">
                {{ s.subtitle }}
              </p>

              <button
                class="mt-11 pointer-events-auto rounded-md px-4 sm:px-5 py-2 sm:py-[14px] bg-primary text-white active:scale-[0.98] transition"
                @click="s.onClick?.()">
                {{ s.ctaText || 'View More' }}
              </button>

              <div v-if="s.features?.length"
                class="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap items-start text-[12px] sm:text-base"
                :class="s.align === 'center' ? 'justify-center' : ''">
                <span v-for="(f, idx) in s.features" :key="idx" class="flex items-center mr-0 sm:mr-4 mb-1 sm:mb-0">
                  <BaseIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2 text-white" />
                  <span class="text-white">{{ f }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- B款 -->
          <div v-else-if="s.variant === 'B'" class="h-full flex items-center justify-center text-center">
            <div class="pointer-events-auto px-4">
              <h2 class="text-white font-extrabold leading-tight" :class="['text-3xl sm:text-6xl', textShadowClass]">
                {{ s.title }}
              </h2>

              <div class="mt-2 sm:mt-3 text-white tracking-wide font-bold text-xs sm:text-base">
                {{ s.mission || 'Is Our Mission' }}
              </div>

              <div class="mt-4 sm:mt-[26px] inline-flex items-center justify-center">
                <NuxtImg :src="s.logo || defaultLogo" alt="inCustom" class="h-8 sm:h-10 object-contain"
                  crossorigin="anonymous" draggable="false" />

              </div>

              <div class="mt-4 sm:mt-20">
                <button
                  class="pointer-events-auto rounded-md px-4 sm:px-5 py-2 sm:py-[14px] bg-primary text-white active:scale-[0.98] transition"
                  @click="s.onClick?.()">
                  {{ s.ctaText || 'View More' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </SplideSlide>
    </Splide>

    <!-- 自定义分页指示器 -->
    <div v-if="isReady"
      class="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-4 z-30 flex items-center gap-2">
      <button v-for="n in totalSlides" :key="n"
        class="pointer-events-auto h-2 rounded-full transition-all duration-300 ease-out"
        :class="currentIndex === (n - 1) ? 'w-5 bg-white/90' : 'w-2 bg-white/60 hover:bg-white/80'" @click="goTo(n - 1)"
        :aria-label="`Go to slide ${n}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import { useRouter } from 'vue-router'
import { useHead } from '#imports'

const router = useRouter()

/** 类型定义 */
type SlideBase = {
  title: string
  ctaText?: string
  onClick: () => void | Promise<void>
}
type VariantA = SlideBase & {
  variant: 'A'
  align?: 'left' | 'center'
  subtitle?: string
  features?: string[]
}
type VariantB = SlideBase & {
  variant: 'B'
  mission?: string
  logo?: string
}
type Slide = VariantA | VariantB

/** 原始图片（保持干净，无查询参数） */
const baseImages = [
  'https://cdn.incustom.com/upload/web/homebanner1-1.webp',
  'https://cdn.incustom.com/upload/web/homebanner2.webp',
  'https://cdn.incustom.com/upload/web/homebanner3.webp',
  'https://cdn.incustom.com/upload/web/homebanner4.webp',
  'https://cdn.incustom.com/upload/web/homebanner5.webp',
]

/** slides 配置 */
const slides = ref<Slide[]>([
  {
    variant: 'A',
    align: 'left',
    title: 'Pergola Shade Cloth',
    subtitle: 'All-day UV protection with cool, breathable, and durable shade.',
    onClick: () => { router.push('/Sun%20Shade%20Cloth-883') },
  },
  {
    variant: 'B',
    title: 'Personalized & Affordable',
    mission: 'Is Our Mission',
    ctaText: 'View More',
    logo: '/images/incustom.png',
    onClick: () => { router.push('/article/our-mission') },
  },
  {
    variant: 'A',
    align: 'center',
    title: 'Outdoor Roller Shade',
    subtitle: 'Protect your outdoors from harsh sun Enjoy breezy comfort',
    onClick: () => { router.push('/Outdoor%20Roller%20Shade-886') },
  },
  {
    variant: 'A',
    align: 'left',
    title: 'Shade Sail',
    subtitle:
      'Block harsh sun, enjoy cool comfort, \n and upgrade your outdoor space with a \ndurable shade sail.',
    onClick: () => { router.push('/Sun%20Shade%20Sail-879') },
  },
  {
    variant: 'A',
    align: 'left',
    title: 'Indoor Roller Shade',
    subtitle: 'From harsh sun to nosy neighbors—your all-in-one window solution.',
    onClick: () => { router.push('/Indoor%20Shades-864') },
  },
])

/** ✅ 图片 URL 生成器：统一加 webp + q_82 + 需要的尺寸 */
const img = (url: string, opt: { w?: number; h?: number }) => {
  const size = opt.w ? `w_${opt.w}` : `h_${opt.h}`
  // auto-orient + webp + 质量 82 + 限制
  return `${url}?x-oss-process=image/auto-orient,1/format,webp/quality,q_82/resize,${size},limit_0`
}

/** ✅ 首屏优化：预连接 + 仅预加载第0张（按断点） */
useHead({
  link: [
    { rel: 'preconnect', href: 'https://cdn.incustom.com', crossorigin: '' },
    {
      rel: 'preload',
      as: 'image',
      href: img(baseImages[0], { w: 1600 }),
      media: '(min-width: 1280px)',
      fetchpriority: 'high',
      crossorigin: 'anonymous'   // ✅
    },
    {
      rel: 'preload',
      as: 'image',
      href: img(baseImages[0], { w: 1280 }),
      media: '(min-width: 1024px) and (max-width: 1279px)',
      fetchpriority: 'high',
      crossorigin: 'anonymous'   // ✅
    },
    {
      rel: 'preload',
      as: 'image',
      href: img(baseImages[0], { h: 300 }),
      media: '(max-width: 1023px)',
      fetchpriority: 'high',
      crossorigin: 'anonymous'   // ✅
    },
  ],
})


/** 其余配置 */
const textShadowClass = 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
const defaultLogo = 'https://cdn.incustom.com/upload/web/incustom-logo-white.svg'

/** ✅ 根据用户动效偏好调整自动播放，减少 INP/TBT */
const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  : false

const baseSplideOptions = {
  type: 'loop',
  perPage: 1,
  autoplay: !prefersReducedMotion,
  interval: 3000,
  arrows: false,
  pagination: false,
  pauseOnHover: false,
  speed: 800,
}

const computedSplideOptions = computed(() => baseSplideOptions)

const carouselRef = ref()
const currentIndex = ref(0)
const totalSlides = computed(() => slides.value.length)

/** ✅ 仅可见时才挂载轮播，且在尚未挂载前渲染静态LCP图 */
const isReady = ref(false)
const rootEl = ref<HTMLElement | null>(null)

const mountWhenVisible = () => {
  if (!rootEl.value) return
  // 容忍首屏稍上方也能提早初始化
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      isReady.value = true
      io.disconnect()
      // 再给浏览器一个空闲期，进一步减 JS 抢占
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        requestIdleCallback(() => { /* no-op，占位 */ })
      }
    }
  }, { rootMargin: '200px' })
  io.observe(rootEl.value)
}

onMounted(() => {
  mountWhenVisible()
})

/** ✅ 切换前预取下一张，减少切换白屏 */
const prefetchImg = (url: string) => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = url
  link.setAttribute('crossorigin', 'anonymous')  // ✅
  document.head.appendChild(link)
}


const onMountedSplide = () => {
  currentIndex.value = (carouselRef.value as any)?.splide?.index ?? 0
  // 预取“下一张”
  const next = (currentIndex.value + 1) % baseImages.length
  // 用桌面1280的规格作为通用预取，命中率较高
  prefetchImg(img(baseImages[next], { w: 1280 }))
}

const onMove = (_splide: any, newIndex: number) => {
  currentIndex.value = newIndex
  const next = (newIndex + 1) % baseImages.length
  prefetchImg(img(baseImages[next], { w: 1280 }))
}

const goTo = (i: number) => {
  (carouselRef.value as any)?.splide?.go(i)
}
</script>

<style>
/* ✅ 关键样式内联（避免外部 CSS 未到时的“空白延迟”） */
#hero-splide .object-cover {
  object-fit: cover;
}

#hero-splide .rounded {
  border-radius: 0.5rem;
}

#hero-splide .absolute {
  position: absolute;
}

#hero-splide .inset-0 {
  inset: 0;
}

#hero-splide .relative {
  position: relative;
}

/* Tailwind 的类已足够，但把首屏关键的几条再兜底一次 */
</style>
