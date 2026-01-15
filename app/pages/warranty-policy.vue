<template>
    <section class="px-6 py-12 max-w-4xl mx-auto text-gray-800">
        <h1 class="text-3xl font-bold mb-6 text-center">Lifetime Warranty & Guarantee</h1>
        <p class="mb-6">At inCustom, we don’t just make custom window coverings—we craft enduring pieces for your space. We build every shade with such confidence in its materials and craftsmanship that we back it with a Lifetime Limited Warranty. This is our ultimate promise of quality and our commitment to your long-term satisfaction.</p>
        <div class="space-y-5">
            <div v-for="(item, index) in warrantyData" :key="index">
                <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
                <p v-if="item.subTitle" class="mb-2">{{ item.subTitle }}</p>
                <ol class="list-disc ml-6 whitespace-pre-line">
                    <li v-for="(contentItem, contentIndex) in item.content" :key="contentIndex">
                        {{ contentItem }}
                    </li>
                </ol>
            </div>
        </div>
    </section>
</template>

<script setup>
const warrantyData = [
    {
        title: "🛡 What’s Covered for a Lifetime",
        subTitle: "We warranty the following against defects for the lifetime of the product owned by the original purchaser:",
        content: [
            "Materials & Fabric: Deterioration, tearing, or peeling not caused by external damage.",
            "Workmanship & Construction: Issues with seams, stitching, or assembly under normal use.",
            "Core Hardware & Mechanisms: Malfunction of operating systems, mounting brackets, rails, and internal components."
        ]
    },
    {
        title: "📏 Measurement Assurance: Our Promise of Fit",
        subTitle: "We understand that precise measurement is crucial. To give you complete peace of mind on your first order, we offer a one-time Measurement Assurance for accidental sizing errors:",
        content: [
            "Coverage: If the product you receive does not fit due to an error in the measurements you provided, we will remake the correct item one time at no cost for the original purchase.",
            "Conditions: This assurance requires notification within 7 days of delivery, and clear photographic evidence showing the discrepancy between the product and your window. It applies only to sizing issues and not to changes in color preference or design.",
            "Important: This is a complimentary service program designed to protect your investment. It is separate from, and does not affect, the terms of the Lifetime Warranty above."
        ]
    },
    {
        title: "📜 Warranty Scope & Limitations",
        subTitle: null,
        content: [
            "Transferability: This warranty is valid for the original purchaser and the original installation address.",
            "Commercial Use: Products installed in commercial or high-traffic environments are covered by a 10-Year Commercial Warranty. Please contact us for details.",
            "Custom & Oversized Orders: All custom projects are fully covered under this Lifetime Warranty, affirming our confidence in every order, regardless of size or complexity."
        ]
    },
    {
        title: "⚙️ What’s Not Covered",
        subTitle: "To ensure clarity, this warranty does not cover:",
        content: [
            "Improper Installation or Care: Damage resulting from incorrect installation, modification, or failure to follow care instructions.",
            "Accidents & External Damage: Damage from accidents, misuse, or exposure to extreme force or catastrophic weather events.",
            "Normal Wear & Fading: Gradual fading due to direct, prolonged sunlight exposure, or natural wear from use over time.",
            "Secondary Issues: Mold, mildew, or damage resulting from environmental factors like excessive moisture."
        ]
    },
    {
        title: "🔧 How to File a Claim",
        subTitle: "Initiating a claim is straightforward. Please contact our dedicated service team with:",
        content: [
            "Your original order number.",
            "Clear photos or video demonstrating the issue.",
            "A brief description of the problem and your current shipping address.",
            `Email: hello@incustom.com \n Response Pledge: We will acknowledge your claim within 6 business hours and guide you through a simple resolution process.`
        ]
    },
    {
        title: "💎 Our Unwavering Promise",
        subTitle: null,
        content: [
            "Your vision deserves permanence. Our Lifetime Warranty is the foundation of our trust—ensuring that your investment in custom beauty is protected, year after year. We are your partner in crafting spaces that last."
        ]
    }
];

useHead({
    title: 'Warranty & Quality Guarantee',
    meta: [
        { name: 'description', content: 'inCustom stands behind the quality of our custom products. Read our warranty policy to understand what is covered and how to make a claim.' }
    ]
});
</script>
