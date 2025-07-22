import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import _RemarkEmoji from 'remark-emoji';
import rehypeExternalLinks from 'rehype-external-links';
import { a3 as rehypeHighlight$1 } from '../_/nitro.mjs';
import 'unist-util-visit';
import 'hast-util-to-string';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'path';
import 'fs';
import 'vue';
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
import 'vue/server-renderer';
import 'node:url';
import 'ipx';

const defaults = {
  theme: {},
  async highlighter(code, lang, theme, options) {
    try {
      if (globalThis._importMeta_.browser && window.sessionStorage.getItem("mdc-shiki-highlighter") === "browser") {
        return import('./mdc-highlighter.mjs').then((h) => h.default(code, lang, theme, options)).catch(() => ({}));
      }
      return await $fetch("/api/_mdc/highlight", {
        params: {
          code,
          lang,
          theme: JSON.stringify(theme),
          options: JSON.stringify(options)
        }
      });
    } catch (e) {
      if (globalThis._importMeta_.browser && e?.response?.status === 404) {
        window.sessionStorage.setItem("mdc-shiki-highlighter", "browser");
        return this.highlighter?.(code, lang, theme, options);
      }
    }
    return Promise.resolve({ tree: [{ type: "text", value: code }], className: "", style: "" });
  }
};
function rehypeHighlight(opts = {}) {
  const options = { ...defaults, ...opts };
  if (typeof options.highlighter !== "function") {
    options.highlighter = defaults.highlighter;
  }
  return rehypeHighlight$1(options);
}

const remarkPlugins = {
  'remark-emoji': { instance: _RemarkEmoji },
};

const rehypePlugins = {
  'rehype-external-links': { instance: rehypeExternalLinks, options: {"target":"_blank","rel":["noopener"]} },
  'highlight': { instance: rehypeHighlight, options: {} },
};

const highlight = {"theme":"dracula-soft"};

export { highlight, rehypePlugins, remarkPlugins };
