import { d as defineEventHandler, c as createError } from '../../../../_/nitro.mjs';
import { productData } from '../index.mjs';
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
import 'vue/server-renderer';
import 'node:url';
import 'ipx';

const apiBaseUrl = "https://fakestoreapi.com";
const _id_ = defineEventHandler(async (event) => {
  const { id } = event.context.params;
  let product;
  if (productData.products.length) {
    product = productData.products.find((product2) => +product2.id === +id);
  }
  if (!product) {
    product = await $fetch(`${apiBaseUrl}/products/${id}`);
    if (product) {
      product = {
        ...product,
        badge: "",
        shipping: ""
      };
    } else {
      throw createError({
        statusCode: 404,
        message: "Product not fetched."
      });
    }
  }
  return product;
});

export { _id_ as default };
