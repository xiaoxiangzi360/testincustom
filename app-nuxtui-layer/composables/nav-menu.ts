import siteMeta from '@/site'
const headerHeight = ref(100)

export const useNavMenu = () => {
  const navs = siteMeta.navs

  const allNavs = Object.values(navs).reduce((acc, navMenu) => {
    return [...acc, ...navMenu]
  }, [])

  const currentRoute = useRoute()
  const currentPath = computed(() => {
    return currentRoute.path
  })

  return {
    allNavs,
    navsPrimary: navs.primary,
    navsSecondary: navs.secondary,
    currentPath,
  }
}

 
export const useHeaderHeight = () => {
  const setHeaderHeight = (height: number) => {
    console.log('setHeaderHeight=======', height)
    headerHeight.value = height
  }
  return {
    headerHeight,
    setHeaderHeight,
  }
}
