<template>
  <footer class="bg-[#222222] text-white py-10">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10">
      <!-- 左侧 Logo & 介绍 -->
      <div class="flex-1 flex flex-col items-start text-left">
        <h2 class="text-2xl font-bold">
          <NuxtImg format="webp" alt="incustom" src="/images/footerlogo.png" class="h-8 md:h-12" />
        </h2>
        <p class="text-sm mt-2">
          Fulfilling your ideas on demand
        </p>
        <p class="text-xs mt-2">
          Trusted to deliver 99.8M items since 2024
        </p>

        <div class="flex flex-wrap justify-center items-center gap-3 mt-4">
          <NuxtImg format="webp" src="/email-2.png" alt="email" class="h-10" />
          <span>hello@incustom.com </span>
        </div>
        <!-- 社交图标 -->
        <div class="flex flex-wrap justify-start gap-4 mt-4">

          <NuxtLink :to="item.url" target="_blank" v-for="item in medialist">
            <NuxtImg format="webp" @mouseover="hovered = item.id" :alt="item.url" @mouseleave="hovered = null"
              :src="hovered === item.id ? item.img + '-active.png' : item.img + '.png'" class="w-10 cursor-pointer" />
          </NuxtLink>
        </div>
      </div>

      <!-- 右侧菜单 -->
      <div class="flex-[2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
        <div>
          <p class="font-medium text-lg mb-6">Customizations</p>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Size Customization</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Pattern Printing</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Material Options</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Fabric Swatch Request
          </NuxtLink>
        </div>
        <div class="pl-4">
          <p class="font-medium text-lg mb-6">Feature</p>
          <NuxtLink to="/article/about-us" class="block hover:text-primary mt-4 font-normal text-white/80">About Us
          </NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Our Mission</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Sustainability & Materials
          </NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Blog / Shade Tips</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Affiliate / Influencer
            Program</NuxtLink>
        </div>
        <div class="pl-4 hidden md:block">
          <p class="font-medium text-lg mb-6">Feature requests</p>
          <NuxtLink to="/article/faq" class="block hover:text-primary mt-4 font-normal text-white/80">FAQS</NuxtLink>
          <NuxtLink class="block hover:text-primary mt-4 font-normal text-white/80">Track My Order</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Shipping & Delivery
          </NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Returns & Exchanges
          </NuxtLink>
          <NuxtLink to="/article/warranty-policy" class="block hover:text-primary mt-4 font-normal text-white/80">
            Warranty Policy</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Installation Guides
          </NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">How to Measure</NuxtLink>
          <NuxtLink to="/article/contact-us" class="block hover:text-primary mt-4 font-normal text-white/80">Contact Us
          </NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-4 font-normal text-white/80">Request a Quote</NuxtLink>
        </div>
      </div>
    </div>
    <div
      class="max-w-7xl mt-10 mx-auto px-4 flex flex-wrap text-sm gap-10 items-center border-t border-white/10 pt-10 md:space-y-0 md:flex-nowrap font-normal text-white/60">
      <!-- 左侧链接 -->
      <div class="flex flex-wrap items-center gap-1">
        <NuxtLink to="/article/privacy-policy">Privacy</NuxtLink>
        <span>|</span>
        <NuxtLink to="/article/terms-of-service">Terms</NuxtLink>
        <span>|</span>
        <NuxtLink to="/cookies">Cookie Policy</NuxtLink>
        <span>|</span>
        <NuxtLink to="/accessibility">Accessibility</NuxtLink>
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
    <div class="text-center text-xs text-gray-400 mt-10">
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
</script>
