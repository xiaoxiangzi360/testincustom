<template>
    <div class="bg-[#EFF5F5]">
        <div class="max-row mx-auto px-4 py-8 md:py-12">
            <!-- Hero Section -->
            <h1 class="text-2xl md:text-4xl font-bold text-title text-center mb-8 md:mb-12">
                Your Exclusive Customization Service
            </h1>

            <!-- Hero Banner -->
            <div class="relative w-full min-h-64 md:h-[500px] rounded-xl overflow-hidden mb-12">
                <img :src="heroImage" alt="Customization Service" class="w-full h-full object-cover" />
                <div class="absolute inset-0  flex flex-col justify-end p-6 md:p-12">
                    <!-- <p class="text-white text-lg md:text-2xl font-medium text-center md:text-left">
                        Personalized solutions for your needs
                    </p> -->
                </div>
            </div>

            <!-- Service Features -->
            <div class="bg-white rounded-xl p-2 md:p-8">
                <div class="grid grid-cols-1 md:grid-cols-4">
                    <div v-for="(feature, index) in features" :key="index" class="flex items-center gap-4 px-6 py-4"
                        :class="{ 'md:border-l md:border-gray-200': index !== 0 }">
                        <NuxtImg class="w-12 h-12 md:w-16 md:h-16" :src="feature.icon" />
                        <span class="text-gray-800 text-sm md:text-base font-medium break-words">
                            {{ feature.title }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const heroImage = ref('/images/service.png'); // 确保路径正确

const features = [
    { icon: '/images/service1.png', title: 'Delivery within 48-72 hours' },
    { icon: '/images/service2.png', title: 'From manufacturer to consumer' },
    { icon: '/images/service3.png', title: 'Assistance with project design' },
    { icon: '/images/service4.png', title: '24/7 After-sale service' }
];
</script>
