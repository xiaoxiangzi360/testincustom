<template>
    <div class="max-row mx-auto px-32">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
            <NuxtLink v-for="(item, index) in items" :key="index" :to="`/collections/${formatTitle(item.tag)}`"
                class="relative h-[160px] lg:h-[220px] rounded overflow-hidden group cursor-pointer transition-shadow duration-300">
                <NuxtImg :src="item.image + '?x-oss-process=image/auto-orient,1/resize,w_700,limit_0'"
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
        title: 'Outdoor Shade Solutions',
        tag: 'Outdoor Shade Solutions',
        description: 'UV protection for outdoor living. >',
        image: 'https://cdn.incustom.com/upload/web/collect1031-1.webp',
    },
    {
        title: 'Privacy & Garden Decor',
        tag: 'Privacy & Garden Decor',
        description: 'Stylish privacy for your backyard. >',
        image: 'https://cdn.incustom.com/upload/web/collect1031-2.webp',
    },
    {
        title: 'Indoor Window Shades',
        tag: 'Indoor Window Shades',
        description: 'Elegant shading for modern homes. >',
        image: 'https://cdn.incustom.com/upload/web/collect1031-3.webp',
    },
    {
        title: 'Printed Shade & Screen',
        tag: 'Printed Shade & Screen',
        description: 'Print your ideas on fabric. >',
        image: 'https://cdn.incustom.com/upload/web/collect1031-4.webp',
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
