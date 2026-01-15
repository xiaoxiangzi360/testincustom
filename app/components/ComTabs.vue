<template>
    <div class="bg-[white] text-customblack flex overflow-x-auto scrollbar-hide cursor-pointer">
        <div v-for="(tab, i) in tabs" :key="tab.key" class="relative">
            <div class="cursor-pointer max-md:text-[14px] text-[18px] py-2 mr-4 whitespace-nowrap relative" :class="{
                'text-primary font-medium': activeTab === tab.key,
            }" @click="$emit('update:activeTab', tab.key)" @mouseenter="hoverTab(tab.key)"
                @mouseleave="hoverTab(null)">
                {{ tab.label }}
                <span class="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 w-full"
                    v-show="activeTab == tab.key"></span>
                <span class="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500" :class="{
                    'w-full': hoveredTabKey === tab.key,
                    'w-0': activeTab !== tab.key &&  hoveredTabKey !== tab.key,
                }"></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义事件
defineEmits(['update:activeTab'])

// 定义属性
defineProps({
    tabs: {
        type: Array as PropType<Array<{ label: string; key: string }>>,
        required: true
    },
    activeTab: {
        type: String,
        required: true
    }
})

// 定义状态
const hoveredTabKey = ref('')

// hoverTab 方法
const hoverTab = (tabKey) => {
    hoveredTabKey.value = tabKey
}
</script>