<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useCookie } from 'nuxt/app'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const searchInput = ref(route.query.query || '')
const token = useCookie('token')
const isTokenValid = computed(() => !!token.value)

// 控制移动菜单
const { isMobileMenuOpen } = useMobileMenu()

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

// 监听路由变化和搜索历史变化
watch(
  () => route.query.query,
  (newQuery) => {
    searchInput.value = newQuery || ''
  }
)

watch([filteredSearchHistory, isSearchHistoryVisible], () => {
  if (isSearchHistoryVisible.value) {
    checkHeight()
  }
})
</script>

<template>
  <nav class="bg-[#222222] w-full mx-auto text-white fixed z-50 h-[122px]">
    <div class="flex h-full items-center justify-between navbar-grid py-2 max-row">
      <div style="grid-area: logo" class="flex">
        <TheLogo></TheLogo>
      </div>
      <div data-pg-name="Hamburger" style="grid-area: hamburger" class="sm:hidden">
        <NavHamburger @click="isMobileMenuOpen = true"></NavHamburger>
      </div>
      <div data-pg-name="NavBarPrimary" style="grid-area: primary-nav" class="hidden sm:flex mt-4">
        <NavPrimary class="sm:w-full"></NavPrimary>
      </div>
      <div data-pg-name="Searchbox" style="grid-area: search;" class="max-w-100 ml-4 relative">
        <UFormGroup hint="Optional">
          <UInput v-model="searchInput" @keyup.enter="onEnterSearch" placeholder="Search..." size="md"
            class="w-full border-none ring-0" autocomplete="off" :ui="{
              base: '!shadow-none !ring-0 focus:ring-0 focus:ring-offset-0 focus:shadow-none rounded-b-none',
              ring: 'focus:ring-0',
              variant: { outline: 'shadow-none focus:ring-0' },
            }"
            :input-class="isSearchHistoryVisible ? '!rounded-b-none border-b border-gray-100 focus:border-gray-100 focus:ring-0 focus:outline-none' : ''"
            @focus="isSearchHistoryVisible = true" @blur="closePanel">
            <template #trailing>
              <div class="pointer-events-auto">
                <button aria-label="search" @click="onEnterSearch"
                  class="flex items-center justify-center h-full px-2 text-gray-500 hover:text-black cursor-pointer font-bold"
                  :class="searchInput.trim() ? 'text-primary' : 'text-gray-400'">
                  <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 font-bold" style="stroke-width: 3" />
                </button>
              </div>
            </template>
          </UInput>

          <!-- 搜索历史面板 - 无滚动版本 -->
          <div v-if="isSearchHistoryVisible" @pointerdown.prevent
            class="absolute top-full left-0 w-full bg-white shadow-lg rounded p-2 z-50 rounded-t-none">
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

      <div data-pg-name="Profile" class="flex space-x-1">
        <ProfileActions class="!hidden sm:!flex"></ProfileActions>
      </div>
    </div>
    <USlideover v-model="isMobileMenuOpen" data-pg-name="NavBarSecondary" style="grid-area: primary-nav"
      class="w-80 sm:hidden" side="left">
      <NavPrimary class="m-4"></NavPrimary>
    </USlideover>
  </nav>
</template>

<style scoped>
.navbar-grid {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-template-areas: 'hamburger logo profile' 'search search search';
}

@media (min-width: 640px) {
  .navbar-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'logo search profile' 'primary-nav primary-nav primary-nav';
  }
}

@media (min-width: 1280px) {
  .navbar-grid {
    /* Adjust as needed */
  }
}
</style>