<template>
  <USlideover :transition="true" :style="{ width: typeof width === 'number' ? `${width}px` : width }"
    :model-value="open" @update:model-value="handleClose" :side="placement" :ui="{
      // width: typeof width === 'number' ? `w-[${width}px]` : `w-[${width}]`,
      wrapper:'z-[999]',
      overlay: {
        background: 'bg-black/50',
        transition: {
          enter: 'duration-100',
          leave: 'duration-100',
        }
      },
      background: 'bg-white dark:bg-white',
    }">
    <!-- 自定义 Header -->
    <slot name="header">
      <div class="flex items-center justify-between py-4 px-6 text-[rgba(0,0,0,0.88)]" :style="headerStyle">
        {{ title }}
        <UButton v-if="closable" variant="none" icon="i-heroicons-x-mark-20-solid" class="!p-1 hover:dark:bg-none"
          @click="handleClose" :ui="{
          }" />
      </div>
    </slot>

    <!-- 内容区域 -->
    <div :class="`overflow-y-scroll ${contentClass}`" :style="bodyStyle">
      <div class="px-6 pb-[80px]">
        <slot />
      </div>
    </div>
    <!-- Footer 区域 -->
    <slot name="footer">
      <div class="absolute bg-[#fff]  bottom-0 w-[100%] flex justify-end items-center gap-2 px-6 py-4"
        :style="footerStyle" v-if="showFooter">
        <UButton class="bg-[#00B2E3] text-white dark:text-white  py-2 px-8 rounded-[8px] font-semibold font-inter"
          @click="handleOk">
          Confirm</UButton>
      </div>
    </slot>

  </USlideover>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

// Props
interface Props {
  /** 控制抽屉显示隐藏 */
  open: boolean
  /** 标题 */
  title?: string
  /** 确认回调 */
  onSure?: () => void | Promise<void>
  /** 关闭回调 */
  onClose?: () => void
  /** 抽屉宽度 */
  width?: number | string
  /** 抽屉方向 */
  placement?: 'top' | 'right' | 'bottom' | 'left'
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean
  /** 是否支持键盘ESC关闭 */
  keyboard?: boolean
  /** 抽屉的z-index */
  zIndex?: number

  // Footer配置
  /** 是否显示底部 */
  showFooter?: boolean
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 是否显示确认按钮 */
  showOk?: boolean
  /** 取消按钮文字 */
  cancelText?: string
  /** 确认按钮文字 */
  okText?: string
  /** 取消按钮loading状态 */
  cancelLoading?: boolean
  /** 确认按钮loading状态 */
  okLoading?: boolean
  /** 取消按钮禁用状态 */
  cancelDisabled?: boolean
  /** 确认按钮禁用状态 */
  okDisabled?: boolean

  // 样式
  /** 抽屉容器类名 */
  drawerClass?: string
  /** 内容区域类名 */
  contentClass?: string
  /** 内容区域样式 */
  bodyStyle?: CSSProperties
  /** 头部样式 */
  headerStyle?: CSSProperties
  /** 底部样式 */
  footerStyle?: CSSProperties

  /** 关闭前拦截，返回false阻止关闭 */
  beforeClose?: () => boolean | Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  open: true,
  title: '',
  placement: 'left',
  closable: true,
  maskClosable: true,
  keyboard: true,
  zIndex: 1000,
  width: 400,
  showFooter: true,
  showCancel: true,
  showOk: true,
  cancelText: '取消',
  okText: '确定',
  cancelLoading: false,
  okLoading: false,
  cancelDisabled: false,
  okDisabled: false,
  drawerClass: '',
  contentClass: '',
  bodyStyle: () => ({}),
  headerStyle: () => ({}),
  footerStyle: () => ({})
})

// Emits
const emit = defineEmits<{
  /** 更新open状态 */
  'update:open': [value: boolean]
  /** 关闭事件 */
  'close': []
  /** 取消事件 */
  'cancel': []
  /** 确认事件 */
  'ok': []
  /** 打开事件 */
  'open': []
}>()

// 计算 Slideover UI 配置
// const slideoverUI = computed(() => {
//   const baseUI: Record<string, any> = {
//     base: props.drawerClass,
//   }

//   // 设置宽度（USlideover 使用 w-{value} 格式）
//   if (props.width) {
//     if (typeof props.width === 'number') {
//       baseUI.width = `w-[${props.width}px]`
//     } else {
//       // 处理字符串宽度
//       const widthStr = props.width.toString()
//       if (widthStr.includes('px')) {
//         baseUI.width = `w-[${widthStr}]`
//       }
//     }
//   }

//   return baseUI
// })

// 处理关闭
const handleClose = async () => {
  // 执行beforeClose拦截
  if (props.beforeClose) {
    const canClose = await props.beforeClose()
    if (canClose === false) return
  }

  // 触发外部onClose
  props.onClose?.()
  emit('close')
  emit('update:open', false)
}

// 处理 model-value 更新
const handleModelUpdate = (value: boolean) => {
  if (!value) {
    handleClose()
  } else {
    emit('open')
  }
}

// 处理确认
const handleOk = async () => {
  try {
    emit('ok')
    props.onSure?.()

    // 执行 beforeClose 检查
    if (props.beforeClose) {
      const canClose = await props.beforeClose()
      if (canClose === false) return
    }

    emit('update:open', false)
  } catch (error) {
    console.error('onSure执行失败:', error)
  }
}

// 处理取消
const handleCancel = () => {
  emit('cancel')
  handleClose()
}

// 监听 open 变化
watch(() => props.open, (newVal) => {
  if (newVal) {
    emit('open')
  }
}, { immediate: true })

</script>
