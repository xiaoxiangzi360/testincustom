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
        label: "Are you a brand or manufacturer?",
        content:
            "We are a customization brand with our own factory. All products are handcrafted and shipped directly from our facility worldwide."
    },
    {
        label: "How long does it take to produce and ship an custom order?",
        content: "Custom orders usually take 2–5 business days to produce. Shipping times vary by country, typically 7–15 days. If you choose the Expedited Shipping, you will get the package within 7-10 days after it shipped."
    },
    {
        label: "Can I print my own design or logo on the product?",
        content:
            "Yes, we offer pattern and logo printing services—ideal for homes, businesses, and events."
    },
    {
        label: "What if I don’t know how to measure the size?",
        content:
            "We offer detailed measurement guides and online customer support to help you choose the size."
    },
    {
        label: "Can I see the status of my order after placing it?",
        content:
            "Yes! After you place an order, we’ll verify your details → start production → ship → deliver. You’ll get email updates or can track progress in your account—we keep you informed at every step."
    },
    {
        label: "Are your materials eco-friendly and certified?",
        content:
            "Yes, we use eco-friendly HDPE and other high-performance fabrics with UV resistance and certified sustainability."
    },
    {
        label: "Do your products come with a warranty?",
        content:
            "Yes — we offer a 1-year limited warranty covering material defects and manufacturing issues under normal use. If there’s a problem, just contact us — we’ll make it right."
    },
    {
        label: "Can I return a custom product if I’m not satisfied?",
        content:
            "All items are made-to-order and non-returnable, unless there’s a quality issue or major error. If your item arrives damaged or incorrect, contact us within 7 days — we’ll remake or refund it."
    }
];

</script>

<style scoped>
.content {
    white-space: pre-line;
}
</style>
