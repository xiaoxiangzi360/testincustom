import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BMZvH9i9.mjs';
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
  __name: "contact-us",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const name = ref("");
    const email = ref("");
    const content = ref("");
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "px-6 py-12 max-w-3xl mx-auto text-gray-800" }, _attrs))} data-v-5ecb622e><h1 class="text-3xl font-bold mb-4" data-v-5ecb622e>Contact Us</h1><p class="mb-6" data-v-5ecb622e> We’re here to help you design the perfect shade solution for your space.<br data-v-5ecb622e> Reach out anytime — we reply within 12 hours. </p><div class="mb-6" data-v-5ecb622e><p class="font-semibold" data-v-5ecb622e>Email:</p><ul class="list-disc ml-6 text-blue-600" data-v-5ecb622e><li data-v-5ecb622e><a href="mailto:hello@incustom.com" class="hover:underline" data-v-5ecb622e>hello@incustom.com</a></li><li data-v-5ecb622e><a href="mailto:service@incustom.com" class="hover:underline" data-v-5ecb622e>service@incustom.com</a></li></ul></div><div class="mt-10" data-v-5ecb622e><h2 class="text-2xl font-semibold mb-2" data-v-5ecb622e>Contact Form</h2><p class="mb-4" data-v-5ecb622e>Have a question or custom request? Tell us more.</p><form class="space-y-4" data-v-5ecb622e><div data-v-5ecb622e><label for="name" class="block font-medium mb-1" data-v-5ecb622e>Name</label><input id="name" type="text"${ssrRenderAttr("value", name.value)} class="w-full border border-gray-300 rounded-lg px-4 py-2" data-v-5ecb622e></div><div data-v-5ecb622e><label for="email" class="block font-medium mb-1" data-v-5ecb622e>Email</label><input id="email" type="email"${ssrRenderAttr("value", email.value)} class="w-full border border-gray-300 rounded-lg px-4 py-2" data-v-5ecb622e></div><div data-v-5ecb622e><label for="message" class="block font-medium mb-1" data-v-5ecb622e>Message</label><textarea id="message" rows="5" class="w-full border border-gray-300 rounded-lg px-4 py-2" data-v-5ecb622e>${ssrInterpolate(content.value)}</textarea></div><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50" data-v-5ecb622e>${ssrInterpolate(isLoading.value ? "Sending..." : "Send Message")}</button></form></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/contact-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contactUs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5ecb622e"]]);

export { contactUs as default };
