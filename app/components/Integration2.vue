<template>
    <section class="py-12 bg-white max-row">
        <div class="max-w-6xl mx-auto px-4 md:px-8">
            <!-- 标题 -->
            <h1 class="text-3xl md:text-4xl text-title font-bold text-center mb-12">Why incustom</h1>

            <!-- 功能卡片区域 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <UCard v-for="(item, index) in features" :key="index"
                    class="flex flex-col items-center text-center  bg-white border border-gray-200 rounded-xl shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105 min-h-[180px] md:min-h-[200px]">
                    <div class="w-16 h-16 flex items-center justify-center mb-1 border-gray-400 rounded-lg mx-auto">
                        <NuxtImg :src="item.icon" :alt="item.title" class="w-12 h-12 object-contain" />
                    </div>

                    <h3 class="text-base font-semibold text-title">{{ item.title }}</h3>
                    <p class="text-title mt-2 text-sm md:text-base flex-grow">{{ item.description }}</p>
                </UCard>

            </div>
        </div>
    </section>
</template>

<script setup>
const features = [
    { icon: "/images/why1.png", title: "All Over Print", description: "High-quality Full-print" },
    { icon: "/images/why2.png", title: "Free to Use", description: "Only pay for fulfillment & shipping" },
    { icon: "/images/why3.png", title: "No Minimum Order", description: "Order anytime, no stock needed" },
    { icon: "/images/why4.png", title: "24/7 Support", description: "Always here to help" },
    { icon: "/images/why5.png", title: "Quality Guarantee", description: "Strict production standards" },
    { icon: "/images/why6.png", title: "Global Shipping", description: "Fast worldwide delivery" },
];
</script>
