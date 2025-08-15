<script setup lang="ts">
import { ref, computed } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'

type ModuleItem = {
    id: string
    name: string
    componentType: number
    componentName: string
    componentPreviewUrl?: string
    contentConfig: any | string
}
const props = defineProps<{ item: ModuleItem }>()

const cfg = computed(() => {
    const raw = props.item?.contentConfig
    if (!raw) return { image: { url: '', alt: '' }, video: '', type: 1, productlist: [] }
    if (typeof raw === 'string') {
        try { return JSON.parse(raw) } catch { return { image: { url: '', alt: '' }, video: '', type: 1, productlist: [] } }
    }
    return raw
})

const isImageLeft = computed(() => Number(cfg.value?.type ?? 1) === 1)
const coverImage = computed(() => cfg.value?.image?.url || '')
const coverAlt = computed(() => cfg.value?.image?.alt || 'cover')
const videoUrl = computed(() => cfg.value?.video || '')
const hasVideo = computed(() => !!videoUrl.value)

const isHovering = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const onEnter = () => {
    if (!hasVideo.value) return
    isHovering.value = true
    requestAnimationFrame(() => {
        if (videoRef.value) {
            videoRef.value.muted = true
            videoRef.value.play().catch(() => { })
        }
    })
}
const onLeave = () => {
    if (!hasVideo.value) return
    isHovering.value = false
    if (videoRef.value) {
        videoRef.value.pause()
        videoRef.value.currentTime = 0
    }
}

type Product = { id: string; title: string; image: string; price?: number; originPrice?: number; alt?: string }
const products = computed<Product[]>(() => {
    const list = Array.isArray(cfg.value?.productlist) ? cfg.value.productlist : []
    return list.map((p: any) => ({
        id: String(p.id),
        title: p.productName || '',
        image: p.coverImg || p.productImg || '',
        alt: p.alt || p.productName || '',
        price: p.price,
        originPrice: p.originPrice,
    }))
})

const splideRef = ref<InstanceType<typeof Splide> | null>(null)
const splideOptions = { type: 'loop', gap: '12px', pagination: false, perPage: 1, arrows: false }
const goPrev = () => splideRef.value?.splide?.go('<')
const goNext = () => splideRef.value?.splide?.go('>')
const slugify = (str: string) =>
    str.normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase()
</script>

<template>
    <section class="mt-6 md:mt-8">
        <div class="max-row mx-auto">
            <!-- ✅ 关键：网格容器本身没问题，主要是子列需要 min-w-0 以允许收缩 -->
            <div class="md:grid gap-4 md:gap-6 bg-white overflow-x-hidden" :class="isImageLeft
                ? 'md:grid-cols-[7fr_3fr] lg:grid-cols-[7fr_3fr]'
                : 'md:grid-cols-[3fr_7fr] lg:grid-cols-[3fr_7fr]'">

                <!-- 大图列 -->
                <div :class="isImageLeft ? 'md:order-1' : 'md:order-2'" class="min-w-0"> <!-- ✅ min-w-0 -->
                    <div class="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 group rounded"
                        :class="hasVideo ? 'cursor-pointer' : ''" @mouseenter="onEnter" @mouseleave="onLeave">
                        <img :src="coverImage" :alt="coverAlt"
                            class="absolute inset-0 w-full h-full object-cover duration-500 group-hover:scale-105"
                            draggable="false" />
                        <video v-if="hasVideo" ref="videoRef" :src="videoUrl" playsinline preload="metadata"
                            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                            :class="isHovering ? 'opacity-100' : 'opacity-0'" />
                        <button v-if="hasVideo && !isHovering"
                            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 md:h-16 md:w-16 rounded-full bg-black/60 grid place-items-center text-white"
                            aria-label="play on hover">
                            <UIcon name="i-heroicons-play-solid" class="h-7 w-7 text-white" />
                        </button>
                    </div>
                </div>

                <!-- 产品列 -->
                <div :class="isImageLeft ? 'md:order-2' : 'md:order-1'" class="mt-3 sm:mt-0 min-w-0"> <!-- ✅ min-w-0 -->
                    <div class="h-full grid grid-rows-[1fr_auto] min-w-0"> <!-- ✅ min-w-0 -->
                        <!-- 轮播体 -->
                        <div class="min-h-0 overflow-auto min-w-0"> <!-- ✅ min-w-0 -->
                            <ClientOnly>
                                <!-- ✅ 给 Splide 一个 min-w-0，防止其内部计算把列撑开 -->
                                <Splide ref="splideRef" :options="splideOptions" aria-label="Products" class="min-w-0">
                                    <SplideSlide v-for="p in products" :key="p.id" class="min-w-0"> <!-- ✅ -->
                                        <ULink :to="`/product/${p.id}/${slugify(p.title)}`" class="block min-w-0">
                                            <!-- ✅ -->
                                            <!-- 移动端：左图右文；md+：上下结构 -->
                                            <div class="flex gap-3 items-start md:block rounded min-w-0"> <!-- ✅ -->
                                                <!-- ✅ 让图片容器裁切并不溢出 -->
                                                <div
                                                    class="w-24 aspect-square shrink-0 md:w-full md:aspect-square overflow-hidden rounded">
                                                    <!-- ✅ overflow-hidden & rounded -->
                                                    <img :src="p.image" :alt="p.alt || p.title"
                                                        class="w-full h-full object-cover" draggable="false"
                                                        loading="lazy" />
                                                </div>
                                                <div class="flex-1 md:mt-2 min-w-0"> <!-- ✅ -->
                                                    <div class="mb-2 md:mb-2 lg:mb-3 text-sm line-clamp-2 text-d3black"
                                                        style="min-height: 2.8em;">
                                                        {{ p.title }}
                                                    </div>
                                                    <div v-if="p.price" class="text-sm text-customblack">
                                                        <span>${{ p.price.toFixed(2) }}</span>
                                                        <span v-if="p.originPrice"
                                                            class="text-gray-400 line-through ml-2">
                                                            \${{ p.originPrice!.toFixed(2) }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </ULink>
                                    </SplideSlide>
                                </Splide>
                            </ClientOnly>
                        </div>

                        <!-- 底部箭头 -->
                        <div class="flex justify-center gap-2">
                            <button @click="goPrev" aria-label="prev" class="p-1">
                                <UIcon name="i-heroicons-chevron-left-20-solid" class="h-4 w-4" />
                            </button>
                            <button @click="goNext" aria-label="next" class="p-1">
                                <UIcon name="i-heroicons-chevron-right-20-solid" class="h-4 w-4" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
