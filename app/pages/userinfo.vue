<template>
  <!-- Wrapper -->
  <div class="bg-white">
    <div class="flex flex-col md:flex-row min-h-screen text-sm max-row">
      <!-- Sidebar -->
      <Userleft />

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6 space-y-6 bg-white">
        <!-- Account Info -->
        <section class="border border-blackcolor/10 rounded-lg">
          <div class="p-4 md:px-6 text-customblack font-semibold text-lg">Account</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 border-t border-t-blackcolor/10 p-4 md:p-6">
            <div>
              <span class="text-blackcolor/50 mb-2">Account email</span>
              <div class="font-medium mt-1">{{ userinfo.email }}</div>
            </div>
            <div>
              <span class="text-blackcolor/50 mb-2">Password</span>
              <div class="mt-1">
                <a href="#" class="text-primary-500 hover:underline">Set New Password</a>
              </div>
            </div>
            <div>
              <span class="text-blackcolor/50 mb-2">Full name</span>
              <div class="font-medium mt-1">{{ userinfo.fullName }}</div>
            </div>
            <div>
              <span class="text-blackcolor/50 mb-2">Number</span>
              <div class="font-medium mt-1">{{ userinfo.numberAreaCode }} {{ userinfo.number }}</div>
            </div>
          </div>
        </section>

        <!-- Address Cards -->
        <section class="border border-blackcolor/10 rounded-lg">
          <div class="p-4 md:px-6 text-customblack font-semibold text-lg">Address</div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 border-t border-t-blackcolor/10 p-4 md:p-6">
            <!-- 新增地址 -->
            <div @click="addnewaddress"
              class="flex items-center justify-center border border-blackcolor/10 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-400 min-h-36 text-center">
              <div>
                <UIcon name="i-material-symbols:add" class="text-red-400 text-base"></UIcon>
                <div class="text-gray-400">Add Address</div>
              </div>
            </div>

            <!-- 地址卡片 -->
            <div v-for="(item, idx) in addressarr" :key="idx"
              class="relative border border-blackcolor/10 rounded-lg p-3 hover:shadow cursor-pointer"
              :class="{ 'border-primary-500 bg-primary-50': item.master == 1 }">
              <div class="space-y-1 text-sm">
                <p><span class="text-gray-500">Full name:</span> {{ item.firstName }}{{ item.lastName }}</p>
                <p><span class="text-gray-500">Number:</span> ({{ item.numberCode }}) {{ item.number }}</p>
                <p><span class="text-gray-500">Address:</span> {{ item.countryName }} {{ item.provinceName }} {{
                  item.city }} {{ item.address }}</p>
              </div>
              <span v-if="item.master == 1"
                class="absolute top-0 right-0 bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded">
                Default
              </span>
              <img src="/edit.png" class="w-5 absolute top-6 right-2" @click="handleeditUserAddress(item)">
              <img src="/del.png" class="w-5 absolute top-12 right-2" v-if="item.master != 1"
                @click="deleteaddress(item.id)">
            </div>
          </div>
        </section>

        <!-- Pagination -->
        <div class="flex justify-center md:justify-end mt-4">
          <UPagination v-model="page" :page-count="5" :total="addresscount"
            :prev-button="{ icon: 'i-material-symbols:chevron-left' }"
            :next-button="{ icon: 'i-material-symbols:chevron-right' }" />
        </div>
      </main>
    </div>

    <!-- Modal -->
    <AddressModal :isshow="showModal" @close="showModal = false" :addressinfo="addressinfo"
      @updateData="getAddresslist()" />
  </div>

</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { message, Modal } from 'ant-design-vue'

const page = ref(1)
const items = ref(Array(55))
const addresscount = ref(0)
const addressinfo = ref({})
const { getuserAddressRollPage, deleteUserAddressByIdList } = AddressAuth();

const userinfo = useCookie('userinfo')

const showModal = ref(false);

const addressarr = ref([])

const addnewaddress = () => {
  addressinfo.value = {}
  showModal.value = true;

}
const closeModal = () => {
  showModal.value = false;
};

const getAddresslist = async () => {

  try {
    let params = {}
    let res = await getuserAddressRollPage(params);
    let addressist = res.result.records;
    addressarr.value = addressist
    addresscount.value = res.result.total
  } catch (error) {

  }
}
const deleteaddress = async (id) => {
  Modal.confirm({
    title: 'Confirm',
    content: `Confirm to delete this address information？`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      try {
        let parmes = {
          idList: [id],
        }
        let res = await deleteUserAddressByIdList(parmes);
        message.success('Delete successful!')

        getAddresslist()

      } catch (error) {

      }

    },
    onCancel() {

    }
  });


}
const handleeditUserAddress = async (item) => {
  addressinfo.value = item
  showModal.value = true;
}
getAddresslist()
</script>
<style scoped>
input,
select {
  border: 1px solid #d1d5db;
}

input::placeholder,
select::placeholder {
  color: #AEAEAE !important;
}
</style>
