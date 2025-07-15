<template>
    <div class="mt-16">
        <div class="max-row">
            <!-- 标题 -->
            <h1
                class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal mb-6 md:mb-8 bg-clip-text text-blackcolor text-center">
                Customized to your needs
            </h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Product Category Card -->
                <div class="relative rounded-lg overflow-hidden md:h-[150px] h-[150px] group cursor-pointer"
                    v-for="(need, index) in needs" :key="index">
                    <NuxtImg :src="need.img" format="webp" :alt="need.title"
                        class="w-full h-full object-cover object-top" />
                    <div class="absolute inset-0  transition-all duration-300  flex items-center justify-center">
                        <div class="text-white text-center">
                            <NuxtImg :src="need.icon" :alt="need.title" class="w-12 md:w-16 mx-auto mb-2" />
                            <h3 class="text-xl font-medium">{{ need.title }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const needs = ref([
    { title: 'Product category', img: '/images/needs1.webp', icon: '/images/needs_icon1.png' },
    { title: 'Color selection', img: '/images/needs2.webp', icon: '/images/needs_icon2.png' },
    { title: 'Size customization', img: '/images/needs3.webp', icon: '/images/needs_icon3.png' },
    { title: 'Print-On-Demand', img: '/images/needs4.webp', icon: '/images/needs_icon4.png' },
]);
</script>
