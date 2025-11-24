<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { navsSecondary } = useNavMenu()
const router = useRouter()
const token = useCookie('token')
const userType = useCookie('userType', { sameSite: 'lax', path: '/' })

const isuserTokenValid = computed(() => {
  const isMember = userType.value === 1 || userType.value === '1'
  return !!token.value && isMember
})

const needsTokenValidation = (title: string) => {
  const protectedNavs = ['Track Order', 'Order History', 'Returns']
  return protectedNavs.includes(title)
}

const handleNavigation = (nav: any) => {
  // Handle navigation with token validation for protected pages
  if (needsTokenValidation(nav.title)) {
    if (!isuserTokenValid.value) {
      router.push('/login')
      return
    }

    // Special routing for Track Order
    if (nav.title === 'Track Order') {
      router.push('/myorders')
      return
    }
  }

  // For all other navigation items, use default navigation
  router.push(nav.to)
}

const dropdownItems = [
  [
    {
      slot: 'account',
      disabled: true,
    },
    ...navsSecondary.map((nav) => ({
      slot: nav.to.replace(/^\//, '').replaceAll('/', '-'),
      label: nav.title,
      icon: nav.icon,
      click: () => handleNavigation(nav),
      activeClass: 'text-primary',
    })),
  ],
]
</script>
<template>
  <UDropdown :popper="{ placement: 'bottom-start' }" :ui="{
    container: '!-ml-2 sm:ml-auto',
    rounded: '',
    width: 'w-full sm:w-48',
    item: { disabled: 'cursor-text select-text opacity-100' },
  }" :items="dropdownItems">
    <UAvatar src="https://avatars.githubusercontent.com/u/73772701?v=4" alt="Avatar" size="lg" class="sm:ml-2" />
    <template #account>
      <div class="my-1 space-x-1 w-full">
        <ProfileActions class="sm:!hidden" />
        <UButton class="font-bold my-4 sm:my-2">Sign In / Join Us</UButton>
      </div>
    </template>
  </UDropdown>
</template>
<style scoped></style>
