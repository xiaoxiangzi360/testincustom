<template>
    <div class="max-row md:my-4">
        <!-- ✅ 移动端：Splide 轮播（无小圆点） -->
        <div class="md:hidden feature-splide">
            <Splide :options="{
                type: 'loop',
                perPage: 1,
                gap: '12px',
                arrows: false,
                pagination: false,
                autoplay: false,
                speed: 600,
                padding: '12px'
            }" class="bg-white rounded ">
                <SplideSlide v-for="(feature, index) in features" :key="'m-' + index">
                    <div class="flex items-center justify-center gap-[28px] px-4 py-[26px] rounded-lg"
                        style="box-shadow: 0px 4px 10px 0px rgba(167,167,167,0.2);">
                        <NuxtImg class="w-11 h-11" :alt="feature.title" :src="feature.icon" />
                        <span class="text-blackcolor text-base text-left whitespace-pre-line leading-snug">
                            {{ feature.title }}
                        </span>
                    </div>
                </SplideSlide>
            </Splide>
        </div>

        <!-- 💻 桌面端：4列网格 -->
        <div class="hidden md:grid md:grid-cols-4 bg-white rounded py-[26px]"
            style="box-shadow: 0px 4px 10px 0px rgba(167,167,167,0.2);">
            <div v-for="(feature, index) in features" :key="'d-' + index"
                class="flex flex-row items-center justify-center gap-[28px] px-2 text-left"
                :class="{ 'md:border-l md:border-gray-100': index !== 0 }">
                <NuxtImg class="w-11 h-11 flex-shrink-0" :alt="feature.title" :src="feature.icon" />
                <span class="text-blackcolor text-base text-left whitespace-pre-line leading-snug">
                    {{ feature.title }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'

const features = [
    { icon: 'https://cdn.incustom.com/upload/web/service1.webp', title: 'Shipped within\n48-72 hours' },
    { icon: 'https://cdn.incustom.com/upload/web/service2.webp', title: 'From manufacturer\nto consumer' },
    { icon: 'https://cdn.incustom.com/upload/web/service3.webp', title: 'Assistance with\nproject design' },
    { icon: 'https://cdn.incustom.com/upload/web/service4.webp', title: 'After-sale\nservice' }
]
</script>

<style scoped>
:deep(.feature-splide .splide__track) {
    padding-bottom: 12px;
    padding-top: 12px;
}
</style>
