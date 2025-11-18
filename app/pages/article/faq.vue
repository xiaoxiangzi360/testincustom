<template>
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold mb-8 text-center">FAQs</h1>

        <div v-for="(section, index) in faqSections" :key="index" class="mb-10">
            <h2 class="text-2xl font-semibold text-primary-700 mb-4">{{ section.title }}</h2>
            <div class="space-y-6">
                <div v-for="(item, idx) in section.items" :key="idx" class="border border-gray-200 rounded-md p-4">
                    <p class="font-medium text-gray-800 mb-1">Q: {{ item.question }}</p>
                    <p class="text-gray-600 leading-relaxed">A: {{ item.answer }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'FAQs & Help Center - Your Questions Answered',
    meta: [
        { name: 'description', content: 'Find quick answers to common questions about designing, ordering, and shipping your custom products. Our comprehensive FAQ is here to help.' }
    ]
})
const faqSections = [
    {
        title: '1. Orders & Logistics',
        items: [
            { question: 'How long does it take to ship a custom order?', answer: 'Depending on the complexity and production schedule, custom orders are usually completed within 2–5 business days.' },
            { question: 'Can I modify or cancel a custom order?', answer: 'Once a custom order enters production, it cannot be modified or canceled. Please confirm all details—including size, color, and logo design—before placing your order. If you need to make changes shortly after placing the order, contact us as soon as possible. We’ll do our best to assist, but we cannot guarantee changes.' },
            { question: 'How long does it take to receive an order confirmation after placing the order?', answer: 'Once the order is successfully placed, a confirmation email with your order number will be sent to your registered email. This email serves as your official receipt.' },
            { question: 'Can I change the address or cancel the order after placing it?', answer: 'Once the order enters the warehouse processing stage, changes or cancellations are no longer possible. If you need to modify the address shortly after placing the order, please contact customer service immediately with your order number and new address. We will do our best to assist, but success is not guaranteed. We strongly recommend confirming your shipping details before placing the order.' },
            { question: 'I placed two orders—can they be shipped together?', answer: 'If both orders have not yet entered the shipping process and share the same delivery address, we can help combine them. Please contact customer service as soon as possible with both order numbers. If combining shipments results in excess shipping fees, we will refund the difference.' },
            { question: 'Can I schedule a delivery time or request that the courier contact me in advance?', answer: 'Scheduled delivery is currently not supported. We recommend monitoring your tracking status around the expected delivery date or contacting the courier directly with your tracking number to make arrangements.' }
        ]
    },
    {
        title: '2. Payment & Receipts',
        items: [
            { question: 'What payment methods are accepted?', answer: 'We currently accept payments via PayPal only.' },
            { question: 'I chose bank transfer—can the processing be expedited?', answer: 'You may speed up the review process by sending us the bank transfer proof or Transaction Reference Number (TRN). However, please note that we can only proceed with shipping after the payment is officially received.' },
            { question: 'How can I obtain an invoice or receipt for my order?', answer: 'A formal invoice or receipt will be issued once your order is shipped. This document can be used for product warranty or tax purposes. If you have any special invoicing requests, please leave a note when placing your order.' }
        ]
    },
    {
        title: '3. Product & Warranty',
        items: [
            { question: 'Are the products you sell brand new?', answer: 'Yes, we only sell brand new products—never refurbished or second-hand. Each item undergoes strict quality inspection before shipment to ensure you receive a genuine, high-quality product.' },
            { question: 'Is the “in stock” status shown on the product page accurate?', answer: 'If the product can be added to your cart, it means it is currently in stock and ready for purchase.' },
            { question: 'Do the products require special maintenance?', answer: 'We recommend following the care instructions listed on the product page. For example, outdoor shade products should be kept away from prolonged exposure to rain and strong winds. Regular cleaning and drying before storage can help extend the lifespan. Some items come with detailed maintenance guides—please refer to the user manual inside the package after receiving your order.' },
            { question: 'Do your products come with a warranty?', answer: 'Yes, we offer basic after-sales support. If you encounter any quality issues during normal use, we will assist in resolving them. For detailed warranty coverage and terms, please refer to the product page or contact our customer service team.' }
        ]
    },
    {
        title: '4. Customer Support & Pre-Sales Consultation',
        items: [
            { question: 'Can I contact customer service before placing an order to confirm product details or custom requests?', answer: 'Absolutely. We encourage you to reach out to us via email before placing your order to confirm specifications such as size, material, color, or custom requirements. Our customer support team will respond with professional assistance within 24 hours.' }
        ]
    },
    {
        title: '5. Packaging & Inspection Upon Delivery',
        items: [
            { question: 'What should I do if the packaging is damaged or the quantity is incorrect upon delivery?', answer: 'Please take photos immediately upon receipt and contact our customer service via email within 48 hours. We will process your case promptly based on the provided photos and description, including reshipment or refund if necessary.' },
            { question: 'Is your product packaging eco-friendly?', answer: 'We are committed to sustainability. Our packaging materials are selected with environmental responsibility in mind, using recyclable and eco-friendly options whenever possible to protect both your product and the planet.' }
        ]
    },
    {
        title: '6. Special Orders & Business Partnerships',
        items: [
            { question: 'Do you offer bulk purchasing or OEM services?', answer: 'Yes, we support customized procurement, bulk orders, and OEM/private label services for business clients. Please email us your detailed requirements, and we will assign a dedicated representative to provide a tailored quotation and lead time plan.' },
            { question: 'Are there discounts for corporate purchasing or distribution partners?', answer: 'Yes, we offer tiered pricing and support for B2B clients and distributors. Please share your purchasing plan and target market information—our team will prepare a customized quotation for you.' },
            { question: 'How can I request a sample or place a small trial order?', answer: 'Samples and small trial orders are welcome. Please email our customer service with the product model, quantity, and intended use. We will confirm and provide a quotation within 1–2 business days.' },
            { question: 'Do you accept distributor or agency partnerships?', answer: 'Absolutely. We welcome cooperation with distributors, platform sellers, and design teams worldwide. Please email us your company profile, partnership proposal, and business scale—we will respond within 3 business days.' }
        ]
    },
    {
        title: '7. Taxes & Customs',
        items: [
            { question: 'Will I need to pay import taxes or additional fees after placing an order?', answer: 'No, you won’t. We offer Delivered Duty Paid (DDP) service—customs duties and all taxes are included in the shipping cost. You will receive your package without any extra charges.' }
        ]
    },
    {
        title: '8. Sample & Packaging Value-Added Services',
        items: [
            { question: 'Do you offer gift packaging or customized packaging services?', answer: 'Yes, we offer gift wrapping and branded custom packaging upon request. Please leave a note when placing your order or contact customer service to confirm the packaging style and any associated fees.' }
        ]
    },
    {
        title: '9. Product Use & Service-Related Questions',
        items: [
            { question: 'What should I know about product maintenance and cleaning?', answer: 'Different materials require different care. For example, mesh fabric products should be cleaned with a soft brush and mild detergent—avoid prolonged soaking. Metal parts should be wiped dry regularly to prevent rust. For more details, you can download our Care & Maintenance Manual.' },
            { question: 'Do you offer a referral or rewards program?', answer: 'Yes! We offer a referral rewards program—share your personal invitation link, and once your friend completes a purchase, you’ll receive shopping credits or points as a reward. Please refer to the "Referral Rewards" page for more information.' },
            { question: 'What if the product dimensions are slightly off?', answer: 'All of our standard products are manufactured with a tolerance of ±2cm, which is considered normal. If the size of the item you receive exceeds this range, please contact customer service with photos, and we will arrange a replacement or compensation.' },
            { question: 'Do you provide installation guides?', answer: 'Yes. A detailed installation manual is included in every product package. Some products also come with a QR code that links to a step-by-step installation video. If you encounter any issues during installation, feel free to contact our support team for assistance.' }
        ]
    }
]
</script>

<style scoped>
/* no accordion style needed */
</style>
