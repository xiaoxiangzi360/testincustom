<template>
  <div ref="shadowContainerRef"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  html: String
})

const shadowContainerRef = ref(null)

const createShadowContent = () => {
  if (!shadowContainerRef.value) return
  
  const shadowRoot = shadowContainerRef.value.attachShadow({ mode: 'open' })
  
  // 1. 加载 CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.ckeditor.com/ckeditor5/47.3.0/ckeditor5.css'
  shadowRoot.appendChild(link)
  
  // 2. 直接在 style 中定义所有需要的变量
  const style = document.createElement('style')
  style.textContent = `
    /* 在 Shadow DOM 中，:root 指的是 shadow host，所以直接定义变量 */
    /* 确保所有元素都能访问这些变量 */
    * {
      --ck-content-image-style-spacing: 1.5em;
    }
    
  `
  shadowRoot.appendChild(style)
  
  // 3. 添加内容
  const contentDiv = document.createElement('div')
  contentDiv.className = 'ck-content'
  contentDiv.innerHTML = props.html
  shadowRoot.appendChild(contentDiv)
}

onMounted(() => {
  createShadowContent()
})

watch(() => props.html, () => {
  if (shadowContainerRef.value?.shadowRoot) {
    const contentDiv = shadowContainerRef.value.shadowRoot.querySelector('.ck-content')
    if (contentDiv) {
      contentDiv.innerHTML = props.html
    }
  }
})
</script>