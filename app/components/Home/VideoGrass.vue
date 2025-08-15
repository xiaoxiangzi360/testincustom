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
    show?: boolean
    contentConfig?: {
        productlist?: Product[]
    }
}

const props = defineProps<{ item: ModuleConfig }>()

/** 只保留视频和封面都有的 */
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

const options = {
    type: 'slide',
    perPage: 4,
    gap: '16px',
    pagination: false,
    arrows: true,
    trimSpace: false,
    breakpoints: {
        1024: { perPage: 3, pagination: true },
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
const slugify = (str) => {
    return str
        .normalize('NFKD')           // 去掉重音符号
        .replace(/[^\w\s-]/g, '')    // 去掉非字母数字/下划线/空格/连字符
        .trim()
        .replace(/\s+/g, '-')        // 空格转-
        .replace(/-+/g, '-')         // 合并多个-
        .toLowerCase()
}
</script>

<template>
    <ClientOnly>
        <section v-if="items.length" class="mt-6 md:mt-8">
            <div class="max-row mx-auto ">
                <Splide :options="options" class="select-none video-splide bg-white pb-1" style="--vg-arrow-size: 44px">
                    <SplideSlide v-for="(p, idx) in items" :key="p.id">
                        <div class="overflow-hidden">
                            <!-- 视频封面 -->
                            <div class="relative aspect-[16/9] group cursor-pointer" @mouseenter="onEnter(idx)"
                                @mouseleave="onLeave(idx)" @click="onTap(idx)">
                                <img :src="p.img" alt="" class="h-full w-full object-cover rounded" />

                                <video v-if="p.video" :src="p.video"
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
                                        <div class="w-[72px] h-[72px] shrink-0 overflow-hidden border border-black/10">
                                            <img :src="p.thumb" alt="" class="w-full h-full object-cover rounded"
                                                loading="lazy" />
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-sm text-gray-800 leading-5 min-h-[2.5rem] line-clamp-2">
                                                {{ p.title }}
                                            </div>
                                            <div class="mt-2 flex items-baseline gap-2">
                                                <span v-if="p.price" class="text-sm text-customblack">
                                                    ${{ p.price.toFixed(2) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </ULink>
                            </div>
                        </div>
                    </SplideSlide>
                </Splide>
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
