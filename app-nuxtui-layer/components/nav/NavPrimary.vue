<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const { getlistOnlineCatalogTree } = ProductAuth();

const catemenu = ref([]);
const menuData = ref([]);
const recommendData = ref([]);

const getcatelist = async () => {
  try {
    const res = await getlistOnlineCatalogTree();
    const result = res.result;
    const cate = result[0];
    if (cate.children && cate.children.length > 0) {
      catemenu.value = cate.children;
      menuData.value = cate.children;
      recommendData.value = cate.children.filter(item => item.recommend === true);
      console.log(recommendData.value);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

getcatelist();

const categories = ref([
  { label: "Shade Sail", link: "/Shade Sail-689" },
  { label: "Roller Shade", link: "/Roller Shade-764" },
  { label: "Privacy Screen", link: "/Privacy Screen-765" },
  { label: "Shade Cloth", link: "/Shade Cloth-766" },
  { label: "Plant Cover", link: "/Plant Cover-767" },
  { label: "Patio Furniture Covers", link: "/Patio Furniture Covers-12" },
]);

const collectionlist = ref([
  { title: 'Outdoor Shade Solutions', description: 'UV protection for outdoor living. >', image: '/images/cate1.png' },
  { title: 'Privacy & Garden Decor', description: 'Stylish privacy for your backyard. >', image: '/images/cate2.png' },
  { title: 'Indoor Window Shades', description: 'Elegant shading for modern homes. >', image: '/images/cate3.png' },
  { title: 'Custom Printed Shade & Screen', description: 'Print your ideas on fabric. >', image: '/images/cate4.png' },
]);

const Gotocollection = (collection: string) => {
  router.push('/collections/' + collection);
};
const hoverRecommend = ref<number | null>(null);
const hoverRecommendSub = ref<number | null>(null);

const hoverLevel1 = ref<number | null>(null);
const hoverLevel2 = ref<number | null>(null);
const hoverSub = ref<number | null>(null);

const menuOpen = ref(false);

const navigate = (link: string) => {
  router.push(link);
};
</script>

<template>
  <div class="relative flex flex-wrap gap-3 md:flex-nowrap md:flex-row md:gap-6">
    <!-- All Products Hover 多级分类 -->
    <div class="relative group" @mouseleave="hoverLevel1 = null">
      <NuxtLink to="/products">
        <div class="flex items-center p-2 cursor-pointer" @mouseenter="hoverLevel1 = 0">
          <NuxtImg src="cell.png" width="24" class="mr-2" />
          All Products
        </div>
      </NuxtLink>

      <!-- 菜单弹出层 -->
      <div class="absolute top-full left-0 bg-white shadow-2xl flex z-50 rounded py-1" v-if="hoverLevel1 !== null"
        @mouseenter="hoverLevel1 = 0" @mouseleave="hoverLevel1 = null; hoverLevel2 = null; hoverSub = null">
        <!-- 一级分类 -->
        <ul class="text-sm w-60">
          <li v-for="(item, i) in menuData" :key="i" class="group pr-4" @mouseenter="hoverLevel2 = i; hoverSub = null">
            <NuxtLink :to="`/${item.catalogEnName}-${item.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] flex justify-between items-center whitespace-nowrap w-full">
              <span>{{ item.catalogEnName }}</span>
              <UIcon v-if="hoverLevel2 === i && item.children" name="i-material-symbols:chevron-right"
                class="w-5 h-5 text-gray-400 transition-opacity duration-200" />
            </NuxtLink>
          </li>
        </ul>


        <!-- 二级分类 -->
        <ul v-if="hoverLevel2 !== null && menuData[hoverLevel2]?.children" class="text-sm w-60">
          <li v-for="(sub, j) in menuData[hoverLevel2].children" :key="j" class="group pr-4" @mouseenter="hoverSub = j">
            <NuxtLink :to="`/${sub.catalogEnName}-${sub.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] flex justify-between items-center whitespace-nowrap">
              <span>{{ sub.catalogEnName }}</span>
              <UIcon v-if="hoverSub === j && sub.children" name="i-material-symbols:chevron-right"
                class="w-5 h-5 text-gray-400 transition-opacity duration-200" />
            </NuxtLink>
          </li>
        </ul>

        <!-- 三级分类 -->
        <ul v-if="hoverLevel2 !== null && hoverSub !== null && menuData[hoverLevel2]?.children?.[hoverSub]?.children"
          class="text-sm w-60">
          <li v-for="child in menuData[hoverLevel2].children[hoverSub].children" :key="child.catalogEnName"
            class="pr-4">
            <NuxtLink :to="`/${child.catalogEnName}-${child.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] cursor-pointer whitespace-nowrap">
              {{ child.catalogEnName }}
            </NuxtLink>
          </li>
        </ul>

      </div>
    </div>

    <!-- 分类按钮 -->
    <div v-for="(category, index) in recommendData" :key="index"
      class="relative flex items-center p-2 cursor-pointer whitespace-nowrap" @mouseenter="hoverRecommend = index"
      @mouseleave="hoverRecommend = null; hoverRecommendSub = null">
      <NuxtLink :to="`/${category.catalogEnName}-${category.catalogId}`"
        class="text-base duration-200 border border-transparent md:border-none leading-none">
        {{ category.catalogEnName }}
      </NuxtLink>

      <!-- 浮出菜单（不写在一级按钮内部） -->
      <div class="absolute top-full left-0 top-full bg-white shadow-2xl rounded z-50 py-1 flex"
        v-if="hoverRecommend === index">
        <!-- 二级分类 -->
        <ul class="text-sm w-60">
          <li v-for="(sub, j) in category.children" :key="j" class="group pr-4" @mouseenter="hoverRecommendSub = j">
            <NuxtLink :to="`/${sub.catalogEnName}-${sub.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] flex justify-between items-center whitespace-nowrap">
              <span>{{ sub.catalogEnName }}</span>
              <UIcon v-if="hoverRecommendSub === j && sub.children" name="i-material-symbols:chevron-right"
                class="w-5 h-5 text-gray-400 transition-opacity duration-200" />
            </NuxtLink>
          </li>
        </ul>


        <!-- 三级分类 -->
        <ul v-if="hoverRecommendSub !== null && category.children?.[hoverRecommendSub]?.children" class="text-sm w-60">
          <li v-for="child in category.children[hoverRecommendSub].children" :key="child.catalogEnName" class="pr-4">
            <NuxtLink :to="`/${child.catalogEnName}-${child.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] cursor-pointer whitespace-nowrap">
              {{ child.catalogEnName }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>


    <!-- Collections 弹出层 -->
    <UPopover color="white" v-model:open="menuOpen" mode="hover" :ui="{
      base: 'overflow-visible border-none shadow-2xl bg-white rounded-md focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow'
    }" :popper="{ placement: 'bottom' }">
      <template #default>
        <NuxtLink class="text-base  duration-200 p-2 border border-transparent md:border-none">
          Collections
        </NuxtLink>
      </template>

      <template #panel>
        <div class="flex items-center justify-center bg-gray-100 rounded">
          <div class="w-full mb-4 md:mb-0">
            <div class="bg-white rounded px-6 py-8">
              <h2 class="text-base font-semibold mb-3 text-title">Special Collections</h2>
              <UList>
                <UListItem @click="Gotocollection(category.title)" v-for="category in collectionlist"
                  :key="category.title"
                  class="text-base block w-full py-2 cursor-pointer hover:text-primary hover:bg-[#F8F8F8] rounded transition text-center md:text-left text-title pl-2">
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
