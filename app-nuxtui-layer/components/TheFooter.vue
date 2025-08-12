<template>
  <footer class="bg-[#222222] text-white py-3 md:py-10">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4 md:gap-10">
      <!-- 左侧 Logo & 介绍 -->
      <div class="flex-1 flex flex-col items-start text-left">
        <h2 class="text-2xl font-bold my-3">
          <NuxtImg format="webp" alt="incustom" src="/images/footerlogo.png" class="h-8 md:h-12" />
        </h2>
        <p class="text-sm md:mt-2">
          Fulfilling your ideas on demand
        </p>
        <p class="text-xs md:mt-2">
          Trusted to deliver 99.8M items since 2024
        </p>

        <div class="flex flex-wrap justify-center items-center gap-3 mt-4">
          <NuxtImg format="webp" src="/email-2.png" alt="email" class="h-10" />
          <span>hello@incustom.com </span>
        </div>
        <!-- 社交图标 -->
        <div class="flex flex-wrap justify-start gap-2 md:gap-4 mt-1 md:mt-4">

          <NuxtLink :to="item.url" target="_blank" v-for="item in medialist">
            <NuxtImg format="webp" @mouseover="hovered = item.id" :alt="item.url" @mouseleave="hovered = null"
              :src="hovered === item.id ? item.img + '-active.png' : item.img + '.png'" class="w-10 cursor-pointer" />
          </NuxtLink>
        </div>
      </div>

      <div class="flex-[2]">
        <!-- ✅ 移动端：UAccordion 手风琴 -->
        <div class="block md:hidden">
          <UAccordion :items="accordionItems" multiple="true"
            class="bg-transparent border-0 no-bg-accordion text-white/80" :ui="{
              container: 'border-b border-[#00000014] dark:border-white dark:text-white'
            }">
            <template #default="{ item, index, open }">
              <div
                class="w-full flex justify-between items-center text-base sm:text-lg dark:text-white font-noraml pl-2 py-2 border-t border-white/10">
                <span class="text-white/80  text-left dark:text-white font-normal">{{
                  item.label
                }}</span>
                <UIcon name="i-heroicons-chevron-down-20-solid" class="w-5 h-5 transition-transform duration-200"
                  :class="[open ? 'rotate-180' : '']" />
              </div>
            </template>
            <template #item="{ item }">
              <div class="pl-2 pb-3 space-y-3">
                <NuxtLink v-for="(link, i) in item.links" :key="i" :to="link.to"
                  class="block hover:text-primary font-normal text-white/80 mb-3">
                  {{ link.label }}
                </NuxtLink>
              </div>
            </template>
          </UAccordion>
        </div>

        <!-- ✅ 桌面端三列布局 -->
        <div class="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <div v-for="(section, idx) in sections" :key="idx" class="md:pl-4">
            <p class="font-medium text-lg mb-6">{{ section.title }}</p>
            <NuxtLink v-for="(link, i) in section.links" :key="i" :to="link.to"
              class="block hover:text-primary mt-4 font-normal text-white/80">
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div
      class="max-w-7xl  md:mt-10 mx-auto px-4 flex flex-wrap text-sm gap-3 md:gap-10 items-center border-t border-white/10 pt-3 md:pt-10 md:space-y-0 md:flex-nowrap font-normal text-white/60">
      <!-- 左侧链接 -->
      <div class="flex flex-wrap items-center gap-1">
        <NuxtLink to="/article/privacy-policy">Privacy</NuxtLink>
        <span>|</span>
        <NuxtLink to="/article/terms-of-service">Terms</NuxtLink>
        <!-- <span>|</span>
        <NuxtLink to="/cookies">Cookie Policy</NuxtLink>
        <span>|</span>
        <NuxtLink to="/accessibility">Accessibility</NuxtLink> -->
      </div>

      <!-- 中间语言/支付 -->
      <div class="flex items-center gap-1">
        <span>EN / USD</span>
        <span>|</span>
        <span>Visa</span>
        <span>PayPal</span>
        <span>ApplePay</span>
        <span>Klarna</span>
      </div>

      <!-- 右侧信息 -->
      <div class="flex items-center gap-1">
        <span>Secure Checkout</span>
        <span>|</span>
        <span>Satisfaction Guarantee</span>
      </div>
    </div>
    <!-- 底部版权信息 -->
    <div class="text-center text-xs text-gray-400 mt-4 md:mt-10">
      © 2025 Incustom. All rights reserved.
    </div>

  </footer>
</template>
<script setup>
import { ref } from 'vue'
const medialist = ([
  {
    id: 1,
    img: '/images/media1',
    url: 'https://www.instagram.com/incustom0505/'
  },
  {
    id: 2,
    img: '/images/media2',
    url: 'https://www.facebook.com/profile.php?id=61578243120322'
  },
  {
    id: 3,
    img: '/images/media3',
    url: 'https://www.linkedin.com/in/in-custom-38a132374/'
  },
  // {
  //   id: 4,
  //   img: '/images/media4',
  // }, 
  {
    id: 5,
    img: '/images/media5',
    url: 'https://www.tiktok.com/@incustom8'

  },
  {
    id: 6,
    img: '/images/media6',
    url: 'https://www.pinterest.com/incustomstore/   '
  }, {
    id: 7,
    img: '/images/media7',
    url: 'https://www.youtube.com/channel/UCxL5KwbHQFg86qC_XwbNRtg'
  },
])
const hovered = ref(null)

const sections = [
  // {
  //   title: 'Customizations',
  //   links: [
  //     { label: 'Size Customization', to: '/' },
  //     { label: 'Pattern Printing', to: '/' },
  //     { label: 'Material Options', to: '/' },
  //     { label: 'Fabric Swatch Request', to: '/' },
  //   ],
  // },
  {
    title: 'Feature',
    links: [
      { label: 'About Us', to: '/article/about-us' },
      { label: 'Our Mission', to: '/article/our-mission' },
      // { label: 'Sustainability & Materials', to: '/' },
      // { label: 'Blog / Shade Tips', to: '/' },
      // { label: 'Affiliate / Influencer Program', to: '/' },
    ],
  },
  {
    title: 'Feature requests',
    links: [
      { label: 'FAQS', to: '/article/faq' },
      // { label: 'Track My Order', to: '/' },
      { label: 'Shipping & Delivery', to: '/article/shipping-delivery' },
      { label: 'Returns & Exchanges', to: '/article/returns-exchanges' },
      { label: 'Warranty Policy', to: '/article/warranty-policy' },
      { label: 'Installation Guides', to: '/article/installation-guides' },
      { label: 'How to Measure', to: '/article/how-to-measure' },
      { label: 'Contact Us', to: '/article/contact-us' },
      // { label: 'Request a Quote', to: '/' },
    ],
  },
]

// 转换数据供 UAccordion 使用
const accordionItems = sections.map(section => ({
  label: section.title,
  links: section.links,
}))

</script>
<style scoped>
/* 去掉默认背景、边框 */
:deep(.u-accordion-item button) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* 去掉 item 背景 */
:deep(.u-accordion-item) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
</style>