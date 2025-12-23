<script setup lang="ts">
const { isMobileMenuOpen, openMobileMenu } = useMobileMenu()
</script>
<template>
  <NuxtImg src="cell.png" 
    @click="openMobileMenu" :style="{ width: '24px', height: '24px' }" />
  <!-- <UIcon :name="isMobileMenuOpen ? 'i-material-symbols-close' : 'i-material-symbols-menu'
    " @click="openMobileMenu" :style="{ width: '24px', height: '24px' }" /> -->
</template>
<style scoped></style>
