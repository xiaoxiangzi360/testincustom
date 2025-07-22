import __nuxt_component_0 from './ContentRenderer-BrfzjLDs.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-BM85lZNa.mjs';
import { q as queryContent } from './query-B8ZgYaGI.mjs';
import { G as useServerHead, r as useHead } from './server.mjs';
import './ContentRendererMarkdown-DhAnbcVZ.mjs';
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
import 'property-information';
import './node-hwMnPqaI.mjs';
import './preview-CktqsZ1v.mjs';
import 'vue-router';
import 'tailwind-merge';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import 'ant-design-vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StaticMarkdown.server",
  __ssrInlineRender: true,
  props: {
    base: {
      type: String,
      default: "/"
    },
    path: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const { data: post } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(__props.path, () => {
      return queryContent(__props.base, __props.path).findOne();
    }, "$KURLSEoLTk")), __temp = await __temp, __restore(), __temp);
    useServerHead({
      meta: [
        { name: "description", content: () => {
          var _a;
          return (_a = post.value) == null ? void 0 : _a.title;
        } }
      ]
    });
    useHead({
      title: () => {
        var _a;
        return (_a = post.value) == null ? void 0 : _a.title;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "post",
        class: "dark:prose-invert dark:prose-gray-100 flex flex-col heading-offset max-w-none prose prose-gray-800 rounded-lg"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ContentRenderer, {
        id: "content",
        value: unref(post)
      }, {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}>No content found.</p>`);
          } else {
            return [
              createVNode("p", null, "No content found.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StaticMarkdown.server.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StaticMarkdown_server = Object.assign(_sfc_main, { __name: "StaticMarkdown" });

export { StaticMarkdown_server as default };
