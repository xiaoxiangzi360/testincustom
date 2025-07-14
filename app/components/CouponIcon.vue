<template>
    <div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer"
        v-show="props.curactivity.couponReceiveMethod == 50">
        <img src="/coupon.png" alt="coupon icon" class="w-12 h-12" @click="handleget" />
    </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { ref } from 'vue';
const emit = defineEmits(['update:isshow'])

let props = defineProps({
    isshow: Boolean,
    curactivity: Object
})

const handleget = () => {
    emit('update:isshow', true)

}



</script>
