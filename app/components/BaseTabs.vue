<template>
    <!-- BaseTabs.vue -->
    <div class="flex space-x-1">
        <div v-for="(tab, index) in list" :key="index" @click="handleTabClick(tab)" :class="[
            'flex-shrink-0 px-6 py-3 transition-all duration-200 cursor-pointer',
            selected === tab.value
                ? 'text-primary font-bold border-b-2 border-sky-400'
                : 'text-gray-500 hover:text-gray-700'
        ]">
            <span class="whitespace-nowrap">
                {{ tab.label }}
            </span>
        </div>
    </div>

</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    // 选项卡列表
    list: {
        type: Array,
        required: true,
        default: () => [],
    },
    // 当前选中的值
    modelValue: {
        type: [String, Number, Boolean],
        default: ''
    },
    // 是否开启自动滚动到激活的标签
    autoScroll: {
        type: Boolean,
        default: true
    },
    // 是否支持禁用状态
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

// 计算当前激活的项
const activeTab = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

// 检查是否是激活状态
const isActive = (tab) => {
    return tab.value === activeTab.value
}

// 处理标签点击
const handleTabClick = (tab) => {
    if (props.disabled || tab.disabled) return

    const oldValue = activeTab.value
    activeTab.value = tab.value

    // 触发 change 事件，传递新旧值
    if (oldValue !== tab.value) {
        emit('change', tab.value, oldValue, tab)
    }

    // 自动滚动到激活的标签
    if (props.autoScroll) {
        nextTick(() => {
            const container = document.querySelector('.scrollbar-hide')
            const activeEl = container?.querySelector('.border-b-2')
            if (activeEl && container) {
                const containerWidth = container.clientWidth
                const activeElLeft = activeEl.offsetLeft
                const activeElWidth = activeEl.clientWidth

                // 计算滚动位置，让激活标签居中显示
                const scrollLeft = activeElLeft - (containerWidth / 2) + (activeElWidth / 2)
                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                })
            }
        })
    }
}
</script>

<style scoped></style>