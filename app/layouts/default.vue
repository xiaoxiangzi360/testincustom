<script setup lang="ts">
const route = useRoute()
const isHiddenFooter = computed(() => route.path.includes('/testHeader'))
const isNewFooter = computed(() => route.path.includes('/testFooter'))
const isOldFooter = computed(() => route.path.includes('/testOldFooter'))

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
console.log('pageMeta==canonicalUrl===', pageMeta.value, route.meta.canonicalUrl, route.fullPath)
useHeadAndMeta(pageMeta.value)
useOgImage()
</script>

<template>
  <div>
    <!-- <div class="container mx-auto"> -->
    <div class="min-h-screen flex flex-col dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-hind">
      <template v-if="!(isNewFooter || isOldFooter)">
        <NavBar />
      </template>
      <main class="mt-[80px] lg:mt-[100px] bg-white">
        <slot />
      </main>
      <template v-if="!isHiddenFooter">
        <template v-if="isOldFooter">
          <TheFooter1 />
        </template>
        <template v-else>
          <TheFooter />
        </template>
      </template>
    </div>
    <!-- </div> -->
  </div>
</template>
<style></style>
