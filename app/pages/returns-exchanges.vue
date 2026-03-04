<template>
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-customblack">
        <h1 class="text-[30px] font-bold mb-8 text-center ">Return & Exchange Policy</h1>
        <p class="mb-6">At inCustom, your satisfaction is our priority. Because each of our products is custom‑made to
            your specifications, we maintain a transparent and fair policy to address any issues that may arise.</p>
        <div>
            <div v-for="(item, index) in returnData" :key="index" class="mb-4">
                <p class="font-[600] text-[18px] mb-1">{{ item.title }}</p>
                <div class="text-gray-600 leading-relaxed whitespace-pre-line" v-html="item.desc"></div>
            </div>
        </div>
        <!-- <p>For any questions or to initiate a request, please contact us at <span
                class="text-primary">hello@incustom.com</span> with your order details.</p> -->
    </div>
</template>

<script setup lang="ts">
const returnData = [
    {
        title: "1. General Policy for Custom Products",
        desc: `Due to their personalized nature, all custom‑made products are final sale and are not eligible for returns or exchanges based on:
Change of mind
Incorrect self‑measurement
Color variation due to monitor settings or lighting
Personal taste or dissatisfaction with fabric/style
We stand behind our quality. If you receive an item with a verified manufacturing defect or quality issue (e.g., material flaws, workmanship errors, mechanical failure), please contact us within 30 days of delivery. We will review the issue and, at our discretion, provide a replacement, repair, or full refund, including any original shipping charges.

📸 To help us process your claim quickly, please include clear photos or a short video showing the defect along with your order number.`
    },
    {
        title: "2. Wrong or Missing Items",
        desc: `If you receive an incorrect item or discover that parts are missing, notify us within 72 hours of delivery. Once the issue is confirmed, we will:
Ship the correct item or missing components immediately, at no additional cost, or
Issue a full refund or partial compensation if a replacement is not feasible.
We carefully inspect and pack every order, but if an error does occur, we will make it right – fast and free.

📸 Please provide photos showing the incorrect item or missing parts along with your order number.
        `
    },
    {
        title: "3. Order Cancellation",
        desc: `If you wish to cancel your order and receive a full refund, please contact us at hello@incustom.com within 24 hours of placing your order.
Please note: Orders cannot be canceled once production has begun (typically after 24 hours), as custom items are individually made to your specifications.`
    },
    {
        title: "4. Return Shipping Responsibility",
        desc: `The responsibility for return shipping costs depends on the reason for the return.
inCustom covers return shipping costs in the following situations:
Manufacturing defect or quality issue
Wrong item or missing parts sent by us
Item damaged during transit (must be reported within 30 days with photo evidence)
In these cases, we will provide a prepaid return label or arrange pickup. No restocking fees will be charged.

The customer is responsible for return shipping costs in the following situations:
Change of mind, no longer needed, or ordered by mistake
Incorrect self‑measurement (see our Measurement Assurance program for one‑time remake eligibility)
Color variation from screen (we recommend ordering free swatches before purchase)
Product does not meet personal expectations or taste preferences
Misunderstood product features or capabilities

Important Notes:
No restocking fees will be charged for any approved returns.
For any return that requires shipping, please do not send the item back without prior authorization. Unauthorized returns will not be accepted.
The buyer is required to provide product photos to verify any claim before return authorization is issued.`
    }, {
        title: "5. Return Process",
        desc: `To initiate a return, exchange, or defect claim, please follow these steps:
Contact us within the applicable time frame at hello@incustom.com with:
Your order number
A clear description of the issue
Photos or videos showing the problem

Wait for authorization – Our customer care team will respond within 1–2 business days with return instructions if applicable.
Ship the item (if required) – If a return is authorized, please:
Use the original packaging or similar protective packaging
Include a copy of your invoice or order confirmation
Ship to the address provided in our return authorization
Refund processing – Upon receipt and inspection of your return, we will process your refund within 5–7 business days. Refunds will be issued to the original payment method used for purchase.`
    },
    {
        title: "6. Important Notes",
        desc: `Tolerance for size: A tolerance of ±0.5 inches is considered industry acceptable for custom‑made products. If the discrepancy exceeds this range, please contact us for resolution.
Damaged products: Must be reported within 30 days of delivery. After 30 days, claims cannot be accepted.
Return packaging: All returned items must be in their original packaging, undamaged, with all original inserts included.
Proof of purchase: A copy of your invoice or order confirmation must accompany any return.`
    },
    {
        title: "7. Exceptions & Exclusions",
        desc: `This policy does not apply to issues caused by:
Improper installation or handling
Window or space dimensions changing after ordering
Deliberate measurement errors
Normal wear and tear
Acts of nature or force majeure
Products purchased from third‑party retailers (please refer to their policies)`
    },
    {
        title: "8. Exchange Policy",
        desc: `For custom products, exchanges are only accepted in the following two situations, subject to our review and confirmation.

✅ Eligible Situations for Exchange
Situation 1: Manufacturing Defect or Quality Issue
If your item has a verified manufacturing defect (e.g., fabric flaws, workmanship errors, mechanical failure), you may choose:
Exchange: We will remake one identical item for you at no cost
Refund: Processed according to our return policy
Situation 2: Size Error (Not Caused by Customer Measurement)
If the item size does not match our confirmed production specifications, and the error is on our part, we will remake the correct size for you free of charge.

❌ Situations NOT Eligible for Exchange
The following situations do not qualify for exchange:
Change of mind or no longer needed
Incorrect self‑measurement (please use our Measurement Assurance program for one free remake)
Color variation from screen
Dislike of chosen fabric or style
Window size changes after ordering
Issues caused by improper installation`
    },
    {
        title: "🔄 Exchange Process",
        desc: `1.Contact Customer Service: Within 30 days of delivery, email hello@incustom.com with "Exchange Request" + your order number, and include:
Clear photos or videos showing the issue
Description of the problem (e.g., "fabric damage," "incorrect size")
2.Wait for Review: We will confirm the nature of the issue within 1-2 business days and inform you if you qualify for an exchange.

3.Exchange Processing:
If confirmed as our responsibility, we will immediately arrange production of the exchange item
The new item will be made to the original order specifications and shipped via standard delivery
You do not need to return the original item unless specifically requested by our team (we will advise and cover shipping if needed)

4.Timing:
Production time for exchange items is the same as for original orders
You will receive a confirmation email with a new order number and tracking information once available

📦 Original Item Disposal
If no return is required, please dispose of the original item as you wish (donate, recycle, or discard) – no need to send it back
If a return is requested, we will provide a prepaid return label; simply pack and drop off`
    },
    {
        title: "9. Contact Us",
        desc: `For any questions or to initiate a request, please contact our customer care team:
📧 hello@incustom.com
📞 +1 458-329-6702`
    },
];

useHead({
    title: 'Return & Exchange Policy',
    meta: [
        { name: 'description', content: 'Learn about inCustom\'s return and exchange policy for custom-made products. Understand the conditions for returns and how to initiate a request.' }
    ]
});
</script>