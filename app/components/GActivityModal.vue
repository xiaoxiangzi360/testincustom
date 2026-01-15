<template>
    <UModal :model-value="open" :prevent-close="true" :ui="{
        wrapper: 'z-[999] items-center',
        container: 'items-center',
        overlay: {
            background: 'bg-black/50 dark:bg-black/50'
        },
        background: 'bg-white dark:bg-white rounded-none',
        width: 'sm:max-w-5xl w-[720px]',
    }" @update:model-value="handleClose">
        <div>
            <div v-show="isLocal || activityInfo.activityType?.type == ActivityShowType.popUpEmail"
                class="h-[480px] max-md:h-auto flex max-md:flex-col text-[#393938] text-[16px] font-hind bg-[#f4eee2]">
                <div class="md:absolute flex justify-end pr-1 md:right-2 md:top-1 text-gray-400 cursor-pointer hover:opacity-80"
                    @click="handleClose">
                    <UIcon name="i-material-symbols:close" class="w-[20px] h-[20px] cursor-pointer inline-block"/>
                </div>
                <div class="w-[50%] max-md:w-[100%] max-md:p-1">
                    <NuxtImg class=" h-full max-md:w-full max-md:h-auto object-cover"
                        :src="isMobile ? pageData.image.mobile : pageData.image.pc" alt="活动弹窗" />
                </div>
                <div class="w-[50%] flex flex-col justify-between p-6 max-md:w-full">
                    <div class="flex flex-col items-center justify-around text-center gap-3 h-[40%] max-md:mb-4">
                        <div>{{ pageData.content.title }}</div>
                        <div class="text-[24px]"><span class="text-[#393938] mr-2">{{ pageData.content.discountDesc
                        }}</span>
                            <span class="text-[#79100f]"> {{ pageData.content.discount }}</span>
                        </div>
                        <div class="max-w-[220px]">{{ pageData.content.discountText }}</div>
                    </div>
                    <div class="text-center">
                        <input type="email" :placeholder="pageData.content.emailPlaceholder" v-model="email"
                            class="w-full text-center placeholder:text-[#818181] focus:ring-0 border rounded-[6px] h-[45px] focus:outline-none"
                            style="border-color: #D8D8D8;" />
                        <p class="text-red-400 text-[14px]">{{ emailError }}</p>
                        <div class="w-full rounded-[6px] text-white bg-[#79100F] h-[43px] flex items-center justify-center 
                    mt-3 my-4 cursor-pointer" @click="handleSubmit">{{ pageData.content.okBtn }}
                        </div>
                        <div @click="handleClose" class="cursor-pointer">{{ pageData.content.cancelBtn }}</div>
                    </div>
                    <div class="text-center text-gray-400 text-[14px] max-md:mt-2">
                        <div v-for="desc in pageData.content.descList" class="mb-1">
                            <div>{{ desc }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ActivityScope, ActivityShowType } from '~/types/Activity'
// import { toast } from '~/utils/toast'
const PageTag = 'GActivityModal====='
const isLocal = false
const testData = {
    image: {
        pc: 'gActivityModal/activity_pc.webp',
        mobile: 'gActivityModal/activity_mo.webp',
    },
    content: {
        title: 'Join Us for the New Year Celebration',
        discountDesc: 'UNLOCK',
        discount: '18% OFF',
        discountText: 'Your exclusive discount code will be sent via email.',
        emailPlaceholder: 'Enter your email address',
        okBtn: 'GET MY CODE & SHOP NOW',
        cancelBtn: 'No, thanks',
        descList: [
            '• Use code for 18% off your first order.',
            '• Free Shipping on ALL orders.',
        ],
    },
}
const open = ref(false)
const pageData = ref(testData)
const { createMarketingActivityEmailSubscribe, getSortInProgressMarketingActivityFromLocation } = ActivityAuth()

const { isMobile } = useMobile()

const modalWidth = computed(() => {
    if (isMobile.value) {
        return '720px'
    } else {
        return '70%'
    }
})

const handleClose = () => {
    open.value = false
}

// 页面加载完成监听
const handlePageLoad = () => {
    const currentTime = Date.now() // 当前时间戳（毫秒）
    const lastedTime = localStorageTools.get<number>(LocalKeys.G_Activity_Modal_Lasted_Time, 0) // 获取上次存储的时间戳
    const { activityStartTime, activityEndTime, mallView, activityType } = activityInfo.value

    // 判断是否在活动时间范围内
    const isInActivityTime = currentTime >= activityStartTime && currentTime <= activityEndTime

    // 判断 lastedTime 是否与当前时间不在同一天
    const isNotSameDay = lastedTime > 0 ? new Date(lastedTime).toDateString() !== new Date(currentTime).toDateString() : true

    console.log(PageTag, '页面加载完成', 'isInActivityTime', isInActivityTime, 'isLocal', isLocal, 'isNotSameDay', isNotSameDay)

    // 显示弹窗的条件
    if ((isLocal) || (mallView && isInActivityTime && (!lastedTime || isNotSameDay) && activityType?.location == ActivityScope.allPage)) {
        setTimeout(() => {
            open.value = true
        }, 3000)
        localStorageTools.set(LocalKeys.G_Activity_Modal_Lasted_Time, currentTime) // 更新存储时间
    }
}
const email = ref('')
const activityInfo = ref({} as any)
const fetchActivity = async () => {
    // loading.value = true
    try {
        const res = await getSortInProgressMarketingActivityFromLocation({ location: ActivityScope.allPage, spuId: '' })
        if (!res.result) {
            return
        }
        activityInfo.value = res.result
        const activityType = res.result.mallViewConfigList.length > 0 ? res.result.mallViewConfigList.find((item: any) => item.location === 50) : {}
        Object.assign(activityInfo.value, { activityType })
        console.log(PageTag, '活动列表', activityInfo.value)
    } catch (error) {
        console.error(PageTag, '获取活动列表失败', error)
        // message.error('Failed to load activities.')
    } finally {
        // toast.add({ title: 'Failed to load activities.' })
        // loading.value = false
    }
}
const emailError = ref('')
watch(email, () => {
    if (emailError.value) {
        emailError.value = ''
    }
})
/** 提交邮箱订阅：成功后永久不再弹 */
const handleSubmit = async () => {
    if (!email.value) {
        emailError.value = 'Please enter your email .'
        return
    }
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        emailError.value = 'Please enter a valid email .'
        return
    }
    // loading.value = true
    try {
        await createMarketingActivityEmailSubscribe({
            email: email.value,
            marketingActivityId: activityInfo.value.id,
        })
        message.success('The coupon has been sent to your email address.')
        open.value = false
    } catch (error) {
        console.error(error)
        message.error('An error occurred while subscribing.')
    } finally {
    }
}

onMounted(async () => {
    await fetchActivity()
    // 检查页面是否已经加载完成
    if (document.readyState === 'complete') {
        handlePageLoad()
    } else {
        // 如果页面未加载完成，监听 load 事件
        window.addEventListener('load', handlePageLoad)
    }
})

onUnmounted(() => {
    window.removeEventListener('load', handlePageLoad)
})

</script>