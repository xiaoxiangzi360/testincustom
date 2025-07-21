<template>
    <div class="p-2 md:p-10 mt-16">
        <div class="max-row">
            <h1
                class="text-2xl md:text-5xl mb-6 md:mb-8 bg-clip-text font-normal text-blackcolor text-center dark:text-white">
                Why Love inCustom
            </h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                <div v-for="(review, index) in reviews" :key="index" class="bg-white rounded-lg p-6 md:p-8">
                    <p
                        class="text-title mb-4 md:mb-6 text-base md:text-lg leading-relaxed min-h-40 border-b border-[rgba(46,46,12,0.1)] py-6">
                        {{ review.text }}
                    </p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3 md:gap-4">
                            <NuxtImg :src="review.avatar" :alt="review.name"
                                class="w-10 h-10 sm:w-16 sm:h-16 rounded-full object-cover" />
                            <div>
                                <h5 class="font-semibold text-title">{{ review.name }}</h5>
                                <div class="flex text-primary">
                                    <UIcon v-for="star in 5" :key="star" name="i-material-symbols-star"
                                        class="text-xl md:text-2xl" />
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-1 md:gap-2 self-end">
                            <span class="text-gray-500 text-xs md:text-sm">{{ review.date }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button
                    class="text-blackcolor bg-bright hover:opacity-90 text-white font-semibold py-3 px-8 md:py-4 md:px-12 rounded-md text-base md:text-lg transition-all duration-200">
                    Get Started It’s Free
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const reviews = [
    { name: "SELFLESS", text: "An outstanding competitor to CJ with much lower prices & fast fulfillment times,l was originally approached on WhatsApp by one of their agents and they have been very good to me. If you are starting with dropshipping I highly recommend Dropsure as they have much lower prices & source faster if you contact your agent.", avatar: "/images/avatar1.webp", date: "Nov 15, 2024" },
    { name: "RevvoHive", text: "Highly recommend. Dropshipping made easy. Once connected you will get a account manager that takes care of your orders.", avatar: "/images/avatar2.webp", date: "Nov 12, 2024" },
    { name: "Saint Drako", text: "Highly recommend Dropsure. Our agent Taylor Liu has been amazing to work with. I've worked with a lot of suppliers and Taylor has been the best agent by far and Dropsure has a great user interface. Easy to navigate and fulfill orders.", avatar: "/images/avatar3.webp", date: "Nov 10, 2024" },
    { name: "My Store", text: "Found this app on shopify while looking for a dropshipping supplier. Taylor has been really helpful with answering the questions I have.", avatar: "/images/avatar4.webp", date: "Nov 8, 2024" },
];
</script>

<style scoped></style>
