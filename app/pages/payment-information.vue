<template>
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-customblack">
        <h1 class="text-[28px] font-bold mb-8 text-center">Payment Information</h1>
        <p class="text-gray-600 leading-relaxed mb-4">We are committed to providing you with a secure and convenient
            checkout
            experience. Below you will find all the payment methods we accept.</p>
        <h2 class="text-[24px] font-bold mb-2">Accepted Payment Methods</h2>
        <p class="text-gray-600 leading-relaxed mb-4">You can complete your purchase using any of the following secure
            payment options at checkout:</p>
        <div v-for="(section, index) in topSections" :key="index" class="mb-4">
            <h2 class="text-[18px] font-semibold text-customblack mb-2">{{ section.title }}</h2>
            <div class="">
                <div v-for="(item, idx) in section.items" :key="idx" class="p-2">
                    <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ item.text }}</p>
                </div>
            </div>
        </div>
        <div v-for="(section, index) in faqSections" :key="index" class="mb-4">
            <h2 class="text-[24px] font-semibold text-customblack mb-2">{{ section.title }}</h2>
            <div class="">
                <div v-for="(item, idx) in section.items" :key="idx" class="p-2">
                    <p class="font-medium text-gray-800 mb-1">Q: {{ item.question }}</p>
                    <p class="text-gray-600 leading-relaxed">A: {{ item.answer }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Payment Information - Secure Checkout & Methods',
    meta: [
        { name: 'description', content: 'Explore our secure payment options, accepted methods, and transaction policies. Get details on billing, currencies, refunds, and payment security for your custom orders.' }
    ]
})

const topSections = [
    {
        title: 'Major Credit & Debit Cards:',
        items: [
            { text: 'Visa\nMastercard\nAmerican Express\nJCB', },
        ]
    },
    {
        title: 'Digital & Quick Pay Wallets:',
        items: [
            { text: 'Apple Pay\nGoogle Pay\nPayPal', },
        ]
    },
]
const faqSections = [
    {
        title: 'Frequently Asked Questions',
        items: [
            { question: 'Is my payment information secure?', answer: 'Absolutely. Your security is our top priority. We use industry-standard SSL encryption to protect your data. All credit card transactions are securely processed by our certified payment gateway, and we do not store your complete card details on our servers.' },
            { question: 'Will I be charged a foreign transaction fee?', answer: 'If your credit card is issued in a currency different from your order\'s currency (e.g., USD), your bank may apply a foreign transaction fee. This fee and the exchange rate are determined solely by your card issuer. We recommend contacting your bank for details before you pay.' },
            { question: 'What are the benefits of using PayPal, Apple Pay, or Google Pay?', answer: 'Using digital wallets offers a faster and more secure checkout:\nSpeed: No need to manually enter card details for every purchase.\nSecurity: Your card number is never shared with us directly, adding an extra layer of protection.\nConvenience: Manage all your transactions within your wallet app.' },
            { question: 'Why was my credit card payment declined?', answer: 'Declines are usually determined by your bank. Common reasons include:Incorrect entry of the card number, expiration date, or CVV code.The purchase exceeding your card\'s transaction or daily limit.Your bank\'s fraud protection blocking an unexpected international online transaction.What to do: 1) Double-check all information, 2) Contact your bank to authorize the transaction.' },
            { question: 'How do I get a receipt after paying?', answer: 'An electronic receipt is automatically generated and sent to your account\'s email address immediately after successful payment. You can also view and download receipts anytime from the \"Order History\" section in your account.' },
            { question: 'Can I split my payment across multiple methods?', answer: 'Currently, we require the full order amount to be paid using one payment method per transaction. Split payments are not available.' },
            { question: 'What should I do if I encounter an error during payment?', answer: 'If your payment fails or you experience technical issues:\n1.Refresh the page and try again.\n2.Ensure you have a stable internet connection.\n3.If the problem persists, please take a screenshot of any error message and contact our Customer Support team. Please do not submit multiple orders in a short period to avoid duplicate charges.' }

        ]
    },
]
</script>

<style scoped>
/* no accordion style needed */
</style>
