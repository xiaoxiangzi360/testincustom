<template>
  <div class="bg-white w-full pt-10">
    <div class="max-row">
      <UBreadcrumb divider=">" :links="breadcrumbLinks" class="mb-6 text-blackcolor custom-breadcrumb text-2xl" :ui="{
        li: 'text-base font-normal text-blackcolor',
      }" />
      <!-- 产品详情部分 -->
      <div class="text-gray-800" ref="detailSectionRef">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-screen">
          <!-- Left section with image thumbnails -->
          <div class="md:col-span-5">
            <div class="sticky top-[124px]">

              <div class="w-full aspect-square overflow-hidden  mb-4" v-if="mainImage">
                <img :src="mainImage" alt="Shade sail"
                  class="rounded-xl shadow-lg w-full transition-all duration-300 w-full h-full object-cover" />
                <!-- <img :src="type.imageLink" class="w-full h-full object-cover" /> -->
              </div>
              <Swiper v-if="productinfo.erpProduct.photoList" :space-between="10" class="w-full" :slides-per-view="4"
                :breakpoints="{
                  640: { slidesPerView: 3 },    // 小屏幕：展示2个
                  768: { slidesPerView: 4 },    // 中屏幕：展示3个
                  1024: { slidesPerView: 5 }    // 大屏幕：展示4个
                }">
                <SwiperSlide v-for="item in productinfo.erpProduct.photoList">
                  <img :src="item.photoUrl" alt="thumbnail"
                    class="w-full object-cover rounded-xl cursor-pointer hover:opacity-80"
                    @click="mainImage = item.photoUrl" />
                </SwiperSlide>
              </Swiper>
            </div>

          </div>

          <!-- Right section -->
          <div class="md:col-span-7">
            <div class="flex items-center justify-between ">
              <h1 class="text-xl font-bold sm:text-lg md:text-lg lg:text-2xl mb-0">
                {{ productinfo.erpProduct.productEnglishName }}
              </h1>
              <img src="/images/heartfill.png" class="w-8">
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 mt-7">
              <div class="text-xl sm:text-xl font-medium">
                ${{ productinfo.erpProduct.memberPrice }}
                <!-- <span class="line-through text-gray-300 ml-2">$193.66</span> -->
              </div>
            </div>
            <!-- Section 1: THE TYPE -->
            <div v-if="productinfo.normalPropertyList" class="mt-12">
              <div class="mb-6 border-b border-b-[#C8C8C8] pb-6 "
                v-for="(property, index) in productinfo.normalPropertyList">
                <div class="flex justify-between items-center cursor-pointer"
                  @click="property.showType = !property.showType">
                  <h2 class="font-bold text-lg flex items-center mb-0 ">
                    <UBadge color="black" variant="solid" class="mr-3 w-6 h-6">{{ index + 1 }}</UBadge>
                    <span class="truncate-1-lines">{{ property.propertyName }}</span>
                    <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }" :title="property.desc"
                      :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                      <img src="/question.png" class="w-6 h-6 ml-2">

                    </Tooltip>
                  </h2>
                  <div class="flex items-center">
                    <span class="mr-4 truncate-1-lines max-w-44" v-if="property.selectedproperty">{{
                      property.selectedproperty.detailName
                    }}</span>
                    <UIcon :name="property.showType ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 text-gray-500 font-medium transition-all duration-300 " />
                  </div>

                </div>

                <div :class="[
                  'overflow-hidden transition-all duration-300 ease-in-out grid gap-4',
                  property.showType ? 'max-h-[500px] mt-4' : 'max-h-0', !property.isneedinput && property.productPropertyDetailType != 'text' ? 'grid-cols-5' : ''
                ]">
                  <div v-if="!property.isneedinput && property.productPropertyDetailType != 'text'"
                    v-for="(type, propertyindex) in property.detailList" :key="type"
                    @click="selectproperty(index, type)"
                    class="p-1 rounded-xl flex flex-col items-center cursor-pointer transition-all">

                    <div :class="[
                      'w-full aspect-square overflow-hidden',
                      property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                        ? 'border border-primary'
                        : ''
                    ]" v-if="type.imageLink">
                      <img :src="type.imageLink" class="w-full h-full object-cover" />
                    </div>
                    <div class="py-2 w-full text-sm" :class="[
                      'py-2 w-full',
                      !type.imageLink
                        ? 'border border-customblack w-full rounded-md'
                        : '',
                      !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                        ? 'border border-primary w-full'
                        : '',
                    ]">
                      <div class="truncate-2-lines text-center">{{ type.detailName }}</div>
                    </div>

                  </div>
                  <div class="w-full flex flex-wrap"
                    v-if="!property.isneedinput && property.productPropertyDetailType == 'text'">
                    <div v-for="(type, propertyindex) in property.detailList" :key="type"
                      @click="selectproperty(index, type)" class="p-2 rounded-xl flex flex-col items-center cursor-pointer transition-all
          max-w-[33.3333%] min-w-[20%]">

                      <div :class="[
                        'w-full aspect-square overflow-hidden',
                        property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                          ? 'border border-primary'
                          : ''
                      ]" v-if="type.imageLink">
                        <img :src="type.imageLink" class="w-full h-full object-cover" />
                      </div>
                      <div class="p-2 w-full text-sm" :class="[
                        'py-2 w-full',
                        !type.imageLink
                          ? 'border border-customblack w-full rounded-md'
                          : '',
                        !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                          ? 'border border-primary w-full'
                          : '',
                      ]">
                        <div class="truncate-1-lines text-center">{{ type.detailName }}</div>
                      </div>

                    </div>
                  </div>

                  <div class="flex flex-col md:flex-row md:items-start gap-6 relative w-full"
                    v-if="property.isneedinput">

                    <div class="flex-1 space-y-4">
                      <div class="text-base text-gray-800">
                        <label v-if="property.noneedinputlist.length > 0"
                          class="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" v-model="property.chooseindex" value="1" class="mt-1" />
                          <span class="font-bold text-sm">Standard size:</span>

                          <USelectMenu v-model="property.selected" :options="property.noneedinputlist" size="sm">
                            <template #label>
                              <div class="flex items-center w-24">
                                <img :src="property.selected.imageLink" class="w-6 h-6 mr-2" />

                                <span>{{ property.selected.detailName }}</span>
                              </div>
                            </template>
                            <template #option="{ option }">
                              <div class="flex items-center gap-2 py-2 w-24">
                                <img :src="property.selected.imageLink" class="w-6 h-6 mr-2" />

                                <span>{{ option.detailName }}</span>
                              </div>
                            </template>
                          </USelectMenu>
                        </label>
                        <label class="cursor-pointer mt-4 block"
                          v-for="(needinput, needindex) in property.needinputlist">
                          <div class="flex items-center">
                            <input type="radio" v-model="property.chooseindex" :value="needindex + 2" />
                            <span class="font-semibold text-sm">
                              {{ needinput.detailName }}
                            </span>
                          </div>

                          <div class="mt-4" v-for="inputitem in needinput.inputList">
                            <div class="flex items-center space-x-4 mt-2">
                              <label class="text-sm ">{{ inputitem }}</label>
                              <input type="text" placeholder="e.g. 10'x12'x10'"
                                @change="property.chooseindex = needindex + 2" class=" rounded p-1 text-sm" />
                            </div>
                          </div>
                        </label>
                      </div>


                    </div>

                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="mb-6 border-b border-b-[#C8C8C8] pb-6">

              <div class="flex justify-between items-center cursor-pointer" @click="showDimensions = !showDimensions">
                <h2 class="font-bold text-lg flex items-center mb-0">
                  <UBadge color="black" variant="solid" class="mr-3">3</UBadge> YOUR DIMENSIONS
                </h2>
                <UIcon :name="showDimensions ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  class="w-5 h-5 text-gray-500" />
              </div>

              <div v-show="showDimensions" class="mt-4 transition-all duration-300 ease-in-out space-y-4">

                <div class="flex flex-col md:flex-row md:items-start gap-6 relative">

                  <div class="flex-1 space-y-4">
                    <div class="text-base text-gray-800">
                      <label class="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" v-model="designMode1" value="1" class="mt-1" />
                        <span class="font-bold text-sm">Standard size:</span>
                        <USelectMenu v-model="selected" :options="people" size="sm">
                          <template #label>
                            <div class="flex items-center">
                              <img :src="selected.avatar.src" class="w-6 h-6 mr-2" />
                              <span>{{ selected.label }}</span>
                              <span>{{ selected.value }}</span>
                            </div>
                          </template>
                          <template #option="{ option }">
                            <div class="flex items-center gap-2 py-2">
                              <img :src="option.avatar.src" class="w-8 h-8" />

                              <span>{{ option.label }}</span>
                              <span>{{ option.value }}</span>
                            </div>
                          </template>
                        </USelectMenu>
                      </label>
                      <label class="flex items-start space-x-2 cursor-pointer mt-4">
                        <input type="radio" v-model="designMode1" value="2" class="mt-1" />
                        <span class="font-semibold text-sm">
                          Enter the dimensions (in inches)
                        </span>
                      </label>
                    </div>

                    <div>
                      <div class="flex items-center space-x-4 mt-2">
                        <label class="text-sm mb-1">dimension in inches AB</label>
                        <input type="text" placeholder="e.g. 10'x12'x10'" v-model="dimensionsInput"
                          class="border rounded p-1 text-sm" />
                      </div>


                    </div>
                  </div>

                </div>
              </div>
            </div> -->

            <div class="mb-6 border-b border-b-[#C8C8C8] pb-6"
              v-show="productinfo.printPropertyList && productinfo.printPropertyList.length > 0">

              <div class="flex justify-between items-center cursor-pointer" @click="showDimensions = !showDimensions">
                <h2 class="font-bold text-lg flex items-center mb-0">
                  <UBadge color="black" variant="solid" class="mr-3">{{ productinfo.normalPropertyList.length + 1 }}
                  </UBadge>
                  PRINT ON
                  DEMAND
                </h2>
                <UIcon :name="showDimensions ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  class="w-5 h-5 text-gray-500 transition-all duration-300" />
              </div>

              <!-- <div v-show="showDimensions" class="mt-4 transition-all duration-300 ease-in-out space-y-4"> -->
              <div :class="[
                'overflow-hidden transition-all duration-300 ease-in-out grid gap-4',
                showDimensions ? 'max-h-[500px] mt-4' : 'max-h-0'
              ]">
                <div class="flex flex-col md:flex-row md:items-start gap-12 relative justify-between">

                  <div class="flex-1 space-y-4">

                    <p class="font-semibold text-sm">
                      <span v-for="(item, index) in productinfo.printPropertyList">
                        {{ item.value }}{{ index < productinfo.printPropertyList.length ? ',' : '' }}</span>
                    </p>

                    <div class="text-primary border-b-2 w-fit border-primary py-1 font-semibold cursor-pointer">Design
                      Now</div>

                  </div>

                  <div class="w-full md:w-40 shrink-0 self-center">
                    <img src="/solaria.webp" alt="Dimension guide" class="rounded-xl border" />
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="mb-6 border-b border-b-[#C8C8C8] pb-6">
              <div class="flex justify-between items-center cursor-pointer" @click="showPrint = !showPrint">
                <h2 class="font-bold text-lg flex items-center mb-0">
                  <UBadge color="black" variant="solid" class="mr-3">5</UBadge> PRINT ON DEMAND
                </h2>
                <UIcon :name="showPrint ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  class="w-5 h-5 text-gray-500" />
              </div>
              <div v-show="showPrint" class="mt-4 transition-all duration-300 ease-in-out space-y-4">

                <div class="space-y-2 text-base text-gray-800">
                  <label class="flex items-start space-x-2 cursor-pointer">
                    <input type="radio" v-model="designMode" value="1" class="mt-1" />
                    <span>I want to design</span>
                  </label>
                  <label class="flex items-start space-x-2 cursor-pointer">
                    <input type="radio" v-model="designMode" value="2" class="mt-1" />
                    <span>
                      I have no request for POD
                    </span>
                  </label>
                </div>
              </div>
            </div> -->

            <div class="border-b border-b-[#C8C8C8] pb-6">
              <div class="w-full mx-auto bg-white py-6 sm:py-8 rounded-md">

                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span class="font-semibold text-base sm:text-lg">QUANTITY</span>
                  <div class="flex items-center rounded px-2">
                    <div class="border flex items-center bg-[#F8F8F8] rounded">
                      <button @click="decrement" class="text-gray-500 px-2 hover:text-black">−</button>
                      <input type="text" v-model="quantity"
                        class="w-12 text-center outline-none border-0 py-1 bg-[#F8F8F8]" />
                      <button @click="increment" class="text-gray-500 px-2 hover:text-black">+</button>
                    </div>
                    <span class="ml-2 text-base sm:text-lg">Panels</span>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 sm:mt-8">
                  <span class="font-semibold text-base sm:text-lg">TOTAL PRICE</span>
                  <div class="flex items-center flex-wrap gap-2">
                    <span class="text-base sm:text-lg font-bold text-gray-900">${{ totalPrice.toFixed(2) }}</span>
                    <!-- <span class="line-through text-base sm:text-lg text-gray-400">${{ originalPrice.toFixed(2) }}</span> -->
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8">
                  <UButton class="w-full sm:flex-1 flex items-center justify-center rounded-md" @click="addtocart"
                    color="primary" variant="solid" size="xl">
                    Add to Cart
                  </UButton>
                  <UButton class="w-full sm:flex-1 flex items-center justify-center rounded-md" color="secondary"
                    variant="solid" size="xl">
                    Order Now
                  </UButton>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="mx-auto mt-16">
        <!-- Tab Buttons -->
        <div class="text-4xl font-bold">
          <div class="flex gap-4 justify-start">
            <div class="w-auto">
              <div
                class="inline-block p-6 rounded-xl rounded-b-none cursor-pointer text-center text-sm sm:text-base md:text-lg lg:text-xl"
                :class="{ 'bg-[#F8F8F8]': tabindex === 1 }" @click="changetab(1)">
                Basic Information
              </div>
            </div>
            <div class="w-auto">
              <div
                class="inline-block p-6 rounded-xl  rounded-b-none cursor-pointer text-center text-sm sm:text-base md:text-lg lg:text-xl"
                :class="{ 'bg-[#F8F8F8]': tabindex === 2 }" @click="changetab(2)">
                Print Information
              </div>
            </div>
          </div>
        </div>

        <!-- Content Area -->
        <div v-show="tabindex == 1"
          class="mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-8 text-gray-800 bg-[#F8F8F8] py-16 rounded">
          {{
            productinfo.erpProduct.remarks
          }}
        </div>
        <div v-show="tabindex == 2"
          class="mx-auto p-6 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-y-6 gap-x-8 text-gray-800 bg-[#F8F8F8] py-16 rounded">
          <!-- Size -->
          <div class="flex justify-between" v-for="Propertyitem in productinfo.printPropertyList">
            <!-- <span class="font-semibold text-sm sm:text-base">{{ Propertyitem.title }}</span> -->
            <span class="text-sm sm:text-base">{{ Propertyitem.value }}</span>
          </div>

        </div>
      </div>


      <!-- 推荐产品部分 -->
      <div class="mt-12 pb-4" v-if="products.length > 0">
        <h1 class="text-3xl font-bold mb-8">Recommended products</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 ">
          <div v-for="(product, index) in products" :key="index" @click="checkdetail(product.id)"
            class="product-card rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
            <div class="relative h-80 overflow-hidden">
              <img v-if="product.erpProduct.mainPic" :src="product.erpProduct.mainPic"
                :alt="product.erpProduct.productEnglishName" class="w-full h-full object-cover object-top">
            </div>
            <div class="mt-2">
              <h3 class="text-lg font-medium mb-2 line-clamp-2">{{ product.erpProduct.productEnglishName }}</h3>
              <p class="text-xl font-bold text-gray-900">${{ product.erpProduct.memberPrice.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <Faq />
  <div ref="bottomBarRef"
    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-8 bg-white rounded-md shadow-lg sticky bottom-0 transition-all duration-300 ease-in-out"
    :class="{
      'opacity-100 translate-y-0 pointer-events-auto': !isBottomBarHidden,
      'opacity-0 translate-y-8 pointer-events-none': isBottomBarHidden
    }" v-show="isshow">
    <!-- 左侧：标题和类型 -->
    <div>
      <h2 class="font-semibold text-base sm:text-lg text-gray-900">{{ productinfo.erpProduct.productEnglishName }}</h2>
      <p class="text-sm text-gray-500">Ordinary type sail / Rectangle</p>
    </div>

    <!-- 中间：数量 + 单位 + 价格 -->
    <div class="flex flex-wrap items-center gap-3 sm:gap-4">
      <div class="flex items-center border border-gray-300 rounded px-2 py-1">
        <button class="text-gray-500 hover:text-gray-700" @click="decrement">-</button>
        <span class="mx-2 w-12 text-center">{{ quantity }}</span>
        <button class="text-gray-500 hover:text-gray-700" @click="increment">+</button>
      </div>
      <span class="text-sm text-gray-600 ">Panels</span>
      <span class="text-base sm:text-lg font-medium text-gray-800">${{ totalPrice.toFixed(2) }}</span>
      <UButton color="primary" size="md" @click="addtocart" class="rounded-lg">
        Add to Cart
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, onMounted } from 'vue';
import { message, Tooltip } from 'ant-design-vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
const router = useRouter()
const cart = useCartStore()

const showDimensions = ref(true)
const showPrint = ref(true)
const dimensionMode = ref('sail')
const designMode = ref('1')
const designMode1 = ref('1')
const dimensionsInput = ref('')
const productinfo = ref({
  erpProduct: {
    memberPrice: 0,
    photoList: [],
    propertyList: [],
    catalogId: 0,
    mainPic: ''
  },
  printPropertyList: [],
  normalPropertyList: []
});
const relatedList = [];
const { getProductById, randomRecommendationProductByCatalogId } = ProductAuth();
const { creatCart } = cartAuth();

const mainImage = ref('/solaria.webp')
const quantity = ref(1)
// const pricePerPanel = productinfo.value.erpProduct.memberPrice

const totalPrice = computed(() => quantity.value * productinfo.value.erpProduct.memberPrice)
const originalPrice = computed(() => quantity.value * 232.93)
const tabindex = ref(1);
const changetab = (index) => {
  tabindex.value = index
}
const increment = () => {
  quantity.value++
}
const decrement = () => {
  if (quantity.value > 1) quantity.value--
}
const selectproperty = (index, type) => {
  productinfo.value.normalPropertyList[index]['selectedproperty'] = type;
}
const products = ref([

]);
const addtocart = async () => {
  try {
    let data = {
      productQuantity: quantity.value,
      productSku: Math.random() * 10,
    }
    let res = await creatCart(data);

    message.success('Add successful!')
    cart.refreshCart()

  } catch (error) {
    let errormsg = JSON.parse(error.message)

    message.error(errormsg.enDesc || 'Login failed, please try again')
  }
};
const breadcrumbLinks = [
  { label: "Home", to: "/" },
  { label: "Product Category", to: "/Categories" },
  { label: "Product Details", to: "/productdetail/1" }
];
const handleGetProudct = async () => {


  try {
    let productid = '1912447337201045504';
    let parmes = {
      id: productid
    }
    let res = await getProductById(parmes);
    productinfo.value = res.result
    productinfo.value.normalPropertyList.forEach(element => {
      let noneedinputlist = ref([])
      let needinputlist = ref([])
      element.detailList.forEach(item => {
        if (item.inputList) {
          element.isneedinput = true;
          needinputlist.value.push(item);
        } else {
          noneedinputlist.value.push(item);
        }
        element.needinputlist = needinputlist.value;
        element.noneedinputlist = noneedinputlist.value;
        element.selected = noneedinputlist.value[0]
        element.chooseindex = 1;
        if (noneedinputlist.value.length == 0) {
          element.chooseindex = 2;

        }
      });
    });
    mainImage.value = productinfo.value.erpProduct.mainPic

    handleGetrelated();

  } catch (error) {

  }
};
handleGetProudct();
const handleGetrelated = async () => {


  try {
    let parmes = {
      catalogId: productinfo.value.erpProduct.catalogId,
      size: 3
    }
    let res = await randomRecommendationProductByCatalogId(parmes);

    products.value = res.result;

  } catch (error) {

  }
};
const people = [{
  id: 'benjamincanac',
  label: 'benjamincanac',
  href: 'https://github.com/benjamincanac',
  target: '_blank',
  avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' }
}, {
  id: 'Atinux',
  label: 'Atinux',
  href: 'https://github.com/Atinux',
  target: '_blank',
  avatar: { src: 'https://avatars.githubusercontent.com/u/904724?v=4' }
}, {
  id: 'smarroufin',
  label: 'smarroufin',
  href: 'https://github.com/smarroufin',
  target: '_blank',
  avatar: { src: 'https://avatars.githubusercontent.com/u/7547335?v=4' }
}]

const selected = ref(people[0])
const checkdetail = (id) => {
  router.push('/productdetail/' + id)

}
const isBottomBarHidden = ref(true);
const detailSectionRef = ref(null);
const bottomBarRef = ref(null);
const isshow = ref(true);
const handleScroll = () => {


  // if (detailSectionRef.value) {
  //   const rect = detailSectionRef.value.getBoundingClientRect();
  //   isBottomBarHidden.value = rect.top > 0;
  // }
  if (bottomBarRef.value) {
    const rect1 = detailSectionRef.value.getBoundingClientRect();

    const rect2 = bottomBarRef.value.getBoundingClientRect();

    if (rect2.top < 800 || rect1.top > 0) {
      isBottomBarHidden.value = true
    } else {

      isBottomBarHidden.value = false
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<style>
.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate-1-lines {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1 / 1;

  @supports not (aspect-ratio: 1/1) {
    /* 旧浏览器备用方案 */
    position: relative;
    padding-bottom: 100%;

    /* 1:1 比例 */
    &>* {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}

/* 如果需要自定义样式，可以隐藏原生 radio 并用伪元素实现 */
input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: #222;
  border-color: #222;
}

input[type="radio"]:checked::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 修改焦点环颜色 */
input[type="radio"]:focus-visible {
  outline: 2px solid #222;
  background-color: #222;

  /* 紫色示例 */
  outline-offset: 2px;
}

/* 或者完全移除焦点环 */
input[type="radio"]:focus {
  outline: none;
  box-shadow: none;
  background-color: #222;

}

input[type="radio"]:checked:focus {
  background-color: #222;
}

input[type="radio"]:checked:hover {
  background-color: #222;
}

[type='text']:focus {
  outline: none;
  box-shadow: none;
  border-color: rgb(56, 56, 56)
}

/* 假设你没有加什么其他 class */
.custom-breadcrumb li:last-child span {
  color: #0C1013;
  /* 红色，自己改成想要的颜色 */
  font-weight: normal;
}
</style>
