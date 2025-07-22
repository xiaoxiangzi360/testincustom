import { e as __nuxt_component_7 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact-us",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-12 text-center bg-primary-600 dark:bg-primary-200 text-white dark:text-primary-800" }, _attrs))}><div class="container mx-auto px-4"><div class="-mx-4 flex flex-wrap"><div class="mx-auto px-4 rounded-2xl w-full lg:w-8/12"><div class="px-6 py-12 rounded-lg tertiary-card"><h2 class="font-bold leading-tight mb-2 text-3xl"> Subscribe To Our Newsletter </h2><p class="mb-8"> Sign up for our newsletter to receive updates and exclusive offers </p><form class="mx-auto sm:w-9/12 xl:w-8/12" action="https://www.getdrip.com/forms/243852739/submissions" method="post" target="_blank" rel="noopener" data-drip-embedded-form="243852739"><div class="flex items-center overflow-hidden p-2 rounded-full"><label for="emailfield" class="sr-only">Email address:</label><input id="emailfield" class="border-0 flex-1 outline-none px-5 py-2 rounded-full w-full" placeholder="email@example.com" type="email" required name="fields[email]">`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        class: "ml-2",
        size: "md",
        color: "secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign Up `);
          } else {
            return [
              createTextVNode(" Sign Up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
