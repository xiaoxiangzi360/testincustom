<template>
    <UModal :ui="{ width: 'sm:max-w-2xl', container: 'items-center' }" :model-value="props.isshow"
        @update:model-value="(v) => emit('update:isshow', v)" :prevent-close="false">
        <!-- ===== 邮箱订阅：couponReceiveMethod == 50 ===== -->
        <div v-show="props.curactivity.couponReceiveMethod == 50"
            class="bg-[#fff5dc] rounded-xl shadow-xl flex flex-col md:flex-row max-w-3xl w-full overflow-hidden relative">
            <!-- ✅ Close button（邮箱订阅：点击关闭=今天不再弹） -->
            <div class="absolute top-3 right-3 z-50 text-gray-500 hover:text-black cursor-pointer" @click="handleget">
                <img src="/close.png" class="w-6" />
            </div>

            <!-- Left image - only on desktop -->
            <div class="hidden md:block md:w-1/2">
                <NuxtImg src="https://cdn.incustom.com/upload/web/activity.png" alt="Promo Image"
                    class="w-full h-full object-cover" />
            </div>

            <!-- Right content - with mobile background -->
            <div class="w-full md:w-1/2 p-6 flex flex-col relative">
                <!-- Mobile background image -->
                <div class="md:hidden absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <NuxtImg src="https://cdn.incustom.com/upload/web/activity.png" alt="Promo Background"
                        class="w-full h-full object-cover" />
                </div>

                <div class="relative mt-4">
                    <div class="text-sm font-semibold text-arialblack flex items-center gap-1 border-b py-2"
                        style="border-color: #000000;">
                        <img src="/star.png" class="w-3" />
                        <span>inCustom.</span>
                    </div>
                    <p class="text-lg font-bold text-arialblack mt-6 md:mt-20">
                        Enter your email to subscribe to promotion and get up to
                    </p>
                    <p class="text-4xl font-bold text-arialblack mt-4 md:mt-6">
                        <span class="text-[50px] md:text-[60px] leading-[1.2] md:leading-[85px]">{{ offvalue }}</span>
                        <span class="text-xl font-medium">{{ props.curactivity.discountType == 100 ? 'USD' : '%' }}
                            OFF</span>
                    </p>
                </div>

                <!-- Input and button -->
                <div class="mt-6 relative z-10">
                    <!-- Email input with icon -->
                    <div class="relative">
                        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <img src="/email.png" class="w-6" />
                        </span>
                        <input type="email" v-model="email" placeholder="Email Address"
                            class="w-full pl-10 border rounded-md p-3 focus:outline-none"
                            style="border-color: #D8D8D8;" />
                    </div>
                    <UButton :loading="loading"
                        class="w-full bg-black text-white font-semibold py-3 rounded-md transition mt-6 justify-center hover:bg-black active:bg-black focus:bg-black ui-loading:bg-black !ui-loading:bg-black"
                        @click="handleSubmit">
                        Subscription Offers
                    </UButton>
                </div>
            </div>
        </div>

        <!-- ===== 领券展示：couponReceiveMethod == 10 ===== -->
        <div v-show="props.curactivity.couponReceiveMethod == 10"
            class="bg-[#FFF6E8] rounded-xl shadow-xl p-6 flex flex-col items-center relative text-center">
            <!-- SALE background text -->
            <div
                class="w-[90%] mx-auto relative flex items-center justify-center font-bold text-[#00000010] pointer-events-none">
                <NuxtImg
                    :src="isMobile ? 'https://cdn.incustom.com/upload/web/acticitybg2.png' : 'https://cdn.incustom.com/upload/web/acticitybg.png'"
                    alt="bg" />
                <div class="absolute inset-0 flex items-center justify-center text-base text-white text-xs md:text-xl">
                    <div>
                        <div>incustom</div>
                        <div class="mt-1 md:mt-2">{{ offdesc }}</div>
                    </div>
                </div>
            </div>

            <!-- Close button -->
            <div class="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
                @click="handleCloseAttempt">
                <img src="/close.png" class="w-6" />
            </div>

            <!-- Title text -->
            <p class="text-black font-bold text-lg z-10">
                Welcome to <span class="text-primary font-bold">inCustom</span>, promotions are in progress
            </p>

            <!-- Coupon description -->
            <p class="text-sm text-black z-10 mt-4">
                {{ offdesc }} your{{ props.curactivity.userFirstOrderOnly ? ' first order' : ' order' }} with code:
            </p>

            <!-- Coupon code -->
            <div class="flex justify-center gap-2 z-10 mt-4">
                <div v-for="(char, index) in promoCode" :key="index"
                    class="bg-primary text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded">
                    {{ char }}
                </div>
                <!-- Copy button -->
                <div @click="copyCode" class="self-end mb-1 cursor-pointer">
                    <img src="/copy.png" class="w-6" />
                </div>
            </div>

            <!-- Button group (shown when showButtons is true) -->
            <div v-if="showButtons" class="flex gap-4 mt-8 w-full justify-center flex-wrap">
                <button @click="handleget"
                    class="bg-black text-white px-6 py-3 rounded-full font-semibold text-base w-40">
                    Shop now
                </button>
                <button @click="handleExit"
                    class="bg-white border border-gray-300 text-black px-6 py-3 rounded-full font-semibold text-base w-40">
                    Continue Exit
                </button>
            </div>

            <!-- Confirmation button -->
            <UButton v-if="!showButtons" @click="handleget"
                class="bg-black text-white rounded-full px-6 py-2 text-lg font-semibold z-10 mt-6">
                Okey, I understand
            </UButton>
        </div>
    </UModal>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { ref, onBeforeUnmount, onMounted, watch } from 'vue'
const { createMarketingActivityEmailSubscribe } = ActivityAuth()

const props = defineProps({
    isshow: Boolean,
    curactivity: Object
})
const emit = defineEmits(['update:isshow'])

const showtype = ref(2)
const email = ref('')
const offdesc = ref('')
const offvalue = ref('')
const loading = ref(false)
const promoCode = ref([])
const showButtons = ref(false)
const isMobile = ref(false)

/** ========== Cookie 工具 ========== */
const getCookieName = () => 'hideactivity_' + (props.curactivity?.id || '')
/** 今天不再弹（到次日 0 点） */
const setCookieTodayOnly = () => {
    const now = new Date()
    const tomorrowMidnight = new Date()
    tomorrowMidnight.setDate(now.getDate() + 1)
    tomorrowMidnight.setHours(0, 0, 0, 0)
    const cookie = useCookie(getCookieName(), { expires: tomorrowMidnight })
    cookie.value = 1
}
/** 永久不再弹（长效 10 年） */
const setCookiePermanent = () => {
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 10)
    const cookie = useCookie(getCookieName(), { expires })
    cookie.value = 1
}

/** 复制券码 */
function copyCode() {
    const textToCopy = promoCode.value.join('')
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => message.success('copy success'))
            .catch(() => message.error('copy failed'))
    } else {
        const textArea = document.createElement('textarea')
        textArea.value = textToCopy
        textArea.style.position = 'absolute'
        textArea.style.opacity = '0'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
            document.execCommand('copy')
            message.success('copy success')
        } catch (err) {
            message.error('copy failed')
        }
        textArea.remove()
    }
}

/** 提交邮箱订阅：成功后永久不再弹 */
const handleSubmit = async () => {
    if (!email.value) {
        message.warning('Email is required.')
        return
    }
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        message.warning('Invalid email format.')
        return
    }
    loading.value = true
    try {
        await createMarketingActivityEmailSubscribe({
            email: email.value,
            marketingActivityId: props.curactivity.id
        })
        // ✅ 订阅成功：永久不再弹
        setCookiePermanent()
        message.success('Subscription successful!')
        emit('update:isshow', false)
    } catch (error) {
        console.error(error)
        message.error('An error occurred while subscribing.')
    } finally {
        loading.value = false
    }
}

/** 领券页（10）右上角关闭：直接关闭 */
const handleCloseAttempt = () => {
    emit('update:isshow', false)
}

/**
 * 通用关闭按钮（多个地方复用）：
 * - 邮箱订阅（50）：今天不再弹
 * - 其他情况保留你原逻辑：当 popupTriggerEvent == 100 时到次日 0 点不再弹
 */
const handleget = () => {
    if (props.curactivity?.couponReceiveMethod == 50) {
        // ✅ 邮箱订阅页：点击关闭 -> 今天不再弹
        setCookieTodayOnly()
    } else if (props.curactivity?.popupTriggerEvent == 100) {
        // 你原本的逻辑：到次日 0 点
        const now = new Date()
        const tomorrowMidnight = new Date()
        tomorrowMidnight.setDate(now.getDate() + 1)
        tomorrowMidnight.setHours(0, 0, 0, 0)
        const cookie = useCookie(getCookieName(), { expires: tomorrowMidnight })
        cookie.value = 1
    }
    emit('update:isshow', false)
}

/** 离开按钮 */
const handleExit = () => {
    window.close()
}

/** 离开前阻拦（仅券码页生效） */
const handleBeforeUnload = (event) => {
    if (props.isshow && props.curactivity?.couponReceiveMethod == 10) {
        showButtons.value = true
        event.preventDefault()
        event.returnValue = ''
    }
}

const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('resize', checkScreenSize)
    checkScreenSize()
})

onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    window.removeEventListener('resize', checkScreenSize)
})

watch(
    () => props.curactivity,
    (newVal) => {
        if (newVal && !isEmptyObject(newVal)) {
            promoCode.value = (props.curactivity.couponCodeNormalized || '').split('')
            const rules = props.curactivity.discountRuleList || []
            const lastdiscount = rules[rules.length - 1] || { y: '' }
            if (props.curactivity.discountType == 100) {
                offdesc.value = `${lastdiscount.y}USD OFF`
                offvalue.value = lastdiscount.y
            } else {
                offdesc.value = `${lastdiscount.y}% OFF`
                offvalue.value = lastdiscount.y
            }
        }
    },
    { immediate: true }
)

function isEmptyObject(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0
}
</script>

<style scoped>
:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
    border-color: #d9d9d9 !important;
}

:deep(.ant-select-focused .ant-select-selector) {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
    outline: none !important;
}

/* 去掉 show-search 内部 input 的聚焦轮廓/阴影（内边框） */
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus-visible),
:deep(.ant-select .ant-select-selector input[type="search"]),
:deep(.ant-select .ant-select-selector input[type="search"]:focus),
:deep(.ant-select .ant-select-selector input[type="search"]:focus-visible) {
    outline: none !important;
    box-shadow: none !important;
}

/* 有些版本用 ::after 做焦点边框，保险起见也关掉 */
:deep(.ant-select .ant-select-selector::after) {
    box-shadow: none !important;
    outline: none !important;
    border: 0 !important;
}
</style>
