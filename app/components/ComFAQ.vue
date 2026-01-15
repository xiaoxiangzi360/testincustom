<template>
    <div class="w-full mt-[30px] max-md:mt-0">
        <div class="md:py-4">
            <h1 class="text-xl md:text-[40px] text-primary font-semibold text-center mb-3 sm:mb-12 dark:text-primary">
                FAQ
            </h1>
            <UAccordion variant="solid" size="xl" :items="list" :ui="{ container: 'border-b border-[#00000014]' }"
                class="text-title">
                <template #default="{ item, index, open }">
                    <UButton color="gray" variant="ghost"
                        class="text-arialblack w-full flex justify-between items-center gap-3 text-base sm:text-lg font-normal hover:bg-transparent dark:hover:bg-transparent dark:text-arialblack hover:text-primary dark:hover:text-primary"
                        :ui="{ rounded: 'rounded-none', padding: { sm: 'md:px-5 py-3 sm:py-4' } }">
                        <!-- 文本容器：允许两行并省略 -->
                        <span class="flex-1 min-w-0 text-left font-normal leading-snug line-clamp-2">
                            {{ item.label }}
                        </span>

                        <BaseIcon name="i-heroicons-chevron-down-20-solid"
                            class="w-5 h-5 shrink-0 transition-transform duration-200"
                            :class="[open ? 'rotate-180' : '']" />
                    </UButton>
                </template>

                <template #item="{ item }">
                    <div class="px-5 py-0 text-[#4B5563] sm:text-base">
                        <p class="whitespace-pre-line" v-html="item.content"></p>
                    </div>
                </template>
            </UAccordion>
        </div>
    </div>
</template>

<script setup>
defineProps({
    list: {
        type: Array,
        required: true,
        default: () => []
    }
})
</script>
