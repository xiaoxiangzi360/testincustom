<template>
    <!-- Cookie Consent 弹窗（浮在左下角） -->
    <div v-if="show"
        class="fixed bottom-4 left-4 z-50 max-w-lg w-[90%]  bg-white shadow-2xl  rounded-lg  p-4 text-sm text-gray-700">
        <!-- 标题 -->
        <h2 class="text-base font-semibold mb-1">We use cookies</h2>

        <!-- 描述文字 -->
        <p class="mb-3 leading-relaxed">
            We use cookies and similar technologies to improve your shopping experience and to better understand how our
            site is used.
            By clicking <strong>"Accept All"</strong>, you agree to the use of cookies as described in our
            <NuxtLink to="/article/privacy-policy" class="text-primary hover:underline">Privacy Policy</NuxtLink><span
                class="text-primary">,</span>
            <NuxtLink to="/article/terms-of-service" class="text-primary hover:underline">Terms</NuxtLink><span
                class="text-primary">,</span> and
            <a href="https://policies.google.com/technologies/cookies" target="_blank"
                class="text-primary hover:underline">Google Cookie Policy</a>.
        </p>

        <!-- 按钮区域 -->
        <div class="flex justify-end gap-2">
            <button @click="reject" class="px-3 py-1.5 rounded border border-[#D9D9D9] text-gray-700 hover:bg-gray-100">
                Reject All
            </button>
            <button @click="accept" class="px-3 py-1.5 rounded bg-primary text-white hover:bg-primary-600">
                Accept all
            </button>
        </div>

        <!-- 关闭按钮（可选） -->
        <button @click="close" class="absolute top-2 right-2 text-gray-400 hover:text-black text-lg" aria-label="Close">
            &times;
        </button>
    </div>
</template>

<script setup>
// Cookie 状态持久化
const cookieConsent = useCookie('cookie_consent', {
    maxAge: 60 * 60 * 24 * 365, // 1年
})

const show = ref(false)

onMounted(() => {
    if (!cookieConsent.value) {
        show.value = true
    }
})

const accept = () => {
    cookieConsent.value = 'accepted'
    show.value = false
}

const reject = () => {
    // cookieConsent.value = 'rejected'
    show.value = false
}

const close = () => {
    show.value = false
}
</script>
