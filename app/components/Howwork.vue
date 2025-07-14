<template>
    <div class="bg-[#F7F7F7] p-6 md:p-10 ">
        <div class="max-row">
            <h1 class="text-3xl md:text-4xl font-bold text-center text-title mb-10 md:mb-16">
                How It Works with INcustom
            </h1>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <!-- Step 1 -->
                <div class="step-card">
                    <div class="step-image">
                        <img :src="step1Image" alt="Design Tool" />
                    </div>
                    <div class="text-sm text-gray-500 mb-2">Step 1</div>
                    <h3 class="step-title text-title">Create Your Design</h3>
                    <p class="step-text text-title">
                        Upload your artwork or use our built-in design tools to customize a wide range of products,
                        including t-shirts, hoodies, accessories and more.
                    </p>
                    <button class="step-button bg-[#52E08D]">Start</button>
                </div>

                <!-- Step 2 -->
                <div class="step-card">
                    <div class="step-image">
                        <img :src="step2Image" alt="Store Integration" />
                    </div>
                    <div class="text-sm text-gray-500 mb-2">Step 2</div>
                    <h3 class="step-title text-title">Connect Your Store</h3>
                    <p class="step-text text-title">
                        Seamlessly integrate with Shopify, Etsy, WooCommerce and other major e-commerce platforms to
                        sync your PrintCraft products.
                    </p>
                    <button class="step-button bg-[#2FBA69]">Start</button>
                </div>

                <!-- Step 3 -->
                <div class="step-card">
                    <div class="step-image">
                        <img :src="step3Image" alt="Product Listing" />
                    </div>
                    <div class="text-sm text-gray-500 mb-2">Step 3</div>
                    <h3 class="step-title text-title">List & Start Selling</h3>
                    <p class="step-text text-title">
                        Add product details, descriptions, and pricing, then publish them to your store and start
                        selling to your customers worldwide.
                    </p>
                    <button class="step-button bg-[#2FBA69]">Start</button>
                </div>

                <!-- Step 4 -->
                <div class="step-card">
                    <div class="step-image">
                        <img :src="step4Image" alt="Production & Shipping" />
                    </div>
                    <div class="text-sm text-gray-500 mb-2">Step 4</div>
                    <h3 class="step-title text-title">Production & Shipping</h3>
                    <p class="step-text text-title">
                        When you receive an order, we handle the printing and shipping directly to your customers - no
                        inventory management needed.
                    </p>
                    <button class="step-button bg-[#2FBA69]">Start</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const step1Image = '/images/work1.png';
const step2Image = '/images/work2.png';
const step3Image = '/images/work3.png';
const step4Image = '/images/work4.png';
</script>

<style scoped>
.step-card {
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #f3f3f3;
    transition: transform 0.3s ease-in-out;
}

.step-card:hover {
    transform: translateY(-8px);
}

.step-image {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
}

.step-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.step-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2a2a2a;
    margin-bottom: 10px;
}

.step-text {
    color: #4a4a4a;
    margin-bottom: 16px;
    min-height: 80px;
}

.step-button {
    width: 100%;
    color: white;
    padding: 10px 0;
    border-radius: 8px;
    transition: background-color 0.3s;
}

.step-card {
    display: flex;
    flex-direction: column;
}

.step-text {
    flex-grow: 1;
    /* 让文本部分自动填充 */
}

.step-button:hover {
    background-color: #059669;
}

.grid {
    display: grid;
    grid-template-rows: auto 1fr auto;
}

/* 响应式优化 */
@media (max-width: 640px) {
    .step-card {
        padding: 12px;
    }

    .step-title {
        font-size: 1.125rem;
    }

    .step-text {
        font-size: 0.875rem;
    }

    .step-button {
        font-size: 0.875rem;
    }
}
</style>
