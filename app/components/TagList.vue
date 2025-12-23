<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

interface Tag {
    label: string;
    value: string;
    type: string;
}

const props = defineProps<{
    tagList: Tag[]; // 入参：标签列表
}>();

const emit = defineEmits<{
    (e: 'clear', data?: { isClearAll?: boolean; tag?: any }): void;
    (e: 'more'): void;
}>();

// 控制是否显示更多标签
const showAll = ref(false);
// 容器宽度相关
const containerRef = ref<HTMLElement>();
const containerWidth = ref(0);
// 标签元素引用
const tagRefs = ref<HTMLElement[]>([]);
// 是否应该显示更多按钮
const shouldShowMore = ref(false);
// 窗口宽度
// const windowWidth = ref(window?.innerWidth || 0);

// 计算是否是移动端
const { isMobile, windowWidth } = useMobile(); // 默认断点为 768px

// 计算显示的标签
const visibleTags = computed(() => {
    if (showAll.value) {
        return props.tagList; // 显示所有标签
    }
    return props.tagList.slice(0, getMaxVisibleTags()); // 动态计算可显示的标签数量
});

// 获取最大可见标签数
const getMaxVisibleTags = () => {
    // 移动端直接返回所有标签，让滚动条处理
    if (isMobile.value) {
        return props.tagList.length;
    }

    if (!containerWidth.value || tagRefs.value.length === 0) {
        return 15; // 默认值
    }

    let totalWidth = 0;
    let maxTags = 0;
    const containerWidthValue = containerWidth.value;
    const moreButtonWidth = 80; // Show More 按钮的预估宽度
    const clearButtonWidth = 80; // Clear All 按钮的预估宽度

    for (let i = 0; i < props.tagList.length; i++) {
        if (tagRefs.value[i]) {
            const tagWidth = tagRefs.value[i].offsetWidth + 8; // 8px 是 gap
            totalWidth += tagWidth;

            // 检查是否有足够的空间显示标签和操作按钮
            if (totalWidth + moreButtonWidth + clearButtonWidth <= containerWidthValue) {
                maxTags = i + 1;
            } else {
                break;
            }
        }
    }

    return maxTags || 10; // 至少显示一个标签
};

// 切换显示更多/收起
const toggleShowMore = () => {
    showAll.value = !showAll.value;
    emit('more');
};

const handleClearTag = ({ tag, isClearAll }: { tag?: any; isClearAll?: boolean }) => {
    if (isClearAll) {
        emit('clear', { isClearAll });
        return;
    }
    emit('clear', { tag });
};

// 计算是否需要显示更多按钮
const computeShouldShowMore = () => {
    // 移动端不显示更多按钮
    if (isMobile.value) {
        return false;
    }
    // PC端根据是否显示完整来判断
    return visibleTags.value.length < props.tagList.length;
};

// 监听容器宽度变化
const resizeObserver = ref<ResizeObserver>();
// 监听窗口大小变化
const handleResize = () => {
    windowWidth.value = window.innerWidth;
    computeMoreButton();
};

// 初始化容器宽度
const initContainerWidth = () => {
    if (containerRef.value) {
        containerWidth.value = containerRef.value.offsetWidth;
    }
};

// 更新标签引用
const updateTagRefs = () => {
    // 创建 testDiv
    const testDivContainer = document.createElement('div');
    testDivContainer.id = 'testDivContainer';
    testDivContainer.style.display = 'flex';
    testDivContainer.style.flexWrap = 'wrap';
    testDivContainer.style.gap = '8px';
    testDivContainer.style.padding = '16px 0';

    // 根据 tagList 数据生成标签
    props.tagList.forEach((tag) => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag.label;
        tagElement.style.backgroundColor = '#00B2E3';
        tagElement.style.color = '#fff';
        tagElement.style.borderRadius = '20px';
        tagElement.style.padding = '8px 12px';
        tagElement.style.fontSize = '14px';
        tagElement.style.whiteSpace = 'nowrap';
        tagElement.style.cursor = 'pointer';
        tagElement.style.userSelect = 'none';
        tagElement.style.transition = 'opacity 0.2s ease';
        tagElement.style.maxWidth = '200px';
        tagElement.style.overflow = 'hidden';
        tagElement.style.textOverflow = 'ellipsis';

        // 添加 hover 效果
        tagElement.addEventListener('mouseenter', () => {
            tagElement.style.opacity = '0.9';
        });
        tagElement.addEventListener('mouseleave', () => {
            tagElement.style.opacity = '1';
        });

        // 添加到 testDivContainer
        testDivContainer.appendChild(tagElement);
    });
    if (testDivContainer) {
        tagRefs.value = Array.from(testDivContainer.children) as HTMLElement[];
    }
};

// 计算是否需要更多按钮
const computeMoreButton = () => {
    updateTagRefs();
    nextTick(() => {
        shouldShowMore.value = computeShouldShowMore();
    });
};

// 监听标签列表变化
watch(() => props.tagList, () => {
    nextTick(() => {
        computeMoreButton();
    });
}, { deep: true });

// 监听展开状态变化
watch(showAll, () => {
    nextTick(() => {
        shouldShowMore.value = computeShouldShowMore();
    });
});

// 监听窗口大小变化
watch(isMobile, (newVal) => {
    if (newVal) {
        // 切换到移动端时，重置显示状态
        showAll.value = false;
    }
});

// 生命周期
onMounted(() => {
    // 初始化容器宽度
    initContainerWidth();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 设置 ResizeObserver 监听容器大小变化
    resizeObserver.value = new ResizeObserver(() => {
        initContainerWidth();
        computeMoreButton();
    });

    if (containerRef.value) {
        resizeObserver.value.observe(containerRef.value);
    }

    // 初始计算
    computeMoreButton();
});

onUnmounted(() => {
    // 移除事件监听
    window.removeEventListener('resize', handleResize);

    // 移除 ResizeObserver
    if (resizeObserver.value && containerRef.value) {
        resizeObserver.value.unobserve(containerRef.value);
    }
});
</script>

<template>
    <div class="tag-container" ref="containerRef" v-show="tagList.length > 0">
        <!-- 标签列表 -->
        <div class="tags">
            <span v-for="(tag, index) in visibleTags" :key="index" class="tag"
                :ref="el => { if (el) tagRefs[index] = el as HTMLElement }">
                <span class="custom-tag font-hind" @click="handleClearTag({ tag, isClearAll: false })">
                    {{ tag.label }}
                    <UIcon style="color:#00B2E3;width: 14px;height: 14px;" name="i-material-symbols:close"
                        class="w-[5px] h-[5px]" />
                </span>
            </span>
        </div>

        <!-- 操作按钮 - 移动端隐藏，PC端显示 -->
        <div class="actions" v-if="props.tagList.length > 0 && !isMobile">
            <span v-if="shouldShowMore || showAll" class="btn-more" @click="toggleShowMore">
                {{ showAll ? 'Show Less' : 'Show More' }}
            </span>
            <span class="btn-clear" @click="handleClearTag({ tag: null, isClearAll: true })">
                Clear All
            </span>
        </div>

        <!-- 移动端清除单个标签提示 -->
    </div>
</template>

<style scoped>
/* 容器样式 */
.tag-container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 8px;
    padding-top: 16px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

/* PC端：标签容器 */
.tags {
    display: flex;
    gap: 8px;
    /* flex: 1; */
    min-width: 0;
    max-width: 90%;
}

/* 移动端：标签横向滚动 */
@media (max-width: 1024px) {
    .tag-container {
        flex-direction: column;
        padding-top: 12px;
        gap: 12px;
    }

    .tags {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 8px;
        scrollbar-width: thin;
        scrollbar-color: #cccccc;
        width: 100%;
        max-width: 100%;
        -webkit-overflow-scrolling: touch;
    }

    /* 自定义滚动条样式 */
    .tags::-webkit-scrollbar {
        height: 2px;
    }

    /* .tags::-webkit-scrollbar-track {
        background: #f0f0f0;
        border-radius: 2px;
    }

    .tags.hide-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .tags.hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    } */
}

/* 标签项 */
.tag {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
}

.custom-tag {
    background: #d5f7fc;
    color: #00B2E3;
    border-radius: 20px;
    padding: 8px 12px;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    /* max-width: 200px; */
    overflow: hidden;
    text-overflow: ellipsis;
    transition: opacity 0.2s ease;
    user-select: none;
}

.custom-tag:hover {
    opacity: 0.9;
}

/* 移动端标签样式 */
@media (max-width: 768px) {
    .custom-tag {
        padding: 6px 10px;
        font-size: 13px;
        min-height: 32px;
        box-sizing: border-box;
    }
}

/* 按钮样式 */
.actions {
    display: flex;
    gap: 8px;
    /* flex-shrink: 0; */
    align-items: center;
    height: 32px;
}

.btn-more,
.btn-clear {
    color: #00B2E3;
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    white-space: nowrap;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
    transition: opacity 0.2s ease;
}

.btn-more:hover,
.btn-clear:hover {
    opacity: 0.8;
}

/* 移动端提示 */
.mobile-hint {
    font-size: 12px;
    color: #666;
    text-align: center;
    width: 100%;
    padding: 4px 0;
    background: #f9f9f9;
    border-radius: 4px;
    margin-top: 4px;
}

/* 多行显示时的样式 */
@media (min-width: 769px) {
    .tags:has(+ .actions .btn-more) {
        flex-wrap: wrap;
    }

    .tags:not(:has(+ .actions .btn-more)) {
        flex-wrap: nowrap;
        overflow: hidden;
    }
}

/* 移动端触摸优化 */
@media (max-width: 768px) {
    .tag {
        touch-action: manipulation;
    }

    .custom-tag:active {
        transform: scale(0.98);
        opacity: 0.9;
    }
}
</style>