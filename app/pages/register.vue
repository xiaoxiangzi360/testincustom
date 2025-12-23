<template>
    <div class="grid grid-cols-1 md:grid-cols-2 h-screen">
        <!-- 左侧带渐变背景 -->
        <div
            class="hidden sm:flex bg-gradient-to-br from-[#00B2E3] to-[#0074C8] flex flex-col items-center justify-center text-white p-10">
            <h1 class="text-4xl font-bold">Welcome Back to InCustom</h1>
            <p class="mt-2 text-lg">Access your store, orders, and designs instantly</p>
            <img src="/images/homelogin.png" alt="Custom Design" class="mt-6 w-full max-w-xl shadow-lg rounded-lg" />
            <ul class="mt-6 space-y-3 text-base">
                <li class="flex items-center gap-2">
                    <BaseIcon name="i-material-symbols-check-circle-rounded" class="text-2xl" />
                    Quick Access – Manage orders, track shipments & customize designs
                </li>
                <li class="flex items-center gap-2">
                    <BaseIcon name="i-material-symbols-check-circle-rounded" class="text-2xl" />
                    Exclusive Deals – Special offers & discounts for members
                </li>
                <li class="flex items-center gap-2">
                    <BaseIcon name="i-material-symbols-check-circle-rounded" class="text-2xl" />
                    New Features – Try our latest design tools & products
                </li>
            </ul>
        </div>

        <!-- 右侧注册表单 -->
        <div class="flex flex-col items-center justify-center p-8 bg-white">
            <NuxtLink to="/"><img src="/logo.png" class="h-10 mb-12" /></NuxtLink>

            <h2 class="text-2xl font-medium text-title mb-6">Sign Up</h2>

            <UForm :state="formState" @submit="handleRegister" class="w-full max-w-md">
                <UFormGroup name="email" required class="mb-4">
                    <UInput
                        :ui="{ base: 'dark:!bg-white dark:!text-gray-900', color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } } }"
                        v-model="formState.email" size="xl" placeholder="Email" type="email" @blur="validateemail" />
                    <span v-if="formErrors.email" class="text-red-500 text-sm mb-2">{{ formErrors.email }}</span>
                </UFormGroup>

                <!-- 优化布局：减少右侧空白 -->
                <UFormGroup name="verificationCode" required class="mb-4">
                    <div class="flex items-center" style="gap: 8px;">
                        <!-- 验证码输入框：限制最小宽度，确保按钮紧凑 -->
                        <UInput
                            :ui="{ base: 'dark:!bg-white dark:!text-gray-900', color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } } }"
                            v-model="formState.verificationCode" size="xl" placeholder="Email verification code"
                            @blur="validateVerificationCode" class="flex-1 min-w-0" />
                        <!-- 带下划线的文字按钮：紧凑样式 -->
                        <button type="button" @click="sendVerificationCode" :disabled="isSending || countdown > 0"
                            class="lg:w-[148px] text-primary underline hover:text-primary-600 transition-colors whitespace-nowrap text-sm font-normal px-1 py-2"
                            :class="{ 'opacity-50 cursor-not-allowed': isSending || countdown > 0 }">
                            {{ countdown > 0 ? `${countdown}s Resend` : 'Get Email verification' }}
                        </button>
                    </div>
                    <span v-if="formErrors.verificationCode" class="text-red-500 text-sm mb-2">{{
                        formErrors.verificationCode }}</span>
                </UFormGroup>

                <UFormGroup name="password" required class="mb-4">
                    <UInput v-model="formState.password" :type="showPassword ? 'text' : 'password'" size="xl"
                        placeholder="Password"
                        :ui="{ icon: { trailing: { pointer: '' }, }, base: 'dark:!bg-white dark:!text-gray-900', color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } } }"
                        @blur="validatePassword">
                        <template #trailing>
                            <UButton @click="togglePassword" variant="ghost" class="text-gray-500">
                                <BaseIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                    class="w-5 h-5" />
                            </UButton>
                        </template>
                    </UInput>
                    <span v-if="formErrors.password" class="text-red-500 text-sm mb-2">{{ formErrors.password }}</span>
                </UFormGroup>
            </UForm>

            <div class="flex items-center space-x-2 mb-6 w-full max-w-md">
                <UCheckbox v-model="formState.isChecked" name="agreement" />
                <span class="text-sm text-title">
                    I have read the
                    <a href="/article/terms-of-service" target="_blank"
                        class="text-primary underline hover:text-primary-600">
                        Terms Of Service
                    </a>
                    and
                    <a href="/article/privacy-policy" target="_blank"
                        class="text-primary underline hover:text-primary-600">
                        Privacy Policy
                    </a>
                </span>
            </div>
            <div class="flex items-center space-x-2  w-full max-w-md">
                <span v-if="formErrors.agreement" class="w-full text-red-500 text-sm mb-2">{{ formErrors.agreement
                    }}</span>
            </div>

            <UButton @click="handleRegister" class="text-white w-full max-w-md mt-6 p-3 block text-center">Sign up
            </UButton>
            <div class="text-gray-500 w-full max-w-md mt-4 text-left text-sm">
                Already have an account?
                <NuxtLink to="/login" class="text-primary underline hover:text-primary-600">Sign in</NuxtLink>
            </div>

            <div class="flex items-center w-full max-w-md mt-6 mb-4">
                <div class="flex-grow h-px bg-[#F0F0F0]"></div>
                <span class="mx-4 text-sm text-customblack">OR</span>
                <div class="flex-grow h-px bg-[#F0F0F0]"></div>
            </div>

            <!-- 快捷登录：改为横排布局 -->
            <div class="w-full max-w-md mt-4 flex gap-3">
                <div @click="socialLogin('google')"
                    class="flex-1 flex items-center cursor-pointer justify-center gap-2 text-gray-500 border border-[#D9D9D9] rounded-md px-4 py-[10px] text-sm">
                    <NuxtImg src="/images/google.png" class="w-5 h-5" />
                    Sign up with Google
                </div>
                <div @click="socialLogin('facebook')"
                    class="flex-1 flex items-center cursor-pointer justify-center gap-2 text-gray-500 border border-[#D9D9D9] rounded-md px-4 py-[10px] text-sm">
                    <NuxtImg src="/images/facebook.png" class="w-5 h-5" />
                    Sign up with Facebook
                </div>
            </div>

            <div class="w-full max-w-md mt-8  text-sm">
                <button type="button" class="text-gray-500 hover:text-gray-700">Register later,</button>
                <NuxtLink to="/" class="text-primary underline hover:text-primary-600">Return to Home</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const { register, sendUserRegisterEmail } = useAuth();
import { message } from 'ant-design-vue'
const { $showLoading, $hideLoading } = useNuxtApp()

definePageMeta({
    layout: 'blank',
    name: 'register',
    title: 'register',
    description: 'INcustom Register',
});

// 表单状态
const formState = reactive({
    email: '',
    verificationCode: '',
    password: '',
    isChecked: false, // 默认不勾选隐私政策
});

// 错误状态
const formErrors = reactive({
    email: '',
    verificationCode: '',
    password: '',
    agreement: '',
});

const showPassword = ref(false);
const isSending = ref(false);
const countdown = ref(0);

// 密码正则：6-20位，允许数字、字母、特殊符号，不允许空格
const passwordRegex = /^(?!.*\s)(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,20}$/;

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

// 邮箱验证
const validateemail = () => {
    const trimmedValue = formState.email;
    if (!trimmedValue) {
        formErrors.email = 'Email is required';
    } else if (!/^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedValue)) {
        formErrors.email = 'Invalid email format';
    } else {
        formErrors.email = '';
    }
};
const socialLogin = (provider) => {

    if ('google' == provider) {
        window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=894615293806-08cs1bithgteb9acpa6v471ru0n2lrqk.apps.googleusercontent.com&redirect_uri=https://www.incustom.com/googleauthorize&response_type=code&scope=openid%20email%20profile&state=C'
    }
    if ('facebook' == provider) {
        window.location.href = 'https://www.facebook.com/v23.0/dialog/oauth?client_id=946458614020677&redirect_uri=https://www.incustom.com/facebookauthorize&state=C&scope=public_profile%20email'
    }
    if ('apple' == provider) {
        message.warning('Not supported yet')
    }
    // 这里可以添加实际的社交登录逻辑
};
// 验证码验证
const validateVerificationCode = () => {
    const trimmedValue = formState.verificationCode;
    if (!trimmedValue) {
        formErrors.verificationCode = 'Verification code is required';
    } else if (trimmedValue.length < 6) { // 6位数字验证码
        formErrors.verificationCode = 'Verification code must be 6 digits';
    } else if (isNaN(Number(trimmedValue))) {
        formErrors.verificationCode = 'Verification code must be numbers only';
    } else {
        formErrors.verificationCode = '';
    }
};

// 密码验证
const validatePassword = () => {
    const trimmedValue = formState.password;
    if (!trimmedValue) {
        formErrors.password = 'Password is required';
    } else if (!passwordRegex.test(trimmedValue)) {
        formErrors.password = 'Password must be 6-20 characters and include numbers, letters, and special symbols (no spaces)';
    } else {
        formErrors.password = '';
    }
};

// 发送验证码（带下划线文字触发）
const sendVerificationCode = async () => {
    validateemail();
    if (formErrors.email) {
        message.warning(formErrors.email);
        return;
    }
    try {
        isSending.value = true;
        // 使用 useAuth 提供的 sendUserRegisterEmail 发送验证码
        await sendUserRegisterEmail(formState.email);
        message.success('Verification code sent to your email');
        countdown.value = 60;
        const timer = setInterval(() => {
            countdown.value--;
            if (countdown.value <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    } catch (error) {
        console.error('Failed to send verification code:', error);
        const errormsg = JSON.parse(error.message || '{}');
        message.error(errormsg.enDesc || 'Failed to send verification code, please try again');
    } finally {
        isSending.value = false;
    }
};

// 提交注册
const handleRegister = async () => {
    validateemail();
    validateVerificationCode();
    validatePassword();
    if (!formState.isChecked) {
        formErrors.agreement = 'You must agree to the Terms and Privacy Policy';
        return;
    } else {
        formErrors.agreement = '';
    }
    if (Object.values(formErrors).some(error => error)) {
        // 只报第一个不为空的错误
        const firstError = Object.values(formErrors).find(error => error)
        if (firstError == 'Password must be 6-20 characters and include numbers, letters, and special symbols (no spaces)') {
            message.warning('Password error, please reset your password.');

        } else {
            message.warning(firstError || 'Please check the form for errors');

        }
        return;
    }
    try {
        $showLoading();
        // 按接口要求组装参数
        const payload = {
            code: formState.verificationCode,
            user: {
                email: formState.email,
                password: formState.password.trim()
            }
        };
        // 调用注册接口
        const res = await register(payload);
        $hideLoading();
        message.success('Registration successful! Redirecting...');
        navigateTo('/');
    } catch (error) {
        $hideLoading();
        console.error('Registration failed:', error);
        const errormsg = JSON.parse(error.message || '{}');
        if (errormsg.errorKey === 'email') {
            formErrors.email = errormsg.enDesc || 'Email already exists';
        } else if (errormsg.errorKey === 'verificationCode') {
            formErrors.verificationCode = errormsg.enDesc || 'Invalid or expired verification code';
        } else if (errormsg.errorKey === 'password') {
            formErrors.password = errormsg.enDesc || 'Invalid password format';
        } else {
            message.error(errormsg.enDesc || 'Registration failed, please try again');
        }
    }
};
</script>

<style scoped>
:deep(.bg-gray-100) {
    background-color: #F1F1F1 !important;
}

:deep(input::placeholder) {
    color: #B3B3B3;
}

/* 关键优化：移除输入框默认内边距，减少空白 */
:deep(.u-form-group .u-input-wrapper) {
    flex: 1;
    min-width: 0;
    /* 关键：允许输入框收缩，不占用多余空间 */
}

/* 优化输入框样式，减少内部空白 */
:deep(.u-input) {
    padding-left: 12px !important;
    padding-right: 12px !important;
}

/* 确保表单组不占用多余宽度 */
:deep(.u-form-group) {
    width: 100%;
}

/* 优化横排按钮的响应式表现 */
@media (max-width: 640px) {
    .flex.gap-3 {
        flex-direction: column;
    }
}
</style>