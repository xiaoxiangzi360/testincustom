import { _ as _export_sfc, u as useCookie, a as __nuxt_component_1$2 } from './server.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-DOvymBfg.mjs';
import { Tooltip } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { c as cartAuth, u as useCartStore } from './cart-DGSyKrC3.mjs';
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
import 'tailwind-merge';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';

const min = 1;
const max = 999;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const { getCart } = cartAuth();
    useRouter();
    const cart2 = useCartStore();
    ref("cart");
    const selectAll = ref(false);
    const shipping = ref(0);
    const selectedItems = computed(() => cart2.itemList.filter((item) => item.selected));
    const selectedTotal = computed(() => {
      return selectedItems.value.reduce((total, item) => total + item.product.skuSpec.customPrice * item.productQuantity, 0);
    });
    const selectedQuantity = computed(() => {
      return selectedItems.value.reduce((sum, item) => sum + item.productQuantity, 0);
    });
    const Invalidlist = ref([]);
    const handleGetCart = async () => {
      try {
        let res = await getCart();
        let result = res.result;
        cart2.updateCart(result);
        Invalidlist.value = res.saleDownList;
        setSelectAll();
      } catch (error) {
      }
    };
    const token = useCookie("token");
    const isTokenValid = computed(() => !!token.value);
    if (isTokenValid) {
      handleGetCart();
    }
    const setSelectAll = () => {
      selectAll.value = !selectAll.value;
      cart2.itemList.forEach((item) => {
        item.selected = selectAll.value;
      });
    };
    watch(() => cart2.itemList, (newvalue, oldvalue) => {
      if (newvalue) {
        cart2.updateCart(cart2.itemList);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F8F8F8]" }, _attrs))} data-v-b86a09ee><div class="max-w-7xl mx-auto px-4 py-8" data-v-b86a09ee><div class="text-lg mb-6 font-bold dark:text-black" data-v-b86a09ee>Shopping Cart</div><div class="rounded-lg shadow-sm" data-v-b86a09ee><div class="flex flex-col lg:flex-row gap-8 items-stretch" data-v-b86a09ee><div class="flex-1" data-v-b86a09ee><table class="w-full bg-white rounded" data-v-b86a09ee><thead class="shadow-sm" data-v-b86a09ee><tr class="p-6" data-v-b86a09ee><th class="pb-4 text-left p-6 w-8" data-v-b86a09ee><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(selectAll.value) ? ssrLooseContain(selectAll.value, null) : selectAll.value) ? " checked" : ""} class="rounded" data-v-b86a09ee></th><th class="pb-4 text-left font-bold text-gray-600 p-6 w-80 bg-blue" data-v-b86a09ee>Product </th><th class="pb-4 text-center font-bold text-gray-600 p-6" data-v-b86a09ee>Price($)</th><th class="pb-4 text-center font-bold text-gray-600 p-6 w-28" data-v-b86a09ee>Qty</th><th class="pb-4 text-center font-bold text-gray-600 p-6" data-v-b86a09ee>Subtotal($)</th><th class="pb-4 text-center font-bold text-gray-600 p-6" data-v-b86a09ee>Action</th></tr></thead></table><div class="max-h-[75vh] md:overflow-y-auto mt-4" data-v-b86a09ee><table class="w-full bg-white rounded" data-v-b86a09ee><tbody class="block" data-v-b86a09ee><!--[-->`);
      ssrRenderList(unref(cart2).itemList, (item, index) => {
        _push(`<tr class="${ssrRenderClass([
          "p-6 border-solid border-[#F8F8F8]",
          index !== unref(cart2).itemList.length - 1 ? "border-b" : ""
        ])}" data-v-b86a09ee><td class="py-4 p-6 w-8 bg-blue" data-v-b86a09ee><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(item.selected) ? ssrLooseContain(item.selected, null) : item.selected) ? " checked" : ""} class="rounded" data-v-b86a09ee></td><td class="py-4 w-80" data-v-b86a09ee><div class="flex items-center gap-4" data-v-b86a09ee><div class="w-24 h-24 overflow-hidden rounded-lg" data-v-b86a09ee><img${ssrRenderAttr("src", item.product.erpProduct.mainPic)} alt="Product image" class="w-24 h-24 object-cover cursor-pointer" data-v-b86a09ee></div><div class="w-52" data-v-b86a09ee>`);
        _push(ssrRenderComponent(unref(Tooltip), {
          color: "white",
          overlayInnerStyle: { color: "#333" },
          title: item.product.erpProduct.productEnglishName,
          overlayStyle: { maxWidth: "300px", whiteSpace: "pre-line", wordBreak: "break-word" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-lg text-blackcolor truncate-1-lines max-w-52" data-v-b86a09ee${_scopeId}>${ssrInterpolate(item.product.erpProduct.productEnglishName)}</div>`);
            } else {
              return [
                createVNode("div", { class: "text-lg text-blackcolor truncate-1-lines max-w-52" }, toDisplayString(item.product.erpProduct.productEnglishName), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(unref(Tooltip), {
          color: "white",
          overlayInnerStyle: { color: "#333" },
          title: item.product.skuSpec.specAttr,
          overlayStyle: { maxWidth: "300px", whiteSpace: "pre-line", wordBreak: "break-word" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-sm text-[#8E8E8E] truncate-1-lines max-w-52 mt-1" data-v-b86a09ee${_scopeId}>${ssrInterpolate(item.product.skuSpec.specAttr)}</div>`);
            } else {
              return [
                createVNode("div", { class: "text-sm text-[#8E8E8E] truncate-1-lines max-w-52 mt-1" }, toDisplayString(item.product.skuSpec.specAttr), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></td><td class="py-4 pl-4 text-center p-6 text-gray-900" data-v-b86a09ee>${ssrInterpolate(item.product.skuSpec.customPrice.toFixed(2))}</td><td class="py-4 text-center w-28" data-v-b86a09ee><div class="flex items-center border rounded-md w-24 justify-between px-2" data-v-b86a09ee><button class="text-gray-500 hover:text-black disabled:text-gray-300"${ssrIncludeBooleanAttr(item.productQuantity <= min) ? " disabled" : ""} data-v-b86a09ee> - </button><input${ssrRenderAttr("value", item.productQuantity)} class="w-12 h-8 text-center outline-none border-none focus:ring-0 focus:outline-none"${ssrRenderAttr("min", min)}${ssrRenderAttr("max", max)} data-v-b86a09ee><button class="text-gray-500 hover:text-black disabled:text-gray-300"${ssrIncludeBooleanAttr(item.productQuantity >= max) ? " disabled" : ""} data-v-b86a09ee> + </button></div></td><td class="py-4 pl-4 text-center p-6 text-gray-900" data-v-b86a09ee>${ssrInterpolate((item.product.skuSpec.customPrice * item.productQuantity).toFixed(2))}</td><td class="py-4 pl-4 text-center p-6" data-v-b86a09ee><img${ssrRenderAttr("src", _imports_0)} class="w-6 cursor-pointer" data-v-b86a09ee></td></tr>`);
      });
      _push(`<!--]-->`);
      if (unref(cart2).itemList.length === 0) {
        _push(`<tr data-v-b86a09ee><td colspan="6" class="text-center py-10 text-gray-400 p-6" data-v-b86a09ee><div class="bg-white rounded-lg flex flex-col items-center justify-center h-80 px-8" data-v-b86a09ee><p class="text-black" data-v-b86a09ee>There are no more items in your cart</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-8"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go shopping `);
            } else {
              return [
                createTextVNode(" Go shopping ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table><div class="flex justify-between items-center my-6" style="${ssrRenderStyle(Invalidlist.value.length > 0 ? null : { display: "none" })}" data-v-b86a09ee><div data-v-b86a09ee>Discontinued product</div><div data-v-b86a09ee><button class="text-primary hover:text-primary-600 mr-4" data-v-b86a09ee>Delete All</button></div></div><table class="w-full bg-white rounded" data-v-b86a09ee><tbody class="md:max-h-[480px] md:overflow-y-auto block" data-v-b86a09ee><!--[-->`);
      ssrRenderList(Invalidlist.value, (item, index) => {
        _push(`<tr class="${ssrRenderClass([
          "p-6 border-solid border-[#F8F8F8]",
          index !== unref(cart2).itemList.length - 1 ? "border-b" : ""
        ])}" data-v-b86a09ee><td class="py-4 pl-6 p-6" data-v-b86a09ee><div class="flex items-center gap-6" data-v-b86a09ee><div class="w-24 h-24 overflow-hidden rounded relative cursor-pointer" data-v-b86a09ee><img${ssrRenderAttr("src", item.product ? item.product.erpProduct.mainPic : "")} alt="Product image" class="w-full h-full object-cover" data-v-b86a09ee><div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" data-v-b86a09ee><span class="text-white text-base" data-v-b86a09ee>Invalid</span></div></div><div data-v-b86a09ee><div class="font-medium text-lg" data-v-b86a09ee>${ssrInterpolate(item.product ? item.product.erpProduct.productEnglishName : "")}</div><p class="text-sm text-gray-500" data-v-b86a09ee>${ssrInterpolate(item.product.skuSpec.specAttr)}</p></div></div></td><td class="py-4 pl-4 text-center p-6" data-v-b86a09ee></td><td class="py-4 pl-4 text-center p-6" data-v-b86a09ee></td><td class="py-4 pl-4 text-center p-6" data-v-b86a09ee></td><td class="py-4 pl-4 text-center p-6" data-v-b86a09ee></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="mt-4 flex items-center gap-6 p-6 bg-white sticky bottom-0 shadow-md" data-v-b86a09ee><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(selectAll.value) ? ssrLooseContain(selectAll.value, null) : selectAll.value) ? " checked" : ""} class="rounded" data-v-b86a09ee><span class="text-gray-600" data-v-b86a09ee><span class="font-normal mr-2 cursor-pointer" data-v-b86a09ee>Select all</span> (select ${ssrInterpolate(selectedQuantity.value)} items)</span><button${ssrIncludeBooleanAttr(selectedItems.value.length === 0) ? " disabled" : ""} class="text-primary hover:text-primary-600 disabled:text-gray-300 disabled:cursor-not-allowed" data-v-b86a09ee> Delete </button></div></div><div class="md:w-80 bg-white rounded-lg shadow-sm flex flex-col justify-between min-h-[200px]" data-v-b86a09ee><div class="p-6" data-v-b86a09ee><div class="flex justify-between text-gray-600" data-v-b86a09ee><span data-v-b86a09ee>Selected ${ssrInterpolate(selectedQuantity.value)} items</span><span data-v-b86a09ee>$${ssrInterpolate(selectedTotal.value.toFixed(2))}</span></div><div class="flex justify-between mt-4 text-gray-600" data-v-b86a09ee><span data-v-b86a09ee>Shipping</span><span data-v-b86a09ee>$${ssrInterpolate(shipping.value.toFixed(2))}</span></div><div class="pt-4 flex justify-between font-bold mt-4 text-gray-600" data-v-b86a09ee><span data-v-b86a09ee>Total</span><span data-v-b86a09ee>$${ssrInterpolate((selectedTotal.value + shipping.value).toFixed(2))}</span></div></div><button class="!rounded-button rounded w-full bg-primary text-white py-3 whitespace-nowrap sticky bottom-1" data-v-b86a09ee> Checkout </button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b86a09ee"]]);

export { cart as default };
