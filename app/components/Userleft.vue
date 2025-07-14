<script setup>
const route = useRoute()
const usermenu = [
    {
        lable: 'Order',
        url: '/myorders',
        type: 'link',
        img: '/order.png'
    },
    // {
    //   lable: 'My Favorites',
    //   url: '/',
    //   type: 'link',
    //   img: '/favorite.png'
    // },
    {
        lable: 'Account Setting',
        url: '/userinfo',
        type: 'link',
        img: '/setting.png'
    },
]
const isActive = (path) => route.path === path
</script>

<template>
    <aside class="w-60 bg-white p-6 space-y-6">
        <div class="text-customblack p-1">
            <div v-for="item in usermenu" class="p-2 text-gray-400 hover:bg-primary-50"
                :class="isActive(item.url) ? 'bg-primary-50' : ''">
                <NuxtLink v-if="item.type == 'link'" :to="item.url">
                    <div class="flex items-center">
                        <img :src="item.img" class="w-4 mr-2 h-4" />
                        <div>{{ item.lable }}</div>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <!-- <ul class="space-y-4">
            <li>
                <NuxtLink to="/myorders"
                    :class="isActive('/myorders') ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-black'">
                    Order
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/userinfo"
                    :class="isActive('/userinfo') ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-black'">
                    Account Setting
                </NuxtLink>
            </li>
        </ul> -->
    </aside>
</template>
