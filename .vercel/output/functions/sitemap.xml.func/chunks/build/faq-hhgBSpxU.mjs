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
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "px-6 py-12 max-w-5xl mx-auto text-gray-800" }, _attrs))} data-v-e6015095><h1 class="text-3xl font-bold mb-6" data-v-e6015095>FAQ – Frequently Asked Questions</h1><div class="space-y-12" data-v-e6015095><div data-v-e6015095><h2 class="text-2xl font-semibold mb-4" data-v-e6015095>🪟 Product &amp; Customization</h2><div class="space-y-4" data-v-e6015095><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q1: Can I customize the product to any size I need?</p><p data-v-e6015095>Absolutely. All of our products are made to order based on the dimensions you provide. Simply enter your desired width and height on the product page.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q2: How do I measure accurately for my shades?</p><p data-v-e6015095>We provide clear measurement guides and video tutorials on our Custom Guide page. If you’re unsure, feel free to contact our support team for assistance.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q3: Can I choose different colors or materials?</p><p data-v-e6015095>Yes. Many of our shades are available in a variety of fabric options and colors. Please refer to the product page for available choices, or contact us for special requests.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q4: Are the products waterproof or UV resistant?</p><p data-v-e6015095>Each product page will specify whether the material is water-repellent or UV-protected. Outdoor shades typically include UV-blocking fabrics by default.</p></div></div></div><div data-v-e6015095><h2 class="text-2xl font-semibold mb-4" data-v-e6015095>📦 Orders &amp; Shipping</h2><div class="space-y-4" data-v-e6015095><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q5: How long does production and shipping take?</p><p data-v-e6015095>Production usually takes 5–7 business days. Shipping time varies by destination but typically takes 10–20 days. You’ll receive a tracking number once your order ships.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q6: Do you ship internationally?</p><p data-v-e6015095>Yes, we ship worldwide to most countries including the US, Canada, Europe, Australia, and more. For remote or restricted areas, we’ll notify you if shipping isn’t available.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q7: What if my package is damaged during delivery?</p><p data-v-e6015095>Please take clear photos of the damage and contact us within 48 hours of delivery. We’ll assist you in arranging a replacement or compensation.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q8: Can I track my order?</p><p data-v-e6015095>Yes. Once your order is shipped, you’ll receive an email with a tracking link. You can also log in to your account to check your order status.</p></div></div></div><div data-v-e6015095><h2 class="text-2xl font-semibold mb-4" data-v-e6015095>💳 Payment &amp; Returns</h2><div class="space-y-4" data-v-e6015095><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q9: What payment methods do you accept?</p><p data-v-e6015095>We accept major credit cards (Visa, MasterCard), PayPal, Apple Pay, Google Pay, and other secure payment methods depending on your location.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q10: Can I cancel my order after it’s placed?</p><p data-v-e6015095>If your order hasn’t entered production, you may cancel or change it. Once we begin making your custom product, changes or cancellations are no longer possible.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q11: Can I return a custom-made product?</p><p data-v-e6015095>As all products are made to order, we do not accept returns for non-defective items. If your product has a quality issue, please contact us within 7 days of delivery.</p></div></div></div><div data-v-e6015095><h2 class="text-2xl font-semibold mb-4" data-v-e6015095>🛠 Warranty &amp; Support</h2><div class="space-y-4" data-v-e6015095><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q12: Do your products come with a warranty?</p><p data-v-e6015095>Yes. We offer a 1-year limited warranty covering material and manufacturing defects. You can find full details on our Warranty page.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q13: What’s not covered under warranty?</p><p data-v-e6015095>Damage from misuse, extreme weather, improper installation, or normal wear and tear is not covered. For full terms, refer to our Warranty Policy.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q14: Can you help if I have trouble installing my shades?</p><p data-v-e6015095>Definitely. We provide installation videos and guides, and our support team is always here to help you step-by-step if you need assistance.</p></div><div data-v-e6015095><p class="font-semibold" data-v-e6015095>Q15: Can I order fabric swatches?</p><p data-v-e6015095>Yes, fabric samples are available for select products. Reach out to us and let us know which styles or colors you’re interested in.</p></div></div></div><div class="border-t pt-6 mt-6" data-v-e6015095><h2 class="text-xl font-semibold mb-2" data-v-e6015095>💬 Still have questions?</h2><p data-v-e6015095> We’re happy to help!<br data-v-e6015095> 📧 Email us at <a href="mailto:service@incustom.com" class="text-blue-600 hover:underline" data-v-e6015095>service@incustom.com</a> or visit our <a href="/contact-us" class="text-blue-600 hover:underline" data-v-e6015095>Contact Us</a> page. We typically respond within 12 hours. </p></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e6015095"]]);

export { faq as default };
