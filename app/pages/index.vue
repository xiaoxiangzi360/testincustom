<script setup lang="ts">

definePageMeta({
  title: 'Home',
  description: 'New Arrivals, Big Savings!',
  navOrder: 1,
  type: 'primary',
  icon: 'i-mdi-home',
})

// const curactivity = ref<any>({})      // 当前要展示/手动弹的活动对象
// const isshow = ref(false)             // 由自动逻辑或点击 CouponIcon 控制


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

</script>

<template>

  <div class="bg-white font-hind">
    <!-- <div class="bg-black">
      <ComSvg href="#icon-all" class="h-12 w-12 text-white" />
    </div> -->
    <Homepage />
    <Tags />
    <Categorypage />
    <PopularProducts tag="Most Loved Picks" :tagIdList="['2009187613642219525']" title="Most Loved Picks"
      subtitle="Custom shades celebrated by design enthusiasts everywhere" />
    <PopularProducts tag="New Arrivals" :tagIdList="['2009187613642219523']" title="New Arrivals"
      subtitle="Fresh custom shades designed for your home and garden" />

    <HomeCompoents />
    <Faq />
    <Business />
    <!-- <CouponIcon v-model:isshow="isshow" :curactivity="curactivity" /> -->
    <!-- <ActivityModal v-model:isshow="isshow" :curactivity="curactivity" /> -->
    <!-- <Cookiemodal /> -->
  </div>
</template>
