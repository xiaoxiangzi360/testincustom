<template>
    <div class="grid grid-cols-1 md:grid-cols-2 h-screen">
        <!-- 左侧带渐变背景 -->
        <div
            class="bg-gradient-to-br from-[#00B2E3] to-[#0074C8] flex flex-col items-center justify-center text-white p-10">
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

        <!-- 右侧登录区域 -->
        <div class="flex flex-col items-center justify-center p-8">
            <NuxtLink to="/"><img src="/logo.png" class="h-10 mb-12" /></NuxtLink>
            <h2 class="text-2xl font-medium text-gray-900 mb-6">Log In</h2>

            <UForm :state="formState" @submit="handleLogin" class="w-full max-w-md">
                <UFormGroup name="email" required class="mb-4">
                    <UInput v-model="formState.email" size="xl" placeholder="Your email address" type="email"
                        @blur="validateEmail" />
                    <span v-if="formErrors.email" class="text-red-500 text-sm mb-2">{{ formErrors.email
                        }}</span>
                </UFormGroup>

                <UFormGroup name="password" required class="mb-4">
                    <UInput v-model="formState.password" :type="showPassword ? 'text' : 'password'" size="xl"
                        placeholder="Password" :ui="{ icon: { trailing: { pointer: '' } } }" @blur="validatePassword">
                        <template #trailing>
                            <UButton @click="togglePassword" variant="ghost" class="text-gray-500">
                                <UIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                    class="w-5 h-5" />
                            </UButton>
                        </template>
                    </UInput>
                    <span v-if="formErrors.password" class="text-red-500 text-sm mb-2">{{ formErrors.password
                        }}</span>
                </UFormGroup>

                <div class="flex items-center justify-between w-full mb-6 text-sm text-gray-600">
                    <UCheckbox v-model="formState.rememberMe" name="remember-me" label="Remember me" />
                </div>

                <UButton type="submit" size="xl"
                    class="text-primary w-full max-w-md mt-6 p-3 block text-center text-white">Log In
                </UButton>
            </UForm>

            <div class="flex justify-between w-full max-w-md mt-4 text-sm text-gray-600">
                <NuxtLink to="/register" class="hover:underline">Register</NuxtLink>
                <NuxtLink to="/forgetpassword" class="hover:underline">Forgot Password?</NuxtLink>
            </div>

            <div class="flex items-center w-full max-w-md mt-6 mb-4">
                <div class="flex-grow h-px bg-customblack"></div>
                <span class="mx-4 text-sm text-customblack">OR</span>
                <div class="flex-grow h-px bg-customblack"></div>
            </div>


            <div class="flex justify-center gap-4 mt-4">
                <UButton variant="ghost"
                    class="bg-gray-50 w-32 h-12 flex items-center justify-center gap-2 rounded-lg p-3 text-gray-700 hover:bg-primary hover:text-white transition-colors duration-300"
                    @click="socialLogin('google')">
                    <img src="/images/google.png" class="w-5 h-5" alt="Google" />
                    <span class="font-medium">Google</span>
                </UButton>
                <UButton variant="ghost"
                    class="bg-gray-50 w-32 h-12 flex items-center justify-center gap-2 rounded-lg p-3 text-gray-700 hover:bg-primary hover:text-white transition-colors duration-300"
                    @click="socialLogin('apple')">
                    <img src="/images/apple.png" class="w-5 h-5" alt="Apple" />
                    <span class="font-medium">Apple</span>
                </UButton>
                <UButton variant="ghost"
                    class="bg-gray-50 w-32 h-12 flex items-center justify-center gap-2 rounded-lg p-3 text-gray-700 hover:bg-primary hover:text-white transition-colors duration-300"
                    @click="socialLogin('facebook')">
                    <img src="/images/facebook.png" class="w-5 h-5" alt="Facebook" />
                    <span class="font-medium">Facebook</span>
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const { login } = useAuth();
const toast = useToast();
import { message } from 'ant-design-vue'
const { $showLoading, $hideLoading } = useNuxtApp()
definePageMeta({
    layout: 'blank',
    name: 'Login',
    title: 'Login',
    description: 'INcustom Login',
});

// 表单状态
const formState = reactive({
    email: '',
    password: '',
    rememberMe: false,
});

// 错误状态
const formErrors = reactive({
    email: '',
    password: '',
});

const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};
const passwordRegex = /^(?!.*\s)(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,20}$/;

// 实时验证邮箱
const validateEmail = (value) => {
    const trimmedValue = formState.email;
    if (!trimmedValue) {
        formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(trimmedValue)) {
        formErrors.email = 'Invalid email format';
    } else {
        formErrors.email = '';
    }
};
const validatePassword = () => {

    const trimmedValue = formState.password;
    if (!trimmedValue) {
        formErrors.password = 'Password is required';
    } else if (!passwordRegex.test(trimmedValue)) {
        formErrors.password = 'Password must be 6-20 characters and include numbers, letters, and special symbols (no spaces)';
    } else {
        formErrors.password = '';
    }
    console.log(formErrors);

    // validatePasswordMatch(formState.repassword);
};
// 表单提交时的验证
const validate = (state) => {
    const errors = [];

    if (!state.email.trim()) {
        formErrors.email = 'Email is required';
        // errors.push({ path: 'email', message: formErrors.email });
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
        formErrors.email = 'Invalid email format';
        // errors.push({ path: 'email', message: formErrors.email });
    } else {
        formErrors.email = '';
    }

    if (!state.password.trim()) {
        formErrors.password = 'Password is required';
        // errors.push({ path: 'password', message: formErrors.password });
    } else {
        formErrors.password = '';
    }

    return errors;
};

// 处理登录
const handleLogin = async () => {
    // 前端验证
    if (Object.values(formErrors).some((error) => error)) {
        // toast.add({
        //     title: 'Error',
        //     description: 'Please fix the errors in the form',
        //     color: 'red',
        //     timeout: 3000,
        // });
        return;
    }

    try {
        $showLoading()
        await login(formState.email.trim(), formState.password.trim());

        // 如果勾选了"Remember me"，保存到本地存储
        if (formState.rememberMe) {
            localStorage.setItem('rememberedEmail', formState.email.trim());
            localStorage.setItem('rememberedpassword', formState.password.trim());
        } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedpassword');
        }
        $hideLoading()
        message.success('Login successful!')

        navigateTo('/');
    } catch (error) {
        $hideLoading()
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

// 处理社交登录（示例）
const socialLogin = (provider) => {
    toast.add({
        title: 'Info',
        description: `Logging in with ${provider}... (Not implemented)`,
        color: 'blue',
        timeout: 2000,
    });
    // 这里可以添加实际的社交登录逻辑
};

// 初始化时检查本地存储
onMounted(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedpassword = localStorage.getItem('rememberedpassword');
    if (rememberedEmail) {
        formState.email = rememberedEmail;
        formState.rememberMe = true;
    }
    if (rememberedpassword) {
        formState.password = rememberedpassword;
    }
});
</script>

<style scoped>
/* 自定义样式优化 */
.w-32 {
    width: 8rem;
    /* 统一社交按钮宽度 */
}

:deep(input::placeholder) {
    color: #B3B3B3;
}
</style>