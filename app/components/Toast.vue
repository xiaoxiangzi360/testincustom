<!-- components/Toast.vue -->
<template>
  <transition name="toast">
    <div
      v-if="state.visible"
      class="vue-toast"
      :class="state.type"
      @click="hide"
    >
      <div class="toast-content">
        <span class="toast-text">{{ state.message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, onUnmounted } from 'vue'

// 状态管理
const state = reactive({
  visible: false,
  message: '',
  type: 'info', // info, success, warning, error
  duration: 3000,
  timer: null
})

// 显示 Toast
const show = (message, options = {}) => {
  state.message = message
  state.type = options.type || 'info'
  state.duration = options.duration || 3000
  state.visible = true
  
  // 清除之前的定时器
  if (state.timer) {
    clearTimeout(state.timer)
  }
  
  // 设置自动隐藏
  state.timer = setTimeout(() => {
    hide()
  }, state.duration)
}

// 隐藏 Toast
const hide = () => {
  state.visible = false
  if (state.timer) {
    clearTimeout(state.timer)
    state.timer = null
  }
}

// 快捷方法
const success = (message, options = {}) => {
  show(message, { ...options, type: 'success' })
}

const error = (message, options = {}) => {
  show(message, { ...options, type: 'error' })
}

const warning = (message, options = {}) => {
  show(message, { ...options, type: 'warning' })
}

// 导出方法供外部使用
defineExpose({
  show,
  hide,
  success,
  error,
  warning
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (state.timer) {
    clearTimeout(state.timer)
  }
})
</script>

<style scoped>
.vue-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 300px;
  max-width: 80%;
  padding: 12px 20px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.vue-toast.info {
  background: #e6f4ff;
  border-left: 4px solid #1890ff;
  color: #1890ff;
}

.vue-toast.success {
  background: #f6ffed;
  border-left: 4px solid #52c41a;
  color: #52c41a;
}

.vue-toast.warning {
  background: #fffbe6;
  border-left: 4px solid #faad14;
  color: #faad14;
}

.vue-toast.error {
  background: #fff2f0;
  border-left: 4px solid #ff4d4f;
  color: #ff4d4f;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
</style>