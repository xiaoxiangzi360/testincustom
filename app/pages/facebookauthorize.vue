<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

definePageMeta({
    layout: 'blank',
    title: 'facebookauthorize',
    description: 'Incustom facebookauthorize',
    navOrder: 1,
    type: 'primary',
    icon: 'i-mdi-home',
})

const { facebookLogin } = useAuth()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
    const code = route.query.code as string

    if (!code) {
        router.replace('/login')
        return
    }

    try {
        const res = await facebookLogin({ code })
        const redirectCookie = useCookie('redirect_to', { path: '/' })
        const backTo = redirectCookie.value || '/'   // 没有就回首页
        redirectCookie.value = null                  // 清除，避免下次误跳
        await navigateTo(backTo, { replace: true })

    } catch (error) {
        router.replace('/login')
    }
})
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center space-y-4">
            <svg class="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
        </div>
    </div>
</template>

<style scoped></style>
