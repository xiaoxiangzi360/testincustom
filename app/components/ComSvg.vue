<template>
    <svg fill="currentColor" class="inline-block fill-current stroke-current" :class="class" :style="style" aria-hidden="true">
        <use :xlink:href="href"></use>
    </svg>
</template>

<script setup>
const props = defineProps({
    class: {
        type: String,
        default: '',
    },
    style: {
        type: Object,
        default: () => ({}),
    },
    href: {
        type: String,
        required: true,
    },
});
</script>