<template>
    <div class="min-h-screen bg-[#F8F8F8] w-full">
        <div class="max-w-7xl m-auto py-4">
            <div class="md:mb-6 mb-4">
                <NuxtLink to="/">
                    <NuxtImg class="h-7 md:h-11" src="/images/incustom3.png" />
                </NuxtLink>
            </div>
            <div class="rounded">
                <div class="flex flex-row max-md:flex-col gap-4 items-stretch">
                    <!-- Left: Main -->
                    <div class="w-[60%] max-md:w-[100%] md:max-h-[90vh] overflow-y-auto scrollbar-hide">
                        <main class="flex-1">
                            <!-- 加载完成 -->
                            <template v-if="isProductLoaded">
                                <!-- 有商品 -->
                                <template v-if="hasItems">
                                    <section v-if="isMobile" class="bg-white mb-4">
                                        <div
                                            class="p-4  text-[#0c1013] font-semibold text-base sm:text-lg flex items-center justify-between">
                                            Selected {{ selectedQuantity }} items
                                            <div class="px-2 items-center justify-center max-md:flex hidden"
                                                :class="{ 'rotate-180': !isSummaryOpen, 'rotate-0': isSummaryOpen }"
                                                @click="changeSummaryOpen">
                                                <UIcon name="i-ic:sharp-keyboard-arrow-up"
                                                    class="w-6 h-6 text-[#0c1013]" />
                                            </div>
                                        </div>

                                        <!-- 加载完成 -->
                                        <template v-if="isProductLoaded">
                                            <!-- 有商品 -->
                                            <template v-if="hasItems">
                                                <div class="">
                                                    <div class="overflow-y-auto px-4 md:max-h-[43vh]"
                                                        v-show="isSummaryOpen">
                                                        <div class=" bg-white pb-4 " v-for="item in productlists"
                                                            :key="item.productSku">
                                                            <div class="flex  gap-2  w-full h-full">
                                                                <NuxtImg
                                                                    :src="`${item.mainPic}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0`"
                                                                    :alt="item.altText || 'Product image'"
                                                                    class="w-20 h-20 rounded-[4px] object-cover" />
                                                                <div class="flex flex-col flex-1">
                                                                    <Tooltip color="white"
                                                                        :overlayInnerStyle="{ color: '#333' }"
                                                                        :title="item.productName"
                                                                        :overlayStyle="{ whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                                        <div
                                                                            class="font-semibold text-sm text-blackcolor line-clamp-2 mt-2">
                                                                            {{ item.productName }}
                                                                        </div>
                                                                    </Tooltip>

                                                                    <div class="text-sm font-medium mt-2">
                                                                        ${{ item.productPrice }} x {{ item.qtyOrdered }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class=" text-[#AEAEAE] font-normal text-[14px] leading-5 mt-1 px-2">
                                                                <div v-for="(spec, i) in getSpecArray(item?.skuPropList)"
                                                                    :key="i" class="whitespace-normal">
                                                                    {{ spec.label }}
                                                                    <span class="text-[#0C1013] ml-1">{{ spec.value
                                                                    }}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <!-- Coupon -->
                                                    <div class="px-4 pb-4 bg-white" v-if="!isMobile">
                                                        <div class="flex gap-2 text-white">
                                                            <Input :disabled="queryFrom == 'order'"
                                                                v-model:value="couponCode"
                                                                placeholder="Enter the coupon code"
                                                                class="flex-1 border border-gray-300 focus:border-primary focus:ring-primary text-customblack placeholder-[#EAEAEA]"
                                                                @input="" />
                                                            <UButton @click="applyCoupon"
                                                                :disabled="!couponCode || applyLoading"
                                                                :loading="applyLoading"
                                                                class="shrink-0 rounded px-4 text-white dark:text-white"
                                                                :class="[(!couponCode) ? '!bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-[#00a9d8]']">
                                                                Apply
                                                            </UButton>
                                                        </div>
                                                        <div v-if="couponError" class="text-red-500 text-sm mt-1">{{
                                                            couponError }}
                                                        </div>
                                                        <div class="mt-4 inline-flex items-center px-2 py-1 rounded-md text-xs"
                                                            v-if="activeCoupon"
                                                            style="background-color: #F0F0F0; color: #333;">
                                                            <img src="/tag.png" class="w-4 h-4 mr-2" />
                                                            <span class="mr-2 text-xs">{{ activeCoupon }}</span>
                                                            <BaseIcon name="i-material-symbols-close-rounded"
                                                                class="w-4 h-4 text-gray-100 hover:text-red-500 cursor-pointer"
                                                                @click="removeCoupon" />
                                                        </div>
                                                        <div class="flex justify-between  mt-4  font-medium  text-sm">
                                                            <span class="text-gray-600">SubTotal . {{ selectedQuantity
                                                            }} items</span>
                                                            <span class="text-primary">${{ selectedTotal.toFixed(2)
                                                            }}</span>
                                                        </div>
                                                        <div class="flex justify-between mt-4 font-medium text-sm"
                                                            v-if="discount > 0">
                                                            <span class="text-customblack">Discount</span>
                                                            <span class="text-primary">- ${{ discount.toFixed(2)
                                                            }}</span>
                                                        </div>

                                                        <div class="flex justify-between mt-4 font-medium text-sm">
                                                            <span class="text-customblack">Shipping</span>
                                                            <span class="text-primary">${{ shipping.toFixed(2) }}</span>
                                                        </div>

                                                        <div class="flex justify-between font-medium text-[16px] my-4">
                                                            <span class="text-customblack">Total</span>
                                                            <span class="text-primary">${{ ((selectedTotal || 0) +
                                                                (shipping || 0) -
                                                                discount).toFixed(2) }}</span>
                                                        </div>
                                                    </div>


                                                </div>

                                                <!-- PayPal 按钮容器（仅当选中 PayPal） -->

                                            </template>

                                            <!-- 无商品 -->
                                            <template v-if="!hasItems">
                                                <div class="p-4">
                                                    <div class="text-gray-500 text-sm">No items selected.</div>
                                                    <NuxtLink to="/" class="mt-4 inline-flex">
                                                        <UButton size="lg"
                                                            class="rounded bg-primary hover:bg-[#00a9d8] text-white px-6">
                                                            Go shopping
                                                        </UButton>
                                                    </NuxtLink>
                                                </div>
                                            </template>
                                        </template>
                                    </section>
                                    <!-- Express Shipping -->
                                    <section class="rounded bg-white mb-4 p-4">
                                        <div class="flex items-center flex-col">
                                            <div class="text-customblack">Express checkout</div>
                                            <div id="paypal-express-button-container" class="py-2 w-[250px]"></div>
                                            <div
                                                class="text-gray-100 flex items-center justify-center font-[14px] w-full">
                                                <div class="bg-gray-100 w-full h-[1px]"></div>
                                                <div class="flex justify-center items-center mx-2">OR</div>
                                                <div class="bg-gray-100 w-full h-[1px]"></div>
                                            </div>
                                        </div>
                                    </section>

                                    <!-- Contact Email -->
                                    <section class="rounded bg-white">
                                        <div
                                            class="p-4 pb-[10px] text-customblack font-semibold text-base sm:text-lg flex items-center justify-between">
                                            <span>Contact Email</span>
                                            <button v-if="!isLoggedIn" class="text-sm font-normal text-customblack"
                                                @click="showSignIn = true">
                                                I have an account to
                                                <span class="text-primary ml-1">Sign In</span>
                                            </button>
                                        </div>
                                        <div class="p-4 pt-0">
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-4">
                                                <UFormGroup class="!mb-0">
                                                    <template #label>
                                                        <span class="flex items-center mb-2">
                                                            <span class="text-red-500 mr-2">*</span>
                                                            Email:
                                                            <UTooltip
                                                                text="We will send a message to this email address when there is new progress on the order"
                                                                :ui="{
                                                                    base: 'w-[200px] h-[60px] whitespace-pre-line'
                                                                }">
                                                                <img src="/question.png"
                                                                    class="w-4 h-4 ml-1 cursor-pointer" />
                                                            </UTooltip>
                                                        </span>
                                                    </template>
                                                    <UInput :disabled="queryFrom == 'order'" v-model="contactEmail"
                                                        placeholder="Contact Email" :ui="{
                                                            placeholder: 'placeholder-gray-300',
                                                            base: 'dark:!bg-white dark:!text-gray-900',
                                                            color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede]  focus:border-primary-500' } }
                                                        }" @change="() => { contactEmailError = '' }" />
                                                    <p class="text-red-500 text-sm mt-2">{{ contactEmailError }}</p>
                                                </UFormGroup>
                                            </div>
                                        </div>
                                    </section>

                                    <!-- Address (No saved) -->
                                    <section class="rounded bg-white mt-4" v-if="addressarr.length == 0">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">
                                            Delivery Address
                                        </div>
                                        <div class='p-4'>
                                            <UForm :state="form" ref="formRef" :validate="validateUForm"
                                                :validateOn="['submit']" layout="vertical"
                                                class="max-w-[980px] space-y-4">
                                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 mb-4">
                                                    <UFormGroup class="gap-4" name="firstName">
                                                        <template #label>
                                                            <span
                                                                class="flex items-center mb-2 text-[14px] text-gray-500">
                                                                <span class="text-red-500 mr-2">*</span>
                                                                First Name :
                                                            </span>
                                                        </template>
                                                        <UInput :disabled="queryFrom == 'order'"
                                                            v-model="form.firstName" placeholder="First Name" :ui="{
                                                                placeholder: 'placeholder-gray-300',
                                                                base: 'dark:!bg-white dark:!text-gray-900',
                                                                color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede]  focus:border-primary-500' } }
                                                            }" />
                                                    </UFormGroup>
                                                    <UFormGroup class="gap-4" name="lastName">
                                                        <template #label>
                                                            <span
                                                                class="flex items-center mb-2 text-[14px] text-gray-500">
                                                                <span class="text-red-500 mr-2">*</span>
                                                                Last Name :
                                                            </span>
                                                        </template>
                                                        <UInput :disabled="queryFrom == 'order'" v-model="form.lastName"
                                                            placeholder="Last Name" :ui="{
                                                                placeholder: 'placeholder-gray-300',
                                                                base: 'dark:!bg-white dark:!text-gray-900',
                                                                color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede]  focus:border-primary-500' } }
                                                            }" />
                                                    </UFormGroup>
                                                </div>

                                                <UFormGroup class="gap-4" name="address">
                                                    <template #label>
                                                        <span class="flex items-center mb-2 text-[14px] text-gray-500">
                                                            <span class="text-red-500 mr-2">*</span>
                                                            Street Address :
                                                        </span>
                                                    </template>
                                                    <AutoComplete :disabled="queryFrom == 'order'"
                                                        class="w-full text-[12px]" v-model:value="form.address"
                                                        :options="addressOptions" :loading="addrLoading"
                                                        placeholder="Street Address" @search="onAddressSearch"
                                                        @select="(_, option) => onAddressSelect(option as any)" />
                                                </UFormGroup>

                                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 mb-4">
                                                    <UFormGroup class="gap-4" name="country">
                                                        <template #label>
                                                            <span
                                                                class="flex items-center mb-2 text-[14px] text-gray-500">
                                                                <span class="text-red-500 mr-2">*</span>
                                                                Country/Region :
                                                            </span>
                                                        </template>
                                                        <USelectMenu :disabled="queryFrom == 'order'"
                                                            v-model="form.country" placeholder="Country"
                                                            value-attribute="value" label-attribute="label" searchable
                                                            searchable-placeholder="Search country..."
                                                            :options="countryarr.map(c => ({ label: c.countryName, value: c.countryCode }))"
                                                            :search-attributes="['label']" :ui="{
                                                                placeholder: 'placeholder-gray-300',
                                                                base: 'dark:!bg-white dark:!text-gray-900',
                                                                color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede] focus:border-primary-500' } }
                                                            }" :ui-menu="{
                                                                input: 'border-none focus:ring-1 focus:ring-gray-300',
                                                                option: {
                                                                    active: 'bg-primary-50',
                                                                }
                                                            }" />
                                                    </UFormGroup>
                                                    <UFormGroup class="gap-4" name="province">
                                                        <template #label>
                                                            <span
                                                                class="flex items-center mb-2 text-[14px] text-gray-500">
                                                                <span class="text-red-500 mr-2">*</span>
                                                                State/Province :
                                                            </span>
                                                        </template>
                                                        <USelectMenu :disabled="queryFrom == 'order'"
                                                            v-model="form.province" placeholder="State/Province"
                                                            value-attribute="value" label-attribute="label" searchable
                                                            searchable-placeholder="Search State/Province..."
                                                            :options="provincearr.map(p => ({ label: p.regionName, value: p.regionName }))"
                                                            :search-attributes="['label']" :ui="{
                                                                placeholder: 'placeholder-gray-300',
                                                                base: 'dark:!bg-white dark:!text-gray-900',
                                                                color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede] focus:border-primary-500' } }
                                                            }" :ui-menu="{
                                                                input: 'border-none focus:ring-1 focus:ring-gray-300',
                                                                option: {
                                                                    active: 'bg-primary-50',
                                                                }
                                                            }" />
                                                    </UFormGroup>
                                                </div>

                                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <UFormGroup class="gap-4" name="city">
                                                        <template #label>
                                                            <span
                                                                class="flex items-center mb-2 text-[14px] text-gray-500">
                                                                <span class="text-red-500 mr-2">*</span>
                                                                City :
                                                            </span>
                                                        </template>
                                                        <UInputMenu :disabled="queryFrom == 'order'" v-model="form.city"
                                                            placeholder="City"
                                                            :options="cityarr.map(c => ({ label: c.cityName, value: c.cityName }))"
                                                            :filter-option="filterOptionByLabel" :ui="{
                                                                placeholder: 'placeholder-gray-300',
                                                                base: 'dark:!bg-white dark:!text-gray-900',
                                                                color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede] focus:border-primary-500' } }
                                                            }" :ui-menu="{
                                                                option: {
                                                                    active: 'bg-primary-50',
                                                                }
                                                            }" />
                                                    </UFormGroup>

                                                    <UFormGroup class="gap-4" name="postalCode">
                                                        <template #label>
                                                            <span
                                                                class="flex items-center mb-2 text-[14px] text-gray-500">
                                                                <span class="text-red-500 mr-2">*</span>
                                                                Zip Code :
                                                            </span>
                                                        </template>
                                                        <UInput :disabled="queryFrom == 'order'"
                                                            v-model="form.postalCode" placeholder="Zip Code" :ui="{
                                                                placeholder: 'placeholder-gray-300',
                                                                base: 'dark:!bg-white dark:!text-gray-900',
                                                                color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede] focus:border-primary-500' } }
                                                            }" />
                                                    </UFormGroup>
                                                </div>

                                                <UFormGroup name="number">
                                                    <template #label>
                                                        <span class="flex items-center mb-2 text-[14px] text-gray-500">
                                                            <span class="text-red-500 mr-2">*</span>
                                                            Number :
                                                        </span>
                                                    </template>
                                                    <div class="flex gap-2">
                                                        <UInputMenu :disabled="queryFrom == 'order'"
                                                            v-model="form.numberCode" class="!w-24" show-search
                                                            :filter-option="filterOptionByLabel" s
                                                            :options="countries.map(code => ({ label: code, value: code }))"
                                                            :ui="{
                                                                placeholder: 'placeholder-gray-300',
                                                                base: 'dark:!bg-white dark:!text-gray-900',
                                                                color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede] focus:border-primary-500' } }
                                                            }" :ui-menu="{
                                                                option: {
                                                                    active: 'bg-primary-50',
                                                                }
                                                            }" />
                                                        <UInput :disabled="queryFrom == 'order'" v-model="form.number"
                                                            class="flex-1" placeholder="Number" :ui="{
                                                                placeholder: 'placeholder-gray-300',
                                                                base: 'dark:!bg-white dark:!text-gray-900',
                                                                color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede] focus:border-primary-500' } }
                                                            }" />
                                                    </div>
                                                </UFormGroup>

                                                <UFormGroup v-if="isLoggedIn" class="!mb-0">
                                                    <UCheckbox :disabled="queryFrom == 'order'" v-model="form.master"
                                                        label="Set as default address" />
                                                </UFormGroup>
                                            </UForm>
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
                                                    <span class="text-customblack text-sm mb-1 block">Full name</span>
                                                    <div class="font-medium text-sm text-gray-300">
                                                        {{ addressinfo.firstName }} {{ addressinfo.lastName }}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span class="text-blackcolor text-sm mb-1 block">Number</span>
                                                    <div class="font-medium text-sm text-gray-300">
                                                        ({{ addressinfo.numberCode }}) {{ addressinfo.number }}
                                                    </div>
                                                </div>
                                                <div class="col-span-2">
                                                    <span class="text-blackcolor text-sm mb-1 block">Address
                                                        detail</span>
                                                    <div class="font-medium text-sm text-gray-300">
                                                        {{ addressinfo.countryName }} {{ addressinfo.provinceName }} {{
                                                            addressinfo.city }}
                                                        {{ addressinfo.address }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-show="queryFrom != 'order'"
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
                                            <USelectMenu v-model="shippingRuleFeeId" :options="templates"
                                                value-attribute="feeId" label-attribute="label"
                                                :disabled="queryFrom === 'order' || shippingRuleFeeId === -1 || shippingRuleFeeId === '-1'"
                                                :search-attributes="['label']" placeholder="Select Shipping Method" :ui="{
                                                    placeholder: 'placeholder-gray-300',
                                                    base: 'dark:!bg-white dark:!text-gray-900',
                                                    color: { white: { outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede] focus:border-primary-500' } }
                                                }" :ui-menu="{
                                                    input: 'border-none focus:ring-1 focus:ring-gray-300',
                                                    option: {
                                                        active: 'bg-primary-50',
                                                    }
                                                }" />
                                            <!-- <Select v-model:value="shippingRuleFeeId" :options="templates"
                                                :field-names="{ label: 'label', value: 'feeId' }"
                                                :disabled="queryFrom === 'order' || shippingRuleFeeId === -1 || shippingRuleFeeId === '-1'"
                                                :filter-option="filterOptionByLabel"
                                                placeholder="Select Shipping Method"
                                                class="w-full h-10 [&_.ant-select-selector]:!h-10 [&_.ant-select-selection-item]:!leading-10 [&_.ant-select-selection-placeholder]:!leading-10 rounded-md"
                                                :get-popup-container="node => node.parentNode" /> -->
                                        </div>
                                    </section>

                                    <!-- <div class="flex justify-end mt-4">
                                        <UButton @click="checkPageInfo"
                                            class="rounded bg-primary hover:bg-[#00a9d8] text-white px-6">
                                            Save Address
                                        </UButton>
                                    </div> -->
                                    <!-- Payment -->
                                    <section class="rounded bg-white mt-4">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">
                                            Payment Methods <span style="color: red;">*</span>
                                        </div>

                                        <div class="grid grid-cols-1 p-4 pt-[10px]">
                                            <div v-for="(option, _) in paymentList" :key="option.value" class=""
                                                :class="option.value !== PayMethodKey.paypal ? 'mt-4' : ''">
                                                <div class="flex items-center">
                                                    <div class="flex items-center space-x-2 px-4 py-[6px] rounded cursor-pointer"
                                                        :class="selected === option.value ? 'border border-primary' : 'border border-[#F0F0F0]'"
                                                        @click="selected = option.value">
                                                        <input type="radio" :value="option.value" v-model="selected"
                                                            class="form-radio h-4 w-4 text-primary border-[#d9d9d9] focus:border-none focus:ring-0 focus:outline-none  focus:shadow-none" />
                                                        <label class="flex items-center space-x-2 cursor-pointer">
                                                            <img :src="option.icon" class="h-8 sm:h-[50px]" />
                                                        </label>
                                                    </div>

                                                    <!-- ✅ 选中后的文字/图标展示 -->
                                                    <div v-if="option.value === PayMethodKey.paypal"
                                                        class="text-d3black text-sm ml-2 font-medium">
                                                        Paypal
                                                    </div>
                                                    <div v-if="option.value === PayMethodKey.airwallexCard"
                                                        class="flex flex-col items-start ml-2">
                                                        <div class="text-sm text-d3black font-medium">Credit/Debit Card
                                                        </div>
                                                        <div class="text-[10px] text-d3black my-1 font-medium">We
                                                            support
                                                            these credit
                                                            card types</div>
                                                        <div class="flex gap-[6px]">
                                                            <img src="/images/international.png" class="w-10 h-5" />
                                                            <img src="/images/international1.png" class="w-10 h-5" />
                                                            <img src="/images/international2.png" class="w-10 h-5" />
                                                            <img src="/images/international3.png" class="w-10 h-5" />
                                                        </div>
                                                    </div>
                                                    <div v-if="option.value === PayMethodKey.googlepay"
                                                        class="text-d3black text-sm ml-2 font-medium">
                                                        GooglePay
                                                    </div>
                                                    <div v-if="option.value === PayMethodKey.applepay"
                                                        class="text-d3black text-sm ml-2 font-medium">
                                                        ApplePay
                                                    </div>
                                                </div>
                                                <div>
                                                    <!-- ✅ Airwallex Split Card 输入区（卡号整行；下行 Expiry+CVC 横排） -->
                                                    <div :class="['py-2']"
                                                        v-show="option.value == PayMethodKey.airwallexCard && selected == PayMethodKey.airwallexCard">
                                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                                            v-if="option.value == PayMethodKey.airwallexCard">
                                                            <!-- 顶部：卡号独占整行 -->
                                                            <div
                                                                class="border border-[#D9D9D9] rounded p-2 md:col-span-2">
                                                                <label class="block text-xs text-gray-500 mb-1">Card
                                                                    number</label>
                                                                <div :id="`awx-card-number`"></div>
                                                            </div>

                                                            <!-- 底部左：有效期 -->
                                                            <div class="border border-[#D9D9D9] rounded p-2">
                                                                <label
                                                                    class="block text-xs text-gray-500 mb-1">Expiration
                                                                    date</label>
                                                                <div :id="`awx-expiry`"></div>
                                                            </div>

                                                            <!-- 底部右：CVC -->
                                                            <div class="border border-[#D9D9D9] rounded p-2">
                                                                <label class="block text-xs text-gray-500 mb-1">Security
                                                                    code</label>
                                                                <div :id="`awx-cvc`"></div>
                                                            </div>
                                                        </div>

                                                        <!-- 内联错误提示 -->
                                                        <p v-if="awxError" class="text-red-500 text-sm mt-2">{{ awxError
                                                        }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <!-- Notes -->
                                    <section class="rounded bg-white mt-4">
                                        <div class="p-4 pb-0 text-customblack font-semibold text-base sm:text-lg">Notes
                                        </div>
                                        <div class="p-4 pt-[10px]">
                                            <UTextarea class="dark:bg-white" :disabled="queryFrom == 'order'"
                                                v-model="notes" placeholder="Enter you order notes" :ui="{
                                                    color: {
                                                        white: {
                                                            outline:
                                                                'shadow-sm bg-white dark:bg-white placeholder-[#EAEAEA] focus:ring-1 focus:ring-primary text-gray-900 ring-1 ring-inset ring-[rgba(0,0,0,0.15)]'
                                                        }
                                                    }
                                                }" />
                                        </div>
                                    </section>

                                </template>

                                <!-- 无商品空态 -->
                                <template v-else>
                                    <section class="rounded bg-white">
                                        <div
                                            class="p-8 py-16 flex flex-col items-center justify-center text-center md:h-[90vh] ">
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
                    <div class="w-[40%] max-md:w-[100%] bg-white rounded shadow-sm min-h-[200px] max-md:min-h-0"
                        v-if="hasItems || !isProductLoaded">
                        <div
                            class="p-4 text-[#0c1013] font-semibold text-base sm:text-lg hidden  md:flex items-center justify-between">
                            Selected {{ selectedQuantity }} items
                            <div class="px-2 items-center justify-center max-md:flex hidden"
                                :class="{ 'rotate-180': !isSummaryOpen, 'rotate-0': isSummaryOpen }"
                                @click="changeSummaryOpen">
                                <UIcon name="i-ic:sharp-keyboard-arrow-up" class="w-6 h-6 text-[#0c1013]" />
                            </div>
                        </div>
                        <!-- 加载完成 -->
                        <template v-if="isProductLoaded">
                            <!-- 有商品 -->
                            <template v-if="hasItems">
                                <div class="overflow-y-auto px-4 md:max-h-[43vh] md:block hidden"
                                    v-show="isSummaryOpen">
                                    <div class=" bg-white pb-4 " v-for="item in productlists" :key="item.productSku">
                                        <div class="flex  gap-2  w-full h-full">
                                            <NuxtImg
                                                :src="`${item.mainPic}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0`"
                                                :alt="item.altText || 'Product image'"
                                                class="w-20 h-20 rounded-[4px] object-cover" />
                                            <div class="flex flex-col flex-1">
                                                <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                    :title="item.productName"
                                                    :overlayStyle="{ whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                    <div
                                                        class="font-semibold text-sm text-blackcolor line-clamp-2 mt-2">
                                                        {{ item.productName }}
                                                    </div>
                                                </Tooltip>

                                                <div class="text-sm font-medium mt-2">
                                                    ${{ item.productPrice }} x {{ item.qtyOrdered }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" text-[#AEAEAE] font-normal text-[14px] leading-5 mt-1 px-2">
                                            <div v-for="(spec, i) in getSpecArray(item?.skuPropList)" :key="i"
                                                class="whitespace-normal">
                                                {{ spec.label }}
                                                <span class="text-[#0C1013] ml-1">{{ spec.value
                                                    }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="px-4 bg-white max-md:py-4">
                                <!-- Coupon -->
                                <div class="">
                                    <div class="flex gap-2 text-white">
                                        <Input :disabled="queryFrom == 'order'" v-model:value="couponCode"
                                            placeholder="Enter the coupon code"
                                            class="flex-1 border border-gray-300 focus:border-primary focus:ring-primary text-customblack placeholder-[#EAEAEA]"
                                            @input="resetCouponError" />
                                        <UButton @click="applyCoupon" :disabled="!couponCode || applyLoading"
                                            :loading="applyLoading"
                                            class="shrink-0 rounded px-4 text-white dark:text-white"
                                            :class="[(!couponCode) ? '!bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-[#00a9d8]']">
                                            Apply
                                        </UButton>
                                    </div>
                                    <div v-if="couponError" class="text-red-500 text-sm mt-1">{{ couponError }}
                                    </div>
                                    <div class="mt-4 inline-flex items-center px-2 py-1 rounded-md text-xs"
                                        v-if="activeCoupon" style="background-color: #F0F0F0; color: #333;">
                                        <img src="/tag.png" class="w-4 h-4 mr-2" />
                                        <span class="mr-2 text-xs">{{ activeCoupon }}</span>
                                        <BaseIcon name="i-material-symbols-close-rounded"
                                            class="w-4 h-4 text-gray-100 hover:text-red-500 cursor-pointer"
                                            @click="removeCoupon" />
                                    </div>
                                    <div class="flex justify-between  mt-4  font-medium  text-sm">
                                        <span class="text-gray-600">SubTotal . {{ selectedQuantity }} items</span>
                                        <span class="text-primary">${{ selectedTotal.toFixed(2) }}</span>
                                    </div>
                                    <div class="flex justify-between mt-4 font-medium text-sm" v-if="discount > 0">
                                        <span class="text-customblack">Discount</span>
                                        <span class="text-primary">- ${{ discount.toFixed(2) }}</span>
                                    </div>

                                    <div class="flex justify-between mt-4 font-medium text-sm">
                                        <span class="text-customblack">Shipping</span>
                                        <span class="text-primary">${{ shipping.toFixed(2) }}</span>
                                    </div>

                                    <div class="flex justify-between font-medium text-[16px] my-4">
                                        <span class="text-customblack">Total</span>
                                        <span class="text-primary">${{ ((selectedTotal || 0) + (shipping || 0) -
                                            discount).toFixed(2) }}</span>
                                    </div>

                                </div>
                                <div v-show="selected === PayMethodKey.paypal" id="paypal-button-container"
                                    class="!z-10"></div>
                                <!-- Airwallex 支付按钮（仅当选中 Airwallex） -->
                                <div v-show="selected === PayMethodKey.airwallexCard" class="">
                                    <UButton size="lg" :loading="awxPayLoading"
                                        class="w-full rounded bg-primary hover:bg-[#00a9d8] text-white dark:text-white items-center justify-center"
                                        @click="handleAirwallexCardPayPay">
                                        {{ awxPayLoading ? 'Processing...' : 'Pay Now' }}
                                    </UButton>
                                </div>
                                <div v-show="selected === PayMethodKey.googlepay" class="">
                                    <div id="awx-google-pay"></div>
                                    <p v-if="gpayError" class="text-red-500 text-sm mt-2">{{ gpayError }}</p>
                                </div>
                                <div v-show="selected === PayMethodKey.applepay" class="">
                                    <div id="awx-apple-pay"></div>
                                    <p v-if="awxAppleError" class="text-red-500 text-sm mt-2">{{ awxAppleError
                                        }}</p>
                                </div>
                            </div>
                            <!-- 无商品 -->
                            <template v-if="!hasItems">
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
                    </div>
                </div>
            </div>
        </div>

        <!-- Address Select Modal -->
        <UModal v-model="showModal" width="w-full"
            :ui="{ width: 'sm:max-w-5xl', rounded: 'rounded', container: 'items-center' }">
            <section class="border border-blackcolor/10 rounded dark:bg-white">
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
                        :class="{ 'border-primary-500 bg-primary-50': item.selected == 1 }" @click="selectAddress(idx)">
                        <div class="space-y-1 text-gray-500">
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
        <UModal v-model="isOpen" :ui="{ container: 'items-center', wrapper: 'z-[1000]' }">
            <div class="p-8 flex justify-center">
                <div class="text-center">
                    <div>{{ changedesc }}</div>
                    <UButton class="mt-6 rounded" @click="refreshPage">Refresh</UButton>
                </div>
            </div>
        </UModal>

        <!-- Sign In Modal -->
        <UModal v-model="showSignIn"
            :ui="{ width: 'sm:max-w-md', rounded: 'rounded-xl', container: 'items-center', wrapper: 'z-[999]', base: 'dark:bg-white' }">
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
                            color: { white: { outline: 'dark:bg-white ring-1 ring-[rgba(0,0,0,0.15)] focus:ring-1 focus:ring-primary' } },
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
                        <button block size="large" class="mt-6 rounded-md" :loading="signingIn" @click="handleSignIn">
                            Sign in
                        </button>
                    </div>

                    <div class="flex items-center my-4">
                        <div class="flex-1 h-px bg-[#f0f0f0]"></div>
                        <span class="mx-2 text-gray-400 text-sm">or</span>
                        <div class="flex-1 h-px bg-[#f0f0f0]"></div>
                    </div>

                    <div>
                        <UButton block variant="outline" size="lg" class="rounded-md" :ui="{
                            variant: {
                                outline: 'ring-0 shadow-none bg-white hover:dark:bg-white hover:bg-gray-50 border !border-[#D9D9D9]'
                            }
                        }" @click="socialLogin('google')">
                            <div class="flex items-center justify-center text-customblack font-normal">
                                <img src="/images/google.png" class="w-5 h-5 mr-2" />
                                <span>Sign in With Google</span>
                            </div>
                        </UButton>
                        <UButton block variant="outline" class="mt-4 rounded-md" :ui="{
                            variant: {
                                outline: 'ring-0 shadow-none bg-white border hover:dark:bg-white !border-[#D9D9D9]'
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
import { Input, AutoComplete, notification } from 'ant-design-vue';
import { loadScript } from '@paypal/paypal-js';
import { useCartStore } from '@/stores/cart';
import { message, Tooltip } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { formatPaypalUtcToLocal, formatUtcToLocal } from '~/utils/format';
import { useGoogleMapsLoader } from '@/composables/useGoogleMapsLoader'
const { addPaymentInfo: fbqAddPaymentInfo, purchase: fbqPurchase } = useFbq({ currency: 'USD' });
const { purchaseorder: gtmPurchase, addPaymentInfo: gtmAddPaymentInfo } = useTrack();
const { getuserAddressRollPage, createUserAddress } = AddressAuth();
const { getmapProductSpuV2ByProductSkuV2IdList } = ProductAuth();
const { generateOrderId, createOrder, updateOrder, getUserOrderDocByOrderNumber, tryOrder } = OrderAuth();
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
const isSummaryOpen = ref(true);
const { isMobile, windowWidth } = useMobile();
const signingIn = ref(false);
const showSignIn = ref(false);
const signinForm = reactive({ email: '', password: '' });

const awxClientSecret = ref<string>('');
const awxIntentId = ref<string>('');

// 新增：加载与骨架屏控制
const isProductLoaded = ref(false);
const paypalRendered = ref(false);

const paypalpaymentid = ref('');
const cart = useCartStore();
const { getCart } = cartAuth();
const changedesc = ref('');
const isOpen = ref(false);

const orderNo = ref('') as any;
const orderInfo = ref({}) as any;
const productlists = ref([]) as any;
const skuList = ref([]) as any;
const orderId = ref('');
const sku = route.query.sku as any;
const number = route.query.number as any;
const cartarr = ref([]) as any;
let skunum = {} as any;

import { usePlacesAutocomplete, pickAddress, getCity as pickCityFromGmp, getStreet as pickStreetFromGmp } from '@/composables/usePlacesAutocomplete'
import type { FormError, FormSubmitEvent } from '#ui/types'

/**********新代码    */
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
        console.log('Parsed cart items===:', cartarr.value, skunum.value, skuList.value)
        await getProductlist()
    } catch (e) {
        console.error('getCart error:', e)
    } finally {
        if (!isProductLoaded.value) {
            isProductLoaded.value = true
        }
    }
}
const handleGetOrder = async () => {
    const orderNumber = route.query.orderNo as any;
    orderNo.value = orderNumber;
    try {
        const res = await getUserOrderDocByOrderNumber({ orderNumber });
        const result = res.result;
        orderInfo.value = result;
        orderId.value = result.id;

        productlists.value = result.orderItemList.map((item: any) => ({
            productId: item.id,
            productName: item.productName,
            mainPic: item.productImage,
            productSku: item.productSku, // 实际的 SKU 字符串
            productSkuString: item.productSku, // 实际的 SKU 字符串（备用）
            qtyOrdered: item.qtyOrdered,
            productPrice: item.priceOrdered,
            productStyle: item.productSpu,
            // 添加新的字段用于订单创建
            productSpuId: item.productSpuId, // SPU ID
            productSkuId: item.productSkuId, // SKU ID  
            skuPropList: item.skuPropList || [], // 从 skuData 中获取 propList
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
        if (!contactEmail.value) contactEmail.value = result.buyerEmail;
        templates.value = [result.shippingRule];
        templates.value.forEach((item: any) => {
            item.label = `${item.feeEnName}　　${item.daysFrom}–${item.daysTo} days　　$${item.calFee.toFixed(2)}`;
        });
        shippingRuleFeeId.value = result.shippingRule.feeId;
        activeCoupon.value = result.marketingActivityCouponCode || '';
        discount.value = result.marketingActivityDiscountAmount || 0;
    } catch (e) {
        console.error(e);
    } finally {
        isProductLoaded.value = true;
    }
};
/********初始化相关 */
const queryFrom = route.query.from as any; // 区分来源
if (queryFrom == 'cart') {
    handleGetCart();
} else if (queryFrom == 'order') {
    handleGetOrder();
}
if (sku) {
    skuList.value = [sku];
    skunum[sku] = number;
    getProductlist();
}


const countryarr = ref([]) as any;
const provincearr = ref([]) as any;
const cityarr = ref([]) as any;
const countries = computed(() => countryarr.value.map((c: any) => c.phone));
const contactEmail = ref<string>('');
const contactEmailError = ref<string>('');
const formRef = ref(null);
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


const addressarr = ref([]) as any;
const addressinfo = ref({}) as any;
const shippingRuleFeeId = ref(0) as any;
const templates = ref([]) as any;

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
            resetPlacesSession?.()
            form.value.province = null as any
            form.value.city = '' as any
            getShippingRulelist()
            getProvince()
        }
    }
)

watch(
    () => form.value.province,
    (v) => {
        if (v) {
            form.value.city = '' as any
            getCity()
        }
    }
)

watch(
    () => form.value,
    (v) => {
        formRef.value?.setErrors([]);
    }, { deep: true }
)

onMounted(async () => {
    const regEmail = (userinfoCookie.value && (userinfoCookie.value.email || userinfoCookie.value.userEmail)) || '';
    if (regEmail) contactEmail.value = regEmail;
    if (!contactEmail.value && (addressinfo.value as any)?.email) contactEmail.value = (addressinfo.value as any).email;
    if (isMobile.value) {
        isSummaryOpen.value = false;
    }
    await getAddresslist();
    await getCountrylist();
    // 若数据已就绪，尝试渲染 PayPal
    // tryRenderPaypalButtons();
    const g = await useGoogleMapsLoader({ libraries: ['places'] })
    // ✅ 可以安全使用 Google Maps 对象了
    const ac = new g.maps.places.AutocompleteService()
    try {
        await initAirwallex();
        // await mountAirwallexSplit();
    } catch { }

});


const getCountrylist = async () => {
    try {
        const res = await listCountryAll();
        countryarr.value = res.result;
        console.log('Fetched country list:', countryarr.value); // 调试输出
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

const getAddresslist = async () => {
    if (!isLoggedIn.value) return; // 已登录用户不重复获取地址列表
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

const addNewAddress = async () => {
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

/********表单相关代码 */
const validateUForm = (state: any): FormError[] => {
    const errors = []
    if (!state.firstName) errors.push({ path: 'firstName', message: 'Please enter your First Name' });
    if (!state.lastName) errors.push({ path: 'lastName', message: 'Please enter your Last Name' });
    if (!state.address) errors.push({ path: 'address', message: 'Please enter your Street Address' });
    if (!state.postalCode) errors.push({ path: 'postalCode', message: 'Please enter your Zip Code' });
    if (!state.country) errors.push({ path: 'country', message: 'Please select your Country' });
    if (!state.province) errors.push({ path: 'province', message: 'Please select your State/Province' });
    if (!state.city) errors.push({ path: 'city', message: 'Please enter your City' });
    if (!state.numberCode) errors.push({ path: 'numberCode', message: 'Please enter your Phone Number Code' });
    if (state.number) {
        const phoneError = validatePhoneNumber(state.number);
        if (phoneError) errors.push({ path: 'number', message: phoneError });
    } else {
        errors.push({ path: 'number', message: 'Please enter your Phone Number' });
    }
    console.log('Validating form state:', state, errors) // 调试输出
    return errors
}

const triggerValidation = async () => {
    try {
        if (!contactEmail.value) {
            contactEmailError.value = 'Please enter your Contact Email';
        } else {
            const emailError = validateEmail(contactEmail.value);
            if (emailError) {
                contactEmailError.value = emailError;
            } else {
                contactEmailError.value = '';
            }
        }
        const res = await formRef.value.validate();
        if (contactEmailError.value) return;
        const countryName = countryarr.value.find((c: any) => c.countryCode === form.value.country)?.countryName || '';
        return { ...res, contactEmail: contactEmail.value, countryName: countryName };
        console.log('Validation result:', res, contactEmail); // 调试输出
    } catch (error) {
        console.error('Validation error:', error);
    }
};

const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!value) {
        return 'Contact Email is required';
    }
    if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
    }
    return '';
};

const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^[0-9]{7,15}$/; // 允许 7 到 15 位数字
    if (!value) {
        return 'Phone number is required'
    }
    if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number'
    }
    return '';
};

const validateInfo = () => {
    let msg = ''
    msg = validateEmail(contactEmail.value)
    if (msg) {
        contactEmailError.value = msg
        return msg
    }
    msg = validatePhoneNumber(isLoggedIn.value ? addressinfo.value.number : form.value.number)
    if (msg) {
        return msg
    }
    return '';
};



/*************支付方式相关 */
const PayMethodKey = {
    'paypal': 'paypal',
    'airwallexCard': 'airwallexCard',
    'googlepay': 'googlepay',
    'applepay': 'applepay',
    'paypal_shipping_module': 'paypal_shipping_module' // 快捷支付
}
const paymentList = [
    { value: PayMethodKey.paypal, label: 'paypal', icon: '/images/paypal.png' },
    { value: PayMethodKey.airwallexCard, label: 'airwallex', icon: '/images/mastercard.png' },
    { value: PayMethodKey.googlepay, label: 'googlepay', icon: '/images/googlepay.png' },
    { value: PayMethodKey.applepay, label: 'applepay', icon: '/images/applepay.png' } // ← 新增
];
const selected = ref(PayMethodKey.airwallexCard);
const SelectedMap = {
    [PayMethodKey.paypal_shipping_module]: 'PayPal Express',
    [PayMethodKey.paypal]: 'PayPal',
    [PayMethodKey.airwallexCard]: 'Credit/Debit Card',
    [PayMethodKey.googlepay]: 'Google Pay',
    [PayMethodKey.applepay]: 'Apple Pay'
}
const ExpectPaymentMethodTypeMap = {
    [PayMethodKey.paypal_shipping_module]: 'paypal_shipping_module',
    [PayMethodKey.paypal]: 'paypal',
    [PayMethodKey.airwallexCard]: 'airwallex',
    [PayMethodKey.googlepay]: 'airwallex_google_pay',
    [PayMethodKey.applepay]: 'airwallex_apple_pay'
}
// 计算应付总额（与右侧汇总保持一致）
const totalPayable = computed(() => {
    // 如果服务端已经返回权威金额，则以它为准
    if (awxAmount.value != null && Number.isFinite(awxAmount.value)) {
        return Number(awxAmount.value.toFixed(2));
    }
    // 否则退回到本地汇总
    return Number(((selectedTotal.value || 0) + (shipping.value || 0) - (discount.value || 0)).toFixed(2));
});

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

async function initAirwallex(): Promise<void> { // 初始化 AWX SDK
    if (awxInited.value) return;
    const AWX = await getAWX();
    const config = useRuntimeConfig();
    const env = config.public.airwallexEnv; // 从 nuxt.config 获取环境配置
    await AWX.init({
        env: env,
        langKey: 'en',
        origin: window.location.origin,
        enabledElements: ['payments'] // 新版必须启用 payments
    });
    awxInited.value = true;
}

const airWallexCaptureOrder = async (token: string) => {  //支付成功后
    try {
        await airwallexCapturePaymentIntents({ airwallexPaymentIntentsId: token });
    } catch (e) {
        console.error(e);
    }
};


async function ensureAwxPaymentIntent({ payType }: { payType?: string } = {}): Promise<string> {
    // 1) 确保有 orderId
    if (!orderId.value) {
        try {
            const res = await generateOrderId();
            orderId.value = res.result;
        } catch (e: any) {
            let msg = `${SelectedMap[selected.value]} order creation failed:`;
            message.error(msg + (e?.message || 'Failed to generate order id'));
            throw new Error('ORDER_PREPARE_FAILED');
        }
    }

    try {
        const createOrderParams = buildCreateOrderParams()
        const createRes = orderNo.value ? await updateOrder(createOrderParams) : await createOrder(createOrderParams);
        if (createRes?.result?.orderNumber) {
            orderNo.value = createRes.result.orderNumber;
        }
    } catch (err: any) {
        let msg = `${SelectedMap[selected.value]} order creation failed:`;
        try {
            const parsed = JSON.parse(err.message || '{}');
            msg = msg + parsed.enDesc || msg;
            const ek = parsed.errorKey;
            if (ek === 'calFee' || ek === 'priceOrdered' || ek === 'amountOrdered') {
                changedesc.value = parsed.enDesc;
                isOpen.value = true;
            }
        } catch { }
        message.error(msg);
        throw new Error('ORDER_CREATE_FAILED');
    }

    // 3) 创建 PaymentIntent —— 这里传入你指定的 payType
    if (!awxClientSecret.value) {
        try {
            const payTypeT = payType || ExpectPaymentMethodTypeMap[selected.value];
            const payParams = { payType: payTypeT, createSource: 'orderPay', bindIdList: [orderId.value] };
            const payRes = await createPayment(payParams);
            const { id, clientSecret, amount, currency } = extractAwxFromCreatePayment(payRes);
            if (!clientSecret) throw new Error('Missing Airwallex client_secret');

            awxClientSecret.value = clientSecret;
            awxIntentId.value = id || '';

            // ✅ 以服务端返回为准的金额 & 币种
            if (Number.isFinite(amount)) awxAmount.value = Number(amount);
            if (currency) awxCurrency.value = currency;
        } catch (e: any) {
            message.error(e?.message || 'Failed to create payment intent');
            throw new Error('PAYMENT_INTENT_FAILED');
        }
    }

    return awxClientSecret.value;
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

function redirectPayFail({ method, msg }: { method: string, msg?: string }) {
    if (orderNo.value) {
        console.log('重定向到失败 with params:', method, orderId.value, orderNo.value); // 调试输出
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

const redirectPaySuccess = (data: {}) => {
    const pramas = {
        orderNo: orderNo.value,
        createTime: formatUtcToLocal(new Date().toISOString()),
        currency: 'USD',
        totalAmount: totalPayable.value.toFixed(2),
        ...data
    }
    console.log('重定向到成功 with params:', pramas); // 调试输出
    router.replace({
        path: '/paysuccess',
        query: pramas
    });
}

const checkPageInfo = async () => {
    let isSuccess = true
    let addressData: any = {};
    if (!contactEmail.value) {
        contactEmailError.value = 'Contact Email is required';
    } else {
        const emailError = validateEmail(contactEmail.value);
        if (emailError) {
            contactEmailError.value = emailError;
        } else {
            contactEmailError.value = '';
        }
    }
    if (contactEmailError.value) {
        isSuccess = false;
        message.error(contactEmailError.value);
        return isSuccess;
    }
    if (addressinfo.value?.address) {
        Object.assign(addressData, { contactEmail: contactEmail.value });
        addressData = addressinfo.value;
    } else {
        addressData = await triggerValidation();
        if (userType.value == 1 && addressData?.address) {  // 登录用户
            const res = await addNewAddress();
            if (!res) return;
            getAddresslist();
        }
    }
    if (!addressData?.address) {
        message.error('Please fill in the shipping information');
        isSuccess = false;
        return isSuccess;
    }
    addressinfo.value = { ...addressinfo.value, ...addressData };
    if (shippingRuleFeeId.value < 0) {
        message.error('The current country does not support delivery, please change the delivery address');
        isSuccess = false;
        return isSuccess;
    };
    if (!shippingRuleFeeId.value) {
        message.error('Shipping methods is required');
        isSuccess = false;
        return isSuccess;
    };

    if (!(productlists.value.length > 0)) {
        message.error('No products to purchase');
        isSuccess = false;
        return isSuccess;
    }
    console.log('提交验证后的信息:', addressinfo.value, shippingRuleFeeId.value, productlists.value); // 调试输出
    return isSuccess;
}


/*********三方收集相关 */
function buildFbqPayload() {
    const contents = productlists.value.map((it: any) => ({
        id: it.productSku || it.productStyle || it.productName,
        quantity: Number(it.qtyOrdered) || 1,
        item_price: Number(it.productPrice) || 0
    }));
    const value = contents.reduce((s: number, c: any) => s + (c.item_price || 0) * (c.quantity || 1), 0);
    const content_ids = contents.map((c: any) => c.id);
    const num_items = contents.reduce((s: number, c: any) => s + (c.quantity || 1), 0);
    const params = {
        value,
        payment_type: SelectedMap[selected.value],
        currency: 'USD',
        content_ids,
        contents,
        order_id: orderNo.value || orderId.value,
        content_type: 'product',
        num_items
    }
    return params;
}

const buildGtmPayload = () => {
    const currency = 'USD';
    const items = productlists.value.map((it: any) => ({
        item_id: it.productId,
        item_name: it.productName,
        item_variant: it.productSkuId,
        price: Number(it.productPrice || 0).toFixed(2),
        quantity: Number(it.qtyOrdered) || 1,
        currency: currency
    }));
    const value = items.reduce((s: number, c: any) => s + (c.price || 0) * (c.quantity || 1), 0);
    const params = {
        payment_type: SelectedMap[selected.value],
        transaction_id: orderNo.value || orderId.value,
        value: Number(value).toFixed(2),
        currency: currency,
        items: items,
        coupon: activeCoupon.value || undefined,
        shipping: Number(shipping.value).toFixed(2),
        email: contactEmail.value || addressinfo.value.email,
        phone_number: `${addressinfo.value.numberCode}${addressinfo.value.number}`,
    }
    return params;
};

const buildCreateOrderParams = ({ payMethodKey }: { payMethodKey?: string } = {}) => {
    const orderItemList = (productlists.value || []).map((item: any) => ({
        productSku: item.productSku,
        productSkuId: item.productSkuId,
        productSpu: item.productStyle,
        productSpuId: item.productSpuId,
        productName: item.productName,
        productImage: item.mainPic?.url,
        qtyOrdered: Number(item.qtyOrdered),
        priceOrdered: Number(item.productPrice).toFixed(2),
        amountOrdered: (Number(item.productPrice) * Number(item.qtyOrdered)).toFixed(2),
        skuPropList: item.skuPropList || []
    }));
    console.log('--buildCreateOrderParams-----', productlists.value, orderItemList);
    const params = {
        buyerCity: addressinfo.value.city,
        buyerCountryCode: addressinfo.value.country,
        buyerCountryName: addressinfo.value.countryName,
        buyerEmail: contactEmail.value || addressinfo.value.email || form.value.email,
        buyerFirstName: addressinfo.value.firstName,
        buyerAddress: addressinfo.value.address,
        buyerLastName: addressinfo.value.lastName,
        buyerNotes: notes.value,
        buyerPhoneAreaCode: addressinfo.value.numberCode,
        buyerPhoneNumber: addressinfo.value.number || (form.value as any)?.number,
        buyerPostalCode: addressinfo.value.postalCode,
        buyerStateOrProvince: addressinfo.value.province,
        id: orderId.value,
        shippingRuleFeeId: shippingRuleFeeId.value,
        shippingRule: { calFee: Number(shipping.value) || 0 },
        create: true,
        orderItemList,
        marketingActivityCouponCode: activeCoupon.value || undefined,
        expectPaymentMethodType: payMethodKey || ExpectPaymentMethodTypeMap[selected.value],
        ...(queryFrom === 'cart'
            ? {
                choiceUserShoppingCartList: (cartarr.value || []).map((el: any) => ({
                    id: el.id,
                    productQuantity: clampQty(skunum[el.productSku] ?? el.productQuantity)
                }))
            }
            : {})
    }
    return params;
}

const collectAddPaymentEvent = (data: any = {}) => {
    const fbqPayload = { ...buildFbqPayload(), ...data };
    try {
        fbqAddPaymentInfo(fbqPayload);
    } catch (e) {
        console.error('fbq AddPaymentInfo error:', e);
    }
    try {
        const tiktokPayload = {
            content_id: fbqPayload.content_ids?.[0]?.id || 'unknown',
            content_type: 'product',
            contents: fbqPayload.contents?.map((it: any) => ({
                content_id: String(it.id),
                quantity: it.quantity,
                price: it.item_price
            })),
            description: `Checkout initiated via ${SelectedMap[selected.value]}`,
            ...fbqPayload
        };
        if (window.ttq) {
            window.ttq.track('AddPaymentInfo', tiktokPayload);
            window.ttq.track('PlaceAnOrder', tiktokPayload);
        }
    } catch (e) {
        console.error('TikTok AddPaymentInfo failed:', e);
    }
    try {
        const gtmPayload = { ...buildGtmPayload(), ...data };
        gtmAddPaymentInfo(gtmPayload);
    } catch (e) {
        console.error('GA4 purchaseorder error:', e);
    }
}

const collectPurchase = (data: any = {}) => {
    const fbqPayload = { ...buildFbqPayload(), ...data };
    try {
        fbqPurchase(fbqPayload);
    } catch (e) {
        console.error('fbq Purchase error:', e);
    }
    try {
        const tiktokPayload = {
            content_id: fbqPayload.content_ids?.[0]?.id || 'unknown',
            content_type: 'product',
            contents: fbqPayload.contents?.map((it: any) => ({
                content_id: String(it.id),
                quantity: it.quantity,
                price: it.item_price
            })),
            description: `Purchase via ${SelectedMap[selected.value]}`,
            ...fbqPayload
        };
        if (window.ttq) {
            window.ttq.track('Purchase', tiktokPayload);
            console.log('🟢 TikTok Purchase sent:', tiktokPayload);
        }
    } catch (e) {
        console.error('TikTok Purchase failed:', e);
    }
    try {
        const gtmPayload = { ...buildGtmPayload(), ...data };
        gtmPurchase(gtmPayload);
    } catch (e) {
        console.error('GA4 purchaseorder error:', e);
    }
}


/*********** paypal*/
// 渲染 PayPal（仅当加载完成 & 有商品 & 未渲染过）
const payPalCaptureOrder = async (token: string) => {
    try {
        await completePayment({ payPalOrderId: token });
    } catch (e) {
        console.error(e);
    }
};

const paypalExpressRendered = ref(false);
const tryRenderExpressPaypalButtons = async () => {
    if (paypalExpressRendered.value) {
        console.log('PayPal Express 按钮已渲染，跳过');
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
    paypalExpressRendered.value = true;

    paypal.Buttons({
        style: {
            shape: 'rect',      // 按钮形状
            height: 40          // 设置按钮高度为 40px
        },
        fundingSource: paypal.FUNDING.PAYPAL,
        onClick: async (data: any, actions: any) => {
            try {
                let paymentId = null;
                let payRes = null;
                payRes = await handlePaypal({ payMethodKey: PayMethodKey.paypal_shipping_module });
                paymentId = payRes?.payPalResult?.payPalOrder?.id;
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
                const paypalOrderId = details.id;
                const totalAmount = details.purchase_units[0].amount.value as any;
                const currency = details.purchase_units[0].amount.currency_code;
                const paymentTime = formatPaypalUtcToLocal(details.purchase_units[0].payments.captures[0].create_time);

                collectPurchase({ paypal_order_id: paypalOrderId, value: totalAmount, currency });

                payPalCaptureOrder(paypalOrderId);
                redirectPaySuccess({
                    createTime: paymentTime,
                    currency,
                    paymentMethod: 'PayPal',
                    totalAmount
                })
            });
        },
        onError(err: any) {
            console.error('❌ PayPal SDK 出错：', err);
        }
    }).render('#paypal-express-button-container');
}

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
    console.log('PayPal SDK 加载成功，开始渲染按钮');
    paypalRendered.value = true;

    paypal.Buttons({
        onClick: async (data: any, actions: any) => {
            try {
                let paymentId = null;
                let payRes = null;
                payRes = await handlePaypal({ payMethodKey: PayMethodKey.paypal });
                paymentId = payRes?.payPalResult?.payPalOrder?.id;
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
                const paypalOrderId = details.id;
                const totalAmount = details.purchase_units[0].amount.value as any;
                const currency = details.purchase_units[0].amount.currency_code;
                const paymentTime = formatPaypalUtcToLocal(details.purchase_units[0].payments.captures[0].create_time);

                collectPurchase({ paypal_order_id: paypalOrderId, value: totalAmount, currency });

                payPalCaptureOrder(paypalOrderId);
                redirectPaySuccess({
                    createTime: paymentTime,
                    currency,
                    paymentMethod: 'PayPal',
                    totalAmount
                })
            });
        },
        onError(err: any) {
            console.error('❌ PayPal SDK 出错：', err);
        }
    }).render('#paypal-button-container');
}


const handlePaypal = async ({ payMethodKey }) => {
    const isSuccess = payMethodKey == PayMethodKey.paypal_shipping_module || await checkPageInfo();
    if (!isSuccess) {
        return;
    }

    if (!orderId.value) {
        try {
            const res = await generateOrderId();
            orderId.value = res.result;
        } catch (e: any) {
            message.error(e?.message || 'Failed to generate order id');
            throw new Error('ORDER_PREPARE_FAILED');
        }
    }

    try {
        const createOrderParams = buildCreateOrderParams({ payMethodKey })
        const createRes = orderNo.value ? await updateOrder(createOrderParams) : await createOrder(createOrderParams);
        if (createRes?.result?.orderNumber) {
            orderNo.value = createRes.result.orderNumber;
        }
        const payparmes = { payType: payMethodKey, createSource: 'orderPay', bindIdList: [orderId.value] };
        const res = await createPayment(payparmes);
        return res.result;
    } catch (err: any) {
        let msg = `${SelectedMap[payMethodKey]} order creation failed:`;
        try {
            const parsed = JSON.parse(err.message || '{}');
            msg = msg + parsed.enDesc || msg;
            const ek = parsed.errorKey;
            if (ek === 'calFee' || ek === 'priceOrdered' || ek === 'amountOrdered') {
                changedesc.value = parsed.enDesc;
                isOpen.value = true;
            }
        } catch { }
        message.error(msg);
        throw new Error('ORDER_CREATE_FAILED');
    }
};

/*********** card*/

const awxInited = ref(false);
const awxPayLoading = ref(false);
const awxError = ref<string>('');

let awxCardNumberEl: any = null;
let awxExpiryEl: any = null;
let awxCvcEl: any = null;

const awxMounted = ref(false);
// ✅ 切换时不做卸载，最多首次切到 2 时补挂一次
watch(selected, async (val) => {
    if (val === PayMethodKey.paypal && !paypalRendered.value) {
        await tryRenderPaypalButtons();
    }
    if (val === PayMethodKey.airwallexCard && !awxMounted.value) {
        await mountAirwallexSplit();
    }
    if (val === PayMethodKey.googlepay && !gpayMounted.value) {
        await mountGooglePay();
    }
    if (val === PayMethodKey.applepay && !awxAppleMounted.value) { // ← 新增
        await mountApplePay();
    }
});
const awxCardMounted = ref(false);

async function mountAirwallexSplit() {
    await initAirwallex();

    // ✅ 仅首次创建
    if (awxCardMounted.value) return;

    const AWX = await getAWX();
    const style = { base: { fontSize: '14px', '::placeholder': { color: '#9CA3AF' } } };
    // console.log('延迟加载创建并挂载 Airwallex Split Card 元素...');
    // 并行创建
    const [numEl, expEl, cvcEl] = await Promise.all([
        AWX.createElement('cardNumber', { style }),
        AWX.createElement('expiry', { style }),
        AWX.createElement('cvc', { style, authFormContainer: 'awx-auth' })
    ]);
    awxCardNumberEl = numEl;
    awxExpiryEl = expEl;
    awxCvcEl = cvcEl;

    awxCardNumberEl.mount('awx-card-number');
    awxExpiryEl.mount('awx-expiry');
    awxCvcEl.mount('awx-cvc');
    [awxCardNumberEl, awxExpiryEl, awxCvcEl].forEach((el: any) => {
        el.on?.('change', (e: any) => { awxError.value = e?.detail?.error?.message || ''; });
    });

    awxCardMounted.value = true;
}
async function handleAirwallexCardPayPay() {
    // awxError.value = ''
    try {
        const isSuccess = await checkPageInfo();
        if (!isSuccess) {
            return;
        }
        awxPayLoading.value = true
        const clientSecret = await ensureAwxPaymentIntent();
        if (!clientSecret) {
            // 理论上不会走到这，但为了稳妥：不跳转
            return message.error('Airwallex is not ready yet')
        }
        collectAddPaymentEvent()

        // --- D. 真正支付：仅此处失败才跳转 /payfail ---
        let result: any
        const totalAmount = (
            (selectedTotal.value || 0) +
            (shipping.value || 0) -
            (discount.value || 0)
        ).toFixed(2)
        try {
            result = await awxCardNumberEl.confirm({ client_secret: clientSecret })
        } catch (confirmErr: any) {
            const msg = confirmErr?.message || 'Payment failed'
            awxError.value = msg
            // ⛳️ 只有支付确认失败才跳转
            return redirectPayFail({ method: 'Credit/Debit Card', msg })
        }
        if (result?.status === 'SUCCEEDED') {
            message.success('Pay success')
            const paymentTime = formatUtcToLocal(result.created_at);

            collectPurchase({ value: Number(totalAmount) });

            // 后端捕获
            airWallexCaptureOrder(awxIntentId.value)
            return redirectPaySuccess({
                createTime: paymentTime,
                paymentMethod: 'Credit/Debit Card',
                totalAmount
            })
        } else {
            // 其它状态统一当支付异常处理（才跳转）
            const msg = result?.status || 'Payment failed'
            awxError.value = msg
            return redirectPayFail({ method: 'Credit/Debit Card', msg })
        }
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
/*********** googlepay*/
const gpayMounted = ref(false)
const gpayEl = ref<any>(null)
const gpayError = ref<string>('')

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


            const isSuccess = await checkPageInfo();
            if (!isSuccess) {
                return;
            }
            const bail = async (msg: string) => {
                message.error(msg)
                try {
                    await gpayEl.value.update({
                        intent_id: '',
                        client_secret: '',
                        amount: { value: '0', currency: awxCurrency.value || 'USD' }
                    })
                } catch { }
                return
            }
            console.log('333333333333:', addressinfo.value.email)
            if (!contactEmail.value) return await bail('Please add contact email')
            if (!addressinfo.value.firstName) return await bail('Please add first name')
            if (!addressinfo.value.lastName) return await bail('Please add last name')
            if (!addressinfo.value.address) return await bail('Please add an address')
            if (!addressinfo.value.country) return await bail('Please add country')
            if (!addressinfo.value.province) return await bail('Please add province')
            if (!addressinfo.value.city) return await bail('Please add city')
            if (!addressinfo.value.postalCode) return await bail('Please add postal code')
            if (!addressinfo.value.number) return await bail('Please add phone number')
            if (shippingRuleFeeId.value < 0) return await bail('The current country does not support delivery')
            if (!shippingRuleFeeId.value) return await bail('Shipping methods is required')
            if (!productlists.value?.length) return await bail('No items to pay')
            awxClientSecret.value = '' // 确保重新创建
            awxIntentId.value = ''

            const clientSecret = await ensureAwxPaymentIntent()
            if (!clientSecret) throw new Error('Failed to create Google Pay intent')
            collectAddPaymentEvent()
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
            const result = await gpayEl.value.confirmIntent({ client_secret: awxClientSecret.value })
            if (result?.status === 'SUCCEEDED') {
                airWallexCaptureOrder(result.id)

                const totalAmount = totalPayable.value

                collectPurchase({ value: Number(totalAmount) });

                return redirectPaySuccess({
                    paymentMethod: 'Google Pay',
                    totalAmount
                })
            } else {
                console.log('result', result);
                redirectPayFail({ method: 'Google Pay', msg: result?.status || 'Payment failed' })
            }
        } catch (err: any) {
            console.log('err', err);
            const msg = err?.message || 'Google Pay confirm failed'
            gpayError.value = msg
            message.error(msg)
            redirectPayFail({ method: 'Google Pay', msg: msg })
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
        redirectPayFail({ method: 'Google Pay', msg: msg })
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
/*********** applepay*/
const awxAppleMounted = ref(false)
let awxAppleEl: any = null
const awxAppleError = ref<string>('')

// 点击/校验：创建 Intent + 注入金额/密钥 + 取 merchantSession
const handleValidate = async (evt: any) => {
    try {
        const isSuccess = await checkPageInfo();
        if (!isSuccess) {
            return;
        }

        awxClientSecret.value = await ensureAwxPaymentIntent()
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
        collectAddPaymentEvent()
    } catch (e: any) {
        awxAppleError.value = e?.message || 'Apple Pay prepare failed'
        message.error(awxAppleError.value)
    }
}

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
                collectPurchase({ value: Number(totalAmount) });
                redirectPaySuccess({
                    paymentMethod: 'Apple Pay',
                })
            } else {
                redirectPayFail({ method: 'Apple Pay', msg: result?.status || 'Payment failed' })
            }
        } catch (err: any) {
            const msg = err?.message || 'Apple Pay confirm failed'
            message.error(msg)
            redirectPayFail({ method: 'Apple Pay', msg: msg })
        }
    })

    // 成功
    awxAppleEl.on?.('success', async (e: any) => {
        try {
            const intent = e?.detail?.intent
            if (intent?.id) await airWallexCaptureOrder(intent.id)

        } catch { }


    })

    // 失败/取消
    awxAppleEl.on?.('error', (e: any) => {
        const raw = e?.detail ?? e
        const msg = raw?.error?.message ?? raw?.message ?? raw?.status ?? 'Payment failed'
        awxAppleError.value = msg
        message.error(msg)
        redirectPayFail({ method: 'Apple Pay', msg: msg })
    })
}

/**新代码结束 */
const couponCode = ref('');
const couponError = ref('');
const discount = ref(0);
const activeCoupon = ref('');
const applyLoading = ref(false);

const changeSummaryOpen = () => {
    isSummaryOpen.value = !isSummaryOpen.value;
};

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
const resetCouponError = () => {
    couponError.value = '';
}
const applyCoupon = async () => {
    couponError.value = '';
    couponCode.value = couponCode.value.trim();
    if (!couponCode.value) {
        couponError.value = 'Please enter a coupon code';
        return;
    }
    if (shippingRuleFeeId.value < 0) {
        couponError.value = 'The current country does not support delivery, cannot apply coupon';
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
            priceOrdered: element.productPrice?.toFixed(2),
            amountOrdered: (element.productPrice * Number(element.qtyOrdered)).toFixed(2),
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
        buyerEmail: contactEmail.value || addressinfo.value.email || form.value.email,
        buyerFirstName: addressinfo.value.firstName || form.value.firstName,
        buyerAddress: addressinfo.value.address || form.value.address,
        buyerLastName: addressinfo.value.lastName || form.value.lastName,
        buyerNotes: notes.value,
        buyerPhoneAreaCode: addressinfo.value.numberCode || form.value.numberCode,
        buyerPhoneNumber: addressinfo.value.number || form.value.number,
        buyerPostalCode: addressinfo.value.postalCode || form.value.postalCode,
        buyerStateOrProvince: addressinfo.value.province || form.value.province,
        id: orderId.value,
        shippingRuleFeeId: shippingRuleFeeId.value,
        shippingRule: { calFee: shipping.value },
        create: false,
        orderItemList: orderItemListarr,
        marketingActivityCouponCode: couponCode.value,
        // expectPaymentMethodType: ExpectPaymentMethodTypeMap[selected.value]
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

const getSpecArray = (propList: any[]) => {
    console.log('getSpecArray========propList', propList);
    if (!propList || !Array.isArray(propList)) return []

    const result: any[] = []

    propList.forEach(prop => {
        if (prop.inputList?.length > 0) {
            // ⚠️ 一个 prop 可能包含多个 input，拆成多行
            prop.inputList.forEach((input: any) => {
                result.push({
                    label: `${input.inputName}:`,
                    value: input.inputValue
                })
            })
        } else {
            // 普通属性
            result.push({
                label: `${prop.propEnName}:`,
                value: prop.propValueEnName
            })
        }
    })

    return result
}

const filterOptionByLabel = (input: string, option: any) => option.label.toLowerCase().includes(input.toLowerCase());

const getShippingRulelist = async () => {
    if (queryFrom == 'order') return;
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
                item.label = `${item.feeEnName}　　${item.daysFrom}–${item.daysTo} days　　$${item.calFee?.toFixed(2)}`;
            });
        } else {
            templates.value = [
                { feeId: -1, label: 'The current country does not support delivery, please change the delivery address', calFee: 0 }
            ];
        }
        shippingRuleFeeId.value = templates.value[0].feeId;
    } catch (e) {
        console.error(e);
    }
};


const showModal = ref(false);
const isshow = ref(false);

const notes = ref('');
const changeaddress = () => (showModal.value = true);
const addnewaddress = () => (isshow.value = true);

const selectAddress = (index: any) => {
    addressarr.value.forEach((el: any) => (el.selected = false));
    const picked = addressarr.value[index];
    picked.selected = true;
    addressinfo.value = { ...picked };
    shipping.value = 0;
    showModal.value = false;
};

const shipping = ref(0);
const selectedTotal = computed(
    () => productlists.value.reduce((total: number, item: any) => total + item.productPrice * item.qtyOrdered, 0) ?? 0
);
const selectedQuantity = computed(() =>
    productlists.value.reduce((sum: number, item: any) => sum + Number(item.qtyOrdered), 0)
);
const hasItems = computed(() => (productlists.value?.length || 0) > 0 && selectedQuantity.value > 0);

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
    () => shippingRuleFeeId.value,
    (v) => {
        if (v) {
            templates.value.filter((item: any) => item.feeId == shippingRuleFeeId.value).forEach((item: any) => {
                shipping.value = item.calFee;
            });
        }
    }
);

const { isPageLoaded, hasUserInteracted } = usePageInteraction();

watch(() => [isPageLoaded, hasItems, isProductLoaded], ([isPageLoaded, hasItems, isProductLoaded]) => {
    if (isPageLoaded.value && hasItems.value && isProductLoaded.value) {

        setTimeout(() => {
            tryRenderExpressPaypalButtons()
            mountAirwallexSplit()
        }, 100)
    }
}, { deep: true });
const isFirstApply = ref(true);
watch(() => shippingRuleFeeId.value, (newValue) => {
    if (shippingRuleFeeId.value && isFirstApply.value && route.query.couponCode) {
        couponCode.value = route.query.couponCode as string || '';
        applyCoupon();
        isFirstApply.value = false;
    }
}, { deep: true })

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
