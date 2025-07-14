export default defineNuxtPlugin((nuxtApp) => {
    const loading = useState<boolean>('global-loading', () => false)

    return {
        provide: {
            showLoading: () => loading.value = true,
            hideLoading: () => loading.value = false,
        }
    }
})
