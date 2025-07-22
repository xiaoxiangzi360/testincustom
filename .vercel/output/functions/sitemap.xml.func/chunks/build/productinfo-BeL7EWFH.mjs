import { _ as __nuxt_component_0 } from './Breadcrumb-BOXN2oZJ.mjs';
import { _ as _export_sfc, c as __nuxt_component_5, e as __nuxt_component_7 } from './server.mjs';
import { _ as __nuxt_component_2 } from './Badge-C4qFuzNw.mjs';
import { _ as __nuxt_component_6 } from './Faq-D6enPfK7.mjs';
import { ref, computed, watch, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createTextVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-CXjc88Su.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { Tooltip, Select, message } from 'ant-design-vue';
import { u as useCartStore, c as cartAuth } from './cart-DGSyKrC3.mjs';
import { useRoute, useRouter } from 'vue-router';
import { P as ProductAuth } from './product-9kYz4MaC.mjs';
import 'tailwind-merge';
import '../_/nitro.mjs';
import 'unist-util-visit';
import 'hast-util-to-string';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'path';
import 'fs';
import 'consola';
import '@unhead/schema-org';
import 'unified';
import 'mdast-util-to-string';
import 'micromark';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'micromark-util-sanitize-uri';
import 'slugify';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'github-slugger';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'node:crypto';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'node:url';
import 'ipx';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import './keyboard-Duq8EHr3.mjs';
import './use-resolve-button-type-DOOP2SMg.mjs';
import './open-closed-BDzQJ33n.mjs';

const _sfc_main = {
  __name: "productinfo",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const lastpage = router.options.history.state.back;
    const cart = useCartStore();
    const isLoading = ref(true);
    const swiperInstance = ref(null);
    const skuprice = ref(0);
    const cartloding = ref(false);
    const orderloding = ref(false);
    const orginproductinfo = ref({});
    const productid = computed(() => route.query.id ?? "29201");
    const showDimensions = ref(true);
    const mainImageIndex = ref(0);
    const isSwiperAtStart = computed(() => mainImageIndex.value === 0);
    const isSwiperAtEnd = computed(() => mainImageIndex.value === productinfo2.value.erpProduct.photoList.length - 1);
    let specList = [];
    let joinsku = [];
    const designimage = ref("");
    const productinfo2 = ref({
      erpProduct: {
        customPrice: 0,
        photoList: [],
        propertyList: [],
        catalogId: 0,
        mainPic: ""
      },
      printPropertyList: [],
      normalPropertyList: []
    });
    const { getProductById, randomRecommendationProductByCatalogId, trialPriceCalculationBySpuV2, erpTryToCreateSku, getmapProductByProductSkuList } = ProductAuth();
    const { createCart } = cartAuth();
    const mainImage = ref("");
    const quantity = ref(1);
    const totalPrice = computed(() => quantity.value * skuprice.value);
    const tabindex = ref(1);
    const errorsize = ref("");
    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
    };
    const onSlideChange = () => {
      var _a;
      if (swiperInstance.value) {
        const swiper = swiperInstance.value;
        isSwiperAtStart.value = swiper.isBeginning;
        isSwiperAtEnd.value = swiper.isEnd;
        const activeIndex = swiper.activeIndex;
        const slides = productinfo2.value.erpProduct.photoList;
        if (activeIndex < slides.length) {
          mainImage.value = slides[activeIndex].url;
        } else {
          mainImage.value = ((_a = slides[slides.length - 1]) == null ? void 0 : _a.url) || productinfo2.value.erpProduct.mainPic;
        }
      }
    };
    const selectproperty = (index, type) => {
      console.log(index);
      console.log("type", type);
      if (type.disabled) {
        return;
      }
      productinfo2.value.normalPropertyList.forEach((element, index1) => {
        if (index1 < index) {
          if (isUndefinedOrEmptyObject(element.selectedproperty)) {
            joinsku = joinsku.filter((item) => element.selectedproperty.skuList.includes(item));
          }
        }
        if (index == 0) {
          joinsku = type.skuList;
        }
      });
      if (!joinsku) {
        joinsku = [];
      }
      if (productinfo2.value.normalPropertyList[index + 1] && type.skuList) {
        let curskulist = joinsku.length > 0 ? joinsku.filter((item) => type.skuList.includes(item)) : type.skuList || [];
        let nextProperty = productinfo2.value.normalPropertyList[index + 1];
        if (nextProperty.isneedinput) {
          let nextdetailList = productinfo2.value.normalPropertyList[index + 1].noneedinputlist;
          nextdetailList.forEach((element) => {
            let skulist = element.skuList;
            let hasIntersection = skulist && skulist.some((item) => curskulist.includes(item));
            element.isactive = hasIntersection;
            element.disabled = !hasIntersection;
          });
          let nextdetailList1 = productinfo2.value.normalPropertyList[index + 1].needinputlist;
          nextdetailList1.forEach((element1) => {
            let skulist = element1.skuList;
            let hasIntersection = skulist && skulist.some((item) => curskulist.includes(item));
            element1.isactive = hasIntersection;
            element1.disabled = !hasIntersection;
          });
        } else {
          let nextdetailList = productinfo2.value.normalPropertyList[index + 1].detailList;
          nextdetailList.forEach((element) => {
            let skulist = element.skuList;
            let hasIntersection = skulist && skulist.some((item) => curskulist.includes(item));
            element.isactive = hasIntersection;
            element.disabled = !hasIntersection;
          });
        }
      }
      productinfo2.value.normalPropertyList[index]["selectedproperty"] = type;
      if (productinfo2.value.normalPropertyList[index + 1] && type.skulist) {
        productinfo2.value.normalPropertyList[index + 1]["selectedproperty"] = {};
      }
      let inputvalue = [];
      let hasEmpty = false;
      let needinputproperty;
      let ischoose = true;
      productinfo2.value.normalPropertyList.forEach((element) => {
        if (isUndefinedOrEmptyObject(element.selectedproperty)) {
          ischoose = false;
        }
        if (element.isneedinput && element.chooseindex == 2) {
          let needinputlist = element.needinputlist.filter((item) => item.isactive);
          needinputlist.forEach((item) => {
            inputvalue = item.inputvalue;
            hasEmpty = inputvalue.some((item2) => item2 === "");
          });
          needinputproperty = element;
        }
      });
      if (needinputproperty) {
        if (ischoose && !hasEmpty) {
          getcustomprice(inputvalue);
        }
      } else {
        const skuLists = productinfo2.value.normalPropertyList.map((property) => {
          var _a;
          return (_a = property.selectedproperty) == null ? void 0 : _a.skuList;
        }).filter((list) => Array.isArray(list) && list.length > 0);
        if (skuLists.length === 0) return;
        let innersku = skuLists.reduce((acc, list) => acc.filter((sku) => list.includes(sku)));
        console.log(innersku);
        let firstsku = innersku[0];
        if (firstsku) {
          getskuprice(firstsku);
        }
      }
    };
    const getskuprice = async (sku) => {
      try {
        let params = {
          skuList: [sku]
        };
        let res = await getmapProductByProductSkuList(params);
        let lists = res.result;
        let skuinfo = lists[sku];
        skuprice.value = skuinfo.skuSpec.customPrice;
      } catch (error) {
      }
    };
    const products = ref([]);
    const opencartloding = () => {
      cartloding.value = true;
    };
    const openorderloding = () => {
      orderloding.value = true;
    };
    const closecartloding = () => {
      cartloding.value = false;
    };
    const closeorderloding = () => {
      orderloding.value = false;
    };
    const addtocart = async () => {
      try {
        if (!quantity.value || quantity.value <= 0) {
          message.error("Please enter quantity!");
          return;
        }
        let ischoose = true;
        let hasEmpty = false;
        let inputvalue = [];
        let needinputproperty;
        let selectproperlist = [];
        productinfo2.value.normalPropertyList.forEach((element) => {
          var _a, _b;
          if (isUndefinedOrEmptyObject(element.selectedproperty)) {
            ischoose = false;
          }
          if (element.isneedinput && element.chooseindex == 2) {
            let needinputlist = element.needinputlist.filter((item) => item.isactive);
            needinputlist.forEach((item) => {
              inputvalue = item.inputvalue;
              hasEmpty = inputvalue.some((item2) => item2 === "");
            });
            needinputproperty = element;
          }
          let detailitem = [{
            isSelect: true,
            isMissing: true,
            detailName: (_a = element.selectedproperty) == null ? void 0 : _a.detailName,
            propertyId: (_b = element.selectedproperty) == null ? void 0 : _b.propertyId
          }];
          selectproperlist.push({
            detailList: detailitem,
            specCode: element.specCode,
            propertyId: element.propertyId,
            propertyType: element.propertyType,
            propertyName: element.propertyName
          });
        });
        if (hasEmpty) {
          message.error("No dimensions entered!");
          return;
        }
        if (!ischoose) {
          message.error("Please select properties!");
          return;
        }
        let selectsku;
        if (inputvalue.length > 0) {
          let target = selectproperlist.find((item) => item.propertyId === needinputproperty.propertyId);
          if (target) {
            target.detailList = [{
              isSelect: true,
              isMissing: true,
              detailName: inputvalue.join("*"),
              propertyId: needinputproperty.propertyId
            }];
          }
          let variationList = productinfo2.value.erpProduct.variationList;
          const targetProperty = productinfo2.value.normalPropertyList.find((item) => item.propertyNameShop === "Shape");
          let detailName = "";
          if (targetProperty && targetProperty.selectedproperty) {
            detailName = targetProperty.selectedproperty.detailName;
          }
          let createData = {
            productId: productid.value,
            productStyle: productinfo2.value.erpProduct.productStyle,
            propertyList: selectproperlist,
            shape: detailName,
            variationList: variationList ? variationList : []
          };
          for (let i = 0; i < inputvalue.length; i++) {
            createData[`edge${i + 1}`] = inputvalue[i] || 0;
          }
          try {
            openorderloding();
            let res2 = await erpTryToCreateSku(createData);
            selectsku = res2.result.skuSpec.sku;
          } catch (e) {
            closeorderloding();
            const errormsg = JSON.parse(e.message || "{}");
            message.error(errormsg.enDesc || "Create SKU failed");
            return;
          }
        } else {
          const skuLists = productinfo2.value.normalPropertyList.map((property) => {
            var _a;
            return (_a = property.selectedproperty) == null ? void 0 : _a.skuList;
          }).filter((list) => Array.isArray(list) && list.length > 0);
          if (skuLists.length === 0) return;
          let innersku = skuLists.reduce((acc, list) => acc.filter((sku) => list.includes(sku)));
          if (innersku.length == 0) {
            message.error("Please select all properties");
            return;
          }
          selectsku = innersku[0];
          opencartloding();
        }
        let data = {
          productQuantity: quantity.value,
          productSku: selectsku
        };
        let res = await createCart(data);
        message.success("Add successful!");
        closecartloding();
        cart.refreshCart();
      } catch (error) {
        let errormsg = JSON.parse(error.message);
        closecartloding();
        message.error(errormsg.enDesc || "failed, please try again");
      }
    };
    function isUndefinedOrEmptyObject(val) {
      return val === void 0 || typeof val === "object" && val !== null && Object.keys(val).length === 0 && val.constructor === Object;
    }
    const createorder = async () => {
      try {
        if (!quantity.value || quantity.value <= 0) {
          message.error("Please enter quantity!");
          return;
        }
        let ischoose = true;
        let hasEmpty = false;
        let inputvalue = [];
        let needinputproperty;
        let selectproperlist = [];
        productinfo2.value.normalPropertyList.forEach((element) => {
          var _a, _b;
          if (isUndefinedOrEmptyObject(element.selectedproperty)) {
            ischoose = false;
          }
          if (element.isneedinput && element.chooseindex == 2) {
            let needinputlist = element.needinputlist.filter((item) => item.isactive);
            needinputlist.forEach((item) => {
              inputvalue = item.inputvalue;
              hasEmpty = inputvalue.some((item2) => item2 === "");
            });
            needinputproperty = element;
          }
          let detailitem = [{
            isSelect: true,
            isMissing: true,
            detailName: (_a = element.selectedproperty) == null ? void 0 : _a.detailName,
            propertyId: (_b = element.selectedproperty) == null ? void 0 : _b.propertyId
          }];
          selectproperlist.push({
            detailList: detailitem,
            specCode: element.specCode,
            propertyId: element.propertyId,
            propertyType: element.propertyType,
            propertyName: element.propertyName
          });
        });
        if (hasEmpty) {
          message.error("No dimensions entered!");
          return;
        }
        if (!ischoose) {
          message.error("Please select properties!");
          return;
        }
        let selectsku;
        if (inputvalue.length > 0) {
          let target = selectproperlist.find((item) => item.propertyId === needinputproperty.propertyId);
          if (target) {
            target.detailList = [{
              isSelect: true,
              isMissing: true,
              detailName: inputvalue.join("*"),
              propertyId: needinputproperty.propertyId
            }];
          }
          let variationList = productinfo2.value.erpProduct.variationList;
          const targetProperty = productinfo2.value.normalPropertyList.find((item) => item.propertyNameShop === "Shape");
          let detailName = "";
          if (targetProperty && targetProperty.selectedproperty) {
            detailName = targetProperty.selectedproperty.detailName;
          }
          let createData = {
            productId: productid.value,
            productStyle: productinfo2.value.erpProduct.productStyle,
            propertyList: selectproperlist,
            shape: detailName,
            variationList: variationList ? variationList : []
          };
          for (let i = 0; i < inputvalue.length; i++) {
            createData[`edge${i + 1}`] = inputvalue[i] || 0;
          }
          try {
            openorderloding();
            let res = await erpTryToCreateSku(createData);
            selectsku = res.result.skuSpec.sku;
          } catch (e) {
            closeorderloding();
            const errormsg = JSON.parse(e.message || "{}");
            message.error(errormsg.enDesc || "Create SKU failed");
            return;
          }
        } else {
          const skuLists = productinfo2.value.normalPropertyList.map((property) => {
            var _a;
            return (_a = property.selectedproperty) == null ? void 0 : _a.skuList;
          }).filter((list) => Array.isArray(list) && list.length > 0);
          if (skuLists.length === 0) return;
          let innersku = skuLists.reduce((acc, list) => acc.filter((sku) => list.includes(sku)));
          if (innersku.length == 0) {
            message.error("Please select all properties");
            return;
          }
          selectsku = innersku[0];
          openorderloding();
        }
        closeorderloding();
        router.push("/checkout?from=detail&sku=" + selectsku + "&number=" + quantity.value);
      } catch (error) {
        console.log(error);
        let errormsg = JSON.parse(error.message);
        closeorderloding();
        message.error(errormsg.enDesc || "Failed");
      }
    };
    let lastLabel = null;
    let lastTo = null;
    const breadcrumbLinks = ref([
      { label: "Home", to: "/", title: "Home" }
    ]);
    if (lastpage) {
      const decodedPath = decodeURIComponent(lastpage);
      const categoryMatch = decodedPath.match(/^\/(.+?)-(\d+)(\/)?$/);
      if (categoryMatch) {
        lastLabel = categoryMatch[1];
        lastTo = lastpage;
      }
      const collectionMatch = decodedPath.match(/^\/collections\/([^/?#]+)/);
      if (collectionMatch) {
        lastLabel = collectionMatch[1];
        lastTo = lastpage;
      }
      if (lastLabel && lastTo) {
        breadcrumbLinks.value.push({
          label: lastLabel,
          to: lastTo,
          title: lastLabel
        });
      }
    }
    const updateBreadcrumbProduct = (productName) => {
      var _a;
      const productPath = `/product/${productid.value}/${productName}`;
      const lastIndex = breadcrumbLinks.value.length - 1;
      const lastItem = breadcrumbLinks.value[lastIndex];
      if (lastItem && ((_a = lastItem.to) == null ? void 0 : _a.startsWith("/product"))) {
        breadcrumbLinks.value[lastIndex] = {
          label: productName,
          to: productPath,
          title: productName
        };
      } else {
        breadcrumbLinks.value.push({
          label: productName,
          to: productPath,
          title: productName
        });
      }
    };
    const handleGetProudct = async () => {
      try {
        isLoading.value = true;
        let parmes = { id: productid.value, needPropData: true };
        let res = await getProductById(parmes);
        updateBreadcrumbProduct(res.result.erpProduct.productEnglishName);
        orginproductinfo.value = res.result;
        productinfo2.value = res.result;
        skuprice.value = res.result.erpProduct.customPrice;
        specList = res.result.erpProduct.specList;
        productinfo2.value.normalPropertyList.forEach((element) => {
          let noneedinputlist = ref([]);
          let needinputlist = ref([]);
          element.detailList.forEach((item) => {
            item.isactive = true;
            item.label = item.detailName;
            if (item.inputList) {
              let inputvalue = [];
              item.inputList.forEach((element2) => {
                inputvalue.push("");
              });
              item.inputvalue = inputvalue;
              element.isneedinput = true;
              needinputlist.value.push(item);
            } else {
              noneedinputlist.value.push(item);
            }
            element.needinputlist = needinputlist.value;
            element.noneedinputlist = noneedinputlist.value;
            element.chooseindex = 1;
            if (noneedinputlist.value.length == 0) {
              element.chooseindex = 2;
            }
          });
        });
        productinfo2.value.normalPropertyList[0].showType = true;
        mainImage.value = productinfo2.value.erpProduct.mainPic;
      } catch (error) {
        message.error("Failed to load product data");
      } finally {
        isLoading.value = false;
        handleGetrelated();
      }
    };
    const onChange = (val, property, index) => {
      let selectvalue = property.detailList.find((item) => item.propertyDetailId === val);
      selectproperty(index, selectvalue);
    };
    const getcustomprice = async (inputvalue) => {
      const targetProperty = productinfo2.value.normalPropertyList.find((item) => item.propertyNameShop === "Shape");
      let detailName = "";
      if (targetProperty && targetProperty.selectedproperty) {
        detailName = targetProperty.selectedproperty.detailName;
      }
      let parmes = { spu: productinfo2.value.erpProduct.productStyle, shape: detailName };
      for (let i = 0; i < inputvalue.length; i++) {
        parmes[`side${i + 1}`] = inputvalue[i] || 0;
      }
      try {
        let res = await trialPriceCalculationBySpuV2(parmes);
        let customizedprice = res.result.sellingPrice;
        skuprice.value = customizedprice;
        errorsize.value = "";
      } catch (error) {
        let errormsg = JSON.parse(error.message);
        errorsize.value = errormsg.enDesc;
      }
    };
    const handleGetrelated = async () => {
      try {
        let parmes = {
          catalogId: productinfo2.value.erpProduct.catalogId,
          size: 5
        };
        let res = await randomRecommendationProductByCatalogId(parmes);
        products.value = res.result;
      } catch (error) {
        console.error(error);
      }
    };
    const customFilter = (input, option) => {
      var _a;
      return (_a = option.detailName) == null ? void 0 : _a.toLowerCase().includes(input.toLowerCase());
    };
    const isBottomBarHidden = ref(true);
    ref(null);
    ref(null);
    const isshow = ref(true);
    watch(() => route.query, () => {
      handleGetProudct();
    }, { deep: true });
    watch(mainImageIndex, (newVal) => {
      const list = productinfo2.value.erpProduct.photoList;
      if (list[newVal]) {
        mainImage.value = list[newVal].url;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBreadcrumb = __nuxt_component_0;
      const _component_UIcon = __nuxt_component_5;
      const _component_UBadge = __nuxt_component_2;
      const _component_UButton = __nuxt_component_7;
      const _component_Faq = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white w-full pt-10" }, _attrs))} data-v-95be508b>`);
      if (isLoading.value) {
        _push(`<div class="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center" data-v-95be508b><div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary" data-v-95be508b></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(`<div class="max-row" data-v-95be508b><div class="mb-6" data-v-95be508b><div class="flex gap-2 mb-6" data-v-95be508b><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-6 w-24 bg-gray-200 rounded animate-pulse" data-v-95be508b></div>`);
        });
        _push(`<!--]--></div><div class="grid grid-cols-1 md:grid-cols-12 gap-8" data-v-95be508b><div class="md:col-span-5" data-v-95be508b><div class="sticky top-[124px]" data-v-95be508b><div class="w-full aspect-square bg-gray-200 rounded-xl animate-pulse mb-4" data-v-95be508b></div><div class="flex gap-2" data-v-95be508b><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="w-20 h-20 bg-gray-200 rounded-xl animate-pulse" data-v-95be508b></div>`);
        });
        _push(`<!--]--></div></div></div><div class="md:col-span-7" data-v-95be508b><div class="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4" data-v-95be508b></div><div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse mb-4" data-v-95be508b></div><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="mb-6 border-b border-gray-200 pb-6" data-v-95be508b><div class="flex justify-between items-center" data-v-95be508b><div class="h-6 w-1/3 bg-gray-200 rounded animate-pulse" data-v-95be508b></div><div class="h-5 w-5 bg-gray-200 rounded-full animate-pulse" data-v-95be508b></div></div><div class="grid grid-cols-6 gap-4 mt-4" data-v-95be508b><!--[-->`);
          ssrRenderList(6, (j) => {
            _push(`<div class="h-24 w-full bg-gray-200 rounded-xl animate-pulse" data-v-95be508b></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--><div class="border-b border-gray-200 pb-6" data-v-95be508b><div class="flex flex-col gap-4" data-v-95be508b><div class="flex justify-between" data-v-95be508b><div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse" data-v-95be508b></div><div class="h-6 w-32 bg-gray-200 rounded animate-pulse" data-v-95be508b></div></div><div class="flex justify-between" data-v-95be508b><div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse" data-v-95be508b></div><div class="h-6 w-24 bg-gray-200 rounded animate-pulse" data-v-95be508b></div></div><div class="flex gap-4" data-v-95be508b><div class="h-12 w-full bg-gray-200 rounded-md animate-pulse" data-v-95be508b></div><div class="h-12 w-full bg-gray-200 rounded-md animate-pulse" data-v-95be508b></div></div></div></div></div></div></div></div>`);
      } else {
        _push(`<div class="max-row" data-v-95be508b>`);
        _push(ssrRenderComponent(_component_UBreadcrumb, {
          divider: ">",
          links: breadcrumbLinks.value,
          class: "mb-6 text-blackcolor custom-breadcrumb text-2xl",
          ui: {
            base: "hover:underline",
            li: "text-sm font-normal text-gray-400",
            active: "text-customblack dark:text-primary-400 no-underline hover:no-underline",
            divider: {
              base: "px-2 text-text-gray-400 no-underline"
            }
          }
        }, null, _parent));
        _push(`<div class="text-gray-800" data-v-95be508b><div class="grid grid-cols-1 md:grid-cols-12 gap-8" data-v-95be508b><div class="md:col-span-5" data-v-95be508b><div class="sticky top-[124px]" data-v-95be508b>`);
        if (mainImage.value) {
          _push(`<div class="w-full aspect-square overflow-hidden mb-4 relative" data-v-95be508b><img${ssrRenderAttr("src", mainImage.value)} alt="Shade sail" class="rounded-xl shadow-lg w-full transition-all duration-300 w-full h-full object-cover" data-v-95be508b><div class="${ssrRenderClass([{ "opacity-30 pointer-events-none": isSwiperAtStart.value }, "main-button-prev absolute left-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"])}" data-v-95be508b><div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary" data-v-95be508b>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-raphael:arrowleft2",
            class: "text-primary w-6 h-6"
          }, null, _parent));
          _push(`</div></div><div class="${ssrRenderClass([{ "opacity-30 pointer-events-none": isSwiperAtEnd.value }, "main-button-next absolute right-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"])}" data-v-95be508b><div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary" data-v-95be508b>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-raphael:arrowright2",
            class: "text-primary w-6 h-6"
          }, null, _parent));
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (productinfo2.value.erpProduct.photoList.length > 0) {
          _push(ssrRenderComponent(unref(Swiper), {
            modules: [unref(Navigation)],
            navigation: {
              nextEl: ".custom-button-next",
              prevEl: ".custom-button-prev"
            },
            "space-between": 10,
            class: "w-full",
            breakpoints: {
              640: { slidesPerView: 3, slidesPerGroup: 3 },
              768: { slidesPerView: 4, slidesPerGroup: 4 },
              1024: { slidesPerView: 5, slidesPerGroup: 5 }
            },
            onSwiper,
            onSlideChange,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(productinfo2.value.erpProduct.photoList, (item) => {
                  _push2(ssrRenderComponent(unref(SwiperSlide), {
                    key: item.url
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<img${ssrRenderAttr("src", item.url)} alt="thumbnail" class="w-full object-cover rounded-xl cursor-pointer hover:opacity-80" data-v-95be508b${_scopeId2}>`);
                      } else {
                        return [
                          createVNode("img", {
                            src: item.url,
                            alt: "thumbnail",
                            class: "w-full object-cover rounded-xl cursor-pointer hover:opacity-80",
                            onClick: ($event) => mainImage.value = item.url
                          }, null, 8, ["src", "onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
                _push2(ssrRenderComponent(unref(SwiperSlide), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center justify-center h-full w-full" data-v-95be508b${_scopeId2}><video class="max-h-full max-w-full" data-v-95be508b${_scopeId2}><source${ssrRenderAttr("src", productinfo2.value.erpProduct.productVideoUrl)} type="video/mp4" data-v-95be508b${_scopeId2}></video></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-center h-full w-full" }, [
                          createVNode("video", { class: "max-h-full max-w-full" }, [
                            createVNode("source", {
                              src: productinfo2.value.erpProduct.productVideoUrl,
                              type: "video/mp4"
                            }, null, 8, ["src"])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<div class="${ssrRenderClass([{ "opacity-30 pointer-events-none": isSwiperAtStart.value }, "custom-button-prev absolute left-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"])}" data-v-95be508b${_scopeId}><div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary" data-v-95be508b${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-raphael:arrowleft2",
                  class: "text-primary w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="${ssrRenderClass([{ "opacity-30 pointer-events-none": isSwiperAtEnd.value }, "custom-button-next absolute right-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"])}" data-v-95be508b${_scopeId}><div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary" data-v-95be508b${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-raphael:arrowright2",
                  class: "text-primary w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(productinfo2.value.erpProduct.photoList, (item) => {
                    return openBlock(), createBlock(unref(SwiperSlide), {
                      key: item.url
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: item.url,
                          alt: "thumbnail",
                          class: "w-full object-cover rounded-xl cursor-pointer hover:opacity-80",
                          onClick: ($event) => mainImage.value = item.url
                        }, null, 8, ["src", "onClick"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  createVNode(unref(SwiperSlide), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-center h-full w-full" }, [
                        createVNode("video", { class: "max-h-full max-w-full" }, [
                          createVNode("source", {
                            src: productinfo2.value.erpProduct.productVideoUrl,
                            type: "video/mp4"
                          }, null, 8, ["src"])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", {
                    class: ["custom-button-prev absolute left-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer", { "opacity-30 pointer-events-none": isSwiperAtStart.value }]
                  }, [
                    createVNode("div", { class: "w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary" }, [
                      createVNode(_component_UIcon, {
                        name: "i-raphael:arrowleft2",
                        class: "text-primary w-4 h-4"
                      })
                    ])
                  ], 2),
                  createVNode("div", {
                    class: ["custom-button-next absolute right-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer", { "opacity-30 pointer-events-none": isSwiperAtEnd.value }]
                  }, [
                    createVNode("div", { class: "w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary" }, [
                      createVNode(_component_UIcon, {
                        name: "i-raphael:arrowright2",
                        class: "text-primary w-4 h-4"
                      })
                    ])
                  ], 2)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="md:col-span-7" data-v-95be508b><div class="flex items-center justify-between" data-v-95be508b><h1 class="text-xl font-normal sm:text-lg md:text-lg lg:text-2xl mb-0" data-v-95be508b>${ssrInterpolate(productinfo2.value.erpProduct.productEnglishName)}</h1></div><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 mt-7" data-v-95be508b><div class="text-xl sm:text-xl font-medium text-primary" data-v-95be508b> $${ssrInterpolate(skuprice.value)}</div></div>`);
        if (productinfo2.value.normalPropertyList) {
          _push(`<div class="mt-12" data-v-95be508b><!--[-->`);
          ssrRenderList(productinfo2.value.normalPropertyList, (property, index) => {
            var _a;
            _push(`<div class="mb-4 border-b border-b-[#C8C8C8] pb-4" data-v-95be508b><div class="flex justify-between items-center cursor-pointer" data-v-95be508b><h2 class="font-bold text-lg flex items-center mb-0" data-v-95be508b>`);
            _push(ssrRenderComponent(_component_UBadge, {
              color: "black",
              variant: "solid",
              class: "mr-3 w-6 h-6"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(index + 1)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(index + 1), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<span class="truncate-1-lines" data-v-95be508b>${ssrInterpolate(property.propertyNameShop)}</span>`);
            if (property.desc) {
              _push(ssrRenderComponent(unref(Tooltip), {
                color: "white",
                overlayInnerStyle: { color: "#333" },
                placement: "topLeft",
                title: property.desc,
                overlayStyle: { maxWidth: "330px", whiteSpace: "pre-line", wordBreak: "break-word" }
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<img${ssrRenderAttr("src", _imports_0)} class="w-6 h-6 ml-2" data-v-95be508b${_scopeId}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: _imports_0,
                        class: "w-6 h-6 ml-2"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</h2><div class="flex items-center" data-v-95be508b>`);
            if (property.selectedproperty) {
              _push(`<span class="mr-4 truncate-1-lines" data-v-95be508b>${ssrInterpolate(property.isneedinput && property.chooseindex == 2 ? property.selectedproperty.inputvalue : property.selectedproperty.detailName)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(ssrRenderComponent(_component_UIcon, {
              name: property.showType ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
              class: "w-5 h-5 text-gray-500 font-medium transition-all duration-300"
            }, null, _parent));
            _push(`</div></div><div class="${ssrRenderClass([
              "transition-all duration-300 ease-in-out grid gap-4",
              property.showType ? "max-h-[500px] mt-4" : "overflow-hidden max-h-0",
              !property.isneedinput && property.productPropertyDetailType != "text" ? "grid-cols-6" : ""
            ])}" data-v-95be508b>`);
            if (!property.isneedinput && property.productPropertyDetailType != "text") {
              _push(`<!--[-->`);
              ssrRenderList(property.detailList, (type, propertyindex) => {
                _push(`<div class="${ssrRenderClass([
                  "p-1 rounded-xl flex flex-col items-center transition-all",
                  type.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                ])}" data-v-95be508b>`);
                if (type.imageLink) {
                  _push(`<div class="${ssrRenderClass([
                    "w-full aspect-square overflow-hidden",
                    property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? "border border-primary" : ""
                  ])}" data-v-95be508b><img${ssrRenderAttr("src", type.imageLink)} class="w-full h-full object-contain" data-v-95be508b></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<div class="${ssrRenderClass([[
                  "py-2 w-full",
                  !type.imageLink ? "border border-customblack w-full rounded-md" : "",
                  !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? "border border-primary w-full" : ""
                ], "py-2 w-full text-sm"])}" data-v-95be508b><div class="truncate-2-lines text-center" data-v-95be508b>${ssrInterpolate(type.detailName)}</div></div></div>`);
              });
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            if (!property.isneedinput && property.productPropertyDetailType == "text") {
              _push(`<div class="w-full flex flex-wrap max-h-[500px] overflow-y-auto" data-v-95be508b><!--[-->`);
              ssrRenderList(property.detailList, (type, propertyindex) => {
                _push(`<div class="${ssrRenderClass([
                  "p-2 rounded-xl flex flex-col items-center transition-all max-w-[33.3333%] min-w-[20%]",
                  type.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                ])}" data-v-95be508b>`);
                if (type.imageLink) {
                  _push(`<div class="${ssrRenderClass([
                    "w-full aspect-square overflow-hidden",
                    property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? "border border-primary" : ""
                  ])}" data-v-95be508b><img${ssrRenderAttr("src", type.imageLink)} class="w-full h-full object-cover" data-v-95be508b></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<div class="${ssrRenderClass([[
                  "py-2 w-full",
                  !type.imageLink ? "border border-customblack w-full rounded-md" : "",
                  !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? "border border-primary w-full" : ""
                ], "p-2 w-full text-sm"])}" data-v-95be508b><div class="truncate-1-lines text-center" data-v-95be508b>${ssrInterpolate(type.detailName)}</div></div></div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            if (property.isneedinput) {
              _push(`<div class="flex flex-col md:flex-row md:items-start gap-6 relative w-full" data-v-95be508b><div class="flex-1 space-y-4" data-v-95be508b><div class="text-base text-gray-800" data-v-95be508b><!--[-->`);
              ssrRenderList(property.needinputlist.filter((item) => !item.disabled), (needinput, needindex) => {
                _push(`<label class="cursor-pointer block" data-v-95be508b><div class="flex items-center" data-v-95be508b><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(property.chooseindex, needindex + 2)) ? " checked" : ""}${ssrRenderAttr("value", needindex + 2)} data-v-95be508b><span class="font-semibold text-sm" data-v-95be508b>${ssrInterpolate(needinput.detailName)}</span></div><!--[-->`);
                ssrRenderList(needinput.inputList, (inputitem, pindex) => {
                  _push(`<div class="mt-4" data-v-95be508b><div class="flex items-center space-x-4 mt-2" data-v-95be508b><label class="text-sm" data-v-95be508b>${ssrInterpolate(inputitem)}</label><input type="number"${ssrRenderAttr("value", needinput.inputvalue[pindex])} class="rounded p-1 text-sm w-28"${ssrRenderAttr("min", 0)}${ssrRenderAttr("max", 100)} step="1" data-v-95be508b></div></div>`);
                });
                _push(`<!--]--><div class="text-red-500 text-sm mt-2" data-v-95be508b>${ssrInterpolate(errorsize.value)}</div></label>`);
              });
              _push(`<!--]-->`);
              if (property.noneedinputlist.length > 0) {
                _push(`<div class="flex items-center space-x-2 cursor-pointer mt-4" data-v-95be508b><label class="flex items-center space-x-2 cursor-pointer" data-v-95be508b><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(property.chooseindex, "1")) ? " checked" : ""} value="1" data-v-95be508b><span class="font-bold text-sm" data-v-95be508b>Standard size:</span></label>`);
                _push(ssrRenderComponent(unref(Select), {
                  value: (_a = property.selectedproperty) == null ? void 0 : _a.propertyDetailId,
                  style: { "width": "200px" },
                  options: property.noneedinputlist,
                  "field-names": { label: "detailName", value: "propertyDetailId" },
                  placeholder: "Please select attributes",
                  "show-search": "",
                  "filter-option": customFilter,
                  onChange: (val) => onChange(val, property, index),
                  "option-label-prop": "label"
                }, {
                  option: withCtx(({ detailName, imageLink, disabled }, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<div class="${ssrRenderClass([{ "opacity-50": disabled }, "flex items-center gap-2"])}" data-v-95be508b${_scopeId}>`);
                      if (imageLink) {
                        _push2(`<img${ssrRenderAttr("src", imageLink)} class="w-6 h-6 mr-2" data-v-95be508b${_scopeId}>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span data-v-95be508b${_scopeId}>${ssrInterpolate(detailName)}</span></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: ["flex items-center gap-2", { "opacity-50": disabled }]
                        }, [
                          imageLink ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: imageLink,
                            class: "w-6 h-6 mr-2"
                          }, null, 8, ["src"])) : createCommentVNode("", true),
                          createVNode("span", null, toDisplayString(detailName), 1)
                        ], 2)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mb-4 border-b border-b-[#C8C8C8] pb-4" style="${ssrRenderStyle(productinfo2.value.printPropertyList && productinfo2.value.printPropertyList.length > 0 ? null : { display: "none" })}" data-v-95be508b><div class="flex justify-between items-center cursor-pointer" data-v-95be508b><h2 class="font-bold text-lg flex items-center mb-0" data-v-95be508b>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: "black",
          variant: "solid",
          class: "mr-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(productinfo2.value.normalPropertyList.length + 1)}`);
            } else {
              return [
                createTextVNode(toDisplayString(productinfo2.value.normalPropertyList.length + 1), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` PRINT ON DEMAND </h2>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: showDimensions.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
          class: "w-5 h-5 text-gray-500 transition-all duration-300"
        }, null, _parent));
        _push(`</div><div class="${ssrRenderClass([
          "overflow-hidden transition-all duration-300 ease-in-out grid gap-4",
          showDimensions.value ? "max-h-[500px] mt-4" : "max-h-0"
        ])}" data-v-95be508b><div class="flex flex-col md:flex-row md:items-start gap-12 relative justify-between" data-v-95be508b><div class="flex-1 space-y-4" data-v-95be508b><p class="font-semibold text-sm" data-v-95be508b><!--[-->`);
        ssrRenderList(productinfo2.value.printPropertyList, (item, index) => {
          _push(`<span data-v-95be508b>${ssrInterpolate(item.value)}${ssrInterpolate(index < productinfo2.value.printPropertyList.length ? "," : "")}</span>`);
        });
        _push(`<!--]--></p><div class="text-primary border-b-2 w-fit border-primary py-1 font-semibold cursor-pointer" data-v-95be508b> Design Now</div></div><div class="w-full md:w-40 shrink-0 self-center" data-v-95be508b><img style="${ssrRenderStyle(designimage.value ? null : { display: "none" })}"${ssrRenderAttr("src", designimage.value)} alt="Dimension guide" class="rounded-xl border" data-v-95be508b></div></div></div></div><div class="border-b border-b-[#C8C8C8]" data-v-95be508b><div class="w-full mx-auto bg-white py-6 sm:py-8 rounded-md" data-v-95be508b><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-v-95be508b><span class="font-semibold text-base sm:text-lg" data-v-95be508b>Quantity</span><div class="flex items-center rounded px-2" data-v-95be508b><div class="border flex items-center bg-[#F8F8F8] rounded" data-v-95be508b><button class="text-gray-500 px-2 hover:text-black" data-v-95be508b>−</button><input${ssrRenderAttr("value", quantity.value)} class="w-12 text-center outline-none border-0 py-1 bg-[#F8F8F8]" data-v-95be508b><button class="text-gray-500 px-2 hover:text-black" data-v-95be508b>+</button></div><span class="ml-2 text-base sm:text-lg" data-v-95be508b>Panels</span></div></div><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 sm:mt-8" data-v-95be508b><span class="font-semibold text-base sm:text-lg" data-v-95be508b>Total price</span><div class="flex items-center flex-wrap gap-2" data-v-95be508b><span class="text-base sm:text-lg font-bold text-primary" data-v-95be508b>$${ssrInterpolate(totalPrice.value.toFixed(2))}</span></div></div><div class="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8" data-v-95be508b>`);
        _push(ssrRenderComponent(_component_UButton, {
          class: "w-full sm:flex-1 flex items-center justify-center bg-primary-100 rounded-md text-primary font-normal hover:text-white",
          loading: cartloding.value,
          onClick: addtocart,
          color: "primary",
          variant: "solid",
          size: "xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Add to Cart `);
            } else {
              return [
                createTextVNode(" Add to Cart ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          class: "w-full sm:flex-1 flex items-center justify-center rounded-md text-white font-normal",
          color: "primary",
          variant: "solid",
          size: "xl",
          loading: orderloding.value,
          onClick: createorder
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Order Now `);
            } else {
              return [
                createTextVNode(" Order Now ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div></div></div><div class="bg-[#F8F8F8]" data-v-95be508b><div class="mx-auto mt-16" data-v-95be508b><div class="text-base font-normal bg-white" data-v-95be508b><div class="flex justify-start" data-v-95be508b>`);
        if (productinfo2.value.erpProduct.remarks) {
          _push(`<div class="w-auto" data-v-95be508b><div class="${ssrRenderClass([{ "border-b-2 border-black font-semibold": tabindex.value === 1 }, "inline-block p-4 rounded-xl rounded-b-none cursor-pointer text-center text-sm sm:text-base"])}" data-v-95be508b> Basic Information </div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (productinfo2.value.printPropertyList.length > 0) {
          _push(`<div class="w-auto" data-v-95be508b><div class="${ssrRenderClass([{ "border-b-2 border-black font-semibold": tabindex.value === 2 }, "inline-block p-4 rounded-xl rounded-b-none cursor-pointer text-center text-sm sm:text-base"])}" data-v-95be508b> Print Information </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div style="${ssrRenderStyle(tabindex.value == 1 && productinfo2.value.erpProduct.remarks ? null : { display: "none" })}" class="mx-auto max-row p-6 rounded p-2" data-v-95be508b><div class="overflow-hidden" data-v-95be508b>${productinfo2.value.erpProduct.remarks ?? ""}</div></div><div style="${ssrRenderStyle(tabindex.value == 2 && productinfo2.value.printPropertyList > 0 ? null : { display: "none" })}" class="mx-auto max-row p-6 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-y-6 gap-x-8 text-gray-800 bg-[#F8F8F8] py-16 rounded p-2" data-v-95be508b><!--[-->`);
        ssrRenderList(productinfo2.value.printPropertyList, (Propertyitem) => {
          _push(`<div class="flex justify-between" data-v-95be508b><span class="text-sm sm:text-base" data-v-95be508b>${ssrInterpolate(Propertyitem.value)}</span></div>`);
        });
        _push(`<!--]--></div></div></div>`);
        if (products.value.length > 0) {
          _push(`<div class="mt-12 pb-4" data-v-95be508b><h1 class="text-lg font-normal mb-8" data-v-95be508b>Recommended products</h1><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12" data-v-95be508b><!--[-->`);
          ssrRenderList(products.value, (product, index) => {
            _push(`<div class="product-card rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" data-v-95be508b><div class="relative overflow-hidden" data-v-95be508b><img${ssrRenderAttr("src", product.erpProduct.mainPic ?? "/images/empty.jpg")}${ssrRenderAttr("alt", product.erpProduct.productEnglishName)} class="w-full h-full object-cover object-top rounded-sm" data-v-95be508b></div><div class="mt-2" data-v-95be508b><h3 class="text-base font-normal mb-2 line-clamp-2" data-v-95be508b>${ssrInterpolate(product.erpProduct.productEnglishName)}</h3><p class="text-xl font-bold text-primary" data-v-95be508b>$${ssrInterpolate(product.erpProduct.customPrice.toFixed(2))}</p></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(ssrRenderComponent(_component_Faq, null, null, _parent));
      _push(`<div class="${ssrRenderClass([{
        "opacity-100 translate-y-0 pointer-events-auto": !isBottomBarHidden.value,
        "opacity-0 translate-y-8 pointer-events-none": isBottomBarHidden.value
      }, "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-8 bg-white rounded-md shadow-lg sticky bottom-0 transition-all duration-300 ease-in-out"])}" style="${ssrRenderStyle(isshow.value && !isLoading.value ? null : { display: "none" })}" data-v-95be508b><div data-v-95be508b><h2 class="font-semibold text-base sm:text-lg text-gray-900" data-v-95be508b>${ssrInterpolate(productinfo2.value.erpProduct.productEnglishName)}</h2><p class="text-sm text-gray-500" data-v-95be508b>Ordinary type sail / Rectangle</p></div><div class="flex flex-wrap items-center gap-3 sm:gap-4" data-v-95be508b><div class="flex items-center border border-gray-300 rounded px-2 py-1" data-v-95be508b><button class="text-gray-500 hover:text-gray-700" data-v-95be508b>-</button><span class="mx-2 w-12 text-center" data-v-95be508b>${ssrInterpolate(quantity.value)}</span><button class="text-gray-500 hover:text-gray-700" data-v-95be508b>+</button></div><span class="text-sm text-gray-600" data-v-95be508b>Panels</span><span class="text-base sm:text-lg font-medium text-gray-800" data-v-95be508b>$${ssrInterpolate(totalPrice.value.toFixed(2))}</span>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "md",
        onClick: addtocart,
        class: "rounded-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Add to Cart `);
          } else {
            return [
              createTextVNode(" Add to Cart ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/productinfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const productinfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-95be508b"]]);

export { productinfo as default };
