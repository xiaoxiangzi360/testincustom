<template>
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-customblack">
        <h1 class="text-[30px] font-bold mb-8 text-center ">Return & Exchange Policy</h1>
        <p class="mb-6">At inCustom, we are committed to ensuring your complete satisfaction. The following policy
            outlines the conditions and processes for returns and exchanges.</p>
        <div>
            <div v-for="(item, index) in returnData" :key="index" class="mb-4">
                <p class="font-[600] text-[18px] mb-1">{{ item.title }}</p>
                <div class="text-gray-600 leading-relaxed whitespace-pre-line" v-html="item.desc"></div>
            </div>
        </div>
        <p>For any questions or to initiate a request, please contact us at <span class="text-primary">hello@incustom.com</span> with your order details.</p>
    </div>
</template>

<script setup lang="ts">
const returnData = [
    {
        title: "General Policy for Custom Products",
        desc: "Due to their personalized nature, all custom-made products are final sale and are not eligible for returns or exchanges based on change of mind or incorrect sizing/color selection. However, we fully stand behind our quality. If you receive an item with a verified manufacturing defect or quality issue, we will gladly arrange a refund, replacement, or repair at our discretion."
    },
    {
        title: "Wrong or Missing Items",
        desc: "If you receive an incorrect item or discover that parts are missing, please contact our service team immediately. Once we verify the issue, we will promptly ship the correct item or missing components to you at no additional cost, or arrange appropriate compensation to resolve the matter swiftly."
    },
    {
        title: "Return Shipping Responsibility",
        desc: "The responsibility for return shipping costs is determined as follows:\n"
            + "<strong>Covered by inCustom:</strong> We will cover all return shipping costs, and typically provide a prepaid return label, if the return is a direct result of our error. This includes cases of defective items, incorrect items shipped, or a significant mistake in fulfilling your order.\n"
            + "<strong>Covered by the Customer:</strong> The customer is responsible for the cost of return shipping in situations such as “Change of Mind,” “No Longer Needed,” or if the product received matches the order placed but does not meet the customer’s expectations (e.g., incorrect self-measurements or color choices on screen)."
    }
];

useHead({
    title: 'Return & Exchange Policy',
    meta: [
        { name: 'description', content: 'Learn about inCustom\'s return and exchange policy for custom-made products. Understand the conditions for returns and how to initiate a request.' }
    ]
});
</script>