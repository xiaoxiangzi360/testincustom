<template>
    <div class="max-row">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
            <NuxtLink v-for="(item, index) in items" :key="index"
                :to="`/collections/${formatTitle(item.tag)}-${item.tagid}`"
                class="relative h-[160px] lg:h-[220px] rounded overflow-hidden group cursor-pointer transition-shadow duration-300">
                <NuxtImg :src="`${item.image}?x-oss-process=image/auto-orient,1/quality,q_90`"
                    class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    format="webp" alt="InCustom" loading="lazy" />
                <div class="absolute inset-0 flex items-center">
                    <div class="flex flex-col gap-3 text-white left-12 absolute">
                        <h2
                            class="text-base sm:text-2xl font-semibold mb-0 text-shadow-custom group-hover:text-primary-500 transition-colors duration-300">
                            {{ item.title }}
                        </h2>
                        <div
                            class="text-sm underline text-shadow-custom group-hover:text-primary-500 transition-colors duration-300">
                            {{ item.description }}
                            <i class="fas fa-arrow-right ml-2"></i>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 原始数据
const items = ref([
    {
        title: 'Cellular Shades',
        tag: 'Cellular Shades',
        tagid: '1998944860874358794',
        description: 'Elegant solutions for energy savings and light control. >',
        image: 'https://cdn.incustom.com/upload/web/collect0120-1-1.webp',
    },
     {
        title: 'Fence Screen',
        tag: 'Fence Screen',
        tagid: '2000747693634469888',
        description: 'Outdoor panels with personalized patterns and sizes. >',
        image: 'https://cdn.incustom.com/upload/web/collect0120-1-2.webp',
    },
    {
        title: 'Zebra Shades',
        tag: 'Zebra Shades',
        tagid: '1998944860874358807',
        description: 'Easily switch between privacy and natural light. >',
        image: 'https://cdn.incustom.com/upload/web/collect0120-1-3-2.webp',
    },
    {
        title: 'Waterproof Shade Cloth',
        tag: 'Waterproof Shade Cloth',
        tagid: '1998944860874358804',
        description: '100% waterproof fabric for all-weather outdoor protection. >',
        image: 'https://cdn.incustom.com/upload/web/collect0120-1-4.webp',
    },
])

// 将标题格式化为 URL 友好形式
const formatTitle = (title: string) => {
    return title.replace(/\s+/g, '-')
}
</script>

<style scoped>
.text-shadow-custom {
    text-shadow: 0px 2px 4px rgba(34, 34, 34, 0.6);
}
</style>
