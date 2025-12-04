<template>
    <div class="grid grid-cols-1 md:grid-cols-2 h-screen">
        <!-- 左侧渐变背景（两步共用） -->
        <div
            class="hidden sm:flex bg-gradient-to-br from-[#00B2E3] to-[#0074C8] flex-col items-center justify-center text-white p-10 transition-all duration-500">
            <h1 class="text-4xl font-bold mb-2 transition-all duration-500">
                {{ currentStep === 1 ? 'Welcome Back to InCustom' : 'Complete Your Profile' }}
            </h1>
            <p class="mt-2 text-lg mb-6 transition-all duration-500">
                {{
                    currentStep === 1
                        ? 'Access your store, orders, and designs instantly'
                        : 'Tell us more about your business to get started'
                }}
            </p>
            <img src="/images/homelogin.png" alt="{{ currentStep === 1 ? 'Custom Design' : 'Business Setup' }}"
                class="mt-6 w-full max-w-xl shadow-lg rounded-lg transition-all duration-500" />
            <ul class="mt-6 space-y-3 text-base transition-all duration-500">
                <template v-if="currentStep === 1">
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
                </template>
                <template v-else>
                    <li class="flex items-center gap-2">
                        <BaseIcon name="i-material-symbols-check-circle-rounded" class="text-2xl" />
                        Customize your business profile
                    </li>
                    <li class="flex items-center gap-2">
                        <BaseIcon name="i-material-symbols-check-circle-rounded" class="text-2xl" />
                        Choose your product categories
                    </li>
                    <li class="flex items-center gap-2">
                        <BaseIcon name="i-material-symbols-check-circle-rounded" class="text-2xl" />
                        Get tailored recommendations
                    </li>
                </template>
            </ul>
        </div>

        <!-- 右侧表单（两步切换） -->
        <div class="right-container flex flex-col items-center justify-start lg:justify-center py-12 px-4 bg-white">
            <NuxtLink to="/">
                <img src="/logo.png" class="h-10 mb-8" />
            </NuxtLink>
            <!-- 第一步：账号注册 -->
            <div v-if="currentStep === 1" class="w-full max-w-[480px] transition-all duration-500">
                <h2 class="text-2xl font-medium text-title mb-6 text-center">Sign Up</h2>

                <UForm :state="formStep1" @submit.prevent="handleStep1Submit" class="w-full">
                    <UFormGroup name="email" required class="mb-5">
                        <UInput :ui="{
                            base: 'dark:!bg-white dark:!text-gray-900',
                            color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                        }" v-model="formStep1.email" size="lg" placeholder="Email" type="email"
                            @blur="validateStep1Field('email')" />
                        <span v-if="errorsStep1.email" class="text-red-500 text-sm mb-2">
                            {{ errorsStep1.email }}
                        </span>
                    </UFormGroup>

                    <UFormGroup name="verificationCode" required class="mb-5">
                        <div class="flex items-center gap-2">
                            <UInput :ui="{
                                base: 'dark:!bg-white dark:!text-gray-900',
                                color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                            }" v-model="formStep1.verificationCode" size="lg" placeholder="Email verification code"
                                @blur="validateStep1Field('verificationCode')" class="flex-1 min-w-0" />
                            <button type="button" @click="sendVerificationCode" :disabled="isSending || countdown > 0"
                                class="text-primary underline hover:text-primary-600 transition-colors whitespace-nowrap text-sm font-normal px-1 py-2"
                                :class="{ 'opacity-50 cursor-not-allowed': isSending || countdown > 0 }">
                                {{ countdown > 0 ? `${countdown}s Resend` : 'Get Email verification' }}
                            </button>
                        </div>
                        <span v-if="errorsStep1.verificationCode" class="text-red-500 text-sm mb-2">
                            {{ errorsStep1.verificationCode }}
                        </span>
                    </UFormGroup>

                    <UFormGroup name="password" required class="mb-5">
                        <UInput v-model="formStep1.password" :type="showPassword ? 'text' : 'password'" size="lg"
                            placeholder="Password" :ui="{
                                icon: { trailing: { pointer: '' } },
                                base: 'dark:!bg-white dark:!text-gray-900',
                                color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                            }" @blur="validateStep1Field('password')">
                            <template #trailing>
                                <UButton @click="togglePassword" variant="ghost" class="text-gray-500">
                                    <BaseIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                        class="w-5 h-5" />
                                </UButton>
                            </template>
                        </UInput>
                        <span v-if="errorsStep1.password" class="text-red-500 text-sm mb-2">
                            {{ errorsStep1.password }}
                        </span>
                    </UFormGroup>
                </UForm>

                <div class="flex items-start space-x-2 mb-4 w-full">
                    <UCheckbox v-model="formStep1.isChecked" name="agreement" />
                    <span class="text-sm text-title leading-relaxed">
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
                <div class="flex items-center space-x-2 w-full mb-2">
                    <span v-if="errorsStep1.agreement" class="w-full text-red-500 text-sm">
                        {{ errorsStep1.agreement }}
                    </span>
                </div>

                <UButton @click="handleStep1Submit" size="lg" :ui="{ rounded: 'rounded-md' }"
                    class="text-white w-full mt-4 block text-center">
                    Next Step
                </UButton>

                <div class="text-gray-500 w-full mt-4 text-left text-sm">
                    Already have an account?
                    <NuxtLink to="/login" class="text-primary underline hover:text-primary-600">
                        Sign in
                    </NuxtLink>
                </div>

                <div class="flex items-center w-full mt-6 mb-4">
                    <div class="flex-grow h-px bg-[#F0F0F0]"></div>
                    <span class="mx-4 text-sm text-customblack">OR</span>
                    <div class="flex-grow h-px bg-[#F0F0F0]"></div>
                </div>

                <div class="w-full mt-2 flex gap-3">
                    <div @click="socialLogin('google')"
                        class="flex-1 flex items-center cursor-pointer justify-center gap-2 text-gray-500 border border-[#D9D9D9] rounded-md px-4 py-[10px] text-sm">
                        <NuxtImg src="/images/google.png" class="w-5 h-5" />
                        Sign up with Google
                    </div>
                    <div @click="socialLogin('facebook')"
                        class="social-login-button flex-1 flex items-center cursor-pointer justify-center gap-2 text-gray-500 border border-[#D9D9D9] rounded-md px-4 py-[10px] text-sm">
                        <NuxtImg src="/images/facebook.png" class="w-5 h-5" />
                        Sign up with Facebook
                    </div>
                </div>

                <div class="w-full mt-8 text-sm">
                    <button type="button" class="text-gray-500 hover:text-gray-700">
                        Register later,
                    </button>
                    <NuxtLink to="/" class="text-primary underline hover:text-primary-600">
                        Return to homepage
                    </NuxtLink>
                </div>
            </div>

            <!-- 第二步：企业信息 -->
            <div v-else class="w-full max-w-[480px] transition-all duration-500">
                <h2 class="text-2xl font-medium text-title mb-6 text-center">Business Information</h2>

                <UForm :state="formStep2" @submit.prevent="handleStep2Submit" class="w-full">
                    <!-- 姓名 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <UFormGroup name="firstName" required>
                            <UInput :ui="{
                                base: 'dark:!bg-white dark:!text-gray-900',
                                color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                            }" v-model="formStep2.firstName" size="lg" maxlength="50" placeholder="First Name"
                                @blur="validateStep2Field('firstName')" />
                            <span v-if="errorsStep2.firstName" class="text-red-500 text-sm">
                                {{ errorsStep2.firstName }}
                            </span>
                        </UFormGroup>

                        <UFormGroup name="lastName" required>
                            <UInput :ui="{
                                base: 'dark:!bg-white dark:!text-gray-900',
                                color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                            }" v-model="formStep2.lastName" size="lg" maxlength="50" placeholder="Last Name"
                                @blur="validateStep2Field('lastName')" />
                            <span v-if="errorsStep2.lastName" class="text-red-500 text-sm">
                                {{ errorsStep2.lastName }}
                            </span>
                        </UFormGroup>
                    </div>
                    <!-- 联系方式 -->
                    <UFormGroup name="contactMethod" required class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-700">How to Contact :</label>

                        <div class="flex items-center gap-3">
                            <!-- 左侧下拉框 -->
                            <USelect v-model="formStep2.contactMethod" :options="contactTypeOptions" size="lg"
                                class="w-40" :ui="{
                                    base: 'dark:!bg-white dark:!text-gray-900',
                                    color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                                }" @change="handleContactMethodChange" />

                            <!-- 右侧输入框（根据类型变换） -->
                            <div class="flex-1 flex items-center gap-2">
                                <!-- Phone / WhatsApp 输入 -->
                                <template v-if="formStep2.contactMethod === '3'">
                                    <USelect v-model="formStep2.countryCode" :options="countryCodes" size="lg"
                                        class="w-24" :ui="{
                                            base: 'dark:!bg-white dark:!text-gray-900',
                                            color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                                        }" />
                                    <UInput v-model="formStep2.phoneNumber" size="lg" placeholder="Phone Number"
                                        @blur="validateStep2Field('phoneNumber')" class="flex-1" :ui="{
                                            base: 'dark:!bg-white dark:!text-gray-900',
                                            color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                                        }" />
                                </template>
                                <template v-else-if="formStep2.contactMethod === '2'">
                                    <USelect v-model="formStep2.countryCode" :options="countryCodes" size="lg"
                                        class="w-24" :ui="{
                                            base: 'dark:!bg-white dark:!text-gray-900',
                                            color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                                        }" />
                                    <UInput v-model="formStep2.whatsappNumber" size="lg" placeholder="WhatsApp Number"
                                        @blur="validateStep2Field('whatsappNumber')" class="flex-1" :ui="{
                                            base: 'dark:!bg-white dark:!text-gray-900',
                                            color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                                        }" />
                                </template>
                                <template v-else-if="formStep2.contactMethod === '1'">
                                    <UInput v-model="formStep2.facebookUrl" size="lg" placeholder="Facebook URL"
                                        @blur="validateStep2Field('facebookUrl')" class="flex-1" :ui="{
                                            base: 'dark:!bg-white dark:!text-gray-900',
                                            color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                                        }" />
                                </template>
                            </div>
                        </div>

                        <!-- 错误提示 -->
                        <span v-if="errorsStep2[contactFieldName]" class="text-red-500 text-sm">
                            {{ errorsStep2[contactFieldName] }}
                        </span>
                    </UFormGroup>
                    <!-- 产品分类 -->
                    <UFormGroup name="productCategory" required class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-700">
                            What Category do you sell
                        </label>
                        <USelectMenu v-model="formStep2.productCategory" :options="categoryOptions" multiple size="lg"
                            placeholder="Select categories" :ui="{
                                base: 'dark:!bg-white dark:!text-gray-900',
                                color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                            }" track-by="value" @blur="validateStep2Field('productCategory')">
                            <template #label>
                                <span v-if="formStep2.productCategory.length === 0" class="text-gray-400">
                                    Select categories
                                </span>
                                <span v-else>
                                    {{
                                        formStep2.productCategory.map(item => typeof item === 'object' ? item.label :
                                            (categoryOptions.find(opt => opt.value === item)?.label || item)).join(', ')
                                    }}
                                </span>
                            </template>
                        </USelectMenu>
                        <span v-if="errorsStep2.productCategory" class="text-red-500 text-sm">
                            {{ errorsStep2.productCategory }}
                        </span>
                    </UFormGroup>

                    <!-- 销售渠道 -->
                    <UFormGroup name="salesChannels" required class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-700">
                            On which channels will you sell your products?
                        </label>

                        <USelect v-model="formStep2.salesChannels" :options="channelsOptions" size="lg"
                            placeholder="Select channels" :ui="{
                                base: 'dark:!bg-white dark:!text-gray-900',
                                color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                            }" @change="handleSalesChannelChange" />

                        <span v-if="errorsStep2.salesChannels" class="text-red-500 text-sm">
                            {{ errorsStep2.salesChannels }}
                        </span>
                    </UFormGroup>
                    <!-- 店铺网址 -->
                    <UFormGroup name="storeUrl" :required="formStep2.salesChannels === '1'" class="mb-5"
                        v-show="formStep2.salesChannels === '1'">
                        <UInput :ui="{
                            base: 'dark:!bg-white dark:!text-gray-900',
                            color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                        }" v-model="formStep2.storeUrl" size="lg" placeholder="Your Store/website address (url)"
                            @blur="validateStep2Field('storeUrl')" />
                        <span v-if="errorsStep2.storeUrl" class="text-red-500 text-sm">
                            {{ errorsStep2.storeUrl }}
                        </span>
                    </UFormGroup>

                    <!-- 月收入 -->
                    <UFormGroup name="monthlyRevenue" required class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-700">
                            What's your monthly revenue?
                        </label>
                        <USelect :ui="{
                            base: 'dark:!bg-white dark:!text-gray-900',
                            color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                        }" v-model="formStep2.monthlyRevenue" :options="revenueOptions" size="lg"
                            @blur="validateStep2Field('monthlyRevenue')" />
                        <span v-if="errorsStep2.monthlyRevenue" class="text-red-500 text-sm">
                            {{ errorsStep2.monthlyRevenue }}
                        </span>
                    </UFormGroup>

                    <!-- 主要需求：多选 -->
                    <UFormGroup name="primaryInterest" required class="mb-6">
                        <label class="block mb-2 text-sm font-medium text-gray-700">
                            What's your primarily looking for at inCustom?
                        </label>

                        <USelectMenu v-model="formStep2.primaryInterest" size="lg" :options="lookingForOptions" multiple
                            placeholder="Select your main interests" :ui="{
                                base: 'dark:!bg-white dark:!text-gray-900',
                                color: { white: { outline: 'bg-[#F7F8FB] ring-0 focus:ring-0' } }
                            }">
                            <!-- label 显示逻辑 -->
                            <template #label>
                                <span v-if="formStep2.primaryInterest.length === 0" class="text-gray-400">
                                    Select your main interests
                                </span>

                                <span v-else>
                                    {{
                                        formStep2.primaryInterest.map(item => item.label).join(', ')
                                    }}
                                </span>
                            </template>

                        </USelectMenu>

                        <span v-if="errorsStep2.primaryInterest" class="text-red-500 text-sm">
                            {{ errorsStep2.primaryInterest }}
                        </span>
                    </UFormGroup>



                    <div class="text-center">
                        <UButton type="submit" size="lg" :ui="{ rounded: 'rounded-md' }"
                            class="text-white w-full mt-4 block text-center">
                            Submit & Get Started Business

                        </UButton>
                        <div @click="goToStep1" variant="secondary"
                            class="text-primary cursor-pointer underline hover:text-primary-600 transition-colors whitespace-nowrap text-sm font-normal px-1 py-2">
                            Return to previous step
                        </div>
                    </div>
                </UForm>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
const { register, sendUserRegisterEmail, createBSideWithLogin, googleRegister, facebookRegister, checkCreateUserCodeByEmail } = useAuth();
const { listOnlineMallProductCatalogTree } = ProductAuth();
import { message } from 'ant-design-vue';
const { $showLoading, $hideLoading } = useNuxtApp();
const route = useRoute();

definePageMeta({
    layout: 'blank',
    name: 'registerbusiness',
    title: 'registerbusiness',
    description: 'INcustom Register'
});

// 步骤控制（默认第一步，支持地址栏参数step=2）
const currentStep = ref(1);
const showPassword = ref(false);
const isSending = ref(false);
const countdown = ref(0);
const isStep2Authorized = ref(false); // 标记第二步是否已授权访问

// 国家区号数据
const countryCodes = [
    { value: '+1', label: '+1' },
    { value: '+44', label: '+44' },
    { value: '+93', label: '+93' },
    { value: '+355', label: '+355' },
    { value: '+213', label: '+213' },
    { value: '+1684', label: '+1684' },
    { value: '+376', label: '+376' },
    { value: '+244', label: '+244' },
    { value: '+1264', label: '+1264' },
    { value: '+1268', label: '+1268' },
    { value: '+54', label: '+54' },
    { value: '+374', label: '+374' },
    { value: '+297', label: '+297' },
    { value: '+61', label: '+61' },
    { value: '+43', label: '+43' },
    { value: '+994', label: '+994' },
    { value: '+1242', label: '+1242' },
    { value: '+973', label: '+973' },
    { value: '+880', label: '+880' },
    { value: '+1246', label: '+1246' },
    { value: '+375', label: '+375' },
    { value: '+32', label: '+32' },
    { value: '+501', label: '+501' },
    { value: '+229', label: '+229' },
    { value: '+1441', label: '+1441' },
    { value: '+975', label: '+975' },
    { value: '+591', label: '+591' },
    { value: '+387', label: '+387' },
    { value: '+267', label: '+267' },
    { value: '+55', label: '+55' },
    { value: '+246', label: '+246' },
    { value: '+1284', label: '+1284' },
    { value: '+673', label: '+673' },
    { value: '+359', label: '+359' },
    { value: '+226', label: '+226' },
    { value: '+257', label: '+257' },
    { value: '+855', label: '+855' },
    { value: '+237', label: '+237' },
    { value: '+238', label: '+238' },
    { value: '+599', label: '+599' },
    { value: '+1345', label: '+1345' },
    { value: '+236', label: '+236' },
    { value: '+235', label: '+235' },
    { value: '+56', label: '+56' },
    { value: '+86', label: '+86' },
    { value: '+57', label: '+57' },
    { value: '+269', label: '+269' },
    { value: '+243', label: '+243' },
    { value: '+242', label: '+242' },
    { value: '+682', label: '+682' },
    { value: '+506', label: '+506' },
    { value: '+225', label: '+225' },
    { value: '+385', label: '+385' },
    { value: '+53', label: '+53' },
    { value: '+599', label: '+599' },
    { value: '+357', label: '+357' },
    { value: '+420', label: '+420' },
    { value: '+45', label: '+45' },
    { value: '+253', label: '+253' },
    { value: '+1767', label: '+1767' },
    { value: '+593', label: '+593' },
    { value: '+20', label: '+20' },
    { value: '+503', label: '+503' },
    { value: '+240', label: '+240' },
    { value: '+291', label: '+291' },
    { value: '+372', label: '+372' },
    { value: '+251', label: '+251' },
    { value: '+500', label: '+500' },
    { value: '+298', label: '+298' },
    { value: '+679', label: '+679' },
    { value: '+358', label: '+358' },
    { value: '+33', label: '+33' },
    { value: '+594', label: '+594' },
    { value: '+689', label: '+689' },
    { value: '+241', label: '+241' },
    { value: '+220', label: '+220' },
    { value: '+995', label: '+995' },
    { value: '+49', label: '+49' },
    { value: '+233', label: '+233' },
    { value: '+350', label: '+350' },
    { value: '+30', label: '+30' },
    { value: '+299', label: '+299' },
    { value: '+1473', label: '+1473' },
    { value: '+590', label: '+590' },
    { value: '+1671', label: '+1671' },
    { value: '+502', label: '+502' },
    { value: '+44', label: '+44' },
    { value: '+224', label: '+224' },
    { value: '+245', label: '+245' },
    { value: '+592', label: '+592' },
    { value: '+509', label: '+509' },
    { value: '+504', label: '+504' },
    { value: '+852', label: '+852' },
    { value: '+36', label: '+36' },
    { value: '+354', label: '+354' },
    { value: '+91', label: '+91' },
    { value: '+62', label: '+62' },
    { value: '+98', label: '+98' },
    { value: '+964', label: '+964' },
    { value: '+353', label: '+353' },
    { value: '+972', label: '+972' },
    { value: '+39', label: '+39' },
    { value: '+1876', label: '+1876' },
    { value: '+81', label: '+81' },
    { value: '+962', label: '+962' },
    { value: '+7', label: '+7' },
    { value: '+254', label: '+254' },
    { value: '+686', label: '+686' },
    { value: '+383', label: '+383' },
    { value: '+965', label: '+965' },
    { value: '+996', label: '+996' },
    { value: '+856', label: '+856' },
    { value: '+371', label: '+371' },
    { value: '+961', label: '+961' },
    { value: '+266', label: '+266' },
    { value: '+231', label: '+231' },
    { value: '+218', label: '+218' },
    { value: '+423', label: '+423' },
    { value: '+370', label: '+370' },
    { value: '+352', label: '+352' },
    { value: '+853', label: '+853' },
    { value: '+389', label: '+389' },
    { value: '+261', label: '+261' },
    { value: '+265', label: '+265' },
    { value: '+60', label: '+60' },
    { value: '+960', label: '+960' },
    { value: '+223', label: '+223' },
    { value: '+356', label: '+356' },
    { value: '+692', label: '+692' },
    { value: '+596', label: '+596' },
    { value: '+222', label: '+222' },
    { value: '+230', label: '+230' },
    { value: '+262', label: '+262' },
    { value: '+52', label: '+52' },
    { value: '+691', label: '+691' },
    { value: '+373', label: '+373' },
    { value: '+377', label: '+377' },
    { value: '+976', label: '+976' },
    { value: '+382', label: '+382' },
    { value: '+1664', label: '+1664' },
    { value: '+212', label: '+212' },
    { value: '+258', label: '+258' },
    { value: '+95', label: '+95' },
    { value: '+264', label: '+264' },
    { value: '+674', label: '+674' },
    { value: '+977', label: '+977' },
    { value: '+31', label: '+31' },
    { value: '+687', label: '+687' },
    { value: '+64', label: '+64' },
    { value: '+505', label: '+505' },
    { value: '+227', label: '+227' },
    { value: '+234', label: '+234' },
    { value: '+683', label: '+683' },
    { value: '+672', label: '+672' },
    { value: '+850', label: '+850' },
    { value: '+1670', label: '+1670' },
    { value: '+47', label: '+47' },
    { value: '+968', label: '+968' },
    { value: '+92', label: '+92' },
    { value: '+680', label: '+680' },
    { value: '+970', label: '+970' },
    { value: '+507', label: '+507' },
    { value: '+675', label: '+675' },
    { value: '+595', label: '+595' },
    { value: '+51', label: '+51' },
    { value: '+63', label: '+63' },
    { value: '+48', label: '+48' },
    { value: '+351', label: '+351' },
    { value: '+974', label: '+974' },
    { value: '+262', label: '+262' },
    { value: '+40', label: '+40' },
    { value: '+7', label: '+7' },
    { value: '+250', label: '+250' },
    { value: '+590', label: '+590' },
    { value: '+290', label: '+290' },
    { value: '+1869', label: '+1869' },
    { value: '+1758', label: '+1758' },
    { value: '+508', label: '+508' },
    { value: '+1784', label: '+1784' },
    { value: '+685', label: '+685' },
    { value: '+378', label: '+378' },
    { value: '+239', label: '+239' },
    { value: '+966', label: '+966' },
    { value: '+221', label: '+221' },
    { value: '+381', label: '+381' },
    { value: '+248', label: '+248' },
    { value: '+232', label: '+232' },
    { value: '+65', label: '+65' },
    { value: '+1721', label: '+1721' },
    { value: '+421', label: '+421' },
    { value: '+386', label: '+386' },
    { value: '+677', label: '+677' },
    { value: '+252', label: '+252' },
    { value: '+27', label: '+27' },
    { value: '+82', label: '+82' },
    { value: '+211', label: '+211' },
    { value: '+34', label: '+34' },
    { value: '+94', label: '+94' },
    { value: '+249', label: '+249' },
    { value: '+597', label: '+597' },
    { value: '+268', label: '+268' },
    { value: '+46', label: '+46' },
    { value: '+41', label: '+41' },
    { value: '+963', label: '+963' },
    { value: '+886', label: '+886' },
    { value: '+992', label: '+992' },
    { value: '+255', label: '+255' },
    { value: '+66', label: '+66' },
    { value: '+670', label: '+670' },
    { value: '+228', label: '+228' },
    { value: '+690', label: '+690' },
    { value: '+676', label: '+676' },
    { value: '+1868', label: '+1868' },
    { value: '+216', label: '+216' },
    { value: '+90', label: '+90' },
    { value: '+993', label: '+993' },
    { value: '+1649', label: '+1649' },
    { value: '+688', label: '+688' },
    { value: '+1340', label: '+1340' },
    { value: '+256', label: '+256' },
    { value: '+380', label: '+380' },
    { value: '+971', label: '+971' },
    { value: '+598', label: '+598' },
    { value: '+998', label: '+998' },
    { value: '+678', label: '+678' },
    { value: '+58', label: '+58' },
    { value: '+84', label: '+84' },
    { value: '+681', label: '+681' },
    { value: '+212', label: '+212' },
    { value: '+967', label: '+967' },
    { value: '+260', label: '+260' },
    { value: '+263', label: '+263' },
    { value: '+358', label: '+358' },
];

// 月收入选项
const revenueOptions = [
    { label: 'Under $5,000', value: 5 },
    { label: '$5,000 - $10,000', value: 10 },
    { label: '$10,001 - $25,000', value: 15 },
    { label: '$25,001 - $50,000', value: 20 },
    { label: '$50,001 - $100,000', value: 25 },
    { label: '$100,001 - $250,000', value: 30 },
    { label: '$250,001 - $500,000', value: 35 },
    { label: 'Over $500,000', value: 40 }
];
const channelsOptions = [
    { label: 'Online (like Shopify, TikTok)', value: '1' },
    { label: 'Brick & Mortar and Offline Traffic', value: '2' }
];
const lookingForOptions = [
    { label: 'Dropshipping', value: 1 },
    { label: 'Wholesale', value: 5 }
];
const contactTypeOptions = [
    { label: 'Phone Number', value: 3 },
    { label: 'WhatsApp', value: 2 },
    { label: 'Facebook', value: 1 }
];

// 第一步表单状态
const formStep1 = reactive({
    email: '',
    verificationCode: '',
    password: '',
    isChecked: false
});

// 第一步错误状态
const errorsStep1 = reactive({
    email: '',
    verificationCode: '',
    password: '',
    agreement: ''
});

// 第二步表单状态
const formStep2 = reactive({
    firstName: '',
    lastName: '',
    contactMethod: '3', // 默认电话（枚举值3）
    countryCode: '+1', // 默认波兰区号
    phoneNumber: '',
    whatsappNumber: '',
    facebookUrl: '',
    productCategory: [], // 多选，默认为空数组
    salesChannels: '1', // 默认线上，使用枚举值1
    storeUrl: '',
    monthlyRevenue: '5', // 默认低于5k
    primaryInterest: [] // 多选
});

// 第二步错误状态
const errorsStep2 = reactive({
    firstName: '',
    lastName: '',
    contactMethod: '',
    phoneNumber: '',
    whatsappNumber: '',
    facebookUrl: '',
    productCategory: '',
    salesChannels: '',
    storeUrl: '',
    monthlyRevenue: '',
    primaryInterest: ''
});

// 产品分类选项
const categoryOptions = ref([]);

// 密码正则：6-20位，允许数字、字母、特殊符号，不允许空格
const passwordRegex = /^(?!.*\s)(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,20}$/;

// 第二步：当前联系字段名称
const contactFieldName = computed(() => {
    switch (formStep2.contactMethod) {
        case 3:
            return 'phoneNumber';
        case 2:
            return 'whatsappNumber';
        case 1:
            return 'facebookUrl';
        default:
            return '';
    }
});

// 处理地址栏step参数
const handleStepParamChange = step => {
    if (step === '2') {
        currentStep.value = 2;
    } else {
        // 无step参数或参数无效，显示第一步
        currentStep.value = 1;
    }
};

// 第二步：联系字段占位符
const getContactPlaceholder = computed(() => {
    return formStep2.contactMethod === 'phone' ? 'Phone Number' : 'WhatsApp Number';
});
const step = route.query.step;
const type = route.query.type;
const code = route.query.code;
const state = route.query.state;
if (step) {
    console.log(step);
    handleStepParamChange(step);
}
const socialLogin = (provider) => {

    if ('google' == provider) {
        window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=894615293806-08cs1bithgteb9acpa6v471ru0n2lrqk.apps.googleusercontent.com&redirect_uri=https://www.incustom.com/googleauthorize&response_type=code&scope=openid%20email%20profile&state=B'
    }
    if ('facebook' == provider) {
        window.location.href = 'https://www.facebook.com/v23.0/dialog/oauth?client_id=946458614020677&redirect_uri=https://www.incustom.com/facebookauthorize&state=B&scope=public_profile%20email'
    }
    if ('apple' == provider) {
        message.warning('Not supported yet')
    }
    // 这里可以添加实际的社交登录逻辑
};
// 检查用户授权状态（可选：根据实际业务逻辑实现）
const checkAuthStatus = async () => {
    try {
        return true;
    } catch (error) {
        return false;
    }
};

// 切换密码显示
const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

// 第一步：字段验证
const validateStep1Field = fieldName => {
    switch (fieldName) {
        case 'email':
            const emailTrimmed = formStep1.email.trim();
            if (!emailTrimmed) {
                errorsStep1.email = 'Email is required';
            } else if (
                !/^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed)
            ) {
                errorsStep1.email = 'Invalid email format';
            } else {
                errorsStep1.email = '';
            }
            break;

        case 'verificationCode':
            const codeTrimmed = formStep1.verificationCode.trim();
            if (!codeTrimmed) {
                errorsStep1.verificationCode = 'Verification code is required';
            } else if (codeTrimmed.length < 6 || isNaN(Number(codeTrimmed))) {
                errorsStep1.verificationCode = 'Verification code must be 6 digits';
            } else {
                errorsStep1.verificationCode = '';
            }
            break;

        case 'password':
            const pwdTrimmed = formStep1.password.trim();
            if (!pwdTrimmed) {
                errorsStep1.password = 'Password is required';
            } else if (!passwordRegex.test(pwdTrimmed)) {
                errorsStep1.password =
                    'Password must be 6-20 characters and include numbers, letters, and special symbols (no spaces)';
            } else {
                errorsStep1.password = '';
            }
            break;

        case 'agreement':
            errorsStep1.agreement = formStep1.isChecked
                ? ''
                : 'You must agree to the Terms and Privacy Policy';
            break;
    }
};

// 第一步：发送验证码
const sendVerificationCode = async () => {
    validateStep1Field('email');
    if (errorsStep1.email) {
        message.warning(errorsStep1.email);
        return;
    }
    try {
        isSending.value = true;
        await sendUserRegisterEmail(formStep1.email);
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
        message.error(error.message || 'Failed to send verification code, please try again');
    } finally {
        isSending.value = false;
    }
};

// 保存第一步接口返回的 code 和 userId
const step1Result = ref({ code: '', userId: '' });

// 第一步提交后保存返回值
const handleStep1Submit = async () => {
    // 验证所有字段
    validateStep1Field('email');
    validateStep1Field('verificationCode');
    validateStep1Field('password');
    validateStep1Field('agreement');

    if (Object.values(errorsStep1).some(error => error)) {
        // 获取第一个有内容的错误
        const firstError = Object.values(errorsStep1).find(e => e);
        message.warning(firstError || 'Please check the form for errors');
        return;
    }

    try {
        $showLoading();
        let res = await checkCreateUserCodeByEmail(formStep1.email, formStep1.verificationCode);
        isStep2Authorized.value = true; // 标记为已授权
        currentStep.value = 2; // 进入第二步

        // 可选：更新地址栏参数为step=2（保持URL同步）
        navigateTo(
            {
                path: '/registerbusiness',
                query: { step: 2 }
            },
            { replace: true }
        );
    } catch (error) {
        console.error('Registration failed:', error);
        const errormsg = JSON.parse(error.message || '{}');
        if (errormsg.errorKey === 'email') {
            errorsStep1.email = errormsg.enDesc || 'Email already exists';
        } else if (errormsg.errorKey === 'verificationCode') {
            errorsStep1.verificationCode =
                errormsg.enDesc || 'Invalid or expired verification code';
        } else if (errormsg.errorKey === 'password') {
            errorsStep1.password = errormsg.enDesc || 'Invalid password format';
        } else {
            message.error(errormsg.enDesc || 'Registration failed, please try again');
        }
    } finally {
        $hideLoading();
    }
};

// 第二步：加载产品分类
const loadCategories = async () => {
    try {
        $showLoading();
        const res = await listOnlineMallProductCatalogTree();
        const cate = res.treeList || [];
        console.log('Product categories loaded:', cate);
        categoryOptions.value = cate.map(item => ({
            value: item.id,
            label: item.catalogEnName
        }));
    } catch (error) {
        console.error('Failed to load categories:', error);
        message.error('Failed to load product categories, please try again');
    } finally {
        $hideLoading();
    }
};

// 第二步：联系方式变更处理
const handleContactMethodChange = () => {
    // 清除之前的验证错误
    Object.keys(errorsStep2).forEach(key => {
        if (key.includes('phone') || key.includes('whatsapp') || key.includes('facebook')) {
            errorsStep2[key] = '';
        }
    });
    // 切换时清空对应输入框内容
    formStep2.phoneNumber = '';
    formStep2.whatsappNumber = '';
    formStep2.facebookUrl = '';
};

// 第二步：销售渠道变更处理
const handleSalesChannelChange = () => {
    errorsStep2.storeUrl = '';
};

// 第二步：字段验证
const validateStep2Field = fieldName => {
    switch (fieldName) {
        case 'firstName':
            errorsStep2.firstName = formStep2.firstName.trim()
                ? ''
                : 'First name is required';
            break;

        case 'lastName':
            errorsStep2.lastName = formStep2.lastName.trim()
                ? ''
                : 'Last name is required';
            break;

        case 'phoneNumber':
        case 'whatsappNumber':
            const phoneRegex = /^[0-9]{7,15}$/; // 7-15位数字
            errorsStep2[fieldName] = phoneRegex.test(formStep2[fieldName].trim())
                ? ''
                : 'Please enter a valid phone number (7-15 digits)';
            break;

        case 'productCategory':
            errorsStep2.productCategory =
                Array.isArray(formStep2.productCategory) && formStep2.productCategory.length > 0
                    ? ''
                    : 'Please select at least one category';
            break;

        case 'storeUrl':
            if (formStep2.salesChannels === '1') {
                const urlRegex2 =
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/;
                errorsStep2.storeUrl = urlRegex2.test(formStep2.storeUrl.trim())
                    ? ''
                    : 'Please enter a valid URL';
            }
            break;

        case 'monthlyRevenue':
            errorsStep2.monthlyRevenue = formStep2.monthlyRevenue
                ? ''
                : 'Please select monthly revenue';
            break;

        case 'primaryInterest':
            errorsStep2.primaryInterest =
                formStep2.primaryInterest.length > 0
                    ? ''
                    : 'Please select at least one option';
            break;
    }
};

// 第二步：全表单验证
const validateStep2Form = () => {
    const fields = [
        'firstName',
        'lastName',
        contactFieldName.value,
        'productCategory',
        'salesChannels',
        'monthlyRevenue',
        'primaryInterest'
    ];

    fields.forEach(field => validateStep2Field(field));

    if (formStep2.salesChannels === '1') {
        validateStep2Field('storeUrl');
    }

    return Object.values(errorsStep2).every(error => !error);
};

// 二步注册 payload 组装
const buildStep2Payload = () => {
    let contactValue = '';
    if (formStep2.contactMethod == 3) {
        contactValue = formStep2.phoneNumber.trim();
    } else if (formStep2.contactMethod == 2) {
        contactValue = formStep2.whatsappNumber.trim();
    } else if (formStep2.contactMethod == 1) {
        contactValue = formStep2.facebookUrl.trim();
    }
    let newcode = formStep1.verificationCode;
    if (type === 'google' || type === 'facebook') {
        newcode = code;
    }
    return {
        code: newcode,
        state: 'B',
        user: {
            email: formStep1.email.trim(),
            password: formStep1.password.trim()
        },
        userRegisterShopInfo: {
            businessRequirementList: formStep2.primaryInterest.map(i => i.value),
            contactAreaCode: formStep2.countryCode,
            contactType: Number(formStep2.contactMethod),
            contactValue,
            firstName: formStep2.firstName.trim(),
            lastName: formStep2.lastName.trim(),
            monthlyRevenue: Number(formStep2.monthlyRevenue),
            sellCatalogIdList: Array.isArray(formStep2.productCategory)
                ? formStep2.productCategory.map(i => typeof i === 'object' ? i.value : i)
                : [],
            sellChannelList: formStep2.salesChannels ? [Number(formStep2.salesChannels)] : [],
            websiteUrl: formStep2.storeUrl ? formStep2.storeUrl.trim() : ''
        }
    };
};

// 第二步：提交（完成注册）
const handleStep2Submit = async () => {
    if (!validateStep2Form()) {
        // 获取第一个有内容的错误
        const firstError = Object.values(errorsStep2).find(e => e);
        message.warning(firstError || 'Please check the form for errors');
        return;
    }
    try {
        $showLoading();
        // 构建完整提交数据
        const payload = buildStep2Payload();
        // 这里替换为最终注册提交API
        console.log('Final registration data:', payload);
        let registerfunction = createBSideWithLogin;
        if (type === 'google') {
            registerfunction = googleRegister;
        } else if (type === 'facebook') {
            registerfunction = facebookRegister;
        }
        await registerfunction(payload);
        message.success('Registration completed successfully!');
        navigateTo('/'); // 跳转到后台首页
    } catch (error) {
        let errormsg = JSON.parse(error.message)
        message.error(errormsg.enDesc || 'Registration failed, please try again')
    } finally {
        $hideLoading();
    }
};

// 步骤切换
const goToStep1 = () => {
    currentStep.value = 1;
    // 更新地址栏，移除step参数
    // navigateTo({ path: '/registerbusiness' }, { replace: true });
};

// 页面加载时预加载分类（第二步需要）
onMounted(() => {
    console.log('Mounted: loading categories');
    loadCategories();
});
</script>

<style scoped>
.right-container {
    margin: 0 auto;
}

/* 灰背景兼容 */
:deep(.bg-gray-100) {
    background-color: #f1f1f1 !important;
}

/* placeholder 颜色 */
:deep(input::placeholder) {
    color: #b3b3b3 !important;
}

/* 表单 group 内的 input 包裹 */
:deep(.u-form-group .u-input-wrapper) {
    flex: 1;
    min-width: 0;
}

/* 输入框与下拉统一高度/背景 */
:deep(.u-input),
:deep(.u-select) {
    height: 50px !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    background-color: #f7f8fb !important;
    border: none !important;
    font-size: 15px !important;
}

/* 让 Nuxt UI 的 formGroup 宽度 100% 且间距一致 */
:deep(.u-form-group) {
    width: 100%;
    margin-bottom: 20px !important;
}

/* 单选框/复选框样式优化 */
:deep(label.inline-flex) {
    align-items: center;
    gap: 8px;
}

/* checked 时的外圈高亮 */
:deep(.peer:checked ~ .w-5.h-5) {
    box-shadow: 0 0 0 2px rgba(0, 178, 227, 0.2);
}

/* 步骤指示器动画 */
:deep(.transition-all) {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}


/* 响应式调整 */
@media (max-width: 640px) {
    .grid-cols-1.md\:grid-cols-2 {
        grid-template-columns: 1fr;
    }

    .hidden.sm\:flex {
        display: none !important;
    }

    .grid-cols-1.md\:grid-cols-2.gap-4 {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .right-container {
        padding-top: 24px;
    }
}

/* 为Facebook按钮添加样式 */
:deep(.social-login-button) {
    white-space: nowrap;
    /* 防止换行 */
    width: auto;
    /* 根据内容自动调整宽度 */
    display: flex;
    align-items: center;
    justify-content: center;
    /* 确保文本和图标居中 */
    gap: 10px;
    /* 适当增加图标和文本之间的间隔 */
}
</style>
