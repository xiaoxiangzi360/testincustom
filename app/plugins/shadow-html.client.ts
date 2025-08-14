import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('shadow-html', {
        mounted(el: HTMLElement, binding) {
            // 创建 ShadowRoot
            const shadow = el.attachShadow({ mode: 'open' })

            // 可选：基础样式，防止内容太“裸”
            const baseCss = `
        :host { all: initial; color: #222; line-height: 1.6; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; }
        * { box-sizing: border-box; }
        img { max-width: 100%; height: auto; display: block; }
        p { margin: .8em 0; }
        h1,h2,h3,h4,h5,h6 { margin: 1em 0 .5em; font-weight: 600; line-height: 1.25; }
        h1{font-size:2rem;} h2{font-size:1.5rem;} h3{font-size:1.25rem;}
        ul,ol{ padding-left: 1.2em; margin:.6em 0; }
        a{ color:#0ea5e9; text-decoration: underline; }
        table{ width:100%; border-collapse: collapse; margin:1em 0; }
        th,td{ border:1px solid #e5e7eb; padding:8px; text-align:left; }
        blockquote{ border-left:4px solid #e5e7eb; margin:1em 0; padding:.5em 1em; color:#555; background:#fafafa; }
        code, pre{ font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace; }
        pre{ background:#0b1020; color:#e5e7eb; padding:12px; border-radius:6px; overflow:auto; }
      `

            const styleEl = document.createElement('style')
            styleEl.textContent = baseCss
            shadow.appendChild(styleEl)

            const contentEl = document.createElement('div')
            contentEl.innerHTML = binding.value || ''
            shadow.appendChild(contentEl)

                // 保存引用供后续更新
                ; (el as any).__shadowDom__ = { shadow, styleEl, contentEl }
        },
        updated(el: HTMLElement, binding) {
            const ctx = (el as any).__shadowDom__
            if (!ctx) return
            ctx.contentEl.innerHTML = binding.value || ''
        },
        unmounted(el: HTMLElement) {
            ; (el as any).__shadowDom__ = null
        }
    })
})
