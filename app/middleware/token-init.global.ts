export default defineNuxtRouteMiddleware(async () => {
    const { ensureToken } = useAuth()
    await ensureToken()
})
