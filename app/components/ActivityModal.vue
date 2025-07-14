<template>
    <UModal :ui="{ width: 'sm:max-w-2xl' }" v-model="props.isshow">
        <div v-show="props.curactivity.couponReceiveMethod == 50"
            class="bg-[#fff5dc] rounded-xl shadow-xl flex flex-col md:flex-row max-w-3xl w-full overflow-hidden relative">
            <!-- ✅ 关闭按钮 -->
            <div class="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer" @click="handleget">
                <img src="/close.png" class="w-6">
            </div>
            <!-- 左图 -->
            <div class="w-full md:w-1/2">
                <img src="/activity.png" alt="Promo Image" class="w-full h-full object-cover" />
            </div>
            <!-- 右文 -->
            <div class="w-full md:w-1/2 p-6 flex flex-col">
                <div>
                    <div class="text-sm font-semibold text-arialblack flex items-center gap-1 border-b py-2"
                        style="border-color: #000000;">
                        <img src="/star.png" class="w-3" />
                        <span>inCustom.</span>
                    </div>
                    <p class="text-lg font-bold text-arialblack mt-20">
                        Enter your email to subscribe to promotion and get up to
                    </p>
                    <p class="text-4xl font-bold text-arialblack mt-6">
                        <span class="text-[60px] leading-[85px]">{{ offvalue }}</span><span
                            class="text-xl font-medium">{{
                                props.curactivity.discountType == 100 ? 'USD' : '%'
                            }} OFF</span>
                    </p>
                </div>
                <!-- 输入框和按钮 -->
                <div class="mt-6">
                    <!-- ✅ 包含图标的输入框 -->
                    <div class="relative">
                        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <img src="/email.png" class="w-6">
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
        <div v-show="props.curactivity.couponReceiveMethod == 10"
            class="bg-[#FFF6E8] rounded-xl shadow-xl p-6 flex flex-col items-center relative text-center">
            <!-- <div><img src="/acticitybg" /></div> -->
            <!-- SALE 背景字样 -->
            <div
                class="w-[90%] mx-auto relative flex items-center justify-center font-bold text-[#00000010] pointer-events-none">
                <img src="/acticitybg.png" alt="bg" />
                <div class="absolute inset-0 flex items-center justify-center text-base text-white">
                    <div>
                        <div>incustom</div>

                        <div class="mt-2 text-xl">{{ offdesc }}</div>

                    </div>
                </div>
            </div>

            <!-- 关闭按钮 -->
            <div class="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
                @click="handleCloseAttempt">
                <img src="/close.png" class="w-6">
            </div>
            <!-- 标题文字 -->
            <p class="text-black font-bold text-lg z-10">
                Welcome to <span class="text-primary font-bold">inCustom</span>, promotions are in progress
            </p>
            <!-- 优惠码说明 -->
            <p class="text-sm text-black z-10 mt-4">
                {{ offdesc }} your{{ props.curactivity.userFirstOrderOnly ? ' first order' : ' order' }} with code:
            </p>
            <!-- 优惠码 -->
            <div class="flex justify-center gap-2 z-10 mt-4">
                <div v-for="(char, index) in promoCode" :key="index"
                    class="bg-primary text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded">
                    {{ char }}
                </div>
                <!-- 复制按钮向下对齐 -->
                <div @click="copyCode" class="self-end mb-1 cursor-pointer">
                    <img src="/copy.png" class="w-6" />
                </div>
            </div>
            <!-- 按钮组，只有在 showButtons 为 true 时显示 -->
            <div v-if="showButtons" class="flex gap-4 mt-8 w-full justify-center">
                <button @click="handleget"
                    class="bg-black text-white px-6 py-3 rounded-full font-semibold text-base w-40">
                    Shop now
                </button>
                <button @click="handleExit"
                    class="bg-white border border-gray-300 text-black px-6 py-3 rounded-full font-semibold text-base w-40">
                    Continue Exit
                </button>
            </div>
            <!-- 确认按钮 -->
            <UButton v-if="!showButtons" @click="handleget"
                class="bg-black text-white rounded-full px-6 py-2 text-lg font-semibold z-10 mt-6">
                Okey, I understand
            </UButton>
        </div>
    </UModal>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { ref, onBeforeUnmount } from 'vue';
const { createMarketingActivityEmailSubscribe } = ActivityAuth();

const props = defineProps({
    isshow: Boolean,
    curactivity: Object
});
const emit = defineEmits(['update:isshow']);
const showtype = ref(2);
const email = ref('');
const offdesc = ref('');
const offvalue = ref('');
const loading = ref(false);
const promoCode = ref([]);
const showButtons = ref(false); // 新增：控制 Shop now 和 Continue Exit 按钮的显示

function copyCode() {
    const textToCopy = promoCode.value.join('');
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => message.success('copy success'))
            .catch(() => message.error('copy failed'));
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'absolute';
        textArea.style.opacity = '0';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            message.success('copy success');
        } catch (err) {
            message.error('copy failed');
        }
        textArea.remove();
    }
}

const handleSubmit = async () => {
    if (!email.value) {
        message.warning("Email is required.");
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        message.warning("Invalid email format.");
        return;
    }
    loading.value = true;
    try {
        const res = await createMarketingActivityEmailSubscribe({
            email: email.value,
            marketingActivityId: props.curactivity.id,
        });
        message.success("Subscription successful!");
        emit('update:isshow', false); // 关闭弹窗
    } catch (error) {
        console.error(error);
        message.error("An error occurred while subscribing.");
    } finally {
        loading.value = false;
    }
};

const handleCloseAttempt = () => {
    emit('update:isshow', false); // 关闭弹窗

};

const handleget = () => {
    if (props.curactivity.popupTriggerEvent == 100) {
        const now = new Date();
        const tomorrowMidnight = new Date();
        tomorrowMidnight.setDate(now.getDate() + 1);
        tomorrowMidnight.setHours(0, 0, 0, 0);
        const cookie = useCookie('hideactivity_' + props.curactivity.id, {
            expires: tomorrowMidnight
        });
        cookie.value = 1;
    }
    emit('update:isshow', false);
};

const handleExit = () => {
    window.close()

};

// 监听页面关闭事件
const handleBeforeUnload = (event) => {
    if (props.isshow && props.curactivity.couponReceiveMethod == 10) {
        showButtons.value = true; // 尝试关闭页面时显示按钮
        event.preventDefault();
        event.returnValue = '';
    }
};

// 在组件挂载时添加 beforeunload 事件监听
onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
});

// 在组件卸载时移除事件监听
onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
});

watch(
    () => props.curactivity,
    (newVal) => {
        if (newVal && !isEmptyObject(newVal)) {
            promoCode.value = props.curactivity.couponCodeNormalized.split('');
            let lastdiscount = props.curactivity.discountRuleList[props.curactivity.discountRuleList.length - 1];
            if (props.curactivity.discountType == 100) {
                offdesc.value = lastdiscount.y + 'USD OFF';
                offvalue.value = lastdiscount.y;
            } else {
                offdesc.value = lastdiscount.y + '% OFF';
                offvalue.value = lastdiscount.y;
            }
        }
    },
    { immediate: true }
);

function isEmptyObject(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0;
}
</script>