<template>
  <USelectMenu
    :disabled="disabled"
   :value="modelValueT"
    @update:value="updateValue" 
    :placeholder="placeholder"
    :value-attribute="valueAttribute"
    :label-attribute="labelAttribute"
    :searchable="searchable"
    :searchable-placeholder="searchablePlaceholder"
    :options="options"
    :search-attributes="searchAttributes"
    :ui="ui"
    :ui-menu="uiMenu"
  />
</template>

<script lang="ts" setup>
// Props 接收父组件传递的参数
const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Please select',
  },
  valueAttribute: {
    type: String,
    default: 'value',
  },
  labelAttribute: {
    type: String,
    default: 'label',
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  searchablePlaceholder: {
    type: String,
    default: 'Search...',
  },
  searchAttributes: {
    type: Array,
    default: () => ['label'],
  },
  ui: {
    type: Object,
    default: () => ({
      placeholder: 'placeholder-gray-300',
      base: 'dark:!bg-white dark:!text-gray-900',
      color: {
        white: {
          outline: 'shadow-none ring-0 focus:ring-0 border border-[#dedede] focus:border-primary-500',
        },
      },
    }),
  },
  uiMenu: {
    type: Object,
    default: () => ({
      input: 'border-none focus:ring-1 focus:ring-gray-300',
      option: {
        active: 'bg-primary-50',
      },
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// Emits 事件，用于双向绑定
const emit = defineEmits(['update:modelValue']);

const modelValueT = ref(props.modelValue);
watch(() => props.modelValue, (newVal) => {
  modelValueT.value = newVal;
});
// 更新方法
const updateValue = (value: any) => {
  emit('update:modelValue', value);
};</script>