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

const { googleLogin, googleRegister } = useAuth()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
    const code = route.query.code as string
    const state = route.query.state as string

    if (!code) {
        router.replace('/login') // 如果没有 code，返回首页或登录页
        return
    }

    try {
        // 传递 code 给后端
        const res = await googleLogin({ code, state })
        if (!res.result) {
            gotoregister(code)
        } else {
            const redirectCookie = useCookie('redirectPath')
            const backTo = redirectCookie.value || '/myorders'
            redirectCookie.value = null
            await navigateTo(backTo, { replace: true })
        }


    } catch (error) {
        router.replace('/login')
    }
})
const gotoregister = async (code) => {

    try {
        // 传递 code 给后端
        const res = await googleRegister({ code })
        const redirectCookie = useCookie('redirectPath')
        const backTo = redirectCookie.value || '/myorders'   // 没有就回首页
        redirectCookie.value = null                  // 清除，避免下次误跳
        await navigateTo(backTo, { replace: true })

    } catch (error) {
        router.replace('/login')
    }

}
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
