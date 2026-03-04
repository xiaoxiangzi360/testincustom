<script setup lang="ts">
const route = useRoute()
const isHiddenFooter = computed(() => route.path.includes('/testHeader'))
const isHiddenHeader = computed(() => route.path.includes('/testFooter'))
const {headerHeight} = useHeaderHeight()
const pageMeta = computed(() => {
  return {
    title: route.meta.title,
    description: route.meta.description,
    ogImage: route.meta.ogImage,
    canonicalUrl: route.meta.canonicalUrl || route.fullPath,
    generator: route.meta.generator,
    tags: route.meta.tags,
  }
})
console.log('pageMeta==canonicalUrl===', pageMeta.value,route.meta.canonicalUrl,route.fullPath)
useHeadAndMeta(pageMeta.value)
useOgImage()
</script>

<template>
  <div>
    <!-- <div class="container mx-auto"> -->
    <div class="min-h-screen flex flex-col dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-hind">
      <template v-if="!isHiddenHeader">
        <NavBar />
      </template>
      <main :style="{ marginTop: `${headerHeight}px` }" class="bg-white">
        <slot />
      </main>
      <template v-if="!isHiddenFooter">
        <TheFooter />
      </template>
    </div>
    <!-- </div> -->
  </div>
</template>
<style></style>
