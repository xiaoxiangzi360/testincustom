<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

definePageMeta({
    layout: 'blank',
    title: 'googleauthorize',
    description: 'Incustom googleauthorize',
    navOrder: 1,
    type: 'primary',
    icon: 'i-mdi-home',
})

const { googleLogin } = useAuth()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
    const code = route.query.code as string

    if (!code) {
        console.error('Google回调参数缺失：code')
        router.replace('/') // 如果没有 code，返回首页或登录页
        return
    }

    try {
        // 传递 code 给后端
        const res = await googleLogin({ code })
        if (res && res.success) {
            // 登录成功后处理，比如保存token或跳转首页
            // 可根据返回值逻辑调整
            navigateTo('/');

        } else {
            console.error('Google 登录失败:', res?.message)
            router.replace('/login')
        }
    } catch (error) {
        console.error('Google 登录接口错误:', error)
        router.replace('/login')
    }
})
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
</template>


<style scoped></style>
