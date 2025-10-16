import { defineNuxtPlugin } from '#app'
import ckContentCss from '@/assets/css/ckeditor-content.css?raw' // 推荐 ?raw 比 ?inline 稳定

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('shadow-html', {
        mounted(el: HTMLElement, binding) {
            const shadow = el.attachShadow({ mode: 'open' })

            // ① 注入 CSS
            const styleEl = document.createElement('style')
            styleEl.textContent = ckContentCss
            shadow.appendChild(styleEl)

            // ② 创建内容容器（必须加 ck-content）
            const contentEl = document.createElement('div')
            contentEl.classList.add('ck-content') // ✅ 关键
            contentEl.innerHTML = binding.value || ''
            shadow.appendChild(contentEl)

                ; (el as any).__shadowDom__ = { shadow, styleEl, contentEl }
        },
        updated(el: HTMLElement, binding) {
            const ctx = (el as any).__shadowDom__
            if (!ctx) return
            ctx.contentEl.innerHTML = binding.value || ''
        },
        unmounted(el: HTMLElement) {
            ; (el as any).__shadowDom__ = null
        },
    })
})
