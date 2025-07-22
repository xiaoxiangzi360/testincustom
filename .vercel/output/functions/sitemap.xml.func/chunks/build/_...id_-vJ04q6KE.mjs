import { _ as __nuxt_component_0 } from './Breadcrumb-BOXN2oZJ.mjs';
import { _ as __nuxt_component_1 } from './Checkbox-D2J7pcw5.mjs';
import { _ as __nuxt_component_2 } from './Select-CfGfYQzQ.mjs';
import { _ as _export_sfc, g as useRoute, h as useRouter, a as __nuxt_component_1$2 } from './server.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-g6UoxTOW.mjs';
import { _ as _imports_1 } from './virtual_public-ByL_2Wkk.mjs';
import { P as ProductAuth } from './product-9kYz4MaC.mjs';
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
import 'ant-design-vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...id]",
  __ssrInlineRender: true,
  setup(__props) {
    const sortarray = [
      "Name Alphabetic, a-z",
      "Name Alphabetic, z-a",
      "Price Low to High",
      "Price High to Low",
      "Date, Old to New",
      "Date, New to Old"
    ];
    const sortarraymapping = {
      "Name Alphabetic, a-z": {
        value: "erpProduct.ProductEnglishName",
        sort: "asc"
      },
      "Name Alphabetic, z-a": {
        value: "erpProduct.ProductEnglishName",
        sort: "desc"
      },
      "Price Low to High": {
        value: "erpProduct.customPrice",
        sort: "asc"
      },
      "Price High to Low": {
        value: "erpProduct.customPrice",
        sort: "desc"
      },
      "Date, Old to New": {
        value: "createDate",
        sort: "asc"
      },
      "Date, New to Old": {
        value: "createDate",
        sort: "desc"
      }
    };
    const selectedsort = ref(sortarray[0]);
    const selected = ref("");
    const products = ref([]);
    const loading = ref(false);
    const { getUserProductRollPage } = ProductAuth();
    const route = useRoute();
    useRouter();
    const category = route.params.id[0];
    const cateid = route.params.id[1] ?? 12;
    const breadcrumbLinks = [
      { label: "Home", to: "/", title: "Home" },
      { label: decodeURIComponent(category), to: "/categories/" + category + "/" + cateid, title: category }
    ];
    const handleChange = (value) => {
      selected.value = selected.value === value ? "" : value;
      getlistlist();
    };
    watch(selectedsort, () => {
      getlistlist();
    });
    const getlistlist = async () => {
      loading.value = true;
      try {
        const parmes = {
          catalogId: cateid,
          pageNum: 1,
          pageSize: 12,
          fields: "id,erpProduct.productEnglishName,erpProduct.customPrice,erpProduct.mainPic"
        };
        if (selectedsort.value) {
          parmes["sortKey"] = sortarraymapping[selectedsort.value].value;
          parmes["sortOrder"] = sortarraymapping[selectedsort.value].sort;
        }
        const res = await getUserProductRollPage(parmes);
        products.value = res.result.list;
      } catch (error) {
        console.error("Load product list failed:", error);
      } finally {
        loading.value = false;
      }
    };
    getlistlist();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBreadcrumb = __nuxt_component_0;
      const _component_UCheckbox = __nuxt_component_1;
      const _component_USelect = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))} data-v-ac51181f><div class="max-row py-8" data-v-ac51181f>`);
      _push(ssrRenderComponent(_component_UBreadcrumb, {
        divider: ">",
        links: breadcrumbLinks,
        class: "mb-6 text-blackcolor custom-breadcrumb text-2xl",
        ui: {
          base: "hover:underline",
          li: "text-sm font-normal text-gray-400 ",
          active: "text-customblack dark:text-primary-400 no-underline hover:no-underline",
          divider: {
            base: "px-2 text-text-gray-400 no-underline"
          }
        }
      }, null, _parent));
      _push(`<div class="relative h-[300px] overflow-hidden" data-v-ac51181f><div class="absolute inset-0" data-v-ac51181f><img${ssrRenderAttr("src", _imports_0)} class="w-full object-cover object-top" alt="hero background" data-v-ac51181f></div><div class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center" style="${ssrRenderStyle({ "text-shadow": "0px 2px 4px rgba(34,34,34,0.6)" })}" data-v-ac51181f><h1 class="text-5xl font-bold text-white mb-4" data-v-ac51181f>Shade Solutions</h1><p class="text-xl text-white" data-v-ac51181f> Transform Your Outdoor Space with Premium Sun Protection </p></div></div><div class="container mx-auto px-6 mt-12" data-v-ac51181f><div class="flex justify-between items-center mb-8" style="${ssrRenderStyle(products.value.length != 0 ? null : { display: "none" })}" data-v-ac51181f><div class="flex gap-6" data-v-ac51181f>`);
      _push(ssrRenderComponent(_component_UCheckbox, {
        checked: selected.value === "Hot Selling",
        onChange: ($event) => handleChange("Hot Selling"),
        label: "Hot Selling",
        class: "text-sm dark:bg-white"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UCheckbox, {
        checked: selected.value === "New Arrival",
        onChange: ($event) => handleChange("New Arrival"),
        label: "New Arrival",
        class: "text-sm"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UCheckbox, {
        checked: selected.value === "Discount",
        onChange: ($event) => handleChange("Discount"),
        label: "Discount",
        class: "text-sm"
      }, null, _parent));
      _push(`</div><div class="relative flex items-center" data-v-ac51181f><span class="mr-4 text-sm" data-v-ac51181f>Sort</span>`);
      _push(ssrRenderComponent(_component_USelect, {
        size: "xs",
        modelValue: selectedsort.value,
        "onUpdate:modelValue": ($event) => selectedsort.value = $event,
        options: sortarray
      }, null, _parent));
      _push(`</div></div><div class="relative min-h-[200px]" data-v-ac51181f>`);
      if (loading.value) {
        _push(`<div class="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center space-y-4" data-v-ac51181f><svg class="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-ac51181f><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-ac51181f></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" data-v-ac51181f></path></svg><div class="text-gray-500 text-sm" data-v-ac51181f>Loading products...</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="grid grid-cols-4 gap-6 mb-12" data-v-ac51181f><!--[-->`);
        ssrRenderList(4, (n) => {
          _push(`<div class="bg-white rounded-lg shadow p-4" data-v-ac51181f><div class="h-48 bg-gray-200 rounded w-full mb-4 animate-pulse" data-v-ac51181f></div><div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" data-v-ac51181f></div><div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse" data-v-ac51181f></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle(products.value.length > 0 && !loading.value ? null : { display: "none" })}" class="grid grid-cols-4 gap-6 mb-12" data-v-ac51181f><!--[-->`);
      ssrRenderList(products.value, (product, index) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/product/${product.id}/${product.erpProduct.productEnglishName}`,
          key: index,
          class: "bg-white rounded-lg cursor-pointer group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="aspect-square overflow-hidden rounded-t-lg" data-v-ac51181f${_scopeId}><img${ssrRenderAttr("src", product.erpProduct.mainPic ?? "/images/empty.jpg")}${ssrRenderAttr("alt", product.erpProduct.productEnglishName)} class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" style="${ssrRenderStyle({ "aspect-ratio": "1 / 1" })}" data-v-ac51181f${_scopeId}></div><div data-v-ac51181f${_scopeId}><h3 class="text-sm mb-2 text-customblack mt-3 line-clamp-2 cursor-default font-normal"${ssrRenderAttr("title", product.erpProduct.productEnglishName)} data-v-ac51181f${_scopeId}>${ssrInterpolate(product.erpProduct.productEnglishName)}</h3><p class="text-[#AEAEAE] mb-2 text-sm" data-v-ac51181f${_scopeId}>${ssrInterpolate(product.size)}</p><div class="flex justify-between items-center" data-v-ac51181f${_scopeId}><span class="text-base font-medium" data-v-ac51181f${_scopeId}> $${ssrInterpolate(product.erpProduct.customPrice)}</span></div></div>`);
            } else {
              return [
                createVNode("div", { class: "aspect-square overflow-hidden rounded-t-lg" }, [
                  createVNode("img", {
                    src: product.erpProduct.mainPic ?? "/images/empty.jpg",
                    alt: product.erpProduct.productEnglishName,
                    class: "w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105",
                    style: { "aspect-ratio": "1 / 1" }
                  }, null, 8, ["src", "alt"])
                ]),
                createVNode("div", null, [
                  createVNode("h3", {
                    class: "text-sm mb-2 text-customblack mt-3 line-clamp-2 cursor-default font-normal",
                    title: product.erpProduct.productEnglishName
                  }, toDisplayString(product.erpProduct.productEnglishName), 9, ["title"]),
                  createVNode("p", { class: "text-[#AEAEAE] mb-2 text-sm" }, toDisplayString(product.size), 1),
                  createVNode("div", { class: "flex justify-between items-center" }, [
                    createVNode("span", { class: "text-base font-medium" }, " $" + toDisplayString(product.erpProduct.customPrice), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="text-center my-12 flex flex-col items-center justify-center" style="${ssrRenderStyle(products.value.length === 0 && !loading.value ? null : { display: "none" })}" data-v-ac51181f><img${ssrRenderAttr("src", _imports_1)} alt="Empty" class="w-32 h-32" data-v-ac51181f><p class="text-gray-400 text-sm mt-4" data-v-ac51181f> Not Found Products </p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categories/[...id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ac51181f"]]);

export { ____id_ as default };
