<template>
    <div class="w-full">
        <div class="max-row py-10 ">
            <h1 class="text-2xl md:text-[40px] text-blackcolor font-normal text-center mb-12 dark:text-white">
                FAQ
            </h1>

            <UAccordion variant="solid" size="xl" :items="faqItems" :ui="{
                container: 'border-b border-[#00000014] dark:border-white dark:text-white'
            }" class="text-title dark:text-white">
                <template #default="{ item, index, open }">
                    <UButton color="gray" variant="ghost"
                        class="text-arialblack w-full flex justify-between items-center text-lg dark:text-white"
                        :ui="{ rounded: 'rounded-none', padding: { sm: 'px-5 py-4' } }">
                        <span class="truncate text-blackcolor text-left dark:text-white">{{ index + 1 }}. {{ item.label
                        }}</span>
                        <UIcon name="i-heroicons-chevron-down-20-solid"
                            class="w-5 h-5 transition-transform duration-200" :class="[open ? 'rotate-180' : '']" />
                    </UButton>
                </template>

                <template #item="{ item }">
                    <div class="px-5 py-0 text-[#5A5B5B] dark:text-white text-lg">
                        <p class="content" v-html="item.content"></p>

                    </div>
                </template>
            </UAccordion>
        </div>
    </div>
</template>

<script setup>
const faqItems = [
    {
        label: "How long does it take to ship a custom order?",
        content:
            "Depending on the complexity and production schedule, custom orders are usually completed within 2–5 business days."
    },
    {
        label: "What payment methods are accepted?",
        content: "We currently accept payments via PayPal only."
    },
    {
        label: "Is the “in stock” status shown on the product page accurate?",
        content:
            "If the product can be added to your cart, it means it is currently in stock and ready for purchase."
    },
    {
        label: "Do your products come with a warranty?",
        content:
            "Yes, we offer basic after-sales support. If you encounter any quality issues during normal use, we will assist in resolving them. For detailed warranty coverage and terms, please refer to the product page or contact our customer service team."
    },
    {
        label: "Will I need to pay import taxes or additional fees after placing an order?",
        content:
            "No, you won’t. We offer Delivered Duty Paid (DDP) service—customs duties and all taxes are included in the shipping cost. You will receive your package without any extra charges."
    },
    {
        label: "What should I know about product maintenance and cleaning?",
        content:
            "Different materials require different care. For example, mesh fabric products should be cleaned with a soft brush and mild detergent—avoid prolonged soaking. Metal parts should be wiped dry regularly to prevent rust. For more details, you can download our Care & Maintenance Manual."
    },
    {
        label: "Do you offer a referral or rewards program?",
        content:
            "Yes! We offer a referral rewards program—share your personal invitation link, and once your friend completes a purchase, you’ll receive shopping credits or points as a reward. Please refer to the 'Referral Rewards' page for more information."
    },
    {
        label: "What if the product dimensions are slightly off?",
        content:
            "All of our standard products are manufactured with a tolerance of ±2cm, which is considered normal. If the size of the item you receive exceeds this range, please contact customer service with photos, and we will arrange a replacement or compensation."
    }
];

</script>

<style scoped>
.content {
    white-space: pre-line;
}
</style>
