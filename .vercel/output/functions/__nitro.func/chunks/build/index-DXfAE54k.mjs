import { _ as __nuxt_component_0$1 } from './NuxtImg-CB91evk_.mjs';
import { _ as _export_sfc, b as useNuxtApp, u as useCookie, c as __nuxt_component_5, a as __nuxt_component_1$2, d as __nuxt_component_0$1$1, e as __nuxt_component_7 } from './server.mjs';
import { defineComponent, ref, unref, isRef, mergeProps, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, watch, withDirectives, vModelText, vShow, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import { useRouter } from 'vue-router';
import { P as ProductAuth } from './product-9kYz4MaC.mjs';
import { _ as __nuxt_component_6 } from './Faq-D6enPfK7.mjs';
import { h as publicAssetsURL } from '../_/nitro.mjs';
import { _ as __nuxt_component_4$1 } from './Modal-DW14wYHj.mjs';
import { _ as _imports_5 } from './virtual_public-DZ6t4Nj3.mjs';
import { message } from 'ant-design-vue';
import './composables-CEJS1CB5.mjs';
import 'tailwind-merge';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org';
import '@unhead/schema-org/vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import './keyboard-Duq8EHr3.mjs';
import './use-resolve-button-type-DOOP2SMg.mjs';
import './open-closed-BDzQJ33n.mjs';
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
import './hidden-BKyvU3BW.mjs';
import './active-element-history-BbzAu_2T.mjs';

const containerWidth = 1440;
const _sfc_main$a = {
  __name: "Homepage",
  __ssrInlineRender: true,
  setup(__props) {
    const backgroundImages = [
      "/images/homebg.webp",
      "/images/homebg.webp"
      // '/images/homebg.webp',
    ];
    const swiperHeight = ref(0);
    const imageAspectRatios = ref([]);
    const onSlideChange = (swiper) => {
      const activeIndex = swiper.realIndex;
      const aspectRatio = imageAspectRatios.value[activeIndex] || 0;
      swiperHeight.value = aspectRatio ? Math.round(aspectRatio * containerWidth) : 600;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_UIcon = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-[420px] sm:h-[480px]" }, _attrs))} data-v-ce45b68d>`);
      _push(ssrRenderComponent(unref(Swiper), {
        "slides-per-view": 1,
        loop: true,
        autoplay: { delay: 3e3, disableOnInteraction: false },
        effect: "fade",
        "fade-effect": { crossFade: true },
        class: "w-full h-full",
        onSlideChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(backgroundImages, (image, index) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), { key: index }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="relative w-full h-full" data-v-ce45b68d${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtImg, {
                      src: image,
                      format: "webp",
                      alt: "Home background",
                      class: "absolute inset-0 w-full h-full object-cover",
                      preload: "",
                      fetchpriority: "high",
                      width: 1440,
                      height: swiperHeight.value
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="absolute inset-0 bg-black bg-opacity-30 z-10" data-v-ce45b68d${_scopeId2}></div><div class="relative z-20 flex flex-col items-start justify-center w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-row" data-v-ce45b68d${_scopeId2}><div class="text-3xl sm:text-5xl lg:text-6xl text-white mb-10 leading-normal" style="${ssrRenderStyle({ "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.5)" })}" data-v-ce45b68d${_scopeId2}> No Limits No Rules<br data-v-ce45b68d${_scopeId2}>Just Your Design </div><p class="text-lg sm:text-4xl text-white mb-10" style="${ssrRenderStyle({ "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.5)" })}" data-v-ce45b68d${_scopeId2}> Where Creativity Meets Customization </p><div class="flex flex-col items-start md:flex-row md:items-center md:space-x-6 text-lg text-primary" style="${ssrRenderStyle({ "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.5)" })}" data-v-ce45b68d${_scopeId2}><span class="flex items-center" data-v-ce45b68d${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-material-symbols-check-circle",
                      class: "w-5 h-5 mr-2 text-white"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-white" data-v-ce45b68d${_scopeId2}>100% Free to use</span></span><span class="flex items-center" data-v-ce45b68d${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-material-symbols-check-circle",
                      class: "w-5 h-5 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-white" data-v-ce45b68d${_scopeId2}>No minimum order</span></span><span class="flex items-center" data-v-ce45b68d${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-material-symbols-check-circle",
                      class: "w-5 h-5 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-white" data-v-ce45b68d${_scopeId2}>Inventory-Free</span></span></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "relative w-full h-full" }, [
                        createVNode(_component_NuxtImg, {
                          src: image,
                          format: "webp",
                          alt: "Home background",
                          class: "absolute inset-0 w-full h-full object-cover",
                          preload: "",
                          fetchpriority: "high",
                          width: 1440,
                          height: swiperHeight.value
                        }, null, 8, ["src", "height"]),
                        createVNode("div", { class: "absolute inset-0 bg-black bg-opacity-30 z-10" }),
                        createVNode("div", { class: "relative z-20 flex flex-col items-start justify-center w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-row" }, [
                          createVNode("div", {
                            class: "text-3xl sm:text-5xl lg:text-6xl text-white mb-10 leading-normal",
                            style: { "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.5)" }
                          }, [
                            createTextVNode(" No Limits No Rules"),
                            createVNode("br"),
                            createTextVNode("Just Your Design ")
                          ]),
                          createVNode("p", {
                            class: "text-lg sm:text-4xl text-white mb-10",
                            style: { "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.5)" }
                          }, " Where Creativity Meets Customization "),
                          createVNode("div", {
                            class: "flex flex-col items-start md:flex-row md:items-center md:space-x-6 text-lg text-primary",
                            style: { "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.5)" }
                          }, [
                            createVNode("span", { class: "flex items-center" }, [
                              createVNode(_component_UIcon, {
                                name: "i-material-symbols-check-circle",
                                class: "w-5 h-5 mr-2 text-white"
                              }),
                              createVNode("span", { class: "text-white" }, "100% Free to use")
                            ]),
                            createVNode("span", { class: "flex items-center" }, [
                              createVNode(_component_UIcon, {
                                name: "i-material-symbols-check-circle",
                                class: "w-5 h-5 mr-2"
                              }),
                              createVNode("span", { class: "text-white" }, "No minimum order")
                            ]),
                            createVNode("span", { class: "flex items-center" }, [
                              createVNode(_component_UIcon, {
                                name: "i-material-symbols-check-circle",
                                class: "w-5 h-5 mr-2"
                              }),
                              createVNode("span", { class: "text-white" }, "Inventory-Free")
                            ])
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(backgroundImages, (image, index) => {
                return createVNode(unref(SwiperSlide), { key: index }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "relative w-full h-full" }, [
                      createVNode(_component_NuxtImg, {
                        src: image,
                        format: "webp",
                        alt: "Home background",
                        class: "absolute inset-0 w-full h-full object-cover",
                        preload: "",
                        fetchpriority: "high",
                        width: 1440,
                        height: swiperHeight.value
                      }, null, 8, ["src", "height"]),
                      createVNode("div", { class: "absolute inset-0 bg-black bg-opacity-30 z-10" }),
                      createVNode("div", { class: "relative z-20 flex flex-col items-start justify-center w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-row" }, [
                        createVNode("div", {
                          class: "text-3xl sm:text-5xl lg:text-6xl text-white mb-10 leading-normal",
                          style: { "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.5)" }
                        }, [
                          createTextVNode(" No Limits No Rules"),
                          createVNode("br"),
                          createTextVNode("Just Your Design ")
                        ]),
                        createVNode("p", {
                          class: "text-lg sm:text-4xl text-white mb-10",
                          style: { "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.5)" }
                        }, " Where Creativity Meets Customization "),
                        createVNode("div", {
                          class: "flex flex-col items-start md:flex-row md:items-center md:space-x-6 text-lg text-primary",
                          style: { "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.5)" }
                        }, [
                          createVNode("span", { class: "flex items-center" }, [
                            createVNode(_component_UIcon, {
                              name: "i-material-symbols-check-circle",
                              class: "w-5 h-5 mr-2 text-white"
                            }),
                            createVNode("span", { class: "text-white" }, "100% Free to use")
                          ]),
                          createVNode("span", { class: "flex items-center" }, [
                            createVNode(_component_UIcon, {
                              name: "i-material-symbols-check-circle",
                              class: "w-5 h-5 mr-2"
                            }),
                            createVNode("span", { class: "text-white" }, "No minimum order")
                          ]),
                          createVNode("span", { class: "flex items-center" }, [
                            createVNode(_component_UIcon, {
                              name: "i-material-symbols-check-circle",
                              class: "w-5 h-5 mr-2"
                            }),
                            createVNode("span", { class: "text-white" }, "Inventory-Free")
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Homepage.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-ce45b68d"]]);
const _sfc_main$9 = {
  __name: "Tags",
  __ssrInlineRender: true,
  setup(__props) {
    const features = [
      { icon: "/images/service3.png", title: "Customized Just for You" },
      { icon: "/images/service1.png", title: "Fast & Free Shipping" },
      { icon: "/images/service2.png", title: "Manufacturer Direct to Consume" },
      { icon: "/images/service4.png", title: "24/7 Customer Support Assistance" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-row my-2 md:my-8" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-4 bg-white py-6 rounded-xl"><!--[-->`);
      ssrRenderList(features, (feature, index) => {
        _push(`<div class="${ssrRenderClass([{ "md:border-l md:border-gray-100": index !== 0 }, "flex items-center gap-4 px-6 py-2"])}">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          class: "w-12 h-12 md:w-16 md:h-16",
          alt: feature.title,
          src: feature.icon
        }, null, _parent));
        _push(`<span class="text-blackcolor text-sm md:text-lg break-words">${ssrInterpolate(feature.title)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tags.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Categorypage",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const items = ref([
      {
        title: "Outdoor Shade Solutions",
        description: "UV protection for outdoor living. >",
        image: "/images/cate1.webp"
      },
      {
        title: "Privacy & Garden Decor",
        description: "Stylish privacy for your backyard. >",
        image: "/images/1.webp"
      },
      {
        title: "Indoor Window Shades",
        description: "Elegant shading for modern homes. >",
        image: "/images/2.webp"
      },
      {
        title: "Custom Printed Shade & Screen",
        description: "Print your ideas on fabric. >",
        image: "/images/3.webp"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-row mx-auto px-32" }, _attrs))} data-v-872b7053><div class="grid sm:grid-cols-1 md:grid-cols-2 gap-6" data-v-872b7053><!--[-->`);
      ssrRenderList(items.value, (item, index) => {
        _push(`<div class="relative h-[220px] rounded-lg overflow-hidden group cursor-pointer transition-shadow duration-300" data-v-872b7053><img${ssrRenderAttr("src", item.image)} class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" alt="" data-v-872b7053><div class="absolute inset-0 flex items-center" data-v-872b7053><div class="flex flex-col gap-3 text-white left-12 absolute" data-v-872b7053><h2 class="text-xl sm:text-2xl font-semibold mb-0 text-shadow-custom group-hover:text-primary-500 transition-colors duration-300" data-v-872b7053>${ssrInterpolate(item.title)}</h2><div class="text-sm underline text-shadow-custom group-hover:text-primary-500 transition-colors duration-300" data-v-872b7053>${ssrInterpolate(item.description)} <i class="fas fa-arrow-right ml-2" data-v-872b7053></i></div></div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Categorypage.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$8, [["__scopeId", "data-v-872b7053"]]), { __name: "Categorypage" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "PopularProducts",
  __ssrInlineRender: true,
  setup(__props) {
    const { getUserProductRollPage } = ProductAuth();
    useRouter();
    const swiperModules = [Pagination, Autoplay];
    ref({});
    const products = ref([]);
    const isLoading = ref(true);
    const getpopularlist = async () => {
      try {
        isLoading.value = true;
        let parmes = {
          sortKey: "thirtyDaysSales",
          pageNum: 1,
          pageSize: 15,
          sortOrder: "desc",
          fields: "id,productState,erpProduct.productEnglishName,erpProduct.customPrice,erpProduct.mainPic,thirtyDaysSales"
        };
        let res = await getUserProductRollPage(parmes);
        products.value = res.result.list;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        isLoading.value = false;
      }
    };
    getpopularlist();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ULink = __nuxt_component_0$1$1;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-16" }, _attrs))} data-v-85758b93><div class="max-row" data-v-85758b93><h1 class="text-2xl md:text-5xl mb-6 md:mb-8 bg-clip-text font-normal text-blackcolor text-center dark:text-white" data-v-85758b93> Most Popular Products </h1><div class="relative" data-v-85758b93>`);
      if (isLoading.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6" data-v-85758b93><!--[-->`);
        ssrRenderList(5, (n) => {
          _push(`<div class="rounded-lg overflow-hidden shadow-md bg-white" data-v-85758b93><div class="relative w-full aspect-square bg-gray-200 animate-pulse" data-v-85758b93></div><div class="p-4" data-v-85758b93><div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" data-v-85758b93></div><div class="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" data-v-85758b93></div><div class="flex items-center justify-between" data-v-85758b93><div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse" data-v-85758b93></div><div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse" data-v-85758b93></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(ssrRenderComponent(unref(Swiper), {
          modules: swiperModules,
          "space-between": 24,
          breakpoints: {
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4
            },
            1280: {
              slidesPerView: 5,
              slidesPerGroup: 5
            }
          },
          autoplay: { delay: 5e3, disableOnInteraction: false },
          loop: true,
          pagination: { clickable: true },
          speed: 1e3,
          class: "product-swiper"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(products.value, (product, index) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), { key: index }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_ULink, {
                        to: `/product/${product.id}/${product.erpProduct.productEnglishName}`,
                        class: "rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="relative w-full aspect-square overflow-hidden" data-v-85758b93${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_NuxtImg, {
                              format: "webp",
                              src: product.erpProduct.mainPic ?? "/images/empty.jpg",
                              alt: product.erpProduct.productEnglishName,
                              loading: "lazy",
                              width: 400,
                              height: 400,
                              quality: "70",
                              class: "w-full h-full object-cover object-top transition-all duration-300 hover:rounded-[8px]"
                            }, null, _parent4, _scopeId3));
                            _push4(`</div><div class="p-4" data-v-85758b93${_scopeId3}><h3 class="text-sm sm:text-base font-normal mb-2 line-clamp-2 min-h-[3em]" data-v-85758b93${_scopeId3}>${ssrInterpolate(product.erpProduct.productEnglishName)}</h3><div class="flex items-center justify-between" data-v-85758b93${_scopeId3}><span class="text-customblack font-medium text-sm sm:text-lg dark:text-primary" data-v-85758b93${_scopeId3}> $ ${ssrInterpolate(product.erpProduct.customPrice)}</span><span class="text-[#4A4A4A] text-sm" data-v-85758b93${_scopeId3}>${ssrInterpolate(product.thirtyDaysSales)} sold</span></div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "relative w-full aspect-square overflow-hidden" }, [
                                createVNode(_component_NuxtImg, {
                                  format: "webp",
                                  src: product.erpProduct.mainPic ?? "/images/empty.jpg",
                                  alt: product.erpProduct.productEnglishName,
                                  loading: "lazy",
                                  width: 400,
                                  height: 400,
                                  quality: "70",
                                  class: "w-full h-full object-cover object-top transition-all duration-300 hover:rounded-[8px]"
                                }, null, 8, ["src", "alt"])
                              ]),
                              createVNode("div", { class: "p-4" }, [
                                createVNode("h3", { class: "text-sm sm:text-base font-normal mb-2 line-clamp-2 min-h-[3em]" }, toDisplayString(product.erpProduct.productEnglishName), 1),
                                createVNode("div", { class: "flex items-center justify-between" }, [
                                  createVNode("span", { class: "text-customblack font-medium text-sm sm:text-lg dark:text-primary" }, " $ " + toDisplayString(product.erpProduct.customPrice), 1),
                                  createVNode("span", { class: "text-[#4A4A4A] text-sm" }, toDisplayString(product.thirtyDaysSales) + " sold", 1)
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_ULink, {
                          to: `/product/${product.id}/${product.erpProduct.productEnglishName}`,
                          class: "rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "relative w-full aspect-square overflow-hidden" }, [
                              createVNode(_component_NuxtImg, {
                                format: "webp",
                                src: product.erpProduct.mainPic ?? "/images/empty.jpg",
                                alt: product.erpProduct.productEnglishName,
                                loading: "lazy",
                                width: 400,
                                height: 400,
                                quality: "70",
                                class: "w-full h-full object-cover object-top transition-all duration-300 hover:rounded-[8px]"
                              }, null, 8, ["src", "alt"])
                            ]),
                            createVNode("div", { class: "p-4" }, [
                              createVNode("h3", { class: "text-sm sm:text-base font-normal mb-2 line-clamp-2 min-h-[3em]" }, toDisplayString(product.erpProduct.productEnglishName), 1),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-customblack font-medium text-sm sm:text-lg dark:text-primary" }, " $ " + toDisplayString(product.erpProduct.customPrice), 1),
                                createVNode("span", { class: "text-[#4A4A4A] text-sm" }, toDisplayString(product.thirtyDaysSales) + " sold", 1)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(products.value, (product, index) => {
                  return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                    default: withCtx(() => [
                      createVNode(_component_ULink, {
                        to: `/product/${product.id}/${product.erpProduct.productEnglishName}`,
                        class: "rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "relative w-full aspect-square overflow-hidden" }, [
                            createVNode(_component_NuxtImg, {
                              format: "webp",
                              src: product.erpProduct.mainPic ?? "/images/empty.jpg",
                              alt: product.erpProduct.productEnglishName,
                              loading: "lazy",
                              width: 400,
                              height: 400,
                              quality: "70",
                              class: "w-full h-full object-cover object-top transition-all duration-300 hover:rounded-[8px]"
                            }, null, 8, ["src", "alt"])
                          ]),
                          createVNode("div", { class: "p-4" }, [
                            createVNode("h3", { class: "text-sm sm:text-base font-normal mb-2 line-clamp-2 min-h-[3em]" }, toDisplayString(product.erpProduct.productEnglishName), 1),
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("span", { class: "text-customblack font-medium text-sm sm:text-lg dark:text-primary" }, " $ " + toDisplayString(product.erpProduct.customPrice), 1),
                              createVNode("span", { class: "text-[#4A4A4A] text-sm" }, toDisplayString(product.thirtyDaysSales) + " sold", 1)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PopularProducts.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["__scopeId", "data-v-85758b93"]]), { __name: "PopularProducts" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Needs",
  __ssrInlineRender: true,
  setup(__props) {
    const needs = ref([
      { title: "Product category", img: "/images/needs1.webp", icon: "/images/needs_icon1.png" },
      { title: "Color selection", img: "/images/needs2.webp", icon: "/images/needs_icon2.png" },
      { title: "Size customization", img: "/images/needs3.webp", icon: "/images/needs_icon3.png" },
      { title: "Print-On-Demand", img: "/images/needs4.webp", icon: "/images/needs_icon4.png" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-16" }, _attrs))}><div class="max-row"><h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal mb-6 md:mb-8 bg-clip-text text-blackcolor text-center dark:text-white"> Customized to your needs </h1><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
      ssrRenderList(needs.value, (need, index) => {
        _push(`<div class="relative rounded-lg overflow-hidden md:h-[150px] h-[150px] group cursor-pointer">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: need.img,
          format: "webp",
          alt: need.title,
          class: "w-full h-full object-cover object-top"
        }, null, _parent));
        _push(`<div class="absolute inset-0 transition-all duration-300 flex items-center justify-center"><div class="text-white text-center">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: need.icon,
          alt: need.title,
          class: "w-12 md:w-16 mx-auto mb-2"
        }, null, _parent));
        _push(`<h3 class="text-xl font-medium">${ssrInterpolate(need.title)}</h3></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Needs.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$6, { __name: "Needs" });
const _sfc_main$5 = {
  __name: "Views",
  __ssrInlineRender: true,
  setup(__props) {
    const reviews = [
      { name: "SELFLESS", text: "An outstanding competitor to CJ with much lower prices & fast fulfillment times,l was originally approached on WhatsApp by one of their agents and they have been very good to me. If you are starting with dropshipping I highly recommend Dropsure as they have much lower prices & source faster if you contact your agent.", avatar: "/images/avatar1.webp", date: "Nov 15, 2024" },
      { name: "RevvoHive", text: "Highly recommend. Dropshipping made easy. Once connected you will get a account manager that takes care of your orders.", avatar: "/images/avatar2.webp", date: "Nov 12, 2024" },
      { name: "Saint Drako", text: "Highly recommend Dropsure. Our agent Taylor Liu has been amazing to work with. I've worked with a lot of suppliers and Taylor has been the best agent by far and Dropsure has a great user interface. Easy to navigate and fulfill orders.", avatar: "/images/avatar3.webp", date: "Nov 10, 2024" },
      { name: "My Store", text: "Found this app on shopify while looking for a dropshipping supplier. Taylor has been really helpful with answering the questions I have.", avatar: "/images/avatar4.webp", date: "Nov 8, 2024" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_UIcon = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-2 md:p-10 mt-16" }, _attrs))}><div class="max-row"><h1 class="text-2xl md:text-5xl mb-6 md:mb-8 bg-clip-text font-normal text-blackcolor text-center dark:text-white"> Why Love inCustom </h1><div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16"><!--[-->`);
      ssrRenderList(reviews, (review, index) => {
        _push(`<div class="bg-white rounded-lg p-6 md:p-8"><p class="text-title mb-4 md:mb-6 text-base md:text-lg leading-relaxed min-h-40 border-b border-[rgba(46,46,12,0.1)] py-6">${ssrInterpolate(review.text)}</p><div class="flex items-center justify-between"><div class="flex items-center gap-3 md:gap-4">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: review.avatar,
          alt: review.name,
          class: "w-10 h-10 sm:w-16 sm:h-16 rounded-full object-cover"
        }, null, _parent));
        _push(`<div><h5 class="font-semibold text-title">${ssrInterpolate(review.name)}</h5><div class="flex text-primary"><!--[-->`);
        ssrRenderList(5, (star) => {
          _push(ssrRenderComponent(_component_UIcon, {
            key: star,
            name: "i-material-symbols-star",
            class: "text-xl md:text-2xl"
          }, null, _parent));
        });
        _push(`<!--]--></div></div></div><div class="flex items-center gap-1 md:gap-2 self-end"><span class="text-gray-500 text-xs md:text-sm">${ssrInterpolate(review.date)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="text-center"><button class="text-blackcolor bg-bright hover:opacity-90 text-white font-semibold py-3 px-8 md:py-4 md:px-12 rounded-md text-base md:text-lg transition-all duration-200"> Get Started It’s Free </button></div></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Views.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ActivityAuth = () => {
  const { $api } = useNuxtApp();
  const listInProgressMarketingActivity = async () => {
    try {
      const response = await $api(`/order/marketingActivity/listInProgressMarketingActivity`, {
        method: "GET"
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const createMarketingActivityEmailSubscribe = async (params) => {
    try {
      const response = await $api("/order/marketingActivity/createMarketingActivityEmailSubscribe", {
        method: "POST",
        body: params
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return { listInProgressMarketingActivity, createMarketingActivityEmailSubscribe };
};
const _sfc_main$4 = {
  __name: "Business",
  __ssrInlineRender: true,
  setup(__props) {
    ActivityAuth();
    const email = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative h-[320px] md:h-[336px] w-full bg-cover bg-center bg-no-repeat px-6 md:px-32",
        style: { "background-image": "url('/images/business.webp')" }
      }, _attrs))}><div class="absolute inset-0 bg-gray-900/50"></div><div class="relative z-10 flex flex-col justify-center h-full text-left max-row"><div><h2 class="text-xl md:text-[26px] font-bold text-white"> Join Our Newsletter </h2><p class="text-sm md:text-base text-white leading-relaxed mt-2"> Huge selection shading solutions to suit your spaces. <br> Continuous price negotiation and supply chain optimization for you. </p></div><div class="mt-6 w-full max-w-md"><div class="relative flex flex-col sm:flex-row items-stretch bg-white rounded shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200"><div class="hidden sm:flex items-center px-3 py-2.5 text-gray-600">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-envelope",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</div><input type="email"${ssrRenderAttr("value", email.value)} placeholder="Enter your email" class="flex-1 min-w-0 bg-transparent outline-none px-3 py-2.5 text-gray-800 placeholder-gray-400 border-0 focus:ring-0" required><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="bg-bright hover:bg-secondary-600 text-white px-5 py-2.5 rounded-b sm:rounded-r sm:rounded-bl-none transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">${ssrInterpolate(loading.value ? "Subscribing..." : "Subscribe")}</button></div><p class="mt-4 text-xs text-white"> You can unsubscribe at any time. See our <a href="/article/privacy-policy" class="underline hover:text-blue-300 transition-colors">Privacy Policy</a>. </p></div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Business.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _imports_0$1 = publicAssetsURL("/coupon.png");
const _sfc_main$3 = {
  __name: "CouponIcon",
  __ssrInlineRender: true,
  props: {
    isshow: Boolean,
    curactivity: Object
  },
  emits: ["update:isshow"],
  setup(__props, { emit: __emit }) {
    let props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "fixed right-4 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer",
        style: unref(props).curactivity.couponReceiveMethod == 50 ? null : { display: "none" }
      }, _attrs))}><img${ssrRenderAttr("src", _imports_0$1)} alt="coupon icon" class="w-12 h-12"></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CouponIcon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/close.png");
const _imports_1 = publicAssetsURL("/activity.png");
const _imports_2 = publicAssetsURL("/star.png");
const _imports_3 = publicAssetsURL("/email.png");
const _imports_4 = publicAssetsURL("/acticitybg.png");
const _sfc_main$2 = {
  __name: "ActivityModal",
  __ssrInlineRender: true,
  props: {
    isshow: Boolean,
    curactivity: Object
  },
  emits: ["update:isshow"],
  setup(__props, { emit: __emit }) {
    const { createMarketingActivityEmailSubscribe } = ActivityAuth();
    const props = __props;
    const emit = __emit;
    ref(2);
    const email = ref("");
    const offdesc = ref("");
    const offvalue = ref("");
    const loading = ref(false);
    const promoCode = ref([]);
    const showButtons = ref(false);
    function copyCode() {
      const textToCopy = promoCode.value.join("");
      if ((void 0).clipboard && (void 0).isSecureContext) {
        (void 0).clipboard.writeText(textToCopy).then(() => message.success("copy success")).catch(() => message.error("copy failed"));
      } else {
        const textArea = (void 0).createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "absolute";
        textArea.style.opacity = "0";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        (void 0).body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          (void 0).execCommand("copy");
          message.success("copy success");
        } catch (err) {
          message.error("copy failed");
        }
        textArea.remove();
      }
    }
    const handleSubmit = async () => {
      if (!email.value) {
        message.warning("Email is required.");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        message.warning("Invalid email format.");
        return;
      }
      loading.value = true;
      try {
        const res = await createMarketingActivityEmailSubscribe({
          email: email.value,
          marketingActivityId: props.curactivity.id
        });
        message.success("Subscription successful!");
        emit("update:isshow", false);
      } catch (error) {
        console.error(error);
        message.error("An error occurred while subscribing.");
      } finally {
        loading.value = false;
      }
    };
    const handleCloseAttempt = () => {
      emit("update:isshow", false);
    };
    const handleget = () => {
      if (props.curactivity.popupTriggerEvent == 100) {
        const now = /* @__PURE__ */ new Date();
        const tomorrowMidnight = /* @__PURE__ */ new Date();
        tomorrowMidnight.setDate(now.getDate() + 1);
        tomorrowMidnight.setHours(0, 0, 0, 0);
        const cookie = useCookie("hideactivity_" + props.curactivity.id, {
          expires: tomorrowMidnight
        });
        cookie.value = 1;
      }
      emit("update:isshow", false);
    };
    const handleExit = () => {
      (void 0).close();
    };
    watch(
      () => props.curactivity,
      (newVal) => {
        if (newVal && !isEmptyObject(newVal)) {
          promoCode.value = props.curactivity.couponCodeNormalized.split("");
          let lastdiscount = props.curactivity.discountRuleList[props.curactivity.discountRuleList.length - 1];
          if (props.curactivity.discountType == 100) {
            offdesc.value = lastdiscount.y + "USD OFF";
            offvalue.value = lastdiscount.y;
          } else {
            offdesc.value = lastdiscount.y + "% OFF";
            offvalue.value = lastdiscount.y;
          }
        }
      },
      { immediate: true }
    );
    function isEmptyObject(obj) {
      return obj && typeof obj === "object" && !Array.isArray(obj) && Object.keys(obj).length === 0;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = __nuxt_component_4$1;
      const _component_UButton = __nuxt_component_7;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        ui: { width: "sm:max-w-2xl" },
        modelValue: props.isshow,
        "onUpdate:modelValue": ($event) => props.isshow = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle(props.curactivity.couponReceiveMethod == 50 ? null : { display: "none" })}" class="bg-[#fff5dc] rounded-xl shadow-xl flex flex-col md:flex-row max-w-3xl w-full overflow-hidden relative"${_scopeId}><div class="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} class="w-6"${_scopeId}></div><div class="w-full md:w-1/2"${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="Promo Image" class="w-full h-full object-cover"${_scopeId}></div><div class="w-full md:w-1/2 p-6 flex flex-col"${_scopeId}><div${_scopeId}><div class="text-sm font-semibold text-arialblack flex items-center gap-1 border-b py-2" style="${ssrRenderStyle({ "border-color": "#000000" })}"${_scopeId}><img${ssrRenderAttr("src", _imports_2)} class="w-3"${_scopeId}><span${_scopeId}>inCustom.</span></div><p class="text-lg font-bold text-arialblack mt-20"${_scopeId}> Enter your email to subscribe to promotion and get up to </p><p class="text-4xl font-bold text-arialblack mt-6"${_scopeId}><span class="text-[60px] leading-[85px]"${_scopeId}>${ssrInterpolate(offvalue.value)}</span><span class="text-xl font-medium"${_scopeId}>${ssrInterpolate(props.curactivity.discountType == 100 ? "USD" : "%")} OFF</span></p></div><div class="mt-6"${_scopeId}><div class="relative"${_scopeId}><span class="absolute inset-y-0 left-3 flex items-center text-gray-400"${_scopeId}><img${ssrRenderAttr("src", _imports_3)} class="w-6"${_scopeId}></span><input type="email"${ssrRenderAttr("value", email.value)} placeholder="Email Address" class="w-full pl-10 border rounded-md p-3 focus:outline-none" style="${ssrRenderStyle({ "border-color": "#D8D8D8" })}"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              loading: loading.value,
              class: "w-full bg-black text-white font-semibold py-3 rounded-md transition mt-6 justify-center hover:bg-black active:bg-black focus:bg-black ui-loading:bg-black !ui-loading:bg-black",
              onClick: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Subscription Offers `);
                } else {
                  return [
                    createTextVNode(" Subscription Offers ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div style="${ssrRenderStyle(props.curactivity.couponReceiveMethod == 10 ? null : { display: "none" })}" class="bg-[#FFF6E8] rounded-xl shadow-xl p-6 flex flex-col items-center relative text-center"${_scopeId}><div class="w-[90%] mx-auto relative flex items-center justify-center font-bold text-[#00000010] pointer-events-none"${_scopeId}><img${ssrRenderAttr("src", _imports_4)} alt="bg"${_scopeId}><div class="absolute inset-0 flex items-center justify-center text-base text-white"${_scopeId}><div${_scopeId}><div${_scopeId}>incustom</div><div class="mt-2 text-xl"${_scopeId}>${ssrInterpolate(offdesc.value)}</div></div></div></div><div class="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} class="w-6"${_scopeId}></div><p class="text-black font-bold text-lg z-10"${_scopeId}> Welcome to <span class="text-primary font-bold"${_scopeId}>inCustom</span>, promotions are in progress </p><p class="text-sm text-black z-10 mt-4"${_scopeId}>${ssrInterpolate(offdesc.value)} your${ssrInterpolate(props.curactivity.userFirstOrderOnly ? " first order" : " order")} with code: </p><div class="flex justify-center gap-2 z-10 mt-4"${_scopeId}><!--[-->`);
            ssrRenderList(promoCode.value, (char, index) => {
              _push2(`<div class="bg-primary text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded"${_scopeId}>${ssrInterpolate(char)}</div>`);
            });
            _push2(`<!--]--><div class="self-end mb-1 cursor-pointer"${_scopeId}><img${ssrRenderAttr("src", _imports_5)} class="w-6"${_scopeId}></div></div>`);
            if (showButtons.value) {
              _push2(`<div class="flex gap-4 mt-8 w-full justify-center"${_scopeId}><button class="bg-black text-white px-6 py-3 rounded-full font-semibold text-base w-40"${_scopeId}> Shop now </button><button class="bg-white border border-gray-300 text-black px-6 py-3 rounded-full font-semibold text-base w-40"${_scopeId}> Continue Exit </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!showButtons.value) {
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: handleget,
                class: "bg-black text-white rounded-full px-6 py-2 text-lg font-semibold z-10 mt-6"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Okey, I understand `);
                  } else {
                    return [
                      createTextVNode(" Okey, I understand ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              withDirectives(createVNode("div", { class: "bg-[#fff5dc] rounded-xl shadow-xl flex flex-col md:flex-row max-w-3xl w-full overflow-hidden relative" }, [
                createVNode("div", {
                  class: "absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer",
                  onClick: handleget
                }, [
                  createVNode("img", {
                    src: _imports_0,
                    class: "w-6"
                  })
                ]),
                createVNode("div", { class: "w-full md:w-1/2" }, [
                  createVNode("img", {
                    src: _imports_1,
                    alt: "Promo Image",
                    class: "w-full h-full object-cover"
                  })
                ]),
                createVNode("div", { class: "w-full md:w-1/2 p-6 flex flex-col" }, [
                  createVNode("div", null, [
                    createVNode("div", {
                      class: "text-sm font-semibold text-arialblack flex items-center gap-1 border-b py-2",
                      style: { "border-color": "#000000" }
                    }, [
                      createVNode("img", {
                        src: _imports_2,
                        class: "w-3"
                      }),
                      createVNode("span", null, "inCustom.")
                    ]),
                    createVNode("p", { class: "text-lg font-bold text-arialblack mt-20" }, " Enter your email to subscribe to promotion and get up to "),
                    createVNode("p", { class: "text-4xl font-bold text-arialblack mt-6" }, [
                      createVNode("span", { class: "text-[60px] leading-[85px]" }, toDisplayString(offvalue.value), 1),
                      createVNode("span", { class: "text-xl font-medium" }, toDisplayString(props.curactivity.discountType == 100 ? "USD" : "%") + " OFF", 1)
                    ])
                  ]),
                  createVNode("div", { class: "mt-6" }, [
                    createVNode("div", { class: "relative" }, [
                      createVNode("span", { class: "absolute inset-y-0 left-3 flex items-center text-gray-400" }, [
                        createVNode("img", {
                          src: _imports_3,
                          class: "w-6"
                        })
                      ]),
                      withDirectives(createVNode("input", {
                        type: "email",
                        "onUpdate:modelValue": ($event) => email.value = $event,
                        placeholder: "Email Address",
                        class: "w-full pl-10 border rounded-md p-3 focus:outline-none",
                        style: { "border-color": "#D8D8D8" }
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, email.value]
                      ])
                    ]),
                    createVNode(_component_UButton, {
                      loading: loading.value,
                      class: "w-full bg-black text-white font-semibold py-3 rounded-md transition mt-6 justify-center hover:bg-black active:bg-black focus:bg-black ui-loading:bg-black !ui-loading:bg-black",
                      onClick: handleSubmit
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Subscription Offers ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ])
              ], 512), [
                [vShow, props.curactivity.couponReceiveMethod == 50]
              ]),
              withDirectives(createVNode("div", { class: "bg-[#FFF6E8] rounded-xl shadow-xl p-6 flex flex-col items-center relative text-center" }, [
                createVNode("div", { class: "w-[90%] mx-auto relative flex items-center justify-center font-bold text-[#00000010] pointer-events-none" }, [
                  createVNode("img", {
                    src: _imports_4,
                    alt: "bg"
                  }),
                  createVNode("div", { class: "absolute inset-0 flex items-center justify-center text-base text-white" }, [
                    createVNode("div", null, [
                      createVNode("div", null, "incustom"),
                      createVNode("div", { class: "mt-2 text-xl" }, toDisplayString(offdesc.value), 1)
                    ])
                  ])
                ]),
                createVNode("div", {
                  class: "absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer",
                  onClick: handleCloseAttempt
                }, [
                  createVNode("img", {
                    src: _imports_0,
                    class: "w-6"
                  })
                ]),
                createVNode("p", { class: "text-black font-bold text-lg z-10" }, [
                  createTextVNode(" Welcome to "),
                  createVNode("span", { class: "text-primary font-bold" }, "inCustom"),
                  createTextVNode(", promotions are in progress ")
                ]),
                createVNode("p", { class: "text-sm text-black z-10 mt-4" }, toDisplayString(offdesc.value) + " your" + toDisplayString(props.curactivity.userFirstOrderOnly ? " first order" : " order") + " with code: ", 1),
                createVNode("div", { class: "flex justify-center gap-2 z-10 mt-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(promoCode.value, (char, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: "bg-primary text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded"
                    }, toDisplayString(char), 1);
                  }), 128)),
                  createVNode("div", {
                    onClick: copyCode,
                    class: "self-end mb-1 cursor-pointer"
                  }, [
                    createVNode("img", {
                      src: _imports_5,
                      class: "w-6"
                    })
                  ])
                ]),
                showButtons.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex gap-4 mt-8 w-full justify-center"
                }, [
                  createVNode("button", {
                    onClick: handleget,
                    class: "bg-black text-white px-6 py-3 rounded-full font-semibold text-base w-40"
                  }, " Shop now "),
                  createVNode("button", {
                    onClick: handleExit,
                    class: "bg-white border border-gray-300 text-black px-6 py-3 rounded-full font-semibold text-base w-40"
                  }, " Continue Exit ")
                ])) : createCommentVNode("", true),
                !showButtons.value ? (openBlock(), createBlock(_component_UButton, {
                  key: 1,
                  onClick: handleget,
                  class: "bg-black text-white rounded-full px-6 py-2 text-lg font-semibold z-10 mt-6"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Okey, I understand ")
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ], 512), [
                [vShow, props.curactivity.couponReceiveMethod == 10]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ActivityModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$2, { __name: "ActivityModal" });
const _sfc_main$1 = {
  __name: "Cookiemodal",
  __ssrInlineRender: true,
  setup(__props) {
    useCookie("cookie_consent", {
      maxAge: 60 * 60 * 24 * 365
      // 1年
    });
    const show = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      if (unref(show)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-4 left-4 z-50 max-w-lg w-[90%] bg-white shadow-2xl rounded-lg p-4 text-sm text-gray-700" }, _attrs))}><h2 class="text-base font-semibold mb-1">We use cookies</h2><p class="mb-3 leading-relaxed"> We use cookies and similar technologies to improve your shopping experience and to better understand how our site is used. By clicking <strong>&quot;Accept All&quot;</strong>, you agree to the use of cookies as described in our `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/article/privacy-policy",
          class: "text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Privacy Policy`);
            } else {
              return [
                createTextVNode("Privacy Policy")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="text-primary">,</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/article/terms-of-service",
          class: "text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Terms`);
            } else {
              return [
                createTextVNode("Terms")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="text-primary">,</span> and <a href="https://policies.google.com/technologies/cookies" target="_blank" class="text-primary hover:underline">Google Cookie Policy</a>. </p><div class="flex justify-end gap-2"><button class="px-3 py-1.5 rounded border border-[#D9D9D9] text-gray-700 hover:bg-gray-100"> Reject All </button><button class="px-3 py-1.5 rounded bg-primary text-white hover:bg-primary-600"> Accept all </button></div><button class="absolute top-2 right-2 text-gray-400 hover:text-black text-lg" aria-label="Close"> × </button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cookiemodal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { listInProgressMarketingActivity } = ActivityAuth();
    const isexpend = ref(false);
    const curactivity = ref({});
    const isshow = ref(false);
    let emailactivity = null;
    let couponactivity = null;
    const getactivitylistlist = async () => {
      const res = await listInProgressMarketingActivity();
      let lists = res.result;
      lists.forEach((element) => {
        if (element.couponReceiveMethod == 50) {
          emailactivity = element;
        }
        let couponcookiename = "hideactivity_" + element.id;
        if (element.couponReceiveMethod == 10 && !useCookie(couponcookiename).value && !couponactivity && element.popupTriggerEvent != 10) {
          couponactivity = element;
        }
      });
      if (isexpend.value == false && couponactivity) {
        curactivity.value = couponactivity;
      }
      if (emailactivity) {
        let cookiename = "hideactivity_" + emailactivity.id;
        curactivity.value = emailactivity;
        if (!useCookie(cookiename)) {
          isexpend.value = true;
        }
      }
      if (!isEmptyObject(curactivity.value)) {
        isshow.value = true;
      }
    };
    function isEmptyObject(obj) {
      return obj && typeof obj === "object" && !Array.isArray(obj) && Object.keys(obj).length === 0;
    }
    getactivitylistlist();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Homepage = __nuxt_component_0;
      const _component_Tags = _sfc_main$9;
      const _component_Categorypage = __nuxt_component_2;
      const _component_PopularProducts = __nuxt_component_3;
      const _component_Needs = __nuxt_component_4;
      const _component_Views = _sfc_main$5;
      const _component_Faq = __nuxt_component_6;
      const _component_Business = _sfc_main$4;
      const _component_CouponIcon = _sfc_main$3;
      const _component_ActivityModal = __nuxt_component_9;
      const _component_Cookiemodal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Homepage, null, null, _parent));
      _push(ssrRenderComponent(_component_Tags, null, null, _parent));
      _push(ssrRenderComponent(_component_Categorypage, null, null, _parent));
      _push(ssrRenderComponent(_component_PopularProducts, null, null, _parent));
      _push(ssrRenderComponent(_component_Needs, null, null, _parent));
      _push(ssrRenderComponent(_component_Views, null, null, _parent));
      _push(ssrRenderComponent(_component_Faq, null, null, _parent));
      _push(ssrRenderComponent(_component_Business, null, null, _parent));
      _push(ssrRenderComponent(_component_CouponIcon, {
        isshow: unref(isshow),
        "onUpdate:isshow": ($event) => isRef(isshow) ? isshow.value = $event : null,
        curactivity: unref(curactivity)
      }, null, _parent));
      _push(ssrRenderComponent(_component_ActivityModal, {
        isshow: unref(isshow),
        "onUpdate:isshow": ($event) => isRef(isshow) ? isshow.value = $event : null,
        curactivity: unref(curactivity)
      }, null, _parent));
      _push(ssrRenderComponent(_component_Cookiemodal, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
