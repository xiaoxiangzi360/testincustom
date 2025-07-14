<template>
  <div class="bg-white">
    <div class="flex min-h-screen text-sm max-row">
      <!-- Sidebar -->
      <Userleft />


      <!-- Main Content -->
      <main class="flex-1 p-6 space-y-6 bg-white">
        <!-- Account Info -->
        <section class="border border-blackcolor/10 rounded-lg">
          <div class="p-3 px-6 text-customblack font-semibold text-lg">Account</div>
          <div class="grid grid-cols-2 gap-y-4 gap-x-12 border-t border-t-blackcolor/10 p-6">
            <div><span class="text-blackcolor/50 mb-2">Account email</span>
              <div class="font-medium mt-1">{{ userinfo.email }}</div>
            </div>
            <div>
              <span class="text-blackcolor/50 mb-2">Password</span>
              <div class="mt-1"><a href="#" class="text-primary-500 hover:underline">Set New Password</a></div>
            </div>
            <div><span class="text-blackcolor/50 mb-2">Full name</span>
              <div class="font-medium mt-1">{{ userinfo.fullName }}</div>
            </div>
            <div><span class="text-blackcolor/50 mb-2">Number</span>
              <div class="font-medium mt-1">{{ userinfo.numberAreaCode }} {{ userinfo.number }}</div>
            </div>
          </div>
        </section>

        <!-- Address Cards -->
        <section class="border border-blackcolor/10 rounded-lg">
          <div class="p-3 px-6 text-customblack font-semibold text-lg">Address</div>
          <div class="grid grid-cols-3 gap-6 border-t border-t-blackcolor/10 p-6">
            <div @click="addnewaddress"
              class="flex items-center flex-wrap justify-center border border-blackcolor/10 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-400 min-h-36">
              <div class="w-full text-center">
                <UIcon name="i-material-symbols:add" class="text-red-400 text-base"></UIcon>
                <div class="text-gray-400 text-center">Add Address</div>

              </div>
            </div>
            <div v-for="(item, idx) in addressarr" :key="idx"
              class="relative border border-blackcolor/10 rounded-lg p-3 hover:shadow cursor-pointer"
              :class="{ 'border-primary-500 bg-primary-50': item.master == 1 }">
              <div class="space-y-1">
                <p><span class="text-gray-500">Full name:</span> {{ item.firstName }}{{ item.lastName }}</p>
                <p><span class="text-gray-500">Number:</span>({{ item.numberCode }}) {{ item.number }}</p>
                <p><span class="text-gray-500">Address:</span> {{ item.countryName }} {{ item.provinceName }} {{
                  item.city }} {{
                    item.address }}</p>
              </div>
              <span v-if="item.master == 1"
                class="absolute top-0 right-0 bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded">
                Default
              </span>
              <img src="/edit.png" class="w-6 absolute top-6 right-2" @click="handleeditUserAddress(item)">
              <img src="/del.png" class="w-6 absolute top-12 right-2" v-if="item.master != 1"
                @click="deleteaddress(item.id)">
            </div>

          </div>

          <!-- Pagination -->

        </section>
        <div class="flex justify-end mt-6">
          <UPagination v-model="page" :page-count="5" :total="addresscount"
            :prev-button="{ icon: 'i-material-symbols:chevron-left' }"
            :next-button="{ icon: 'i-material-symbols:chevron-right' }" />
        </div>
      </main>
    </div>
    <AddressModal :isshow="showModal" @close="showModal = false" :addressinfo="addressinfo"
      @updateData="getAddresslist()" />
    <!-- <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-lg font-semibold mb-4">Add/Edit address</h2>
        <form @submit.prevent="handleSubmit">
          <div>
            <input type="text" v-model="form.firstName" placeholder="First name"
              class="w-full p-2 border rounded text-xs mt-4" />
            <input type="text" v-model="form.lastName" placeholder="Last name"
              class="w-full p-2 border rounded text-xs mt-4" />

            <select v-model="form.country" @change="getProvince" class="w-full p-2 border rounded mt-2 text-sm">
              <option value="">Select Country</option>
              <option v-for="country in countryarr" :key="country.iso" :value="country.iso">
                {{ country.country }}
              </option>
            </select>

            <select v-if="provincearr.length" v-model="form.province" @change="getCity"
              class="w-full p-2 border rounded mt-2 text-sm">
              <option value="">Select Province/State</option>
              <option v-for="province in provincearr" :key="province.admin1Code" :value="province.admin1Code">
                {{ province.asciiName }}
              </option>
            </select>

            <select v-if="cityarr.length" v-model="form.city" class="w-full p-2 border rounded mt-2 text-sm">
              <option value="">Select City</option>
              <option v-for="city in cityarr" :key="city.code" :value="city.name">
                {{ city.name }}
              </option>
            </select>
            <input type="text" v-model="form.address" placeholder="Address"
              class="w-full p-2 border rounded text-xs mt-4" />
            <input type="text" v-model="form.postalCode" placeholder="Zip code"
              class="w-full p-2 border rounded text-xs mt-4" />
            <input type="text" v-model="form.email" placeholder="email"
              class="w-full p-2 border rounded text-xs mt-4" />
            <div class="flex items-center space-x-2 mt-4">
              <USelectMenu searchable-placeholder="" searchable v-model="form.numberCode" :options="countries" size="sm"
                class="mr-2" />
              <UInput v-model="form.number" size="sm" placeholder="Your number"
                class="flex-1 bg-gray-50 border-0 focus:ring-0" />
            </div>
            <div class="flex items-center mt-4 text-sm">
              <input type="checkbox" v-model="form.master" />
              <span class="ml-2">Set as default address</span>
            </div>
          </div>
          <div class="mt-4 flex justify-between space-x-2">
            <button @click="closeModal" class="flex-1 px-4 py-2 border rounded">Cancel</button>
            <button type="submit" class="flex-1 px-4 py-2 bg-primary-500 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { message, Modal } from 'ant-design-vue'

const page = ref(1)
const items = ref(Array(55))
const addresscount = ref(0)
const addressinfo = ref({})
const { findCityByAdmin1Code, findCountryList, findProvincesByCountryCode, getuserAddressRollPage, createUserAddress, editUserAddress, deleteUserAddressByIdList } = AddressAuth();

const userinfo = useCookie('userinfo')
console.log(userinfo.value)

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
