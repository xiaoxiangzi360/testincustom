<template>
    <div class="bg-white">
        <div class="flex min-h-screen text-sm max-row">
            <div class="p-6 bg-white rounded shadow space-y-4">

                <!-- 篩選區 -->
                <div class="flex flex-wrap gap-4 items-center">
                    <UInput v-model="filters.date" type="date" class="w-64" />
                    <UInput v-model="filters.bizCode" placeholder="业务单号" class="w-40" />
                    <UInput v-model="filters.tradeCode" placeholder="交易单号" class="w-40" />
                    <USelect v-model="filters.type" :options="typeOptions" placeholder="交易类型" class="w-40" />
                    <USelect v-model="filters.status" :options="statusOptions" placeholder="状态" class="w-40" />
                    <UButton @click="query" color="primary">查询</UButton>
                    <UButton @click="reset" color="gray">重置</UButton>
                    <UButton @click="exportData" color="gray">导出</UButton>
                </div>

                <!-- 表格區 -->
                <UTable :columns="columns" :rows="rows" class="mt-4" checkbox @update:checked="checkedRows = $event" />

                <!-- 分頁 -->
                <div class="flex justify-between items-center mt-4">
                    <span>共 {{ total }} 条记录 第 {{ page }} / {{ totalPages }} 页</span>
                    <UPagination v-model="page" :page-count="pageSize" :total="total" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const filters = reactive({
    date: '',
    bizCode: '',
    tradeCode: '',
    type: '',
    status: ''
})

const typeOptions = [
    { label: '收單', value: '收單' },
    { label: '退款', value: '退款' }
]

const statusOptions = [
    { label: '已完成', value: '已完成' },
    { label: '取消', value: '已取消' },
    { label: '進行中', value: '進行中' }
]

const columns = [
    { key: 'bizCode', label: '業務單號', sortable: true },
    { key: 'tradeCode', label: '交易單號' },
    { key: 'cost', label: '($)成本金額' },
    { key: 'amount', label: '($)交易金額' },
    { key: 'channel', label: '交易渠道' },
    { key: 'type', label: '交易類型' },
    { key: 'status', label: '狀態' },
    { key: 'createdAt', label: '創建時間' },
    { key: 'completedAt', label: '完成時間' }
]

const rows = ref([
    {
        bizCode: 'TradeCode21',
        tradeCode: 'TradeCode21',
        cost: '+198.00',
        amount: '+200.00',
        channel: 'Paypal—信用卡',
        type: '收單',
        status: '已取消',
        createdAt: '2016-09-21 08:50:08',
        completedAt: '2016-09'
    },
    // ...更多資料
])

const checkedRows = ref([])
const total = ref(400)
const page = ref(1)
const pageSize = 10
const totalPages = computed(() => Math.ceil(total.value / pageSize))

function query() {
    console.log('查詢參數：', filters)
}

function reset() {
    Object.assign(filters, { date: '', bizCode: '', tradeCode: '', type: '', status: '' })
}

function exportData() {
    console.log('導出：', checkedRows.value)
}
</script>
