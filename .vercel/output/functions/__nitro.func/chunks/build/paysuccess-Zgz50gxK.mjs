import { _ as _export_sfc, g as useRoute, a as __nuxt_component_1$2 } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { h as publicAssetsURL } from '../_/nitro.mjs';
import { useRouter } from 'vue-router';
import 'tailwind-merge';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org';
import '@unhead/schema-org/vue';
import 'ant-design-vue';
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

const _imports_0 = publicAssetsURL("/paysuccess.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "paysuccess",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const amount = route.query.totalAmount;
    const payTime = route.query.createTime;
    const payMethod = route.query.paymentMethod;
    ref(null);
    const orderNo = route.query.orderNo;
    const currency = route.query.currency;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-row" }, _attrs))} data-v-0da7fce6><div class="flex flex-col items-center justify-center bg-white mt-4 p-4" data-v-0da7fce6><div class="mb-6" data-v-0da7fce6><img${ssrRenderAttr("src", _imports_0)} alt="Success" class="p-2 w-52" data-v-0da7fce6></div><h1 class="text-2xl font-semibold mb-4" data-v-0da7fce6>Payment Successful</h1><p class="text-gray-500 text-center mb-6" data-v-0da7fce6> You have completed the order payment<br data-v-0da7fce6> now you can check the order detail or return to the homepage to continue to go shipping </p><h1 class="text-base font-semibold mb-4" data-v-0da7fce6>Pay info</h1><div class="bg-[#F5FCFE] w-full rounded-lg shadow-sm p-8 text-sm mb-8" data-v-0da7fce6><div class="grid grid-cols-4 gap-y-4 gap-x-4 text-gray-500 text-sm" data-v-0da7fce6><div class="text-right" data-v-0da7fce6>Amount Pay:</div><div class="text-left text-primary font-medium" data-v-0da7fce6>${ssrInterpolate(unref(currency))} ${ssrInterpolate(unref(amount))}</div><div class="text-right" data-v-0da7fce6>Order No.:</div><div class="text-left text-black" data-v-0da7fce6>${ssrInterpolate(unref(orderNo) || "")}</div><div class="text-right" data-v-0da7fce6>Payment Time:</div><div class="text-left text-black" data-v-0da7fce6>${ssrInterpolate(unref(payTime) || "")}</div><div class="text-right" data-v-0da7fce6>Payment Method:</div><div class="text-left text-black" data-v-0da7fce6>${ssrInterpolate(unref(payMethod) || "PayPal")}</div></div></div><div class="flex gap-12 my-6" data-v-0da7fce6>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="bg-primary text-white px-6 py-2 rounded hover:bg-primary-600 transition text-base" data-v-0da7fce6${_scopeId}>Go Shipping</button>`);
          } else {
            return [
              createVNode("button", { class: "bg-primary text-white px-6 py-2 rounded hover:bg-primary-600 transition text-base" }, "Go Shipping")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/orderinfo?orderNumber=${unref(orderNo)}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-100 transition text-base" data-v-0da7fce6${_scopeId}>View Order Details</button>`);
          } else {
            return [
              createVNode("button", { class: "border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-100 transition text-base" }, "View Order Details")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/paysuccess.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const paysuccess = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0da7fce6"]]);

export { paysuccess as default };
