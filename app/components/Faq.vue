<template>
    <div class="w-full mt-[30px]">
        <div class="max-row py-4 ">
            <h1 class="text-xl md:text-[40px] text-primary font-semibold text-center mb-3 sm:mb-12 dark:text-primary">
                FAQ
            </h1>

            <UAccordion variant="solid" size="xl" :items="faqItems" :ui="{ container: 'border-b border-[#00000014]' }"
                class="text-title">
                <template #default="{ item, index, open }">
                    <UButton color="gray" variant="ghost"
                        class="text-arialblack w-full flex justify-between items-center gap-3 text-base sm:text-lg font-normal hover:bg-transparent dark:hover:bg-transparent dark:text-arialblack hover:text-primary dark:hover:text-primary"
                        :ui="{ rounded: 'rounded-none', padding: { sm: 'px-5 py-3 sm:py-4' } }">
                        <!-- 文本容器：允许两行并省略 -->
                        <span class="flex-1 min-w-0 text-left font-normal leading-snug line-clamp-2 clamp-2">
                            {{ item.label }}
                        </span>

                        <BaseIcon name="i-heroicons-chevron-down-20-solid"
                            class="w-5 h-5 shrink-0 transition-transform duration-200"
                            :class="[open ? 'rotate-180' : '']" />
                    </UButton>
                </template>

                <template #item="{ item }">
                    <div class="px-5 py-0 text-[#4B5563] sm:text-base">
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
        label: "Are you a brand or manufacturer?",
        content:
            "We are a customization brand with our own factory. All products are handcrafted and shipped directly from our facility worldwide."
    },
    {
        label: "How long does it take to produce and ship an custom order?",
        content:
            "Custom orders usually take 2-3 business days to produce. Shipping times vary by country, typically 7–12 days. If you choose the Expedited Shipping, you will get the package within 7-10 days after it shipped."
    },
    {
        label: "Can l print my own design or logo on the product?",
        content:
            "Yes, we offer pattern and logo printing services—ideal for homes, businesses, and events. For custom printing inquiries, please email us or contact online support."
    },
    {
        label: "What if i don't know how to measure the size?",
        content:
            "A detailed measurement guide is available in the \"SPECIFY YOUR SIZE\" section on the product page. Need help? Feel free to contact our online support."
    },
    {
        label: "Can l see the status of my order after placing it?",
        content:
            "Yes! After you place an order, we’ll verify your details → start production → ship → deliver. You’ll get email updates or can track progress in your account—we keep you informed at every step."
    },
    {
        label: "Are your materials eco-friendly and certifed?",
        content:
            "Yes, we use eco-friendly HDPE and other high-performance fabrics with UV resistance and certified sustainability."
    },
    {
        label: "Do your products come with a warranty?",
        content:
            "Yes. All our products come with a lifetime warranty covering material defects and manufacturing issues under normal use. If you ever encounter a problem, just contact us — we'll make it right."
    },
    {
        label: "Can l return a custom product if i'm not satisfed?",
        content:
            "All items are made-to-order and non-returnable, unless there’s a quality issue or major error. If your item arrives damaged or incorrect, contact us within 30 days — we’ll remake or refund it."
    },
    {
        label: "What if I measure my windows incorrectly and the blinds don’t fit?",
        content:
            `No worries – we’ve got you covered with our free <strong>Measurement Protection</strong>! If your custom blinds arrive in the wrong size (too long, short, narrow, or wide) due to a measuring mistake, we’ll remake them once for free (up to 3 pieces per residential order).

            <strong>Here’s how it works:</strong>
            Contact us within 30 days of delivery.
            Provide your order number and photos showing the measurement issue (window + blind).
            We’ll review and confirm within 2 business days, then arrange the remake.
            This protection is automatically included with every order – no sign-up needed, no extra cost.

            <strong>⚠️ Exclusions apply for:</strong>
            Windows that are out of square or uneven
            Damage from incorrect installation
            Window size changes after ordering
            Deliberate measurement errors
            Dissatisfaction with color, style, or fabric

            <strong>Have questions?</strong>
            📧 hello@incustom.com
            📞 +1 458-329-6702
            Mon–Sat 9am–10pm | Sun 10am–6pm (Your local time)`
    },
    {
        label: "Do you offer free shipping?",
        content:
            "Yes! We're happy to offer free standard shipping on all orders – no minimum purchase required. Whether you're ordering one sample or a full set of custom blinds, shipping is on us."
    },
];
</script>

<style scoped>
.content {
    white-space: pre-line;
}

/* 回退样式：若未安装 @tailwindcss/line-clamp 插件，也能实现两行省略 */
.clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* 最大两行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
