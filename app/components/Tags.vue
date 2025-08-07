<template>
    <div class="max-row my-2 md:my-8">
        <div class="grid grid-cols-2 md:grid-cols-4 bg-white py-3 sm:py-6 rounded">
            <div v-for="(feature, index) in features" :key="index"
                class="flex flex-col items-center gap-1 sm:gap-2 px-2 py-2 text-center"
                :class="{ 'md:border-l md:border-gray-100': index !== 0 }">
                <NuxtImg class="w-7 h-7 md:w-16 md:h-16" :alt="feature.title" :src="feature.icon" />
                <span class="text-blackcolor text-xs md:text-lg break-words">
                    {{ feature.title }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
const features = [
    { icon: '/images/service3.png', title: 'Customized Just for You' },
    { icon: '/images/service1.png', title: 'Fast & Free Shipping' },
    { icon: '/images/service2.png', title: 'Manufacturer Direct to Consume' },
    { icon: '/images/service4.png', title: '24/7 Customer Support Assistance' }
];
</script>
