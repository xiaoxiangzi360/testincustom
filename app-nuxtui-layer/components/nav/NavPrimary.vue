<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
// 按钮分类数
const categories = ref([
  { label: "Shade Sail", link: "/Shade Sail-689" },
  { label: "Roller Shade", link: "/Roller Shade-764" },
  { label: "Privacy Screen", link: "/Privacy Screen-765" },
  { label: "Shade Cloth", link: "/Shade Cloth-766" },
  { label: "Plant Cover", link: "/Plant Cover-767" },
  { label: "Patio Furniture Covers", link: "/Patio Furniture Covers-12" },
]);
const collectionlist = ref([
  {
    title: 'Outdoor Shade Solutions',
    description: 'UV protection for outdoor living. >',
    image: '/images/cate1.png'
  },
  {
    title: 'Privacy & Garden Decor',
    description: 'Stylish privacy for your backyard. >',
    image: '/images/cate2.png'
  },
  {
    title: 'Indoor Window Shades',
    description: 'Elegant shading for modern homes. >',
    image: '/images/cate3.png'
  },
  {
    title: 'Custom Printed Shade & Screen',
    description: 'Print your ideas on fabric. >',
    image: '/images/cate4.png'
  },
]);

const menuOpen = ref(false);

const Gotocollection = (collection) => {
  router.push('/collections/' + collection)

}

</script>

<template>
  <div class="flex flex-wrap gap-3 md:flex-nowrap md:flex-row md:gap-6">
    <NuxtLink v-for="(category, index) in categories" :key="index" :to="category.link"
      class="text-base md:text-lg hover:text-primary hover:bg-transparent duration-200 p-2 border border-transparent md:border-none !text-base whitespace-nowrap">
      {{ category.label }}
    </NuxtLink>
    <UPopover color="white" v-model:open="menuOpen" mode="hover" :ui="{
      base: 'overflow-visible border-none shadow-2xl bg-white rounded-md focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow'
    }" :popper="{ placement: 'bottom' }">
      <template #default>
        <NuxtLink
          class="text-base md:text-lg hover:text-primary hover:bg-transparent duration-200 p-2 border border-transparent md:border-none !text-base">
          Collections
        </NuxtLink>
      </template>

      <template #panel>
        <div class="flex items-center justify-center bg-gray-100 rounded">
          <div class="w-full mb-4 md:mb-0">
            <div class="bg-white rounded px-6 py-8">
              <h2 class="text-base font-semibold mb-3 text-title">Special Collections</h2>
              <UList>
                <UListItem @click="Gotocollection(category.title)" v-for="category in collectionlist" :key="category"
                  class="text-base block w-full py-2 cursor-pointer hover:text-primary hover:bg-[#F8F8F8]  rounded transition text-center md:text-left text-title pl-2">
                  {{ category.title }}
                </UListItem>
              </UList>
            </div>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  div {
    flex-direction: column;
    align-items: center;
  }
}
</style>