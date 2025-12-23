<template>
    <UModal :ui="{
        width: 'sm:max-w-2xl', container: 'items-center',
        background: 'bg-[none]'
    }" :model-value="isshow" @update:model-value="(v) => emit('update:isshow', v)" :prevent-close="false">
        <!-- <div>{{ JSON.stringify(props.curactivity) }}</div> -->
        <div v-show="!merryIds.includes(props.curactivity.id) && props.curactivity.couponReceiveMethod == 50"
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
        <div v-show="!merryIds.includes(props.curactivity.id) &&props.curactivity.couponReceiveMethod == 10"
            class="bg-[#FFF6E8] rounded-xl shadow-xl p-6 flex flex-col items-center relative text-center">
            <!-- SALE background text -->
            <div
                class="w-[90%] mx-auto relative flex items-center justify-center font-bold text-[#00000010] pointer-events-none">
                <NuxtImg src="https://cdn.incustom.com/upload/web/acticitybg2.png" alt="bg" class="w-full" />
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

        <!-- ===== Merry活动展示：couponReceiveMethod == 10 ===== -->
        <div v-show="merryIds.includes(props.curactivity.id)" class="bg-[#9A0606] rounded-[20px] pt-4 pb-9 px-7">
            <div class="flex justify-between">
                <div class="flex items-center">
                    <NuxtImg src="/activityModal/star.png" class="w-[12px] h-[12px]" alt="Description of the image" />
                    <NuxtImg src="/activityModal/inCustom.png" class="w-[68px] h-[17px]" :height="18"
                        alt="Description of the image" />
                </div>
                <span class="text-[rgba(0,0,0,0.45)] hover:text-black">
                    <UIcon name="i-material-symbols:cancel" class="w-[24px] h-[24px]   cursor-pointer"
                        @click="handleCloseAttempt" />
                </span>
            </div>
            <!-- Modal content -->
            <div class="flex mt-6">
                <NuxtImg src="/activityModal/left.png" class="w-[112px] max-md:hidden" alt="Description of the image" />
                <div class="flex-1 flex flex-col items-center pl-10 max-md:pl-0 w-full">
                    <div class="px-4 w-full">
                        <NuxtImg src="/activityModal/merry.png" class="w-full" alt="Description of the image" />
                    </div>
                    <div class="text-white font-hind font-semibold text-[16px] pt-1 pb-5 max-md:text-center">
                        Your Christmas Treat Is Here:
                       <span class="max-md:block"><span class="font-[900] text-[40px] font-arial ml-3">25</span> % OFF</span>
                    </div>
                    <!-- Coupon code -->
                    <div class="flex gap-2  mt-4">
                        <div v-for="(char, index) in props.curactivity.couponCode" :key="index"
                            class="bg-[#FFAA00] font-arial text-white text-[22px] w-[44px] h-[44px] max-md:w-[32px] max-md:h-[32px] flex items-center justify-center rounded-md">
                            {{ char }}
                        </div>
                    </div>
                    <div @click="copyCode" class="cursor-pointer  mt-7 ">
                        <div class="bg-black font-arial text-white text-[16px] font-[900] py-4 px-7 rounded-md">
                            CLICK TO COPY YOUR CODE
                        </div>
                    </div>
                    <div v-show="isCopied" class="text-black text-center text-sm">Code copied to
                        clipboard!</div>
                    <div v-show="!isCopied" class="h-[18px]"></div>
                    <div class="mt-4 font-hind">
                        <div v-for="(item, index) in bottomList" :key="index"
                            class="flex font-arial  gap-1 text-white mb-2 items-center">
                            <NuxtImg :src="item.img" class="w-[18px] h-[18px]" />
                            <span class="text-[14px]  text-[#e5e5e5]">{{ item.text1 }}</span>
                            <span class="text-[14px] font-[600]">{{ item.text2 }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-between max-md:hidden">
                    <NuxtImg src="/activityModal/deer.png" class="w-[58px] " alt="Description of the image" />
                    <NuxtImg src="/activityModal/gifs.png" class="w-[75px]" alt="Description of the image" />
                </div>
            </div>
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
const bottomList = [
    {
        id: 1,
        img: '/activityModal/shalou.png',
        text1: 'Limited Time:',
        text2: 'Valid until Dec 15.'
    },
    {
        id: 2,
        img: '/activityModal/green_check_box.png',
        text1: 'Use Instantly: ',
        text2: 'No subscription required.'
    },
    {
        id: 3,
        img: '/activityModal/box.png',
        text1: 'Free Shipping: ',
        text2: ' On all orders.'
    },
]

const merryIds = ['1998573680116084736']
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
const isCopied = ref(false)
/** 复制券码 */
function copyCode() {
    const textToCopy = promoCode.value.join('')
    isCopied.value = true
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
    isMobile.value = window.innerWidth < 769
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
