<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const { isMobileMenuOpen, openMobileMenu } = useMobileMenu()

// 定义分类数据类型接口，增强类型安全
interface CatalogItem {
  catalogId: number;
  catalogEnName: string;
  catalogName: string;
  children?: CatalogItem[];
  recommend?: boolean;
}

// 定义 emits 用于通知父组件关闭 USlideover
const emit = defineEmits<{
  (e: 'closeSlideover'): void
}>();

// 假设ProductAuth已正确导入
const { getlistOnlineCatalogTree } = ProductAuth();

// 分类数据响应式变量
const catemenu = ref<CatalogItem[]>([]);
const menuData = ref<CatalogItem[]>([]);
const recommendData = ref<CatalogItem[]>([]);
const isMobile = ref(false);
const isLoading = ref(true); // 加载状态

// 移动端展开状态管理
const expandedLevel1 = ref<number | null>(null);
const expandedLevel2 = reactive<{ [key: number]: number | null }>({}); // 改用reactive追踪对象属性

// 获取分类数据
const getcatelist = async () => {
  isLoading.value = true;
  try {
    const res = await getlistOnlineCatalogTree();
    if (!res || !res.result || !Array.isArray(res.result) || res.result.length === 0) {
      console.warn('未获取到有效的分类数据');
      return;
    }

    const result = res.result;
    const cate = result[0];
    if (cate?.children?.length) {
      catemenu.value = cate.children;
      menuData.value = cate.children;
      recommendData.value = cate.children.filter(item => item.recommend === true);
    }
  } catch (error) {
    console.error('获取产品分类错误:', error);
  } finally {
    isLoading.value = false;
  }
};

// 检测屏幕尺寸，判断是否为移动设备
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024;
};

// 初始化
onMounted(() => {
  getcatelist();
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

// 清理事件监听
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

// 导航到指定链接并关闭相关组件
const navigate = (link: string, e?: Event) => {
  // 如果点击的是箭头元素，则不执行导航
  if (e && (e.target as HTMLElement).closest('.arrow-icon')) {
    return;
  }

  // 关闭移动端菜单和侧边栏
  openMobileMenu();
  emit('closeSlideover');
  router.push(link);
};

// 移动端展开/折叠一级分类
const toggleLevel1 = (index: number, e?: Event) => {
  e?.stopPropagation();
  if (expandedLevel1.value === index) {
    expandedLevel1.value = null;
    // 清空对应二级分类展开状态
    Object.keys(expandedLevel2).forEach(key => {
      delete expandedLevel2[Number(key)];
    });
  } else {
    expandedLevel1.value = index;
  }
};

// 移动端展开/折叠二级分类
const toggleLevel2 = (level1Index: number, level2Index: number, e?: Event) => {
  e?.stopPropagation();
  if (expandedLevel2[level1Index] === level2Index) {
    expandedLevel2[level1Index] = null;
  } else {
    expandedLevel2[level1Index] = level2Index;
  }
};

// 桌面端悬停状态管理
const hoverRecommend = ref<number | null>(null);
const hoverRecommendSub = ref<number | null>(null);
const hoverLevel1 = ref<number | null>(null);
const hoverLevel2 = ref<number | null>(null);
const hoverSub = ref<number | null>(null);
const close = () => {
  openMobileMenu();
};
</script>

<template>
  <!-- 加载状态 -->
  <div v-if="isLoading" class="loading-state p-3 text-center h-10">

  </div>

  <!-- 移动端视图 -->
  <div v-else-if="isMobile" class="mobile-categories">
    <!-- All Products -->
    <div class="w-full text-right text-gray-400 mt-3 border-b border-b-blackcolor/10">
      <UIcon name="i-material-symbols:close-small-rounded" width="30" height="30" @click="close()"></UIcon>
    </div>
    <div class="mobile-category-item">
      <div class="category-level-1 flex items-center justify-between p-3 border-b border-b-blackcolor/10 last:border-0"
        @click="toggleLevel1(-1, $event)">
        <div class="flex items-center" @click="navigate('/products', $event)">
          <span>All Products</span>
        </div>
        <!-- 箭头旋转过渡 -->
        <UIcon class="arrow-icon w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out"
          name="i-material-symbols:expand-more" :class="{ 'rotate-180': expandedLevel1 === -1 }" />
      </div>

      <!-- 一级分类列表 - 添加过渡效果 -->
      <transition name="slide-down">
        <div v-if="expandedLevel1 === -1" class="pl-4">
          <div v-for="(item, i) in menuData" :key="item.catalogId" class="category-level-2">
            <div class="flex items-center justify-between p-3 border-b border-b-blackcolor/10 "
              @click="toggleLevel2(-1, i, $event)">
              <div @click="navigate(`/${item.catalogEnName}-${item.catalogId}`, $event)">
                <span>{{ item.catalogEnName || item.catalogName }}</span>
              </div>
              <UIcon v-if="item?.children?.length"
                class="arrow-icon w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out"
                name="i-material-symbols:expand-more" :class="{ 'rotate-180': expandedLevel2[-1] === i }" />
            </div>

            <!-- 二级分类列表 - 添加过渡效果 -->
            <transition name="slide-down">
              <div v-if="expandedLevel2[-1] === i" class="pl-4">
                <div v-for="(sub, j) in item?.children" :key="sub.catalogId" class="category-level-3">
                  <div class="flex items-center justify-between p-3 border-b border-b-blackcolor/10">
                    <div @click="navigate(`/${sub.catalogEnName}-${sub.catalogId}`, $event)">
                      <span>{{ sub.catalogEnName || sub.catalogName }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>

    <!-- 推荐分类 -->
    <div v-for="(category, index) in recommendData" :key="category.catalogId" class="mobile-category-item">
      <div class="category-level-1 flex items-center justify-between p-3 border-b border-b-blackcolor/10 last:border-0"
        @click="toggleLevel1(index, $event)">
        <div @click="navigate(`/${category.catalogEnName}-${category.catalogId}`, $event)">
          <span>{{ category.catalogEnName || category.catalogName }}</span>
        </div>
        <UIcon v-if="category?.children?.length"
          class="arrow-icon w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out"
          name="i-material-symbols:expand-more" :class="{ 'rotate-180': expandedLevel1 === index }" />
      </div>

      <!-- 二级分类及以下 - 添加过渡效果 -->
      <transition name="slide-down">
        <div v-if="expandedLevel1 === index" class="pl-4">
          <div v-for="(sub, j) in category?.children" :key="sub.catalogId" class="category-level-2">
            <div class="flex items-center justify-between p-3 border-b border-b-blackcolor/10"
              @click="toggleLevel2(index, j, $event)">
              <div @click="navigate(`/${sub.catalogEnName}-${sub.catalogId}`, $event)">
                <span>{{ sub.catalogEnName || sub.catalogName }}</span>
              </div>
              <UIcon v-if="sub?.children?.length"
                class="arrow-icon w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out"
                name="i-material-symbols:expand-more" :class="{ 'rotate-180': expandedLevel2[index] === j }" />
            </div>

            <!-- 三级分类 - 添加过渡效果 -->
            <transition name="slide-down">
              <div v-if="expandedLevel2[index] === j" class="pl-4">
                <div v-for="child in sub?.children" :key="child.catalogId" class="category-level-3">
                  <div class="flex items-center justify-between p-3 border-b border-b-blackcolor/10"
                    @click="navigate(`/${child.catalogEnName}-${child.catalogId}`, $event)">
                    <span>{{ child.catalogEnName || child.catalogName }}</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <!-- 桌面端视图 -->
  <div v-else class="relative flex flex-wrap whitespace-nowrap gap-2 md:flex-nowrap md:flex-row md:gap-2">
    <!-- All Products Hover 多级分类 -->
    <div class="relative group" @mouseleave="hoverLevel1 = null">
      <NuxtLink to="/products">
        <div class="flex items-center p-2 pl-0 cursor-pointer" @mouseenter="hoverLevel1 = 0">
          <NuxtImg src="cell.png" width="24" class="mr-2" />
          All Products
        </div>
      </NuxtLink>

      <!-- 菜单弹出层 -->
      <div class="absolute top-full left-0 bg-white shadow-2xl flex z-50 py-1" v-if="hoverLevel1 !== null"
        @mouseleave="hoverLevel1 = null; hoverLevel2 = null; hoverSub = null">
        <!-- 一级分类 -->
        <ul class="text-sm w-60">
          <li v-for="(item, i) in menuData" :key="item.catalogId" class="group"
            @mouseenter="hoverLevel2 = i; hoverSub = null">
            <NuxtLink :to="`/${item.catalogEnName}-${item.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] flex justify-between items-center whitespace-nowrap w-full"
              @click="emit('closeSlideover')">
              <span>{{ item.catalogEnName || item.catalogName }}</span>
              <UIcon v-if="hoverLevel2 === i && item?.children" name="i-material-symbols:chevron-right"
                class="w-5 h-5 text-gray-400 transition-opacity duration-200" />
            </NuxtLink>
          </li>
        </ul>

        <!-- 二级分类 -->
        <ul v-if="hoverLevel2 !== null && menuData[hoverLevel2]?.children" class="text-sm w-60">
          <li v-for="(sub, j) in menuData[hoverLevel2]?.children" :key="sub.catalogId" class="group"
            @mouseenter="hoverSub = j">
            <NuxtLink :to="`/${sub.catalogEnName}-${sub.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] flex justify-between items-center whitespace-nowrap"
              @click="emit('closeSlideover')">
              <span>{{ sub.catalogEnName || sub.catalogName }}</span>
              <UIcon v-if="hoverSub === j && sub?.children" name="i-material-symbols:chevron-right"
                class="w-5 h-5 text-gray-400 transition-opacity duration-200" />
            </NuxtLink>
          </li>
        </ul>

        <!-- 三级分类 -->
        <ul v-if="hoverLevel2 !== null && hoverSub !== null && menuData[hoverLevel2]?.children?.[hoverSub]?.children"
          class="text-sm w-60">
          <li v-for="child in menuData[hoverLevel2]?.children?.[hoverSub]?.children" :key="child.catalogId">
            <NuxtLink :to="`/${child.catalogEnName}-${child.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] cursor-pointer whitespace-nowrap"
              @click="emit('closeSlideover')">
              {{ child.catalogEnName || child.catalogName }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- 分类按钮 -->
    <div v-for="(category, index) in recommendData" :key="category.catalogId"
      class="relative flex items-center p-2 cursor-pointer whitespace-nowrap" @mouseenter="hoverRecommend = index"
      @mouseleave="hoverRecommend = null; hoverRecommendSub = null">
      <NuxtLink :to="`/${category.catalogEnName}-${category.catalogId}`"
        class="text-base duration-200 border border-transparent md:border-none leading-none"
        @click="emit('closeSlideover')">
        {{ category.catalogEnName || category.catalogName }}
      </NuxtLink>

      <!-- 浮出菜单 -->
      <div class="absolute top-full left-0 top-full bg-white shadow-2xl  z-50 py-1 flex"
        v-if="hoverRecommend === index && category?.children?.length">
        <!-- 二级分类 -->
        <ul class="text-sm w-60">
          <li v-for="(sub, j) in category?.children" :key="sub.catalogId" class="group"
            @mouseenter="hoverRecommendSub = j">
            <NuxtLink :to="`/${sub.catalogEnName}-${sub.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] flex justify-between items-center whitespace-nowrap"
              @click="emit('closeSlideover')">
              <span>{{ sub.catalogEnName || sub.catalogName }}</span>
              <UIcon v-if="hoverRecommendSub === j && sub?.children" name="i-material-symbols:chevron-right"
                class="w-5 h-5 text-gray-400 transition-opacity duration-200" />
            </NuxtLink>
          </li>
        </ul>
        <!-- 三级分类 -->
        <ul v-if="hoverRecommendSub !== null && category?.children?.[hoverRecommendSub]?.children" class="text-sm w-60">
          <li v-for="child in category?.children?.[hoverRecommendSub]?.children" :key="child.catalogId">
            <NuxtLink :to="`/${child.catalogEnName}-${child.catalogId}`"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] cursor-pointer whitespace-nowrap"
              @click="emit('closeSlideover')">
              {{ child.catalogEnName || child.catalogName }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-categories {
  width: 100%;
}

.mobile-category-item {
  border-bottom: 1px solid #eee;
}

.category-level-1,
.category-level-2,
.category-level-3 {
  cursor: pointer;
}

/* 防止点击箭头时触发导航 */
.arrow-icon {
  pointer-events: auto !important;
}

/* 加载状态样式 */
.loading-state {
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {

  .category-level-1 span,
  .category-level-2 span,
  .category-level-3 span {
    font-size: 14px;
  }

}
</style>