<script setup lang="ts">
import { heroImageUrl } from '@/utils/hero'
import type { title } from 'process'

definePageMeta({
  title: 'Home',
  description: 'New Arrivals, Big Savings!',
  navOrder: 1,
  type: 'primary',
  icon: 'i-mdi-home',
})

const { listInProgressMarketingActivity } = ActivityAuth()

const isexpend = ref(false)           // 你原变量，保留
const curactivity = ref<any>({})      // 当前要展示/手动弹的活动对象
const isshow = ref(false)             // 由自动逻辑或点击 CouponIcon 控制
let emailactivity: any = null
let couponactivity: any = null

/** 判断是否已有“今天不再弹/永久不弹”的 cookie */
function hasHideCookie(id?: string | number) {
  if (!id) return false
  const cookie = useCookie('hideactivity_' + id)
  return !!cookie.value
}

function isEmptyObject(obj: any) {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0
}

/**
 * 自动选择活动 & 是否自动弹窗
 * 规则：
 * 1) 优先邮箱订阅（couponReceiveMethod == 50）
 *    - 有 hide cookie：不自动弹，但 curactivity 仍然指向 emailactivity（点击图标可手动弹）
 *    - 无 hide cookie：自动弹
 * 2) 否则考虑券码弹窗（couponReceiveMethod == 10 且 popupTriggerEvent != 10）
 *    - 无 hide cookie：自动弹
 *    - 有 hide cookie：不自动弹
 */
const getactivitylistlist = async () => {
  const res = await listInProgressMarketingActivity()
  const lists = res.result || []

  // 采集两个候选活动
  lists.forEach((element: any) => {
    if (element.couponReceiveMethod == 50) {
      emailactivity = element
    }
    if (
      element.couponReceiveMethod == 10 &&
      !hasHideCookie(element.id) &&
      !couponactivity &&
      element.popupTriggerEvent != 10
    ) {
      couponactivity = element
    }
  })

  // 是否需要自动弹
  let shouldAutoShow = false

  if (emailactivity) {
    curactivity.value = emailactivity
    // 邮箱订阅：有 cookie -> 不自动弹；无 cookie -> 自动弹
    if (!hasHideCookie(emailactivity.id)) {
      shouldAutoShow = true
    } else {
      shouldAutoShow = false
    }
  } else if (isexpend.value === false && couponactivity) {
    // 没有邮箱订阅时，再看券码
    curactivity.value = couponactivity
    shouldAutoShow = true // 上面已经确保没有 hide cookie
  }

  // 只有当需要自动弹时才置 true；否则保持 false（但点击图标仍可改为 true）
  isshow.value = shouldAutoShow
}

getactivitylistlist()
</script>

<template>

  <div class="bg-white font-hind">
    <Homepage />
    <Tags />
    <Categorypage />
    <PopularProducts tag="Most Loved Picks" title="Most Loved Picks"
      subtitle="Custom shades celebrated by design enthusiasts everywhere" />
    <PopularProducts tag="New Arrivals" title="New Arrivals"
      subtitle="Fresh custom shades designed for your home and garden" />
    <!-- <Needs /> -->

    <HomeCompoents />
    <!-- <Howwork /> -->
    <!-- <Integration /> -->
    <!-- <Integration2 /> -->
    <!-- <Views /> -->
    <Faq />
    <Business />
    <CouponIcon v-model:isshow="isshow" :curactivity="curactivity" />
    <ActivityModal v-model:isshow="isshow" :curactivity="curactivity" />
    <Cookiemodal />
    <!-- <HeroSection />
    <UContainer class="pt-8">
      <LaunchSale class="mt-8" />
      <HotDeals class="mt-8" />
    </UContainer> -->
  </div>
</template>
<style scoped></style>
