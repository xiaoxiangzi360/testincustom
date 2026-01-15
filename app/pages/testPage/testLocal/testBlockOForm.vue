<template>
    <div class="min-h-40 p-4">
        <h2 class="mb-4">测试速度页面【原生Form】</h2>
        <form @submit.prevent="handleSubmit">
            <!-- 用户名 -->
            <div class="form-group">
                <label for="username">用户名</label>
                <input
                    id="username"
                    type="text"
                    v-model="form.username"
                    placeholder="请输入用户名"
                    required
                />
            </div>

            <!-- 密码 -->
            <div class="form-group">
                <label for="password">密码</label>
                <input
                    id="password"
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                    required
                />
            </div>

            <!-- 邮箱 -->
            <div class="form-group">
                <label for="email">邮箱</label>
                <input
                    id="email"
                    type="email"
                    v-model="form.email"
                    placeholder="请输入邮箱"
                />
            </div>

            <!-- 手机号 -->
            <div class="form-group">
                <label for="phone">手机号</label>
                <input
                    id="phone"
                    type="tel"
                    v-model="form.phone"
                    placeholder="请输入手机号"
                    required
                />
            </div>

            <!-- 性别 -->
            <div class="form-group">
                <label for="gender">性别</label>
                <select id="gender" v-model="form.gender" required>
                    <option value="" disabled>请选择性别</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                </select>
            </div>

            <!-- 出生日期 -->
            <div class="form-group">
                <label for="birthdate">出生日期</label>
                <input
                    id="birthdate"
                    type="date"
                    v-model="form.birthdate"
                    required
                />
            </div>

            <!-- 地址 -->
            <div class="form-group">
                <label for="address">地址</label>
                <input
                    id="address"
                    type="text"
                    v-model="form.address"
                    placeholder="请输入地址"
                />
            </div>

            <!-- 职业 -->
            <div class="form-group">
                <label for="occupation">职业</label>
                <input
                    id="occupation"
                    type="text"
                    v-model="form.occupation"
                    placeholder="请输入职业"
                />
            </div>

            <!-- 兴趣爱好 -->
            <div class="form-group">
                <label for="hobbies">兴趣爱好</label>
                <select id="hobbies" v-model="form.hobbies" multiple>
                    <option value="reading">阅读</option>
                    <option value="sports">运动</option>
                    <option value="travel">旅行</option>
                </select>
            </div>

            <!-- 备注 -->
            <div class="form-group">
                <label for="remarks">备注</label>
                <textarea
                    id="remarks"
                    v-model="form.remarks"
                    placeholder="请输入备注"
                    rows="4"
                ></textarea>
            </div>

            <!-- 提交和重置按钮 -->
            <div class="form-group">
                <button type="submit">提交</button>
                <button type="button" @click="handleReset">重置</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// 表单数据
const form = reactive({
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
    birthdate: '',
    address: '',
    occupation: '',
    hobbies: [],
    remarks: '',
});

// 提交表单
const handleSubmit = () => {
    // 表单校验
    if (!form.username || !form.password || !form.phone || !form.gender || !form.birthdate) {
        alert('请填写所有必填项！');
        return;
    }

    // 模拟提交表单
    console.log('表单数据:', form);
    alert('表单提交成功！');
};

// 重置表单
const handleReset = () => {
    Object.keys(form).forEach((key) => {
        form[key] = Array.isArray(form[key]) ? [] : '';
    });
    alert('表单已重置');
};
</script>

<style scoped>
.form-group {
    margin-bottom: 1rem;
}
label {
    display: block;
    margin-bottom: 0.5rem;
}
input,
select,
textarea,
button {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button {
    width: auto;
    cursor: pointer;
}
</style>