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
  __name: "warranty-policy",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "px-6 py-12 max-w-4xl mx-auto text-gray-800" }, _attrs))} data-v-a8c3ffa6><h1 class="text-3xl font-bold mb-6" data-v-a8c3ffa6>Warranty &amp; Guarantee</h1><p class="mb-6" data-v-a8c3ffa6> At inCustom, we stand behind the quality of every custom shade we create. Each product is handcrafted and carefully inspected before shipping. That’s why we’re proud to offer a <strong data-v-a8c3ffa6>[1-year]</strong> limited warranty on all eligible products. </p><div class="space-y-10" data-v-a8c3ffa6><div data-v-a8c3ffa6><h2 class="text-xl font-semibold mb-2" data-v-a8c3ffa6>🔹 What’s Covered</h2><ul class="list-disc ml-6" data-v-a8c3ffa6><li data-v-a8c3ffa6>Materials (fabric tears, coating issues)</li><li data-v-a8c3ffa6>Workmanship (seams, stitching, structural assembly)</li><li data-v-a8c3ffa6>Hardware components (mounting brackets, rails, rods)</li><li data-v-a8c3ffa6>Functionality issues under normal use</li></ul></div><div data-v-a8c3ffa6><h2 class="text-xl font-semibold mb-2" data-v-a8c3ffa6>🔹 Warranty Period</h2><ul class="list-disc ml-6" data-v-a8c3ffa6><li data-v-a8c3ffa6>The standard warranty period is 12 months from the date of delivery.</li><li data-v-a8c3ffa6>For commercial or outdoor use in harsh environments, warranty may vary depending on usage conditions.</li><li data-v-a8c3ffa6>Custom or oversized orders may be subject to individual assessment.</li></ul></div><div data-v-a8c3ffa6><h2 class="text-xl font-semibold mb-2" data-v-a8c3ffa6>🔹 What’s Not Covered</h2><ul class="list-disc ml-6" data-v-a8c3ffa6><li data-v-a8c3ffa6>Damage caused by improper installation or misuse</li><li data-v-a8c3ffa6>Exposure to extreme weather (hurricanes, snowstorms, etc.)</li><li data-v-a8c3ffa6>Mold, mildew, or fading due to poor maintenance</li><li data-v-a8c3ffa6>Accidental damage or alterations</li><li data-v-a8c3ffa6>Normal wear and tear</li></ul></div><div data-v-a8c3ffa6><h2 class="text-xl font-semibold mb-2" data-v-a8c3ffa6>🔹 How to Claim</h2><p class="mb-2" data-v-a8c3ffa6>To initiate a warranty claim, please provide:</p><ol class="list-decimal ml-6" data-v-a8c3ffa6><li data-v-a8c3ffa6>Your order number</li><li data-v-a8c3ffa6>Photos or videos clearly showing the issue</li><li data-v-a8c3ffa6>A brief description of the problem</li></ol><p class="mt-4" data-v-a8c3ffa6> Contact us at <a href="mailto:service@incustom.com" class="text-blue-600 hover:underline" data-v-a8c3ffa6>service@incustom.com</a> or submit the form on our <a href="/contact" class="text-blue-600 hover:underline" data-v-a8c3ffa6>Contact Us</a> page. Our team will respond within 12 hours. </p></div><div data-v-a8c3ffa6><h2 class="text-xl font-semibold mb-2" data-v-a8c3ffa6>🔹 Our Promise</h2><p data-v-a8c3ffa6> We believe great design deserves lasting quality. We’re here to support you before, during, and after your purchase. </p></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/warranty-policy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const warrantyPolicy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a8c3ffa6"]]);

export { warrantyPolicy as default };
