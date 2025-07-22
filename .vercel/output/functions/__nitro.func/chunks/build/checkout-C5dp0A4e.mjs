import { _ as __nuxt_component_6 } from './SelectMenu-CA8fbto0.mjs';
import { _ as _export_sfc, u as useCookie, b as useNuxtApp, e as __nuxt_component_7, c as __nuxt_component_5, m as mergeConfig, i as useUI, t as twMerge, j as appConfig, k as textarea, l as looseToNumber } from './server.mjs';
import { defineComponent, ref, computed, watch, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, mergeProps, toRef, nextTick, useSSRContext } from 'vue';
import { twJoin } from 'tailwind-merge';
import { h as publicAssetsURL, A as defu } from '../_/nitro.mjs';
import { u as useFormGroup } from './useFormGroup-XFEs-B9Y.mjs';
import { ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as __nuxt_component_4 } from './Modal-DW14wYHj.mjs';
import { A as AddressAuth, _ as __nuxt_component_3$1 } from './AddressModal-BOL0YON7.mjs';
import { Form, FormItem, Select, Input, AutoComplete, Checkbox, Tooltip } from 'ant-design-vue';
import { u as useCartStore, c as cartAuth } from './cart-DGSyKrC3.mjs';
import { useRouter, useRoute } from 'vue-router';
import { P as ProductAuth } from './product-9kYz4MaC.mjs';
import { O as OrderAuth, P as PayAuth } from './pay-B0nCCLYu.mjs';
import { L as LocationAuth } from './location-BxTFTaaq.mjs';
import '@tanstack/vue-virtual';
import './active-element-history-BbzAu_2T.mjs';
import './hidden-BKyvU3BW.mjs';
import './keyboard-Duq8EHr3.mjs';
import './use-resolve-button-type-DOOP2SMg.mjs';
import './open-closed-BDzQJ33n.mjs';
import './usePopper-BrvKSG9Z.mjs';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org';
import '@unhead/schema-org/vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import 'unist-util-visit';
import 'hast-util-to-string';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'path';
import 'fs';
import 'consola';
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
import './transition-DT3phGok.mjs';
import './Card-BmnXDPH2.mjs';

const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.textarea, textarea);
const _sfc_main$1 = defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    },
    maxrows: {
      type: Number,
      default: 0
    },
    autoresize: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autofocusDelay: {
      type: Number,
      default: 100
    },
    resize: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config.default.variant,
      validator(value) {
        return [
          ...Object.keys(config.variant),
          ...Object.values(config.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    textareaClass: {
      type: String,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    },
    modelModifiers: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("textarea", toRef(props, "ui"), config, toRef(props, "class"));
    const { emitFormBlur, emitFormInput, inputId, color, size, name } = useFormGroup(props, config);
    const modelModifiers = ref(defu({}, props.modelModifiers, { trim: false, lazy: false, number: false, nullify: false }));
    const textarea2 = ref(null);
    const autoResize = () => {
      if (props.autoresize) {
        if (!textarea2.value) {
          return;
        }
        textarea2.value.rows = props.rows;
        const overflow = textarea2.value.style.overflow;
        textarea2.value.style.overflow = "hidden";
        const styles = (void 0).getComputedStyle(textarea2.value);
        const paddingTop = Number.parseInt(styles.paddingTop);
        const paddingBottom = Number.parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        const lineHeight = Number.parseInt(styles.lineHeight);
        const { scrollHeight } = textarea2.value;
        const newRows = (scrollHeight - padding) / lineHeight;
        if (newRows > props.rows) {
          textarea2.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
        }
        textarea2.value.style.overflow = overflow;
      }
    };
    const updateInput = (value) => {
      if (modelModifiers.value.trim) {
        value = value.trim();
      }
      if (modelModifiers.value.number) {
        value = looseToNumber(value);
      }
      if (modelModifiers.value.nullify) {
        value || (value = null);
      }
      emit("update:modelValue", value);
      emitFormInput();
    };
    const onInput = (event) => {
      autoResize();
      if (!modelModifiers.value.lazy) {
        updateInput(event.target.value);
      }
    };
    const onChange = (event) => {
      const value = event.target.value;
      emit("change", value);
      if (modelModifiers.value.lazy) {
        updateInput(value);
      }
      if (modelModifiers.value.trim) {
        event.target.value = value.trim();
      }
    };
    const onBlur = (event) => {
      emit("blur", event);
      emitFormBlur();
    };
    watch(() => props.modelValue, () => {
      nextTick(autoResize);
    });
    const textareaClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        ui.value.rounded,
        ui.value.placeholder,
        ui.value.size[size.value],
        props.padded ? ui.value.padding[size.value] : "p-0",
        variant == null ? void 0 : variant.replaceAll("{color}", color.value),
        !props.resize && "resize-none"
      ), props.textareaClass);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      textarea: textarea2,
      // eslint-disable-next-line vue/no-dupe-keys
      textareaClass,
      onInput,
      onChange,
      onBlur
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><textarea${ssrRenderAttrs(_temp0 = mergeProps({
    id: _ctx.inputId,
    ref: "textarea",
    value: _ctx.modelValue,
    name: _ctx.name,
    rows: _ctx.rows,
    required: _ctx.required,
    disabled: _ctx.disabled,
    placeholder: _ctx.placeholder,
    class: _ctx.textareaClass
  }, _ctx.attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/forms/Textarea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "UTextarea" });
const _imports_0 = publicAssetsURL("/tag.png");
const ShippingAuth = () => {
  const { $api } = useNuxtApp();
  const getlistOldShippingRule = async (params) => {
    try {
      const response = await $api("/common/shipping/listOldShippingRule", {
        method: "POST",
        body: params
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return { getlistOldShippingRule };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { getuserAddressRollPage } = AddressAuth();
    const { getmapProductByProductSkuList } = ProductAuth();
    const { getUserOrderDocByOrderNumber, tryOrder } = OrderAuth();
    const { getlistOldShippingRule } = ShippingAuth();
    PayAuth();
    const { listProvinceByCountryId, listCityByRegionId } = LocationAuth();
    PayAuth();
    useCookie("locationinfo");
    ref(0);
    const cart = useCartStore();
    const { getCart } = cartAuth();
    const changedesc = ref("");
    const isOpen = ref(false);
    const { $showLoading, $hideLoading } = useNuxtApp();
    ref(false);
    useRouter();
    const route = useRoute();
    const orderNo = ref("");
    const orderInfo = ref({});
    const productlists = ref([]);
    const skuList = ref([]);
    const orderId = ref(0);
    ref("");
    const from = route.query.from;
    const sku = route.query.sku;
    const number = route.query.number;
    const cartarr = ref([]);
    let skunum = {};
    const countries = [
      "+1",
      "+44",
      "+93",
      "+355",
      "+213",
      "+1684",
      "+376",
      "+244",
      "+1264",
      "+1268",
      "+54",
      "+374",
      "+297",
      "+61",
      "+43",
      "+994",
      "+1242",
      "+973",
      "+880",
      "+1246",
      "+375",
      "+32",
      "+501",
      "+229",
      "+1441",
      "+975",
      "+591",
      "+387",
      "+267",
      "+55",
      "+246",
      "+1284",
      "+673",
      "+359",
      "+226",
      "+257",
      "+855",
      "+237",
      "+238",
      "+599",
      "+1345",
      "+236",
      "+235",
      "+56",
      "+86",
      "+57",
      "+269",
      "+243",
      "+242",
      "+682",
      "+506",
      "+225",
      "+385",
      "+53",
      "+599",
      "+357",
      "+420",
      "+45",
      "+253",
      "+1767",
      "+593",
      "+20",
      "+503",
      "+240",
      "+291",
      "+372",
      "+251",
      "+500",
      "+298",
      "+679",
      "+358",
      "+33",
      "+594",
      "+689",
      "+241",
      "+220",
      "+995",
      "+49",
      "+233",
      "+350",
      "+30",
      "+299",
      "+1473",
      "+590",
      "+1671",
      "+502",
      "+44",
      "+224",
      "+245",
      "+592",
      "+509",
      "+504",
      "+852",
      "+36",
      "+354",
      "+91",
      "+62",
      "+98",
      "+964",
      "+353",
      "+972",
      "+39",
      "+1876",
      "+81",
      "+962",
      "+7",
      "+254",
      "+686",
      "+383",
      "+965",
      "+996",
      "+856",
      "+371",
      "+961",
      "+266",
      "+231",
      "+218",
      "+423",
      "+370",
      "+352",
      "+853",
      "+389",
      "+261",
      "+265",
      "+60",
      "+960",
      "+223",
      "+356",
      "+692",
      "+596",
      "+222",
      "+230",
      "+262",
      "+52",
      "+691",
      "+373",
      "+377",
      "+976",
      "+382",
      "+1664",
      "+212",
      "+258",
      "+95",
      "+264",
      "+674",
      "+977",
      "+31",
      "+687",
      "+64",
      "+505",
      "+227",
      "+234",
      "+683",
      "+672",
      "+850",
      "+1670",
      "+47",
      "+968",
      "+92",
      "+680",
      "+970",
      "+507",
      "+675",
      "+595",
      "+51",
      "+63",
      "+48",
      "+351",
      "+974",
      "+262",
      "+40",
      "+7",
      "+250",
      "+590",
      "+290",
      "+1869",
      "+1758",
      "+508",
      "+1784",
      "+685",
      "+378",
      "+239",
      "+966",
      "+221",
      "+381",
      "+248",
      "+232",
      "+65",
      "+1721",
      "+421",
      "+386",
      "+677",
      "+252",
      "+27",
      "+82",
      "+211",
      "+34",
      "+94",
      "+249",
      "+597",
      "+268",
      "+46",
      "+41",
      "+963",
      "+886",
      "+992",
      "+255",
      "+66",
      "+670",
      "+228",
      "+690",
      "+676",
      "+1868",
      "+216",
      "+90",
      "+993",
      "+1649",
      "+688",
      "+1340",
      "+256",
      "+380",
      "+971",
      "+598",
      "+998",
      "+678",
      "+58",
      "+84",
      "+681",
      "+212",
      "+967",
      "+260",
      "+263",
      "+358"
    ];
    const couponCode = ref("");
    const couponError = ref("");
    const discount = ref(0);
    const activeCoupon = ref("");
    const applyLoading = ref(false);
    const applyCoupon = async () => {
      couponError.value = "";
      if (!couponCode.value) {
        couponError.value = "Please enter a coupon code";
        return;
      }
      let orderItemListarr = [];
      productlists.value.forEach((element) => {
        orderItemListarr.push({
          productSku: element.productSku,
          qtyOrdered: Number(element.qtyOrdered),
          priceOrdered: element.productPrice,
          amountOrdered: element.productPrice * Number(element.qtyOrdered)
        });
      });
      let addparmes = {
        buyerCity: addressinfo.value.city,
        buyerCountryCode: addressinfo.value.country,
        buyerCountryName: addressinfo.value.countryName,
        buyerEmail: addressinfo.value.email,
        buyerFirstName: addressinfo.value.firstName,
        buyerAddress: addressinfo.value.address,
        buyerLastName: addressinfo.value.lastName,
        buyerNotes: notes.value,
        buyerPhoneAreaCode: addressinfo.value.numberCode,
        buyerPhoneNumber: addressinfo.value.number,
        buyerPostalCode: addressinfo.value.postalCode,
        buyerStateOrProvince: addressinfo.value.province,
        id: orderId.value,
        shippingRuleFeeId: templateid.value,
        shippingRule: {
          calFee: shipping.value
        },
        create: false,
        orderItemList: orderItemListarr,
        marketingActivityCouponCode: couponCode.value
      };
      applyLoading.value = true;
      try {
        let tryres = await tryOrder(addparmes);
        if (tryres.result) {
          activeCoupon.value = couponCode.value;
          discount.value = tryres.result.marketingActivityDiscountAmount || 0;
          couponCode.value = "";
        } else {
          couponError.value = tryres.message || "Invalid coupon code";
        }
      } catch (error) {
        let errormsg = JSON.parse(error.message);
        couponError.value = errormsg.enDesc || "Failed to apply coupon";
      } finally {
        applyLoading.value = false;
      }
    };
    const removeCoupon = () => {
      activeCoupon.value = "";
      discount.value = 0;
    };
    const getProductlist = async () => {
      try {
        let params = {
          skuList: skuList.value
        };
        let res = await getmapProductByProductSkuList(params);
        let lists = res.result;
        for (const key in lists) {
          let obj = lists[key];
          productlists.value.push({
            productName: obj.erpProduct.productEnglishName,
            mainPic: obj.erpProduct.mainPic,
            productSku: key,
            specAttr: obj.skuSpec.specAttr,
            qtyOrdered: skunum[key],
            productPrice: obj.skuSpec.customPrice,
            productStyle: obj.erpProduct.productStyle
          });
        }
        getShippingRulelist();
      } catch (error) {
      }
    };
    const filterOptionByLabel = (input, option) => {
      return option.label.toLowerCase().includes(input.toLowerCase());
    };
    const getShippingRulelist = async () => {
      if (from == "order") {
        return;
      }
      try {
        let detailarr = [];
        productlists.value.forEach((element) => {
          detailarr.push({
            productRealSku: element.productStyle,
            sku: element.productSku,
            num: Number(element.qtyOrdered)
          });
        });
        let addresspbj = {};
        if (form.value.country) {
          addresspbj.country = form.value.country;
        }
        if (addressinfo.value.country) {
          addresspbj.country = addressinfo.value.country;
        }
        if (!addresspbj.country || detailarr.length == 0) {
          return;
        }
        let params = {
          detailList: detailarr,
          address: addresspbj
        };
        let res = await getlistOldShippingRule(params);
        if (res.result.length > 0) {
          templates.value = res.result;
          templates.value.forEach((item) => {
            item.label = `${item.feeEnName}　　${item.daysFrom}–${item.daysTo} days　　$${item.calFee.toFixed(2)}`;
          });
        } else {
          templates.value = [{
            feeId: -1,
            label: "The current country does not support delivery, please change the delivery address",
            calFee: 0
          }];
        }
        templateid.value = templates.value[0].feeId;
      } catch (error) {
      }
    };
    const handleGetOrder = async () => {
      let orderNumber = route.query.orderNo;
      orderNo.value = orderNumber;
      try {
        let params = {
          orderNumber
        };
        let res = await getUserOrderDocByOrderNumber(params);
        let result = res.result;
        orderInfo.value = result;
        orderId.value = result.id;
        let orderItemList = result.orderItemList;
        productlists.value = [];
        orderItemList.forEach((element) => {
          productlists.value.push({
            productName: element.productName,
            mainPic: element.productImage,
            productSku: element.productSku,
            qtyOrdered: element.qtyOrdered,
            productPrice: element.priceOrdered,
            productStyle: ""
          });
        });
        addressinfo.value.city = result.buyerCity;
        addressinfo.value.country = result.buyerCountryCode;
        addressinfo.value.countryName = result.buyerCountryName;
        addressinfo.value.email = result.buyerEmail;
        addressinfo.value.firstName = result.buyerFirstName;
        addressinfo.value.address = result.buyerAddress;
        addressinfo.value.lastName = result.buyerLastName;
        notes.value = result.buyerNotes;
        addressinfo.value.numberCode = result.buyerPhoneAreaCode;
        addressinfo.value.number = result.buyerPhoneNumber;
        addressinfo.value.postalCode = result.buyerPostalCode;
        addressinfo.value.province = result.buyerStateOrProvince;
        addressarr.value = [addressinfo];
        templates.value = [result.shippingRule];
        templates.value.forEach((item) => {
          item.label = `${item.feeEnName}　　${item.daysFrom}–${item.daysTo} days　　$${item.calFee.toFixed(2)}`;
        });
        templateid.value = result.shippingRule.feeId;
      } catch (error) {
      }
    };
    const handleGetCart = async () => {
      try {
        let cartids = route.query.ids;
        if (typeof cartids === "string") {
          cartids = cartids.split(",");
        }
        let res = await getCart();
        let result = res.result;
        if (Array.isArray(cartids) && cartids.length > 0) {
          result = result.filter((item) => cartids.includes(String(item.id)));
        }
        cartarr.value = result;
        skuList.value = [];
        result.forEach((item) => {
          skuList.value.push(item.productSku);
          skunum[item.productSku] = item.productQuantity;
        });
        getProductlist();
      } catch (error) {
        console.error("getCart error:", error);
      }
    };
    if (sku) {
      skuList.value = [sku];
      skunum[sku] = number;
      getProductlist();
    }
    if (from == "cart") {
      handleGetCart();
    }
    if (from == "order") {
      handleGetOrder();
    }
    const showModal = ref(false);
    const isshow = ref(false);
    const options = [
      { value: 1, label: "paypal", icon: "/images/paypal.png" }
      // { value: 2, label: 'xtransfer', icon: '/images/xtransfer.png' },
      // { value: 3, label: 'airwallex', icon: '/images/airwallex.png' },
      // { value: 4, label: 'payoneer', icon: '/images/payoneer.png' },
      // { value: 5, label: 'mastercard', icon: '/images/mastercard.png' },
      // { value: 6, label: 'creditcard', icon: '/images/creditcard.png' },
    ];
    const form = ref({
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      country: null,
      province: null,
      city: "",
      numberCode: "+1",
      number: "",
      email: "",
      master: true
    });
    const notes = ref("");
    const selected = ref(1);
    const countryarr = ref([]);
    const provincearr = ref([]);
    const cityarr = ref([]);
    const addressarr = ref([]);
    const templateid = ref(0);
    const templates = ref([]);
    ref({});
    const addressinfo = ref({});
    const getAddresslist = async () => {
      try {
        let params = {};
        let res = await getuserAddressRollPage(params);
        let addressist = res.result.records;
        if (addressist.length > 0) {
          addressist[0].selected = true;
          addressinfo.value = addressist[0];
        }
        addressist.filter((item) => item.master == "1").forEach((item) => {
          item.selected = true;
          addressinfo.value = item;
        });
        addressarr.value = addressist;
      } catch (error) {
      }
    };
    const updateAddresslist = async () => {
      try {
        let params = {};
        let res = await getuserAddressRollPage(params);
        let addressist = res.result.records;
        addressist.forEach((item) => {
          item.selected = false;
        });
        const lastAddress = addressist[addressist.length - 1];
        lastAddress.selected = true;
        addressinfo.value = lastAddress;
        addressarr.value = addressist;
      } catch (error) {
      }
    };
    const selectaddress = (index) => {
      addressarr.value.forEach((element) => {
        element.selected = false;
      });
      addressarr.value[index].selected = true;
      addressinfo.value = addressarr.value[index];
      shipping.value = 0;
      showModal.value = false;
    };
    getAddresslist();
    const shipping = ref(0);
    computed(() => cart.itemList.filter((item) => item.selected));
    const selectedTotal = computed(() => {
      return productlists.value.reduce((total, item) => total + item.productPrice * item.qtyOrdered, 0) ?? 0;
    });
    const selectedQuantity = computed(() => {
      return productlists.value.reduce((sum, item) => sum + Number(item.qtyOrdered), 0);
    });
    const getProvince = async () => {
      let selectcountry = countryarr.value.find((c) => c.countryCode === form.value.country);
      let countryphone = selectcountry.phone;
      let countryid = selectcountry.id;
      form.value.numberCode = countryphone;
      try {
        let parmes = {
          countryId: countryid
        };
        let res = await listProvinceByCountryId(parmes);
        let provincelist = res.result;
        provincearr.value = provincelist;
      } catch (error) {
      }
    };
    const getCity = async () => {
      try {
        let selectprovince = provincearr.value.find((c) => c.regionName === form.value.province);
        let provinceid = selectprovince.id;
        let parmes = {
          regionId: provinceid
        };
        let res = await listCityByRegionId(parmes);
        let citylist = res.result;
        cityarr.value = citylist;
      } catch (error) {
      }
    };
    ref([]);
    watch(() => addressinfo.value, (newvalue, oldvalue) => {
      if (newvalue) {
        getShippingRulelist();
      }
    });
    watch(() => form.value.country, (newvalue, oldvalue) => {
      if (newvalue) {
        getShippingRulelist();
        getProvince();
      }
    });
    watch(() => form.value.province, (newvalue, oldvalue) => {
      if (newvalue) {
        getCity();
      }
    });
    watch(() => templateid.value, (newvalue, oldvalue) => {
      if (newvalue) {
        templates.value.filter((item) => item.feeId == templateid.value).forEach((item) => {
          shipping.value = item.calFee;
        });
      }
    });
    function refreshPage() {
      (void 0).location.reload();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelectMenu = __nuxt_component_6;
      const _component_UButton = __nuxt_component_7;
      const _component_UIcon = __nuxt_component_5;
      const _component_UTextarea = __nuxt_component_3;
      const _component_UModal = __nuxt_component_4;
      const _component_AddressModal = __nuxt_component_3$1;
      _push(`<!--[--><div class="min-h-screen bg-[#F8F8F8]" data-v-bdd22a49><div class="max-w-7xl mx-auto px-4 py-8" data-v-bdd22a49><div class="rounded-lg shadow-sm" data-v-bdd22a49><div class="flex flex-col lg:flex-row gap-8 items-stretch" data-v-bdd22a49><div class="flex-1" data-v-bdd22a49><main class="flex-1 space-y-6" data-v-bdd22a49>`);
      if (addressarr.value.length == 0) {
        _push(`<section class="border border-blackcolor/10 rounded-lg bg-white" data-v-bdd22a49><div class="p-3 px-6 text-customblack font-semibold text-lg" data-v-bdd22a49>Address <span style="${ssrRenderStyle({ "color": "red" })}" data-v-bdd22a49>*</span></div><div class="border-t border-t-blackcolor/10" data-v-bdd22a49><div class="bg-white px-6 py-2 rounded-lg w-2/3" data-v-bdd22a49>`);
        _push(ssrRenderComponent(unref(Form), { layout: "vertical" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(FormItem), { name: "country" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Select), {
                      value: form.value.country,
                      "onUpdate:value": ($event) => form.value.country = $event,
                      "show-search": "",
                      options: countryarr.value.map((c) => ({ label: c.countryName, value: c.countryCode })),
                      placeholder: "Select Country/Region",
                      "filter-option": filterOptionByLabel,
                      allowClear: ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Select), {
                        value: form.value.country,
                        "onUpdate:value": ($event) => form.value.country = $event,
                        "show-search": "",
                        options: countryarr.value.map((c) => ({ label: c.countryName, value: c.countryCode })),
                        placeholder: "Select Country/Region",
                        "filter-option": filterOptionByLabel,
                        allowClear: ""
                      }, null, 8, ["value", "onUpdate:value", "options"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: form.value.firstName,
                      "onUpdate:value": ($event) => form.value.firstName = $event,
                      placeholder: "First name",
                      size: "large"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: form.value.firstName,
                        "onUpdate:value": ($event) => form.value.firstName = $event,
                        placeholder: "First name",
                        size: "large"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: form.value.lastName,
                      "onUpdate:value": ($event) => form.value.lastName = $event,
                      placeholder: "Last name",
                      size: "small"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: form.value.lastName,
                        "onUpdate:value": ($event) => form.value.lastName = $event,
                        placeholder: "Last name",
                        size: "small"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: form.value.address,
                      "onUpdate:value": ($event) => form.value.address = $event,
                      placeholder: "Street address"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: form.value.address,
                        "onUpdate:value": ($event) => form.value.address = $event,
                        placeholder: "Street address"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), { name: "province" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Select), {
                      allowClear: "",
                      value: form.value.province,
                      "onUpdate:value": ($event) => form.value.province = $event,
                      "show-search": "",
                      options: provincearr.value.map((p) => ({ label: p.regionName, value: p.regionName })),
                      placeholder: "Select State/Province",
                      "filter-option": filterOptionByLabel
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Select), {
                        allowClear: "",
                        value: form.value.province,
                        "onUpdate:value": ($event) => form.value.province = $event,
                        "show-search": "",
                        options: provincearr.value.map((p) => ({ label: p.regionName, value: p.regionName })),
                        placeholder: "Select State/Province",
                        "filter-option": filterOptionByLabel
                      }, null, 8, ["value", "onUpdate:value", "options"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), { name: "city" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(AutoComplete), {
                      allowClear: "",
                      value: form.value.city,
                      "onUpdate:value": ($event) => form.value.city = $event,
                      "show-search": "",
                      options: cityarr.value.map((c) => ({ label: c.cityName, value: c.cityName })),
                      "filter-option": filterOptionByLabel,
                      placeholder: "Select City"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(AutoComplete), {
                        allowClear: "",
                        value: form.value.city,
                        "onUpdate:value": ($event) => form.value.city = $event,
                        "show-search": "",
                        options: cityarr.value.map((c) => ({ label: c.cityName, value: c.cityName })),
                        "filter-option": filterOptionByLabel,
                        placeholder: "Select City"
                      }, null, 8, ["value", "onUpdate:value", "options"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: form.value.postalCode,
                      "onUpdate:value": ($event) => form.value.postalCode = $event,
                      placeholder: "Zip code"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: form.value.postalCode,
                        "onUpdate:value": ($event) => form.value.postalCode = $event,
                        placeholder: "Zip code"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: form.value.email,
                      "onUpdate:value": ($event) => form.value.email = $event,
                      placeholder: "Email(optional)"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: form.value.email,
                        "onUpdate:value": ($event) => form.value.email = $event,
                        placeholder: "Email(optional)"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex gap-2" data-v-bdd22a49${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Select), {
                      value: form.value.numberCode,
                      "onUpdate:value": ($event) => form.value.numberCode = $event,
                      class: "!w-24",
                      "show-search": "",
                      options: countries.map((code) => ({ label: code, value: code }))
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Input), {
                      value: form.value.number,
                      "onUpdate:value": ($event) => form.value.number = $event,
                      placeholder: "Your number",
                      class: "flex-1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(Select), {
                          value: form.value.numberCode,
                          "onUpdate:value": ($event) => form.value.numberCode = $event,
                          class: "!w-24",
                          "show-search": "",
                          options: countries.map((code) => ({ label: code, value: code }))
                        }, null, 8, ["value", "onUpdate:value", "options"]),
                        createVNode(unref(Input), {
                          value: form.value.number,
                          "onUpdate:value": ($event) => form.value.number = $event,
                          placeholder: "Your number",
                          class: "flex-1"
                        }, null, 8, ["value", "onUpdate:value"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Checkbox), {
                      checked: form.value.master,
                      "onUpdate:checked": ($event) => form.value.master = $event
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Set as default address `);
                        } else {
                          return [
                            createTextVNode("Set as default address ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Checkbox), {
                        checked: form.value.master,
                        "onUpdate:checked": ($event) => form.value.master = $event
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Set as default address ")
                        ]),
                        _: 1
                      }, 8, ["checked", "onUpdate:checked"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(FormItem), { name: "country" }, {
                  default: withCtx(() => [
                    createVNode(unref(Select), {
                      value: form.value.country,
                      "onUpdate:value": ($event) => form.value.country = $event,
                      "show-search": "",
                      options: countryarr.value.map((c) => ({ label: c.countryName, value: c.countryCode })),
                      placeholder: "Select Country/Region",
                      "filter-option": filterOptionByLabel,
                      allowClear: ""
                    }, null, 8, ["value", "onUpdate:value", "options"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), null, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: form.value.firstName,
                      "onUpdate:value": ($event) => form.value.firstName = $event,
                      placeholder: "First name",
                      size: "large"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), null, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: form.value.lastName,
                      "onUpdate:value": ($event) => form.value.lastName = $event,
                      placeholder: "Last name",
                      size: "small"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), null, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: form.value.address,
                      "onUpdate:value": ($event) => form.value.address = $event,
                      placeholder: "Street address"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), { name: "province" }, {
                  default: withCtx(() => [
                    createVNode(unref(Select), {
                      allowClear: "",
                      value: form.value.province,
                      "onUpdate:value": ($event) => form.value.province = $event,
                      "show-search": "",
                      options: provincearr.value.map((p) => ({ label: p.regionName, value: p.regionName })),
                      placeholder: "Select State/Province",
                      "filter-option": filterOptionByLabel
                    }, null, 8, ["value", "onUpdate:value", "options"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), { name: "city" }, {
                  default: withCtx(() => [
                    createVNode(unref(AutoComplete), {
                      allowClear: "",
                      value: form.value.city,
                      "onUpdate:value": ($event) => form.value.city = $event,
                      "show-search": "",
                      options: cityarr.value.map((c) => ({ label: c.cityName, value: c.cityName })),
                      "filter-option": filterOptionByLabel,
                      placeholder: "Select City"
                    }, null, 8, ["value", "onUpdate:value", "options"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), null, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: form.value.postalCode,
                      "onUpdate:value": ($event) => form.value.postalCode = $event,
                      placeholder: "Zip code"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), null, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: form.value.email,
                      "onUpdate:value": ($event) => form.value.email = $event,
                      placeholder: "Email(optional)"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(Select), {
                        value: form.value.numberCode,
                        "onUpdate:value": ($event) => form.value.numberCode = $event,
                        class: "!w-24",
                        "show-search": "",
                        options: countries.map((code) => ({ label: code, value: code }))
                      }, null, 8, ["value", "onUpdate:value", "options"]),
                      createVNode(unref(Input), {
                        value: form.value.number,
                        "onUpdate:value": ($event) => form.value.number = $event,
                        placeholder: "Your number",
                        class: "flex-1"
                      }, null, 8, ["value", "onUpdate:value"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), null, {
                  default: withCtx(() => [
                    createVNode(unref(Checkbox), {
                      checked: form.value.master,
                      "onUpdate:checked": ($event) => form.value.master = $event
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Set as default address ")
                      ]),
                      _: 1
                    }, 8, ["checked", "onUpdate:checked"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (addressarr.value.length > 0) {
        _push(`<section class="border border-blackcolor/10 rounded-lg bg-white" data-v-bdd22a49><div class="p-3 px-4 sm:px-6 text-customblack font-semibold text-base sm:text-lg" data-v-bdd22a49> Address <span class="text-red-500" data-v-bdd22a49>*</span></div><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 sm:gap-x-8 border-t border-t-blackcolor/10 p-4 sm:p-6" data-v-bdd22a49><div data-v-bdd22a49><span class="text-blackcolor/50 text-sm mb-1 block" data-v-bdd22a49>Full name</span><div class="font-medium text-sm sm:text-base" data-v-bdd22a49>${ssrInterpolate(addressinfo.value.firstName)}${ssrInterpolate(addressinfo.value.lastName)}</div></div><div data-v-bdd22a49><span class="text-blackcolor/50 text-sm mb-1 block" data-v-bdd22a49>Number</span><div class="font-medium text-sm sm:text-base" data-v-bdd22a49>(${ssrInterpolate(addressinfo.value.numberCode)}) ${ssrInterpolate(addressinfo.value.number)}</div></div><div style="${ssrRenderStyle(unref(from) != "order" ? null : { display: "none" })}" class="space-y-1 sm:space-y-2" data-v-bdd22a49><div class="text-primary cursor-pointer text-sm sm:text-base" data-v-bdd22a49> Change another address </div><div class="text-primary cursor-pointer text-sm sm:text-base" data-v-bdd22a49> Add new address </div></div></div><div class="px-4 sm:px-6 pb-4 sm:pb-6" data-v-bdd22a49><span class="text-blackcolor/50 text-sm mb-1 block" data-v-bdd22a49>Address detail</span><div class="font-medium text-sm sm:text-base" data-v-bdd22a49>${ssrInterpolate(addressinfo.value.countryName)} ${ssrInterpolate(addressinfo.value.provinceName)} ${ssrInterpolate(addressinfo.value.city)} ${ssrInterpolate(addressinfo.value.address)}</div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="border border-blackcolor/10 rounded-lg bg-white" data-v-bdd22a49><div class="p-3 px-6 text-customblack font-semibold text-lg" data-v-bdd22a49>Shipping methods <span style="${ssrRenderStyle({ "color": "red" })}" data-v-bdd22a49>*</span></div><div class="border-t border-t-blackcolor/10 py-6 px-6" data-v-bdd22a49>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: templateid.value,
        "onUpdate:modelValue": ($event) => templateid.value = $event,
        options: templates.value,
        "option-attribute": "label",
        "value-attribute": "feeId",
        ui: { rounded: "rounded-md", option: { padding: "px-2 py-2", base: "py-2" } },
        disabled: unref(from) == "order" || templateid.value == "-1"
      }, {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              size: "lg",
              color: "white",
              variant: "outline",
              class: ["w-full justify-between h-10 rounded-md", { "ring-2 ring-primary": open }]
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<span class="text-sm" data-v-bdd22a49${_scopeId2}>${ssrInterpolate(((_a = templates.value.find((item) => item.feeId === templateid.value)) == null ? void 0 : _a.label) || "Select Shipping Method")}</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-chevron-down" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", { class: "text-sm" }, toDisplayString(((_b = templates.value.find((item) => item.feeId === templateid.value)) == null ? void 0 : _b.label) || "Select Shipping Method"), 1),
                    createVNode(_component_UIcon, { name: "i-heroicons-chevron-down" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                size: "lg",
                color: "white",
                variant: "outline",
                class: ["w-full justify-between h-10 rounded-md", { "ring-2 ring-primary": open }]
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("span", { class: "text-sm" }, toDisplayString(((_a = templates.value.find((item) => item.feeId === templateid.value)) == null ? void 0 : _a.label) || "Select Shipping Method"), 1),
                    createVNode(_component_UIcon, { name: "i-heroicons-chevron-down" })
                  ];
                }),
                _: 2
              }, 1032, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="border border-blackcolor/10 rounded-lg bg-white" data-v-bdd22a49><div class="p-3 px-6 text-customblack font-semibold text-lg" data-v-bdd22a49>Payment methods <span style="${ssrRenderStyle({ "color": "red" })}" data-v-bdd22a49>*</span></div><div class="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-t-blackcolor/10 p-6" data-v-bdd22a49><!--[-->`);
      ssrRenderList(options, (option) => {
        _push(`<div class="${ssrRenderClass([selected.value === option.value ? "border-2 border-gray-200" : "border border-transparent", "flex items-center space-x-4 p-2 rounded-md"])}" data-v-bdd22a49><input type="radio"${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(selected.value, option.value)) ? " checked" : ""} class="form-radio" data-v-bdd22a49><label class="flex items-center space-x-2 cursor-pointer" data-v-bdd22a49><img${ssrRenderAttr("src", option.icon)} class="h-8 sm:h-[50px]" data-v-bdd22a49></label></div>`);
      });
      _push(`<!--]--></div></section><section class="border border-blackcolor/10 rounded-lg bg-white" data-v-bdd22a49><div class="p-3 px-6 text-customblack font-semibold text-lg" data-v-bdd22a49>Notes</div><div class="border-t border-t-blackcolor/10 py-6 px-8" data-v-bdd22a49>`);
      _push(ssrRenderComponent(_component_UTextarea, {
        modelValue: notes.value,
        "onUpdate:modelValue": ($event) => notes.value = $event
      }, null, _parent));
      _push(`</div></section></main></div><div class="sm:w-80 bg-white rounded-lg shadow-sm flex flex-col justify-between min-h-[200px]" data-v-bdd22a49><div class="p-6" data-v-bdd22a49><div class="flex justify-between" data-v-bdd22a49><span class="text-gray-600" data-v-bdd22a49>Selected ${ssrInterpolate(selectedQuantity.value)} items</span><span data-v-bdd22a49>$${ssrInterpolate(selectedTotal.value.toFixed(2))}</span></div><div class="max-h-96 overflow-y-auto" data-v-bdd22a49><!--[-->`);
      ssrRenderList(productlists.value, (item) => {
        _push(`<div class="flex items-center space-x-4 bg-white rounded-md shadow-sm py-4" data-v-bdd22a49><img${ssrRenderAttr("src", item.mainPic)} alt="Product Image" class="w-20 h-20 rounded-md object-cover" data-v-bdd22a49><div class="flex flex-col justify-between" data-v-bdd22a49>`);
        _push(ssrRenderComponent(unref(Tooltip), {
          color: "white",
          overlayInnerStyle: { color: "#333" },
          title: item.productName,
          overlayStyle: { maxWidth: "300px", whiteSpace: "pre-line", wordBreak: "break-word" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="font-semibold text-sm text-blackcolor truncate-1-lines max-w-52" data-v-bdd22a49${_scopeId}>${ssrInterpolate(item.productName)}</div>`);
            } else {
              return [
                createVNode("div", { class: "font-semibold text-sm text-blackcolor truncate-1-lines max-w-52" }, toDisplayString(item.productName), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(unref(Tooltip), {
          color: "white",
          overlayInnerStyle: { color: "#333" },
          title: item.specAttr,
          overlayStyle: { maxWidth: "300px", whiteSpace: "pre-line", wordBreak: "break-word" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-gray-300 text-sm my-2 truncate-1-lines max-w-52" data-v-bdd22a49${_scopeId}>${ssrInterpolate(item.specAttr)}</div>`);
            } else {
              return [
                createVNode("div", { class: "text-gray-300 text-sm my-2 truncate-1-lines max-w-52" }, toDisplayString(item.specAttr), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<p class="text-lg font-semibold" data-v-bdd22a49>${ssrInterpolate(item.productPrice)} x ${ssrInterpolate(item.qtyOrdered)}</p></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-4" data-v-bdd22a49><div class="flex gap-2 text-white" data-v-bdd22a49>`);
      _push(ssrRenderComponent(unref(Input), {
        value: couponCode.value,
        "onUpdate:value": ($event) => couponCode.value = $event,
        placeholder: "Enter the coupon code",
        class: "flex-1 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        onClick: applyCoupon,
        disabled: !couponCode.value || applyLoading.value,
        loading: applyLoading.value,
        class: ["shrink-0 rounded px-4 text-white", [
          !couponCode.value ? "!bg-gray-300 cursor-not-allowed" : "bg-primary hover:bg-[#00a9d8]"
        ]]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Apply `);
          } else {
            return [
              createTextVNode(" Apply ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (couponError.value) {
        _push(`<div class="text-red-500 text-sm mt-1" data-v-bdd22a49>${ssrInterpolate(couponError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (activeCoupon.value) {
        _push(`<div class="mt-3 inline-flex items-center px-2 py-1 rounded-md text-xs" style="${ssrRenderStyle({ "background-color": "#F0F0F0", "color": "#333" })}" data-v-bdd22a49><img${ssrRenderAttr("src", _imports_0)} class="w-4 h-4 mr-2" data-v-bdd22a49><span class="mr-2 text-xs" data-v-bdd22a49>${ssrInterpolate(activeCoupon.value)}</span>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-material-symbols-close-rounded",
          class: "w-4 h-4 text-gray-100 hover:text-red-500 cursor-pointer",
          onClick: removeCoupon
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (discount.value > 0) {
        _push(`<div class="flex justify-between mt-4" data-v-bdd22a49><span class="text-gray-600" data-v-bdd22a49>Discount</span><span class="text-green-600 font-semibold" data-v-bdd22a49>- $${ssrInterpolate(discount.value.toFixed(2))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between mt-4" data-v-bdd22a49><span class="text-gray-600" data-v-bdd22a49>Shipping</span><span data-v-bdd22a49>$${ssrInterpolate(shipping.value.toFixed(2))}</span></div><div class="pt-4 flex justify-between font-bold mt-4" data-v-bdd22a49><span data-v-bdd22a49>Total</span><span data-v-bdd22a49>$${ssrInterpolate(((selectedTotal.value || 0) + (shipping.value || 0) - discount.value).toFixed(2))}</span></div></div><div id="paypal-button-container" class="sticky bottom-1 px-2" data-v-bdd22a49></div></div></div></div></div></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        width: "w-full",
        ui: { width: "sm:max-w-5xl" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="border border-blackcolor/10 rounded-lg" data-v-bdd22a49${_scopeId}><div class="relative p-3 px-6 text-customblack font-semibold text-lg" data-v-bdd22a49${_scopeId}> Address <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 px-2 py-1" data-v-bdd22a49${_scopeId}> ✕ </button></div><div class="grid grid-cols-3 gap-6 border-t border-t-blackcolor/10 p-6" data-v-bdd22a49${_scopeId}><!--[-->`);
            ssrRenderList(addressarr.value, (item, idx) => {
              _push2(`<div class="${ssrRenderClass([{ "border-primary-500 bg-primary-50": item.selected == 1 }, "relative border border-blackcolor/10 rounded-lg p-4 hover:shadow cursor-pointer"])}" data-v-bdd22a49${_scopeId}><div class="space-y-1" data-v-bdd22a49${_scopeId}><p data-v-bdd22a49${_scopeId}><span class="text-gray-500" data-v-bdd22a49${_scopeId}>Full name:</span> ${ssrInterpolate(item.firstName)}${ssrInterpolate(item.lastName)}</p><p data-v-bdd22a49${_scopeId}><span class="text-gray-500" data-v-bdd22a49${_scopeId}>Number:</span>(${ssrInterpolate(item.numberCode)}) ${ssrInterpolate(item.number)}</p><p data-v-bdd22a49${_scopeId}><span class="text-gray-500" data-v-bdd22a49${_scopeId}>Address:</span> ${ssrInterpolate(item.countryName)} ${ssrInterpolate(item.provinceName)} ${ssrInterpolate(item.city)} ${ssrInterpolate(item.address)}</p></div>`);
              if (item.selected == 1) {
                _push2(`<span class="absolute top-0 right-0 bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded" data-v-bdd22a49${_scopeId}> Selected </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></section>`);
          } else {
            return [
              createVNode("section", { class: "border border-blackcolor/10 rounded-lg" }, [
                createVNode("div", { class: "relative p-3 px-6 text-customblack font-semibold text-lg" }, [
                  createTextVNode(" Address "),
                  createVNode("button", {
                    onClick: ($event) => showModal.value = false,
                    class: "absolute top-2 right-2 text-gray-500 hover:text-gray-800 px-2 py-1"
                  }, " ✕ ", 8, ["onClick"])
                ]),
                createVNode("div", { class: "grid grid-cols-3 gap-6 border-t border-t-blackcolor/10 p-6" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(addressarr.value, (item, idx) => {
                    return openBlock(), createBlock("div", {
                      key: idx,
                      class: ["relative border border-blackcolor/10 rounded-lg p-4 hover:shadow cursor-pointer", { "border-primary-500 bg-primary-50": item.selected == 1 }],
                      onClick: ($event) => selectaddress(idx)
                    }, [
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("p", null, [
                          createVNode("span", { class: "text-gray-500" }, "Full name:"),
                          createTextVNode(" " + toDisplayString(item.firstName) + toDisplayString(item.lastName), 1)
                        ]),
                        createVNode("p", null, [
                          createVNode("span", { class: "text-gray-500" }, "Number:"),
                          createTextVNode("(" + toDisplayString(item.numberCode) + ") " + toDisplayString(item.number), 1)
                        ]),
                        createVNode("p", null, [
                          createVNode("span", { class: "text-gray-500" }, "Address:"),
                          createTextVNode(" " + toDisplayString(item.countryName) + " " + toDisplayString(item.provinceName) + " " + toDisplayString(item.city) + " " + toDisplayString(item.address), 1)
                        ])
                      ]),
                      item.selected == 1 ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "absolute top-0 right-0 bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded"
                      }, " Selected ")) : createCommentVNode("", true)
                    ], 10, ["onClick"]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-8 flex justify-center" data-v-bdd22a49${_scopeId}><div class="text-center" data-v-bdd22a49${_scopeId}><div data-v-bdd22a49${_scopeId}>${ssrInterpolate(changedesc.value)}</div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              class: "mt-6 rounded",
              onClick: refreshPage
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Refresh`);
                } else {
                  return [
                    createTextVNode("Refresh")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-8 flex justify-center" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("div", null, toDisplayString(changedesc.value), 1),
                  createVNode(_component_UButton, {
                    class: "mt-6 rounded",
                    onClick: refreshPage
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Refresh")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AddressModal, {
        isshow: isshow.value,
        onClose: ($event) => isshow.value = false,
        onUpdateData: ($event) => updateAddresslist()
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const checkout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bdd22a49"]]);

export { checkout as default };
