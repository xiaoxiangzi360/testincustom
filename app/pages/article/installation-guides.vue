<template>
    <div class="bg-white text-gray-800">
        <!-- 页面头部 -->
        <section class="py-12 px-6 text-center">
            <h1 class="text-4xl font-bold mb-4">Installation Guides</h1>
            <p class="text-lg max-w-2xl mx-auto">
                Learn how to easily and securely install your shade sail for maximum performance and durability.
            </p>
        </section>

        <!-- 内容部分 -->
        <section class="max-w-5xl mx-auto px-6 py-12 space-y-10">
            <!-- 1. Versatile Shade Sail Installation -->
            <div class="flex flex-col md:flex-row items-start gap-6">
                <div
                    class="flex-shrink-0 bg-primary-100 text-primary-600 rounded-lg h-12 w-12 flex items-center justify-center text-xl font-bold">
                    1</div>
                <div>
                    <h2 class="text-2xl font-semibold mb-3">Versatile Shade Sail Installation for Any Space</h2>
                    <p class="text-gray-600 leading-relaxed">
                        Our shade sails adapt to areas from compact corners to expansive outdoor zones.
                        Achieve custom coverage through strategic overlapping and creative configurations—
                        tailor-made for your unique space.
                    </p>
                </div>
            </div>

            <!-- 2. Secure Anchoring Solutions -->
            <div class="flex flex-col md:flex-row items-start gap-6">
                <div
                    class="flex-shrink-0 bg-primary-100 text-primary-600 rounded-lg h-12 w-12 flex items-center justify-center text-xl font-bold">
                    2</div>
                <div>
                    <h2 class="text-2xl font-semibold mb-3">Secure Anchoring Solutions</h2>
                    <p class="text-gray-600 leading-relaxed">
                        Anchor points mount firmly to walls or posts capable of sustaining tension loads.
                        For wall installations, our premium stainless-steel hardware ensures rock-solid stability.
                    </p>
                </div>
            </div>

            <!-- 3. Critical Drainage Angle -->
            <div class="flex flex-col md:flex-row items-start gap-6">
                <div
                    class="flex-shrink-0 bg-primary-100 text-primary-600 rounded-lg h-12 w-12 flex items-center justify-center text-xl font-bold">
                    3</div>
                <div>
                    <h2 class="text-2xl font-semibold mb-3">Critical Drainage Angle</h2>
                    <p class="text-gray-600 leading-relaxed">
                        Always position at least one corner <strong>25° lower</strong>. This slope prevents water
                        pooling and extends product lifespan.
                    </p>
                </div>
            </div>

            <!-- 4. Tension Matters -->
            <div class="flex flex-col md:flex-row items-start gap-6">
                <div
                    class="flex-shrink-0 bg-primary-100 text-primary-600 rounded-lg h-12 w-12 flex items-center justify-center text-xl font-bold">
                    4</div>
                <div>
                    <h2 class="text-2xl font-semibold mb-3">Tension Matters</h2>
                    <ul class="list-disc pl-5 space-y-2 text-gray-600">
                        <li><strong>Sleek aesthetics</strong> with wrinkle-free surfaces</li>
                        <li><strong>Enhanced durability</strong> against wind uplift and tearing</li>
                        <li><strong>Efficient self-cleaning</strong> through rapid rainwater runoff</li>
                        <li><strong>Zero standing water</strong> protection</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
definePageMeta({
    title: 'Installation Guides',
    description: 'Learn how to securely install your shade sail for best results.',
    navOrder: 2,
    type: 'primary',
})
</script>
