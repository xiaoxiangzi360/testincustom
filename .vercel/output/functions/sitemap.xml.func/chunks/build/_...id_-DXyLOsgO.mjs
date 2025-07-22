import { _ as __nuxt_component_0 } from './Breadcrumb-BOXN2oZJ.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-CB91evk_.mjs';
import { _ as _export_sfc, c as __nuxt_component_5, P as __nuxt_component_3$1, e as __nuxt_component_7 } from './server.mjs';
import { _ as __nuxt_component_2 } from './Badge-C4qFuzNw.mjs';
import { _ as __nuxt_component_6 } from './Faq-D6enPfK7.mjs';
import { ref, computed, withAsyncContext, watch, withCtx, createTextVNode, toDisplayString, unref, createVNode, createBlock, createCommentVNode, openBlock, nextTick, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-CXjc88Su.mjs';
import { Tooltip, Select, message } from 'ant-design-vue';
import { c as cartAuth, u as useCartStore } from './cart-DGSyKrC3.mjs';
import { useRoute, useRouter } from 'vue-router';
import { P as ProductAuth } from './product-9kYz4MaC.mjs';
import { u as useAsyncData } from './asyncData-BM85lZNa.mjs';
import 'tailwind-merge';
import './composables-CEJS1CB5.mjs';
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
  __name: "[...id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const { getProductById, randomRecommendationProductByCatalogId, trialPriceCalculationBySpuV2, erpTryToCreateSku, getmapProductByProductSkuList } = ProductAuth();
    const { createCart } = cartAuth();
    const route = useRoute();
    const router = useRouter();
    const lastpage = router.options.history.state.back;
    const cart = useCartStore();
    const swiperRefThumb = ref();
    const isLoading = computed(() => pending.value);
    const onMainImageLoaded = () => {
      nextTick(() => {
        var _a2, _b2;
        (_b2 = (_a2 = swiperRefThumb.value) == null ? void 0 : _a2.swiper) == null ? void 0 : _b2.update();
      });
    };
    ref(null);
    const cartloding = ref(false);
    const orderloding = ref(false);
    const orginproductinfo = ref({});
    const productid = computed(() => route.params.id[0] ?? "29201");
    const { data: serverProductData, pending, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("product-detail", () => {
      return getProductById({
        id: productid.value,
        needPropData: true,
        excludeUserCustomProp: true
      });
    })), __temp = await __temp, __restore(), __temp);
    const showDimensions = ref(true);
    const mainImageIndex = ref(0);
    const isSwiperAtStart = computed(() => mainImageIndex.value === 0);
    const isSwiperAtEnd = computed(() => mainImageIndex.value === productinfo.value.erpProduct.photoList.length - 1);
    let specList = [];
    let joinsku = [];
    const designimage = ref("");
    const mainImage = ref("");
    const productinfo = ref(((_a = serverProductData.value) == null ? void 0 : _a.result) ?? {});
    if ((_b = productinfo.value.erpProduct) == null ? void 0 : _b.mainPic) {
      mainImage.value = productinfo.value.erpProduct.mainPic;
    }
    const skuprice = ref(((_c = productinfo.value) == null ? void 0 : _c.erpProduct.customPrice) ?? {});
    const quantity = ref(1);
    const totalPrice = computed(() => quantity.value * skuprice.value);
    const tabindex = ref(1);
    const errorsize = ref("");
    const handleGetrelated = async () => {
      try {
        let parmes = {
          catalogId: productinfo.value.erpProduct.catalogId,
          size: 5
        };
        let res = await randomRecommendationProductByCatalogId(parmes);
        products.value = res.result;
      } catch (error2) {
        console.error(error2);
      }
    };
    const selectproperty = (index, type) => {
      if (type.disabled) {
        return;
      }
      productinfo.value.normalPropertyList.forEach((element, index1) => {
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
      if (productinfo.value.normalPropertyList[index + 1] && type.skuList) {
        let curskulist = joinsku.length > 0 ? joinsku.filter((item) => type.skuList.includes(item)) : type.skuList || [];
        let nextProperty = productinfo.value.normalPropertyList[index + 1];
        let nextselectedproperty = nextProperty["selectedproperty"];
        let nextselectedid = "-1";
        if (nextselectedproperty) {
          nextselectedid = nextselectedproperty.propertyDetailId;
        }
        if (nextProperty.isneedinput) {
          let nextdetailList = productinfo.value.normalPropertyList[index + 1].noneedinputlist;
          nextdetailList.forEach((element) => {
            let skulist = element.skuList;
            let hasIntersection = skulist && skulist.some((item) => curskulist.includes(item));
            element.isactive = hasIntersection;
            element.disabled = !hasIntersection;
            if (nextselectedid == element.propertyDetailId && element.disabled) {
              productinfo.value.normalPropertyList[index + 1]["selectedproperty"] = {};
            }
          });
          let nextdetailList1 = productinfo.value.normalPropertyList[index + 1].needinputlist;
          nextdetailList1.forEach((element1) => {
            let skulist = element1.skuList;
            let hasIntersection = skulist && skulist.some((item) => curskulist.includes(item));
            element1.isactive = hasIntersection;
            element1.disabled = !hasIntersection;
            if (nextselectedid == element1.propertyDetailId && element1.disabled) {
              productinfo.value.normalPropertyList[index + 1]["selectedproperty"] = {};
            }
          });
        } else {
          let nextdetailList = productinfo.value.normalPropertyList[index + 1].detailList;
          let nextselectedproperty2 = productinfo.value.normalPropertyList[index + 1]["selectedproperty"];
          let nextselectedid2 = "-1";
          if (nextselectedproperty2) {
            nextselectedid2 = nextselectedproperty2.propertyDetailId;
          }
          nextdetailList.forEach((element) => {
            let skulist = element.skuList;
            let hasIntersection = skulist && skulist.some((item) => curskulist.includes(item));
            element.isactive = hasIntersection;
            element.disabled = !hasIntersection;
            if (nextselectedid2 == element.propertyDetailId && element.disabled) {
              productinfo.value.normalPropertyList[index + 1]["selectedproperty"] = {};
            }
          });
        }
      }
      productinfo.value.normalPropertyList[index]["selectedproperty"] = type;
      let inputvalue = [];
      let hasEmpty = false;
      let needinputproperty;
      let ischoose = true;
      productinfo.value.normalPropertyList.forEach((element) => {
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
        if (ischoose) {
          const skuLists = productinfo.value.normalPropertyList.map((property) => {
            var _a2;
            return (_a2 = property.selectedproperty) == null ? void 0 : _a2.skuList;
          }).filter((list) => Array.isArray(list) && list.length > 0);
          if (skuLists.length === 0) return;
          let innersku = skuLists.reduce((acc, list) => acc.filter((sku) => list.includes(sku)));
          let firstsku = innersku[0];
          if (firstsku) {
            console.log("getskuprice");
            getskuprice(firstsku);
          }
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
      } catch (error2) {
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
        productinfo.value.normalPropertyList.forEach((element) => {
          var _a2, _b2;
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
            detailName: (_a2 = element.selectedproperty) == null ? void 0 : _a2.detailName,
            propertyId: (_b2 = element.selectedproperty) == null ? void 0 : _b2.propertyId
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
          let variationList = productinfo.value.erpProduct.variationList;
          const targetProperty = productinfo.value.normalPropertyList.find((item) => item.propertyNameShop === "Shape");
          let detailName = "";
          if (targetProperty && targetProperty.selectedproperty) {
            detailName = targetProperty.selectedproperty.detailName;
          }
          let createData = {
            productId: productid.value,
            productStyle: productinfo.value.erpProduct.productStyle,
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
          const skuLists = productinfo.value.normalPropertyList.map((property) => {
            var _a2;
            return (_a2 = property.selectedproperty) == null ? void 0 : _a2.skuList;
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
      } catch (error2) {
        let errormsg = JSON.parse(error2.message);
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
        productinfo.value.normalPropertyList.forEach((element) => {
          var _a2, _b2;
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
            detailName: (_a2 = element.selectedproperty) == null ? void 0 : _a2.detailName,
            propertyId: (_b2 = element.selectedproperty) == null ? void 0 : _b2.propertyId
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
          let variationList = productinfo.value.erpProduct.variationList;
          const targetProperty = productinfo.value.normalPropertyList.find((item) => item.propertyNameShop === "Shape");
          let detailName = "";
          if (targetProperty && targetProperty.selectedproperty) {
            detailName = targetProperty.selectedproperty.detailName;
          }
          let createData = {
            productId: productid.value,
            productStyle: productinfo.value.erpProduct.productStyle,
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
          const skuLists = productinfo.value.normalPropertyList.map((property) => {
            var _a2;
            return (_a2 = property.selectedproperty) == null ? void 0 : _a2.skuList;
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
      } catch (error2) {
        console.log(error2);
        let errormsg = JSON.parse(error2.message);
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
      var _a2;
      const productPath = `/product/${productid.value}/${productName}`;
      const lastIndex = breadcrumbLinks.value.length - 1;
      const lastItem = breadcrumbLinks.value[lastIndex];
      if (lastItem && ((_a2 = lastItem.to) == null ? void 0 : _a2.startsWith("/product"))) {
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
        let parmes = {
          id: productid.value,
          needPropData: true,
          excludeUserCustomProp: true
        };
        let res = await getProductById(parmes);
        updateBreadcrumbProduct(res.result.erpProduct.productEnglishName);
        orginproductinfo.value = res.result;
        productinfo.value = res.result;
        skuprice.value = res.result.erpProduct.customPrice;
        specList = res.result.erpProduct.specList;
        productinfo.value.normalPropertyList.forEach((element) => {
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
        productinfo.value.normalPropertyList[0].showType = true;
        mainImage.value = productinfo.value.erpProduct.mainPic;
      } catch (error2) {
        message.error("Failed to load product data");
      } finally {
        isLoading.value = false;
        handleGetrelated();
      }
    };
    const organizeproduct = () => {
      try {
        updateBreadcrumbProduct(productinfo.value.erpProduct.productEnglishName);
        specList = productinfo.value.erpProduct.specList;
        productinfo.value.normalPropertyList.forEach((element) => {
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
        productinfo.value.normalPropertyList[0].showType = true;
      } catch (error2) {
        console.log(error2);
        message.error("Failed to load product data");
      } finally {
        isLoading.value = false;
      }
    };
    organizeproduct();
    const onChange = (val, property, index) => {
      property.chooseindex = "1";
      let selectvalue = property.detailList.find((item) => item.propertyDetailId === val);
      selectproperty(index, selectvalue);
    };
    const getcustomprice = async (inputvalue) => {
      const targetProperty = productinfo.value.normalPropertyList.find((item) => item.propertyNameShop === "Shape");
      let detailName = "";
      if (targetProperty && targetProperty.selectedproperty) {
        detailName = targetProperty.selectedproperty.detailName;
      }
      let parmes = { spu: productinfo.value.erpProduct.productStyle, shape: detailName };
      for (let i = 0; i < inputvalue.length; i++) {
        parmes[`side${i + 1}`] = inputvalue[i] || 0;
      }
      try {
        let res = await trialPriceCalculationBySpuV2(parmes);
        let customizedprice = res.result.sellingPrice;
        skuprice.value = customizedprice;
        errorsize.value = "";
      } catch (error2) {
        let errormsg = JSON.parse(error2.message);
        errorsize.value = errormsg.enDesc;
      }
    };
    const customFilter = (input, option) => {
      var _a2;
      return (_a2 = option.detailName) == null ? void 0 : _a2.toLowerCase().includes(input.toLowerCase());
    };
    const isBottomBarHidden = ref(true);
    ref(null);
    ref(null);
    const isshow = ref(true);
    watch(() => route.query, () => {
      handleGetProudct();
    }, { deep: true });
    watch(mainImageIndex, (newVal) => {
      const list = productinfo.value.erpProduct.photoList;
      if (list[newVal]) {
        mainImage.value = list[newVal].url;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBreadcrumb = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_UIcon = __nuxt_component_5;
      const _component_ClientOnly = __nuxt_component_3$1;
      const _component_UBadge = __nuxt_component_2;
      const _component_UButton = __nuxt_component_7;
      const _component_Faq = __nuxt_component_6;
      _push(`<!--[--><div class="bg-white w-full pt-10" data-v-8020ef23>`);
      if (isLoading.value) {
        _push(`<div class="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center" data-v-8020ef23><div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary" data-v-8020ef23></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(`<div class="max-row" data-v-8020ef23><div class="mb-6" data-v-8020ef23><div class="flex gap-2 mb-6" data-v-8020ef23><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-6 w-24 bg-gray-200 rounded animate-pulse" data-v-8020ef23></div>`);
        });
        _push(`<!--]--></div><div class="grid grid-cols-1 md:grid-cols-12 gap-8" data-v-8020ef23><div class="md:col-span-5" data-v-8020ef23><div class="sticky top-[124px]" data-v-8020ef23><div class="w-full aspect-square bg-gray-200 rounded-xl animate-pulse mb-4" data-v-8020ef23></div><div class="flex gap-2" data-v-8020ef23><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="w-20 h-20 bg-gray-200 rounded-xl animate-pulse" data-v-8020ef23></div>`);
        });
        _push(`<!--]--></div></div></div><div class="md:col-span-7" data-v-8020ef23><div class="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4" data-v-8020ef23></div><div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse mb-4" data-v-8020ef23></div><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="mb-6 border-b border-gray-200 pb-6" data-v-8020ef23><div class="flex justify-between items-center" data-v-8020ef23><div class="h-6 w-1/3 bg-gray-200 rounded animate-pulse" data-v-8020ef23></div><div class="h-5 w-5 bg-gray-200 rounded-full animate-pulse" data-v-8020ef23></div></div><div class="grid grid-cols-6 gap-4 mt-4" data-v-8020ef23><!--[-->`);
          ssrRenderList(6, (j) => {
            _push(`<div class="h-24 w-full bg-gray-200 rounded-xl animate-pulse" data-v-8020ef23></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--><div class="border-b border-gray-200 pb-6" data-v-8020ef23><div class="flex flex-col gap-4" data-v-8020ef23><div class="flex justify-between" data-v-8020ef23><div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse" data-v-8020ef23></div><div class="h-6 w-32 bg-gray-200 rounded animate-pulse" data-v-8020ef23></div></div><div class="flex justify-between" data-v-8020ef23><div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse" data-v-8020ef23></div><div class="h-6 w-24 bg-gray-200 rounded animate-pulse" data-v-8020ef23></div></div><div class="flex gap-4" data-v-8020ef23><div class="h-12 w-full bg-gray-200 rounded-md animate-pulse" data-v-8020ef23></div><div class="h-12 w-full bg-gray-200 rounded-md animate-pulse" data-v-8020ef23></div></div></div></div></div></div></div></div>`);
      } else {
        _push(`<div class="max-row" data-v-8020ef23>`);
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
        _push(`<div class="text-gray-800" data-v-8020ef23><div class="grid grid-cols-1 md:grid-cols-12 gap-8" data-v-8020ef23><div class="md:col-span-5" data-v-8020ef23><div class="sticky top-[124px] overflow-hidden" data-v-8020ef23>`);
        if (mainImage.value) {
          _push(`<div class="w-full aspect-square overflow-hidden mb-4 relative" data-v-8020ef23>`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            format: "webp",
            src: mainImage.value,
            onLoad: onMainImageLoaded,
            alt: "Shade sail",
            class: "rounded-xl shadow-lg w-full transition-all duration-300 w-full h-full object-cover"
          }, null, _parent));
          _push(`<div class="${ssrRenderClass([{ "opacity-30 pointer-events-none": isSwiperAtStart.value }, "main-button-prev absolute left-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"])}" data-v-8020ef23><div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary" data-v-8020ef23>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-raphael:arrowleft2",
            class: "text-primary w-6 h-6"
          }, null, _parent));
          _push(`</div></div><div class="${ssrRenderClass([{ "opacity-30 pointer-events-none": isSwiperAtEnd.value }, "main-button-next absolute right-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"])}" data-v-8020ef23><div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary" data-v-8020ef23>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-raphael:arrowright2",
            class: "text-primary w-6 h-6"
          }, null, _parent));
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></div><div class="md:col-span-7" data-v-8020ef23><div class="flex items-center justify-between" data-v-8020ef23><h1 class="text-xl font-normal sm:text-lg md:text-lg lg:text-2xl mb-0" data-v-8020ef23>${ssrInterpolate(productinfo.value.erpProduct.productEnglishName)}</h1></div><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 mt-7" data-v-8020ef23><div class="text-xl sm:text-xl font-medium text-primary" data-v-8020ef23> $${ssrInterpolate(skuprice.value)}</div></div>`);
        if (productinfo.value.normalPropertyList) {
          _push(`<div class="mt-12" data-v-8020ef23><!--[-->`);
          ssrRenderList(productinfo.value.normalPropertyList, (property, index) => {
            var _a2;
            _push(`<div class="mb-4 border-b border-b-[#C8C8C8] pb-4" data-v-8020ef23><div class="flex justify-between items-center cursor-pointer" data-v-8020ef23><h2 class="font-bold text-lg flex items-center mb-0" data-v-8020ef23>`);
            _push(ssrRenderComponent(_component_UBadge, {
              color: "black",
              variant: "solid",
              class: "mr-3 w-6 h-6",
              ui: { color: { black: { solid: "dark:bg-gray-900 dark:text-white" } } }
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
            _push(`<span class="truncate-1-lines" data-v-8020ef23>${ssrInterpolate(property.propertyNameShop)}</span>`);
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
                    _push2(`<img${ssrRenderAttr("src", _imports_0)} class="w-6 h-6 ml-2" data-v-8020ef23${_scopeId}>`);
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
            _push(`</h2><div class="flex items-center" data-v-8020ef23>`);
            if (property.selectedproperty) {
              _push(`<span class="mr-4 truncate-1-lines" data-v-8020ef23>${ssrInterpolate(property.isneedinput && property.chooseindex == 2 ? property.selectedproperty.inputvalue : property.selectedproperty.detailName)}</span>`);
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
              !property.isneedinput && property.productPropertyDetailType != "text" ? "grid-cols-5 sm:grid-cols-6" : ""
            ])}" data-v-8020ef23>`);
            if (!property.isneedinput && property.productPropertyDetailType != "text") {
              _push(`<!--[-->`);
              ssrRenderList(property.detailList, (type, propertyindex) => {
                _push(`<div class="${ssrRenderClass([
                  "p-1 rounded-xl flex flex-col items-center transition-all",
                  type.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                ])}" data-v-8020ef23>`);
                if (type.imageLink) {
                  _push(`<div class="${ssrRenderClass([
                    "w-full aspect-square overflow-hidden",
                    property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? "border border-primary" : ""
                  ])}" data-v-8020ef23><img${ssrRenderAttr("src", type.imageLink)} class="w-full h-full object-contain" data-v-8020ef23></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<div class="${ssrRenderClass([[
                  "py-2 w-full",
                  !type.imageLink ? "border border-customblack w-full rounded-md" : "",
                  !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? "border border-primary w-full" : ""
                ], "py-2 w-full text-sm"])}" data-v-8020ef23><div class="truncate-2-lines text-center" data-v-8020ef23>${ssrInterpolate(type.detailName)}</div></div></div>`);
              });
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            if (!property.isneedinput && property.productPropertyDetailType == "text") {
              _push(`<div class="w-full flex flex-wrap max-h-[160px] overflow-y-auto" data-v-8020ef23><!--[-->`);
              ssrRenderList(property.detailList, (type, propertyindex) => {
                _push(`<div class="${ssrRenderClass([
                  "p-2 rounded-xl flex flex-col items-center transition-all max-w-[33.3333%] min-w-[20%]",
                  type.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                ])}" data-v-8020ef23>`);
                if (type.imageLink) {
                  _push(`<div class="${ssrRenderClass([
                    "w-full aspect-square overflow-hidden",
                    property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? "border border-primary" : ""
                  ])}" data-v-8020ef23><img${ssrRenderAttr("src", type.imageLink)} class="w-full h-full object-cover" data-v-8020ef23></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<div class="${ssrRenderClass([[
                  "py-2 w-full",
                  !type.imageLink ? "border border-customblack w-full rounded-md" : "",
                  !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? "border border-primary w-full" : ""
                ], "p-2 w-full text-sm"])}" data-v-8020ef23><div class="truncate-1-lines text-center" data-v-8020ef23>${ssrInterpolate(type.detailName)}</div></div></div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            if (property.isneedinput) {
              _push(`<div class="flex flex-col md:flex-row md:items-start gap-6 relative w-full" data-v-8020ef23><div class="flex-1 space-y-4" data-v-8020ef23><div class="text-base text-gray-800" data-v-8020ef23><!--[-->`);
              ssrRenderList(property.needinputlist.filter((item) => !item.disabled), (needinput, needindex) => {
                _push(`<div class="cursor-pointer block" data-v-8020ef23><div class="flex items-center" data-v-8020ef23><label class="flex items-center space-x-2 cursor-pointer" data-v-8020ef23><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(property.chooseindex, needindex + 2)) ? " checked" : ""}${ssrRenderAttr("value", needindex + 2)} data-v-8020ef23><span class="font-semibold text-sm" data-v-8020ef23>${ssrInterpolate(needinput.detailName)}</span></label></div><!--[-->`);
                ssrRenderList(needinput.inputList, (inputitem, pindex) => {
                  _push(`<div class="mt-4" data-v-8020ef23><div class="flex items-center space-x-4 mt-2" data-v-8020ef23><label class="text-sm" data-v-8020ef23>${ssrInterpolate(inputitem)}</label><input type="number"${ssrRenderAttr("value", needinput.inputvalue[pindex])} class="rounded p-1 text-sm w-28"${ssrRenderAttr("min", 0)}${ssrRenderAttr("max", 100)} step="1" data-v-8020ef23></div></div>`);
                });
                _push(`<!--]--><div class="text-red-500 text-sm mt-2" data-v-8020ef23>${ssrInterpolate(errorsize.value)}</div></div>`);
              });
              _push(`<!--]-->`);
              if (property.noneedinputlist.length > 0) {
                _push(`<div class="flex items-center space-x-2 cursor-pointer mt-4" data-v-8020ef23><label class="flex items-center space-x-2 cursor-pointer" data-v-8020ef23><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(property.chooseindex, "1")) ? " checked" : ""} value="1" data-v-8020ef23><span class="font-bold text-sm" data-v-8020ef23>Standard size:</span></label>`);
                _push(ssrRenderComponent(unref(Select), {
                  value: (_a2 = property.selectedproperty) == null ? void 0 : _a2.propertyDetailId,
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
                      _push2(`<div class="${ssrRenderClass([{ "opacity-50": disabled }, "flex items-center gap-2"])}" data-v-8020ef23${_scopeId}>`);
                      if (imageLink) {
                        _push2(`<img${ssrRenderAttr("src", imageLink)} class="w-6 h-6 mr-2" data-v-8020ef23${_scopeId}>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span data-v-8020ef23${_scopeId}>${ssrInterpolate(detailName)}</span></div>`);
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
        _push(`<div class="mb-4 border-b border-b-[#C8C8C8] pb-4" style="${ssrRenderStyle(productinfo.value.printPropertyList && productinfo.value.printPropertyList.length > 0 ? null : { display: "none" })}" data-v-8020ef23><div class="flex justify-between items-center cursor-pointer" data-v-8020ef23><h2 class="font-bold text-lg flex items-center mb-0" data-v-8020ef23>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: "black",
          variant: "solid",
          class: "mr-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(productinfo.value.normalPropertyList.length + 1)}`);
            } else {
              return [
                createTextVNode(toDisplayString(productinfo.value.normalPropertyList.length + 1), 1)
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
        ])}" data-v-8020ef23><div class="flex flex-col md:flex-row md:items-start gap-12 relative justify-between" data-v-8020ef23><div class="flex-1 space-y-4" data-v-8020ef23><p class="font-semibold text-sm" data-v-8020ef23><!--[-->`);
        ssrRenderList(productinfo.value.printPropertyList, (item, index) => {
          _push(`<span data-v-8020ef23>${ssrInterpolate(item.value)}${ssrInterpolate(index < productinfo.value.printPropertyList.length ? "," : "")}</span>`);
        });
        _push(`<!--]--></p><div class="text-primary border-b-2 w-fit border-primary py-1 font-semibold cursor-pointer" data-v-8020ef23> Design Now</div></div><div class="w-full md:w-40 shrink-0 self-center" data-v-8020ef23><img style="${ssrRenderStyle(designimage.value ? null : { display: "none" })}"${ssrRenderAttr("src", designimage.value)} alt="Dimension guide" class="rounded-xl border" data-v-8020ef23></div></div></div></div><div class="border-b border-b-[#C8C8C8]" data-v-8020ef23><div class="w-full mx-auto bg-white py-6 sm:py-8 rounded-md" data-v-8020ef23><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-v-8020ef23><span class="font-semibold text-base sm:text-lg" data-v-8020ef23>Quantity</span><div class="flex items-center rounded px-2" data-v-8020ef23><div class="border flex items-center bg-[#F8F8F8] rounded" data-v-8020ef23><button class="text-gray-500 px-2 hover:text-black" data-v-8020ef23>−</button><input${ssrRenderAttr("value", quantity.value)} class="w-12 text-center outline-none border-0 py-1 bg-[#F8F8F8]" data-v-8020ef23><button class="text-gray-500 px-2 hover:text-black" data-v-8020ef23>+</button></div><span class="ml-2 text-base sm:text-lg" data-v-8020ef23>Panels</span></div></div><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 sm:mt-8" data-v-8020ef23><span class="font-semibold text-base sm:text-lg" data-v-8020ef23>Total price</span><div class="flex items-center flex-wrap gap-2" data-v-8020ef23><span class="text-base sm:text-lg font-bold text-primary" data-v-8020ef23>$${ssrInterpolate(totalPrice.value.toFixed(2))}</span></div></div><div class="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8" data-v-8020ef23>`);
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
        _push(`</div></div></div></div></div></div><div class="bg-[#F8F8F8]" data-v-8020ef23><div class="mx-auto mt-16" data-v-8020ef23><div class="text-base font-normal bg-white" data-v-8020ef23><div class="flex justify-start" data-v-8020ef23>`);
        if (productinfo.value.erpProduct.remarks) {
          _push(`<div class="w-auto" data-v-8020ef23><div class="${ssrRenderClass([{ "border-b-2 border-black font-semibold": tabindex.value === 1 }, "inline-block p-4 rounded-xl rounded-b-none cursor-pointer text-center text-sm sm:text-base"])}" data-v-8020ef23> Basic Information </div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (productinfo.value.printPropertyList.length > 0) {
          _push(`<div class="w-auto" data-v-8020ef23><div class="${ssrRenderClass([{ "border-b-2 border-black font-semibold": tabindex.value === 2 }, "inline-block p-4 rounded-xl rounded-b-none cursor-pointer text-center text-sm sm:text-base"])}" data-v-8020ef23> Print Information </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div style="${ssrRenderStyle(tabindex.value == 1 && productinfo.value.erpProduct.remarks ? null : { display: "none" })}" class="mx-auto max-row p-6 rounded p-2" data-v-8020ef23><div class="overflow-hidden" data-v-8020ef23>${productinfo.value.erpProduct.remarks ?? ""}</div></div><div style="${ssrRenderStyle(tabindex.value == 2 && productinfo.value.printPropertyList > 0 ? null : { display: "none" })}" class="mx-auto max-row p-6 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-y-6 gap-x-8 text-gray-800 bg-[#F8F8F8] py-16 rounded p-2" data-v-8020ef23><!--[-->`);
        ssrRenderList(productinfo.value.printPropertyList, (Propertyitem) => {
          _push(`<div class="flex justify-between" data-v-8020ef23><span class="text-sm sm:text-base" data-v-8020ef23>${ssrInterpolate(Propertyitem.value)}</span></div>`);
        });
        _push(`<!--]--></div></div></div>`);
        if (products.value.length > 0) {
          _push(`<div class="mt-12 pb-4" data-v-8020ef23><h1 class="text-lg font-normal mb-8" data-v-8020ef23>Recommended products</h1><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12" data-v-8020ef23><!--[-->`);
          ssrRenderList(products.value, (product, index) => {
            _push(`<div class="product-card rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" data-v-8020ef23><div class="relative overflow-hidden" data-v-8020ef23><img${ssrRenderAttr("src", product.erpProduct.mainPic ?? "/images/empty.jpg")}${ssrRenderAttr("alt", product.erpProduct.productEnglishName)} class="w-full h-full object-cover object-top rounded-sm" data-v-8020ef23></div><div class="mt-2" data-v-8020ef23><h3 class="text-base font-normal mb-2 line-clamp-2" data-v-8020ef23>${ssrInterpolate(product.erpProduct.productEnglishName)}</h3><p class="text-xl font-bold text-primary" data-v-8020ef23>$${ssrInterpolate(product.erpProduct.customPrice.toFixed(2))}</p></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`<div class="${ssrRenderClass([{
        "opacity-100 translate-y-0 pointer-events-auto": !isBottomBarHidden.value,
        "opacity-0 translate-y-8 pointer-events-none": isBottomBarHidden.value
      }, "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-8 bg-white rounded-md shadow-lg sticky bottom-0 transition-all duration-300 ease-in-out"])}" style="${ssrRenderStyle(isshow.value && !isLoading.value ? null : { display: "none" })}" data-v-8020ef23><div data-v-8020ef23><h2 class="font-semibold text-base sm:text-lg text-gray-900" data-v-8020ef23>${ssrInterpolate(productinfo.value.erpProduct.productEnglishName)}</h2><p class="text-sm text-gray-500" data-v-8020ef23>Ordinary type sail / Rectangle</p></div><div class="flex flex-wrap items-center gap-3 sm:gap-4" data-v-8020ef23><div class="flex items-center border border-gray-300 rounded px-2 py-1" data-v-8020ef23><button class="text-gray-500 hover:text-gray-700" data-v-8020ef23>-</button><span class="mx-2 w-12 text-center" data-v-8020ef23>${ssrInterpolate(quantity.value)}</span><button class="text-gray-500 hover:text-gray-700" data-v-8020ef23>+</button></div><span class="text-sm text-gray-600" data-v-8020ef23>Panels</span><span class="text-base sm:text-lg font-medium text-gray-800" data-v-8020ef23>$${ssrInterpolate(totalPrice.value.toFixed(2))}</span>`);
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
      _push(ssrRenderComponent(_component_Faq, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[...id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8020ef23"]]);

export { ____id_ as default };
