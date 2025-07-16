<script setup lang="ts">
const { isMobileMenuOpen, openMobileMenu } = useMobileMenu()
</script>
<template>
  <UIcon class="w-7 h-7" width="28" height="28" :name="isMobileMenuOpen ? 'i-material-symbols-close' : 'i-material-symbols-menu'
    " @click="openMobileMenu" />
</template>
<style scoped></style>
