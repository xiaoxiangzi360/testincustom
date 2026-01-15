<template>
    <div class="bg-white text-gray-800">
        <!-- 页面头部 -->
        <section class="py-12 px-6 text-center">
            <h1 class="text-4xl font-bold mb-4">How to Measure</h1>
            <p class="text-lg max-w-2xl mx-auto">
                Follow these simple steps to accurately measure your space for the perfect shade sail fit.
            </p>
        </section>

        <!-- 内容部分 -->
        <section class="max-w-5xl mx-auto px-6 py-12 space-y-10">
            <!-- 1. Measure Your Space -->
            <div class="flex flex-col md:flex-row items-start gap-6">
                <div
                    class="flex-shrink-0 bg-primary-100 text-primary-600 rounded-lg h-12 w-12 flex items-center justify-center text-xl font-bold">
                    1</div>
                <div>
                    <h2 class="text-2xl font-semibold mb-3">Measure Your Space</h2>
                    <p class="text-gray-600 leading-relaxed">
                        Identify a triangular or rectangular area for your shade sail.
                        Record all three side lengths for triangles, or length and width for rectangles.
                    </p>
                </div>
            </div>

            <!-- 2. Example Calculation -->
            <div class="flex flex-col md:flex-row items-start gap-6">
                <div
                    class="flex-shrink-0 bg-primary-100 text-primary-600 rounded-lg h-12 w-12 flex items-center justify-center text-xl font-bold">
                    2</div>
                <div>
                    <h2 class="text-2xl font-semibold mb-3">Example Calculation</h2>
                    <p class="text-gray-600 leading-relaxed mb-3">
                        For an <strong>18 ft × 14 ft</strong> rectangular area:
                    </p>
                    <div class="bg-gray-50 border-l-4 border-primary-400 p-4 rounded-md mb-4">
                        <p>Diagonal = √(18² + 14²) = <strong>22.8 ft</strong></p>
                        <p>Aspect Ratio: <strong>18:14 = 9:7</strong></p>
                    </div>
                    <h3 class="text-lg font-medium mb-2">Step 2: Determine Sail Size</h3>
                    <p class="text-gray-600 mb-3">
                        Deduct diagonal <strong>1-3 ft</strong> for mounting hardware:
                    </p>
                    <p class="bg-gray-50 border-l-4 border-primary-400 p-4 rounded-md">
                        Adjusted diagonal: <strong>19.8 ft - 21.8 ft</strong><br />
                        Corresponding sail dimensions:<br />
                        • Length: <strong>15.7 ft - 17.3 ft</strong><br />
                        • Width: <strong>12.2 ft - 13.6 ft</strong><br />
                        <span class="text-sm text-gray-500">(Calculated via reverse Pythagorean theorem)</span>
                    </p>
                </div>
            </div>

            <!-- 3. Simplify the Process -->
            <div class="flex flex-col md:flex-row items-start gap-6">
                <div
                    class="flex-shrink-0 bg-primary-100 text-primary-600 rounded-lg h-12 w-12 flex items-center justify-center text-xl font-bold">
                    3</div>
                <div>
                    <h2 class="text-2xl font-semibold mb-3">Simplify the Process</h2>
                    <p class="text-gray-600 leading-relaxed">
                        Need help with measurements? Send your space dimensions to our
                        <span class="font-semibold">customer service</span> for personalized shade sail size
                        recommendations!
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
definePageMeta({
    title: 'How to Measure',
    description: 'Step-by-step guide to measure your space for the perfect shade sail size.',
    navOrder: 3,
    type: 'primary',
})
</script>
