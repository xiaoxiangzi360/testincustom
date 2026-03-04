<template>
    <UModal :model-value="open" :prevent-close="false" :ui="{
        wrapper: 'z-[999] items-center',
        container: 'items-center',
        overlay: {
            background: 'bg-black/50 dark:bg-black/50'
        },
        background: 'bg-[transparent] dark:bg-[transparent] rounded-[20px]',
        width: 'sm:max-w-5xl w-[730px]',
    }" @update:model-value="handleClose">
        <div class="p-4 max-md:p-1 rounded-[20px]"
            v-show="isLocal || activityInfo.activityType?.type == ActivityShowType.popUpEmail"
            :style="{ backgroundColor: `${pageData.backgroundColor}` }">
            <div v-show="activityInfo.activityType?.type == ActivityShowType.popUpEmail"
                class="h-[480px] max-md:h-auto flex max-md:flex-col text-[16px] font-hind">
                <div class="absolute pl-2 flex justify-end mt-2 pr-1 right-2 top-1 text-gray-300 cursor-pointer hover:opacity-80"
                    @click="handleClose">
                    <UIcon name="i-material-symbols:cancel" :style="{ width: '24px', height: '24px' }"
                        class="cursor-pointer inline-block" />
                </div>
                <div class="w-[50%] max-md:w-[100%] max-md:p-1" :style="{ aspectRatio: 320 / 140 }">
                    <NuxtImg class="h-full max-md:w-full max-md:h-auto object-cover rounded-[12px]"
                        :src="isMobile ? pageData?.mobileBannerImg?.imageUrl : pageData?.pcBannerImg?.imageUrl"
                        :alt="isMobile ? pageData?.mobileBannerImg?.altText : pageData?.pcBannerImg?.altText" />
                </div>
                <div class="w-[50%] flex flex-col justify-between p-6 max-md:p-1 max-md:w-full">
                    <NuxtImg class="w-full"
                        :src="isMobile ? pageData?.mobileTopTextImg?.imageUrl : pageData?.pcTopTextImg?.imageUrl"
                        :alt="isMobile ? pageData?.mobileTopTextImg?.altText : pageData?.pcTopTextImg?.altText" />
                    <div class="text-center">
                        <input ref="inputRef" type="email" placeholder="Enter your email address" v-model="email"
                            class="w-full text-left focus:ring-0 placeholder:text-[#818181] bg-white border rounded-[6px] h-[45px] focus:outline-none"
                            :style="{ borderColor: pageData.themeColor || '#D8D8D8', color: pageData.themeColor || '#818181' }" />
                        <p class="text-red-400 text-[14px]">{{ emailError }}</p>
                        <div class="w-full rounded-[6px] text-white h-[43px] flex items-center justify-center 
                    mt-3 mb-2 cursor-pointer"
                            :style="{ backgroundColor: pageData.sureBtnBackgroundColor || pageData.themeColor, color: pageData.sureBtnTextColor || '#FFFFFF' }"
                            @click="handleSubmit">{{ pageData.sureBtnText }}
                        </div>
                        <!-- <div @click="handleClose" :style="{ color: pageData.themeColor || '#818181' }"
                            class="cursor-pointer">No Thanks</div> -->
                    </div>
                    <NuxtImg class="w-full max-md:mt-2"
                        :src="isMobile ? pageData?.mobileBottomTextImg?.imageUrl : pageData?.pcBottomTextImg?.imageUrl"
                        :alt="isMobile ? pageData?.mobileBottomTextImg?.altText : pageData?.pcBottomTextImg?.altText" />
                </div>
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import type { _placeholderColor } from '#tailwind-config/theme'
import { message } from 'ant-design-vue'
import { ActivityScope, ActivityShowType } from '~/types/Activity'
// import { toast } from '~/utils/toast'
const PageTag = 'GActivityModal====='
const isLocal = false

const open = ref(false)
const pageData = ref<any>({})
const { createMarketingActivityEmailSubscribe, getSortInProgressMarketingActivityFromLocation } = ActivityAuth()

const { isMobile } = useMobile()

const handleClose = () => {
    open.value = false
}

// 页面加载完成监听
const handlePageLoad = () => {
    const currentTime = Date.now() // 当前时间戳（毫秒）
    const lastedTime = localStorageTools.get<number>(LocalKeys.G_Activity_Modal_Lasted_Time, 0) // 获取上次存储的时间戳
    const { activityStartTime, activityEndTime, mallView, activityType, locationAllPageBannerStr } = activityInfo.value

    // 判断是否在活动时间范围内
    const isInActivityTime = currentTime >= activityStartTime && currentTime <= activityEndTime

    // 判断 lastedTime 是否与当前时间不在同一天
    const isNotSameDay = lastedTime > 0 ? new Date(lastedTime).toDateString() !== new Date(currentTime).toDateString() : true
    pageData.value = locationAllPageBannerStr ? JSON.parse(locationAllPageBannerStr) : {} // activityInfo.value.locationAllPageBanner
    console.log(PageTag, '页面加载完成', 'isInActivityTime', pageData.value)

    // 显示弹窗的条件
    if ((isLocal) || (locationAllPageBannerStr && mallView && isInActivityTime && (!lastedTime || isNotSameDay) && activityType?.location == ActivityScope.allPage)) {
        setTimeout(() => {
            open.value = true
            // setTimeout(() => {
            //     if (inputRef.value) {
            //         injectPlaceholderStyle(inputRef.value, pageData.value.themeColor)
            //     }
            // }, 500)

        }, 3000)
        localStorageTools.set(LocalKeys.G_Activity_Modal_Lasted_Time, currentTime) // 更新存储时间
    }
    // if (inputRef.value) {
    //     setTimeout(() => {
    //         injectPlaceholderStyle(inputRef.value, pageData.value.themeColor)
    //     }, 300)
    // }
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