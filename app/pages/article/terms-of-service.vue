<template>
    <div class="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <section v-for="(section, index) in terms" :key="index">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
                {{ section.title }}
            </h2>
            <div class="space-y-3 text-gray-700 leading-relaxed">
                <p v-for="(para, pIndex) in section.content" :key="pIndex">
                    {{ para }}
                </p>
                <ul v-if="section.list" class="list-disc list-inside space-y-1">
                    <li v-for="(item, iIndex) in section.list" :key="iIndex">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script setup>
const terms = [
    {
        title: 'Overview',
        content: [
            'This website is operated by InCustom. Throughout the site, the terms “we,” “us,” and “our” refer to InCustom. InCustom offers this website to you (the user), including all information, tools, and services available from this site, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.',
            'By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”), including any additional terms and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including but not limited to browsers, vendors, customers, merchants, and/or contributors of content.',
            'Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these terms.',
            'We reserve the right to update, change, or replace any part of these Terms of Service at any time. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.'
        ]
    },
    {
        title: 'Section 1 – Online Store Terms',
        content: [
            'By agreeing to these Terms of Service, you represent that you are at least the age of majority in your country or province of residence, or that you have given us your consent to allow any of your minor dependents to use this site.',
            'You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).',
            'You must not transmit any worms or viruses or any code of a destructive nature.',
            'A breach or violation of any of the Terms will result in an immediate termination of your Services.'
        ]
    },
    {
        title: 'Section 2 – General Conditions',
        content: [
            'We reserve the right to refuse service to anyone for any reason at any time.',
            'You understand that your content (not including credit card information) may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.',
            'You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, or access to the Service without express written permission from us.'
        ]
    },
    {
        title: 'Section 3 – Accuracy, Completeness, and Timeliness of Information',
        content: [
            'We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions.',
            'This site may contain certain historical information. Historical information is not necessarily current and is provided for your reference only.',
            'We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information. You agree that it is your responsibility to monitor changes to our site.'
        ]
    },
    {
        title: 'Section 4 – Modifications to the Service and Prices',
        content: [
            'Prices for our products are subject to change without notice.',
            'We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.',
            'We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the Service.'
        ]
    },
    {
        title: 'Section 5 – Products or Services',
        content: [
            'Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.',
            'Orders automatically enter production within 10 minutes after payment. If canceled after this time, only shipping fees may be refunded.',
            'We have made every effort to display as accurately as possible the colors and images of our products that appear on the store. We cannot guarantee that your computer monitor’s display of any color will be accurate.',
            'We reserve the right to limit the sales of our products or services to any person, geographic region, or jurisdiction.',
            'We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.'
        ]
    },
    {
        title: 'Section 6 – Accuracy of Billing and Account Information',
        content: [
            'We reserve the right to refuse any order you place with us. In our sole discretion, we may limit or cancel quantities purchased per person, per household, or per order.',
            'These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. If we make a change to or cancel an order, we may attempt to notify you via the email and/or billing address/phone number provided at the time the order was made.',
            'We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.',
            'You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.',
            'For more details, please review our Return Policy.'
        ]
    },
    {
        title: 'Section 7 – Optional Tools',
        content: [
            'We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.',
            'You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations, or conditions of any kind and without any endorsement.',
            'We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.',
            'Any use by you of optional tools offered through the site is entirely at your own risk and discretion, and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).',
            'We may also, in the future, offer new services and/or features through the website (including the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.'
        ]
    },
    {
        title: 'Section 8 – Third-Party Links',
        content: [
            'Certain content, products, and services available via our Service may include materials from third parties.',
            'Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy, and we do not warrant and will not have any liability or responsibility for any third-party materials or websites.',
            'We are not liable for any harm or damages related to the purchase or use of goods, services, resources, or any other transactions made in connection with any third-party websites.',
            'Please review the third party’s policies and practices carefully and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third party.'
        ]
    },
    {
        title: 'Section 9 – User Comments, Feedback, and Other Submissions',
        content: [
            'If, at our request, you send certain specific submissions (e.g., contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials (collectively, "comments"), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate, and otherwise use in any medium any comments that you forward to us.',
            'We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.',
            'We may, but have no obligation to, monitor, edit, or remove content that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, obscene, or otherwise objectionable, or violates any party’s intellectual property or these Terms of Service.',
            'You agree that your comments will not violate any right of any third party, including copyright, trademark, privacy, personality, or other personal or proprietary rights.',
            'You further agree that your comments will not contain libelous or otherwise unlawful, abusive, or obscene material, or any computer virus or other malware that could in any way affect the operation of the Service or any related website.',
            'You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third party.'
        ]
    },
    {
        title: 'Section 10 – Payment and Fees',
        content: [
            'You are required to provide a valid payment method (e.g., credit card, PayPal) to pay for services provided by InCustom.',
            'All fees will be automatically charged to your payment method. You may also be responsible for additional charges related to refunds or disputes (e.g., a $15 USD handling fee per refund).',
            'When placing an order or making a payment, you warrant that:',
            '● You are authorized to use the payment method provided (i.e., you are the cardholder or have authorization).',
            '● In the event of unauthorized use, you are personally responsible and will compensate us for any resulting damages.',
            '● The billing information you provide must be accurate, and you bear full responsibility for any payment disputes.',
            'If you or your customer requests a refund or initiates a claim without following our refund policy, you will be liable for our fulfillment costs and refund handling fees (up to $15 USD per transaction).',
            'We reserve the right to decline or suspend any transaction at our discretion without incurring any liability.'
        ]
    },
    {
        title: 'Section 11 – Copyright Statement',
        content: [
            '1. We value intellectual property rights. When using InCustom services, you agree to the following: You must own the rights to any images you upload for design and printing purposes.',
            '2. Uploading offensive images is strictly prohibited, including explicit sexual content, racial slurs, hate speech, or degrading materials.',
            '3. You are fully responsible for any designs you upload, including any copyright disputes. We assume no liability for violations of copyright laws.',
            '4. You retain rights to your designs, but by uploading them to InCustom, you grant us the right to use them for previews and mockups. We also reserve the right to remove any designs that violate our policies.',
            '5. We reserve the right to refuse printing or to delete content that violates copyright rules. If your upload violates our policies, we may remove it without prior notice.'
        ]
    },
    {
        title: 'Section 12 – Personal Information',
        content: [
            'Your submission of personal information through the site is governed by our Privacy Policy. Please review it for more details.'
        ]
    },
    {
        title: 'Section 13 – Errors, Inaccuracies, and Omissions',
        content: [
            'Occasionally there may be information on our site that contains typographical errors, inaccuracies, or omissions relating to product descriptions, pricing, promotions, availability, shipping charges, delivery times, etc.',
            'We reserve the right to correct any errors, inaccuracies, or omissions, and to change or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).',
            'We undertake no obligation to update, amend, or clarify information in the Service or on any related website, except as required by law. No specified update or refresh date should be taken to indicate that all information has been modified or updated.'
        ]
    },
    {
        title: 'Section 14 – Prohibited Uses',
        content: [
            'You are prohibited from using the site or its content:'
        ],
        list: [
            '(a) for any unlawful purpose;',
            '(b) to solicit others to perform or participate in any unlawful acts;',
            '(c) to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances;',
            '(d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;',
            '(e) to harass, abuse, insult, harm, defame, slander, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;',
            '(f) to submit false or misleading information;',
            '(g) to upload or transmit viruses or any other type of malicious code;',
            '(h) to collect or track the personal information of others;',
            '(i) to spam, phish, pharm, pretext, spider, crawl, or scrape;',
            '(j) for any obscene or immoral purpose;',
            '(k) to interfere with or circumvent the security features of the Service or any related website.'
        ]
    },
    {
        title: 'Section 15 – Disclaimer of Warranties; Limitation of Liability',
        content: [
            'We do not guarantee that your use of our service will be uninterrupted, timely, secure, or error-free.',
            'We do not warrant that results from the use of the service will be accurate or reliable.',
            'You expressly agree that your use of, or inability to use, the service is at your sole risk.',
            'In no case shall InCustom or its representatives be liable for any direct, indirect, incidental, punitive, special, or consequential damages.',
            'Where jurisdictions do not allow exclusion or limitation of liability, our liability is limited to the maximum extent permitted by law.'
        ]
    },
    {
        title: 'Section 16 – Indemnification',
        content: [
            'You agree to indemnify, defend, and hold harmless InCustom and its affiliates from any third-party claims arising out of your breach of these Terms or violation of any law or third-party rights.'
        ]
    },
    {
        title: 'Section 17 – Severability',
        content: [
            'If any provision of these Terms is deemed unlawful or unenforceable, it will still be enforced to the fullest extent, and the rest will remain valid.'
        ]
    },
    {
        title: 'Section 18 – Termination',
        content: [
            'These Terms remain effective until terminated by either party. You may terminate at any time by ceasing use of the site.',
            'We may terminate this agreement at any time without notice if you breach any provision, and you will remain liable for all amounts due.'
        ]
    },
    {
        title: 'Section 19 – Entire Agreement',
        content: [
            'These Terms and any policies posted constitute the entire agreement between you and InCustom and supersede all prior agreements.'
        ]
    },
    {
        title: 'Section 20 – Governing Law',
        content: [
            'These Terms are governed by the laws of the People’s Republic of China. For cross-border disputes, Hong Kong SAR law may apply upon mutual agreement.'
        ]
    },
    {
        title: 'Section 21 – Changes to Terms of Service',
        content: [
            'We may update these Terms at any time. It is your responsibility to check for changes. Continued use after changes constitutes acceptance.'
        ]
    },
    {
        title: 'Section 22 – Contact Information',
        content: [
            'If you have any questions or concerns regarding this Privacy Policy, please contact us at:',
            '📧 Email: support@incustom.com',
            '📞 Phone: +1 458-329-6702',
            '🏢 Mailing Address: InCustom Inc., 1720 Monticello Ct Ontario, CA 91761'
        ]
    }
];
</script>

<style scoped></style>
