import { _ as __nuxt_component_0 } from './Container-D1zN4Htt.mjs';
import { g as useRoute, r as useHead, G as useServerHead, I as useState, e as __nuxt_component_7, J as createError, a as __nuxt_component_1$2 } from './server.mjs';
import { _ as __nuxt_component_5 } from './Card-BmnXDPH2.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-CB91evk_.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, unref, createBlock, createCommentVNode, createVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-C1G-oQrA.mjs';
import { u as useOptimizeImage } from './optimize-image-BybfjNrn.mjs';
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
import 'vue-router';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import 'ant-design-vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import './composables-CEJS1CB5.mjs';
import '@vue/shared';
import './asyncData-BM85lZNa.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    id: {},
    title: {},
    price: {},
    description: {},
    category: {},
    image: {},
    imageOptimized: {},
    rating: {},
    badge: {},
    shipping: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_UCard = __nuxt_component_5;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: "m-4 relative w-full md:w-1/3 lg:w-1/4 xl:w-1/5",
        to: `/store/${_ctx.id}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.badge) {
              _push2(`<span class="absolute bg-primary font-serif p-1 right-0 rounded-bl-md rounded-br-none rounded-tl-none rounded-tr-md text-white text-xs z-10"${_scopeId}>${ssrInterpolate(_ctx.badge)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_UCard, { class: "md:h-full" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center"${_scopeId2}><div class="-m-4 bg-white h-64 p-6 rounded-lg"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtImg, {
                    class: "max-h-full",
                    src: _ctx.image,
                    height: "250"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("div", { class: "-m-4 bg-white h-64 p-6 rounded-lg" }, [
                        createVNode(_component_NuxtImg, {
                          class: "max-h-full",
                          src: _ctx.image,
                          height: "250"
                        }, null, 8, ["src"])
                      ])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><span${_scopeId2}>${ssrInterpolate(_ctx.title)}</span><div class="flex font-medium items-center justify-between mt-4"${_scopeId2}><span class="font-bold"${_scopeId2}>$${ssrInterpolate(_ctx.price)}</span>`);
                  if (_ctx.shipping) {
                    _push3(`<span class="dark:text-primary-400 text-primary-500 text-xs"${_scopeId2}>${ssrInterpolate(_ctx.shipping)}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("span", null, toDisplayString(_ctx.title), 1),
                      createVNode("div", { class: "flex font-medium items-center justify-between mt-4" }, [
                        createVNode("span", { class: "font-bold" }, "$" + toDisplayString(_ctx.price), 1),
                        _ctx.shipping ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "dark:text-primary-400 text-primary-500 text-xs"
                        }, toDisplayString(_ctx.shipping), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              _ctx.badge ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute bg-primary font-serif p-1 right-0 rounded-bl-md rounded-br-none rounded-tl-none rounded-tr-md text-white text-xs z-10"
              }, toDisplayString(_ctx.badge), 1)) : createCommentVNode("", true),
              createVNode(_component_UCard, { class: "md:h-full" }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "-m-4 bg-white h-64 p-6 rounded-lg" }, [
                      createVNode(_component_NuxtImg, {
                        class: "max-h-full",
                        src: _ctx.image,
                        height: "250"
                      }, null, 8, ["src"])
                    ])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("span", null, toDisplayString(_ctx.title), 1),
                    createVNode("div", { class: "flex font-medium items-center justify-between mt-4" }, [
                      createVNode("span", { class: "font-bold" }, "$" + toDisplayString(_ctx.price), 1),
                      _ctx.shipping ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "dark:text-primary-400 text-primary-500 text-xs"
                      }, toDisplayString(_ctx.shipping), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "ProductCard" });
const useProducts = async () => {
  const { data, error } = await useFetch("/api/store/local-data", "$-timAccQ-I");
  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Couldn't fetch products.`
    });
  }
  const fetchCategory = (category) => {
    const { optimizeImage } = useOptimizeImage();
    return data.value.products.filter((product) => !category || product.category === category).map(
      (product) => product.image ? {
        ...product,
        imageOptimized: optimizeImage(product.image)
      } : product
    );
  };
  return { ...data, fetchCategory };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "categorybak",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1) || "";
    useHead({
      title: () => capitalize(route.params.category)
    });
    useServerHead({
      meta: [
        { name: "description", content: () => capitalize(route.params.category) }
      ]
    });
    const { category } = route.params;
    const { fetchCategory } = ([__temp, __restore] = withAsyncContext(() => useProducts()), __temp = await __temp, __restore(), __temp);
    const products = fetchCategory(category == null ? void 0 : category.toString());
    const badges = [
      ...new Set(
        products.filter((product) => product.badge).map((product) => product.badge)
      )
    ];
    const filteredBadges = useState((category == null ? void 0 : category.toString()) || "all", () => {
      return /* @__PURE__ */ new Set();
    });
    const toggleFilter = (badge) => {
      if (filteredBadges.value.has(badge)) {
        filteredBadges.value.delete(badge);
      } else {
        filteredBadges.value.add(badge);
      }
    };
    const filteredProducts = computed(() => {
      if (filteredBadges.value.size) {
        return products.filter(
          (product) => filteredBadges.value.has(product.badge)
        );
      } else {
        return products;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0;
      const _component_UButton = __nuxt_component_7;
      const _component_ProductCard = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-16" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "py-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (badges.length) {
              _push2(`<section class="flex items-center justify-center m-4"${_scopeId}><span class="font-bold text-sm"${_scopeId}>Filter Badges</span><div class="ml-4 space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(badges, (badge, index) => {
                _push2(ssrRenderComponent(_component_UButton, {
                  key: index,
                  label: badge,
                  variant: unref(filteredBadges).has(badge) ? "soft" : "outline",
                  class: "mr-2",
                  onClick: ($event) => toggleFilter(badge)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<section data-pg-name="Products" class="flex flex-wrap justify-center"${_scopeId}><!--[-->`);
            ssrRenderList(unref(filteredProducts), (product) => {
              _push2(ssrRenderComponent(_component_ProductCard, mergeProps({
                key: product.id
              }, { ref_for: true }, product), null, _parent2, _scopeId));
            });
            _push2(`<!--]--></section>`);
          } else {
            return [
              badges.length ? (openBlock(), createBlock("section", {
                key: 0,
                class: "flex items-center justify-center m-4"
              }, [
                createVNode("span", { class: "font-bold text-sm" }, "Filter Badges"),
                createVNode("div", { class: "ml-4 space-y-2" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(badges, (badge, index) => {
                    return createVNode(_component_UButton, {
                      key: index,
                      label: badge,
                      variant: unref(filteredBadges).has(badge) ? "soft" : "outline",
                      class: "mr-2",
                      onClick: ($event) => toggleFilter(badge)
                    }, null, 8, ["label", "variant", "onClick"]);
                  }), 64))
                ])
              ])) : createCommentVNode("", true),
              createVNode("section", {
                "data-pg-name": "Products",
                class: "flex flex-wrap justify-center"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredProducts), (product) => {
                  return openBlock(), createBlock(_component_ProductCard, mergeProps({
                    key: product.id
                  }, { ref_for: true }, product), null, 16);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categorybak.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
