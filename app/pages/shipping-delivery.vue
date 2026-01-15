<template>
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-customblack">
        <h1 class="text-[30px] font-bold mb-8 text-center ">Shipping & Delivery Policy</h1>
        <p class="mb-6">At inCustom, we ensure your custom-made products are crafted with care and delivered with
            reliability. All orders are fully insured from our workshop to your door.</p>
        <div>
            <div v-for="(item, index) in returnData" :key="index" class="mb-4">
                <p class="font-[600] text-[18px] mb-1">{{ item.title }}</p>
                <div class="text-gray-600 leading-relaxed whitespace-pre-line" v-html="item.desc"></div>
            </div>
        </div>
        <p>For any delivery-related questions, please contact us at <span
                class="text-primary">hello@incustom.com</span>.</p>
    </div>
</template>

<script setup lang="ts">
const returnData = [
    {
        title: "Delivery Timeline",
        desc: "Custom orders usually take 2–5 business days to produce. Shipping times vary by country, typically 7–15 days. If you choose the Expedited Shipping, you will get the package within 7-10 days after it shipped.This timeframe encompasses both order processing and transit. Your estimated delivery date will be confirmed at checkout."
    },
    {
        title: "Shipping & Customs Costs",
        desc: "Shipping costs are automatically calculated based on your order details and destination, and will be displayed for your confirmation prior to payment. The price you see at checkout is final—all import duties, taxes, and handling fees are included, with no hidden charges upon delivery."
    },
    {
        title: "Order Tracking & Updates",
        desc: "Once your order ships, you will receive a shipping confirmation email containing your tracking number and a link to the carrier’s tracking portal (e.g., UPS). Please allow up to 24 hours for the tracking information to activate and update."
    },
    {
        title: "Multiple-Item Orders",
        desc: "We strive to ship all items from your order together to ensure a unified delivery experience. If you require a partial or staggered shipment, please contact our service team before your order enters production so we can make special arrangements."
    },
    {
        title: "Delivery Delays & Lost Packages",
        desc: "While major carriers are highly reliable, occasional delays can occur due to customs processing, weather, or peak season volumes. If your tracking information does not update for more than 5 business days, please contact us immediately. As all shipments are insured, we will promptly initiate an investigation with the carrier and arrange for a replacement or refund as needed."
    },
    {
        title: "Shipping Address Changes",
        desc: "To avoid delivery errors, please verify your shipping address carefully at checkout. Address changes can only be accommodated before your order enters the shipping process. Once a shipping label has been created or the package is in transit, we are unable to redirect the shipment."
    }
];
useHead({
    title: 'Shipping & Delivery Policy | inCustom Custom Products',
    meta: [
        { name: 'description', content: 'Get all the details on inCustom shipping. Learn about our production times, delivery options, and tracking info. We ship your unique, custom creations worldwide.' }
    ]
})
</script>
