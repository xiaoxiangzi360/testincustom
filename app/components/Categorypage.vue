<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
    <div class="max-row mx-auto px-32">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(item, index) in items" :key="index" @click="checklist(item.title)"
                class="relative h-[220px] rounded-lg overflow-hidden group cursor-pointer transition-shadow duration-300">
                <img :src="item.image"
                    class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    alt="">
                <div class="absolute inset-0  flex items-center">
                    <div class=" flex flex-col gap-3 text-white left-12 absolute">
                        <h2
                            class="text-xl sm:text-2xl font-semibold mb-0 text-shadow-custom group-hover:text-primary-500 transition-colors duration-300">
                            {{ item.title }}
                        </h2>

                        <div
                            class="text-sm underline text-shadow-custom group-hover:text-primary-500 transition-colors duration-300">
                            {{ item.description }}
                            <i class="fas fa-arrow-right ml-2"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const items = ref([
    {
        title: 'Outdoor Shade Solutions',
        description: 'UV protection for outdoor living. >',
        image: '/images/cate1.webp'
    },
    {
        title: 'Privacy & Garden Decor',
        description: 'Stylish privacy for your backyard. >',
        image: '/images/1.webp'
    },
    {
        title: 'Indoor Window Shades',
        description: 'Elegant shading for modern homes. >',
        image: '/images/2.webp'
    },
    {
        title: 'Custom Printed Shade & Screen',
        description: 'Print your ideas on fabric. >',
        image: '/images/3.webp'
    },
]);
const checklist = (title) => {
    router.push('/collections/' + title)

}
</script>

<style scoped>
.grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.text-shadow-custom {
    text-shadow: 0px 2px 4px rgba(34, 34, 34, 0.6);
}
</style>