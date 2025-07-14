<script setup lang="ts">
definePageMeta({
    // layout: 'default',
    // name: 'Help & FAQs',
    // alias: 'Help & FAQs',
    title: 'Help & FAQs',
    description: "We're Here to Help: Your Support Hub!",
    navOrder: '12',
    type: 'secondary',
    icon: 'i-mdi-home',
    // ogImage: 'images/ogImage.png', // url or local images inside public folder, for eg, ~/public/images/ogImage.png
})
useHead({
    title: 'Help & FAQs',
    meta: [
        { name: 'description', content: "We're Here to Help: Your Support Hub!" }
    ]
})

</script>
<template>
    <div style="
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    ">
        <span style="color: #0198cd">help-faqs.vue (Nuxt 3.6)</span>
    </div>
</template>
<style scoped></style>
