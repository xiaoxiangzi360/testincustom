import { defineNuxtPlugin } from '#app'
import ckContentCss from '@/assets/css/ckeditor-content.css?inline'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('shadow-html', {
        mounted(el: HTMLElement, binding) {
            const shadow = el.attachShadow({ mode: 'open' })

            // ✅ 注入 CKEditor 样式
            const styleEl = document.createElement('style')
            styleEl.textContent = ckContentCss + `
        /* 🔧 媒体容器自适应比例 */
        .media {
          position: relative;
          width: 100%;
          margin: 1.5em 0;
        }
        .media iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .media .video-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%; /* 默认16:9比例 */
        }
      `
            shadow.appendChild(styleEl)

            // ✅ 内容容器
            const contentEl = document.createElement('div')
            contentEl.classList.add('ck-content')
            contentEl.innerHTML = binding.value || ''
            shadow.appendChild(contentEl)

            transformOembeds(contentEl)

                ; (el as any).__shadowDom__ = { shadow, styleEl, contentEl }
        },

        updated(el: HTMLElement, binding) {
            const ctx = (el as any).__shadowDom__
            if (!ctx) return
            ctx.contentEl.innerHTML = binding.value || ''
            transformOembeds(ctx.contentEl)
        },

        unmounted(el: HTMLElement) {
            ; (el as any).__shadowDom__ = null
        },
    })
})

/**
 * ✅ 自动将 <oembed> 转换为 <iframe> 并包裹比例容器
 */
function transformOembeds(root: HTMLElement) {
    root.querySelectorAll('oembed[url]').forEach((oembed) => {
        const url = oembed.getAttribute('url')
        if (!url) return

        const iframe = document.createElement('iframe')
        iframe.src = normalizeVideoUrl(url)
        iframe.allowFullscreen = true
        iframe.allow = 'autoplay; encrypted-media'

        const wrapper = document.createElement('div')
        wrapper.classList.add('video-wrapper')
        wrapper.appendChild(iframe)

        const figure = oembed.closest('figure.media')
        if (figure) {
            figure.innerHTML = ''
            figure.appendChild(wrapper)
        } else {
            oembed.parentNode?.replaceChild(wrapper, oembed)
        }
    })
}

/**
 * ✅ URL 兼容 YouTube / Vimeo / Bilibili
 */
function normalizeVideoUrl(url: string) {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        return url
    }
    if (url.includes('vimeo.com')) {
        return url.replace('vimeo.com', 'player.vimeo.com/video')
    }
    if (url.includes('bilibili.com')) {
        return url
    }
    return url
}
