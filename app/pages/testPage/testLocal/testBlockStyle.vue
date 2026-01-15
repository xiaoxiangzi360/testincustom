<template>
    <div class="testStyle">测试速度页面-【style加载】</div>
</template>
<script setup lang="ts"></script>
<style scoped>
.testStyle {
    padding: 16px;
    background-color: #f5f5f5;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    margin-bottom: 16px;
}

:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
    border-color: #d9d9d9 !important;
}

:deep(.ant-select-focused .ant-select-selector) {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
    outline: none !important;
}

/* 去掉 show-search 内部 input 的聚焦轮廓/阴影（内边框） */
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus-visible),
:deep(.ant-select .ant-select-selector input[type="search"]),
:deep(.ant-select .ant-select-selector input[type="search"]:focus),
:deep(.ant-select .ant-select-selector input[type="search"]:focus-visible) {
    outline: none !important;
    box-shadow: none !important;
}

/* 有些版本用 ::after 做焦点边框，保险起见也关掉 */
:deep(.ant-select .ant-select-selector::after) {
    box-shadow: none !important;
    outline: none !important;
    border: 0 !important;
}

.ant-input,
.ant-select-selector {
    height: 32px !important;
    display: flex;
    align-items: center;
    padding: 4px 11px !important;
    font-size: 14px;
    border-radius: 4px;
    border-color: #d9d9d9;
}

.ant-input:focus {
    border-color: #00B2E3;
    border: none;
}

.ant-form-item {
    margin-bottom: 12px;
}

/* 去掉 antd Select 的 hover / focus 外边框与阴影 */
:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
    border-color: #d9d9d9 !important;
}

:deep(.ant-select-focused .ant-select-selector) {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
    outline: none !important;
}

/* 去掉 show-search 内部 input 的聚焦轮廓/阴影（内边框） */
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus-visible),
:deep(.ant-select .ant-select-selector input[type="search"]),
:deep(.ant-select .ant-select-selector input[type="search"]:focus),
:deep(.ant-select .ant-select-selector input[type="search"]:focus-visible) {
    outline: none !important;
    box-shadow: none !important;
}

:deep(.ant-select .ant-select-selector::after) {
    box-shadow: none !important;
    outline: none !important;
    border: 0 !important;
}

:deep(.ant-select-selection-search-input) {
    font-size: 14px !important;
}

.content {
    white-space: pre-line;
}

/* 回退样式：若未安装 @tailwindcss/line-clamp 插件，也能实现两行省略 */
.clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* 最大两行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
