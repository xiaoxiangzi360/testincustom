<template>
    <div>
        <UBreadcrumb divider=">" :links="links" class="text-lg sm:text-2xl" :ui="{
            base: 'hover:underline font-normal',
            ol: 'mb-4',
            li: 'text-sm sm:text-sm font-normal text-customblack dark:text-customblack',
            active: 'text-gray-300 dark:text-gray-300 no-underline hover:no-underline',
            divider: { base: 'px-2 text-text-gray-400 no-underline' }
        }" />
    </div>
</template>

<script setup lang="ts">
defineProps({
    links: {
        type: Array as PropType<Array<{ label: string; to: string }>>,
        required: true
    }
})
</script>