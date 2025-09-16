<template>
    <div class="min-h-screen bg-[#F8F8F8]">
        <div class="max-w-7xl mx-auto px-3 py-3 md:py-8">
            <div class="mb-6 md:mb-8">
                <NuxtLink to="/">
                    <NuxtImg class="h-7 md:h-11" src="/images/incustom3.png" />
                </NuxtLink>
            </div>

            <div class="rounded shadow-sm">
                <div class="flex flex-col lg:flex-row gap-4 items-stretch">
                    <!-- Left: Main -->
                    <div class="flex-1">
                        <main class="flex-1">
                            <!-- 加载完成 -->
                            <template v-if="isProductLoaded">
                                <!-- 有商品 -->
                                <template v-if="hasItems">
                                    <!-- Contact Email -->
                                    <section class="rounded bg-white">
                                        <div
                                            class="p-4 pb-[10px] text-customblack font-semibold text-base sm:text-lg flex items-center justify-between">
                                            <span>Contact Email</span>
                                            <button v-if="!isLoggedIn" class="text-sm text-customblack"
                                                @click="showSignIn = true">
                                                I have an account to
                                                <span class="text-primary ml-1">Sign In</span>
                                            </button>
                                        </div>
                                        <div class="p-4 pt-0">
                                            <Form layout="vertical" ref="formRef" :model="form" class="max-w-[980px]">
                                                <div class="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-4">
                                                    <FormItem label="Email :" class="!mb-0">
                                                        <template #label>
                                                            <span class="flex items-center">
                                                                Email
                                                                <Tooltip
                                                                    title="We will send a message to this email address when there is new progress on the order"
                                                                    color="white"
                                                                    :overlayInnerStyle="{ color: '#333', maxWidth: '300px', whiteSpace: 'pre-line' }">
                                                                    <img src="/question.png"
                                                                        class="w-4 h-4 ml-1 cursor-pointer" />
                                                                </Tooltip>
                                                            </span>
                                                        </template>
                                                        <Input v-model:value="contactEmail"
                                                            placeholder="Contact Email" />
                                                    </FormItem>
                                                </div>
                                            </Form>
                                        </div>
                                    </section>

                                    <!-- Address (No saved) -->
                                    <section class="rounded bg-white mt-4" v-if="addressarr.length == 0">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">
                                            Delivery Address
                                        </div>
                                        <div>
                                            <div class="bg-white px-4 py-4 pt-[10px] rounded address-form">
                                                <ClientOnly>
                                                    <Form layout="vertical" ref="formRef" :model="form"
                                                        class="max-w-[980px]">
                                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                                                            <FormItem label="First Name :" required>
                                                                <Input v-model:value="form.firstName"
                                                                    placeholder="First Name" />
                                                            </FormItem>
                                                            <FormItem label="Last Name :">
                                                                <Input v-model:value="form.lastName"
                                                                    placeholder="Last Name" />
                                                            </FormItem>
                                                        </div>

                                                        <FormItem label="Adress :" required>
                                                            <Input v-model:value="form.address" placeholder="Adress" />
                                                        </FormItem>

                                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                                                            <FormItem label="Country/Region：" name="country" required>
                                                                <Select v-model:value="form.country" show-search
                                                                    allowClear placeholder="country"
                                                                    :options="countryarr.map(c => ({ label: c.countryName, value: c.countryCode }))"
                                                                    :filter-option="filterOptionByLabel" />
                                                            </FormItem>

                                                            <FormItem label="State/Province :" name="province" required>
                                                                <Select v-model:value="form.province" show-search
                                                                    allowClear placeholder="State/Province"
                                                                    :options="provincearr.map(p => ({ label: p.regionName, value: p.regionName }))"
                                                                    :filter-option="filterOptionByLabel" />
                                                            </FormItem>
                                                        </div>

                                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                                                            <FormItem label="City :" name="city" required>
                                                                <AutoComplete class="text-sm" v-model:value="form.city"
                                                                    allowClear placeholder="City"
                                                                    :options="cityarr.map(c => ({ label: c.cityName, value: c.cityName }))"
                                                                    :filter-option="filterOptionByLabel" />
                                                            </FormItem>
                                                            <FormItem label="Zip Code :" required>
                                                                <Input v-model:value="form.postalCode"
                                                                    placeholder="Zip Code" />
                                                            </FormItem>
                                                        </div>

                                                        <FormItem label="Number :" required>
                                                            <div class="flex gap-2">
                                                                <Select v-model:value="form.numberCode" class="!w-24"
                                                                    show-search
                                                                    :options="countries.map(code => ({ label: code, value: code }))" />
                                                                <Input v-model:value="form.number" class="flex-1"
                                                                    placeholder="Number" />
                                                            </div>
                                                        </FormItem>

                                                        <FormItem v-if="isLoggedIn" class="!mb-0">
                                                            <Checkbox v-model:checked="form.master">Set as default
                                                                address</Checkbox>
                                                        </FormItem>
                                                    </Form>
                                                </ClientOnly>
                                            </div>
                                        </div>
                                    </section>

                                    <!-- Address (Has saved) -->
                                    <section class="rounded bg-white mt-4" v-if="addressarr.length > 0">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">
                                            Delivery address
                                        </div>
                                        <div class="flex flex-col md:flex-row justify-between p-4 pt-[10px] gap-3">
                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 flex-1">
                                                <div>
                                                    <span class="text-blackcolor/50 text-sm mb-1 block">Full name</span>
                                                    <div class="font-medium text-sm dark:text-customblack">
                                                        {{ addressinfo.firstName }} {{ addressinfo.lastName }}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span class="text-blackcolor/50 text-sm mb-1 block">Number</span>
                                                    <div class="font-medium text-sm dark:text-customblack">
                                                        ({{ addressinfo.numberCode }}) {{ addressinfo.number }}
                                                    </div>
                                                </div>
                                                <div class="col-span-2">
                                                    <span class="text-blackcolor/50 text-sm mb-1 block">Address
                                                        detail</span>
                                                    <div class="font-medium text-sm dark:text-customblack">
                                                        {{ addressinfo.countryName }} {{ addressinfo.provinceName }} {{
                                                            addressinfo.city }}
                                                        {{ addressinfo.address }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-show="from != 'order'"
                                                class="flex flex-col min-w-[150px] text-right">
                                                <div class="text-primary cursor-pointer text-sm"
                                                    @click="changeaddress()">Change another address</div>
                                                <div class="text-primary cursor-pointer text-sm mt-4"
                                                    @click="addnewaddress()">Edit address</div>
                                            </div>
                                        </div>
                                    </section>

                                    <!-- Shipping -->
                                    <section class="rounded bg-white mt-4">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">
                                            Shipping Methods <span style="color: red;">*</span>
                                        </div>
                                        <div class="p-4 pt-[10px]">
                                            <USelectMenu v-model="templateid" :options="templates"
                                                option-attribute="label" value-attribute="feeId"
                                                :disabled="from == 'order' || templateid == '-1'"
                                                :ui="{ rounded: 'rounded', }" :uiMenu="{
                                                    background: 'dark:bg-white',
                                                    option: {
                                                        color: 'dark:text-primary',
                                                        base: 'px-2 py-2 dark:text-primary',
                                                        active: 'text-primary dark:text-primary bg-[#00B2E30A] dark:bg-[#00B2E30A]',
                                                        selected: 'text-primary dark:text-primary font-medium',
                                                        disabled: 'opacity-50 cursor-not-allowed'
                                                    }
                                                }">
                                                <template #default="{ open }">
                                                    <UButton size="lg" color="white" variant="outline"
                                                        class="w-full justify-between h-10 rounded-md ring-0 border border-[rgba(46,46,12,0.2014)]"
                                                        :class="{ 'ring-0': open }">
                                                        <span
                                                            class="text-xs sm:text-sm text-left truncate dark:text-customblack"
                                                            title="{{ templates.find(item => item.feeId === templateid)?.label || 'Select Shipping Method' }}">
                                                            {{templates.find(item => item.feeId === templateid)?.label
                                                                || 'Select Shipping Method'}}
                                                        </span>

                                                        <BaseIcon name="i-heroicons-chevron-down" />
                                                    </UButton>
                                                </template>
                                            </USelectMenu>
                                        </div>
                                    </section>

                                    <!-- Payment -->
                                    <section class="rounded bg-white mt-4">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">
                                            Payment Methods <span style="color: red;">*</span>
                                        </div>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 p-4 pt-[10px]">
                                            <div v-for="option in options" :key="option.value"
                                                class="flex items-center space-x-4 p-2 rounded-md"
                                                :class="selected === option.value ? 'border border-primary' : 'border border-transparent'">
                                                <input type="radio" :value="option.value" v-model="selected"
                                                    class="form-radio" />
                                                <label class="flex items-center space-x-2 cursor-pointer">
                                                    <img :src="option.icon" class="h-8 sm:h-[50px]" />
                                                </label>
                                            </div>
                                        </div>
                                    </section>

                                    <!-- Notes -->
                                    <section class="rounded bg-white mt-4">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">Notes
                                        </div>
                                        <div class="p-4 pt-[10px]">
                                            <UTextarea v-model="notes" placeholder="Enter you order notes" :ui="{
                                                color: {
                                                    white: {
                                                        outline:
                                                            'shadow-sm dark:bg-white dark:ring-[rgba(0,0,0,0.15)] dark:text-gray-900 bg-white placeholder-[#EAEAEA] focus:ring-1 focus:ring-primary text-gray-900 ring-1 ring-inset ring-[rgba(0,0,0,0.15)]'
                                                    }
                                                }
                                            }" />
                                        </div>
                                    </section>
                                </template>

                                <!-- 无商品空态 -->
                                <template v-else>
                                    <section class="rounded bg-white">
                                        <div class="p-8 flex flex-col items-center justify-center text-center">
                                            <div class="mt-4 text-lg font-semibold text-customblack">Your cart is empty
                                            </div>
                                            <p class="mt-1 text-gray-500 text-sm">Add items to checkout and complete
                                                your order.</p>
                                            <NuxtLink to="/" class="mt-6 inline-flex">
                                                <UButton size="lg"
                                                    class="rounded bg-primary hover:bg-[#00a9d8] text-white px-6"> Go
                                                    shopping </UButton>
                                            </NuxtLink>
                                        </div>
                                    </section>
                                </template>
                            </template>

                            <!-- 骨架屏：加载中 -->
                            <template v-else>
                                <section class="rounded bg-white p-4">
                                    <div class="flex items-center justify-between">
                                        <USkeleton class="h-6 w-40" />
                                        <USkeleton class="h-5 w-28" />
                                    </div>
                                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <USkeleton class="h-10 w-full" />
                                    </div>
                                </section>

                                <section class="rounded bg-white mt-4 p-4">
                                    <USkeleton class="h-6 w-48" />
                                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <USkeleton class="h-10 w-full" />
                                        <USkeleton class="h-10 w-full" />
                                    </div>
                                    <USkeleton class="h-10 w-full mt-4" />
                                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <USkeleton class="h-10 w-full" />
                                        <USkeleton class="h-10 w-full" />
                                    </div>
                                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <USkeleton class="h-10 w-full" />
                                        <USkeleton class="h-10 w-full" />
                                    </div>
                                    <USkeleton class="h-5 w-44 mt-4" />
                                </section>

                                <section class="rounded bg-white mt-4 p-4">
                                    <USkeleton class="h-6 w-48" />
                                    <USkeleton class="h-10 w-full mt-4" />
                                </section>

                                <section class="rounded bg-white mt-4 p-4">
                                    <USkeleton class="h-6 w-48" />
                                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
                                        <USkeleton class="h-12 w-full" />
                                        <USkeleton class="h-12 w-full" />
                                        <USkeleton class="h-12 w-full" />
                                    </div>
                                </section>

                                <section class="rounded bg-white mt-4 p-4">
                                    <USkeleton class="h-6 w-48" />
                                    <USkeleton class="h-24 w-full mt-4" />
                                </section>
                            </template>
                        </main>
                    </div>

                    <!-- Right: Summary -->
                    <div class="lg:w-80 bg-white rounded shadow-sm min-h-[200px]">
                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">Order Summary</div>

                        <!-- 加载完成 -->
                        <template v-if="isProductLoaded">
                            <!-- 有商品 -->
                            <template v-if="hasItems">
                                <div class="p-4">
                                    <div class="flex justify-between font-medium">
                                        <span class="text-gray-600 text-sm">Selected {{ selectedQuantity }} items</span>
                                        <span class="text-primary">${{ selectedTotal.toFixed(2) }}</span>
                                    </div>

                                    <div class="max-h-96 overflow-y-auto">
                                        <div class="flex items-center space-x-4 bg-white rounded-md shadow-sm py-4"
                                            v-for="item in productlists" :key="item.productSku">
                                            <img :src="item.mainPic" alt="Product Image"
                                                class="w-20 h-20 rounded-md object-cover" />
                                            <div class="flex flex-col justify-between">
                                                <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                    :title="item.productName"
                                                    :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                    <div
                                                        class="font-semibold text-sm text-blackcolor truncate-1-lines max-w-52">
                                                        {{ item.productName }}
                                                    </div>
                                                </Tooltip>
                                                <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                    :title="item.specAttr"
                                                    :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                    <div class="text-gray-300 text-sm my-2 truncate-1-lines max-w-52">
                                                        {{ item.specAttr }}
                                                    </div>
                                                </Tooltip>
                                                <div class="text-lg font-semibold">
                                                    {{ item.productPrice }} x {{ item.qtyOrdered }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Coupon -->
                                    <div>
                                        <div class="flex gap-2 text-white">
                                            <Input v-model:value="couponCode" placeholder="Enter the coupon code"
                                                class="flex-1 border border-gray-300 focus:border-primary focus:ring-primary text-customblack placeholder-[#EAEAEA]" />
                                            <UButton @click="applyCoupon" :disabled="!couponCode || applyLoading"
                                                :loading="applyLoading" class="shrink-0 rounded px-4 text-white"
                                                :class="[(!couponCode) ? '!bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-[#00a9d8]']">
                                                Apply
                                            </UButton>
                                        </div>
                                        <div v-if="couponError" class="text-red-500 text-sm mt-1">{{ couponError }}
                                        </div>
                                    </div>

                                    <div class="mt-4 inline-flex items-center px-2 py-1 rounded-md text-xs"
                                        v-if="activeCoupon" style="background-color: #F0F0F0; color: #333;">
                                        <img src="/tag.png" class="w-4 h-4 mr-2" />
                                        <span class="mr-2 text-xs">{{ activeCoupon }}</span>
                                        <BaseIcon name="i-material-symbols-close-rounded"
                                            class="w-4 h-4 text-gray-100 hover:text-red-500 cursor-pointer"
                                            @click="removeCoupon" />
                                    </div>

                                    <div class="flex justify-between mt-4 font-medium" v-if="discount > 0">
                                        <span class="text-customblack">Discount</span>
                                        <span class="text-primary">- ${{ discount.toFixed(2) }}</span>
                                    </div>

                                    <div class="flex justify-between mt-4 font-medium">
                                        <span class="text-customblack text-sm">Shipping</span>
                                        <span class="text-primary">${{ shipping.toFixed(2) }}</span>
                                    </div>

                                    <div class="flex justify-between font-bold mt-4">
                                        <span class="text-customblack">Total</span>
                                        <span class="text-primary">${{ ((selectedTotal || 0) + (shipping || 0) -
                                            discount).toFixed(2) }}</span>
                                    </div>
                                </div>

                                <!-- PayPal 按钮容器 -->
                                <div id="paypal-button-container"
                                    class="sticky bottom-1 p-4 pt-0 bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)] md:shadow-none pt-4 sm:pt-0" />
                            </template>

                            <!-- 无商品 -->
                            <template v-else>
                                <div class="p-4">
                                    <div class="text-gray-500 text-sm">No items selected.</div>
                                    <NuxtLink to="/" class="mt-4 inline-flex">
                                        <UButton size="lg"
                                            class="rounded bg-primary hover:bg-[#00a9d8] text-white px-6"> Go shopping
                                        </UButton>
                                    </NuxtLink>
                                </div>
                            </template>
                        </template>

                        <!-- 骨架屏：右侧摘要加载中 -->
                        <template v-else>
                            <div class="p-4 space-y-4 animate-pulse">
                                <div class="flex justify-between">
                                    <USkeleton class="h-5 w-32" />
                                    <USkeleton class="h-5 w-16" />
                                </div>
                                <div class="space-y-3">
                                    <div class="flex items-center space-x-4">
                                        <USkeleton class="w-20 h-20 rounded-md" />
                                        <div class="flex-1 space-y-2">
                                            <USkeleton class="h-4 w-40" />
                                            <USkeleton class="h-4 w-32" />
                                            <USkeleton class="h-5 w-24" />
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-4">
                                        <USkeleton class="w-20 h-20 rounded-md" />
                                        <div class="flex-1 space-y-2">
                                            <USkeleton class="h-4 w-40" />
                                            <USkeleton class="h-4 w-32" />
                                            <USkeleton class="h-5 w-24" />
                                        </div>
                                    </div>
                                </div>
                                <USkeleton class="h-10 w-full" />
                                <div class="flex justify-between">
                                    <USkeleton class="h-4 w-24" />
                                    <USkeleton class="h-4 w-16" />
                                </div>
                                <div class="flex justify-between">
                                    <USkeleton class="h-4 w-24" />
                                    <USkeleton class="h-4 w-16" />
                                </div>
                                <div class="flex justify-between">
                                    <USkeleton class="h-5 w-16" />
                                    <USkeleton class="h-5 w-24" />
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Address Select Modal -->
        <UModal v-model="showModal" width="w-full"
            :ui="{ width: 'sm:max-w-5xl', rounded: 'rounded', container: 'items-center' }">
            <section class="border border-blackcolor/10 rounded">
                <div class="relative p-2 md:p-3 px-6 text-customblack font-semibold text-lg">
                    Address
                    <button @click="showModal = false"
                        class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 px-2 py-1">
                        ✕
                    </button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                    <div v-for="(item, idx) in addressarr" :key="idx"
                        class="relative border border-blackcolor/10 rounded p-4 hover:shadow cursor-pointer"
                        :class="{ 'border-primary-500 bg-primary-50': item.selected == 1 }" @click="selectaddress(idx)">
                        <div class="space-y-1">
                            <p><span class="text-gray-500">Full name:</span> {{ item.firstName }}{{ item.lastName }}</p>
                            <p><span class="text-gray-500">Number:</span>({{ item.numberCode }}) {{ item.number }}</p>
                            <p>
                                <span class="text-gray-500">Address:</span> {{ item.countryName }} {{ item.provinceName
                                }} {{
                                    item.city }}
                                {{ item.address }}
                            </p>
                        </div>
                        <span v-if="item.selected == 1"
                            class="absolute top-0 right-0 bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded">
                            Selected
                        </span>
                    </div>
                </div>
            </section>
        </UModal>

        <!-- Notice Modal -->
        <UModal v-model="isOpen" :ui="{ container: 'items-center' }">
            <div class="p-8 flex justify-center">
                <div class="text-center">
                    <div>{{ changedesc }}</div>
                    <UButton class="mt-6 rounded" @click="refreshPage">Refresh</UButton>
                </div>
            </div>
        </UModal>

        <!-- Sign In Modal -->
        <UModal v-model="showSignIn" :ui="{ width: 'sm:max-w-md', rounded: 'rounded-xl', container: 'items-center' }">
            <div class="relative">
                <!-- 右上角关闭按钮 -->
                <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600" @click="showSignIn = false">
                    ✕
                </button>

                <div class="p-8">
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-xl font-semibold">
                            <NuxtImg class="h-6" src="/images/incustom2.png" />
                        </div>
                    </div>

                    <div class="text-center text-xl font-bold mb-6">Sign in</div>

                    <!-- 表单内容 -->
                    <div>
                        <UInput v-model="signinForm.email" :ui="{
                            color: { white: { outline: 'ring-1 ring-[rgba(0,0,0,0.15)] focus:ring-1 focus:ring-primary' } },
                            placeholder: 'placeholder-[#D9D9D9]'
                        }" placeholder="Please enter email" size="lg" />
                        <UInput v-model="signinForm.password" :ui="{
                            icon: { trailing: { pointer: '' } },
                            base: 'dark:!bg-white dark:!text-gray-900 ',
                            color: { white: { outline: 'ring-1 ring-[rgba(0,0,0,0.15)] focus:ring-1 focus:ring-primary' } },
                            placeholder: 'placeholder-[#D9D9D9]'
                        }" placeholder="Please enter password" :type="showPassword ? 'text' : 'password'" size="lg"
                            class="mt-6">
                            <template #trailing>
                                <UButton @click="togglePassword" variant="ghost" class="text-gray-500 px-0.5">
                                    <BaseIcon :name="showPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
                                        class="w-5 h-5" />
                                </UButton>
                            </template>
                        </UInput>

                        <!-- ✅ 改成 Ant Design 的按钮 -->
                        <a-button type="primary" block size="large" class="mt-6 rounded-md" :loading="signingIn"
                            @click="handleSignIn">
                            Sign in
                        </a-button>
                    </div>

                    <div class="flex items-center my-4">
                        <div class="flex-1 h-px bg-[#f0f0f0]"></div>
                        <span class="mx-2 text-gray-400 text-sm">or</span>
                        <div class="flex-1 h-px bg-[#f0f0f0]"></div>
                    </div>

                    <div>
                        <UButton block variant="outline" size="lg" class="rounded-md" :ui="{
                            variant: {
                                outline: 'ring-0 shadow-none bg-white hover:bg-gray-50 border !border-[#D9D9D9]'
                            }
                        }" @click="socialLogin('google')">
                            <div class="flex items-center justify-center text-customblack font-normal">
                                <img src="/images/google.png" class="w-5 h-5 mr-2" />
                                <span>Sign in With Google</span>
                            </div>
                        </UButton>
                        <UButton block variant="outline" class="mt-4 rounded-md" :ui="{
                            variant: {
                                outline: 'ring-0 shadow-none bg-white hover:bg-gray-50 border !border-[#D9D9D9]'
                            }
                        }" size="lg" @click="socialLogin('facebook')">
                            <div class="flex items-center justify-center text-customblack font-normal">
                                <img src="/images/facebook.png" class="w-5 h-5 mr-2" />
                                <span>Sign in With Facebook</span>
                            </div>
                        </UButton>
                    </div>
                </div>
            </div>
        </UModal>




        <AddressModal :isshow="isshow" v-if="isshow" @close="isshow = false" :addressinfo="addressinfo"
            @updateData="updateAddresslist()" />
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'blank',
    name: 'checkoutbak',
    title: 'checkoutbak',
    description: 'INcustom checkout'
});

import { ref, computed, watch, onMounted, reactive } from 'vue';
import { Input, Select, Form, FormItem, Checkbox, Button, AutoComplete } from 'ant-design-vue';
import { loadScript } from '@paypal/paypal-js';
import { useCartStore } from '@/stores/cart';
import { message, Tooltip } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { formatPaypalUtcToLocal } from '~/utils/format';

const { addPaymentInfo, purchase } = useFbq({ currency: 'USD' });
const { purchaseorder } = useTrack();
const { getuserAddressRollPage, createUserAddress } = AddressAuth();
const { getmapProductByProductSkuList } = ProductAuth();
const { generateOrderId, createOrder, getUserOrderDocByOrderNumber, tryOrder } = OrderAuth();
const { getlistOldShippingRule } = ShippingAuth();
const { createPayment } = PayAuth();
const { getUserlPBylp2Location, listCountryAll, listProvinceByCountryId, listCityByRegionId } = LocationAuth();
const { login } = useAuth();
const { completePayment, getAvailablePaymentByBindId } = PayAuth();

const router = useRouter();
const route = useRoute();

const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

// 登录判断
const userType = useCookie<string | number | null>('userType', { sameSite: 'lax', path: '/' });
const isLoggedIn = computed(() => userType.value === 1 || userType.value === '1');

const locationinfo = useCookie('locationinfo') as any;
const userinfoCookie = useCookie<any | null>('userinfo', { sameSite: 'lax', path: '/' });

const contactEmail = ref<string>('');
const contactEmailError = ref<string>('');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const signingIn = ref(false);
const showSignIn = ref(false);
const signinForm = reactive({ email: '', password: '' });
function validateContactEmail() {
    contactEmailError.value = '';
    if (!emailRegex.test(contactEmail.value)) {
        contactEmailError.value = 'Please enter a valid email address';
        return false;
    }
    return true;
}

// 新增：加载与骨架屏控制
const isProductLoaded = ref(false);
const paypalRendered = ref(false);

const formRef = ref();
const paypalpaymentid = ref(0);
const cart = useCartStore();
const { getCart } = cartAuth();
const changedesc = ref('');
const isOpen = ref(false);
const { $showLoading, $hideLoading } = useNuxtApp();
const payloading = ref(false);

const orderNo = ref('') as any;
const orderInfo = ref({}) as any;
const productlists = ref([]) as any;
const skuList = ref([]) as any;
const orderId = ref(0);
const nowpayPalOrderid = ref('');
const from = route.query.from as any;
const sku = route.query.sku as any;
const number = route.query.number as any;
const cartarr = ref([]) as any;
let skunum = {} as any;

const countries = [
    '+1', '+44', '+93', '+355', '+213', '+1684', '+376', '+244', '+1264', '+1268',
    '+54', '+374', '+297', '+61', '+43', '+994', '+1242', '+1246',
    '+375', '+32', '+501', '+229', '+1441', '+975', '+591', '+387', '+267', '+55',
    '+246', '+1284', '+673', '+359', '+226', '+257', '+855', '+237', '+238', '+599',
    '+1345', '+236', '+235', '+56', '+86', '+57', '+269', '+243', '+242', '+682',
    '+506', '+225', '+385', '+53', '+599', '+357', '+420', '+45', '+253', '+1767',
    '+593', '+20', '+503', '+240', '+291', '+372', '+251', '+500', '+298', '+679',
    '+358', '+33', '+594', '+689', '+241', '+220', '+995', '+49', '+233', '+350',
    '+30', '+299', '+1473', '+590', '+1671', '+502', '+44', '+224', '+245', '+592',
    '+509', '+504', '+852', '+36', '+354', '+91', '+62', '+98', '+964', '+353',
    '+972', '+39', '+1876', '+81', '+962', '+7', '+254', '+686', '+383', '+965',
    '+996', '+856', '+371', '+961', '+266', '+231', '+218', '+423', '+370', '+352',
    '+853', '+389', '+261', '+265', '+60', '+960', '+223', '+356', '+692', '+596',
    '+222', '+230', '+262', '+52', '+691', '+373', '+377', '+976', '+382', '+1664',
    '+212', '+258', '+95', '+264', '+674', '+977', '+31', '+687', '+64', '+505',
    '+227', '+234', '+683', '+672', '+850', '+1670', '+47', '+968', '+92', '+680',
    '+970', '+507', '+675', '+595', '+51', '+63', '+48', '+351', '+974', '+262',
    '+40', '+7', '+250', '+590', '+290', '+1869', '+1758', '+508', '+1784', '+685',
    '+378', '+239', '+966', '+221', '+381', '+248', '+232', '+65', '+1721', '+421',
    '+386', '+677', '+252', '+27', '+82', '+211', '+34', '+94', '+249', '+597',
    '+268', '+46', '+41', '+963', '+886', '+992', '+255', '+66', '+670', '+228',
    '+690', '+676', '+1868', '+216', '+90', '+993', '+1649', '+688', '+1340',
    '+256', '+380', '+971', '+598', '+998', '+678', '+58', '+84', '+681', '+212',
    '+967', '+260', '+263', '+358'
];

const couponCode = ref('');
const couponError = ref('');
const discount = ref(0);
const activeCoupon = ref('');
const applyLoading = ref(false);

function buildFbqPayload() {
    const contents = productlists.value.map((it: any) => ({
        id: it.productSku || it.productStyle || it.productName,
        quantity: Number(it.qtyOrdered) || 1,
        item_price: Number(it.productPrice) || 0
    }));
    const value = contents.reduce((s: number, c: any) => s + (c.item_price || 0) * (c.quantity || 1), 0);
    const content_ids = contents.map((c: any) => c.id);
    const num_items = contents.reduce((s: number, c: any) => s + (c.quantity || 1), 0);
    return { value, currency: 'USD', content_ids, contents, content_type: 'product', num_items };
}
function parseItemsFromQuery(): Map<string, number> | null {
    const raw = route.query.items as string | undefined
    if (!raw) return null

    let decoded = raw
    try { decoded = decodeURIComponent(raw) } catch { }

    const map = new Map<string, number>()
    for (const pair of decoded.split(',').filter(Boolean)) {
        const [id = '', qtyStr = '1'] = pair.split(':')
        if (!id) continue
        let qty = parseInt(qtyStr, 10)
        if (Number.isNaN(qty)) qty = 1
        // 与你的限制保持一致
        qty = Math.min(Math.max(qty, 1), 999)
        map.set(String(id), qty)
    }
    return map
}
const clampQty = (n: any) => {
    const v = parseInt(String(n ?? 1), 10)
    return Math.min(Math.max(Number.isFinite(v) ? v : 1, 1), 999)
}

const applyCoupon = async () => {
    couponError.value = '';
    if (!couponCode.value) {
        couponError.value = 'Please enter a coupon code';
        return;
    }
    let orderItemListarr: any[] = [];
    productlists.value.forEach((element: any) => {
        orderItemListarr.push({
            productSku: element.productSku,
            qtyOrdered: Number(element.qtyOrdered),
            priceOrdered: element.productPrice,
            amountOrdered: element.productPrice * Number(element.qtyOrdered)
        });
    });
    let addparmes: any = {
        buyerCity: addressinfo.value.city || form.value.city,
        buyerCountryCode: addressinfo.value.country || form.value.country,
        buyerCountryName:
            addressinfo.value.countryName ||
            countryarr.value.find((c: any) => c.countryCode === form.value.country)?.countryName ||
            '',
        buyerEmail: addressinfo.value.email || contactEmail.value || form.value.email,
        buyerFirstName: addressinfo.value.firstName || form.value.firstName,
        buyerAddress: addressinfo.value.address || form.value.address,
        buyerLastName: addressinfo.value.lastName || form.value.lastName,
        buyerNotes: notes.value,
        buyerPhoneAreaCode: addressinfo.value.numberCode || form.value.numberCode,
        buyerPhoneNumber: addressinfo.value.number || form.value.number,
        buyerPostalCode: addressinfo.value.postalCode || form.value.postalCode,
        buyerStateOrProvince: addressinfo.value.province || form.value.province,
        id: orderId.value,
        shippingRuleFeeId: templateid.value,
        shippingRule: { calFee: shipping.value },
        create: false,
        orderItemList: orderItemListarr,
        marketingActivityCouponCode: couponCode.value
    };

    applyLoading.value = true;
    try {
        let tryres = await tryOrder(addparmes);
        if (tryres.result) {
            activeCoupon.value = couponCode.value;
            discount.value = tryres.result.marketingActivityDiscountAmount || 0;
            couponCode.value = '';
        } else {
            couponError.value = tryres.message || 'Invalid coupon code';
        }
    } catch (error: any) {
        let errormsg = JSON.parse(error.message);
        couponError.value = errormsg.enDesc || 'Failed to apply coupon';
    } finally {
        applyLoading.value = false;
    }
};
const removeCoupon = () => {
    activeCoupon.value = '';
    discount.value = 0;
};

const getProductlist = async () => {
    try {
        const params = { skuList: skuList.value };
        const res = await getmapProductByProductSkuList(params);
        const lists = res.result;
        for (const key in lists) {
            const obj = lists[key];
            productlists.value.push({
                productName: obj.erpProduct.productEnglishName,
                mainPic: obj.erpProduct.mainPic,
                productSku: key,
                specAttr: obj.skuSpec.specAttr,
                qtyOrdered: skunum[key],
                productPrice: obj.skuSpec.customPrice,
                productStyle: obj.erpProduct.productStyle
            });
        }
        await getShippingRulelist();
    } catch (e) {
        console.error(e);
    } finally {
        isProductLoaded.value = true; // 骨架屏结束
        tryRenderPaypalButtons();
    }
};

const filterOptionByLabel = (input: string, option: any) => option.label.toLowerCase().includes(input.toLowerCase());

const getShippingRulelist = async () => {
    if (from == 'order') return;
    try {
        const detailarr: any[] = productlists.value.map((element: any) => ({
            productRealSku: element.productStyle,
            sku: element.productSku,
            num: Number(element.qtyOrdered)
        }));
        const addresspbj: any = {};
        if (form.value.country) addresspbj.country = form.value.country;
        if (addressinfo.value.country) addresspbj.country = addressinfo.value.country;
        if (!addresspbj.country || detailarr.length == 0) return;

        const params = { detailList: detailarr, address: addresspbj };
        const res = await getlistOldShippingRule(params);
        if (res.result.length > 0) {
            templates.value = res.result;
            templates.value.forEach((item: any) => {
                item.label = `${item.feeEnName}　　${item.daysFrom}–${item.daysTo} days　　$${item.calFee.toFixed(2)}`;
            });
        } else {
            templates.value = [
                { feeId: -1, label: 'The current country does not support delivery, please change the delivery address', calFee: 0 }
            ];
        }
        templateid.value = templates.value[0].feeId;
    } catch (e) {
        console.error(e);
    }
};

const handleGetOrder = async () => {
    const orderNumber = route.query.orderNo as any;
    orderNo.value = orderNumber;
    try {
        const res = await getUserOrderDocByOrderNumber({ orderNumber });
        const result = res.result;
        orderInfo.value = result;
        orderId.value = result.id;

        productlists.value = result.orderItemList.map((el: any) => ({
            productName: el.productName,
            mainPic: el.productImage,
            productSku: el.productSku,
            qtyOrdered: el.qtyOrdered,
            productPrice: el.priceOrdered,
            productStyle: ''
        }));

        addressinfo.value.city = result.buyerCity;
        addressinfo.value.country = result.buyerCountryCode;
        addressinfo.value.countryName = result.buyerCountryName;
        addressinfo.value.email = result.buyerEmail;
        addressinfo.value.firstName = result.buyerFirstName;
        addressinfo.value.address = result.buyerAddress;
        addressinfo.value.lastName = result.buyerLastName;
        notes.value = result.buyerNotes;
        addressinfo.value.numberCode = result.buyerPhoneAreaCode;
        addressinfo.value.number = result.buyerPhoneNumber;
        addressinfo.value.postalCode = result.buyerPostalCode;
        addressinfo.value.province = result.buyerStateOrProvince;
        addressarr.value = [{ ...addressinfo.value }];

        templates.value = [result.shippingRule];
        templates.value.forEach((item: any) => {
            item.label = `${item.feeEnName}　　${item.daysFrom}–${item.daysTo} days　　$${item.calFee.toFixed(2)}`;
        });
        templateid.value = result.shippingRule.feeId;
        activeCoupon.value = result.marketingActivityCouponCode || '';
        discount.value = result.marketingActivityDiscountAmount || 0;
    } catch (e) {
        console.error(e);
    } finally {
        isProductLoaded.value = true;
        tryRenderPaypalButtons();
    }
};

const handleGetCart = async () => {
    try {
        // 1) 解析 items=id:qty,id:qty
        const itemsMap = parseItemsFromQuery()
        // 兼容旧的 ids=1,2,3
        let cartids: any = route.query.ids
        if (typeof cartids === 'string') cartids = cartids.split(',')

        const res = await getCart()
        let result = res.result as Array<any>

        // 2) 优先使用 itemsMap 的 id 集合过滤
        if (itemsMap && itemsMap.size > 0) {
            const idsFromItems = Array.from(itemsMap.keys())
            result = result.filter((it: any) => idsFromItems.includes(String(it.id)))
        } else if (Array.isArray(cartids) && cartids.length > 0) {
            // 兼容老参数：仅 ids 过滤
            result = result.filter((it: any) => cartids.includes(String(it.id)))
        }

        cartarr.value = result
        skuList.value = []
        skunum = {} as any

        // 3) 构造 skuList & 数量映射（itemsMap 覆盖购物车原数量）
        result.forEach((item: any) => {
            skuList.value.push(item.productSku)
            const overrideQty = itemsMap?.get(String(item.id))
            skunum[item.productSku] = (overrideQty ?? item.productQuantity)
        })

        await getProductlist()
    } catch (e) {
        console.error('getCart error:', e)
    } finally {
        if (!isProductLoaded.value) {
            isProductLoaded.value = true
            tryRenderPaypalButtons()
        }
    }
}


if (sku) {
    skuList.value = [sku];
    skunum[sku] = number;
    getProductlist();
}
if (from == 'cart') handleGetCart();
if (from == 'order') handleGetOrder();

const showModal = ref(false);
const isshow = ref(false);
const options = [{ value: 1, label: 'paypal', icon: '/images/paypal.png' }];

const form = ref({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    country: '',
    province: '',
    city: '',
    numberCode: '+1',
    number: '',
    email: '',
    master: true
});
const notes = ref('');
const selected = ref(1);
const countryarr = ref([]) as any;
const provincearr = ref([]) as any;
const cityarr = ref([]) as any;
const addressarr = ref([]) as any;
const templateid = ref(0) as any;
const templates = ref([]) as any;
const nowtemplate = ref({}) as any;

const changeaddress = () => (showModal.value = true);

const addressinfo = ref({}) as any;
const getAddresslist = async () => {
    try {
        const res = await getuserAddressRollPage({});
        const addressist = res.result.records;
        if (addressist.length > 0) {
            addressist[0].selected = true;
            addressinfo.value = addressist[0];
        }
        addressist.filter((it: any) => it.master == '1').forEach((it: any) => {
            it.selected = true;
            addressinfo.value = it;
        });
        addressarr.value = addressist;
    } catch (e) {
        console.error(e);
    }
};

const updateAddresslist = async () => {
    try {
        const res = await getuserAddressRollPage({});
        const addressist = res.result.records;
        addressist.forEach((item: any) => (item.selected = false));
        const last = addressist[addressist.length - 1];
        last.selected = true;
        addressinfo.value = last;
        addressarr.value = addressist;
    } catch (e) {
        console.error(e);
    }
};

const addnewaddress = () => (isshow.value = true);

function isEmptyObject(obj: any) {
    return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0;
}

const addaddress = async () => {
    if (!form.value.firstName) return message.error('firstName is required'), null;
    if (!form.value.country) return message.error('country is required'), null;
    if (!form.value.province) return message.error('province is required'), null;
    if (!form.value.city) return message.error('city is required'), null;
    if (!form.value.address) return message.error('address is required'), null;
    if (!form.value.postalCode) return message.error('postalCode is required'), null;
    if (!form.value.number) return message.error('PhoneNumber is required'), null;

    const countryName = countryarr.value.find((c: any) => c.countryCode === form.value.country)?.countryName || '';
    const addparmes = {
        fullName: form.value.firstName,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        address: form.value.address,
        city: form.value.city,
        country: form.value.country,
        master: 1,
        province: form.value.province,
        postalCode: form.value.postalCode,
        number: form.value.number,
        numberCode: form.value.numberCode,
        email: form.value.email,
        countryName,
        provinceName: form.value.province
    };
    await createUserAddress(addparmes);
    return true;
};

const paynow = async () => {
    try {
        if (isEmptyObject(addressinfo.value)) {
            const countryName = countryarr.value.find((c: any) => c.countryCode === form.value.country)?.countryName || '';
            addressinfo.value = form.value as any;
            (addressinfo.value as any).countryName = countryName;

            const userType = useCookie<string | number | null>('userType', { sameSite: 'lax', path: '/' });
            if (userType.value == 1 || userType.value === '1') {
                const res = await addaddress();
                if (!res) return;
                getAddresslist();
            }
        }

        if (!addressinfo.value.address) return message.error('Please add a address'), null;
        if (templateid.value < 0)
            return message.error('The current country does not support delivery, please change the delivery address'), null;
        if (!templateid.value) return message.error('Shipping methods is required'), null;

        if (productlists.value.length > 0) {
            if (!orderId.value) {
                const res = await generateOrderId();
                orderId.value = res.result;
            } else if (!nowpayPalOrderid.value) {
                const payparmes = { payType: 'paypal', createSource: 'orderPay', bindIdList: [orderId.value] };
                const res = await createPayment(payparmes);
                const payPalOrderid = res.result.payPalResult.payPalOrder.id;
                nowpayPalOrderid.value = payPalOrderid;
                return payPalOrderid;
            }
            payloading.value = true;
            if (nowpayPalOrderid.value) return nowpayPalOrderid.value;
            return handleSubmit();
        }
    } catch (err: any) {
        message.error(err.message || 'Failed to create order, please try again later');
        throw err;
    }
};

const handleSubmit = async () => {
    const orderItemListarr: any[] = productlists.value.map((element: any) => ({
        productSku: element.productSku,
        qtyOrdered: Number(element.qtyOrdered),
        priceOrdered: element.productPrice,
        amountOrdered: element.productPrice * Number(element.qtyOrdered)
    }));
    const addparmes: any = {
        buyerCity: addressinfo.value.city,
        buyerCountryCode: addressinfo.value.country,
        buyerCountryName: addressinfo.value.countryName,
        buyerEmail: (addressinfo.value as any)?.email || contactEmail.value,
        buyerFirstName: addressinfo.value.firstName,
        buyerAddress: addressinfo.value.address,
        buyerLastName: addressinfo.value.lastName,
        buyerNotes: notes.value,
        buyerPhoneAreaCode: addressinfo.value.numberCode,
        buyerPhoneNumber: addressinfo.value.number || form.value.number,
        buyerPostalCode: addressinfo.value.postalCode,
        buyerStateOrProvince: addressinfo.value.province,
        id: orderId.value,
        shippingRuleFeeId: templateid.value,
        shippingRule: { calFee: shipping.value },
        create: true,
        orderItemList: orderItemListarr,
        marketingActivityCouponCode: activeCoupon.value
    };
    if (from == 'cart') {
        // 以购物车条目为准：id + 数量（数量来自 skunum 覆盖或条目自身）
        const choiceUserShoppingCartList = cartarr.value.map((el: any) => ({
            id: el.id,
            productQuantity: clampQty(skunum[el.productSku] ?? el.productQuantity)
        }))
        addparmes['choiceUserShoppingCartList'] = choiceUserShoppingCartList
    }

    try {
        const createres = await createOrder(addparmes);
        orderNo.value = createres.result.orderNumber;
        try {
            addPaymentInfo({ ...buildFbqPayload(), order_id: orderNo.value || orderId.value });
        } catch (e) {
            console.warn('fbq AddPaymentInfo error:', e);
        }

        cart.refreshCart();

        const payparmes = { payType: 'paypal', createSource: 'orderPay', bindIdList: [orderId.value] };
        const res = await createPayment(payparmes);
        const payPalOrderid = res.result.payPalResult.payPalOrder.id;
        nowpayPalOrderid.value = payPalOrderid;
        return payPalOrderid;
    } catch (error: any) {
        let errormsg = {};
        try {
            errormsg = JSON.parse(error.message);
        } catch {
            errormsg = { enDesc: 'Order failed' };
        }
        const ek = (errormsg as any).errorKey;
        if (ek == 'calFee' || ek == 'priceOrdered' || ek == 'amountOrdered') {
            changedesc.value = (errormsg as any).enDesc;
            isOpen.value = true;
        }
        payloading.value = false;
        message.error((errormsg as any).enDesc || 'Order failed');
    }
};

const closeModal = () => (showModal.value = false);
const selectaddress = (index: number) => {
    addressarr.value.forEach((el: any) => (el.selected = false));
    const picked = addressarr.value[index];
    picked.selected = true;
    addressinfo.value = { ...picked };
    shipping.value = 0;
    showModal.value = false;
};

getAddresslist();

const shipping = ref(0);
const selectedItems = computed(() => cart.itemList.filter((item: any) => item.selected));
const selectedTotal = computed(
    () => productlists.value.reduce((total: number, item: any) => total + item.productPrice * item.qtyOrdered, 0) ?? 0
);
const selectedQuantity = computed(() =>
    productlists.value.reduce((sum: number, item: any) => sum + Number(item.qtyOrdered), 0)
);
const hasItems = computed(() => (productlists.value?.length || 0) > 0 && selectedQuantity.value > 0);

const getCountrylist = async () => {
    try {
        const res = await listCountryAll();
        countryarr.value = res.result;
        await getdefaultcountry();
    } catch (e) {
        console.error(e);
    }
};
const getProvince = async () => {
    try {
        const selectcountry = countryarr.value.find((c: any) => c.countryCode === form.value.country);
        if (!selectcountry) return;
        form.value.numberCode = selectcountry.phone;
        const res = await listProvinceByCountryId({ countryId: selectcountry.id });
        provincearr.value = res.result;
    } catch (e) {
        console.error(e);
    }
};
const getCity = async () => {
    try {
        const selectprovince = provincearr.value.find((c: any) => c.regionName === form.value.province);
        if (!selectprovince) return;
        const res = await listCityByRegionId({ regionId: selectprovince.id });
        cityarr.value = res.result;
    } catch (e) {
        console.error(e);
    }
};

function readLocationCookie():
    | null
    | {
        countryCode: string;
        countryName?: string;
        provinceName?: string | null;
        cityName?: string | null;
    } {
    const raw = locationinfo.value;
    if (!raw) return null;
    if (typeof raw === 'object') {
        const r: any = raw;
        if (r.countryCode) {
            return {
                countryCode: String(r.countryCode),
                countryName: r.countryName ? String(r.countryName) : undefined,
                provinceName: r.provinceName ? String(r.provinceName) : null,
                cityName: r.cityName ? String(r.cityName) : null
            };
        }
        return null;
    }
    if (typeof raw === 'string') {
        try {
            const obj = JSON.parse(raw);
            if (obj?.countryCode) {
                return {
                    countryCode: String(obj.countryCode),
                    countryName: obj.countryName ? String(obj.countryName) : undefined,
                    provinceName: obj.provinceName ? String(obj.provinceName) : null,
                    cityName: obj.cityName ? String(obj.cityName) : null
                };
            }
        } catch { }
    }
    return null;
}

const getdefaultcountry = async () => {
    const cached = readLocationCookie();
    if (!cached) return;
    const countryCode = cached.countryCode;
    if (countryCode && form.value.country !== countryCode) form.value.country = countryCode;

    await getProvince();
    if (cached.provinceName) {
        const hitProvince = provincearr.value.find((p: any) => p.regionName === cached.provinceName);
        if (hitProvince) form.value.province = hitProvince.regionName;
    }
    await getCity();
    if (cached.cityName) {
        const hitCity = cityarr.value.find((c: any) => c.cityName === cached.cityName);
        if (hitCity) form.value.city = hitCity.cityName;
    }
};

const handleSignIn = async () => {
    if (signingIn.value) return;
    try {
        if (!signinForm.email || !signinForm.password) return message.error('Please enter email and password');
        signingIn.value = true;
        if (login) {
            await login(signinForm.email, signinForm.password);
            showSignIn.value = false;
            window.location.reload();
        }
    } catch (error: any) {
        let errormsg = {};
        try {
            errormsg = JSON.parse(error.message);
        } catch {
            errormsg = { enDesc: 'Login failed, please try again' };
        }
        message.error((errormsg as any).enDesc || 'Login failed, please try again');
    } finally {
        signingIn.value = false;
    }
};

const Invalidlist = ref([] as any[]);

watch(
    () => addressinfo.value,
    (v) => {
        if (v) getShippingRulelist();
    }
);
watch(
    () => form.value.country,
    (v) => {
        if (v) {
            form.value.province = null as any;
            getShippingRulelist();
            getProvince();
        }
    }
);
watch(contactEmail, (val) => {
    if (!isEmptyObject(addressinfo.value)) (addressinfo.value as any).email = val;
});
watch(
    () => form.value.province,
    (v) => {
        if (v) {
            form.value.city = ' ' as any;
            getCity();
        }
    }
);
watch(
    () => templateid.value,
    (v) => {
        if (v) {
            templates.value.filter((item: any) => item.feeId == templateid.value).forEach((item: any) => {
                shipping.value = item.calFee;
            });
        }
    }
);

const payPalCaptureOrder = async (token: string) => {
    try {
        await completePayment({ payPalOrderId: token });
    } catch (e) {
        console.error(e);
    }
};

// 渲染 PayPal（仅当加载完成 & 有商品 & 未渲染过）
async function tryRenderPaypalButtons() {
    if (paypalRendered.value) return;
    if (!isProductLoaded.value || !hasItems.value) return;

    const config = useRuntimeConfig();
    const paypal = await loadScript({ clientId: config.public.paypalClientId, currency: 'USD', locale: 'en_US' });
    if (!paypal) {
        console.error('PayPal SDK failed to load.');
        return;
    }
    paypalRendered.value = true;

    paypal.Buttons({
        onClick: async (data: any, actions: any) => {
            try {
                let paymentId: any;
                if (from === 'order') {
                    const payresult = await getAvailablePaymentByBindId({ createSource: 'orderPay', bindId: orderInfo.value.id });
                    if (payresult?.result?.payPalResult?.payPalOrder?.id) {
                        paymentId = payresult.result.payPalResult.payPalOrder.id;
                    } else {
                        paymentId = await paynow();
                    }
                } else {
                    paymentId = await paynow();
                }
                if (!paymentId) {
                    console.error('无法获取有效的支付ID');
                    return actions.reject();
                }
                paypalpaymentid.value = paymentId;
                return actions.resolve();
            } catch (e) {
                console.error('支付准备失败:', e);
                return actions.reject();
            }
        },
        createOrder: () => Promise.resolve(String(paypalpaymentid.value)),
        onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
                nowpayPalOrderid.value = '';
                const paypalOrderId = details.id;
                const totalAmount = details.purchase_units[0].amount.value as any;
                const currency = details.purchase_units[0].amount.currency_code;
                const paymentTime = formatPaypalUtcToLocal(details.purchase_units[0].payments.captures[0].create_time);

                try {
                    purchase({ ...buildFbqPayload(), value: totalAmount, currency, order_id: orderNo.value || orderId.value, paypal_order_id: paypalOrderId });
                } catch (e) {
                    console.warn('fbq Purchase error:', e);
                }

                try {
                    const gaItems = productlists.value.map((it: any) => ({
                        item_id: it.productSku,
                        item_name: it.productName,
                        price: Number(it.productPrice) || 0,
                        quantity: Number(it.qtyOrdered) || 1,
                        currency
                    }));
                    purchaseorder({
                        transaction_id: orderNo.value || orderId.value,
                        value: Number(totalAmount),
                        currency,
                        items: gaItems,
                        coupon: activeCoupon.value || undefined,
                        shipping: Number(shipping.value) || 0
                    });
                } catch (e) {
                    console.warn('GA4 purchaseorder error:', e);
                }

                payPalCaptureOrder(paypalOrderId);
                router.push({
                    path: '/paysuccess',
                    query: { orderNo: orderNo.value, createTime: paymentTime, currency, paymentMethod: 'PayPal', totalAmount }
                });
            });
        },
        onError(err: any) {
            console.error('❌ PayPal SDK 出错：', err);
        }
    }).render('#paypal-button-container');
}

onMounted(async () => {
    const regEmail = (userinfoCookie.value && (userinfoCookie.value.email || userinfoCookie.value.userEmail)) || '';
    if (regEmail) contactEmail.value = regEmail;
    if (!contactEmail.value && (addressinfo.value as any)?.email) contactEmail.value = (addressinfo.value as any).email;

    await getCountrylist();
    // 若数据已就绪，尝试渲染 PayPal
    tryRenderPaypalButtons();
});

function refreshPage() {
    window.location.reload();
}
const socialLogin = (provider: string) => {
    if ('google' == provider) {
        window.location.href =
            'https://accounts.google.com/o/oauth2/v2/auth?client_id=894615293806-08cs1bithgteb9acpa6v471ru0n2lrqk.apps.googleusercontent.com&redirect_uri=https://www.incustom.com/googleauthorize&response_type=code&scope=openid%20email%20profile';
    }
    if ('facebook' == provider) {
        window.location.href =
            'https://www.facebook.com/v23.0/dialog/oauth?client_id=946458614020677&redirect_uri=https://www.incustom.com/facebookauthorize&state=rockAyl&scope=public_profile%20email';
    }
    if ('apple' == provider) {
        message.warning('Not supported yet');
    }
};
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

[type='checkbox']:checked,
[type='radio']:checked {
    background-color: #00b2e3;
}

input[type='checkbox']:focus {
    outline: none;
}

[type='checkbox']:focus,
[type='radio']:focus {
    outline: none;
    --tw-ring-color: none;
}

table thead,
tbody tr {
    display: table;
    width: 100%;
}

.cart-table__checkbox {
    @apply w-5 h-5 rounded border-gray-300;
}

.cart-table__action-button {
    @apply text-primary-500 hover:text-primary-600 transition-colors;
}

.truncate-1-lines {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.ant-input,
.ant-select-selector {
    height: 32px !important;
    display: flex;
    align-items: center;
    padding: 4px 16px !important;
    font-size: 14px;
    border-radius: 6px;
    border-color: #d9d9d9;
}

.ant-input:focus {
    border-color: #00b2e3;
    border: none;
}

.ant-form-item {
    margin-bottom: 16px;
}

.address-form .ant-form-item {
    margin-bottom: 10px;
}

:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
    border-color: #d9d9d9 !important;
}

:deep(.ant-select-focused .ant-select-selector) {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
    outline: none !important;
}

:deep(.ant-select .ant-select-selector .ant-select-selection-search-input),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus-visible),
:deep(.ant-select .ant-select-selector input[type='search']),
:deep(.ant-select .ant-select-selector input[type='search']:focus),
:deep(.ant-select .ant-select-selector input[type='search']:focus-visible) {
    outline: none !important;
    box-shadow: none !important;
}

:deep(.ant-select .ant-select-selector::after) {
    box-shadow: none !important;
    outline: none !important;
    border: 0 !important;
}

:deep(.ant-form-vertical .ant-form-item-label > label) {
    margin-bottom: 2px;
    font-weight: 500;
}

:deep(.ant-select-single .ant-select-selector) {
    padding: 0 16px !important;
}

:deep(.ant-form-vertical .ant-form-item-label),
:deep(.ant-col-24.ant-form-item-label),
:deep(.ant-col-xl-24.ant-form-item-label) {
    padding: 0 0 10px !important;
}

:deep(:root) {
    --tw-ring-color: #00b2e3;
}
</style>
