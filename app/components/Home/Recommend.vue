<script setup lang="ts">
import { ref, computed } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'

/** 父级控制：true=产品在左，false=产品在右 */
const props = defineProps<{
    productOnLeft?: boolean
}>()

const isProductLeft = computed(() => !!props.productOnLeft)

/** 左侧封面与可选视频（示例，可用父级传入改造） */
const cover = ref({
    image: './actbanner.png',
    // video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    video: 'https://cdn.incustom.com/upload/web/juanlian.mp4',
})

type Product = { id: string; title: string; image: string; price: number; originPrice?: number }
const products = ref<Product[]>([
    { id: 'p2', title: 'Custom Zebra Roller Shade – Arched Fabric Cassette, Drill Mount', image: 'https://cdn.incustom.com/upload/online/product/2025/8/5/34863/1952649866899591168.jpg', price: 129.0, originPrice: 159.0 },
    { id: 'p3', title: '阳伞 Patio Umbrella', image: 'https://cdn.incustom.com/upload/online/product/2025/8/5/29139/1952647899557105664.jpg', price: 89.99 },
    { id: 'p4', title: '户外靠枕 Outdoor Pillow', image: 'https://cdn.incustom.com/upload/online/product/2025/8/5/29184/1952647275734077440.jpg', price: 19.99 },
    { id: 'p1', title: '商品名称商品名称商品名称商品名称商品名称', image: 'https://cdn.incustom.com/upload/online/product/2025/8/5/33913/1952650251085254656.jpg', price: 155.33, originPrice: 199.66 },
])

/** 封面悬停播放 */
const hasVideo = computed(() => !!cover.value.video)
const isHovering = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const onEnter = () => { if (!hasVideo.value) return; isHovering.value = true; requestAnimationFrame(() => { videoRef.value && (videoRef.value.muted = true, videoRef.value.play().catch(() => { })) }) }
const onLeave = () => { if (!hasVideo.value) return; isHovering.value = false; if (videoRef.value) { videoRef.value.pause(); videoRef.value.currentTime = 0 } }

/** 右侧产品滑动（自定义底部按钮） */
const splideRef = ref<InstanceType<typeof Splide> | null>(null)
const splideOptions = { type: 'loop', gap: '12px', pagination: false, perPage: 1, arrows: false }
const goPrev = () => splideRef.value?.splide?.go('<')
const goNext = () => splideRef.value?.splide?.go('>')
</script>

<template>
    <div class="mt-[24px]">
        <div class="max-row mx-auto">
            <!-- md 起两列；窄列固定范围，宽列自适应；同时配合 order 切换左右 -->
            <div class="md:grid  gap-4 md:gap-6" :class="isProductLeft
                ? 'md:grid-cols-[28%_72%] lg:grid-cols-[30%_70%]'
                : 'md:grid-cols-[72%_28%] lg:grid-cols-[70%_30%]'">
                <!-- 大图列 -->
                <div :class="isProductLeft ? 'md:order-2' : 'md:order-1'">
                    <div class="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 group rounded"
                        @mouseenter="hasVideo && onEnter()" @mouseleave="hasVideo && onLeave()"
                        :class="hasVideo ? 'cursor-pointer' : ''">
                        <img :src="cover.image" alt="cover"
                            class="absolute inset-0 w-full h-full object-cover duration-500 group-hover:scale-105"
                            draggable="false" />
                        <video v-if="hasVideo" ref="videoRef" :src="cover.video!" playsinline preload="metadata"
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
                <div :class="isProductLeft ? 'md:order-1' : 'md:order-2'" class="mt-3 sm:mt-0">
                    <div class="h-full grid grid-rows-[1fr_auto]">
                        <!-- 轮播（可滚，防高） -->
                        <div class="min-h-0 overflow-auto">
                            <ClientOnly>
                                <Splide ref="splideRef" :options="splideOptions" aria-label="Products">
                                    <SplideSlide v-for="p in products" :key="p.id">
                                        <!-- 移动端：左图右文；md+：上下结构 -->
                                        <div class="flex gap-3 items-start md:block rounded">
                                            <div class="w-24 aspect-square shrink-0 md:w-full md:aspect-square ">
                                                <img :src="p.image" :alt="p.title"
                                                    class="w-full h-full object-cover rounded" draggable="false"
                                                    loading="lazy" />
                                            </div>
                                            <div class="flex-1 md:mt-2">
                                                <div class="mb-2 md:mb-2 lg:mb-3 text-sm line-clamp-2 text-d3black"
                                                    style="min-height: 2.8em;">
                                                    {{ p.title }}
                                                </div>
                                                <div class="text-sm text-customblack">
                                                    <span>${{ p.price.toFixed(2) }}</span>
                                                    <span v-if="p.originPrice" class="text-gray-400 line-through ml-2">
                                                        ${{ p.originPrice!.toFixed(2) }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </SplideSlide>
                                </Splide>
                            </ClientOnly>
                        </div>

                        <!-- 底部水平居中箭头 -->
                        <div class="mt-4 flex justify-center gap-2">
                            <UButton variant="soft" size="sm" @click="goPrev" aria-label="prev">
                                <UIcon name="i-heroicons-chevron-left-20-solid" class="h-4 w-4" />
                            </UButton>
                            <UButton variant="soft" size="sm" @click="goNext" aria-label="next">
                                <UIcon name="i-heroicons-chevron-right-20-solid" class="h-4 w-4" />
                            </UButton>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
