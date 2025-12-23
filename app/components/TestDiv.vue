<template>
  <div>
    <!-- 折叠分类 -->
    <UAccordion :items="accordionItems">
      <template #default="{ item }">
        <div class="flex items-center justify-between w-full p-3">
          <span class="font-medium">{{ item.label }}</span>
          <UIcon
            name="i-heroicons-chevron-down-20-solid"
            class="w-4 h-4 transition-transform duration-200"
            :class="{ 'rotate-180': item.open }"
          />
        </div>
      </template>

      <template #content="{ item }">
        <div class="p-3 space-y-2">
          <!-- 复选框列表 -->
          <div
            v-for="checkbox in item.checkboxes"
            :key="checkbox.id"
            class="flex items-center gap-3 cursor-pointer"
            @click="toggleCheckbox(checkbox, item.id)"
          >
            <UCheckbox
              :model-value="checkbox.checked"
              @update:model-value="(value) => updateCheckbox(checkbox, value)"
              @click.stop
            />
            <span>{{ checkbox.label }}</span>
          </div>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// 定义数据类型
interface CheckboxItem {
  id: number
  label: string
  checked: boolean
}

interface AccordionData {
  id: string
  label: string
  checkboxes: CheckboxItem[]
  open?: boolean
}

// 模拟数据 - 根据你的图片内容
const accordionItems = ref<AccordionItem[]>([
  {
    slot: 'by-fold',
    label: 'By Fold',
    open: true,
    checkboxes: [
      { id: 1, label: 'Flat (14)', checked: true },
      { id: 2, label: 'Option 2', checked: false },
      { id: 3, label: 'Option 3', checked: false },
      { id: 4, label: 'Option 4', checked: false }
    ]
  },
  {
    slot: 'by-fabric',
    label: 'By Fabric',
    open: false,
    checkboxes: [
      { id: 5, label: 'Cotton', checked: false },
      { id: 6, label: 'Polyester', checked: false },
      { id: 7, label: 'Wool', checked: false },
      { id: 8, label: 'Silk', checked: false }
    ]
  }
])

// 切换复选框状态
const toggleCheckbox = (checkbox: CheckboxItem, accordionId: string) => {
  checkbox.checked = !checkbox.checked
}

// 更新复选框状态（用于v-model）
const updateCheckbox = (checkbox: CheckboxItem, value: boolean) => {
  checkbox.checked = value
}

// 如果需要获取选中的值
const getSelectedValues = () => {
  const selected = []
  for (const item of accordionItems.value) {
    for (const checkbox of item.checkboxes) {
      if (checkbox.checked) {
        selected.push({
          accordion: item.label,
          label: checkbox.label,
          id: checkbox.id
        })
      }
    }
  }
  return selected
}

// 在控制台查看选中的值（开发时使用）
watch(accordionItems, (newValue) => {
  console.log('当前选中:', getSelectedValues())
}, { deep: true })
</script>