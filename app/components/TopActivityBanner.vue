<template>
    <div class="w-full rounded-[4px] flex items-center justify-center md:min-h-[300px] bg-cover bg-center
    p-4 " style="background-image: url('/gActivityModal/activity_banner.webp');">
        <div
            class=" p-4 max-md:p-2 bg-[rgba(156,9,15,0.4)] flex items-center justify-center text-center flex-col gap-1 rounded-[8px] text-white">
            <div class="text-[36px] max-md:text-[21px] font-semibold ">{{ data?.mainTitle }}</div>
            <div class="text-[50px]  max-md:text-[28px] font-[800] font-arial">{{ data?.sloganText }}</div>
            <div class="text-[26px]  max-md:text-[18px] font-semibold font-mono">{{ data?.codeHintText }}</div>
            <div class="text-[18px]  max-md:text-[12px]">{{ data?.activityDescription }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})
</script>