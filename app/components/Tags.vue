<template>

    <div class="max-row  my-2 md:my-8">
        <div class="grid grid-cols-1 md:grid-cols-4 bg-white py-6 rounded-xl">
            <div v-for="(feature, index) in features" :key="index" class="flex items-center gap-4 px-6 py-2"
                :class="{ 'md:border-l md:border-gray-100': index !== 0 }">
                <NuxtImg class="w-12 h-12 md:w-16 md:h-16" :alt="feature.title" :src="feature.icon" />
                <span class="text-blackcolor text-sm md:text-lg break-words">
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
