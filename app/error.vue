<script setup>
const props = defineProps({
  error: {
    type: Object,
    default(/*rawProps*/) {
      return {
        url: '-',
        statusCode: 404,
        statusMessage: 'Not Found',
        message: '(404 Not Found)',
        stack: '',
        data: '{"error":"FetchError:  (404 Not Found)"}',
      }
    },
  },
})

const message = computed(() => String(props.error?.message || ''))
const is404 = computed(
  () => props.error?.statusCode === 404 || message.value?.includes('404'),
)
const isDev = import.meta.dev

function handleError() {
  return clearError({ redirect: '/' })
}
</script>
<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <div class="lg:min-h-[500px] flex flex-col bg-white">
      <!-- 主体 -->
      <main class="flex flex-col flex-1 items-center justify-center text-center p-6">
        <!-- <h1 class="text-[60px] font-extrabold text-primary mb-2">404</h1>
        <p class="text-xl font-medium text-gray-800 mb-3">Page Not Found</p> -->
        <p class="text-gray-500 mb-8 max-w-md">
          The product you want to access has been removed from the shelves. We recommend you to view similar products.
        </p>

        <UButton color="primary" size="lg" class="px-8 py-3 rounded-md" @click="handleError">
          Back to Home
        </UButton>
      </main>

    </div>
  </NuxtLayout>
</template>
