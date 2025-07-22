import { _ as _sfc_main$1 } from './Userleft-C3owAP1G.mjs';
import { _ as _export_sfc, u as useCookie, c as __nuxt_component_5 } from './server.mjs';
import { _ as __nuxt_component_4 } from './Pagination-BEDIsYtf.mjs';
import { A as AddressAuth, _ as __nuxt_component_3 } from './AddressModal-BOL0YON7.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { h as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _imports_0$1 } from './virtual_public-DOvymBfg.mjs';
import 'vue-router';
import 'tailwind-merge';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org';
import '@unhead/schema-org/vue';
import 'ant-design-vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import './Modal-DW14wYHj.mjs';
import './transition-DT3phGok.mjs';
import './hidden-BKyvU3BW.mjs';
import './keyboard-Duq8EHr3.mjs';
import './active-element-history-BbzAu_2T.mjs';
import './open-closed-BDzQJ33n.mjs';
import './Card-BmnXDPH2.mjs';
import './location-BxTFTaaq.mjs';
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

const _imports_0 = publicAssetsURL("/edit.png");
const _sfc_main = {
  __name: "userinfo",
  __ssrInlineRender: true,
  setup(__props) {
    const page = ref(1);
    ref(Array(55));
    const addresscount = ref(0);
    const addressinfo = ref({});
    const { getuserAddressRollPage } = AddressAuth();
    const userinfo2 = useCookie("userinfo");
    const showModal = ref(false);
    const addressarr = ref([]);
    const getAddresslist = async () => {
      try {
        let params = {};
        let res = await getuserAddressRollPage(params);
        let addressist = res.result.records;
        addressarr.value = addressist;
        addresscount.value = res.result.total;
      } catch (error) {
      }
    };
    getAddresslist();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Userleft = _sfc_main$1;
      const _component_UIcon = __nuxt_component_5;
      const _component_UPagination = __nuxt_component_4;
      const _component_AddressModal = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))} data-v-ebc12f69><div class="flex flex-col md:flex-row min-h-screen text-sm max-row" data-v-ebc12f69>`);
      _push(ssrRenderComponent(_component_Userleft, null, null, _parent));
      _push(`<main class="flex-1 p-4 md:p-6 space-y-6 bg-white" data-v-ebc12f69><section class="border border-blackcolor/10 rounded-lg" data-v-ebc12f69><div class="p-4 md:px-6 text-customblack font-semibold text-lg" data-v-ebc12f69>Account</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 border-t border-t-blackcolor/10 p-4 md:p-6" data-v-ebc12f69><div data-v-ebc12f69><span class="text-blackcolor/50 mb-2" data-v-ebc12f69>Account email</span><div class="font-medium mt-1" data-v-ebc12f69>${ssrInterpolate(unref(userinfo2).email)}</div></div><div data-v-ebc12f69><span class="text-blackcolor/50 mb-2" data-v-ebc12f69>Password</span><div class="mt-1" data-v-ebc12f69><a href="#" class="text-primary-500 hover:underline" data-v-ebc12f69>Set New Password</a></div></div><div data-v-ebc12f69><span class="text-blackcolor/50 mb-2" data-v-ebc12f69>Full name</span><div class="font-medium mt-1" data-v-ebc12f69>${ssrInterpolate(unref(userinfo2).fullName)}</div></div><div data-v-ebc12f69><span class="text-blackcolor/50 mb-2" data-v-ebc12f69>Number</span><div class="font-medium mt-1" data-v-ebc12f69>${ssrInterpolate(unref(userinfo2).numberAreaCode)} ${ssrInterpolate(unref(userinfo2).number)}</div></div></div></section><section class="border border-blackcolor/10 rounded-lg" data-v-ebc12f69><div class="p-4 md:px-6 text-customblack font-semibold text-lg" data-v-ebc12f69>Address</div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 border-t border-t-blackcolor/10 p-4 md:p-6" data-v-ebc12f69><div class="flex items-center justify-center border border-blackcolor/10 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-400 min-h-36 text-center" data-v-ebc12f69><div data-v-ebc12f69>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols:add",
        class: "text-red-400 text-base"
      }, null, _parent));
      _push(`<div class="text-gray-400" data-v-ebc12f69>Add Address</div></div></div><!--[-->`);
      ssrRenderList(addressarr.value, (item, idx) => {
        _push(`<div class="${ssrRenderClass([{ "border-primary-500 bg-primary-50": item.master == 1 }, "relative border border-blackcolor/10 rounded-lg p-3 hover:shadow cursor-pointer"])}" data-v-ebc12f69><div class="space-y-1 text-sm" data-v-ebc12f69><p data-v-ebc12f69><span class="text-gray-500" data-v-ebc12f69>Full name:</span> ${ssrInterpolate(item.firstName)}${ssrInterpolate(item.lastName)}</p><p data-v-ebc12f69><span class="text-gray-500" data-v-ebc12f69>Number:</span> (${ssrInterpolate(item.numberCode)}) ${ssrInterpolate(item.number)}</p><p data-v-ebc12f69><span class="text-gray-500" data-v-ebc12f69>Address:</span> ${ssrInterpolate(item.countryName)} ${ssrInterpolate(item.provinceName)} ${ssrInterpolate(item.city)} ${ssrInterpolate(item.address)}</p></div>`);
        if (item.master == 1) {
          _push(`<span class="absolute top-0 right-0 bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded" data-v-ebc12f69> Default </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<img${ssrRenderAttr("src", _imports_0)} class="w-5 absolute top-6 right-2" data-v-ebc12f69>`);
        if (item.master != 1) {
          _push(`<img${ssrRenderAttr("src", _imports_0$1)} class="w-5 absolute top-12 right-2" data-v-ebc12f69>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></section><div class="flex justify-center md:justify-end mt-4" data-v-ebc12f69>`);
      _push(ssrRenderComponent(_component_UPagination, {
        modelValue: page.value,
        "onUpdate:modelValue": ($event) => page.value = $event,
        "page-count": 5,
        total: addresscount.value,
        "prev-button": { icon: "i-material-symbols:chevron-left" },
        "next-button": { icon: "i-material-symbols:chevron-right" }
      }, null, _parent));
      _push(`</div></main></div>`);
      _push(ssrRenderComponent(_component_AddressModal, {
        isshow: showModal.value,
        onClose: ($event) => showModal.value = false,
        addressinfo: addressinfo.value,
        onUpdateData: ($event) => getAddresslist()
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/userinfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userinfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ebc12f69"]]);

export { userinfo as default };
