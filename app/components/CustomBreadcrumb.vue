<template>
    <div>
        <div class="gap-1 text-[14px] text-[#7d7d7d] mb-4 hidden md:flex">
            <div v-for="(item, index) in showLinks" :key="item.to" class="flex items-center">
                <a :href="item.disabled ? 'javascript:void(0)' : item.to" class=" hover:text-black max-w-[400px] line-clamp-1"
                    :class="{ 'text-black': item.disabled, 'hover:underline': !item.disabled, 'cursor-default': item.disabled }">
                    {{ item.label }}</a>
                <span v-show="index < showLinks.length - 1" class="ml-1"> > </span>
            </div>
        </div>
        <div class="mb-4 flex md:hidden  text-[14px] text-[#7d7d7d]">
            <a :href="lastLink?.to" class="max-w-full line-clamp-1">
                < Back to <span class="font-[500] underline-offset-4 underline">{{ lastLink?.label }}</span></a>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    links: {
        type: Array as PropType<Array<{ to: string; label: string; disabled?: boolean ,hidden?:boolean}>>,
        required: true
    }
})

const showLinks = computed(() => {
    return props.links.filter(link => !link.hidden)
})

// 获取最后一个且 `to` 有值的元素
const lastLink = computed(() => {
    return showLinks.value.slice().reverse().find(link => !link.disabled) || null
})
</script>