import { _ as _sfc_main$1 } from './Userleft-C3owAP1G.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { h as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _imports_5 } from './virtual_public-DZ6t4Nj3.mjs';
import { f as formatTimestamp } from './format-C04fzD99.mjs';
import { Skeleton, Steps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { P as PayAuth, O as OrderAuth } from './pay-B0nCCLYu.mjs';
import { _ as _export_sfc, g as useRoute } from './server.mjs';
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
import 'tailwind-merge';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';

const _imports_0 = publicAssetsURL("/copyoutlined.png");
const _imports_1 = publicAssetsURL("/calendar.png");
const _imports_2 = publicAssetsURL("/deletered.png");
const _imports_3 = publicAssetsURL("/car.png");
const _imports_4 = publicAssetsURL("/images/paypal.png");
const _sfc_main = {
  __name: "orderinfo",
  __ssrInlineRender: true,
  setup(__props) {
    PayAuth();
    const {
      getUserOrderDocByOrderNumber
    } = OrderAuth();
    const loading = ref(true);
    const route = useRoute();
    useRouter();
    const orderNumber = route.query.orderNumber ?? "2507051715427353680";
    const itemstimeline = ref([]);
    const currentstatustitle = ref("");
    const currentstatusdesc = ref("");
    const items = ref([
      {
        title: "Order Submitted",
        orderstatus: 500,
        ordertitle: "Waiting fo payment",
        orderdesc: "The order has been Submitted successfully, please pay as soon as possible!"
      },
      {
        title: "Pending Confirm",
        orderstatus: 1e3,
        ordertitle: "we are confirming",
        orderdesc: "We are communicating with the factory whether your order can be produced"
      },
      {
        title: "Awaiting Shipment",
        orderstatus: 1500,
        ordertitle: "In production or Warehouse processing",
        orderdesc: "Your product is being produced or packaged in the warehouse"
      },
      {
        title: "Shipped",
        orderstatus: 2e3,
        ordertitle: "Warehouse has shipped",
        orderdesc: "Your order has started to be delivered, please pay attention to the logistics information"
      },
      {
        title: "Delivered",
        orderstatus: 2500,
        ordertitle: "Product delivery completed",
        orderdesc: "You have signed for all the goods. If you have any questions, please contact us in time."
      }
    ]);
    const currentStep = ref(1);
    const activeTab = ref("Pay Info");
    const tabs = ["Pay Info", "Shipping & Address", "Order timeline", "Note"];
    function getOrderStatus(status) {
      switch (status) {
        case 0:
          return "none";
        case 500:
          return "Unpaid";
        case 1e3:
          return "Pending Confirm";
        case 1500:
          return "Awaiting Shipment";
        case 2e3:
          return "Shipped";
        case 2500:
          return "Delivered";
        case 3e3:
          return "Cancelled";
        default:
          return "unknown";
      }
    }
    ref({});
    const orderInfo = ref({});
    const handleGetOrder = async () => {
      try {
        loading.value = true;
        let params = {
          orderNumber
        };
        let res = await getUserOrderDocByOrderNumber(params);
        let result = res.result;
        orderInfo.value = result;
        const index = items.value.findIndex((item) => item.orderstatus === result.status);
        if (index !== -1) {
          currentStep.value = index;
          currentstatustitle.value = items.value[index].ordertitle;
          currentstatusdesc.value = items.value[index].orderdesc;
        }
        if (result.status == 3e3) {
          currentstatustitle.value = "Order Cancelled";
          currentstatusdesc.value = "You can buy other products.";
          currentStep.value = -1;
        }
        let orderTimelineList = result.orderTimelineList;
        orderTimelineList.forEach((element) => {
          element.title = element.desc;
          element.description = formatTimestamp(element.time);
        });
        itemstimeline.value = orderTimelineList.reverse();
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };
    handleGetOrder();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Userleft = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))} data-v-f18057ce><div class="flex min-h-screen text-sm max-row" data-v-f18057ce>`);
      _push(ssrRenderComponent(_component_Userleft, { class: "hidden sm:block" }, null, _parent));
      _push(`<main class="flex-1 space-y-6 bg-white" data-v-f18057ce><div data-v-f18057ce><div class="mx-auto py-8" data-v-f18057ce>`);
      if (loading.value) {
        _push(`<!--[--><div class="mb-8" data-v-f18057ce>`);
        _push(ssrRenderComponent(unref(Skeleton).Input, {
          style: { "width": "200px" },
          active: "",
          size: "default"
        }, null, _parent));
        _push(ssrRenderComponent(unref(Skeleton).Input, {
          style: { "width": "100px", "margin-left": "20px" },
          active: "",
          size: "small"
        }, null, _parent));
        _push(ssrRenderComponent(unref(Skeleton).Input, {
          style: { "width": "120px", "margin-left": "20px" },
          active: "",
          size: "small"
        }, null, _parent));
        _push(`</div><div class="flex items-center mb-6" data-v-f18057ce><div class="w-full h-6 rounded" data-v-f18057ce></div></div><div class="bg-white rounded-lg shadow-sm p-4 mb-8" data-v-f18057ce>`);
        _push(ssrRenderComponent(unref(Skeleton), {
          active: "",
          paragraph: "{ rows: 2 }"
        }, null, _parent));
        _push(`</div><div class="bg-white rounded-lg shadow-sm p-4 mb-8" data-v-f18057ce><div class="mb-4 flex justify-between" data-v-f18057ce>`);
        _push(ssrRenderComponent(unref(Skeleton).Input, { style: { "width": "120px" } }, null, _parent));
        _push(ssrRenderComponent(unref(Skeleton).Input, { style: { "width": "100px" } }, null, _parent));
        _push(`</div><!--[-->`);
        ssrRenderList(2, (i) => {
          _push(`<div class="flex justify-between items-center py-4 border-t border-gray-100" data-v-f18057ce><div class="flex gap-4 items-center" data-v-f18057ce>`);
          _push(ssrRenderComponent(unref(Skeleton).Image, { style: { "width": "80px", "height": "80px" } }, null, _parent));
          _push(ssrRenderComponent(unref(Skeleton), {
            active: "",
            paragraph: "{ rows: 2 }"
          }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(unref(Skeleton).Input, { style: { "width": "80px" } }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--><div class="mt-6 space-y-2" data-v-f18057ce>`);
        _push(ssrRenderComponent(unref(Skeleton).Input, { style: { "width": "200px" } }, null, _parent));
        _push(ssrRenderComponent(unref(Skeleton).Input, { style: { "width": "200px" } }, null, _parent));
        _push(ssrRenderComponent(unref(Skeleton).Input, { style: { "width": "200px" } }, null, _parent));
        _push(`</div></div><div class="bg-white rounded-lg shadow-sm p-6" data-v-f18057ce><div class="flex gap-4 mb-6" data-v-f18057ce><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(unref(Skeleton).Input, {
            key: i,
            style: { "width": "100px" }
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(unref(Skeleton), {
          active: "",
          paragraph: "{ rows: 3 }"
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else {
        _push(`<!--[--><div class="flex items-center mb-8 flex-wrap" data-v-f18057ce><div class="text-xl font-bold" data-v-f18057ce><span class="text-gray-200" data-v-f18057ce>Order: </span>#${ssrInterpolate(orderInfo.value.orderNumber)}</div><img${ssrRenderAttr("src", _imports_0)} class="w-3 mx-2 cursor-pointer" data-v-f18057ce><img${ssrRenderAttr("src", _imports_1)} class="w-6 mx-2" data-v-f18057ce><span data-v-f18057ce>${ssrInterpolate(orderInfo.value.createDate ? unref(formatTimestamp)(orderInfo.value.createDate) : "")}</span><span class="rounded-2xl px-3 py-2 bg-[#FAAD14] ml-4 text-xs text-white" data-v-f18057ce>${ssrInterpolate(getOrderStatus(orderInfo.value.status))}</span></div>`);
        _push(ssrRenderComponent(unref(Steps), {
          current: currentStep.value,
          "label-placement": "vertical",
          items: items.value,
          size: "small"
        }, null, _parent));
        _push(`<div class="bg-white rounded-lg py-6 mb-4" data-v-f18057ce><div class="flex items-center justify-between mb-6" data-v-f18057ce><h2 class="text-lg font-medium mb-0" data-v-f18057ce>${ssrInterpolate(currentstatustitle.value)}</h2><div class="flex gap-4" data-v-f18057ce>`);
        if (orderInfo.value.status == 500) {
          _push(`<button class="whitespace-nowrap px-5 py-2 border border-[rgba(0,178,227,0.4)] bg-[rgba(166,236,255,0.2)] text-primary rounded" data-v-f18057ce> Pay </button>`);
        } else {
          _push(`<!---->`);
        }
        if (orderInfo.value.status <= 1e3) {
          _push(`<button class="whitespace-nowrap p-2 px-3 border border-[rgba(255,173,28,0.4)] bg-[rgba(255,213,215,0.2)] rounded" data-v-f18057ce><img${ssrRenderAttr("src", _imports_2)} class="w-5" data-v-f18057ce></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><p class="text-gray-600" data-v-f18057ce>${ssrInterpolate(currentstatusdesc.value)}</p></div><div class="bg-white rounded-lg mb-8" data-v-f18057ce><div class="flex justify-between mb-4 bg-[#F6F6F6] text-black/45 py-4 px-6" data-v-f18057ce><span class="font-medium" data-v-f18057ce>Product</span><span class="font-medium" data-v-f18057ce>Price×QTY</span></div><!--[-->`);
        ssrRenderList(orderInfo.value.orderItemList, (product, index) => {
          var _a2;
          _push(`<div class="flex items-center justify-between py-4 border-b border-gray-100 px-6" data-v-f18057ce><div data-v-f18057ce><div class="flex items-center gap-4" data-v-f18057ce><img${ssrRenderAttr("src", product.productImage)} alt="Product" class="w-20 h-20 object-cover rounded" data-v-f18057ce><div data-v-f18057ce><h3 class="font-medium text-sm" data-v-f18057ce>${ssrInterpolate(product.productName)}</h3><p class="text-sm text-gray-200" data-v-f18057ce><!--[-->`);
          ssrRenderList(product.skuPropList, (spec) => {
            _push(`<span class="mr-2" data-v-f18057ce>${ssrInterpolate(spec.value)}</span>`);
          });
          _push(`<!--]--></p><button class="text-primary-500 text-sm mt-1" data-v-f18057ce>View details</button></div></div>`);
          if (product.logisticsWaybillNoList) {
            _push(`<div class="flex items-center text-sm gap-2 mt-2" data-v-f18057ce><img${ssrRenderAttr("src", _imports_3)} class="w-7" data-v-f18057ce><span class="text-gray-300" data-v-f18057ce>Tracking Num:</span><span data-v-f18057ce>${ssrInterpolate((_a2 = product.logisticsWaybillNoList) == null ? void 0 : _a2.join(", "))}</span><img${ssrRenderAttr("src", _imports_0)} class="w-3 mx-2" data-v-f18057ce></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><span data-v-f18057ce>$${ssrInterpolate(product.priceOrdered)}×${ssrInterpolate(product.qtyOrdered)}</span></div>`);
        });
        _push(`<!--]--><div class="mt-10 p-6 rounded-lg border border-[#D9D9D9]" data-v-f18057ce><div class="flex justify-between" data-v-f18057ce><span data-v-f18057ce>Subtotal:</span><span data-v-f18057ce>$${ssrInterpolate(orderInfo.value.orderItemAmountOrdered)}</span></div><div class="flex justify-between mt-4" data-v-f18057ce><span data-v-f18057ce>Shipping:</span><span data-v-f18057ce>$${ssrInterpolate(((_a = orderInfo.value.shippingRule) == null ? void 0 : _a.calFee) || 0)}</span></div><div class="flex justify-between mt-4" data-v-f18057ce><span data-v-f18057ce>Total(excl.tax):</span><span class="text-primary-500" data-v-f18057ce>$${ssrInterpolate(orderInfo.value.orderItemAmountOrdered)}</span></div></div></div><div class="bg-white rounded-lg border border-[#D9D9D9] p-6" data-v-f18057ce><div class="flex gap-8 mb-6 text-sm sm:text-base" data-v-f18057ce><!--[-->`);
        ssrRenderList(tabs, (tab) => {
          _push(`<button class="${ssrRenderClass(`pb-4 ${activeTab.value === tab ? "font-bold text-black border-b-2 border-black" : "text-gray-500"}`)}" data-v-f18057ce>${ssrInterpolate(tab)}</button>`);
        });
        _push(`<!--]--></div>`);
        if (activeTab.value === "Pay Info") {
          _push(`<div class="space-y-4" data-v-f18057ce><div data-v-f18057ce><div class="flex items-center text-gray-600 gap-2" data-v-f18057ce><div data-v-f18057ce>Payment:</div><img${ssrRenderAttr("src", _imports_4)} class="h-8" data-v-f18057ce></div></div>`);
          if (orderInfo.value.actualPaymentTransactionSerialNumber) {
            _push(`<div class="flex items-center text-gray-600 gap-2" data-v-f18057ce><div class="font-mediumtext-sm text-gray-200" data-v-f18057ce>Transaction Num:</div><div data-v-f18057ce>${ssrInterpolate(orderInfo.value.actualPaymentTransactionSerialNumber)}</div><img${ssrRenderAttr("src", _imports_5)} class="h-4" data-v-f18057ce></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "Shipping & Address") {
          _push(`<div class="space-y-4" data-v-f18057ce><div class="bg-white rounded-xl" data-v-f18057ce><div class="mb-6" data-v-f18057ce><p class="font-semibold mb-1" data-v-f18057ce>Shipping method:</p><p class="text-sm" data-v-f18057ce>${ssrInterpolate(orderInfo.value.shippingRule.feeEnName)}</p></div><div class="text-sm" data-v-f18057ce><p class="font-semibold mb-2" data-v-f18057ce>Address:</p><div class="text-sm" data-v-f18057ce><p data-v-f18057ce><span class="text-gray-200" data-v-f18057ce>Full name:</span> ${ssrInterpolate(orderInfo.value.buyerFullName)}</p><p class="mt-2" data-v-f18057ce><span class="text-gray-200" data-v-f18057ce>Number:</span> (${ssrInterpolate(orderInfo.value.buyerPhoneAreaCode)}) ${ssrInterpolate(orderInfo.value.buyerPhoneNumber)}</p><p class="mt-2" data-v-f18057ce><span class="text-gray-200" data-v-f18057ce>Address:</span> ${ssrInterpolate(orderInfo.value.buyerCountryName)} ${ssrInterpolate(orderInfo.value.buyerStateOrProvince)} ${ssrInterpolate(orderInfo.value.buyerCity)} ${ssrInterpolate(orderInfo.value.buyerAddress)}</p><p class="mt-2" data-v-f18057ce><span class="text-gray-200" data-v-f18057ce>Zip code:</span> ${ssrInterpolate(orderInfo.value.buyerPostalCode)}</p></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "Order timeline") {
          _push(`<div class="space-y-4" data-v-f18057ce>`);
          _push(ssrRenderComponent(unref(Steps), {
            "progress-dot": "",
            current: 0,
            direction: "vertical",
            items: itemstimeline.value
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "Note") {
          _push(`<div class="space-y-4" data-v-f18057ce><div data-v-f18057ce>${ssrInterpolate(orderInfo.value.buyerNotes)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      }
      _push(`</div></div></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orderinfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const orderinfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f18057ce"]]);

export { orderinfo as default };
