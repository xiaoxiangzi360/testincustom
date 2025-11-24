<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
            We’ll Be Back Soon!
        </h1>

        <p class="text-gray-600 max-w-xl mb-6">
            Our website is currently undergoing scheduled maintenance to improve your experience.
            We’re working hard to bring everything back online as soon as possible. Thank you for
            your patience and understanding.
        </p>

        <div class="flex items-center gap-3 text-gray-500 text-sm">
            <span class="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
            <span>System Maintenance in Progress</span>
        </div>

        <footer class="mt-10 text-xs text-gray-400">
            © {{ new Date().getFullYear() }} All rights reserved.
        </footer>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'blank',
    name: 'Login',
    title: 'Login',
    description: 'INcustom Login',
});
</script>

<style scoped></style>
