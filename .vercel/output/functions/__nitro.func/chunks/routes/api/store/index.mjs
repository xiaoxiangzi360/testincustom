import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
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

const productData = {
  products: [],
  categories: [],
  badges: [
    "Low Stock",
    "Selling Fast!",
    "New!",
    "Presale",
    "Clearance",
    "Get 10% OFF^"
  ]
};
const apiBaseUrl = "https://fakestoreapi.com";
const idsOfFractionOfTheProductsArray = (products, fraction) => {
  return products.map((product) => ({
    id: product.id,
    sort: Math.random()
  })).sort((a, b) => a.sort - b.sort).map(({ id }) => id).slice(0, Math.floor(products.length * fraction));
};
const getRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};
const index = defineEventHandler(async () => {
  if (productData.products.length) {
    return productData;
  }
  const rawProducts = await $fetch(`${apiBaseUrl}/products`);
  if (!rawProducts) {
    throw createError({
      statusCode: 404,
      message: "Products not fetched."
    });
  }
  const productIdsForBadges = idsOfFractionOfTheProductsArray(rawProducts, 0.25);
  const productIdsForFreeShipping = idsOfFractionOfTheProductsArray(
    rawProducts,
    0.25
  );
  const matchers = {
    [`men's clothing`]: "men",
    [`women's clothing`]: "women",
    [`jewelery`]: "jewellery"
  };
  productData.products = rawProducts.map((product) => ({
    ...product,
    category: matchers[product.category] || product.category,
    price: (+product.price).toFixed(2),
    badge: productIdsForBadges.includes(product.id) ? getRandomItem(productData.badges) : "",
    shipping: productIdsForFreeShipping.includes(product.id) ? "Free Shipping" : ""
  }));
  productData.categories = await $fetch(`${apiBaseUrl}/products/categories`);
  productData.categories = productData.categories.map(
    (category) => matchers[category]
  );
  return productData;
});

export { index as default, productData };
