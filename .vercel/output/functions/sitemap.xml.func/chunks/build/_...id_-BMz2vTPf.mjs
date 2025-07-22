import { _ as __nuxt_component_0 } from './NuxtImg-CB91evk_.mjs';
import { _ as __nuxt_component_2$1 } from './Badge-C4qFuzNw.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { h as publicAssetsURL } from '../_/nitro.mjs';
import { _ as __nuxt_component_6 } from './SelectMenu-CA8fbto0.mjs';
import { _ as _export_sfc, g as useRoute, r as useHead, G as useServerHead, e as __nuxt_component_7, J as createError } from './server.mjs';
import { u as useFetch } from './fetch-C1G-oQrA.mjs';
import { u as useOptimizeImage } from './optimize-image-BybfjNrn.mjs';
import './composables-CEJS1CB5.mjs';
import 'tailwind-merge';
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
import '@tanstack/vue-virtual';
import './active-element-history-BbzAu_2T.mjs';
import './hidden-BKyvU3BW.mjs';
import './keyboard-Duq8EHr3.mjs';
import './use-resolve-button-type-DOOP2SMg.mjs';
import './open-closed-BDzQJ33n.mjs';
import './usePopper-BrvKSG9Z.mjs';
import './useFormGroup-XFEs-B9Y.mjs';
import 'vue-router';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import 'ant-design-vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import '@vue/shared';
import './asyncData-BM85lZNa.mjs';

const _imports_0 = publicAssetsURL("/stars.webp");
const _imports_1 = publicAssetsURL("/stars-filled.webp");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StarsRate",
  __ssrInlineRender: true,
  props: {
    value: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const style = computed(() => ({
      "clip-path": `inset(0 ${(10 - props.value) * 10}% 0 0)`
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "aspect-auto relative" }, _attrs))}><img${ssrRenderAttr("src", _imports_0)} class="absolute inset-0" aria-hidden="true"><img${ssrRenderAttr("src", _imports_1)} class="absolute inset-0" aria-hidden="true" style="${ssrRenderStyle(unref(style))}"></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StarsRate.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "StarsRate" });
const useProduct = async (productId) => {
  const { data: product, error } = await useFetch(
    `/api/store/local-data/${productId}`,
    "$pNhFAxKZ9v"
  );
  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Couldn't fetch product id ${productId}.`
    });
  }
  const fetchProduct = () => {
    const { optimizeImage } = useOptimizeImage();
    return product.value.image ? {
      ...product.value,
      imageOptimized: optimizeImage(product.value.image)
    } : product.value;
  };
  return { product, fetchProduct };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { id: productId } = route.params;
    const { fetchProduct } = ([__temp, __restore] = withAsyncContext(() => useProduct(+productId)), __temp = await __temp, __restore(), __temp);
    const { title, price, description, image, rating, badge, shipping } = fetchProduct();
    useHead({
      title: title || ""
    });
    useServerHead({
      meta: [
        { name: "description", content: () => description || "" }
      ]
    });
    const colors = [
      {
        id: 1,
        name: "Gray"
      },
      {
        id: 2,
        name: "Black"
      },
      {
        id: 3,
        name: "White"
      },
      {
        id: 4,
        name: "Blue"
      }
    ];
    const selected = ref(colors[0].id);
    const current = computed(
      () => colors.find((color) => color.id === selected.value)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      const _component_UBadge = __nuxt_component_2$1;
      const _component_StarsRate = __nuxt_component_2;
      const _component_USelectMenu = __nuxt_component_6;
      const _component_UButton = __nuxt_component_7;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-4 my-16 product-details" }, _attrs))} data-v-78699987><div class="flex justify-center max-h-96 xl:max-h-[600px]" data-v-78699987><div class="-m-4 bg-white p-8 rounded-lg" data-v-78699987>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: unref(image),
        class: "max-h-full"
      }, null, _parent));
      _push(`</div></div><div class="mt-8 md:mt-0 md:mx-8" data-v-78699987><div class="relative" data-v-78699987>`);
      if (unref(badge)) {
        _push(ssrRenderComponent(_component_UBadge, {
          label: unref(badge),
          class: "-top-7 absolute"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 data-v-78699987>${ssrInterpolate(unref(title))}</h3></div><div class="flex items-center justify-between mt-2" data-v-78699987><div class="flex" data-v-78699987><div data-v-78699987>`);
      _push(ssrRenderComponent(_component_StarsRate, {
        class: "mt-0.5 w-24",
        value: unref(rating).rate
      }, null, _parent));
      _push(`</div><div class="ml-2" data-v-78699987><div class="text-sm" data-v-78699987>${ssrInterpolate(unref(rating).count)} reviews</div></div></div><div class="md:mr-4" data-v-78699987><span class="dark:text-primary-400 text-primary-500 text-xs" data-v-78699987>${ssrInterpolate(unref(shipping))}</span></div></div>`);
      if (unref(badge) || unref(shipping)) {
        _push(`<div class="flex items-center justify-between mt-4" data-v-78699987><div data-v-78699987><span class="font-bold text-xl" data-v-78699987>$${ssrInterpolate(unref(price))}</span></div><div class="md:mr-4" data-v-78699987><span data-v-78699987>Best Deals Inc.</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-78699987><div class="mt-4" data-v-78699987>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(selected),
        "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null,
        options: colors,
        "option-attribute": "name",
        "value-attribute": "id",
        size: "xl"
      }, {
        label: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-78699987${_scopeId}>${ssrInterpolate(unref(current).name)}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(current).name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-4 w-full" data-v-78699987>`);
      _push(ssrRenderComponent(_component_UButton, {
        label: "Add To Cart",
        class: "rounded-lg",
        size: "lg",
        block: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="py-2 lg:text-lg" data-v-78699987${_scopeId}>Add To Cart</span>`);
          } else {
            return [
              createVNode("span", { class: "py-2 lg:text-lg" }, "Add To Cart")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="mt-8" data-v-78699987><span data-v-78699987>${ssrInterpolate(unref(description))}</span></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/store/[...id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78699987"]]);

export { ____id_ as default };
