<!-- components/HomeVideoGrass.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'

type Product = {
    id: string
    productName: string
    productImg: string
    price?: number
    video?: string
    videoCover?: string
}
type ModuleConfig = {
    componentType: number
    name: string
    desc: string
    show?: boolean
    contentConfig?: {
        productlist?: Product[]
    }
}

const props = defineProps<{ item: ModuleConfig }>()

/** 只保留视频和封面都有的 —— 保持你的原始结构字段：id/title/img/thumb/video/price */
const items = computed(() => {
    return (props.item?.contentConfig?.productlist || [])
        .filter(p => p.video && p.videoCover)
        .map(p => ({
            id: String(p.id),
            title: p.productName,
            img: p.videoCover,
            thumb: p.productImg,
            video: p.video,
            price: p.price,
        }))
})

/** 视频交互（保持你的原逻辑不变） */
const videoRefs = ref<(HTMLVideoElement | null)[]>([])
const isPlaying = ref<Record<number, boolean>>({})

const bindVideoRef = (el: HTMLVideoElement | null, idx: number) => {
    videoRefs.value[idx] = el
}
const playAt = async (idx: number) => {
    const v = videoRefs.value[idx]
    if (!v) return
    try {
        v.muted = true
        await v.play()
        isPlaying.value[idx] = true
    } catch { }
}
const pauseAt = (idx: number) => {
    const v = videoRefs.value[idx]
    if (!v) return
    v.pause()
    v.currentTime = 0
    isPlaying.value[idx] = false
}
const onEnter = (idx: number) => playAt(idx)
const onLeave = (idx: number) => pauseAt(idx)
const onTap = (idx: number) => {
    if (isPlaying.value[idx]) pauseAt(idx)
    else playAt(idx)
}

/** 轮播设置（禁用自带箭头） */
const splideRef = ref()
const options = {
    type: 'slide',
    perPage: 4,
    gap: '16px',
    pagination: false,
    arrows: false, // 禁用自带箭头
    trimSpace: false,
    breakpoints: {
        1024: { perPage: 3, pagination: true, arrows: false },
        768: {
            perPage: 1,
            type: 'loop',
            focus: 'center',
            padding: { left: '30px', right: '30px' },
            gap: '12px',
            arrows: false,
            pagination: false,
        },
        640: {
            perPage: 1,
            type: 'loop',
            focus: 'center',
            padding: { left: '30px', right: '30px' },
            gap: '12px',
            arrows: false,
            pagination: false,
        },
    },
}

// 轮播控制方法
const goPrev = () => {
    (splideRef.value as any)?.splide?.go('<')
}

const goNext = () => {
    (splideRef.value as any)?.splide?.go('>')
}

const slugify = (str: string) => {
    return str
        .normalize('NFKD')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
}

/** 标题与副标题（带兜底） */
const title = computed(() => props.item?.name?.trim() || '')
const subtitle = computed(() => props.item?.desc?.trim() || '')
</script>

<template>
    <ClientOnly>
        <section v-if="items.length" class="mt-6 md:mt-[72px]">
            <h1
                class="text-xl md:text-[40px] bg-clip-text font-semibold text-primary text-center dark:text-primary mb-3">
                {{ title }}
            </h1>
            <div class="text-[#5A5B5B] text-base text-center">
                {{ subtitle }}
            </div>
            <div class="max-row mx-auto mt-10 relative">
                <Splide ref="splideRef" :options="options" class="select-none video-splide bg-white pb-1">
                    <SplideSlide v-for="(p, idx) in items" :key="p.id">
                        <div class="overflow-hidden">
                            <!-- 视频封面（直接使用 p.img，带兜底） -->
                            <div class="relative aspect-[16/9] group cursor-pointer rounded overflow-hidden"
                                @mouseenter="onEnter(idx)" @mouseleave="onLeave(idx)" @click="onTap(idx)">
                                <NuxtImg
                                    :src="(p.img || '/images/empty.jpg') + '?x-oss-process=image/auto-orient,1/resize,w_600,limit_0'"
                                    alt="" class="h-full w-full object-cover rounded duration-500 group-hover:scale-105"
                                    loading="lazy" />

                                <video v-if="p.video" :src="p.video"
                                    :poster="(p.img || '/images/empty.jpg') + '?x-oss-process=image/auto-orient,1/resize,w_600,limit_0'"
                                    :ref="(el) => bindVideoRef(el as HTMLVideoElement | null, idx)" playsinline
                                    preload="metadata"
                                    class="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
                                    :class="isPlaying[idx] ? 'opacity-100' : 'opacity-0'" />

                                <div v-if="p.video && !isPlaying[idx]"
                                    class="pointer-events-none absolute inset-0 grid place-content-center">
                                    <span
                                        class="h-11 w-11 rounded-full bg-black/60 text-white grid place-content-center">▶</span>
                                </div>
                            </div>

                            <!-- 商品信息 -->
                            <div class="mt-3">
                                <ULink :to="`/product/${p.id}/${slugify(p.title)}`" class="block">
                                    <div class="flex items-start gap-3">
                                        <div
                                            class="w-[72px] h-[72px] shrink-0 overflow-hidden border border-black/10 rounded">
                                            <!-- 产品缩略图（直接使用 p.thumb，带兜底） -->
                                            <NuxtImg
                                                :src="(p.thumb || '/images/empty.jpg') + '?x-oss-process=image/auto-orient,1/resize,w_320,limit_0'"
                                                alt="" class="w-full h-full object-cover" loading="lazy" />
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-sm text-gray-800 leading-5 min-h-[2.5rem] line-clamp-2">
                                                {{ p.title }}
                                            </div>
                                            <div class="mt-2 flex items-baseline gap-2">
                                                <span v-if="p.price != null" class="text-sm text-customblack">
                                                    ${{ Number(p.price).toFixed(2) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </ULink>
                            </div>
                        </div>
                    </SplideSlide>
                </Splide>

                <!-- 自定义左右箭头按钮 -->
                <div v-if="items.length > 4" class="video-button-prev absolute left-3 top-1/2 -translate-y-1/2 z-30 cursor-pointer
                  sm:left-[calc(1rem+12px)] lg:left-[calc(1.5rem+12px)] xl:left-[calc(4rem+12px)]" @click="goPrev">
                    <div
                        class="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow text-primary">
                        <span class="text-primary text-lg font-bold select-none">‹</span>
                    </div>
                </div>
                <div v-if="items.length > 4" class="video-button-next absolute right-3 top-1/2 -translate-y-1/2 z-30 cursor-pointer
                  sm:right-[calc(1rem+12px)] lg:right-[calc(1.5rem+12px)] xl:right-[calc(4rem+12px)]" @click="goNext">
                    <div
                        class="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow text-primary">
                        <span class="text-primary text-lg font-bold select-none">›</span>
                    </div>
                </div>
            </div>
        </section>
    </ClientOnly>
</template>

<style scoped>
/* 让箭头可以“探出”容器外半个箭头宽度 */
.video-splide :deep(.splide__arrow) {
    width: var(--vg-arrow-size, 44px);
    height: var(--vg-arrow-size, 44px);
    z-index: 10;
    /* 避免被内容盖住 */
    box-shadow: 0 2px 6px rgb(0 0 0 / 12%);
}

/* 左箭头往左探出一半 */
.video-splide :deep(.splide__arrow--prev) {
    left: calc(var(--vg-arrow-size, 44px) / -2);
}

/* 右箭头往右探出一半 */
.video-splide :deep(.splide__arrow--next) {
    right: calc(var(--vg-arrow-size, 44px) / -2);
}

/* 保持方向正确 */
.video-splide :deep(.splide__arrow--prev svg) {
    transform: rotate(180deg);
    /* 左箭头朝左 */
}

.video-splide :deep(.splide__arrow--next svg) {
    transform: none;
    /* 右箭头朝右 */
}

/* 如果父容器裁剪了溢出，可解开这句 */
.video-splide {
    overflow: visible;
}
</style>
