export function getUtmData() {
    if (typeof window === 'undefined') return {}

    try {
        const raw = localStorage.getItem('utm_data')
        if (!raw) return {}
        return JSON.parse(raw)
    } catch {
        return {}
    }
}
