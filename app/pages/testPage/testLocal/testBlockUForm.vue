<template>
    <div class="min-h-40 p-4">
        <h2 class="mb-4">测试速度页面【UForm】</h2>
        <UForm ref="formRef" :state="form" :rules="rules" layout="vertical">
            <!-- 表单项 -->
            <UFormGroup label="用户名" name="username">
                <UInput v-model="form.username" placeholder="请输入用户名" />
            </UFormGroup>

            <UFormGroup label="密码" name="password">
                <UInput v-model="form.password" type="password" placeholder="请输入密码" />
            </UFormGroup>

            <UFormGroup label="邮箱" name="email">
                <UInput v-model="form.email" placeholder="请输入邮箱" />
            </UFormGroup>

            <UFormGroup label="手机号" name="phone">
                <UInput v-model="form.phone" placeholder="请输入手机号" />
            </UFormGroup>
            <UFormGroup label="性别" name="gender">
                 <USelect size="xs"  :options="[]" color="white" :ui="{
                            color: {
                                white: {
                                    outline: 'bg-white dark:bg-white dark:text-gray-900 ring-1 ring-gray-300 dark:ring-gray-300'
                                }
                            }
                        }" />
            </UFormGroup>

            <UFormGroup label="出生日期" name="birthdate">
                <UDatePicker v-model="form.birthdate" style="width: 100%" />
            </UFormGroup>

            <UFormGroup label="地址" name="address">
                <UInput v-model="form.address" placeholder="请输入地址" />
            </UFormGroup>
            <UFormGroup label="职业" name="occupation">
                <UInput v-model="form.occupation" placeholder="请输入职业" />
            </UFormGroup>

            <UFormGroup label="兴趣爱好" name="hobbies">
                <USelect size="xs"  :options="[]" color="white" :ui="{
                            color: {
                                white: {
                                    outline: 'bg-white dark:bg-white dark:text-gray-900 ring-1 ring-gray-300 dark:ring-gray-300'
                                }
                            }
                        }" />
            </UFormGroup>

            <UFormGroup label="备注" name="remarks">
                <UTextarea v-model="form.remarks" placeholder="请输入备注" :rows="4" />
            </UFormGroup>

            <!-- 提交按钮 -->
            <UFormGroup>
                <UButton type="primary" @click="handleSubmit">提交</UButton>
                <UButton class="ml-2" @click="handleReset">重置</UButton>
            </UFormGroup>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
// import { UForm, UFormItem, UInput, USelect, UOption, UDatePicker, UTextarea, UButton, useMessage } from 'uform';

// 表单数据
const form = reactive({
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
    birthdate: null,
    address: '',
    occupation: '',
    hobbies: [],
    remarks: '',
});

// 表单校验规则
const rules = {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
    email: [{ type: 'email', message: '请输入有效的邮箱地址' }],
    phone: [{ required: true, message: '请输入手机号' }],
    gender: [{ required: true, message: '请选择性别' }],
    birthdate: [{ required: true, message: '请选择出生日期' }],
};

const formRef = ref();
// const message = useMessage();

// 提交表单
const handleSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            message.success('表单提交成功！');
            console.log('表单数据:', form);
        })
        .catch((error) => {
            console.error('表单校验失败:', error);
        });
};

// 重置表单
const handleReset = () => {
    Object.keys(form).forEach((key) => {
        form[key] = Array.isArray(form[key]) ? [] : '';
    });
    form.birthdate = null;
    message.info('表单已重置');
};
</script>