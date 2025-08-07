import { ref } from 'vue'
const isMobileCartMenuOpen = ref(false)
const isSecondaryMenuOpen = ref(false)

const openMobileCartMenu = () => {
    isMobileCartMenuOpen.value = !isMobileCartMenuOpen.value
}

export const useMobileCartMenu = () => {
    return {
        isMobileCartMenuOpen,
        isSecondaryMenuOpen,
        openMobileCartMenu,
    }
}
