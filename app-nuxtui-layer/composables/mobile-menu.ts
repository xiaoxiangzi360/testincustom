import { ref } from 'vue'
const isMobileMenuOpen = ref(false)
const isSecondaryMenuOpen = ref(false)

const openMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
    console.log('useMobileMenu called==333=======',isMobileMenuOpen.value)
}

export const useMobileMenu = () => {
  console.log('useMobileMenu called=========')
  return {
    isMobileMenuOpen,
    isSecondaryMenuOpen,
    openMobileMenu,
  }
}
