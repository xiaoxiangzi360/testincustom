<!-- filepath: /Users/xulinlin/Desktop/xishan/incustom-web/app/components/HoverIcon.vue -->
<template>
    <div  :class="class" @mouseover="isHovered = true" @mouseleave="isHovered = false">
        <UIcon :name="isHovered ? hoverIcon : defaultIcon" style="width: 100%;height: 100%;"/>
    </div>
</template>

<script setup>

// 定义 props
defineProps({
    class: {
        type: String,
        default: "",
    },
    defaultIcon: {
        type: String,
        required: true,
    },
    hoverIcon: {
        type: String,
        required: true,
    },
});

// 定义响应式变量
const isHovered = ref(false);
</script>