<template>
    <div class="bg-primary flex items-center justify-center" :style="{ backgroundColor: pageInfo?.backgroundColor }">
        <div v-show="pageInfo?.statusLogic == 200" class="bg-primary md:max-w-[80%] w-full overflow-hidden  relative cursor-pointer"
            ref="parentRef" :style="{ height: `${topHeight}px`, backgroundColor: pageInfo?.backgroundColor }">
            <div class="flex flex-col items-center w-full" :style="containerStyle" v-if="isPageLoaded">
                <!-- 原始项 -->
                <ShadowHtml v-for="(item, index) in listData" :key="index" :html="item.content"
                    class="w-full text-center line-clamp-1"
                    :style="{ height: `${topHeight}px`, flex: pageInfo.value?.switchEffect == 50 ? '0 0 100vw' : '0 0 auto' }"
                    @click="() => handleClick(item)">
                </ShadowHtml>
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const PageTag = 'ActivityBar======';
const { getLatestPublishedNoticeBoard } = ActivityAuth();
const { setHeaderHeight, headerHeight } = useHeaderHeight();
const { isPageLoaded } = usePageInteraction();
const testData = [
    '<p><span class="text-small" style="color:hsl(0, 0%, 100%);font-family:Arial, Helvetica, sans-serif;">Free Shipping on all Custom Orders</span></p>',
    //   '<p><span class="text-small" style="color:hsl(0, 0%, 100%);font-family:Arial, Helvetica, sans-serif;">Spread the Love: &nbsp;Spend $200, Save $30!</span></p>',
    //   '<p><span class="text-small" style="color:hsl(0, 0%, 100%);font-family:Arial, Helvetica, sans-serif;">Sweetheart Deal:  Save $60 When You Spend $300!</span></p>',
    //   '<p><span class="text-small" style="color:hsl(0, 0%, 100%);font-family:Arial, Helvetica, sans-serif;">Gift of Love:  Free Cozy Socks with $200+ Orders!</span></p>',

]
const pageInfo = ref<any>({});
const parentRef = ref<HTMLElement | null>(null);
const topHeight = 26; // 每项高度
const listData = computed(() => {
    if (pageInfo.value && pageInfo.value.contentList) {
        return pageInfo.value.contentList;
    }
    return [];
});

const currentIndex = ref(0);
const isTransitioning = ref(true);
const { isMobile, isPad } = useMobile();

const initData = async () => {
    const res = await getLatestPublishedNoticeBoard({});
    if (res.result) {
        pageInfo.value = res.result;
        console.log(PageTag, '滚动广告---pageInfo.value===', pageInfo.value);
        // pageInfo.value.switchEffect = 50;
        // pageInfo.value = testData;
        if (listData.value.length <= 1) return;
        interval = setInterval(nextItem, 3000);
    } else {
        // throwPageError('No Data');
    }

}

// 计算容器样式
const containerStyle = computed<any>(() => {
    const direction = pageInfo.value.switchEffect == 50 ? 'X' : 'Y';
    const { width: w, height: h } = parentRef.value?.getBoundingClientRect() || { w: 0, h: 0 };
    const offset = pageInfo.value.switchEffect == 50 ? w * currentIndex.value : currentIndex.value * h;

    return {
        flexDirection: pageInfo.value.switchEffect == 50 ? 'row' : 'column',
        transform: `translate${direction}(-${offset}px)`,
        transition: isTransitioning.value ? 'transform 1.2s ease-in-out' : 'none',
    };
});

const handleClick = (item) => {
    if (item.url) {
        if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
            window.location.href = item.url;
        } else {
            navigateTo(item.url);
        }
    }
}
watchEffect(() => {
    if (isPad.value || isMobile.value) {
        setHeaderHeight(pageInfo.value?.statusLogic == 200 ? 80 + topHeight : 80);
    } else {
        setHeaderHeight(pageInfo.value?.statusLogic == 200 ? 100 + topHeight : 100);
    }
});

// 切换到下一项
const nextItem = () => {
    isTransitioning.value = true;
    currentIndex.value += 1;

    // 如果到达克隆项，准备重置
    if (currentIndex.value >= listData.value.length) {
        setTimeout(() => {
            // 禁用过渡，瞬间跳回第一项
            isTransitioning.value = false;
            currentIndex.value = 0;

            // 下一轮重新启用过渡
            setTimeout(() => {
                isTransitioning.value = true;
            }, 50);
        }, 500); // 等待过渡完成
    }
};

// 自动滚动
let interval: NodeJS.Timeout | null = null;
onMounted(() => {
    initData();
});

onUnmounted(() => {
    if (interval) clearInterval(interval);
});
</script>
