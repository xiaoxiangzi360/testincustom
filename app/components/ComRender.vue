<!-- components/ComSuspense.vue -->
<template>
    <!-- 显示 loading 状态 -->
    <div v-if="loading || !show">
        <slot name="fallback">
            <div class="bg-[red] p-4">
                加载中...
            </div>
        </slot>
    </div>

    <!-- 显示内容 -->
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
    /** 延迟显示时间(ms) */
    delay?: number
    /** 是否处于加载状态 */
    loading?: boolean

}

const props = withDefaults(defineProps<Props>(), {
    delay: 0,
    loading: false,
})

const show = ref(false)
let timer: number | null = null

onMounted(() => {
    if (props.delay > 0) {
        timer = window.setTimeout(() => {
            show.value = true
        }, props.delay)
    } else {
        show.value = true
    }
})

onUnmounted(() => {
    if (timer) clearTimeout(timer)
})
</script>