<template>
  <BaseDrawer :open="open" title="Filter" :width="drawerWidth" cancel-text="" @close="handleClose" @ok="handleSure"
    :headerStyle="{ fontFamily: 'Inter', fontWeight: '600', fontSize: '16px' }" :footerStyle="{ borderTop: 'none' }"
    @cancel="handleClose">
    <div class="px-4">
      <!-- 内容区域 -->
      <!-- <div>{{ JSON.stringify(spuCatalogPropList) }}</div> -->
      <!-- <div>{{ JSON.stringify(curCatalogPropIds) }}</div> -->
      <div class="">
        <div v-if="catalogList.length > 0">
          <div class="font-semibold text-[14px] mb-4 text-[rgba(35,24,49,0.88)] font-hind">Category</div>
          <URadioGroup :options="catalogList" v-model="curCatalogId" :ui-radio="{
            border: 'border border-gray-100 border-[#00B2E3] dark:border-[#00B2E3]',
            wrapper: 'mb-2 flex items-center',
            label: 'font-hind text-[rgba(35,24,49,0.88)] dark:text-[rgba(35,24,49,0.88)] font-normal text-[14px]',
            ring: 'bg-white dark:bg-white',
          }" :ui="{
            wrapper: 'border-b border-gray-200 border-[#E5E5E5] mb-2'
          }" @change="handleCatalogChange" />
        </div>
        <UAccordion :items="catalogPropList" class="text-[rgba(35,24,49,0.88)]" multiple :defaultOpen="true">
          <template #default="{ item, index, open }">
            <div class="pb-3 flex items-center justify-between  w-full font-hind hover:cursor-pointer">
              <span class=" font-semibold text-sm">
                {{ item.label }}
              </span>
              <UIcon style="color:rgba(0,0,0,0.45);" name="i-material-symbols:keyboard-arrow-down"
                class="w-5 h-5 shrssink-0 transition-transform duration-200" :class="[open ? 'rotate-180' : '']" />
            </div>
          </template>

          <template #item="{ item }">
            <div class="border-b border-[#E5E5E5]">
              <UCheckbox :ui="{
                color: 'text-[#00B2E3]',
                label: 'font-hind text-[rgba(35,24,49,0.88)] dark:text-[rgba(35,24,49,0.88)] font-normal',
                border: 'border border-[#00B2E3] dark:border-[#00B2E3]',
                ring: 'dark:bg-white'
              }" class="pb-2 font-hind hover:cursor-pointer text-sm" v-for="(option, idx) in item.options" :key="idx"
                :label="`${option.label} (${option.count})`"
                :model-value="curCatalogPropIds.includes(String(option.value))"
                @update:model-value="(checked) => handleCheckboxChange(option.value, checked)" />
            </div>
          </template>
        </UAccordion>
        <div v-if="catalogList.length == 0 && spuCatalogPropList.length == 0"
          class="flex flex-col items-center justify-center mt-10">
          <NuxtImg src="/empty.png" alt="404 Not Found" width="180" class="lg:mt-10" />
          <div class="text-gray-300 font-mono">No Data</div>
        </div>
      </div>
    </div>
  </BaseDrawer>
</template>

<script setup lang="ts">
import BaseDrawer from './BaseDrawer.vue'
const { getSpuCatalogPropByCatalogId } = ProductAuth()

interface Emits {
  /** 关闭事件 */
  (e: 'close'): void
  /** 确认事件 */
  (e: 'ok', data?: any): void
}

const props = defineProps<{
  open?: boolean
  data?: any
}>()

const emit = defineEmits<Emits>()
const { isMobile, windowWidth } = useMobile(); // 默认断点为 768px
const drawerWidth = computed(() => {
  return isMobile.value ? `${Number(windowWidth.value) * 0.75}px` : '520px'; // 移动端宽度为屏幕的1/3，其他情况为520px
});
const curCateLevel = ref(0)  // 分类级别，1表示一级分类，2表示二级分类
const curCatalogId = ref('')  // 当前选中的分类ID
const catalogList = computed(() => {
  const { filterTree: { levelTwoCatalog } } = props.data || {};
  const nList = levelTwoCatalog?.map((item) => ({
    label: `${item.catalogEnName} (${item.count || 0})`,
    value: item.catalogId,
    count: item.count || 0,
  })) || [];
  return nList;
})

const curCatalogPropIds = ref([])  // 当前选中的类目属性ID
const spuCatalogPropList = ref([])  // 当前分类的类目属性列表
const catalogPropList = computed(() => {
  let list = []
  if (spuCatalogPropList.value.length > 0) {
    list = spuCatalogPropList.value.map((item) => ({
      label: item.propEnName,
      options: item.propValueList?.map((prop) => ({
        label: prop.propValueEnName,
        value: prop.propValueId,
        count: prop.count || 0,
      })),
    }));
    return list;
  }
})

watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      initializeData();
    } else {
      console.log('Drawer 已关闭');
      cleanupData();
    }
  }
);

const handleCatalogChange = (newCatalogId) => {
  curCatalogPropIds.value = [];
  const { filterTree: { levelTwoCatalog } } = props.data || {};
  spuCatalogPropList.value = levelTwoCatalog.find(item => item.catalogId === newCatalogId)?.catalogPropList || [];
};

const handleCheckboxChange = (value, checked) => {
  if (checked) {
    // 添加到选中列表
    curCatalogPropIds.value.push(value)
  } else {
    // 从选中列表中移除
    const index = curCatalogPropIds.value.indexOf(value)
    if (index > -1) {
      curCatalogPropIds.value.splice(index, 1)
    }
  }
}
// 关闭抽屉
const handleClose = () => {
  emit('close')
}

// 初始化数据
const initializeData = () => {
  if (!props.data) return;
  console.log('初始化数据...', props.data);
  const { cateLevel, filterTree: { spuCatalogProp, levelTwoCatalog }, curFilter: { curCatalogId: curCatalogIdT,
    curCatalogPropIds: curCatalogPropIdsT, curAllCatalogProps: curAllCatalogPropsT } } = deepToRaw(props.data) || {};
  curCateLevel.value = cateLevel || 0;
  if (cateLevel > 1) {
    if (spuCatalogProp.length > 0) {
      spuCatalogPropList.value = spuCatalogProp || [];
    }
    curCatalogPropIds.value = curCatalogPropIdsT || [];
  } else {
    curCatalogId.value = curCatalogIdT;
    curCatalogPropIds.value = curCatalogPropIdsT || [];
    if (curCatalogId.value) {
      spuCatalogPropList.value = levelTwoCatalog.find(item => item.catalogId === curCatalogIdT)?.catalogPropList || [];
    } else {
      spuCatalogPropList.value = []
    }
  }


};

// 清理数据
const cleanupData = () => {
  console.log('清理数据...');
  curCatalogPropIds.value = [];
};


// 确认操作
const handleSure = async () => {
  // console.log('确认操作...', spuCatalogPropList.value);
  const { filterTree: { levelTwoCatalog } } = props.data || {};
  const curAllCatalogPropsT = levelTwoCatalog.find(item => item.catalogId === curCatalogId.value)?.catalogPropList || [];
  const dataToEmit = {
    curCatalogId: curCatalogId.value,
    curCatalogPropIds: curCatalogPropIds.value,
    curAllCatalogProps: curAllCatalogPropsT,
  };
  emit('ok', deepToRaw(dataToEmit))
}


</script>