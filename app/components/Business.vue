<template>
    <div class="relative h-[320px] md:h-[336px] w-full bg-cover bg-center bg-no-repeat px-6 md:px-32"
        style="background-image: url('/images/business.webp')">
        <div class="absolute inset-0 bg-gray-900/50"></div>

        <div class="relative z-10 flex flex-col justify-center h-full text-left max-row">
            <div>
                <h2 class="text-xl md:text-[26px] font-bold text-white">
                    Join Our Newsletter
                </h2>
                <p class="text-sm md:text-base text-white leading-relaxed mt-2">
                    Huge selection shading solutions to suit your spaces.
                    <br />
                    Continuous price negotiation and supply chain optimization for you.
                </p>
            </div>

            <div class="mt-6 w-full max-w-md">
                <div
                    class="relative flex flex-col sm:flex-row items-stretch bg-white rounded shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
                    <!-- 图标：仅在 sm 及以上设备显示 -->
                    <div class="hidden sm:flex items-center px-3 py-2.5 text-gray-600">
                        <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                    </div>

                    <!-- 输入框 -->
                    <input type="email" v-model="email" placeholder="Enter your email"
                        @keydown.enter.prevent="handleSubmit"
                        class="flex-1 min-w-0 bg-transparent outline-none px-3 py-2.5 text-gray-800 placeholder-gray-400 border-0 focus:ring-0"
                        required />

                    <!-- 按钮 -->
                    <button :disabled="loading" @click="handleSubmit"
                        class="bg-bright hover:bg-secondary-600 text-white px-5 py-2.5 rounded-b sm:rounded-r sm:rounded-bl-none transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ loading ? 'Subscribing...' : 'Subscribe' }}
                    </button>
                </div>

                <p class="mt-4 text-xs text-white">
                    You can unsubscribe at any time. See our
                    <a href="/article/privacy-policy" class="underline hover:text-blue-300 transition-colors">Privacy
                        Policy</a>.
                </p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { message } from 'ant-design-vue';
import { ref } from 'vue';
const { createMarketingActivityEmailSubscribe } = ActivityAuth();

const email = ref('');
const loading = ref(false);

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
        });
        message.success("Subscription successful!");
        email.value = ''; // 清空输入框
    } catch (error) {
        message.error("An error occurred while subscribing.");
    } finally {
        loading.value = false;
    }
};
</script>
