<template>
  <footer class="bg-[#121212] text-white py-4 md:py-12">
    <div class="max-row">
      <!-- 顶部主区：左品牌 + 右四列 -->
      <div class="flex flex-col md:flex-row gap-8 md:gap-12 justify-between">
        <!-- 左侧 Logo & 介绍 -->
        <div class="">
          <NuxtImg format="webp" alt="incustom" loading="lazy"
            src="https://cdn.incustom.com/upload/icons/footerlogo.png" class="h-8 md:h-10" />
          <p class="text-sm mt-3 text-white">Fulfilling your ideas on demand</p>
          <p class="text-xs mt-2 text-white">Trusted to deliver 99.8M items since 2024</p>

          <div class="flex items-center gap-3 mt-5">
            <NuxtImg format="webp" loading="lazy" src="https://cdn.incustom.com/upload/web/email-2.png" alt="email"
              class="w-5" />
            <a href="mailto:hello@incustom.com" class="text-sm hover:text-primary">hello@incustom.com</a>
          </div>

          <!-- 社交图标（设计图在右下角，这里放在桌面端底部栏右侧；移动端保持这里也显示） -->
          <div class="flex md:hidden flex-wrap gap-3 mt-4 cursor-pointer">
            <NuxtLink :to="item.url" target="_blank" v-for="item in medialist" :key="item.id" aria-label="social link">
              <ComSvg :href="item.svg" class="w-[24px] h-[24px]" />
              <!-- <NuxtImg format="webp" loading="lazy" @mouseover="hovered = item.id" @mouseleave="hovered = null"
                :alt="item.url" :src="hovered === item.id ? item.img + '-active.png' : item.img + '.png'"
                class="w-[24px] h-[24px] " /> -->
            </NuxtLink>
          </div>
        </div>

        <!-- 右侧四列 -->

        <!-- ✅ 移动端：手风琴 -->
        <div class="md:hidden">
          <UAccordion :items="accordionItems" multiple="true"
            class="bg-transparent border-0 no-bg-accordion text-white/80"
            :ui="{ container: 'border-b border-white/10' }">
            <template #default="{ item, open }">
              <div class="w-full flex justify-between items-center text-base font-normal py-3">
                <span class="text-white/90">{{ item.label }}</span>
                <BaseIcon name="i-heroicons-chevron-down-20-solid" class="w-5 h-5 transition-transform"
                  :class="open ? 'rotate-180' : ''" />
              </div>
            </template>
            <template #item="{ item }">
              <div class="pb-4 space-y-3">
                <template v-if="item.type !== 'trust'">
                  <template v-for="(link, i) in item.links" :key="i">
                    <NuxtLink v-if="!needsTokenValidation(link.label)" :to="link.to"
                      class="block hover:text-primary text-white/80">{{ link.label }}</NuxtLink>
                    <a v-else @click="handleAccountNavigation(link)"
                      class="block hover:text-primary text-white/80 cursor-pointer">{{ link.label }}</a>
                  </template>
                </template>
                <template v-else>
                  <div class="space-y-2">
                    <!-- <p class="text-white/80">Badges</p>
                    <p class="text-white/80">Quality Certification</p> -->
                    <div class="flex flex-wrap items-center gap-3 pt-1">
                      <NuxtImg format="webp" loading="lazy" v-for="(b, i) in badges" :key="i" :src="b" alt="badge"
                        class="h-5" />
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </UAccordion>
        </div>

        <!-- ✅ 桌面端：四列 -->
        <div v-for="(section, idx) in sections" :key="'sec-' + idx" class="max-md:hidden">
          <p class="font-medium text-lg mb-5">{{ section.title }}</p>
          <template v-for="(link, i) in section.links" :key="i">
            <NuxtLink v-if="!needsTokenValidation(link.label)" :to="link.to"
              class="block hover:text-primary mt-3 text-white/80 text-sm">{{ link.label }}</NuxtLink>
            <a v-else @click="handleAccountNavigation(link)"
              class="block hover:text-primary mt-3 text-white/80 text-sm cursor-pointer">{{ link.label }}</a>
          </template>
        </div>

        <!-- Trust & Payment 列 -->
        <div class="max-md:hidden">
          <p class="font-medium text-lg mb-5">Trust</p>
          <!-- <NuxtLink class="block hover:text-primary mt-3 text-white/80 text-sm">Badges</NuxtLink>
          <NuxtLink class="block hover:text-primary mt-3 text-white/80 text-sm">Quality
            Certification
          </NuxtLink> -->
          <div class="flex flex-wrap items-center gap-3 mt-3">
            <NuxtImg loading="lazy" format="webp" v-for="(b, i) in badges" :key="'bd-' + i" :src="b" alt="badge"
              class="h-5" />
          </div>
          <a href="/sitemap.xml" target="_blank" class="block hover:text-primary mt-4 text-white/80 text-sm">Site Map
          </a>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="border-t border-white/10 mt-6 md:mt-10 max-md:hidden"></div>

      <!-- 底部信息栏 -->
      <div class="flex flex-col md:flex-row md:justify-between gap-2 md:gap-2 py-4 md:py-6 text-sm text-white/70">
        <!-- 左侧：隐私条款 -->
        <div class="flex flex-wrap  gap-2">
          <NuxtLink to="/privacy-policy" class="hover:text-primary">Privacy</NuxtLink><span>|</span>
          <NuxtLink to="/terms-service" class="hover:text-primary">Terms</NuxtLink><span>|</span>
          <NuxtLink to="">Cookie Policy</NuxtLink><span>|</span>
          <NuxtLink to="">Accessibility</NuxtLink>
        </div>

        <!-- 中间：语言 & 支付 -->
        <div class="flex flex-wrap  gap-2">
          <NuxtImg format="webp" loading="lazy" v-for="(item, idx) in payicons" :key="'pay-' + idx" :src="item"
            class="h-[26px]" />
        </div>

        <!-- 右侧：保障 + 社媒 -->
        <div class="flex  gap-4 md:gap-6">
          <div class="flex gap-2">
            Secure Checkout | Satisfaction Guarantee
          </div>
          <div class="hidden flex-wrap md:flex gap-2 cursor-pointer">
            <NuxtLink :to="item.url" target="_blank" v-for="item in medialist" :key="'s2-' + item.id"
              aria-label="social link">
              <ComSvg :href="item.svg" 
                class="w-[32px] h-[32px] hover:text-primary" />
              <!-- <NuxtImg format="webp" loading="lazy" @mouseover="hovered = item.id" @mouseleave="hovered = null"
                :alt="item.url" :src="hovered === item.id ? item.img + '-active.png' : item.img + '.png'"
                class="w-[32px] h-[32px] " /> -->
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="text-sm text-white/70">
        10802 rush st s El Monte ca 91733
      </div>
      <!-- 版权 -->
      <div class="text-center text-xs text-white/50">
        © 2025 Incustom. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = useCookie('token')
const userType = useCookie('userType', { sameSite: 'lax', path: '/' })
const isuserTokenValid = computed(() => {
  const isMember = userType.value != 2
  return !!token.value && isMember
})

const needsTokenValidation = (linkLabel) => {
  const protectedLinks = ['My Account', 'My Returns']
  return protectedLinks.includes(linkLabel)
}

const handleAccountNavigation = (link) => {
  if (!isuserTokenValid.value) {
    router.push('/login')
    return
  }

  // 根据不同的链接跳转到相应页面
  switch (link.label) {
    case 'Tracking My Order':
      router.push('/myorders')
      break
    case 'My Account':
    case 'My Returns':
      router.push(link.to)
      break
    default:
      router.push(link.to)
  }
}

// 保持向后兼容
const handleTrackingNavigation = () => {
  handleAccountNavigation({ label: 'Tracking My Order', to: '/myorders' })
}

/** 社媒图标（保持你原来的 hover 切换） */
const medialist = [
  { id: 1, img: 'https://cdn.incustom.com/upload/icons/media1', svg: '#icon-platform1', url: 'https://www.instagram.com/incustom_home/' },
  { id: 2, img: 'https://cdn.incustom.com/upload/icons/media2', svg: '#icon-platform2', url: 'https://www.facebook.com/profile.php?id=61585363529171' },
  { id: 3, img: 'https://cdn.incustom.com/upload/icons/media3', svg: '#icon-platform3', url: 'https://www.linkedin.com/company/incustom/' },
  { id: 5, img: 'https://cdn.incustom.com/upload/icons/media5', svg: '#icon-platform4', url: 'https://www.tiktok.com/@incustomofficial' },
  { id: 6, img: 'https://cdn.incustom.com/upload/icons/media6', svg: '#icon-platform5', url: 'https://www.pinterest.com/incustomstore/' },
  { id: 7, img: 'https://cdn.incustom.com/upload/icons/media7', svg: '#icon-platform6', url: 'https://www.youtube.com/@Incustom-official' },
]
const payicons = [
  'https://cdn.incustom.com/upload/icons/payicon1.png',
  'https://cdn.incustom.com/upload/icons/payicon2.png',
  'https://cdn.incustom.com/upload/icons/payicon3.png',
  'https://cdn.incustom.com/upload/icons/payicon4.png',
  'https://cdn.incustom.com/upload/icons/payicon5.png',
  'https://cdn.incustom.com/upload/icons/payicon6.png',
  'https://cdn.incustom.com/upload/icons/payicon7.png',
]
const hovered = ref(null)

/** 四列内容：与设计图一致 */
const sections = [
  {
    title: 'Customer Service',
    links: [
      { label: 'FAQs', to: '/faq' },
      { label: 'Shipping & Delivery', to: '/shipping-delivery' },
      { label: 'Returns & Exchanges', to: '/returns-exchanges' },
      { label: 'Warranty Policy', to: '/warranty-policy' },
      { label: 'Contact Us', to: '/contact-us' },
      { label: 'Payment Information', to: '/payment-information' },
    ],
  },
  {
    title: 'My Account',
    links: [
      { label: 'My Account', to: '/userinfo' },
      { label: 'My Returns', to: '/userinfo' },
      // { label: 'Tracking My Order', to: '/myorders' },
    ],
  },
  {
    title: 'Company & Brand',
    links: [
      { label: 'About Us', to: '/about-us' },
      // { label: 'Sustainability & Materials', to: '' },
      // { label: 'Blog / Shade Tips', to: '' },
      // { label: 'Affiliate / Influencer Program', to: '' },
    ],
  },
]

/** 认证徽章（示例路径，替换成你的实际图片） */
const badges = [
  'https://cdn.incustom.com/upload/icons/logo1.webp',
  'https://cdn.incustom.com/upload/icons/logo2.webp',
  'https://cdn.incustom.com/upload/icons/logo3.webp',
  'https://cdn.incustom.com/upload/icons/logo4.webp',
  'https://cdn.incustom.com/upload/icons/logo5.webp',
  'https://cdn.incustom.com/upload/icons/logo6.webp',
  // 'https://cdn.incustom.com/upload/icons/logo7.webp',
  'https://cdn.incustom.com/upload/icons/logo8.webp',
]

/** 移动端手风琴数据 */
const accordionItems = [
  ...sections.map(s => ({ label: s.title, links: s.links, type: 'links' })),
  { label: 'Trust', type: 'trust' },
]
</script>
