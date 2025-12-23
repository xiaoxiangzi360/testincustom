<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useCookie } from 'nuxt/app'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '~/stores/cart';
const { logout } = useAuth();

const router = useRouter()
const route = useRoute()
const initialQuery = typeof route.query.query === 'string' ? route.query.query : ''
const searchInput = ref(initialQuery)
const token = useCookie('token')
const isTokenValid = computed(() => !!token.value)
const userType = useCookie<string | number | null>('userType', { sameSite: 'lax', path: '/' })
const isuserTokenValid = computed(() => {
  const isMember = userType.value != 2
  return !!token.value && isMember
})
// 控制移动菜单
const { isMobileMenuOpen } = useMobileMenu()
const { isMobileCartMenuOpen } = useMobileCartMenu()
const showAuthSheet = ref(false)

// 搜索历史相关
const searchHistory = ref<{ id: string; date: string }[]>([])
const now = new Date()
const todayStr = now.toISOString().split('T')[0]
const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
const showAllHistory = ref(false)
const isSearchHistoryVisible = ref(false)

// 高度测量相关
const historyContentRef = ref<HTMLElement | null>(null)
const isOverThreeLines = ref(false)

// ========= 购物车逻辑 =========
const cart = useCartStore()
const handleGetCart = async () => {
  try {
    await cart.refreshCart()
  } catch (error) {
    console.error('Failed to refresh cart:', error)
  }
};
onMounted(() => {
  if (isTokenValid.value) {
    handleGetCart(); // 页面加载完成后请求购物车数据
  }
});
// 计算过滤后的搜索历史
const filteredSearchHistory = computed(() =>
  searchHistory.value.filter(item => {
    const itemDate = new Date(item.date)
    return itemDate >= sevenDaysAgo
  })
)

// 计算是否显示"查看更多"提示
const shouldShowMoreHint = computed(() => {
  return isOverThreeLines.value && filteredSearchHistory.value.length > 0
})

// 检查高度是否超过三行
const checkHeight = () => {
  nextTick(() => {
    if (historyContentRef.value) {
      const lineHeight = 34 // 根据实际样式调整
      const threeLinesHeight = lineHeight * 4
      const contentHeight = historyContentRef.value.scrollHeight

      // 严格大于三行时才返回 true
      isOverThreeLines.value = contentHeight > threeLinesHeight
    }
  })
}


// 初始化加载本地记录
onMounted(() => {
  const saved = localStorage.getItem('search-history')
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as { id: string; date: string }[]
      searchHistory.value = parsed.filter(item => new Date(item.date) >= sevenDaysAgo)
    } catch (e) {
      console.error('Failed to parse local search history:', e)
    }
  }
})

// 存储关键词到本地
const saveKeywordToLocalHistory = (keyword: string) => {
  const keywordTrimmed = keyword.trim()
  if (!keywordTrimmed) return

  const filtered = searchHistory.value.filter(item => item.id !== keywordTrimmed)
  const newItem = { id: keywordTrimmed, date: todayStr }
  const updated = [newItem, ...filtered]
  const recent = updated.filter(item => new Date(item.date) >= sevenDaysAgo)

  localStorage.setItem('search-history', JSON.stringify(recent))
  searchHistory.value = recent
  showAllHistory.value = false
}

// 搜索相关方法
const searchkeywords = (keyword: string) => {
  searchInput.value = keyword
  isSearchHistoryVisible.value = false
  saveKeywordToLocalHistory(keyword)

  // ✅ TikTok Pixel - Search 事件
  if (typeof window !== 'undefined' && window.ttq) {
    try {
      window.ttq.track('Search', {
        query: keyword,
        content_type: 'product',
        value: 1,
        currency: 'USD'
      })
      console.log('🟢 TikTok Search event sent:', keyword)
    } catch (e) {
      console.warn('TikTok Search track failed:', e)
    }
  }
  window.location.href = `/search?query=${encodeURIComponent(keyword)}`
}

const onEnterSearch = () => {
  if (searchInput.value.trim() !== '') {
    searchkeywords(searchInput.value.trim())
  }
}

const toggleShowAll = () => {
  showAllHistory.value = !showAllHistory.value
}

const closePanel = () => {
  isSearchHistoryVisible.value = false
}

const gouserinfo = () => {
  router.push('/userinfo')
}
const loginout = async () => {
  let res = await logout();

}
const checklogin = () => {

  if (isTokenValid.value) {
    isMobileCartMenuOpen.value = true
  } else {
    router.push('/login')

  }
}

const openAuthSheet = () => {
  showAuthSheet.value = true
}

const goAuthPage = (path: string) => {
  showAuthSheet.value = false
  router.push(path)
}
function goToCart() {
  router.push('/cart')
}
// 监听路由变化和搜索历史变化
watch(
  () => route.query.query,
  (newQuery) => {
    searchInput.value = typeof newQuery === 'string' ? newQuery : ''
  }
)

watch([filteredSearchHistory, isSearchHistoryVisible], () => {
  if (isSearchHistoryVisible.value) {
    checkHeight()
  }
})
</script>

<template>
  <nav class="w-full mx-auto text-white fixed z-[100]" id="navBar">
    <div class="bg-[#222222]">
      <div class="flex items-center justify-between navbar-grid py-[2px] max-lg:py-[6px] max-row">
        <div style="grid-area: logo" class="flex">
          <TheLogo class=""></TheLogo>
        </div>
        <div data-pg-name="Hamburger" style="grid-area: hamburger" class="lg:hidden flex">
          <NavHamburger @click="isMobileMenuOpen = true"></NavHamburger>
        </div>
        <div data-pg-name="Profile" class="flex gap-2 justify-end lg:justify-start cursor-pointer">
          <ProfileActions class="!hidden lg:!flex"></ProfileActions>
          <NuxtImg v-show="isuserTokenValid" @click="checklogin" src="/home/in_default.webp" alt="user"
            class="lg:!hidden w-[24px] h-[24px] cursor-pointer" />
          <NuxtImg src="/home/user_default.webp" class="lg:!hidden w-[24px] h-[24px]" @click="openAuthSheet"
            v-show="!isuserTokenValid" />
          <div class="relative lg:!hidden">
            <NuxtImg src="/home/cart_default.webp" class="w-[24px] h-[24px]" @click="goToCart" />
            <div v-if="cart.itemCount > 0"
              class="absolute top-[-7px] right-[-8px] w-4 h-4 flex items-center justify-center rounded-full text-white bg-primary text-[12px] font-semibold">
              {{ cart.itemCount }}</div>
          </div>
        </div>

        <div data-pg-name="Searchbox" style="grid-area: search;" class="flex items-center justify-center relative">
          <div class="w-[80%] max-lg:w-full  max-w-[700px] mx-auto rounded-[4px] relative">
            <UFormGroup hint="Optional" class="">
              <UInput v-model="searchInput" @keyup.enter="onEnterSearch" placeholder="Search..." size="md"
                class="w-full border-none ring-0 " autocomplete="off" :ui="{
                  base: '!shadow-none !ring-0 focus:ring-0 focus:ring-offset-0 focus:shadow-none rounded-b-none',
                  ring: 'focus:ring-0',
                  variant: { outline: 'shadow-none focus:ring-0' },
                  color: {
                    white: {
                      outline: 'bg-white dark:bg-white dark:text-gray-900'
                    }
                  }
                }"
                :input-class="isSearchHistoryVisible ? '!rounded-b-none border-b border-gray-100 focus:border-gray-100 focus:ring-0 focus:outline-none' : ''"
                @focus="isSearchHistoryVisible = true" @blur="closePanel">
                <template #trailing>
                  <div class="pointer-events-auto">
                    <button aria-label="search" @click="onEnterSearch"
                      class="flex items-center justify-center h-full px-1 text-gray-500 hover:text-black cursor-pointer font-bold"
                      :class="searchInput.trim() ? 'text-primary' : 'text-gray-400'">
                      <BaseIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 font-bold" style="stroke-width: 3" />
                    </button>
                  </div>
                </template>
              </UInput>

              <!-- 搜索历史面板 - 无滚动版本 -->
              <div v-if="isSearchHistoryVisible" @pointerdown.prevent
                class="absolute top-full  max-w-[700px]  left-0 w-full bg-white shadow-lg rounded p-2 z-50 rounded-t-none">
                <div class="flex justify-between items-center">
                  <div class="text-base text-d3black py-2 font-bold ml-1">Recent Searches</div>
                </div>
                <div ref="historyContentRef" class="mt-2 overflow-hidden" :style="{
                  'max-height': showAllHistory ? 'none' : '128px',
                  'transition': 'max-height 0.3s ease'
                }">
                  <span v-for="(item, index) in filteredSearchHistory" :key="index" @click="searchkeywords(item.id)"
                    @mousedown.prevent
                    class="inline-block px-3 py-2 bg-f0black text-d3black text-xs rounded border border-f0black mr-2 mb-1 cursor-pointer hover:border-primary max-w-[32%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {{ item.id }}
                  </span>
                  <div v-if="filteredSearchHistory.length === 0" class="text-gray-500 text-sm py-2 ml-1">
                    No recent searches
                  </div>
                </div>
                <div v-if="shouldShowMoreHint" @click="toggleShowAll" @mousedown.prevent
                  class="text-xs text-gray-500 mt-3 ml-1 hover:text-primary hover:border-b hover:border-primary cursor-pointer inline-block">
                  {{ showAllHistory ? 'Show less' : 'Records of the last 7 days' }}
                </div>
              </div>
            </UFormGroup>
          </div>
        </div>


      </div>
    </div>

    <div class="hidden lg:flex bg-primary">
      <NavPrimary class="lg:w-full max-row"></NavPrimary>
    </div>
    <USlideover v-model="isMobileMenuOpen" data-pg-name="NavBarSecondary" style="grid-area: primary-nav"
      class="w-72 lg:hidden z-[999]" side="left">
      <div class="flex flex-col h-full">
        <!-- 主体内容 -->
        <div class="flex-1 overflow-y-auto px-3">
          <NavPrimary />
        </div>
      </div>
    </USlideover>
    <USlideover v-model="isMobileCartMenuOpen" data-pg-name="NavCart" style="grid-area: primary-nav"
      class="w-72 lg:hidden  z-[999]" side="left">
      <div class="flex flex-col h-full">
        <!-- 主体内容 -->
        <div class="flex-1 overflow-y-auto">
          <Userslide />
        </div>
      </div>
    </USlideover>
    <UModal v-model="showAuthSheet"
      :ui="{ width: 'max-w-full sm:max-w-sm', container: 'items-end', base: 'rounded-t-2xl p-6 pb-8' }">
      <div class="space-y-4 text-center">
        <button class="w-full py-3 rounded-full bg-primary text-white font-medium" @click="goAuthPage('/login')">
          Sign In
        </button>
        <div class="flex items-center text-xs uppercase tracking-wider text-gray-400">
          <span class="flex-1 h-px bg-gray-200"></span>
          <span class="px-3">or</span>
          <span class="flex-1 h-px bg-gray-200"></span>
        </div>
        <div class="text-sm text-gray-500">
          No account? <span class="text-primary font-medium">Sign Up now</span>
        </div>
        <button class="w-full py-3 rounded-full border border-primary text-primary font-medium bg-white"
          @click="goAuthPage('/register')">
          Sign Up
        </button>
        <!-- <button class="w-full py-3 rounded-full border border-primary text-primary font-medium bg-white"
          @click="goAuthPage('/registerbusiness')">
          Sign Up for Business
        </button> -->
      </div>
    </UModal>
  </nav>
</template>

<style scoped>
.navbar-grid {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-template-areas: 'hamburger logo profile' 'search search search';
}

@media (min-width: 1024px) {
  .navbar-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'logo search profile' 'primary-nav primary-nav primary-nav';
  }
}
</style>