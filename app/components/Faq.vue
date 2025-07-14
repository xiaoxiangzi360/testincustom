<template>
    <div class="w-full">
        <div class="max-row py-10 ">
            <h1 class="text-3xl md:text-5xl text-blackcolor font-normal text-center mb-12">
                FAQ
            </h1>

            <UAccordion variant="solid" size="xl" :items="faqItems" :ui="{
                container: 'border-b border-[#00000014] dark:border-white'
            }" class="text-title ">
                <template #default="{ item, index, open }">
                    <UButton color="gray" variant="ghost"
                        class="text-arialblack w-full flex justify-between items-center text-lg"
                        :ui="{ rounded: 'rounded-none', padding: { sm: 'px-5 py-4' } }">
                        <span class="truncate text-blackcolor text-left">{{ index + 1 }}. {{ item.label }}</span>
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
        label: "What is POD?",
        content:
            "POD (Print On Demand) is a production model that allows products like t-shirts, mugs, or tote bags to be produced after an order is placed. This model requires no inventory, saving upfront costs. INcustom provides professional supply chain services to help you run your POD business"
    },
    {
        label: "What is the process for using INcustom's POD service?",
        content:
            "1. You can use <strong>INcustom's online design system</strong> to create your own designs and submit orders directly.\n" +
            "2. Our system will recommend suitable products, provide real-time production previews, and offer pricing estimates.\n" +
            "3. Once the design is confirmed, we will arrange production, quality inspection, and delivery, so you can focus on sales.\n" +
            "4. For <strong>special cases</strong> (such as custom requests or technical issues), you may contact <strong>INcustom’s dedicated agent</strong> for further assistance."
    },
    {
        label: "Do you support delivery to different countries and regions?",
        content:
            "Yes, we support global delivery, covering multiple countries and regions, and provide various logistics options to meet delivery time requirements. Please contact our dedicated agent to confirm specific delivery solutions."
    },
    {
        label: "What is the return policy for POD products?",
        content:
            "Our POD service includes strict quality inspections. If there are product issues caused by production or transportation, INcustom will provide full compensation. Due to the personalized nature of custom products, non-quality-related issues may not be eligible for return. Specific cases can be discussed with your dedicated agent."
    },
    {
        label: "How do you protect my designs from being stolen?",
        content:
            "INcustom is committed to protecting the intellectual property of customers' designs and has confidentiality agreements with partner suppliers. For special requests, our agents will provide you with detailed solutions to ensure your designs are secure."
    },
    {
        label: "How does the POD service integrate with Shopify or other platforms?",
        content:
            "Currently, INcustom does not support automatic integration. However, our dedicated agents will guide you on how to complete product uploads and order processing manually to ensure smooth operations."
    },
    {
        label: "How do I select the right POD product?",
        content:
            "We recommend choosing products based on your target market needs, trending hot-sellers, and design style. INcustom's agents will assist you with product selection and provide market analysis to help you quickly identify potential bestsellers."
    },
    {
        label: "How are products printed?",
        content:
            "<strong>We use two main printing methods:</strong>\n\n" +
            "<strong>1. Heat Sublimation Printing</strong>\n" +
            "- Used for most handmade products such as custom shoes, all-over-print apparel, home goods, and accessories.\n" +
            "- This method transfers ink onto special material, which is then heat-pressed onto the product.\n" +
            "- Sublimation printing offers vibrant colors that never fade or crack!\n\n" +
            "<strong>2. Direct-to-Garment (DTG) Printing</strong>\n" +
            "- This is used for apparel like DTG t-shirts, hoodies, and canvas prints.\n" +
            "- High-quality ink is printed directly onto the product using advanced digital printers."
    }
];

</script>

<style scoped>
.content {
    white-space: pre-line;
}
</style>
