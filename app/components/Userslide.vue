<script setup>
const route = useRoute()
import { useRouter } from 'vue-router';
const router = useRouter();
const { isMobileCartMenuOpen, openMobileCartMenu } = useMobileCartMenu()
const { logout } = useAuth();

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
    {
        lable: 'Sign Out',
        url: '',
        type: 'button',
        img: '/loginout.png'
    }
]
const navigate = (link) => {

    openMobileCartMenu();
    router.push(link);
};
const close = (link) => {
    openMobileCartMenu();
};
const loginout = async () => {
    openMobileCartMenu();

    let res = await logout();

}
</script>

<template>
    <aside class="w-full bg-white">
        <div class="text-customblack p-2 ">
            <div class="w-full text-right text-gray-400 border-b border-b-blackcolor/10">
                <UIcon name="i-material-symbols:close-small-rounded" width="30" height="30" @click="close()"></UIcon>
            </div>
            <div v-for="item in usermenu"
                class="py-2 text-gray-400 hover:bg-primary-50 border-b border-b-blackcolor/10">
                <div v-if="item.type == 'link'" @click="navigate(item.url)">
                    <div class="flex items-center">
                        <img :src="item.img" class="w-4 mr-2 h-4" />
                        <div>{{ item.lable }}</div>
                    </div>
                </div>
                <div v-if="item.type == 'button'" @click="loginout">
                    <div class="flex items-center">
                        <img :src="item.img" class="w-4 mr-2 h-4" />
                        <div>{{ item.lable }}</div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>
