<template>
    <div class="grid grid-cols-1 md:grid-cols-2 h-screen">
        <!-- 右侧登录区域 -->
        <div class="flex flex-col items-center justify-center p-8">
            <NuxtLink to="/"><img src="/logo.png" class="h-10 mb-12" /></NuxtLink>

            <h2 class="text-2xl font-medium text-gray-900 text-title">Reset your password</h2>
            <div class="max-w-md text-title w-full text-base" v-if="step == 1">
                <div class="mt-4 max-w-md text-title w-full text-base">Please enter your email and code</div>
                <UInput v-model="email" size="xl" placeholder="Your email address" class="mt-1 w-full max-w-md" />
                <div class="relative mt-2 w-full max-w-md text-red-500 text-xs">{{ errorMessages }}</div>

                <ClientOnly>
                    <Turnstile ref="turnstileRef" v-model="turnstileToken" siteKey="0x4AAAAAABCCDmTDhTUkRB29"
                        @success="onVerify" class="mt-3 mt-1 w-full max-w-md" />
                </ClientOnly>

                <UButton @click="submitForm" class="text-white w-full max-w-md mt-6 p-3 block text-center">
                    Get email verification
                </UButton>
            </div>
            <div class="max-w-md text-title w-full text-base" v-if="step == 2">
                <UForm :state="formState" :validate="validate" @submit="resetpassword" class="w-full max-w-md">


                    <UFormGroup name="emailcode" required class="mb-4">
                        <UInput v-model="formState.emailcode" size="xl" placeholder="verificaiton code" type="text" />
                    </UFormGroup>
                    <div>if you don’t receive the email
                        <UButton variant="ghost" class="text-primary  duration-200" label="Get email verification"
                            :disabled="countdown > 0" @click="submitForm">
                            {{ countdown > 0 ? `Resend in ${countdown}s` : "Get email verification" }}
                        </UButton>
                    </div>
                    <UFormGroup name="password" required class="mb-4">
                        <UInput v-model="formState.password" :type="showPassword ? 'text' : 'password'" size="xl"
                            placeholder="Password" :ui="{ icon: { trailing: { pointer: '' } } }"
                            @update:modelValue="validatePassword">
                            <template #trailing>
                                <UButton @click="togglePassword" variant="ghost" class="text-gray-500">
                                    <UIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                        class="w-5 h-5" />
                                </UButton>
                            </template>
                        </UInput>
                    </UFormGroup>

                    <UFormGroup name="repassword" required class="mb-4">
                        <UInput v-model="formState.repassword" type="password" size="xl" placeholder="Confirm password"
                            @update:modelValue="validatePasswordMatch" />
                    </UFormGroup>

                    <UButton type="submit" class="text-white w-full max-w-md mt-6 p-3 block text-center">Reset
                        password
                    </UButton>
                </UForm>
            </div>

            <div class="text-title w-full max-w-md mt-2 p-2 block text-center">
                <NuxtLink to="/login" class="block text-title hover:underline">Return to Login</NuxtLink>
            </div>
        </div>

        <!-- 左侧带渐变背景 -->
        <div
            class="bg-gradient-to-br from-[#00B2E3] to-[#0074C8] flex flex-col items-center justify-center text-white p-10">
            <h1 class="text-4xl font-bold">Welcome Back to InCustom</h1>
            <p class="mt-2 text-lg">Access your store, orders, and designs instantly</p>

            <img src="/images/homelogin.png" alt="Custom Design" class="mt-6 w-full max-w-xl shadow-lg rounded-lg">

            <ul class="mt-6 space-y-3 text-base">
                <li class="flex items-center gap-2">
                    <UIcon name="i-material-symbols-check-circle-rounded" class="text-2xl" />
                    Quick Access – Manage orders, track shipments & customize designs
                </li>
                <li class="flex items-center gap-2">
                    <UIcon name="i-material-symbols-check-circle-rounded" class="text-2xl" />
                    Exclusive Deals – Special offers & discounts for members
                </li>
                <li class="flex items-center gap-2">
                    <UIcon name="i-material-symbols-check-circle-rounded" class="text-2xl" />
                    New Features – Try our latest design tools & products
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Turnstile from 'vue-turnstile' // 手动导入组件
const { sendrepassword, updatepassword } = useAuth();
import { message } from 'ant-design-vue'
const { $showLoading, $hideLoading } = useNuxtApp()

const toast = useToast();
const step = ref(1);
definePageMeta({
    layout: 'blank',
    name: 'Forgetpassword',
    title: 'Forgetpassword',
    description: "INcustom Forgetpassword",
})
// 表单状态
const formState = reactive({
    fullName: '',
    email: '',
    emailcode: '',
    password: '',
    repassword: '',
    numberAreaCode: '+1',
    phoneNumber: '',
    isChecked: false,
});

// 错误状态
const formErrors = reactive({
    fullName: '',
    email: '',
    emailcode: '',
    password: '',
    repassword: '',
    phone: '',
    agreement: '',
});

const showPassword = ref(false);
const passwordRegex = /^(?!.*\s)(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,20}$/;

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};
const email = ref('')
const code = ref('')
const password = ref('')
const repassword = ref('')
const turnstileToken = ref("") // 用于绑定 modelValue
const errorMessages = ref('')
const emailcode = ref('')
const countdown = ref(0);
let timer = null;
const turnstileRef = ref(null);
const onVerify = (token) => {
    // Debugging logs to see if this function is triggered
    console.log("onVerify triggered", token)
    if (token) {
        turnstileToken.value = token
        console.log("Turnstile token:", turnstileToken.value)
    } else {
        console.error("No token received from Turnstile.")
    }
}
// 实时检测密码格式
const validatePassword = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
        formErrors.password = 'Password is required';
    } else if (!passwordRegex.test(trimmedValue)) {
        formErrors.password = 'Password must be 6-20 characters and include numbers, letters, and special symbols (no spaces)';
    } else {
        formErrors.password = '';
    }
    validatePasswordMatch(formState.repassword); // 同步检查确认密码
};

// 实时检测两次密码是否一致
const validatePasswordMatch = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
        formErrors.repassword = 'Please confirm your password';
    } else if (formState.password.trim() && formState.password.trim() !== trimmedValue) {
        formErrors.repassword = 'Passwords do not match';
    } else {
        formErrors.repassword = '';
    }
};

// 表单提交时的验证（不重复验证密码）
const validate = (state) => {
    const errors = [];

    if (!state.emailcode) {
        formErrors.emailcode = 'verificaiton code is required';
        errors.push({ path: 'emailcode', message: formErrors.emailcode });
    } else {
        formErrors.email = '';
    }


    // 密码和确认密码的验证已在实时检测中完成，这里只检查是否有错误
    if (formErrors.password) {
        errors.push({ path: 'password', message: formErrors.password });
    }
    if (formErrors.repassword) {
        errors.push({ path: 'repassword', message: formErrors.repassword });
    }

    return errors;
};

const submitForm = async () => {

    // Form validation
    if (!email.value) {
        errorMessages.value = "Please enter your email address."
        return
    }

    if (!turnstileToken.value) {
        errorMessages.value = "Please complete the CAPTCHA."
        return
    }
    try {
        $showLoading()

        let res = await sendrepassword(
            email.value,
            turnstileToken.value
        );
        $hideLoading()

        message.success('We have sent the email verification code to your email ！')

        step.value = 2
        countdown.value = 60;
        timer = setInterval(() => {
            if (countdown.value > 0) {
                countdown.value--;
            } else {
                clearInterval(timer);
            }
        }, 1000);
    } catch (error) {
        $hideLoading()

        nextTick(() => {
            turnstileRef.value?.reset();
        });
        let errormsg = JSON.parse(error.message)

        message.error(errormsg.enDesc || 'failed, please try again')
        console.log(turnstileToken.value);

    }
}
const resetpassword = async () => {

    try {

        let res = await updatepassword(
            email.value,
            formState.emailcode,
            formState.password,
        );

        message.success('password update successful!')

        setTimeout(() => navigateTo('/login'), 3000);

    } catch (error) {
        nextTick(() => {
            turnstileRef.value?.reset();
        });
        let errormsg = JSON.parse(error.message)

        message.error(errormsg.enDesc || 'failed, please try again')
    }
}
</script>
<style>
:deep(input::placeholder) {
    color: #B3B3B3;
}
</style>