<template>
    <div class="bg-white text-gray-800 px-6 md:px-16 py-12 max-w-5xl mx-auto leading-relaxed">
        <h1 class="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>

        <div v-for="section in sections" :key="section.title" class="mb-10">
            <h2 class="text-xl md:text-2xl font-semibold mb-4">{{ section.title }}</h2>
            <div class="space-y-4">
                <p v-for="(para, index) in section.content" :key="index">{{ para }}</p>
            </div>
        </div>

        <div class="border-t pt-6 mt-12 text-sm text-gray-500">
            <p>If you have any questions or concerns regarding this Terms of Service, please contact us:</p>
            <ul class="mt-4 space-y-1">
                <li><strong>Email:</strong> support@incustom.com</li>
                <li><strong>Phone:</strong> +1-XXX-XXX-XXXX</li>
                <li><strong>Mailing Address:</strong> InCustom Inc., XXXX Street, XXXCity, XXXCountry</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const sections = [
    {
        title: 'Overview',
        content: [
            'This website is operated by InCustom. Throughout the site, the terms "we," "us," and "our" refer to InCustom...',
            'By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms...'
        ]
    },
    {
        title: 'Section 1 – Online Store Terms',
        content: [
            'By agreeing to these Terms of Service, you represent that you are at least the age of majority in your country...',
            'You must not transmit any worms or viruses or any code of a destructive nature...'
        ]
    },
    {
        title: 'Section 2 – General Conditions',
        content: [
            'We reserve the right to refuse service to anyone for any reason at any time...',
            'You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service...'
        ]
    },
    // 省略部分，按实际内容继续添加
    {
        title: 'Section 20 – Governing Law',
        content: [
            'These Terms of Service and any agreements whereby we provide you services shall be governed by the laws of the People’s Republic of China...',
            'In the event of cross-border disputes...'
        ]
    },
    {
        title: 'Section 21 – Changes to Terms of Service',
        content: [
            'We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service at any time...',
            'Your continued use of our website constitutes acceptance of those changes.'
        ]
    }
]
</script>

<style scoped>
/* Optional: add scroll margin if anchor linking is used */
h2 {
    scroll-margin-top: 80px;
}
</style>
