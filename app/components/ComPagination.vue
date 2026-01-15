<template>
    <UPagination v-model="current" :page-count="pageSize" :total="totalReviews" :ui="{
        base: 'ring-0 dark:ring-0 shadow-none dark:bg-white dark:text-gray-400 dark:hover:text-primary dark:hover:bg-white hover:bg-white',
        default: {
            activeButton: {
                color: 'dark:primary',
                class: 'dark:!bg-primary dark:!text-white',
            },
            prevButton: {
                color: 'white', variant: 'none'
            },
            nextButton: {
                color: 'white', variant: 'none'
            },
        }
    }" />
</template>

<script setup>
defineProps({
    current: {
        type: Number,
        required: true,
        default: 1, // 默认当前页为 1
    },
    pageSize: {
        type: Number,
        required: true,
        default: 5, // 默认每页显示 5 条
    },
    totalReviews: {
        type: Number,
        required: true,
        default: 0, // 默认总条目数为 0
    }
});
</script>