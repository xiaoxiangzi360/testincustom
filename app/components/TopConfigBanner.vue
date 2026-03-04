<template>
    <div v-show="data?.contentConfigView&&bgImageUrl" class="relative w-full rounded-[4px] h-[330px] max-md:h-auto max-md:aspect-[2/1] flex 
    p-4 mt-4 max-md:mt-2" :class="[
        data?.contentConfigLocationHorizontalAlignment === 'center' ? 'justify-center' :
                    'justify-start',
    ]">
        <NuxtImg :src="bgImageUrl" class="absolute top-0 left-0 z-0 w-full h-full rounded-[4px] md:bg-cover bg-center"
            :alt="imgText" />
             <!--  max-md:items-start max-md:justify-center -->
        <div class="flex w-[50%] max-md:w-full flex-col gap-1 rounded-[8px] relative text-white z-90 h-full"
            :class="[
                data?.contentConfigLocationHorizontalAlignment === 'center' ? 'items-center' :
                    'items-start',
                data?.contentConfigLocationVerticalAlign === 'center' ? 'justify-center' : 'justify-start'
            ]">
            <h1 class="text-[40px] max-md:text-[24px]  font-[700px] line-clamp-2 mb-2  leading-none"
                :title="data?.contentConfigTitle">{{ data?.contentConfigTitle }}</h1>
            <div class="text-[20px]  max-md:text-[16px] line-clamp-5 sm:line-clamp-4 mb-0 leading-none"
                :title="data?.contentConfigSubtitle">{{ data?.contentConfigSubtitle }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})

const { isMobile } = useMobile();
const bgImageUrl = computed(() => {
    return isMobile.value ? props.data?.contentConfigImageUrlForMobile : props.data?.contentConfigImageUrl;
});
const imgText = computed(() => {
    return isMobile.value ? props.data?.contentConfigAltTextForMobile : props.data?.contentConfigAltText;
});
</script>