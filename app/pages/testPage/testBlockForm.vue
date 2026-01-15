<template>
    <div class="min-h-40 p-4">
        <h2 class="mb-4">测试速度页面【Form】</h2>
        <Form ref="formRef" layout="vertical" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
            <!-- 表单项 -->
            <Form.Item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
                <Input v-model:value="form.username" placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
                <Input v-model:value="form.password" placeholder="请输入密码" />
            </Form.Item>

            <Form.Item label="邮箱" name="email" :rules="[{ type: 'email', message: '请输入有效的邮箱地址' }]">
                <Input v-model:value="form.email" placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item label="手机号" name="phone" :rules="[{ required: true, message: '请输入手机号' }]">
                <Input v-model:value="form.phone" placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item label="性别" name="gender" :rules="[{ required: true, message: '请选择性别' }]">
                <Select v-model:value="form.gender" placeholder="请选择性别">
                    <Select.Option value="male">男</Select.Option>
                    <Select.Option value="female">女</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="出生日期" name="birthdate" :rules="[{ required: true, message: '请选择出生日期' }]">
                <DatePicker v-model:value="form.birthdate" style="width: 100%" />
            </Form.Item>

            <Form.Item label="地址" name="address">
                <Input v-model:value="form.address" placeholder="请输入地址" />
            </Form.Item>

            <Form.Item label="职业" name="occupation">
                <Input v-model:value="form.occupation" placeholder="请输入职业" />
            </Form.Item>

            <Form.Item label="兴趣爱好" name="hobbies">
                <Select v-model:value="form.hobbies" mode="multiple" placeholder="请选择兴趣爱好">
                    <Select.Option value="reading">阅读</Select.Option>
                    <Select.Option value="sports">运动</Select.Option>
                    <Select.Option value="travel">旅行</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="备注" name="remarks">
                <Input.TextArea v-model:value="form.remarks" placeholder="请输入备注" :rows="4" />
            </Form.Item>

            <!-- 提交按钮 -->
            <Form.Item>
                <Button type="primary" @click="handleSubmit">提交</Button>
                <Button class="ml-2" @click="handleReset">重置</Button>
            </Form.Item>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { Button, Form, Input, message, Select, DatePicker } from 'ant-design-vue';

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
const formRef = ref()
// 提交表单
const handleSubmit = () => {
    formRef.value.validateFields().then(() => {
        message.success('表单提交成功！');
        console.log('表单数据:', form);
    }).catch((error) => {
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