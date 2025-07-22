import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
import 'tailwind-merge';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import 'ant-design-vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';

const _sfc_main = {
  __name: "about-us",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "px-6 py-12 max-w-4xl mx-auto text-gray-800" }, _attrs))} data-v-ae32aed7><h1 class="text-3xl font-bold mb-6" data-v-ae32aed7>About Us</h1><p class="text-xl italic text-gray-600 mb-8" data-v-ae32aed7> Crafting Shade with Precision, for Every Space You Call Home. </p><div class="space-y-8" data-v-ae32aed7><div data-v-ae32aed7><p data-v-ae32aed7> At inCustom, we specialize in handcrafted indoor and outdoor shade solutions, custom-made to fit your unique space, lifestyle, and aesthetic. From elegant indoor roller blinds to durable outdoor sun shades, each product is made to order in our factory — no middlemen, no compromises. </p></div><div class="flex items-start space-x-4" data-v-ae32aed7><span class="text-2xl" data-v-ae32aed7>🏭</span><div data-v-ae32aed7><h2 class="text-xl font-semibold mb-1" data-v-ae32aed7>From Factory to You – Directly</h2><p data-v-ae32aed7> Unlike mass-produced options, our products are crafted upon order by skilled artisans with years of experience. With no intermediaries, we deliver factory-direct quality, better pricing, and faster service – straight to your door, worldwide. </p></div></div><div class="flex items-start space-x-4" data-v-ae32aed7><span class="text-2xl" data-v-ae32aed7>🧵</span><div data-v-ae32aed7><h2 class="text-xl font-semibold mb-1" data-v-ae32aed7>Tailored to Fit. Designed to Last.</h2><p data-v-ae32aed7> We know every window, patio, and balcony is different. That’s why we offer fully customizable dimensions, materials, and colors — along with helpful measuring guides and expert support every step of the way. </p></div></div><div class="flex items-start space-x-4" data-v-ae32aed7><span class="text-2xl" data-v-ae32aed7>🌍</span><div data-v-ae32aed7><h2 class="text-xl font-semibold mb-1" data-v-ae32aed7>Eco-Conscious, Customer-First</h2><p data-v-ae32aed7> We’re committed to sustainability — from using recyclable packaging to offering eco-friendly fabrics. More importantly, we care about people. That means clear communication, responsive support, and a product that fits not just your home, but your values. </p></div></div><div class="flex items-start space-x-4" data-v-ae32aed7><span class="text-2xl" data-v-ae32aed7>👥</span><div data-v-ae32aed7><h2 class="text-xl font-semibold mb-1" data-v-ae32aed7>Join Our Global Community</h2><p data-v-ae32aed7> From California to Copenhagen, thousands upon thousands of customers have trusted us to bring shade, privacy, and beauty into their homes.<br data-v-ae32aed7> Your home deserves better. And we’re here to help. </p></div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/about-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const aboutUs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ae32aed7"]]);

export { aboutUs as default };
