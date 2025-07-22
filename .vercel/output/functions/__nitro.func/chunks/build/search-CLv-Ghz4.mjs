import { _ as __nuxt_component_2 } from './Select-CfGfYQzQ.mjs';
import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_1 } from './virtual_public-ByL_2Wkk.mjs';
import { message } from 'ant-design-vue';
import { P as ProductAuth } from './product-9kYz4MaC.mjs';
import { _ as _export_sfc, g as useRoute, h as useRouter } from './server.mjs';
import 'tailwind-merge';
import './useFormGroup-XFEs-B9Y.mjs';
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
import 'vue-router';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const sortarray = [
      "Best match",
      "Price Low to High",
      "Price High to Low"
    ];
    const sortarraymapping = {
      "Best match": {
        value: "",
        sort: ""
      },
      "Price Low to High": {
        value: "customPrice",
        sort: "asc"
      },
      "Price High to Low": {
        value: "customPrice",
        sort: "desc"
      }
    };
    const recommendLoading = ref(false);
    const selectedsort = ref(sortarray[0]);
    ref("");
    const products = ref([]);
    const loading = ref(false);
    const recommendproducts = ref([]);
    const { getproductSearch, productSearchRecommendation } = ProductAuth();
    const route = useRoute();
    useRouter();
    const keyword = route.query.query;
    const lastPublishTime = ref(0);
    watch(selectedsort, () => {
      getlistlist();
    });
    const getlistlist = async () => {
      loading.value = true;
      try {
        const parmes = {
          keyword,
          pageNum: 1,
          pageSize: 12
        };
        if (selectedsort.value) {
          parmes["sortKey"] = sortarraymapping[selectedsort.value].value;
          parmes["sortOrder"] = sortarraymapping[selectedsort.value].sort;
        }
        const res = await getproductSearch(parmes);
        products.value = res.result.list;
        if (res.result.list.length == 0) {
          getproductSearchRecommendation();
        }
      } catch (error) {
        console.error("Load product list failed:", error);
        getproductSearchRecommendation();
      } finally {
        loading.value = false;
      }
    };
    const getproductSearchRecommendation = async () => {
      recommendLoading.value = true;
      try {
        const parmes = {
          lastPublishTime: lastPublishTime.value
        };
        const res = await productSearchRecommendation(parmes);
        if (res.result.list.length > 0) {
          recommendproducts.value = res.result.list;
          lastPublishTime.value = res.result.list[res.result.list.length - 1]["publishTime"];
        } else {
          message.warning("No more Products");
        }
      } catch (error) {
        console.error("Load product list failed:", error);
      } finally {
        recommendLoading.value = false;
      }
    };
    getlistlist();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelect = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))} data-v-aa59bea3><div class="max-row py-6" data-v-aa59bea3><div class="container mx-auto px-6 mt-6" data-v-aa59bea3><div class="sticky [top:122px] bg-white z-10 flex justify-between items-center mb-8 py-4" data-v-aa59bea3><div class="flex gap-6" data-v-aa59bea3></div><div class="relative flex items-center" style="${ssrRenderStyle(products.value.length != 0 ? null : { display: "none" })}" data-v-aa59bea3><span class="mr-4 text-sm" data-v-aa59bea3>Sort</span>`);
      _push(ssrRenderComponent(_component_USelect, {
        size: "xs",
        modelValue: selectedsort.value,
        "onUpdate:modelValue": ($event) => selectedsort.value = $event,
        options: sortarray
      }, null, _parent));
      _push(`</div></div><div class="relative min-h-[200px]" data-v-aa59bea3>`);
      if (loading.value) {
        _push(`<div class="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center space-y-4" data-v-aa59bea3><svg class="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-aa59bea3><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-aa59bea3></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" data-v-aa59bea3></path></svg><div class="text-gray-500 text-sm" data-v-aa59bea3>Loading products...</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="grid grid-cols-4 gap-6 mb-12" data-v-aa59bea3><!--[-->`);
        ssrRenderList(4, (n) => {
          _push(`<div class="bg-white rounded-lg shadow p-4" data-v-aa59bea3><div class="h-48 bg-gray-200 rounded w-full mb-4 animate-pulse" data-v-aa59bea3></div><div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" data-v-aa59bea3></div><div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse" data-v-aa59bea3></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle(products.value.length > 0 && !loading.value ? null : { display: "none" })}" class="grid grid-cols-4 gap-6 mb-12" data-v-aa59bea3><!--[-->`);
      ssrRenderList(products.value, (product, index) => {
        _push(`<div class="bg-white rounded-lg cursor-pointer group" data-v-aa59bea3><div class="aspect-square overflow-hidden rounded-t-lg" data-v-aa59bea3><img${ssrRenderAttr("src", product.productMainPic ?? "/images/empty.jpg")}${ssrRenderAttr("alt", product.productEnglishName)} class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" style="${ssrRenderStyle({ "aspect-ratio": "1 / 1" })}" data-v-aa59bea3></div><div data-v-aa59bea3><h3 class="text-sm font-normal mb-2 text-customblack mt-3 line-clamp-2 cursor-default"${ssrRenderAttr("title", product.productEnglishName)} data-v-aa59bea3>${ssrInterpolate(product.productEnglishName)}</h3><p class="text-[#AEAEAE] mb-2 text-sm" data-v-aa59bea3>${ssrInterpolate(product.size)}</p><div class="flex justify-between items-center" data-v-aa59bea3><span class="text-base font-semibold text-primary" data-v-aa59bea3> $${ssrInterpolate(product.customPriceStr)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="my-12" style="${ssrRenderStyle(products.value.length === 0 && !loading.value ? null : { display: "none" })}" data-v-aa59bea3><div class="flex flex-col items-center text-center space-y-4 text-gray-200 text-sm" data-v-aa59bea3><img${ssrRenderAttr("src", _imports_1)} alt="Empty" class="w-32 h-32" data-v-aa59bea3><div data-v-aa59bea3><div class="mt-2" data-v-aa59bea3>No results for “${ssrInterpolate(unref(keyword))}”</div><div class="mt-2" data-v-aa59bea3>Try checking your spelling or use more general terms</div><div class="mt-2" data-v-aa59bea3>Check each product page for other buying options.</div></div></div></div><div class="flex justify-between items-center text-customblack text-xl mb-2" style="${ssrRenderStyle(products.value.length === 0 && !loading.value ? null : { display: "none" })}" data-v-aa59bea3><span data-v-aa59bea3>New Product</span><button class="text-sm text-gray-500 hover:text-primary hover:underline" data-v-aa59bea3> Refresh the items </button></div>`);
      if (recommendLoading.value) {
        _push(`<div class="grid grid-cols-5 gap-4 mb-12 mt-4" data-v-aa59bea3><!--[-->`);
        ssrRenderList(5, (n) => {
          _push(`<div class="bg-white rounded-lg shadow" data-v-aa59bea3><div class="aspect-square bg-gray-200 rounded w-full mb-4 animate-pulse h-44" data-v-aa59bea3></div><div class="h-8 bg-gray-200 rounded w-full mb-2 animate-pulse" data-v-aa59bea3></div><div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse" data-v-aa59bea3></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle(recommendproducts.value.length > 0 && !recommendLoading.value ? null : { display: "none" })}" class="grid grid-cols-5 gap-4 mb-12 mt-4" data-v-aa59bea3><!--[-->`);
      ssrRenderList(recommendproducts.value, (product, index) => {
        _push(`<div class="bg-white rounded-lg cursor-pointer group" data-v-aa59bea3><div class="aspect-square overflow-hidden rounded-t-lg" data-v-aa59bea3><img${ssrRenderAttr("src", product.productMainPic ?? "/images/empty.jpg")}${ssrRenderAttr("alt", product.productEnglishName)} class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" style="${ssrRenderStyle({ "aspect-ratio": "1 / 1" })}" data-v-aa59bea3></div><div data-v-aa59bea3><h3 class="text-sm mb-2 font-normal text-customblack mt-3 line-clamp-2 cursor-default"${ssrRenderAttr("title", product.productEnglishName)} data-v-aa59bea3>${ssrInterpolate(product.productEnglishName)}</h3><p class="text-[#AEAEAE] mb-2 text-sm" data-v-aa59bea3>${ssrInterpolate(product.size)}</p><div class="flex justify-between items-center" data-v-aa59bea3><span class="text-base font-semibold text-primary" data-v-aa59bea3> $${ssrInterpolate(product.customPriceStr)}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const search = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aa59bea3"]]);

export { search as default };
