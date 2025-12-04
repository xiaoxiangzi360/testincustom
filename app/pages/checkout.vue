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
                                                    <FormItem class="!mb-0">
                                                        <template #label>
                                                            <span class="flex items-center">
                                                                Email:
                                                                <Tooltip
                                                                    title="We will send a message to this email address when there is new progress on the order"
                                                                    color="white"
                                                                    :overlayInnerStyle="{ color: '#333', maxWidth: '300px', whiteSpace: 'pre-line' }">
                                                                    <img src="/question.png"
                                                                        class="w-4 h-4 ml-1 cursor-pointer" />
                                                                </Tooltip>
                                                            </span>
                                                        </template>
                                                        <Input :disabled="from == 'order'" v-model:value="contactEmail"
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
                                                                <Input :disabled="from == 'order'"
                                                                    v-model:value="form.firstName"
                                                                    placeholder="First Name" />
                                                            </FormItem>
                                                            <FormItem label="Last Name :" required>
                                                                <Input :disabled="from == 'order'"
                                                                    v-model:value="form.lastName"
                                                                    placeholder="Last Name" />
                                                            </FormItem>
                                                        </div>

                                                        <FormItem label="Address :" required>
                                                            <AutoComplete :disabled="from == 'order'"
                                                                v-model:value="form.address" :options="addressOptions"
                                                                :loading="addrLoading" placeholder="Street Address"
                                                                @search="onAddressSearch"
                                                                @select="(_, option) => onAddressSelect(option as any)"
                                                                class="[&_.ant-select-selector]:!h-[32px] [&_.ant-select-selection-search-input]:text-sm" />
                                                        </FormItem>


                                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                                                            <FormItem label="Country/Region：" name="country" required>
                                                                <Select :disabled="from == 'order'"
                                                                    v-model:value="form.country" show-search allowClear
                                                                    placeholder="country"
                                                                    :options="countryarr.map(c => ({ label: c.countryName, value: c.countryCode }))"
                                                                    :filter-option="filterOptionByLabel" />
                                                            </FormItem>

                                                            <FormItem label="State/Province :" name="province" required>
                                                                <Select :disabled="from == 'order'"
                                                                    v-model:value="form.province" show-search allowClear
                                                                    placeholder="State/Province"
                                                                    :options="provincearr.map(p => ({ label: p.regionName, value: p.regionName }))"
                                                                    :filter-option="filterOptionByLabel" />
                                                            </FormItem>
                                                        </div>

                                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                                                            <FormItem label="City :" name="city" required>
                                                                <AutoComplete :disabled="from == 'order'"
                                                                    class="text-sm" v-model:value="form.city" allowClear
                                                                    placeholder="City"
                                                                    :options="cityarr.map(c => ({ label: c.cityName, value: c.cityName }))"
                                                                    :filter-option="filterOptionByLabel" />
                                                            </FormItem>
                                                            <FormItem label="Zip Code :" required>
                                                                <Input :disabled="from == 'order'"
                                                                    v-model:value="form.postalCode"
                                                                    placeholder="Zip Code" />
                                                            </FormItem>
                                                        </div>

                                                        <FormItem label="Number :" required>
                                                            <div class="flex gap-2">
                                                                <Select :disabled="from == 'order'"
                                                                    v-model:value="form.numberCode" class="!w-24"
                                                                    show-search
                                                                    :options="countries.map(code => ({ label: code, value: code }))" />
                                                                <Input :disabled="from == 'order'"
                                                                    v-model:value="form.number" class="flex-1"
                                                                    placeholder="Number" />
                                                            </div>
                                                        </FormItem>

                                                        <FormItem v-if="isLoggedIn" class="!mb-0">
                                                            <Checkbox :disabled="from == 'order'"
                                                                v-model:checked="form.master">Set as default
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
                                                    <div class="font-medium text-sm">
                                                        {{ addressinfo.firstName }} {{ addressinfo.lastName }}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span class="text-blackcolor/50 text-sm mb-1 block">Number</span>
                                                    <div class="font-medium text-sm">
                                                        ({{ addressinfo.numberCode }}) {{ addressinfo.number }}
                                                    </div>
                                                </div>
                                                <div class="col-span-2">
                                                    <span class="text-blackcolor/50 text-sm mb-1 block">Address
                                                        detail</span>
                                                    <div class="font-medium text-sm">
                                                        {{ addressinfo.countryName }} {{ addressinfo.provinceName }} {{
                                                            addressinfo.city }}
                                                        {{ addressinfo.address }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-show="from != 'order'"
                                                class="flex flex-col min-w-[150px] text-right">
                                                <div class="text-primary cursor-pointer text-sm"
                                                    @click="changeaddress()">Change Another Address</div>
                                                <div class="text-primary cursor-pointer text-sm mt-4"
                                                    @click="addnewaddress()">Edit Address</div>
                                            </div>
                                        </div>
                                    </section>
                                    <!-- Shipping -->
                                    <section class="rounded bg-white mt-4">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">
                                            Shipping Methods <span style="color: red;">*</span>
                                        </div>
                                        <div class="p-4 pt-[10px]">
                                            <Select v-model:value="templateid" :options="templates"
                                                :field-names="{ label: 'label', value: 'feeId' }"
                                                :disabled="from === 'order' || templateid === -1 || templateid === '-1'"
                                                :filter-option="filterOptionByLabel"
                                                placeholder="Select Shipping Method"
                                                class="w-full h-10 [&_.ant-select-selector]:!h-10 [&_.ant-select-selection-item]:!leading-10 [&_.ant-select-selection-placeholder]:!leading-10 rounded-md"
                                                :get-popup-container="node => node.parentNode" />
                                        </div>
                                    </section>


                                    <!-- Payment -->
                                    <section class="rounded bg-white mt-4">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">
                                            Payment Methods <span style="color: red;">*</span>
                                        </div>

                                        <div class="grid grid-cols-1 p-4 pt-[10px]">
                                            <div v-for="(option, index) in options" :key="option.value"
                                                class="flex items-center rounded-md" :class="index !== 0 ? 'mt-4' : ''">
                                                <div class="flex items-center space-x-2 px-4 py-[6px] rounded cursor-pointer"
                                                    :class="selected === option.value ? 'border border-primary' : 'border border-[#F0F0F0]'"
                                                    @click="selected = option.value">
                                                    <input type="radio" :value="option.value" v-model="selected"
                                                        class="form-radio" />
                                                    <label class="flex items-center space-x-2 cursor-pointer">
                                                        <img :src="option.icon" class="h-8 sm:h-[50px]" />
                                                    </label>
                                                </div>

                                                <!-- ✅ 选中后的文字/图标展示 -->
                                                <div v-if="option.value === 1"
                                                    class="text-d3black text-sm ml-2 font-medium">
                                                    Paypal
                                                </div>
                                                <div v-if="option.value === 2" class="flex flex-col items-start ml-2">
                                                    <div class="text-sm text-d3black font-medium">Credit/Debit Card
                                                    </div>
                                                    <div class="text-[10px] text-d3black my-1 font-medium">We support
                                                        these credit
                                                        card types</div>
                                                    <div class="flex gap-[6px]">
                                                        <img src="/images/international.png" class="w-10 h-5" />
                                                        <img src="/images/international1.png" class="w-10 h-5" />
                                                        <img src="/images/international2.png" class="w-10 h-5" />
                                                        <img src="/images/international3.png" class="w-10 h-5" />
                                                    </div>
                                                </div>
                                                <div v-if="option.value === 3"
                                                    class="text-d3black text-sm ml-2 font-medium">
                                                    Google&nbsp;Pay
                                                </div>
                                                <div v-if="option.value === 4"
                                                    class="text-d3black text-sm ml-2 font-medium">
                                                    Apple&nbsp;Pay
                                                </div>
                                            </div>

                                        </div>

                                        <!-- ✅ Airwallex Split Card 输入区（卡号整行；下行 Expiry+CVC 横排） -->
                                        <div :class="['px-4 pb-4', { hidden: selected !== 2 }]">
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <!-- 顶部：卡号独占整行 -->
                                                <div class="border border-[#D9D9D9] rounded p-4 md:col-span-2">
                                                    <label class="block text-xs text-gray-500 mb-1">Card number</label>
                                                    <div id="awx-card-number"></div>
                                                </div>

                                                <!-- 底部左：有效期 -->
                                                <div class="border border-[#D9D9D9] rounded p-4">
                                                    <label class="block text-xs text-gray-500 mb-1">Expiration
                                                        date</label>
                                                    <div id="awx-expiry"></div>
                                                </div>

                                                <!-- 底部右：CVC -->
                                                <div class="border border-[#D9D9D9] rounded p-4">
                                                    <label class="block text-xs text-gray-500 mb-1">Security
                                                        code</label>
                                                    <div id="awx-cvc"></div>
                                                </div>
                                            </div>

                                            <!-- 内联错误提示 -->
                                            <p v-if="awxError" class="text-red-500 text-sm mt-2">{{ awxError }}</p>
                                        </div>

                                    </section>

                                    <!-- Notes -->
                                    <section class="rounded bg-white mt-4">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">Notes
                                        </div>
                                        <div class="p-4 pt-[10px]">
                                            <UTextarea :disabled="from == 'order'" v-model="notes"
                                                placeholder="Enter you order notes" :ui="{
                                                    color: {
                                                        white: {
                                                            outline:
                                                                'shadow-sm bg-white placeholder-[#EAEAEA] focus:ring-1 focus:ring-primary text-gray-900 ring-1 ring-inset ring-[rgba(0,0,0,0.15)]'
                                                        }
                                                    }
                                                }" />
                                        </div>
                                    </section>
                                </template>

                                <!-- 无商品空态 -->
                                <template v-else>
                                    <section class="rounded bg-white">
                                        <div class="p-8 py-16 flex flex-col items-center justify-center text-center">
                                            <div>
                                                <NuxtImg src="/empty.png" class="w-[180px]"></NuxtImg>
                                            </div>
                                            <div class="mt-4 text-lg font-semibold text-customblack">Items Has Been
                                                Checked Out
                                            </div>
                                            <p class="mt-1 text-gray-500 text-sm">You can choose other items you like
                                                and check out </p>
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
                    <div class="lg:w-80 bg-white rounded shadow-sm min-h-[200px]" v-if="hasItems || !isProductLoaded">
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
                                            <img :src="item.mainPic" :alt="item.altText || 'Product image'"
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
                                                <div class="text-sm font-medium">
                                                    ${{ item.productPrice }} x {{ item.qtyOrdered }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Coupon -->
                                    <div>
                                        <div class="flex gap-2 text-white">
                                            <Input :disabled="from == 'order'" v-model:value="couponCode"
                                                placeholder="Enter the coupon code"
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

                                <!-- PayPal 按钮容器（仅当选中 PayPal） -->
                                <div v-show="selected === 1" id="paypal-button-container"
                                    class="sticky bottom-1 p-4 pt-0 bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)] md:shadow-none pt-4 sm:pt-0" />

                                <!-- Airwallex 支付按钮（仅当选中 Airwallex） -->
                                <div v-show="selected === 2"
                                    class="sticky bottom-1 p-4 pt-0 bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)] md:shadow-none">
                                    <UButton size="lg" :loading="awxPayLoading"
                                        class="w-full rounded bg-primary hover:bg-[#00a9d8] text-white items-center justify-center"
                                        @click="handleAirwallexPay">
                                        {{ awxPayLoading ? 'Processing...' : 'Pay Now' }}
                                    </UButton>
                                </div>
                                <div v-show="selected === 3" class="px-4 pb-4">
                                    <div id="awx-google-pay"></div>
                                    <p v-if="gpayError" class="text-red-500 text-sm mt-2">{{ gpayError }}</p>
                                </div>
                                <div v-show="selected === 4" class="px-4 pb-4">
                                    <div id="awx-apple-pay"></div>
                                    <p v-if="awxAppleError" class="text-red-500 text-sm mt-2">{{ awxAppleError }}</p>
                                </div>
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
    name: 'checkout',
    title: 'checkout',
    description: 'INcustom checkout'
});

import { ref, computed, watch, onMounted, reactive } from 'vue';
import { Input, Select, Form, FormItem, Checkbox, Button, AutoComplete, notification } from 'ant-design-vue';
import { loadScript } from '@paypal/paypal-js';
import { useCartStore } from '@/stores/cart';
import { message, Tooltip } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { formatPaypalUtcToLocal, formatUtcToLocal } from '~/utils/format';
import { useGoogleMapsLoader } from '@/composables/useGoogleMapsLoader'
const { addPaymentInfo, purchase } = useFbq({ currency: 'USD' });
const { purchaseorder } = useTrack();
const { getuserAddressRollPage, createUserAddress } = AddressAuth();
const { getmapProductSpuV2ByProductSkuV2IdList } = ProductAuth();
const { generateOrderId, createOrder, getUserOrderDocByOrderNumber, tryOrder } = OrderAuth();
const { getlistOldShippingRule } = ShippingAuth();
const { createPayment } = PayAuth();
const { getUserlPBylp2Location, listCountryAll, listProvinceByCountryId, listCityByRegionId } = LocationAuth();
const { login } = useAuth();
const { completePayment, getAvailablePaymentByBindId, airwallexCapturePaymentIntents, startAirwallexPaymentSession } = PayAuth();
import { nextTick } from 'vue';
import { onBeforeUnmount } from 'vue';
const router = useRouter();
const route = useRoute();
const awxAmount = ref<number | null>(null);
const awxCurrency = ref<string>('USD');

const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

// 登录判断
const userType = useCookie<string | number | null>('userType', { sameSite: 'lax', path: '/' });
const isLoggedIn = computed(() => userType.value != 2);

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
const awxClientSecret = ref<string>('');
const awxIntentId = ref<string>('');

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
import { usePlacesAutocomplete, pickAddress, getCity as pickCityFromGmp, getStreet as pickStreetFromGmp } from '@/composables/usePlacesAutocomplete'

const couponCode = ref('');
const couponError = ref('');
const discount = ref(0);
const activeCoupon = ref('');
const applyLoading = ref(false);
// === Airwallex Split Card 集成 ===
// === Airwallex：稳健加载 & 初始化 ===
const awxScriptLoaded = ref(false);

// === 用本地 npm 包替代 CDN，全客户端动态导入 ===
let Airwallex: any = null;

async function getAWX() {
    if (Airwallex) return Airwallex;
    // 仅在客户端导入
    if (typeof window === 'undefined') throw new Error('AWX used on server');
    const mod: any = await import('@airwallex/components-sdk'); // 本地包
    Airwallex = mod?.default || mod?.Airwallex || mod;
    if (!Airwallex?.init) throw new Error('Airwallex module not loaded');
    return Airwallex;
}
function extractAwxFromCreatePayment(payRes: any) {
    const v1 = payRes?.result?.airwallexPaymentIntentsResult?.airwallexPaymentIntents;
    const v2 = payRes?.result?.airwallexResult?.paymentIntent;
    const v3 = payRes?.result?.airwallexResult?.payment_intent;
    const awxObj = v1 || v2 || v3 || {};
    const amountRaw = awxObj?.amount ?? awxObj?.originalAmount ?? 0;
    const currencyRaw = awxObj?.currency ?? awxObj?.originalCurrency ?? 'USD';
    return {
        id: awxObj?.id || '',
        clientSecret: awxObj?.clientSecret || awxObj?.client_secret || '',
        status: awxObj?.status || '',
        currency: String(currencyRaw),
        amount: Number(amountRaw)   // 👈 确保是 number
    };
}


const awxInited = ref(false);
const awxPayLoading = ref(false);
const awxError = ref<string>('');

let awxCardNumberEl: any = null;
let awxExpiryEl: any = null;
let awxCvcEl: any = null;

async function initAirwallex(): Promise<void> {
    if (awxInited.value) return;
    const AWX = await getAWX();
    const config = useRuntimeConfig();
    const env = config.public.airwallexEnv; // 从 nuxt.config 获取环境配置
    await AWX.init({
        env,
        langKey: 'en',
        origin: window.location.origin,
        enabledElements: ['payments'] // 新版必须启用 payments
    });
    awxInited.value = true;
}

async function mountAirwallexSplit() {
    await initAirwallex();

    // ✅ 仅首次创建
    if (awxMounted.value) return;

    const AWX = await getAWX();
    const style = { base: { fontSize: '14px', '::placeholder': { color: '#9CA3AF' } } };

    // 并行创建
    const [numEl, expEl, cvcEl] = await Promise.all([
        AWX.createElement('cardNumber', { style }),
        AWX.createElement('expiry', { style }),
        AWX.createElement('cvc', { style, authFormContainer: 'awx-auth' })
    ]);
    awxCardNumberEl = numEl;
    awxExpiryEl = expEl;
    awxCvcEl = cvcEl;

    // 容器常驻（不是 v-if），确保已在 DOM
    await nextTick();

    awxCardNumberEl.mount('awx-card-number');
    awxExpiryEl.mount('awx-expiry');
    awxCvcEl.mount('awx-cvc');

    [awxCardNumberEl, awxExpiryEl, awxCvcEl].forEach((el: any) => {
        el.on?.('change', (e: any) => { awxError.value = e?.detail?.error?.message || ''; });
    });

    awxMounted.value = true; // ✅ 记得置位
}


function unmountAirwallexSplit() {
    try { awxCardNumberEl?.unmount?.(); awxCardNumberEl?.destroy?.(); } catch { }
    try { awxExpiryEl?.unmount?.(); awxExpiryEl?.destroy?.(); } catch { }
    try { awxCvcEl?.unmount?.(); awxCvcEl?.destroy?.(); } catch { }
    awxCardNumberEl = awxExpiryEl = awxCvcEl = null;
}

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
            productSkuId: element.productSkuId,
            productSpu: element.productStyle,
            productSpuId: element.productSpuId,
            productName: element.productName,
            productImage: element.mainPic?.url,
            qtyOrdered: Number(element.qtyOrdered),
            priceOrdered: element.productPrice,
            amountOrdered: element.productPrice * Number(element.qtyOrdered),
            skuPropList: element.skuPropList || []
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
        const params = { productSkuV2IdList: skuList.value, needPublishSkuData: false };
        const res = await getmapProductSpuV2ByProductSkuV2IdList(params);
        const lists = res.result;

        // 清空原有数据
        productlists.value = [];

        for (const key in lists) {
            const productData = lists[key];

            // 构造规格属性字符串 - 从 skuData.propList 中获取
            let specAttr = '';
            if (productData.skuData && Array.isArray(productData.skuData.propList)) {
                const specParts = productData.skuData.propList.map(prop => {
                    if (prop.inputList && prop.inputList.length > 0) {
                        // 自定义输入属性
                        const inputValues = prop.inputList.map(input => `${input.inputName}: ${input.inputValue}`).join(', ');
                        return `${prop.propEnName}: ${inputValues}`;
                    } else {
                        // 标准属性
                        return `${prop.propEnName}: ${prop.propValueEnName}`;
                    }
                });
                specAttr = specParts.join(' | ');
            }

            productlists.value.push({
                productId: productData.id,
                productName: productData.productEnglishName,
                mainPic: productData.mainPic?.url,
                altText: productData.mainPic?.altText,
                productSku: productData.skuData?.sku || productData.sku || key, // 实际的 SKU 字符串
                productSkuString: productData.skuData?.sku || productData.sku || key, // 实际的 SKU 字符串（备用）
                specAttr: specAttr,
                qtyOrdered: skunum[key],
                productPrice: productData.skuData ? productData.skuData.basePrice : productData.basePrice,
                productStyle: productData.spu || productData.productName, // 使用 spu 或 productName 作为 productStyle
                // 添加新的字段用于订单创建
                productSpuId: productData.id, // SPU ID
                productSkuId: key, // SKU ID  
                skuPropList: productData.skuData?.propList || [], // 从 skuData 中获取 propList
                // 添加更多可能需要的字段
                customized: productData.customized || false,
                printOnDemand: productData.printOnDemand || false,
                variant: productData.variant || false,
                catalogId: productData.catalogId,
                catalogEnName: productData.catalogEnName
            });
        }
        await getShippingRulelist();
    } catch (e) {
        console.error('获取产品列表失败:', e);
    } finally {
        isProductLoaded.value = true; // 骨架屏结束
    }
};

const filterOptionByLabel = (input: string, option: any) => option.label.toLowerCase().includes(input.toLowerCase());

const getShippingRulelist = async () => {
    if (from == 'order') return;
    try {
        const detailarr: any[] = productlists.value.map((element: any) => ({
            productRealSku: element.productStyle,
            sku: element.productSku, // 现在 productSku 直接是 SKU 字符串
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

        // 处理新的购物车数据结构
        let result = res.result as Array<any>
        if (!Array.isArray(result)) {
            result = []
        }

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
            // 使用新数据结构中的 productSkuId
            const productSkuId = item.productSkuId || item.product?.skuData?.id || item.productSku
            if (productSkuId) {
                skuList.value.push(productSkuId)
                const overrideQty = itemsMap?.get(String(item.id))
                skunum[productSkuId] = (overrideQty ?? item.productQuantity)
            }
        })

        await getProductlist()
    } catch (e) {
        console.error('getCart error:', e)
    } finally {
        if (!isProductLoaded.value) {
            isProductLoaded.value = true
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
const options = [
    { value: 1, label: 'paypal', icon: '/images/paypal.png' },
    { value: 2, label: 'airwallex', icon: '/images/mastercard.png' },
    { value: 3, label: 'googlepay', icon: '/images/googlepay.png' },
    { value: 4, label: 'applepay', icon: '/images/applepay.png' } // ← 新增
];



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
    if (!form.value.lastName) return message.error('lastName is required'), null;
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
        // if (isEmptyObject(addressinfo.value)) {
        if (form.value.address) {
            const countryName = countryarr.value.find((c: any) => c.countryCode === form.value.country)?.countryName || '';
            // addressinfo.value = form.value as any;
            (addressinfo.value as any).countryName = countryName;

            const userType = useCookie<string | number | null>('userType', { sameSite: 'lax', path: '/' });
            if (userType.value != 2) {
                const res = await addaddress();
                if (!res) return;
                getAddresslist();


            }
        }

        // }
        addressinfo.value.firstName = addressinfo.value.firstName || (form.value as any)?.firstName;
        addressinfo.value.lastName = addressinfo.value.lastName || (form.value as any)?.lastName;
        addressinfo.value.address = addressinfo.value.address || (form.value as any)?.address;
        addressinfo.value.country = addressinfo.value.country || (form.value as any)?.country;
        addressinfo.value.province = addressinfo.value.province || (form.value as any)?.province;
        addressinfo.value.city = addressinfo.value.city || (form.value as any)?.city;
        addressinfo.value.postalCode = addressinfo.value.postalCode || (form.value as any)?.postalCode;
        addressinfo.value.numberCode = addressinfo.value.numberCode || (form.value as any)?.numberCode;
        addressinfo.value.number = addressinfo.value.number || (form.value as any)?.number;
        if (!addressinfo.value.firstName) return message.error('Please add first name'), null
        if (!addressinfo.value.lastName) return message.error('Please add last name'), null
        if (!addressinfo.value.address) return message.error('Please add a address'), null;
        if (!addressinfo.value.country) return message.error('Please add country'), null
        if (!addressinfo.value.province) return message.error('Please add province'), null
        if (!addressinfo.value.city) return message.error('Please add city'), null
        if (!addressinfo.value.address) return message.error('Please add an address'), null
        if (!addressinfo.value.postalCode) return message.error('Please add postal code'), null
        if (!addressinfo.value.number) return message.error('Please add phone number'), null
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
        productSkuId: element.productSkuId,
        productSpu: element.productStyle,
        productSpuId: element.productSpuId,
        productName: element.productName,
        productImage: element.mainPic?.url,
        qtyOrdered: Number(element.qtyOrdered),
        priceOrdered: element.productPrice,
        amountOrdered: element.productPrice * Number(element.qtyOrdered),
        skuPropList: element.skuPropList || []
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
        // ✅ TikTok Pixel - AddPaymentInfo
        if (window.ttq) {
            try {
                const payload = buildFbqPayload();
                window.ttq.track('AddPaymentInfo', {
                    content_id: payload.content_ids?.[0] || 'unknown',
                    content_type: 'product',
                    contents: payload.contents?.map((it: any) => ({
                        content_id: String(it.id),
                        quantity: it.quantity,
                        price: it.item_price
                    })),
                    value: payload.value,
                    currency: payload.currency || 'USD',
                    description: 'Checkout initiated',
                    num_items: payload.num_items || 1
                });
                console.log('🟢 TikTok AddPaymentInfo sent');
            } catch (e) {
                console.warn('TikTok AddPaymentInfo failed:', e);
            }
        }
        // ✅ TikTok Pixel - PlaceAnOrder
        if (window.ttq) {
            try {
                const payload = buildFbqPayload();
                window.ttq.track('PlaceAnOrder', {
                    content_id: payload.content_ids?.[0] || 'unknown',
                    content_type: 'product',
                    contents: payload.contents?.map((it: any) => ({
                        content_id: String(it.id),
                        quantity: it.quantity,
                        price: it.item_price
                    })),
                    value: payload.value,
                    currency: payload.currency || 'USD',
                    description: 'Order created',
                    order_id: orderNo.value || orderId.value,
                    num_items: payload.num_items || 1
                });
                console.log('🟢 TikTok PlaceAnOrder sent');
            } catch (e) {
                console.warn('TikTok PlaceAnOrder failed:', e);
            }
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
// ===== Places Autocomplete（只按“国家”限制，去州偏置）=====
const { loading: addrLoading, options: addressOptionsRaw, search, getDetails, resetPlacesSession } = usePlacesAutocomplete()

const addressOptions = computed(() =>
    (addressOptionsRaw.value || []).map(o => ({ value: o.label, label: o.label, placeId: o.placeId }))
)

let addressSearchTimer: any = null

const onAddressSearch = (val: string) => {
    clearTimeout(addressSearchTimer)
    const q = (val ?? '').trim()
    if (q.length < 3) return
    addressSearchTimer = setTimeout(() => {
        const country = (form.value.country || '').toUpperCase() || undefined
        // 清偏置 + 限制在“整国”矩形范围，避免只给加州
        search(q, { country, clearBias: true, enforceCountryBounds: true })
    }, 250)
}

// 选中联想 → 拉详情 → 智能回填（地址/邮编/国家/省/市）
const onAddressSelect = async (option: { value: string; label: string; placeId: string }) => {
    const place = await getDetails(option.placeId)
    if (!place) return

    const comp = place.address_components || []
    const countryCode = pickAddress(comp, 'country', true) // ISO-2
    const provinceName = pickAddress(comp, 'administrative_area_level_1')
    const cityName = pickCityFromGmp(comp)
    const postal = pickAddress(comp, 'postal_code')
    const street = pickStreetFromGmp(comp)

    // 1) 基本字段
    form.value.address = street || (place.formatted_address || option.label)
    if (postal) form.value.postalCode = postal

    // 2) 国家变化 → 刷省份列表
    if (countryCode && form.value.country !== countryCode) {
        form.value.country = countryCode
        await getProvince()
    }

    // 3) 省份 → 拉城市列表
    if (provinceName) {
        form.value.province = provinceName
        await getCity()
    }

    // 4) 城市（如果接口列表里没有，也先写上）
    if (cityName) {
        const hit = (cityarr.value || []).find((c: any) => c.cityName === cityName)
        form.value.city = hit ? hit.cityName : cityName
        if (!hit) {
            cityarr.value = [{ cityName: form.value.city }, ...(cityarr.value || [])]
        }
    }
}

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
            resetPlacesSession?.()           // 👈 重置联想会话，清除历史偏置
            form.value.province = null as any
            form.value.city = '' as any      // 👈 不要用 ' '
            getShippingRulelist()
            getProvince()
        }
    }
)

watch(contactEmail, (val) => {
    if (!isEmptyObject(addressinfo.value)) (addressinfo.value as any).email = val;
});
watch(
    () => form.value.province,
    (v) => {
        if (v) {
            form.value.city = '' as any      // 👈 不要用 ' '
            getCity()
        }
    }
)
watch([selectedTotal, shipping, discount, awxAmount], () => {
    const currency = awxCurrency.value || 'USD'
    const value = totalPayable.value.toFixed(2)
    if (gpayEl.value?.update) {
        gpayEl.value.update({ amount: { value, currency } })
    }
    if (awxAppleEl?.update) {
        awxAppleEl.update({ amount: { value, currency } })
    }
})

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
function redirectPayFail(method: string, msg?: string) {
    if (orderNo.value) {
        router.push({
            path: '/payfail',
            query: {
                orderNo: orderNo.value,
                currency: awxCurrency.value || 'USD',
                paymentMethod: method,
                totalAmount: totalPayable.value.toFixed(2),
                errorMsg: msg || 'Payment failed'
            }
        })
    }

}

const awxMounted = ref(false);
// ✅ 切换时不做卸载，最多首次切到 2 时补挂一次
watch(selected, async (val) => {
    if (val === 2 && !awxMounted.value) {
        await mountAirwallexSplit();
    }
    if (val === 3 && !gpayMounted.value) {
        await mountGooglePay();
    }
    if (val === 4 && !awxAppleMounted.value) { // ← 新增
        await mountApplePay();
    }
});

// 监听产品加载状态和商品数据，自动尝试渲染PayPal按钮
watch([isProductLoaded, hasItems], () => {
    tryRenderPaypalButtons();
}, { immediate: false });

const payPalCaptureOrder = async (token: string) => {
    try {
        await completePayment({ payPalOrderId: token });
    } catch (e) {
        console.error(e);
    }
};
const airWallexCaptureOrder = async (token: string) => {
    try {
        await airwallexCapturePaymentIntents({ airwallexPaymentIntentsId: token });
    } catch (e) {
        console.error(e);
    }
};
// 渲染 PayPal（仅当加载完成 & 有商品 & 未渲染过）
async function tryRenderPaypalButtons() {

    if (paypalRendered.value) {
        console.log('PayPal 按钮已渲染，跳过');
        return;
    }
    if (!isProductLoaded.value || !hasItems.value) {
        console.log('条件未满足，等待产品加载或商品数据');
        return;
    }

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

                // ✅ TikTok Pixel - Purchase
                if (window.ttq) {
                    try {
                        const payload = buildFbqPayload();
                        window.ttq.track('Purchase', {
                            content_id: payload.content_ids?.[0] || 'unknown',
                            content_type: 'product',
                            contents: payload.contents?.map((it: any) => ({
                                content_id: String(it.id),
                                quantity: it.quantity,
                                price: it.item_price
                            })),
                            value: Number(totalAmount),
                            currency,
                            description: 'PayPal checkout',
                            order_id: orderNo.value || orderId.value
                        });
                        console.log('🟢 TikTok Purchase sent (PayPal)');
                    } catch (e) {
                        console.warn('TikTok Purchase failed (PayPal):', e);
                    }
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
async function ensureAwxPaymentIntent(payType): Promise<string> {
    // 1) 确保有 orderId
    if (!orderId.value) {
        try {
            const res = await generateOrderId();
            orderId.value = res.result;
        } catch (e: any) {
            message.error(e?.message || 'Failed to generate order id');
            throw new Error('ORDER_PREPARE_FAILED');
        }
    }

    // 2) 确保已 createOrder（拿到 orderNo）
    if (!orderNo.value) {
        try {
            const orderItemList = (productlists.value || []).map((item: any) => ({
                productSku: item.productSku,
                productSkuId: item.productSkuId,
                productSpu: item.productStyle,
                productSpuId: item.productSpuId,
                productName: item.productName,
                productImage: item.mainPic?.url,
                qtyOrdered: Number(item.qtyOrdered),
                priceOrdered: Number(item.productPrice),
                amountOrdered: Number(item.productPrice) * Number(item.qtyOrdered),
                skuPropList: item.skuPropList || []
            }));
            const createRes = await createOrder({
                buyerCity: addressinfo.value.city,
                buyerCountryCode: addressinfo.value.country,
                buyerCountryName: addressinfo.value.countryName,
                buyerEmail: addressinfo.value.email || contactEmail.value || form.value.email,
                buyerFirstName: addressinfo.value.firstName,
                buyerAddress: addressinfo.value.address,
                buyerLastName: addressinfo.value.lastName,
                buyerNotes: notes.value,
                buyerPhoneAreaCode: addressinfo.value.numberCode,
                buyerPhoneNumber: addressinfo.value.number || (form.value as any)?.number,
                buyerPostalCode: addressinfo.value.postalCode,
                buyerStateOrProvince: addressinfo.value.province,
                id: orderId.value,
                shippingRuleFeeId: templateid.value,
                shippingRule: { calFee: Number(shipping.value) || 0 },
                create: true,
                orderItemList,
                marketingActivityCouponCode: activeCoupon.value || undefined,
                ...(from === 'cart'
                    ? {
                        choiceUserShoppingCartList: (cartarr.value || []).map((el: any) => ({
                            id: el.id,
                            productQuantity: clampQty(skunum[el.productSku] ?? el.productQuantity)
                        }))
                    }
                    : {})
            });
            orderNo.value = createRes?.result?.orderNumber || '';
        } catch (err: any) {
            let msg = 'Order create failed';
            try {
                const parsed = JSON.parse(err.message || '{}');
                msg = parsed.enDesc || msg;
                const ek = parsed.errorKey;
                if (ek === 'calFee' || ek === 'priceOrdered' || ek === 'amountOrdered') {
                    changedesc.value = parsed.enDesc;
                    isOpen.value = true;
                }
            } catch { }
            message.error(msg);
            throw new Error('ORDER_CREATE_FAILED');
        }
    }

    // 3) 创建 PaymentIntent —— 这里传入你指定的 payType
    if (!awxClientSecret.value) {
        try {
            const payParams = { payType, createSource: 'orderPay', bindIdList: [orderId.value] };
            const payRes = await createPayment(payParams);
            const { id, clientSecret, amount, currency } = extractAwxFromCreatePayment(payRes);
            if (!clientSecret) throw new Error('Missing Airwallex client_secret');

            awxClientSecret.value = clientSecret;
            awxIntentId.value = id || '';

            // ✅ 以服务端返回为准的金额 & 币种
            if (Number.isFinite(amount)) awxAmount.value = Number(amount);
            if (currency) awxCurrency.value = currency;
        } catch (e: any) {
            console.error('createPayment error:', e);
            message.error(e?.message || 'Failed to create payment intent');
            throw new Error('PAYMENT_INTENT_FAILED');
        }
    }

    return awxClientSecret.value;
}

async function handleAirwallexPay() {
    awxError.value = ''
    awxPayLoading.value = true

    try {
        // --- A. 地址 & 物流校验：失败不跳转 ---
        // if (isEmptyObject(addressinfo.value)) {
        if (form.value.address) {
            const countryName =
                countryarr.value.find((c: any) => c.countryCode === form.value.country)?.countryName || ''
            addressinfo.value.countryName = countryName
            const userType = useCookie<string | number | null>('userType', { sameSite: 'lax', path: '/' })
            if (userType.value != 2) {

                const ok = await addaddress()
                if (!ok) return
                await getAddresslist()


            }
        }


        addressinfo.value.firstName = addressinfo.value.firstName || (form.value as any)?.firstName;
        addressinfo.value.lastName = addressinfo.value.lastName || (form.value as any)?.lastName;
        addressinfo.value.address = addressinfo.value.address || (form.value as any)?.address;
        addressinfo.value.country = addressinfo.value.country || (form.value as any)?.country;
        addressinfo.value.province = addressinfo.value.province || (form.value as any)?.province;
        addressinfo.value.city = addressinfo.value.city || (form.value as any)?.city;
        addressinfo.value.postalCode = addressinfo.value.postalCode || (form.value as any)?.postalCode;
        addressinfo.value.numberCode = addressinfo.value.numberCode || (form.value as any)?.numberCode;
        addressinfo.value.number = addressinfo.value.number || (form.value as any)?.number;

        // }
        if (!addressinfo.value.firstName) return message.error('Please add first name'), null
        if (!addressinfo.value.lastName) return message.error('Please add last name'), null
        if (!addressinfo.value.address) return message.error('Please add a address')
        if (!addressinfo.value.country) return message.error('Please add country'), null
        if (!addressinfo.value.province) return message.error('Please add province'), null
        if (!addressinfo.value.city) return message.error('Please add city'), null
        if (!addressinfo.value.address) return message.error('Please add an address'), null
        if (!addressinfo.value.postalCode) return message.error('Please add postal code'), null
        if (!addressinfo.value.number) return message.error('Please add phone number'), null
        if (templateid.value < 0) return message.error('The current country does not support delivery')
        if (!templateid.value) return message.error('Shipping methods is required')
        if (!productlists.value?.length) return message.error('No items to pay')

        // --- B. 准备 PaymentIntent：失败不跳转 ---
        const clientSecret = await ensureAwxPaymentIntent('airwallex')
        if (!clientSecret) {
            // 理论上不会走到这，但为了稳妥：不跳转
            return message.error('Airwallex is not ready yet')
        }

        // --- C. 挂载分体元素（若未挂）：失败不跳转 ---
        if (!awxCardNumberEl) {
            try {
                await mountAirwallexSplit()
            } catch (e: any) {
                console.error('mount AWX split error:', e)
                return message.error('Failed to mount card fields')
            }
        }

        // --- D. 真正支付：仅此处失败才跳转 /payfail ---
        let result: any
        try {
            result = await awxCardNumberEl.confirm({ client_secret: clientSecret })
        } catch (confirmErr: any) {
            const msg = confirmErr?.message || 'Payment failed'
            awxError.value = msg
            // ⛳️ 只有支付确认失败才跳转
            return router.push({
                path: '/payfail',
                query: {
                    orderNo: orderNo.value,
                    currency: 'USD',
                    paymentMethod: 'Credit/Debit Card',
                    totalAmount: (
                        (selectedTotal.value || 0) +
                        (shipping.value || 0) -
                        (discount.value || 0)
                    ).toFixed(2),
                    errorMsg: msg
                }
            })
        }
        if (result?.status === 'SUCCEEDED') {
            message.success('Pay success')
            const paymentTime = formatUtcToLocal(result.created_at);

            // 埋点
            try {
                const totalAmount = (
                    (selectedTotal.value || 0) +
                    (shipping.value || 0) -
                    (discount.value || 0)
                ).toFixed(2)
                purchase({
                    ...buildFbqPayload(),
                    value: Number(totalAmount),
                    currency: 'USD',
                    order_id: orderNo.value || orderId.value
                })

                // ✅ TikTok Pixel - Purchase
                if (window.ttq) {
                    try {
                        const payload = buildFbqPayload();
                        window.ttq.track('Purchase', {
                            content_id: payload.content_ids?.[0] || 'unknown',
                            content_type: 'product',
                            contents: payload.contents?.map((it: any) => ({
                                content_id: String(it.id),
                                quantity: it.quantity,
                                price: it.item_price
                            })),
                            value: Number(totalAmount),
                            currency: 'USD',
                            description: 'Credit/Debit Card checkout',
                            order_id: orderNo.value || orderId.value
                        });
                        console.log('🟢 TikTok Purchase sent (Card)');
                    } catch (e) {
                        console.warn('TikTok Purchase failed (Card):', e);
                    }
                }

                const gaItems = productlists.value.map((it: any) => ({
                    item_id: it.productSku,
                    item_name: it.productName,
                    price: Number(it.productPrice) || 0,
                    quantity: Number(it.qtyOrdered) || 1,
                    currency: 'USD'
                }))
                purchaseorder({
                    transaction_id: orderNo.value || orderId.value,
                    value: Number(totalAmount),
                    currency: 'USD',
                    items: gaItems,
                    coupon: activeCoupon.value || undefined,
                    shipping: Number(shipping.value) || 0
                })
            } catch (e) {
                console.warn('tracking error:', e)
            }

            // 后端捕获
            airWallexCaptureOrder(awxIntentId.value)

            // 成功跳转
            return router.push({
                path: '/paysuccess',
                query: {
                    orderNo: orderNo.value,
                    createTime: paymentTime,
                    currency: 'USD',
                    paymentMethod: 'Credit/Debit Card',
                    totalAmount: (
                        (selectedTotal.value || 0) +
                        (shipping.value || 0) -
                        (discount.value || 0)
                    ).toFixed(2)
                }
            })
        }

        // 其它状态统一当支付异常处理（才跳转）
        const msg = result?.status || 'Payment failed'
        awxError.value = msg
        return router.push({
            path: '/payfail',
            query: {
                orderNo: orderNo.value,
                currency: 'USD',
                paymentMethod: 'Credit/Debit Card',
                totalAmount: (
                    (selectedTotal.value || 0) +
                    (shipping.value || 0) -
                    (discount.value || 0)
                ).toFixed(2),
                errorMsg: msg
            }
        })
    } catch (outer: any) {
        // 这里捕获到的大多是准备阶段错误（订单/intent 等），不跳转
        if (outer?.message && !['Payment failed'].includes(outer.message)) {
            console.warn('prepare step error (no redirect):', outer.message)
        } else {
            console.warn('unknown error (no redirect):', outer)
        }
        awxError.value = outer?.message || 'Unexpected error'
        message.error(awxError.value)
    } finally {
        awxPayLoading.value = false
    }
}
//google apple pay
const awxAppleMounted = ref(false)
let awxAppleEl: any = null
const awxAppleError = ref<string>('')
const gpayMounted = ref(false)
const gpayEl = ref<any>(null)
const gpayError = ref<string>('')
const Invalidlist = ref([] as any[]);
// 计算应付总额（与右侧汇总保持一致）
const totalPayable = computed(() => {
    // 如果服务端已经返回权威金额，则以它为准
    if (awxAmount.value != null && Number.isFinite(awxAmount.value)) {
        return Number(awxAmount.value.toFixed(2));
    }
    // 否则退回到本地汇总
    return Number(((selectedTotal.value || 0) + (shipping.value || 0) - (discount.value || 0)).toFixed(2));
});
async function mountApplePay() {
    await initAirwallex()
    if (awxAppleMounted.value) return
    const AWX = await getAWX()
    // 创建时只放展示金额；真正金额会在校验后用服务端值覆盖
    let countryCode = (addressinfo.value?.country || form.value.country || 'US')
        .toString()
        .toUpperCase()
    awxAppleEl = await AWX.createElement('applePayButton', {
        amount: {
            value: totalPayable.value.toFixed(2)
            , currency: 'USD'
        }, // 展示占位
        countryCode: countryCode,
        buttonType: 'buy',
        buttonColor: 'black',
        merchantCapabilities: ['supports3DS', 'supportsDebit', 'supportsCredit', 'supportsEMV'], // Remove supportsEMV if China UnionPay is not needed
        supportedNetworks: [
            'amex',
            'bancomat',
            'bancontact',
            'cartesBancaires',
            'chinaUnionPay',
            'dankort',
            'discover',
            'eftpos',
            'electron',
            'elo',
            'girocard',
            'interac',
            'jcb',
            'mada',
            'maestro',
            'masterCard',
            'mir',
            'privateLabel',
            'visa',
            'vPay',
        ],
        requiredShippingContactFields: ['name', 'email', 'phone']
    })

    await nextTick()
    awxAppleEl.mount('awx-apple-pay')
    awxAppleMounted.value = true

    // 点击/校验：创建 Intent + 注入金额/密钥 + 取 merchantSession
    const handleValidate = async (evt: any) => {
        try {
            // 地址/运费/商品校验（与其它方式一致）
            if (form.value.address) {
                const countryName = countryarr.value.find((c: any) => c.countryCode === form.value.country)?.countryName || ''
                addressinfo.value.countryName = countryName
                const userTypeCookie = useCookie<string | number | null>('userType', { sameSite: 'lax', path: '/' })
                if (userTypeCookie.value == 1 || userTypeCookie.value === '1') {
                    const ok = await addaddress(); if (!ok) return
                    await getAddresslist()
                }
            }
            addressinfo.value.firstName = addressinfo.value.firstName || (form.value as any)?.firstName
            addressinfo.value.lastName = addressinfo.value.lastName || (form.value as any)?.lastName
            addressinfo.value.address = addressinfo.value.address || (form.value as any)?.address
            addressinfo.value.country = addressinfo.value.country || (form.value as any)?.country
            addressinfo.value.province = addressinfo.value.province || (form.value as any)?.province
            addressinfo.value.city = addressinfo.value.city || (form.value as any)?.city
            addressinfo.value.postalCode = addressinfo.value.postalCode || (form.value as any)?.postalCode
            addressinfo.value.numberCode = addressinfo.value.numberCode || (form.value as any)?.numberCode
            addressinfo.value.number = addressinfo.value.number || (form.value as any)?.number

            if (!addressinfo.value.firstName) return message.error('Please add first name')
            if (!addressinfo.value.lastName) return message.error('Please add last name')
            if (!addressinfo.value.address) return message.error('Please add an address')
            if (!addressinfo.value.country) return message.error('Please add country')
            if (!addressinfo.value.province) return message.error('Please add province')
            if (!addressinfo.value.city) return message.error('Please add city')
            if (!addressinfo.value.postalCode) return message.error('Please add postal code')
            if (!addressinfo.value.number) return message.error('Please add phone number')
            if (templateid.value < 0) return message.error('The current country does not support delivery')
            if (!templateid.value) return message.error('Shipping methods is required')
            if (!productlists.value?.length) return message.error('No items to pay')


            awxClientSecret.value = await ensureAwxPaymentIntent('airwallex_apple_pay')
            console.log(awxClientSecret.value);
            console.log(awxIntentId.value);
            let updatecountryCode = (addressinfo.value?.country || form.value.country || 'US')
                .toString()
                .toUpperCase()
            // 用服务端金额/币种覆盖
            await awxAppleEl.update?.({
                countryCode: updatecountryCode,
                intent_id: awxIntentId.value,
                client_secret: awxClientSecret.value,
                amount: { value: totalPayable.value.toFixed(2), currency: awxCurrency.value || 'USD' }
            })

            // Apple 商户校验（domain 需已在 Apple 侧验证）
            const validationURL = evt?.detail?.validationURL || evt?.detail?.validationUrl || evt?.validationURL || evt?.validationUrl
            const session = await startAirwallexPaymentSession({
                validationUrl: validationURL,
                initiative: 'web',
                initiativeContext: window.location.hostname,
                paymentIntentId: awxIntentId.value
            })
            awxAppleEl.completeValidation(session?.result ?? session)
        } catch (e: any) {
            awxAppleError.value = e?.message || 'Apple Pay prepare failed'
            message.error(awxAppleError.value)
        }
    }

    // 事件绑定（兼容不同 SDK 命名）
    awxAppleEl.on?.('validateMerchant' as any, handleValidate)
    awxAppleEl.on?.('merchant_validation' as any, handleValidate)
    awxAppleEl.on?.('merchantValidation' as any, handleValidate)
    awxAppleEl.on?.('authorized', async (e: any) => {
        try {
            const result = await awxAppleEl.confirmIntent({ client_secret: awxClientSecret.value })
            console.log(result);
            if (result?.status === 'SUCCEEDED') {
                airWallexCaptureOrder(result.id)  // 后端捕获
                // → 执行埋点 + 跳转 paysuccess
                const totalAmount = totalPayable.value
                purchase({ ...buildFbqPayload(), value: Number(totalAmount), currency: awxCurrency.value || 'USD', order_id: orderNo.value || orderId.value })

                // ✅ TikTok Pixel - Purchase
                if (window.ttq) {
                    try {
                        const payload = buildFbqPayload();
                        window.ttq.track('Purchase', {
                            content_id: payload.content_ids?.[0] || 'unknown',
                            content_type: 'product',
                            contents: payload.contents?.map((it: any) => ({
                                content_id: String(it.id),
                                quantity: it.quantity,
                                price: it.item_price
                            })),
                            value: Number(totalAmount),
                            currency: 'USD',
                            description: 'Credit/Debit Card checkout',
                            order_id: orderNo.value || orderId.value
                        });
                        console.log('🟢 TikTok Purchase sent (Card)');
                    } catch (e) {
                        console.warn('TikTok Purchase failed (Card):', e);
                    }
                }

                const gaItems = productlists.value.map((it: any) => ({
                    item_id: it.productSku, item_name: it.productName,
                    price: Number(it.productPrice) || 0, quantity: Number(it.qtyOrdered) || 1,
                    currency: awxCurrency.value || 'USD'
                }))
                purchaseorder({
                    transaction_id: orderNo.value || orderId.value,
                    value: Number(totalAmount),
                    currency: awxCurrency.value || 'USD',
                    items: gaItems,
                    coupon: activeCoupon.value || undefined,
                    shipping: Number(shipping.value) || 0
                })
                const now = new Date().toISOString()
                router.push({
                    path: '/paysuccess',
                    query: {
                        orderNo: orderNo.value,
                        createTime: formatUtcToLocal(now),
                        currency: awxCurrency.value || 'USD',
                        paymentMethod: 'Apple Pay',
                        totalAmount: totalPayable.value.toFixed(2)
                    }
                })
            } else {
                redirectPayFail('Apple Pay', result?.status || 'Payment failed')
            }
        } catch (err: any) {
            const msg = err?.message || 'Apple Pay confirm failed'
            message.error(msg)
            redirectPayFail('Apple Pay', msg)
        }
    })

    // 成功
    awxAppleEl.on?.('success', async (e: any) => {
        try {
            const intent = e?.detail?.intent
            if (intent?.id) await airWallexCaptureOrder(intent.id)

            // 埋点（与其它方式一致）

        } catch { }


    })

    // 失败/取消
    awxAppleEl.on?.('error', (e: any) => {
        const raw = e?.detail ?? e
        const msg = raw?.error?.message ?? raw?.message ?? raw?.status ?? 'Payment failed'
        awxAppleError.value = msg
        message.error(msg)
        redirectPayFail('Apple Pay', msg)
    })
}

// 替换你的 mountGooglePay 函数
async function mountGooglePay() {
    await initAirwallex()
    if (gpayMounted.value) return

    const AWX = await getAWX()
    const countryCode = (addressinfo.value?.country || form.value.country || 'US').toUpperCase()

    gpayEl.value = await AWX.createElement('googlePayButton', {
        countryCode,
        amount: { value: totalPayable.value.toFixed(2), currency: awxCurrency.value || 'USD' },
        autoCapture: true,
        buttonType: 'buy',
        buttonColor: 'black'
    })

    await nextTick()
    gpayEl.value.mount('awx-google-pay')
    gpayMounted.value = true

    // 1. 点击 → 创建 Intent
    gpayEl.value.on?.('click', async () => {
        try {
            awxClientSecret.value = '' // 确保重新创建
            awxIntentId.value = ''

            if (form.value.address) {
                const countryName =
                    countryarr.value.find((c: any) => c.countryCode === form.value.country)?.countryName || ''
                addressinfo.value.countryName = countryName
                const userTypeCookie = useCookie<string | number | null>('userType', { sameSite: 'lax', path: '/' })
                if (userTypeCookie.value == 1 || userTypeCookie.value === '1') {
                    const ok = await addaddress()
                    if (!ok) return
                    await getAddresslist()
                }
            }

            addressinfo.value.firstName = addressinfo.value.firstName || (form.value as any)?.firstName
            addressinfo.value.lastName = addressinfo.value.lastName || (form.value as any)?.lastName
            addressinfo.value.address = addressinfo.value.address || (form.value as any)?.address
            addressinfo.value.country = addressinfo.value.country || (form.value as any)?.country
            addressinfo.value.province = addressinfo.value.province || (form.value as any)?.province
            addressinfo.value.city = addressinfo.value.city || (form.value as any)?.city
            addressinfo.value.postalCode = addressinfo.value.postalCode || (form.value as any)?.postalCode
            addressinfo.value.numberCode = addressinfo.value.numberCode || (form.value as any)?.numberCode
            addressinfo.value.number = addressinfo.value.number || (form.value as any)?.number
            const bail = async (msg: string) => {
                notification.error({
                    message: msg,
                    placement: 'topRight',
                    duration: 3
                })
                try {
                    await gpayEl.value.update({
                        intent_id: '',
                        client_secret: '',
                        amount: { value: '0', currency: awxCurrency.value || 'USD' }
                    })
                } catch { }
                return
            }
            if (!addressinfo.value.firstName) return await bail('Please add first name')
            if (!addressinfo.value.lastName) return await bail('Please add last name')
            if (!addressinfo.value.address) return await bail('Please add an address')
            if (!addressinfo.value.country) return await bail('Please add country')
            if (!addressinfo.value.province) return await bail('Please add province')
            if (!addressinfo.value.city) return await bail('Please add city')
            if (!addressinfo.value.postalCode) return await bail('Please add postal code')
            if (!addressinfo.value.number) return await bail('Please add phone number')
            if (templateid.value < 0) return await bail('The current country does not support delivery')
            if (!templateid.value) return await bail('Shipping methods is required')
            if (!productlists.value?.length) return await bail('No items to pay')


            const clientSecret = await ensureAwxPaymentIntent('airwallex_google_pay')
            if (!clientSecret) throw new Error('Failed to create Google Pay intent')

            // 用服务端金额/币种更新按钮
            const updateCountry = (addressinfo.value?.country || form.value.country || 'US').toUpperCase()
            await gpayEl.value.update({
                countryCode: updateCountry,
                intent_id: awxIntentId.value,
                client_secret: clientSecret,
                amount: { value: totalPayable.value.toFixed(2).toString(), currency: awxCurrency.value || 'USD' }
            })
        } catch (err: any) {
            const msg = err?.message || 'Google Pay init failed'
            gpayError.value = msg
            message.error(msg)
        }
    })

    // 2. 用户完成授权 → confirmIntent
    gpayEl.value.on?.('authorized', async () => {
        try {
            console.log('authorized');
            const result = await gpayEl.value.confirmIntent({ client_secret: awxClientSecret.value })
            if (result?.status === 'SUCCEEDED') {
                airWallexCaptureOrder(result.id)

                const totalAmount = totalPayable.value
                purchase({ ...buildFbqPayload(), value: Number(totalAmount), currency: awxCurrency.value || 'USD', order_id: orderNo.value || orderId.value })
                // ✅ TikTok Pixel - Purchase
                if (window.ttq) {
                    try {
                        const payload = buildFbqPayload();
                        window.ttq.track('Purchase', {
                            content_id: payload.content_ids?.[0] || 'unknown',
                            content_type: 'product',
                            contents: payload.contents?.map((it: any) => ({
                                content_id: String(it.id),
                                quantity: it.quantity,
                                price: it.item_price
                            })),
                            value: Number(totalAmount),
                            currency: 'USD',
                            description: 'Credit/Debit Card checkout',
                            order_id: orderNo.value || orderId.value
                        });
                        console.log('🟢 TikTok Purchase sent (Card)');
                    } catch (e) {
                        console.warn('TikTok Purchase failed (Card):', e);
                    }
                }

                router.push({
                    path: '/paysuccess',
                    query: {
                        orderNo: orderNo.value,
                        createTime: formatUtcToLocal(new Date().toISOString()),
                        currency: awxCurrency.value || 'USD',
                        paymentMethod: 'Google Pay',
                        totalAmount: totalPayable.value.toFixed(2)
                    }
                })
            } else {
                console.log('result', result);
                redirectPayFail('Google Pay', result?.status || 'Payment failed')
            }
        } catch (err: any) {
            console.log('err', err);
            const msg = err?.message || 'Google Pay confirm failed'
            gpayError.value = msg
            message.error(msg)
            redirectPayFail('Google Pay', msg)
        }
    })

    // 3. 成功（可选：有的 SDK 会直接触发）
    gpayEl.value.on?.('success', (e: any) => {
        console.log('Google Pay success event:', e)
    })

    // 4. 错误处理
    gpayEl.value.on?.('error', (e: any) => {
        console.log('error', JSON.stringify(e));
        const msg = e?.detail?.message || 'Google Pay error'
        gpayError.value = msg
        message.error(msg)
        redirectPayFail('Google Pay', msg)
    })

    gpayEl.value.on?.('onError', (event) => {
        const err = event?.detail?.error;
        console.error('[Google Pay Error]',
            err?.type || '(no type)',
            err?.error || '(no message)',
            'Full detail:', event.detail
        );
    });
}

onMounted(async () => {
    const regEmail = (userinfoCookie.value && (userinfoCookie.value.email || userinfoCookie.value.userEmail)) || '';
    if (regEmail) contactEmail.value = regEmail;
    if (!contactEmail.value && (addressinfo.value as any)?.email) contactEmail.value = (addressinfo.value as any).email;

    await getCountrylist();
    // 若数据已就绪，尝试渲染 PayPal
    tryRenderPaypalButtons();
    const g = await useGoogleMapsLoader({ libraries: ['places'] })

    // ✅ 可以安全使用 Google Maps 对象了
    const ac = new g.maps.places.AutocompleteService()
    try {
        await initAirwallex();
        await mountAirwallexSplit();
    } catch { }

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
onBeforeUnmount(() => { clearTimeout(addressSearchTimer) })

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

/* 鼠标 hover 的背景色 */
:deep(.ant-select-item-option-active) {
    background-color: #f0f0f0 !important;
    /* 你想要的颜色 */
}

/* 选中项的背景色 */
:deep(.ant-select-item-option-selected) {
    background-color: #00b2e3 !important;
    /* 改成你要的色 */
    color: #fff !important;
    /* 字体颜色 */
}
</style>