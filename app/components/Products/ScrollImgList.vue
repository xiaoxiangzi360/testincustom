<template>
    <div class="relative w-full h-full" v-show="list.length>0">
        <!-- 缩略图容器 -->
        <div class="grid grid-flow-col auto-cols-[80px] max-md:auto-cols-[60px] gap-4 max-md:gap-1 overflow-x-auto  cursor-pointer scrollbar-hide"
            ref="thumbnailContainer">
            <div v-for="(item, index) in list" :key="index"
                class="relative w-[80px] h-[80px] max-md:w-[52px] max-md:h-[52px] p-[2px] rounded-lg overflow-hidden  bg-[#F8F8F8] hover:opacity-80"
                :class="{ 'border-[1px] border-primary': index === currentIndex }" @click="onThumbnailClick(index)">
                <!-- 判断是否为视频 -->
                <template v-if="item.type === 'video'">
                    <NuxtImg :src="`${item.url}?x-oss-process=video/snapshot,t_0,f_jpg,w_100,m_fast`"
                        class="w-full h-full object-cover rounded-[6px]" loading="lazy"></NuxtImg>
                    <!-- <video muted preload="metadata" playsinline :src="item.url"
                        class="w-full h-full object-cover rounded-[6px]"></video> -->
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50  rounded-[6px]">
                        <span class="text-white text-sm">▶</span>
                    </div>
                </template>
                <template v-else>
                    <NuxtImg :src="`${item.url}?x-oss-process=image/auto-orient,1/resize,w_80,limit_0/format,webp`"
                        :alt="item.altText || 'Thumbnail'" class="w-full h-full object-cover rounded-[6px]"
                        loading="lazy" format="webp" />
                </template>
            </div>
        </div>

        <!-- 导航箭头 -->
        <div class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white/90 rounded-full flex items-center justify-center text-primary transition-all duration-200 z-10"
            @click="prev" :style="{ cursor: showPrev ? 'pointer' : 'not-allowed',opacity: showPrev ? '1' : '0.5' }">
            <BaseIcon name="i-raphael:arrowleft2" class="text-primary w-4 h-4" />
        </div>

        <div :style="{ cursor: showNext ? 'pointer' : 'not-allowed',opacity: showNext ? '1' : '0.5' }" class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white/90 rounded-full flex
            items-center justify-center text-primary transition-all duration-200 z-10" @click="next">
            <BaseIcon name="i-raphael:arrowright2" class="text-primary w-4 h-4" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    currentIndex: {
        type: Number,
        required: true, // 父组件必须传入 currentIndex
    },
    list: {
        type: Array as PropType<{ url: string; altText: string; type: string }[]>,
        default: () => [],
    },
    wrapClass: {
        type: String,
        default: '',
    },
    itemClass: {
        type: String,
        default: '',
    },
});
const emit = defineEmits(['thumbnail-change']);
const thumbnailContainer = ref<HTMLElement | null>(null);

const currentIndex = ref(props.currentIndex);
const showPrev = computed(() => currentIndex.value > 0);
const showNext = computed(() => currentIndex.value < props.list.length - 1);

// 点击缩略图切换
const onThumbnailClick = (index: number) => {
    // currentIndex.value = index;
    // scrollToThumbnail();
    emit('thumbnail-change', index); // 通知父组件
};

// 滚动到当前缩略图
const scrollToThumbnail = () => {
    if (!thumbnailContainer.value) return;
    const thumbnails = thumbnailContainer.value.children;
    const currentThumbnail = thumbnails[currentIndex.value] as HTMLElement;
    if (currentThumbnail) {
        currentThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
};

// 滚动到下一个
const next = () => {
    if (currentIndex.value < props.list.length - 1) {
        emit('thumbnail-change', currentIndex.value + 1); // 通知父组件
    }
};

// 滚动到上一个
const prev = () => {
    if (currentIndex.value > 0) {
        emit('thumbnail-change', currentIndex.value - 1); // 通知父组件
    }
};

// 初始化
onMounted(() => {
    scrollToThumbnail();
});

// 监听 currentIndex 的变化
watch(() => props.currentIndex, (newIndex) => {
    currentIndex.value = newIndex;
    scrollToThumbnail();
});
</script>
