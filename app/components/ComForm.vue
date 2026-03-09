<!-- components/common/CommonForm.vue -->
<template>
    <UForm ref="formRef" v-bind="formProps" :class="formClass" @submit="handleSubmit">
        <!-- 遍历 formList 动态渲染表单项 -->
        <template v-for="item in formList" :key="item.name">
            <!-- 常规表单项 -->
            <UFormGroup :name="item.name" :label="item.label" :required="item.required"
                :description="item.description" :help="item.help" :ui="item.groupUi" v-bind="item.groupProps">
                <!-- 自定义 label 插槽 -->
                <template v-if="item.labelSlot" #label>
                    <slot :name="`${item.name}-label`" :item="item">
                        <span class="flex items-center gap-1">
                            {{ item.label }}
                            <UTooltip v-if="item.tooltip" :text="item.tooltip">
                                <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-gray-400" />
                            </UTooltip>
                        </span>
                    </slot>
                </template>

                <!-- 根据字段类型渲染不同的输入组件 -->
                <component :is="getComponent(item.type)" :v-model="modelValue[item.name]" v-bind="item.props"
                    :placeholder="item.placeholder" :disabled="item.disabled" :ui="item.ui"
                    @update:model-value="handleFieldChange(item.name, $event)"
                    @blur="handleFieldBlur(item.name, $event)">
                    <!-- 透传 slots 给具体输入组件 -->
                    <template v-for="slotName in Object.keys(item.slots || {})" #[slotName]="slotProps">
                        <slot :name="`${item.name}-${slotName}`" v-bind="slotProps" :item="item" />
                    </template>
                </component>

                <!-- 额外的右侧内容插槽 -->
                <template v-if="item.extraSlot" #extra>
                    <slot :name="`${item.name}-extra`" :item="item" />
                </template>
            </UFormGroup>
        </template>

        <!-- 表单底部操作区插槽 -->
        <!-- <slot name="actions" :form="formRef" :loading="loading">
            <div v-if="showActions" class="flex justify-end gap-3 pt-4">
                <UButton v-if="showReset" color="gray" :loading="loading" @click="handleReset">
                    {{ resetText }}
                </UButton>
                <UButton type="submit" :loading="loading" :disabled="!meta.valid">
                    {{ submitText }}
                </UButton>
            </div>
        </slot> -->
    </UForm>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide } from 'vue'
import type { FormSubmitEvent } from '#ui/types'

// 定义表单字段类型
export interface FormField {
    name: string
    type: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'switch' | 'date' | 'time' | 'divider' | 'grid'
    label?: string
    placeholder?: string
    description?: string
    help?: string
    required?: boolean
    disabled?: boolean
    tooltip?: string
    props?: Record<string, any>
    ui?: Record<string, any>
    groupUi?: Record<string, any>
    groupProps?: Record<string, any>
    slots?: Record<string, boolean>
    labelSlot?: boolean
    extraSlot?: boolean
    children?: FormField[] // 用于 grid 布局
    gridClass?: string
}

// 组件 Props
interface Props {
    // 表单配置
    formList: any[]
    // UForm 原有 props（通过 v-bind 透传）
    schema?: any
    state?: Record<string, any>
    validate?: any
    validateOn?: 'input' | 'change' | 'blur' | 'submit'
    validateOnMount?: boolean
    eagerValidation?: boolean
    // 自定义配置
    modelValue?: Record<string, any>
    showActions?: boolean
    showReset?: boolean
    submitText?: string
    resetText?: string
    loading?: boolean
    formClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({}),
    showActions: true,
    showReset: true,
    submitText: '提交',
    resetText: '重置',
    loading: false,
    validateOn: 'submit',
    formClass: 'space-y-6'
})

const emit = defineEmits<{
    (e: 'update:model-value', value: Record<string, any>): void
    (e: 'update:form-list', value: FormField[]): void
    (e: 'submit', event: FormSubmitEvent<any>): void
    (e: 'reset'): void
    (e: 'field-change', name: string, value: any): void
    (e: 'field-blur', name: string, event: FocusEvent): void
}>()

// 提取 UForm 的 props（排除自定义 props）
const formProps = computed<any>(() => {
    const {
        formList, modelValue, showActions, showReset,
        submitText, resetText, loading, formClass,
        ...rest
    } = props
    return rest
})

// 获取输入组件
const getComponent = (type: FormField['type']) => {
    const componentMap = {
        input: 'UInput',
        textarea: 'UTextarea',
        select: 'USelect',
        radio: 'URadio',
        checkbox: 'UCheckbox',
        switch: 'USwitch',
        date: 'UDatePicker',
        time: 'UTimePicker'
    }
    return componentMap[type] || 'UInput'
}

// 表单引用
const formRef = ref()

// 处理字段变化
const handleFieldChange = (name: string, value: any) => {
    emit('update:model-value', {
        ...props.modelValue,
        [name]: value
    })
    emit('field-change', name, value)
}

const handleFieldBlur = (name: string, event: FocusEvent) => {
    emit('field-blur', name, event)
}

// 处理提交
const handleSubmit = async (event: FormSubmitEvent<any>) => {
    emit('submit', event)
}

// 处理重置
const handleReset = () => {
    if (formRef.value) {
        formRef.value.clear()
    }
    emit('reset')
}

// 验证 meta 状态（用于控制提交按钮）
const meta = computed(() => {
    return formRef.value?.meta || { valid: true }
})

// 暴露方法给父组件
defineExpose({
    validate: () => formRef.value?.validate(),
    validateField: (path: string) => formRef.value?.validateField(path),
    clear: () => formRef.value?.clear(),
    reset: handleReset,
    formRef
})
</script>