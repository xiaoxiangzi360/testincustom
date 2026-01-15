<template>
    <div class="w-full h-full relative overflow-visible">
        <div v-if="list.length > 0" class="relative w-full overflow-hidden rounded-[6px] h-full" id="mainImgListDiv"
            @mousedown="onDragStart" @mousemove="onDragMove" @mouseup="onDragEnd" @mouseleave="onDragEnd"
            @touchstart="onDragStart" @touchmove="onDragMove" @touchend="onDragEnd" @mouseenter="onMouseEnter">
            <!-- 图片/视频容器 -->
            <div class="flex transition-transform duration-300 ease-in-out " :class="wrapClass"
                :style="`transform: translateX(-${currentIndex * 100}%)`">
                <div v-for="(item, index) in list" :key="index"
                    class="w-full flex-shrink-0 flex justify-center items-center" :class="itemClass">
                    <!-- 判断是否为视频 -->
                    <template v-if="item.type === 'video'">
                        <video :src="item.url" playsinline class="w-full object-contain select-none flex items-center justify-center bg-black" controls
                            draggable="false" :alt="item.altText" preload="metadata" style="aspect-ratio: 1 / 1;" />
                    </template>
                    <template v-else>
                        <!--:src="loadedImages[index] ? item.url : `/home/place_img.png`" -->
                        <NuxtImg fetchpriority="high" format="webp" :data-index="index"
                            :src="`${item.url}?x-oss-process=image/format,webp`"
                            class="w-full h-full object-contain select-none lazy-image" draggable="false"
                            style="aspect-ratio: 1 / 1;" :alt="item.altText" loading="eager"
                            :class="{ 'cursor-pointer': !isMobile }" />
                    </template>
                </div>
            </div>
            <div v-show="!isMobile && curItem?.type !== 'video' && !mouseBtnIn && showZoomBox" :style="zoomBoxStyle"
                class="absolute top-0 bg-white bg-opacity-50 z-[20]">
            </div>
            <!-- 导航箭头 -->
            <div name="i-raphael:arrowleft2"
                class=" absolute left-[5px] top-1/2 -translate-y-1/2 cursor-pointer
                   transition-all duration-300 ease-in-out 
                   w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow text-primary  z-[100]" @click="prev"
                :style="{ opacity: showZoomBox || mouseBtnIn ? (list.length > 1 && showPrev ? '0.6' : '0.3') : '0', cursor: showPrev ? 'pointer' : 'not-allowed' }"
                @mouseleave="onBtnMouseLeave" @mouseenter="onBtnMouseEnter">
                <BaseIcon name="i-raphael:arrowleft2" class="text-primary w-6 h-6" />
            </div>

            <div name="i-raphael:arrowright2"
                class="absolute right-[5px] top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-in-out 
                   w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow text-primary z-[100]" @click="next"
                :style="{ opacity: showZoomBox || mouseBtnIn ? (list.length > 1 && showNext ? '0.6' : '0.3') : '0', cursor: showNext ? 'pointer' : 'not-allowed'  }"
                @mouseleave="onBtnMouseLeave" @mouseenter="onBtnMouseEnter">
                <BaseIcon name="i-raphael:arrowright2" class="text-primary w-6 h-6" />
            </div>
        </div>
        <NuxtImg v-else format="webp" src="/home/place_img.png" loading="eager" :alt="'Product image'"
            class="w-full h-full object-cover" style="aspect-ratio: 1 / 1;" />
        <div v-show="!isMobile && curItem?.type !== 'video' && !mouseBtnIn && showZoomBox"
            class="absolute top-1/2 left-[calc(100%+10px)] -translate-y-1/2 bg-white flex justify-center items-center z-[1000] shadow-lg rounded-[6px]"
            :style="zoomPreviewBoxStyle">
            <div class="w-full h-full bg-no-repeat bg-center rounded-[6px]" :style="zoomedImageStyle"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    // defaultIndex: {
    //     type: Number,
    //     default: 0
    // },
    currentIndex: {
        type: Number,
        required: false
    },
    list: {
        type: Array as PropType<{ url: string; altText: string; type: string }[]>,
        default: () => []
    },
    wrapClass: {
        type: String,
        default: ''
    },
    itemClass: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['img-change']);

const currentIndex = ref(props.currentIndex)
// const loadedImages = ref<boolean[]>(props.list.map(() => false)) // 记录图片是否加载完成
// // 标记 currentIndex 对应的图片为已加载
// if (props.list[props.currentIndex]?.type === 'image') {
//     loadedImages.value[props.currentIndex] = true;
// }
// 手势滑动相关变量
let startX = 0
let deltaX = 0
let isDragging = false


// 计算属性：是否显示 prev 和 next 按钮
const showPrev = computed(() => currentIndex.value > 0)
const showNext = computed(() => currentIndex.value < props.list.length - 1)

const curItem = computed(() => {
    return props.list?.[currentIndex.value]
})
// 放大镜相关变量
const zoomPreviewBoxStyle = ref({})
const zoomBoxStyle = ref({});
const zoomedImage = ref('');
const zoomedImageStyle = ref({});
const showZoomBox = ref(false);
const zoomScale = 3;
const mouseBtnIn = ref(false);

// 检测是否为移动端（禁用放大镜功能）
const isMobile = computed(() => {
    if (!process.client) return false
    return window.innerWidth < 768 // md断点
})

// 监听currentIndex变化
watch(() => props.currentIndex, (newIndex) => {
    currentIndex.value = newIndex;
    stopVideoPlayback();
})

// 当鼠标进入主图时，显示放大方块（移动端不启用）
const onMouseEnter = () => {
    if (isMobile.value) return
    showZoomBox.value = true;
};


// 当鼠标移动时，更新放大框的位置和显示内容（移动端不启用）
const handleMove = (event) => {
    if (isMobile.value) return
    const swiperSlide = document.getElementById('mainImgListDiv');
    const { left, top, width, height } = swiperSlide.getBoundingClientRect();
    const offsetX = event.clientX - left;
    const offsetY = event.clientY - top;

    // 设置预览框大小与主图一致
    zoomPreviewBoxStyle.value = {
        width: `${width}px`,
        height: `${height}px`,
    };

    // 计算选框大小（预览大小 / 缩放比例）
    const selectSize = width / zoomScale;
    const halfSize = selectSize / 2;

    // 计算选框中心位置，并限制在边界内
    let centerX = offsetX;
    centerX = Math.max(halfSize, Math.min(centerX, width - halfSize));
    let centerY = offsetY;
    centerY = Math.max(halfSize, Math.min(centerY, height - halfSize));

    // 计算选框左上角位置
    const selectLeft = centerX - halfSize;
    const selectTop = centerY - halfSize;

    // 更新放大方块的位置
    zoomBoxStyle.value = {
        top: `${selectTop}px`,
        left: `${selectLeft}px`,
        width: `${selectSize}px`,
        height: `${selectSize}px`,
        display: 'block',
    };

    // 获取当前主图的 src
    zoomedImage.value = props.list[currentIndex.value].url;

    // 更新放大图片的样式
    zoomedImageStyle.value = {
        backgroundPositionX: `-${selectLeft * zoomScale}px`,
        backgroundPositionY: `-${selectTop * zoomScale}px`,
        backgroundImage: `url(${zoomedImage.value})`,
        backgroundSize: `${width * zoomScale}px ${height * zoomScale}px`,
    };
};

const stopVideoPlayback = () => {
    const videoElements = document.querySelectorAll(`#mainImgListDiv video`) as NodeListOf<HTMLVideoElement>;
    videoElements.forEach((videoElement) => {
        if (!videoElement.paused) {
            videoElement.pause(); // 停止播放
        }
    });
};

// 切换图片/视频
const next = () => {
    if (!showNext.value) return;
    emit('img-change', currentIndex.value + 1); // 通知父组件
}

const prev = () => {
    if (!showPrev.value) return;
    emit('img-change', currentIndex.value - 1); // 通知父组件
}

const onBtnMouseLeave = (event) => {
    event.stopPropagation();
    if (isMobile.value) return
    mouseBtnIn.value = false;
};

const onBtnMouseEnter = (event) => {
    event.stopPropagation();
    if (isMobile.value) return
    mouseBtnIn.value = true;
};


// 手势滑动事件
const onDragStart = (event: MouseEvent | TouchEvent) => {
    isDragging = true
    startX = 'touches' in event ? event.touches[0].clientX : event.clientX
}

const onDragMove = (event: MouseEvent | TouchEvent) => {
    if (event.type === 'mousemove') {
        const mouseEvent = event as MouseEvent;
        // console.log('鼠标移动事件==== called',mouseEvent.clientX,mouseEvent.clientY,mouseEvent.x,mouseEvent.y);
        handleMove(mouseEvent);
        return;
    }
    if (!isDragging) return
    const moveX = 'touches' in event ? event.touches[0].clientX : event.clientX
    deltaX = moveX - startX
}

const onDragEnd = (event: MouseEvent | TouchEvent) => {
    console.log('拖拽结束事件==== called', event.type);
    if (event.type === 'mouseleave') {
        showZoomBox.value = false;
        return;
    }
    if (!isDragging) return
    isDragging = false

    // 滑动距离大于 50px 时触发切换
    if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            prev()
        } else {
            next()
        }
    }

    // 重置滑动距离
    deltaX = 0
}

// 懒加载逻辑
// const observeImages = () => {
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 const index = Number(entry.target.getAttribute('data-index'))
//                 loadedImages.value[index] = true
//                 observer.unobserve(entry.target)
//             }
//         })
//     })

//     document.querySelectorAll('.lazy-image').forEach((img, index) => {
//         if (!loadedImages.value[index]) {
//             observer.observe(img)
//         }
//     })
// }


// onMounted(() => {
// observeImages()
// })
</script>
