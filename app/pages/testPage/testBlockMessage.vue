<template>
    <div class="min-h-40 bg-rose-500">测试速度页面【message】</div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue';

onMounted(() => {
    message.success('TailwindCss 加载成功！');
})
</script>