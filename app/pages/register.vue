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

        <!-- 右侧注册表单 -->
        <div class="flex flex-col items-center justify-center p-8 bg-white">
            <NuxtLink to="/"><img src="/logo.png" class="h-10 mb-12" /></NuxtLink>

            <h2 class="text-2xl font-medium text-title mb-6">Create an account using email</h2>

            <UForm :state="formState" @submit="handleRegister" class="w-full max-w-md">
                <UFormGroup name="fullName" required class="mb-4">
                    <UInput :ui="{ base: 'dark:!bg-white dark:!text-gray-900' }" v-model="formState.fullName" size="xl"
                        placeholder="Full name" @blur="validatefullName" />
                    <span v-if="formErrors.fullName" class="text-red-500 text-sm mb-2">{{ formErrors.fullName }}</span>
                </UFormGroup>

                <UFormGroup name="email" required class="mb-4">
                    <UInput :ui="{ base: 'dark:!bg-white dark:!text-gray-900' }" v-model="formState.email" size="xl"
                        placeholder="Email" type="email" @blur="validateemail" />
                    <span v-if="formErrors.email" class="text-red-500 text-sm mb-2">{{ formErrors.email }}</span>
                </UFormGroup>

                <UFormGroup name="password" required class="mb-4">
                    <UInput v-model="formState.password" :type="showPassword ? 'text' : 'password'" size="xl"
                        placeholder="Password"
                        :ui="{ icon: { trailing: { pointer: '' }, }, base: 'dark:!bg-white dark:!text-gray-900' }"
                        @blur="validatePassword">
                        <template #trailing>
                            <UButton @click="togglePassword" variant="ghost" class="text-gray-500">
                                <UIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                    class="w-5 h-5" />
                            </UButton>
                        </template>
                    </UInput>
                    <span v-if="formErrors.password" class="text-red-500 text-sm mb-2">{{ formErrors.password }}</span>
                </UFormGroup>

                <UFormGroup name="repassword" required class="mb-4">
                    <UInput :ui="{ base: 'dark:!bg-white dark:!text-gray-900' }" v-model="formState.repassword"
                        type="password" size="xl" placeholder="Confirm password" @blur="validatePasswordMatch" />
                    <span v-if="formErrors.repassword" class="text-red-500 text-sm mb-2">{{ formErrors.repassword
                        }}</span>
                </UFormGroup>
            </UForm>

            <div class="flex items-center space-x-2 mb-6 w-full max-w-md">
                <UCheckbox v-model="formState.isChecked" name="agreement"
                    :ui="{ background: 'dark:!bg-white', base: 'dark:!bg-white dark:!text-primary-900' }" />
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
            <div class="text-title w-full max-w-md mt-4 text-center">
                <NuxtLink to="/login" class="text-title hover:underline">Return to Login</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
const { register } = useAuth();
const toast = useToast();
import { message } from 'ant-design-vue'
const { $showLoading, $hideLoading } = useNuxtApp()

definePageMeta({
    layout: 'blank',
    name: 'Register',
    title: 'Register',
    description: 'INcustom Register',
});

// 表单状态
const formState = reactive({
    fullName: '',
    email: '',
    password: '',
    repassword: '',
    isChecked: true, // 默认勾选隐私政策
});

// 错误状态
const formErrors = reactive({
    fullName: '',
    email: '',
    password: '',
    repassword: '',
    agreement: '',
});

const showPassword = ref(false);

// 密码正则：6-20位，允许数字、字母、特殊符号，不允许空格
const passwordRegex = /^(?!.*\s)(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,20}$/;

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const validatefullName = () => {
    const trimmedValue = formState.fullName;
    if (!trimmedValue) {
        formErrors.fullName = 'Full name is required';
    } else {
        formErrors.fullName = '';
    }
};

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

// 实时检测密码格式
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

// 实时检测两次密码是否一致
const validatePasswordMatch = () => {
    const trimmedValue = formState.repassword;
    if (!trimmedValue) {
        formErrors.repassword = 'Please confirm your password';
    } else if (formState.password.trim() && formState.password.trim() !== trimmedValue) {
        formErrors.repassword = 'Passwords do not match';
    } else {
        formErrors.repassword = '';
    }
};

// 提交注册
const handleRegister = async () => {
    if (!formState.isChecked) {
        formErrors.agreement = 'You must agree to the terms';
        return;
    } else {
        formErrors.agreement = '';
    }

    if (Object.values(formErrors).some((error) => error)) {
        return;
    }

    try {
        $showLoading()

        let res = await register(
            formState.fullName.replace(/\s/g, ""),
            formState.email,
            formState.password.trim()
        );
        $hideLoading()

        message.success('Registration successful!')
        navigateTo('/');
    } catch (error) {
        $hideLoading()
        console.error(error);
        let errormsg = JSON.parse(error.message)
        if (errormsg.errorKey == 'email') {
            formErrors.email = errormsg.enDesc;
            return;
        }
        if (errormsg.errorKey == 'password') {
            formErrors.password = errormsg.enDesc;
            return;
        }
        formErrors.email = '';
        formErrors.password = '';
        message.error(errormsg.enDesc || 'Login failed, please try again')
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
</style>
