<template>
    <div class="max-row mx-auto px-32">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
            <div v-for="(item, index) in items" :key="index" @click="checklist(item.title)"
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
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 原始数据
const items = ref([
    {
        title: 'Outdoor Shade Solutions',
        description: 'UV protection for outdoor living. >',
        image: 'https://cdn.incustom.com/upload/web/collect1.webp',
    },
    {
        title: 'Privacy & Garden Decor',
        description: 'Stylish privacy for your backyard. >',
        image: 'https://cdn.incustom.com/upload/web/collect2.webp',
    },
    {
        title: 'Indoor Window Shades',
        description: 'Elegant shading for modern homes. >',
        image: 'https://cdn.incustom.com/upload/web/collect3.webp',
    },
    {
        title: 'Printed Shade & Screen',
        description: 'Print your ideas on fabric. >',
        image: 'https://cdn.incustom.com/upload/web/collect4.webp',
    },
])


const checklist = (title: string) => {
    router.push('/collections/' + title)
}
</script>

<style scoped>
.grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.text-shadow-custom {
    text-shadow: 0px 2px 4px rgba(34, 34, 34, 0.6);
}
</style>
