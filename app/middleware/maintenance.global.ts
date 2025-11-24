export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/maintenance') return
    return navigateTo('/maintenance')
})
