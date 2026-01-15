<template>
    <UModal :model-value="isShow" size="lg" :prevent-close="false" :scrollable="true" :ui="{
        wrapper: 'z-[999] items-center bg-[red]',
        container: 'items-center',
        overlay: {
            background: 'bg-black/50 dark:bg-black/50'
        },
        shadow: 'shadow-none',
        background: 'bg-transparent dark:bg-transparent rounded-none',
        width: 'md:max-w-5xl max-md:w-full',
    }" @update:model-value="handleClose">
        <div class=" flex justify-center flex-col items-center gap-4 p-4 relative">
            <ImgList :list="imgList" :defaultIndex="defaultIndex" wrapClass=" min-h-[80vh]"
                itemClass="w-[80vw] h-[80vh]" />
            <div class=" cursor-pointer text-white" @click="handleClose">
                <UIcon name="i-material-symbols:close" class="w-12 h-12 inline-block" />
            </div>
        </div>
    </UModal>
</template>
<script setup lang="ts">
const props = defineProps({
    isShow: {
        type: Boolean,
        default: false
    },
    imgList: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    defaultIndex: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['close'])

const handleClose = () => {
    emit('close')
}
</script>