<script setup lang="ts">
import { heroImageUrl } from '@/utils/hero'

definePageMeta({
  // layout: 'default',
  // name: 'index',
  // alias: 'index',
  title: 'Home',
  description: 'New Arrivals, Big Savings!',
  navOrder: 1,
  type: 'primary',
  icon: 'i-mdi-home',
  // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
})
const { listInProgressMarketingActivity } = ActivityAuth()
const isexpend = ref(false)
const curactivity = ref({})
const isshow = ref(false)
let emailactivity = null
let couponactivity = null
const getactivitylistlist = async () => {
  const res = await listInProgressMarketingActivity()
  let lists = res.result;
  lists.forEach(element => {
    if (element.couponReceiveMethod == 50) {
      emailactivity = element
    }
    let couponcookiename = 'hideactivity_' + element.id
    if (element.couponReceiveMethod == 10 && !useCookie(couponcookiename).value && !couponactivity && element.popupTriggerEvent != 10) {
      couponactivity = element
    }
  });

  if (isexpend.value == false && couponactivity) {
    curactivity.value = couponactivity
  }
  if (emailactivity) {
    let cookiename = 'hideactivity_' + emailactivity.id
    curactivity.value = emailactivity

    if (!useCookie(cookiename)) {
      isexpend.value = true
    }
  }
  if (!isEmptyObject(curactivity.value)) {
    isshow.value = true
  }
}
function isEmptyObject(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0;
}
getactivitylistlist()


</script>
<template>
  <div>
    <Homepage />
    <Tags />
    <Categorypage />
    <PopularProducts />
    <Needs />
    <!-- <Howwork /> -->
    <!-- <Integration /> -->
    <!-- <Integration2 /> -->
    <Views />
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
