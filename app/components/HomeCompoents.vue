<template>
    <div>
        <div v-for="compoent in compoents">
            <HomeRecommend v-if="compoent.componentType == 50" :item="compoent" />

        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';

const { getconfigRollPage } = ProductAuth();

const selectedColors = ref<Record<number, string>>({});
const compoents = ref([]);
const isLoading = ref(true); // 添加加载状态

const getpopularlist = async () => {
    try {
        let parmes = {
            pageNum: 1,
            pageSize: 100,
        }
        let res = await getconfigRollPage(parmes);
        compoents.value = res.result.list;
        console.log(compoents.value);
    } catch (error) {
        console.error('Error fetching compoents:', error);
    } finally {
        isLoading.value = false; // 加载完成
    }
};

getpopularlist()
</script>
