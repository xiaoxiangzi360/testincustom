import { g as useRoute, _ as _export_sfc, a as __nuxt_component_1$2, u as useCookie, c as __nuxt_component_5, d as __nuxt_component_0$1$1, e as __nuxt_component_7$1, i as useUI, m as mergeConfig, j as appConfig, T as arrow } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, createVNode, createTextVNode, watch, createBlock, createCommentVNode, withKeys, openBlock, withModifiers, Fragment, renderList, toDisplayString, unref, isRef, nextTick, resolveComponent, withDirectives, vModelText, renderSlot, toRef, Transition, useId, onMounted, onUnmounted, provide, watchEffect, h, inject, shallowRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { h as publicAssetsURL, A as defu } from '../_/nitro.mjs';
import { h as he, S as Se$1, G as Ge$1, Y as Ye, n, q, N as N$1$1, E as E$1, d as d$3, v } from './transition-DT3phGok.mjs';
import { s, i, o as o$1, A, N as N$1, u as u$1, a as o } from './keyboard-Duq8EHr3.mjs';
import { w } from './active-element-history-BbzAu_2T.mjs';
import { s as s$1 } from './use-resolve-button-type-DOOP2SMg.mjs';
import { i as i$1, P, N, f, u, E, w as w$1, h as h$1, T } from './hidden-BKyvU3BW.mjs';
import { l, i as i$2, t } from './open-closed-BDzQJ33n.mjs';
import { u as usePopper } from './usePopper-BrvKSG9Z.mjs';
import { useRouter, useRoute as useRoute$1 } from 'vue-router';
import { _ as __nuxt_component_3 } from './FormGroup-D9YCQMEV.mjs';
import { _ as __nuxt_component_4 } from './Input-B5r9LTzZ.mjs';
import { _ as __nuxt_component_0$3 } from './NuxtImg-CB91evk_.mjs';
import { _ as __nuxt_component_2$1 } from './Badge-C4qFuzNw.mjs';
import { _ as __nuxt_component_5$1 } from './Card-BmnXDPH2.mjs';
import { _ as __nuxt_component_6$1 } from './SelectMenu-CA8fbto0.mjs';
import { _ as _imports_0$2 } from './virtual_public-DOvymBfg.mjs';
import { Tooltip, message } from 'ant-design-vue';
import { c as cartAuth, u as useCartStore } from './cart-DGSyKrC3.mjs';
import { u as useAuth } from './useAuth-BMZvH9i9.mjs';
import { L as LocationAuth } from './location-BxTFTaaq.mjs';
import { u as useHeadAndMeta, a as useOgImage } from './og-image-DKnnKqSY.mjs';
import 'tailwind-merge';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org';
import '@unhead/schema-org/vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
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
import './useFormGroup-XFEs-B9Y.mjs';
import './composables-CEJS1CB5.mjs';
import '@tanstack/vue-virtual';
import './optimize-image-BybfjNrn.mjs';

const slideover = {
  wrapper: "fixed inset-0 flex z-50",
  overlay: {
    base: "fixed inset-0 transition-opacity",
    background: "bg-gray-200/75 dark:bg-gray-800/75",
    // Syntax for `<TransitionRoot>` component https://headlessui.com/v1/vue/transition#basic-example
    transition: {
      enter: "ease-in-out duration-500",
      enterFrom: "opacity-0",
      enterTo: "opacity-100",
      leave: "ease-in-out duration-500",
      leaveFrom: "opacity-100",
      leaveTo: "opacity-0"
    }
  },
  base: "relative flex-1 flex flex-col w-full focus:outline-none",
  background: "bg-white dark:bg-gray-900",
  ring: "",
  rounded: "",
  padding: "",
  shadow: "shadow-xl",
  width: "w-screen max-w-md",
  height: "h-screen max-h-96",
  translate: {
    base: "translate-x-0",
    left: "-translate-x-full rtl:translate-x-full",
    right: "translate-x-full rtl:-translate-x-full",
    top: "-translate-y-full",
    bottom: "translate-y-full"
  },
  // Syntax for `<TransitionRoot>` component https://headlessui.com/v1/vue/transition#basic-example
  transition: {
    enter: "transform transition ease-in-out duration-300",
    leave: "transform transition ease-in-out duration-200"
  }
};
const popover = {
  wrapper: "relative",
  container: "z-50 group",
  trigger: "inline-flex w-full",
  width: "",
  background: "bg-white dark:bg-gray-900",
  shadow: "shadow-lg",
  rounded: "rounded-md",
  ring: "ring-1 ring-gray-200 dark:ring-gray-800",
  base: "overflow-hidden focus:outline-none relative",
  // Syntax for `<Transition>` component https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  transition: {
    enterActiveClass: "transition ease-out duration-200",
    enterFromClass: "opacity-0 translate-y-1",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "transition ease-in duration-150",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveToClass: "opacity-0 translate-y-1"
  },
  overlay: {
    base: "fixed inset-0 transition-opacity z-50",
    background: "bg-gray-200/75 dark:bg-gray-800/75",
    transition: {
      enterActiveClass: "ease-out duration-200",
      enterFromClass: "opacity-0",
      enterToClass: "opacity-100",
      leaveActiveClass: "ease-in duration-150",
      leaveFromClass: "opacity-100",
      leaveToClass: "opacity-0"
    }
  },
  popper: {
    strategy: "fixed"
  },
  default: {
    openDelay: 0,
    closeDelay: 0
  },
  arrow
};
var Se = ((s2) => (s2[s2.Open = 0] = "Open", s2[s2.Closed = 1] = "Closed", s2))(Se || {});
let re = Symbol("PopoverContext");
function U(d2) {
  let P2 = inject(re, null);
  if (P2 === null) {
    let s2 = new Error(`<${d2} /> is missing a parent <${ye.name} /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(s2, U), s2;
  }
  return P2;
}
let le = Symbol("PopoverGroupContext");
function ae() {
  return inject(le, null);
}
let ue = Symbol("PopoverPanelContext");
function ge() {
  return inject(ue, null);
}
let ye = defineComponent({ name: "Popover", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" } }, setup(d2, { slots: P2, attrs: s2, expose: h$2 }) {
  var u2;
  let f2 = ref(null);
  h$2({ el: f2, $el: f2 });
  let t$1 = ref(1), o$12 = ref(null), y = ref(null), v2 = ref(null), m = ref(null), b = computed(() => i$1(f2)), E$2 = computed(() => {
    var L, $;
    if (!o$1(o$12) || !o$1(m)) return false;
    for (let x of (void 0).querySelectorAll("body > *")) if (Number(x == null ? void 0 : x.contains(o$1(o$12))) ^ Number(x == null ? void 0 : x.contains(o$1(m)))) return true;
    let e = E(), r = e.indexOf(o$1(o$12)), l2 = (r + e.length - 1) % e.length, g = (r + 1) % e.length, G = e[l2], C = e[g];
    return !((L = o$1(m)) != null && L.contains(G)) && !(($ = o$1(m)) != null && $.contains(C));
  }), a = { popoverState: t$1, buttonId: ref(null), panelId: ref(null), panel: m, button: o$12, isPortalled: E$2, beforePanelSentinel: y, afterPanelSentinel: v2, togglePopover() {
    t$1.value = u$1(t$1.value, { [0]: 1, [1]: 0 });
  }, closePopover() {
    t$1.value !== 1 && (t$1.value = 1);
  }, close(e) {
    a.closePopover();
    let r = (() => e ? e instanceof HTMLElement ? e : e.value instanceof HTMLElement ? o$1(e) : o$1(a.button) : o$1(a.button))();
    r == null || r.focus();
  } };
  provide(re, a), t(computed(() => u$1(t$1.value, { [0]: i$2.Open, [1]: i$2.Closed })));
  let S = { buttonId: a.buttonId, panelId: a.panelId, close() {
    a.closePopover();
  } }, c = ae(), I = c == null ? void 0 : c.registerPopover, [F, w$2] = q(), i2 = N$1$1({ mainTreeNodeRef: c == null ? void 0 : c.mainTreeNodeRef, portals: F, defaultContainers: [o$12, m] });
  function p() {
    var e, r, l2, g;
    return (g = c == null ? void 0 : c.isFocusWithinPopoverGroup()) != null ? g : ((e = b.value) == null ? void 0 : e.activeElement) && (((r = o$1(o$12)) == null ? void 0 : r.contains(b.value.activeElement)) || ((l2 = o$1(m)) == null ? void 0 : l2.contains(b.value.activeElement)));
  }
  return watchEffect(() => I == null ? void 0 : I(S)), E$1((u2 = b.value) == null ? void 0 : u2.defaultView, "focus", (e) => {
    var r, l2;
    e.target !== void 0 && e.target instanceof HTMLElement && t$1.value === 0 && (p() || o$12 && m && (i2.contains(e.target) || (r = o$1(a.beforePanelSentinel)) != null && r.contains(e.target) || (l2 = o$1(a.afterPanelSentinel)) != null && l2.contains(e.target) || a.closePopover()));
  }, true), w(i2.resolveContainers, (e, r) => {
    var l2;
    a.closePopover(), w$1(r, h$1.Loose) || (e.preventDefault(), (l2 = o$1(o$12)) == null || l2.focus());
  }, computed(() => t$1.value === 0)), () => {
    let e = { open: t$1.value === 0, close: a.close };
    return h(Fragment, [h(w$2, {}, () => A({ theirProps: { ...d2, ...s2 }, ourProps: { ref: f2 }, slot: e, slots: P2, attrs: s2, name: "Popover" })), h(i2.MainTreeNode)]);
  };
} }), Ge = defineComponent({ name: "PopoverButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: null } }, inheritAttrs: false, setup(d$1, { attrs: P$1, slots: s$12, expose: h$12 }) {
  var u$2;
  let f$1 = (u$2 = d$1.id) != null ? u$2 : `headlessui-popover-button-${i()}`, t2 = U("PopoverButton"), o$2 = computed(() => i$1(t2.button));
  h$12({ el: t2.button, $el: t2.button }), onMounted(() => {
    t2.buttonId.value = f$1;
  }), onUnmounted(() => {
    t2.buttonId.value = null;
  });
  let y = ae(), v2 = y == null ? void 0 : y.closeOthers, m = ge(), b = computed(() => m === null ? false : m.value === t2.panelId.value), E$12 = ref(null), a = `headlessui-focus-sentinel-${i()}`;
  b.value || watchEffect(() => {
    t2.button.value = o$1(E$12);
  });
  let S = s$1(computed(() => ({ as: d$1.as, type: P$1.type })), E$12);
  function c(e) {
    var r, l2, g, G, C;
    if (b.value) {
      if (t2.popoverState.value === 1) return;
      switch (e.key) {
        case o.Space:
        case o.Enter:
          e.preventDefault(), (l2 = (r = e.target).click) == null || l2.call(r), t2.closePopover(), (g = o$1(t2.button)) == null || g.focus();
          break;
      }
    } else switch (e.key) {
      case o.Space:
      case o.Enter:
        e.preventDefault(), e.stopPropagation(), t2.popoverState.value === 1 && (v2 == null || v2(t2.buttonId.value)), t2.togglePopover();
        break;
      case o.Escape:
        if (t2.popoverState.value !== 0) return v2 == null ? void 0 : v2(t2.buttonId.value);
        if (!o$1(t2.button) || (G = o$2.value) != null && G.activeElement && !((C = o$1(t2.button)) != null && C.contains(o$2.value.activeElement))) return;
        e.preventDefault(), e.stopPropagation(), t2.closePopover();
        break;
    }
  }
  function I(e) {
    b.value || e.key === o.Space && e.preventDefault();
  }
  function F(e) {
    var r, l2;
    d$1.disabled || (b.value ? (t2.closePopover(), (r = o$1(t2.button)) == null || r.focus()) : (e.preventDefault(), e.stopPropagation(), t2.popoverState.value === 1 && (v2 == null || v2(t2.buttonId.value)), t2.togglePopover(), (l2 = o$1(t2.button)) == null || l2.focus()));
  }
  function w2(e) {
    e.preventDefault(), e.stopPropagation();
  }
  let i$22 = n();
  function p() {
    let e = o$1(t2.panel);
    if (!e) return;
    function r() {
      u$1(i$22.value, { [d$3.Forwards]: () => P(e, N.First), [d$3.Backwards]: () => P(e, N.Last) }) === T.Error && P(E().filter((g) => g.dataset.headlessuiFocusGuard !== "true"), u$1(i$22.value, { [d$3.Forwards]: N.Next, [d$3.Backwards]: N.Previous }), { relativeTo: o$1(t2.button) });
    }
    r();
  }
  return () => {
    let e = t2.popoverState.value === 0, r = { open: e }, { ...l2 } = d$1, g = b.value ? { ref: E$12, type: S.value, onKeydown: c, onClick: F } : { ref: E$12, id: f$1, type: S.value, "aria-expanded": t2.popoverState.value === 0, "aria-controls": o$1(t2.panel) ? t2.panelId.value : void 0, disabled: d$1.disabled ? true : void 0, onKeydown: c, onKeyup: I, onClick: F, onMousedown: w2 };
    return h(Fragment, [A({ ourProps: g, theirProps: { ...P$1, ...l2 }, slot: r, attrs: P$1, slots: s$12, name: "PopoverButton" }), e && !b.value && t2.isPortalled.value && h(f, { id: a, features: u.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: p })]);
  };
} });
defineComponent({ name: "PopoverOverlay", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(d2, { attrs: P2, slots: s2 }) {
  let h2 = U("PopoverOverlay"), f2 = `headlessui-popover-overlay-${i()}`, t2 = l(), o2 = computed(() => t2 !== null ? (t2.value & i$2.Open) === i$2.Open : h2.popoverState.value === 0);
  function y() {
    h2.closePopover();
  }
  return () => {
    let v2 = { open: h2.popoverState.value === 0 };
    return A({ ourProps: { id: f2, "aria-hidden": true, onClick: y }, theirProps: d2, slot: v2, attrs: P2, slots: s2, features: N$1.RenderStrategy | N$1.Static, visible: o2.value, name: "PopoverOverlay" });
  };
} });
let je = defineComponent({ name: "PopoverPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, focus: { type: Boolean, default: false }, id: { type: String, default: null } }, inheritAttrs: false, setup(d$1, { attrs: P$1, slots: s2, expose: h$12 }) {
  var w2;
  let f$1 = (w2 = d$1.id) != null ? w2 : `headlessui-popover-panel-${i()}`, { focus: t2 } = d$1, o$2 = U("PopoverPanel"), y = computed(() => i$1(o$2.panel)), v2 = `headlessui-focus-sentinel-before-${i()}`, m = `headlessui-focus-sentinel-after-${i()}`;
  h$12({ el: o$2.panel, $el: o$2.panel }), onMounted(() => {
    o$2.panelId.value = f$1;
  }), onUnmounted(() => {
    o$2.panelId.value = null;
  }), provide(ue, o$2.panelId), watchEffect(() => {
    var p, u2;
    if (!t2 || o$2.popoverState.value !== 0 || !o$2.panel) return;
    let i2 = (p = y.value) == null ? void 0 : p.activeElement;
    (u2 = o$1(o$2.panel)) != null && u2.contains(i2) || P(o$1(o$2.panel), N.First);
  });
  let b = l(), E$12 = computed(() => b !== null ? (b.value & i$2.Open) === i$2.Open : o$2.popoverState.value === 0);
  function a(i2) {
    var p, u2;
    switch (i2.key) {
      case o.Escape:
        if (o$2.popoverState.value !== 0 || !o$1(o$2.panel) || y.value && !((p = o$1(o$2.panel)) != null && p.contains(y.value.activeElement))) return;
        i2.preventDefault(), i2.stopPropagation(), o$2.closePopover(), (u2 = o$1(o$2.button)) == null || u2.focus();
        break;
    }
  }
  function S(i2) {
    var u2, e, r, l2, g;
    let p = i2.relatedTarget;
    p && o$1(o$2.panel) && ((u2 = o$1(o$2.panel)) != null && u2.contains(p) || (o$2.closePopover(), ((r = (e = o$1(o$2.beforePanelSentinel)) == null ? void 0 : e.contains) != null && r.call(e, p) || (g = (l2 = o$1(o$2.afterPanelSentinel)) == null ? void 0 : l2.contains) != null && g.call(l2, p)) && p.focus({ preventScroll: true })));
  }
  let c = n();
  function I() {
    let i2 = o$1(o$2.panel);
    if (!i2) return;
    function p() {
      u$1(c.value, { [d$3.Forwards]: () => {
        var e;
        P(i2, N.First) === T.Error && ((e = o$1(o$2.afterPanelSentinel)) == null || e.focus());
      }, [d$3.Backwards]: () => {
        var u2;
        (u2 = o$1(o$2.button)) == null || u2.focus({ preventScroll: true });
      } });
    }
    p();
  }
  function F() {
    let i2 = o$1(o$2.panel);
    if (!i2) return;
    function p() {
      u$1(c.value, { [d$3.Forwards]: () => {
        let u2 = o$1(o$2.button), e = o$1(o$2.panel);
        if (!u2) return;
        let r = E(), l2 = r.indexOf(u2), g = r.slice(0, l2 + 1), C = [...r.slice(l2 + 1), ...g];
        for (let L of C.slice()) if (L.dataset.headlessuiFocusGuard === "true" || e != null && e.contains(L)) {
          let $ = C.indexOf(L);
          $ !== -1 && C.splice($, 1);
        }
        P(C, N.First, { sorted: false });
      }, [d$3.Backwards]: () => {
        var e;
        P(i2, N.Previous) === T.Error && ((e = o$1(o$2.button)) == null || e.focus());
      } });
    }
    p();
  }
  return () => {
    let i2 = { open: o$2.popoverState.value === 0, close: o$2.close }, { focus: p, ...u$12 } = d$1, e = { ref: o$2.panel, id: f$1, onKeydown: a, onFocusout: t2 && o$2.popoverState.value === 0 ? S : void 0, tabIndex: -1 };
    return A({ ourProps: e, theirProps: { ...P$1, ...u$12 }, attrs: P$1, slot: i2, slots: { ...s2, default: (...r) => {
      var l2;
      return [h(Fragment, [E$12.value && o$2.isPortalled.value && h(f, { id: v2, ref: o$2.beforePanelSentinel, features: u.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: I }), (l2 = s2.default) == null ? void 0 : l2.call(s2, ...r), E$12.value && o$2.isPortalled.value && h(f, { id: m, ref: o$2.afterPanelSentinel, features: u.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: F })])];
    } }, features: N$1.RenderStrategy | N$1.Static, visible: E$12.value, name: "PopoverPanel" });
  };
} });
defineComponent({ name: "PopoverGroup", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" } }, setup(d2, { attrs: P2, slots: s2, expose: h$12 }) {
  let f2 = ref(null), t2 = shallowRef([]), o$12 = computed(() => i$1(f2)), y = v();
  h$12({ el: f2, $el: f2 });
  function v$1(a) {
    let S = t2.value.indexOf(a);
    S !== -1 && t2.value.splice(S, 1);
  }
  function m(a) {
    return t2.value.push(a), () => {
      v$1(a);
    };
  }
  function b() {
    var c;
    let a = o$12.value;
    if (!a) return false;
    let S = a.activeElement;
    return (c = o$1(f2)) != null && c.contains(S) ? true : t2.value.some((I) => {
      var F, w2;
      return ((F = a.getElementById(I.buttonId.value)) == null ? void 0 : F.contains(S)) || ((w2 = a.getElementById(I.panelId.value)) == null ? void 0 : w2.contains(S));
    });
  }
  function E2(a) {
    for (let S of t2.value) S.buttonId.value !== a && S.close();
  }
  return provide(le, { registerPopover: m, unregisterPopover: v$1, isFocusWithinPopoverGroup: b, closeOthers: E2, mainTreeNodeRef: y.mainTreeNodeRef }), () => h(Fragment, [A({ ourProps: { ref: f2 }, theirProps: { ...d2, ...P2 }, slot: {}, attrs: P2, slots: s2, name: "PopoverGroup" }), h(y.MainTreeNode)]);
} });
const _imports_0$1 = publicAssetsURL("/images/incustom.png");
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "TheLogo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ULink = __nuxt_component_0$1$1;
      _push(ssrRenderComponent(_component_ULink, mergeProps({
        "data-pg-name": "Logo",
        class: "flex sm:flex-row",
        to: "/"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><img${ssrRenderAttr("src", _imports_0$1)} alt="InCustom" class="h-8"${_scopeId}><div class="text-xs mt-1"${_scopeId}>Unique but Affordable</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("img", {
                  src: _imports_0$1,
                  alt: "InCustom",
                  class: "h-8"
                }),
                createVNode("div", { class: "text-xs mt-1" }, "Unique but Affordable")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../app-nuxtui-layer/components/TheLogo.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0$2 = Object.assign(_sfc_main$8, { __name: "TheLogo" });
const isMobileMenuOpen = ref(false);
const isSecondaryMenuOpen = ref(false);
const openMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const useMobileMenu = () => {
  return {
    isMobileMenuOpen,
    isSecondaryMenuOpen,
    openMobileMenu
  };
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "NavHamburger",
  __ssrInlineRender: true,
  setup(__props) {
    const { isMobileMenuOpen: isMobileMenuOpen2, openMobileMenu: openMobileMenu2 } = useMobileMenu();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_5;
      _push(ssrRenderComponent(_component_UIcon, mergeProps({
        class: "w-7 h-7",
        width: "28",
        height: "28",
        name: unref(isMobileMenuOpen2) ? "i-material-symbols-close" : "i-material-symbols-menu",
        onClick: unref(openMobileMenu2)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../app-nuxtui-layer/components/nav/NavHamburger.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$7, { __name: "NavHamburger" });
const config$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.popover, popover);
const _sfc_main$6 = defineComponent({
  components: {
    HPopover: ye,
    HPopoverButton: Ge,
    HPopoverPanel: je
  },
  inheritAttrs: false,
  props: {
    mode: {
      type: String,
      default: "click",
      validator: (value) => ["click", "hover"].includes(value)
    },
    open: {
      type: Boolean,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    openDelay: {
      type: Number,
      default: () => config$1.default.openDelay
    },
    closeDelay: {
      type: Number,
      default: () => config$1.default.closeDelay
    },
    overlay: {
      type: Boolean,
      default: false
    },
    popper: {
      type: Object,
      default: () => ({})
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:open"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("popover", toRef(props, "ui"), config$1, toRef(props, "class"));
    const popper = computed(() => defu(props.mode === "hover" ? { offsetDistance: 0 } : {}, props.popper, ui.value.popper));
    const [trigger, container] = usePopper(popper.value);
    const popover2 = ref(null);
    const popoverApi = ref(null);
    let openTimeout = null;
    let closeTimeout = null;
    const containerStyle = computed(() => {
      var _a, _b, _c;
      if (props.mode !== "hover") {
        return {};
      }
      const offsetDistance = ((_a = props.popper) == null ? void 0 : _a.offsetDistance) || ((_b = ui.value.popper) == null ? void 0 : _b.offsetDistance) || 8;
      const placement = (_c = popper.value.placement) == null ? void 0 : _c.split("-")[0];
      const padding = `${offsetDistance}px`;
      if (placement === "top" || placement === "bottom") {
        return {
          paddingTop: padding,
          paddingBottom: padding
        };
      } else if (placement === "left" || placement === "right") {
        return {
          paddingLeft: padding,
          paddingRight: padding
        };
      } else {
        return {
          paddingTop: padding,
          paddingBottom: padding,
          paddingLeft: padding,
          paddingRight: padding
        };
      }
    });
    function onTouchStart(event) {
      if (!event.cancelable || !popoverApi.value || props.mode === "click") {
        return;
      }
      if (popoverApi.value.popoverState === 0) {
        popoverApi.value.closePopover();
      } else {
        popoverApi.value.togglePopover();
      }
    }
    function onMouseEnter() {
      if (props.mode !== "hover" || !popoverApi.value) {
        return;
      }
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      if (popoverApi.value.popoverState === 0) {
        return;
      }
      openTimeout = openTimeout || setTimeout(() => {
        if (popoverApi.value.togglePopover) {
          popoverApi.value.togglePopover();
        }
        openTimeout = null;
      }, props.openDelay);
    }
    function onMouseLeave() {
      if (props.mode !== "hover" || !popoverApi.value) {
        return;
      }
      if (openTimeout) {
        clearTimeout(openTimeout);
        openTimeout = null;
      }
      if (popoverApi.value.popoverState === 1) {
        return;
      }
      closeTimeout = closeTimeout || setTimeout(() => {
        if (popoverApi.value.closePopover) {
          popoverApi.value.closePopover();
        }
        closeTimeout = null;
      }, props.closeDelay);
    }
    watch(() => props.open, (newValue, oldValue) => {
      if (!popoverApi.value) return;
      if (oldValue === void 0 || newValue === oldValue) return;
      if (newValue) {
        popoverApi.value.popoverState = 0;
      } else {
        popoverApi.value.closePopover();
      }
    });
    watch(() => {
      var _a;
      return (_a = popoverApi.value) == null ? void 0 : _a.popoverState;
    }, (newValue, oldValue) => {
      if (oldValue === void 0 || newValue === oldValue) return;
      emit("update:open", newValue === 0);
    });
    s(() => useId());
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      popover: popover2,
      // eslint-disable-next-line vue/no-dupe-keys
      popper,
      trigger,
      container,
      containerStyle,
      onTouchStart,
      onMouseEnter,
      onMouseLeave
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HPopover = resolveComponent("HPopover");
  const _component_HPopoverButton = resolveComponent("HPopoverButton");
  const _component_HPopoverPanel = resolveComponent("HPopoverPanel");
  _push(ssrRenderComponent(_component_HPopover, mergeProps({
    ref: "popover",
    class: _ctx.ui.wrapper
  }, _ctx.attrs, { onMouseleave: _ctx.onMouseLeave }, _attrs), {
    default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HPopoverButton, {
          ref: "trigger",
          as: "div",
          disabled: _ctx.disabled,
          class: _ctx.ui.trigger,
          role: "button",
          onMouseenter: _ctx.onMouseEnter,
          onTouchstart: _ctx.onTouchStart
        }, {
          default: withCtx((_, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              ssrRenderSlot(_ctx.$slots, "default", {
                open,
                close
              }, () => {
                _push3(`<button${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${_scopeId2}> Open </button>`);
              }, _push3, _parent3, _scopeId2);
            } else {
              return [
                renderSlot(_ctx.$slots, "default", {
                  open,
                  close
                }, () => [
                  createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
        if (_ctx.overlay) {
          _push2(`<template>`);
          if (open) {
            _push2(`<div class="${ssrRenderClass([_ctx.ui.overlay.base, _ctx.ui.overlay.background])}"${_scopeId}></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</template>`);
        } else {
          _push2(`<!---->`);
        }
        if (open) {
          _push2(`<div class="${ssrRenderClass([_ctx.ui.container, _ctx.ui.width])}" style="${ssrRenderStyle(_ctx.containerStyle)}"${_scopeId}><template><div${_scopeId}>`);
          if (_ctx.popper.arrow) {
            _push2(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.ui.arrow))}"${_scopeId}></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_HPopoverPanel, {
            class: [_ctx.ui.base, _ctx.ui.background, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.shadow],
            static: ""
          }, {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "panel", {
                  open,
                  close
                }, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "panel", {
                    open,
                    close
                  })
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div></template></div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(_component_HPopoverButton, {
            ref: "trigger",
            as: "div",
            disabled: _ctx.disabled,
            class: _ctx.ui.trigger,
            role: "button",
            onMouseenter: _ctx.onMouseEnter,
            onTouchstartPassive: _ctx.onTouchStart
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                open,
                close
              }, () => [
                createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])
              ])
            ]),
            _: 2
          }, 1032, ["disabled", "class", "onMouseenter", "onTouchstartPassive"]),
          _ctx.overlay ? (openBlock(), createBlock(Transition, mergeProps({
            key: 0,
            appear: ""
          }, _ctx.ui.overlay.transition), {
            default: withCtx(() => [
              open ? (openBlock(), createBlock("div", {
                key: 0,
                class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
              }, null, 2)) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1040)) : createCommentVNode("", true),
          open ? (openBlock(), createBlock("div", {
            key: 1,
            ref: "container",
            class: [_ctx.ui.container, _ctx.ui.width],
            style: _ctx.containerStyle,
            onMouseenter: _ctx.onMouseEnter
          }, [
            createVNode(Transition, mergeProps({ appear: "" }, _ctx.ui.transition), {
              default: withCtx(() => [
                createVNode("div", null, [
                  _ctx.popper.arrow ? (openBlock(), createBlock("div", {
                    key: 0,
                    "data-popper-arrow": "",
                    class: Object.values(_ctx.ui.arrow)
                  }, null, 2)) : createCommentVNode("", true),
                  createVNode(_component_HPopoverPanel, {
                    class: [_ctx.ui.base, _ctx.ui.background, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.shadow],
                    static: ""
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "panel", {
                        open,
                        close
                      })
                    ]),
                    _: 2
                  }, 1032, ["class"])
                ])
              ]),
              _: 2
            }, 1040)
          ], 46, ["onMouseenter"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/overlays/Popover.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$1]]), { __name: "UPopover" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NavPrimary",
  __ssrInlineRender: true,
  setup(__props) {
    const { isMobileMenuOpen: isMobileMenuOpen2, openMobileMenu: openMobileMenu2 } = useMobileMenu();
    const router = useRouter();
    const categories = ref([
      { label: "Shade Sail", link: "/Shade Sail-689" },
      { label: "Roller Shade", link: "/Roller Shade-764" },
      { label: "Privacy Screen", link: "/Privacy Screen-765" },
      { label: "Shade Cloth", link: "/Shade Cloth-766" },
      { label: "Plant Cover", link: "/Plant Cover-767" },
      { label: "Patio Furniture Covers", link: "/Patio Furniture Covers-12" }
    ]);
    const collectionlist = ref([
      {
        title: "Outdoor Shade Solutions",
        description: "UV protection for outdoor living. >",
        image: "/images/cate1.png"
      },
      {
        title: "Privacy & Garden Decor",
        description: "Stylish privacy for your backyard. >",
        image: "/images/cate2.png"
      },
      {
        title: "Indoor Window Shades",
        description: "Elegant shading for modern homes. >",
        image: "/images/cate3.png"
      },
      {
        title: "Custom Printed Shade & Screen",
        description: "Print your ideas on fabric. >",
        image: "/images/cate4.png"
      }
    ]);
    const menuOpen = ref(false);
    const Gotocollection = (collection) => {
      router.push("/collections/" + collection);
      openMobileMenu2();
      isMobileMenuOpen2.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_UPopover = __nuxt_component_0$1;
      const _component_UList = resolveComponent("UList");
      const _component_UListItem = resolveComponent("UListItem");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap gap-3 md:flex-nowrap md:flex-row md:gap-6" }, _attrs))} data-v-7ec44f9d><!--[-->`);
      ssrRenderList(categories.value, (category, index) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          onClick: unref(openMobileMenu2),
          key: index,
          to: category.link,
          class: "text-base md:text-lg hover:text-primary hover:bg-transparent duration-200 p-2 border border-transparent md:border-none !text-base whitespace-nowrap"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(category.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(category.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_UPopover, {
        color: "white",
        open: menuOpen.value,
        "onUpdate:open": ($event) => menuOpen.value = $event,
        mode: "hover",
        ui: {
          base: "overflow-visible border-none shadow-2xl bg-white rounded-md focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow"
        },
        popper: { placement: "bottom" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, { class: "text-base md:text-lg hover:text-primary hover:bg-transparent duration-200 p-2 border border-transparent md:border-none !text-base" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Collections `);
                } else {
                  return [
                    createTextVNode(" Collections ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, { class: "text-base md:text-lg hover:text-primary hover:bg-transparent duration-200 p-2 border border-transparent md:border-none !text-base" }, {
                default: withCtx(() => [
                  createTextVNode(" Collections ")
                ]),
                _: 1
              })
            ];
          }
        }),
        panel: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-center bg-gray-100 rounded" data-v-7ec44f9d${_scopeId}><div class="w-full mb-4 md:mb-0" data-v-7ec44f9d${_scopeId}><div class="bg-white rounded px-6 py-8" data-v-7ec44f9d${_scopeId}><h2 class="text-base font-semibold mb-3 text-title" data-v-7ec44f9d${_scopeId}>Special Collections</h2>`);
            _push2(ssrRenderComponent(_component_UList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(collectionlist.value, (category) => {
                    _push3(ssrRenderComponent(_component_UListItem, {
                      onClick: ($event) => Gotocollection(category.title),
                      key: category,
                      class: "text-base block w-full py-2 cursor-pointer hover:text-primary hover:bg-[#F8F8F8] rounded transition text-center md:text-left text-title pl-2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(category.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(category.title), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(collectionlist.value, (category) => {
                      return openBlock(), createBlock(_component_UListItem, {
                        onClick: ($event) => Gotocollection(category.title),
                        key: category,
                        class: "text-base block w-full py-2 cursor-pointer hover:text-primary hover:bg-[#F8F8F8] rounded transition text-center md:text-left text-title pl-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(category.title), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-center bg-gray-100 rounded" }, [
                createVNode("div", { class: "w-full mb-4 md:mb-0" }, [
                  createVNode("div", { class: "bg-white rounded px-6 py-8" }, [
                    createVNode("h2", { class: "text-base font-semibold mb-3 text-title" }, "Special Collections"),
                    createVNode(_component_UList, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(collectionlist.value, (category) => {
                          return openBlock(), createBlock(_component_UListItem, {
                            onClick: ($event) => Gotocollection(category.title),
                            key: category,
                            class: "text-base block w-full py-2 cursor-pointer hover:text-primary hover:bg-[#F8F8F8] rounded transition text-center md:text-left text-title pl-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(category.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../app-nuxtui-layer/components/nav/NavPrimary.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-7ec44f9d"]]), { __name: "NavPrimary" });
const _imports_1 = publicAssetsURL("/userfill.png");
const min = 1;
const max = 999;
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProfileActions",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const usermenu = [
      {
        lable: "Order",
        url: "/myorders",
        type: "link",
        img: "/order.png"
      },
      // {
      //   lable: 'My Favorites',
      //   url: '/',
      //   type: 'link',
      //   img: '/favorite.png'
      // },
      {
        lable: "Account Setting",
        url: "/userinfo",
        type: "link",
        img: "/setting.png"
      },
      {
        lable: "Sign Out",
        url: "",
        type: "button",
        img: "/loginout.png"
      }
    ];
    const countryarr = ref([]);
    const token = useCookie("token");
    const isTokenValid = computed(() => !!token.value);
    const menuOpen = ref(false);
    const infoOpen = ref(false);
    const langOpen = ref(false);
    const { getCart, deleteCart } = cartAuth();
    const { logout } = useAuth();
    const { getUserlPBylp2Location, listCountryAll } = LocationAuth();
    const locationinfo = useCookie("locationinfo");
    const selectedCountry = ref({
      countryCode: "US",
      countryName: "United States of America"
    });
    const nowCountry = ref({
      countryCode: "US",
      countryName: "United States of America"
    });
    const cart = useCartStore();
    const handleGetCart = async () => {
      try {
        let res = await getCart();
        let result = res.result;
        cart.updateCart(result);
      } catch (error) {
      }
    };
    if (isTokenValid.value) {
      handleGetCart();
    }
    const shipping = ref(0);
    const increaseproductQuantity = (index) => {
      cart.increaseQuantity(index);
    };
    const decreaseproductQuantity = (index) => {
      cart.decreaseQuantity(index);
    };
    const removeItem = async (index) => {
      let data = {
        idList: [cart.itemList[index].id]
      };
      await deleteCart(data);
      cart.updateCart(cart.itemList);
      cart.itemList.splice(index, 1);
      message.success("Delete successful");
    };
    const subtotal = computed(() => {
      return cart.itemList.reduce((sum, item) => sum + item.product.skuSpec.customPrice * item.productQuantity, 0);
    });
    const total = computed(() => {
      return subtotal.value + shipping.value;
    });
    const showDetails = ref(false);
    const onInputNumber = (e, index) => {
      let val = parseInt(e.target.value.replace(/[^\d]/g, "")) || 1;
      if (val < 1) val = 1;
      if (val > 999) val = 999;
      cart.itemList[index].productQuantity = val;
    };
    function goToCart() {
      router.push("/cart");
      menuOpen.value = false;
    }
    function goShopping() {
      router.push("/");
      menuOpen.value = false;
    }
    const checkdetai = (id, sku, name) => {
      router.push("/product/" + id + "/" + name + "?sku=" + sku);
    };
    const getlocation = async () => {
      try {
        if (locationinfo.value) {
          console.log(locationinfo.value);
          nowCountry.value = {
            countryCode: locationinfo.value.countryCode,
            countryName: locationinfo.value.countryName
          };
          selectedCountry.value = {
            countryCode: locationinfo.value.countryCode,
            countryName: locationinfo.value.countryName
          };
        } else {
          let res = await getUserlPBylp2Location();
          if (res.result) {
            nowCountry.value = {
              countryCode: res.result.country_short,
              countryName: res.result.country_long
            };
            selectedCountry.value = {
              countryCode: res.result.country_short,
              countryName: res.result.country_long
            };
          }
        }
      } catch (error) {
      }
    };
    const getCountrylist = async () => {
      try {
        let res = await listCountryAll();
        let countrylist = res.result;
        countryarr.value = countrylist;
      } catch (error) {
      }
    };
    const loginout = async () => {
      await logout();
    };
    getCountrylist();
    getlocation();
    const handleSubmit = () => {
      nowCountry.value = selectedCountry.value;
      locationinfo.value = JSON.stringify(nowCountry.value);
      langOpen.value = false;
    };
    const checkout = () => {
      (void 0).location.href = "/checkout?from=cart";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_0$3;
      const _component_UBadge = __nuxt_component_2$1;
      const _component_UIcon = __nuxt_component_5;
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_UCard = __nuxt_component_5$1;
      const _component_USelectMenu = __nuxt_component_6$1;
      const _component_UButton = __nuxt_component_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-nowrap items-center justify-center px-4 rounded-lg" }, _attrs))} data-v-d5f0823a>`);
      _push(ssrRenderComponent(_component_UPopover, {
        color: "white",
        open: unref(menuOpen),
        "onUpdate:open": ($event) => isRef(menuOpen) ? menuOpen.value = $event : null,
        trigger: "manual",
        mode: "hover",
        ui: {
          base: "border-none shadow-2xl bg-white rounded-md focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow"
        },
        popper: { placement: "bottom" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center px-4 py-2 rounded-lg transition relative" data-v-d5f0823a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/cart.png",
              alt: "cart",
              class: "h-9"
            }, null, _parent2, _scopeId));
            if (unref(cart).itemCount > 0) {
              _push2(ssrRenderComponent(_component_UBadge, {
                label: unref(cart).itemCount,
                color: "primary",
                variant: "solid",
                class: "absolute top-2 right-4 w-4 h-4 flex items-center justify-center rounded-full ring-0 text-white text-xxs font-semibold"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center px-4 py-2 rounded-lg transition relative" }, [
                createVNode(_component_NuxtImg, {
                  src: "/cart.png",
                  alt: "cart",
                  class: "h-9"
                }),
                unref(cart).itemCount > 0 ? (openBlock(), createBlock(_component_UBadge, {
                  key: 0,
                  label: unref(cart).itemCount,
                  color: "primary",
                  variant: "solid",
                  class: "absolute top-2 right-4 w-4 h-4 flex items-center justify-center rounded-full ring-0 text-white text-xxs font-semibold"
                }, null, 8, ["label"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        panel: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex" data-v-d5f0823a${_scopeId}><div class="max-w-2xl mx-auto pb-2" data-v-d5f0823a${_scopeId}>`);
            if (unref(cart).itemList.length > 0) {
              _push2(`<div class="bg-white rounded-lg" data-v-d5f0823a${_scopeId}><div class="mb-8 max-h-[40vh] overflow-y-auto p-4" data-v-d5f0823a${_scopeId}><!--[-->`);
              ssrRenderList(unref(cart).itemList, (item, index) => {
                _push2(`<div class="${ssrRenderClass([
                  "flex items-center py-4 transition-colors border-solid border-[#F8F8F8]",
                  index !== unref(cart).itemList.length - 1 ? "border-b" : ""
                ])}" data-v-d5f0823a${_scopeId}><div class="w-20 rounded-lg overflow-hidden" data-v-d5f0823a${_scopeId}><img${ssrRenderAttr("src", item.product.erpProduct.mainPic)}${ssrRenderAttr("alt", item.product.erpProduct.productEnglishName)} class="w-full h-full object-cover object-top cursor-pointer" data-v-d5f0823a${_scopeId}></div><div class="ml-6" data-v-d5f0823a${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Tooltip), {
                  color: "white",
                  overlayInnerStyle: { color: "#333" },
                  title: item.product.erpProduct.productEnglishName,
                  overlayStyle: { maxWidth: "300px", whiteSpace: "pre-line", wordBreak: "break-word" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="text-sm text-blackcolor truncate-1-lines w-52" data-v-d5f0823a${_scopeId2}>${ssrInterpolate(item.product.erpProduct.productEnglishName)}</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "text-sm text-blackcolor truncate-1-lines w-52" }, toDisplayString(item.product.erpProduct.productEnglishName), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(Tooltip), {
                  color: "white",
                  overlayInnerStyle: { color: "#333" },
                  title: item.product.skuSpec.specAttr,
                  overlayStyle: { maxWidth: "300px", whiteSpace: "pre-line", wordBreak: "break-word" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="text-sm text-[#8E8E8E] truncate-1-lines w-52 mt-1" data-v-d5f0823a${_scopeId2}>${ssrInterpolate(item.product.skuSpec.specAttr)}</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "text-sm text-[#8E8E8E] truncate-1-lines w-52 mt-1" }, toDisplayString(item.product.skuSpec.specAttr), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<div class="flex items-center mt-2" data-v-d5f0823a${_scopeId}><div class="mr-6" data-v-d5f0823a${_scopeId}><div class="flex items-center" data-v-d5f0823a${_scopeId}><div class="flex items-center border rounded-md w-26 justify-between px-2" data-v-d5f0823a${_scopeId}><button class="text-gray-500 hover:text-black disabled:text-gray-300"${ssrIncludeBooleanAttr(item.productQuantity <= min) ? " disabled" : ""} data-v-d5f0823a${_scopeId}> - </button><input${ssrRenderAttr("value", item.productQuantity)} class="w-16 h-8 text-center outline-none border-none focus:ring-0 focus:outline-none"${ssrRenderAttr("min", min)}${ssrRenderAttr("max", max)} data-v-d5f0823a${_scopeId}><button class="text-gray-500 hover:text-black disabled:text-gray-300"${ssrIncludeBooleanAttr(item.productQuantity >= max) ? " disabled" : ""} data-v-d5f0823a${_scopeId}> + </button></div></div></div><div class="flex items-center text-black" data-v-d5f0823a${_scopeId}>${ssrInterpolate(item.product.skuSpec.customPrice.toFixed(2))}</div></div></div><div class="ml-6 flex flex-col items-end" data-v-d5f0823a${_scopeId}><img${ssrRenderAttr("src", _imports_0$2)} class="w-6 cursor-pointer" data-v-d5f0823a${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div><div class="p-6 shadow-[0_-4px_4px_0_rgba(232,231,231,0.5)]" data-v-d5f0823a${_scopeId}><div class="flex items-center justify-between mb-6" data-v-d5f0823a${_scopeId}><span class="font-semibold text-black text-base" data-v-d5f0823a${_scopeId}>Total</span><span class="text-base font-semibold text-black cursor-pointer flex" data-v-d5f0823a${_scopeId}>$${ssrInterpolate(unref(total).toFixed(2))} `);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-chevron-down-20-solid",
                width: "24px",
                height: "24px",
                class: ["transition-transform duration-200 h-6 w-6", { "rotate-180": unref(showDetails) }]
              }, null, _parent2, _scopeId));
              _push2(`</span></div>`);
              if (unref(showDetails)) {
                _push2(`<div data-v-d5f0823a${_scopeId}><div class="flex items-center justify-between mb-4" data-v-d5f0823a${_scopeId}><span class="text-black text-base" data-v-d5f0823a${_scopeId}>Subtotal</span><span class="text-base font-medium text-black mr-8" data-v-d5f0823a${_scopeId}>$${ssrInterpolate(unref(subtotal).toFixed(2))}</span></div><div class="flex items-center justify-between mb-4" data-v-d5f0823a${_scopeId}><span class="text-black text-base" data-v-d5f0823a${_scopeId}>Shipping</span><span class="text-base font-medium text-black mr-8" data-v-d5f0823a${_scopeId}>$${ssrInterpolate(unref(shipping).toFixed(2))}</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex space-x-4" data-v-d5f0823a${_scopeId}><button class="flex-1 px-6 py-3 border border-solid border-[#979797] bg-gray-100 text-gray-800 font-normal rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap !rounded-button" data-v-d5f0823a${_scopeId}> Go to Cart </button><button class="flex-1 px-6 py-3 bg-primary border border-solid border-primary text-white font-normal rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap !rounded-button" data-v-d5f0823a${_scopeId}> Checkout </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(cart).itemList.length === 0) {
              _push2(`<div class="bg-white rounded-lg flex flex-col items-center justify-center h-80 px-8" data-v-d5f0823a${_scopeId}><p class="text-black" data-v-d5f0823a${_scopeId}>There are no more items in your cart</p><button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-8" data-v-d5f0823a${_scopeId}> Go shopping </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex" }, [
                createVNode("div", { class: "max-w-2xl mx-auto pb-2" }, [
                  unref(cart).itemList.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white rounded-lg"
                  }, [
                    createVNode("div", { class: "mb-8 max-h-[40vh] overflow-y-auto p-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(cart).itemList, (item, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: [
                            "flex items-center py-4 transition-colors border-solid border-[#F8F8F8]",
                            index !== unref(cart).itemList.length - 1 ? "border-b" : ""
                          ]
                        }, [
                          createVNode("div", { class: "w-20 rounded-lg overflow-hidden" }, [
                            createVNode("img", {
                              src: item.product.erpProduct.mainPic,
                              alt: item.product.erpProduct.productEnglishName,
                              class: "w-full h-full object-cover object-top cursor-pointer",
                              onClick: ($event) => checkdetai(item.product.id, item.productSku, item.product.erpProduct.productEnglishName)
                            }, null, 8, ["src", "alt", "onClick"])
                          ]),
                          createVNode("div", { class: "ml-6" }, [
                            createVNode(unref(Tooltip), {
                              color: "white",
                              overlayInnerStyle: { color: "#333" },
                              title: item.product.erpProduct.productEnglishName,
                              overlayStyle: { maxWidth: "300px", whiteSpace: "pre-line", wordBreak: "break-word" }
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-sm text-blackcolor truncate-1-lines w-52" }, toDisplayString(item.product.erpProduct.productEnglishName), 1)
                              ]),
                              _: 2
                            }, 1032, ["title"]),
                            createVNode(unref(Tooltip), {
                              color: "white",
                              overlayInnerStyle: { color: "#333" },
                              title: item.product.skuSpec.specAttr,
                              overlayStyle: { maxWidth: "300px", whiteSpace: "pre-line", wordBreak: "break-word" }
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-sm text-[#8E8E8E] truncate-1-lines w-52 mt-1" }, toDisplayString(item.product.skuSpec.specAttr), 1)
                              ]),
                              _: 2
                            }, 1032, ["title"]),
                            createVNode("div", { class: "flex items-center mt-2" }, [
                              createVNode("div", { class: "mr-6" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "flex items-center border rounded-md w-26 justify-between px-2" }, [
                                    createVNode("button", {
                                      onClick: ($event) => decreaseproductQuantity(index),
                                      class: "text-gray-500 hover:text-black disabled:text-gray-300",
                                      disabled: item.productQuantity <= min
                                    }, " - ", 8, ["onClick", "disabled"]),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => item.productQuantity = $event,
                                      onInput: ($event) => onInputNumber($event, index),
                                      class: "w-16 h-8 text-center outline-none border-none focus:ring-0 focus:outline-none",
                                      min,
                                      max
                                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                      [
                                        vModelText,
                                        item.productQuantity,
                                        void 0,
                                        { number: true }
                                      ]
                                    ]),
                                    createVNode("button", {
                                      onClick: ($event) => increaseproductQuantity(index),
                                      class: "text-gray-500 hover:text-black disabled:text-gray-300",
                                      disabled: item.productQuantity >= max
                                    }, " + ", 8, ["onClick", "disabled"])
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center text-black" }, toDisplayString(item.product.skuSpec.customPrice.toFixed(2)), 1)
                            ])
                          ]),
                          createVNode("div", { class: "ml-6 flex flex-col items-end" }, [
                            createVNode("img", {
                              onClick: ($event) => removeItem(index),
                              src: _imports_0$2,
                              class: "w-6 cursor-pointer"
                            }, null, 8, ["onClick"])
                          ])
                        ], 2);
                      }), 128))
                    ]),
                    createVNode("div", { class: "p-6 shadow-[0_-4px_4px_0_rgba(232,231,231,0.5)]" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("span", { class: "font-semibold text-black text-base" }, "Total"),
                        createVNode("span", {
                          class: "text-base font-semibold text-black cursor-pointer flex",
                          onClick: ($event) => showDetails.value = !unref(showDetails)
                        }, [
                          createTextVNode("$" + toDisplayString(unref(total).toFixed(2)) + " ", 1),
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-chevron-down-20-solid",
                            width: "24px",
                            height: "24px",
                            class: ["transition-transform duration-200 h-6 w-6", { "rotate-180": unref(showDetails) }]
                          }, null, 8, ["class"])
                        ], 8, ["onClick"])
                      ]),
                      unref(showDetails) ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("span", { class: "text-black text-base" }, "Subtotal"),
                          createVNode("span", { class: "text-base font-medium text-black mr-8" }, "$" + toDisplayString(unref(subtotal).toFixed(2)), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("span", { class: "text-black text-base" }, "Shipping"),
                          createVNode("span", { class: "text-base font-medium text-black mr-8" }, "$" + toDisplayString(unref(shipping).toFixed(2)), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex space-x-4" }, [
                        createVNode("button", {
                          onClick: goToCart,
                          class: "flex-1 px-6 py-3 border border-solid border-[#979797] bg-gray-100 text-gray-800 font-normal rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap !rounded-button"
                        }, " Go to Cart "),
                        createVNode("button", {
                          onClick: ($event) => checkout(),
                          class: "flex-1 px-6 py-3 bg-primary border border-solid border-primary text-white font-normal rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap !rounded-button"
                        }, " Checkout ", 8, ["onClick"])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  unref(cart).itemList.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-white rounded-lg flex flex-col items-center justify-center h-80 px-8"
                  }, [
                    createVNode("p", { class: "text-black" }, "There are no more items in your cart"),
                    createVNode("button", {
                      onClick: goShopping,
                      class: "px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-8"
                    }, " Go shopping ")
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!unref(isTokenValid)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "text-white cursor-pointer",
          to: "/login"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                src: "/user.png",
                alt: "user",
                class: "h-9"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  src: "/user.png",
                  alt: "user",
                  class: "h-9"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isTokenValid)) {
        _push(`<div class="text-white cursor-pointer" data-v-d5f0823a>`);
        _push(ssrRenderComponent(_component_UPopover, {
          color: "white",
          open: unref(infoOpen),
          "onUpdate:open": ($event) => isRef(infoOpen) ? infoOpen.value = $event : null,
          mode: "hover",
          ui: {
            base: "border-none shadow-2xl bg-white rounded-md focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow"
          },
          popper: { placement: "bottom" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/userinfo" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", _imports_1)} class="h-9" data-v-d5f0823a${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: _imports_1,
                        class: "h-9"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtLink, { to: "/userinfo" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: _imports_1,
                      class: "h-9"
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          panel: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-customblack p-1" data-v-d5f0823a${_scopeId}><!--[-->`);
              ssrRenderList(usermenu, (item) => {
                _push2(`<div class="p-2 text-gray-400 hover:bg-primary-50" data-v-d5f0823a${_scopeId}>`);
                if (item.type == "link") {
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    to: item.url
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex items-center" data-v-d5f0823a${_scopeId2}><img${ssrRenderAttr("src", item.img)} class="w-4 mr-2 h-4" data-v-d5f0823a${_scopeId2}><div data-v-d5f0823a${_scopeId2}>${ssrInterpolate(item.lable)}</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("img", {
                              src: item.img,
                              class: "w-4 mr-2 h-4"
                            }, null, 8, ["src"]),
                            createVNode("div", null, toDisplayString(item.lable), 1)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (item.type == "button") {
                  _push2(`<div data-v-d5f0823a${_scopeId}><div class="flex items-center" data-v-d5f0823a${_scopeId}><img${ssrRenderAttr("src", item.img)} class="w-4 mr-2 h-4" data-v-d5f0823a${_scopeId}><div data-v-d5f0823a${_scopeId}>${ssrInterpolate(item.lable)}</div></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "text-customblack p-1" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(usermenu, (item) => {
                    return createVNode("div", { class: "p-2 text-gray-400 hover:bg-primary-50" }, [
                      item.type == "link" ? (openBlock(), createBlock(_component_NuxtLink, {
                        key: 0,
                        to: item.url
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("img", {
                              src: item.img,
                              class: "w-4 mr-2 h-4"
                            }, null, 8, ["src"]),
                            createVNode("div", null, toDisplayString(item.lable), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["to"])) : createCommentVNode("", true),
                      item.type == "button" ? (openBlock(), createBlock("div", {
                        key: 1,
                        onClick: loginout
                      }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("img", {
                            src: item.img,
                            class: "w-4 mr-2 h-4"
                          }, null, 8, ["src"]),
                          createVNode("div", null, toDisplayString(item.lable), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ]);
                  }), 64))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UPopover, {
        color: "white",
        open: unref(langOpen),
        "onUpdate:open": ($event) => isRef(langOpen) ? langOpen.value = $event : null,
        mode: "hover",
        trigger: "manual",
        ui: {
          base: "overflow-visible border-none shadow-2xl  focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow"
        },
        popper: { placement: "bottom" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-2 px-4 py-2 rounded-lg transition" data-v-d5f0823a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/location.png",
              alt: "location",
              class: "h-6"
            }, null, _parent2, _scopeId));
            _push2(`<div data-v-d5f0823a${_scopeId}>${ssrInterpolate(unref(nowCountry).countryCode)}</div>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-chevron-down-16-solid",
              class: ["w-5 h-5 transition-transform text-gray-400 dark:text-gray-500", [unref(langOpen) && "transform rotate-180"]]
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-2 px-4 py-2 rounded-lg transition" }, [
                createVNode(_component_NuxtImg, {
                  src: "/location.png",
                  alt: "location",
                  class: "h-6"
                }),
                createVNode("div", null, toDisplayString(unref(nowCountry).countryCode), 1),
                createVNode(_component_UIcon, {
                  name: "i-heroicons-chevron-down-16-solid",
                  class: ["w-5 h-5 transition-transform text-gray-400 dark:text-gray-500", [unref(langOpen) && "transform rotate-180"]]
                }, null, 8, ["class"])
              ])
            ];
          }
        }),
        panel: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-center bg-gray-100 bg-white rounded-md" data-v-d5f0823a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCard, {
              class: "w-full max-w-xs py-0 h-44",
              ui: {
                ring: "ring-0"
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-sm text-gray-500 mb-4" data-v-d5f0823a${_scopeId2}> Select the country/region you prefer for shopping. </div><form data-v-d5f0823a${_scopeId2}><div class="mb-2" data-v-d5f0823a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: unref(selectedCountry),
                    "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null,
                    "search-attributes": ["countryCode", "countryName"],
                    searchable: "",
                    options: unref(countryarr),
                    placeholder: "Select Country",
                    class: "w-full"
                  }, {
                    label: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center" data-v-d5f0823a${_scopeId3}><span class="w-5 h-5" data-v-d5f0823a${_scopeId3}>${ssrInterpolate(unref(selectedCountry).countryCode)}</span><span class="mx-1" data-v-d5f0823a${_scopeId3}>/</span><span data-v-d5f0823a${_scopeId3}>${ssrInterpolate(unref(selectedCountry).countryName)}</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("span", { class: "w-5 h-5" }, toDisplayString(unref(selectedCountry).countryCode), 1),
                            createVNode("span", { class: "mx-1" }, "/"),
                            createVNode("span", null, toDisplayString(unref(selectedCountry).countryName), 1)
                          ])
                        ];
                      }
                    }),
                    option: withCtx(({ option }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center" data-v-d5f0823a${_scopeId3}><span class="w-5 h-5" data-v-d5f0823a${_scopeId3}>${ssrInterpolate(option.countryCode)}</span><span class="mx-1" data-v-d5f0823a${_scopeId3}>/</span><span data-v-d5f0823a${_scopeId3}>${ssrInterpolate(option.countryName)}</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("span", { class: "w-5 h-5" }, toDisplayString(option.countryCode), 1),
                            createVNode("span", { class: "mx-1" }, "/"),
                            createVNode("span", null, toDisplayString(option.countryName), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    color: "primary",
                    block: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Submit`);
                      } else {
                        return [
                          createTextVNode("Submit")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode("div", { class: "text-sm text-gray-500 mb-4" }, " Select the country/region you prefer for shopping. "),
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmit, ["prevent"])
                    }, [
                      createVNode("div", { class: "mb-2" }, [
                        createVNode(_component_USelectMenu, {
                          modelValue: unref(selectedCountry),
                          "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null,
                          "search-attributes": ["countryCode", "countryName"],
                          searchable: "",
                          options: unref(countryarr),
                          placeholder: "Select Country",
                          class: "w-full"
                        }, {
                          label: withCtx(() => [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "w-5 h-5" }, toDisplayString(unref(selectedCountry).countryCode), 1),
                              createVNode("span", { class: "mx-1" }, "/"),
                              createVNode("span", null, toDisplayString(unref(selectedCountry).countryName), 1)
                            ])
                          ]),
                          option: withCtx(({ option }) => [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "w-5 h-5" }, toDisplayString(option.countryCode), 1),
                              createVNode("span", { class: "mx-1" }, "/"),
                              createVNode("span", null, toDisplayString(option.countryName), 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ]),
                      createVNode(_component_UButton, {
                        type: "submit",
                        color: "primary",
                        block: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Submit")
                        ]),
                        _: 1
                      })
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-center bg-gray-100 bg-white rounded-md" }, [
                createVNode(_component_UCard, {
                  class: "w-full max-w-xs py-0 h-44",
                  ui: {
                    ring: "ring-0"
                  }
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-gray-500 mb-4" }, " Select the country/region you prefer for shopping. "),
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmit, ["prevent"])
                    }, [
                      createVNode("div", { class: "mb-2" }, [
                        createVNode(_component_USelectMenu, {
                          modelValue: unref(selectedCountry),
                          "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null,
                          "search-attributes": ["countryCode", "countryName"],
                          searchable: "",
                          options: unref(countryarr),
                          placeholder: "Select Country",
                          class: "w-full"
                        }, {
                          label: withCtx(() => [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "w-5 h-5" }, toDisplayString(unref(selectedCountry).countryCode), 1),
                              createVNode("span", { class: "mx-1" }, "/"),
                              createVNode("span", null, toDisplayString(unref(selectedCountry).countryName), 1)
                            ])
                          ]),
                          option: withCtx(({ option }) => [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "w-5 h-5" }, toDisplayString(option.countryCode), 1),
                              createVNode("span", { class: "mx-1" }, "/"),
                              createVNode("span", null, toDisplayString(option.countryName), 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ]),
                      createVNode(_component_UButton, {
                        type: "submit",
                        color: "primary",
                        block: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Submit")
                        ]),
                        _: 1
                      })
                    ], 32)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../app-nuxtui-layer/components/ProfileActions.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-d5f0823a"]]), { __name: "ProfileActions" });
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.slideover, slideover);
const _sfc_main$3 = defineComponent({
  components: {
    HDialog: Ye,
    HDialogPanel: Ge$1,
    TransitionRoot: Se$1,
    TransitionChild: he
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    appear: {
      type: Boolean,
      default: false
    },
    side: {
      type: String,
      default: "right",
      validator: (value) => ["left", "right", "top", "bottom"].includes(value)
    },
    overlay: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Boolean,
      default: true
    },
    preventClose: {
      type: Boolean,
      default: false
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "close", "close-prevented", "after-leave"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("slideover", toRef(props, "ui"), config, toRef(props, "class"));
    const isOpen = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const transitionClass = computed(() => {
      if (!props.transition) {
        return {};
      }
      let enterFrom, leaveTo;
      switch (props.side) {
        case "left":
          enterFrom = ui.value.translate.left;
          leaveTo = ui.value.translate.left;
          break;
        case "right":
          enterFrom = ui.value.translate.right;
          leaveTo = ui.value.translate.right;
          break;
        case "top":
          enterFrom = ui.value.translate.top;
          leaveTo = ui.value.translate.top;
          break;
        case "bottom":
          enterFrom = ui.value.translate.bottom;
          leaveTo = ui.value.translate.bottom;
          break;
        default:
          enterFrom = ui.value.translate.right;
          leaveTo = ui.value.translate.right;
      }
      return {
        ...ui.value.transition,
        enterFrom,
        enterTo: ui.value.translate.base,
        leaveFrom: ui.value.translate.base,
        leaveTo
      };
    });
    const sideType = computed(() => {
      switch (props.side) {
        case "left":
          return "horizontal";
        case "right":
          return "horizontal";
        case "top":
          return "vertical";
        case "bottom":
          return "vertical";
        default:
          return "right";
      }
    });
    function close(value) {
      if (props.preventClose) {
        emit("close-prevented");
        return;
      }
      isOpen.value = value;
      emit("close");
    }
    const onAfterLeave = () => {
      emit("after-leave");
    };
    s(() => useId());
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      isOpen,
      transitionClass,
      sideType,
      onAfterLeave,
      close
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TransitionRoot = resolveComponent("TransitionRoot");
  const _component_HDialog = resolveComponent("HDialog");
  const _component_TransitionChild = resolveComponent("TransitionChild");
  const _component_HDialogPanel = resolveComponent("HDialogPanel");
  _push(ssrRenderComponent(_component_TransitionRoot, mergeProps({
    as: "template",
    appear: _ctx.appear,
    show: _ctx.isOpen,
    onAfterLeave: _ctx.onAfterLeave
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HDialog, mergeProps({
          class: [_ctx.ui.wrapper, { "justify-end": _ctx.side === "right" }, { "items-end": _ctx.side === "bottom" }]
        }, _ctx.attrs, { onClose: _ctx.close }), {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              if (_ctx.overlay) {
                _push3(ssrRenderComponent(_component_TransitionChild, mergeProps({
                  as: "template",
                  appear: _ctx.appear
                }, _ctx.ui.overlay.transition, {
                  class: _ctx.ui.overlay.transition.enterFrom
                }), {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="${ssrRenderClass([_ctx.ui.overlay.base, _ctx.ui.overlay.background])}"${_scopeId3}></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(ssrRenderComponent(_component_TransitionChild, mergeProps({
                as: "template",
                appear: _ctx.appear
              }, _ctx.transitionClass, {
                class: _ctx.transitionClass.enterFrom
              }), {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_HDialogPanel, {
                      class: [_ctx.ui.base, _ctx.sideType === "horizontal" ? [_ctx.ui.width, "h-full"] : [_ctx.ui.height, "w-full"], _ctx.ui.background, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.padding, _ctx.ui.shadow]
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push5, _parent5, _scopeId4);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_HDialogPanel, {
                        class: [_ctx.ui.base, _ctx.sideType === "horizontal" ? [_ctx.ui.width, "h-full"] : [_ctx.ui.height, "w-full"], _ctx.ui.background, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.padding, _ctx.ui.shadow]
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      }, 8, ["class"])
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
            } else {
              return [
                _ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
                  key: 0,
                  as: "template",
                  appear: _ctx.appear
                }, _ctx.ui.overlay.transition, {
                  class: _ctx.ui.overlay.transition.enterFrom
                }), {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
                    }, null, 2)
                  ]),
                  _: 1
                }, 16, ["appear", "class"])) : createCommentVNode("", true),
                createVNode(_component_TransitionChild, mergeProps({
                  as: "template",
                  appear: _ctx.appear
                }, _ctx.transitionClass, {
                  class: _ctx.transitionClass.enterFrom
                }), {
                  default: withCtx(() => [
                    createVNode(_component_HDialogPanel, {
                      class: [_ctx.ui.base, _ctx.sideType === "horizontal" ? [_ctx.ui.width, "h-full"] : [_ctx.ui.height, "w-full"], _ctx.ui.background, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.padding, _ctx.ui.shadow]
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 8, ["class"])
                  ]),
                  _: 3
                }, 16, ["appear", "class"])
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_HDialog, mergeProps({
            class: [_ctx.ui.wrapper, { "justify-end": _ctx.side === "right" }, { "items-end": _ctx.side === "bottom" }]
          }, _ctx.attrs, { onClose: _ctx.close }), {
            default: withCtx(() => [
              _ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
                key: 0,
                as: "template",
                appear: _ctx.appear
              }, _ctx.ui.overlay.transition, {
                class: _ctx.ui.overlay.transition.enterFrom
              }), {
                default: withCtx(() => [
                  createVNode("div", {
                    class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
                  }, null, 2)
                ]),
                _: 1
              }, 16, ["appear", "class"])) : createCommentVNode("", true),
              createVNode(_component_TransitionChild, mergeProps({
                as: "template",
                appear: _ctx.appear
              }, _ctx.transitionClass, {
                class: _ctx.transitionClass.enterFrom
              }), {
                default: withCtx(() => [
                  createVNode(_component_HDialogPanel, {
                    class: [_ctx.ui.base, _ctx.sideType === "horizontal" ? [_ctx.ui.width, "h-full"] : [_ctx.ui.height, "w-full"], _ctx.ui.background, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.padding, _ctx.ui.shadow]
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 8, ["class"])
                ]),
                _: 3
              }, 16, ["appear", "class"])
            ]),
            _: 3
          }, 16, ["class", "onClose"])
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/overlays/Slideover.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]), { __name: "USlideover" });
const _imports_0 = publicAssetsURL("/loginout.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const { logout } = useAuth();
    const router = useRouter();
    const route = useRoute$1();
    const searchInput = ref(route.query.query || "");
    const token = useCookie("token");
    computed(() => !!token.value);
    const { isMobileMenuOpen: isMobileMenuOpen2 } = useMobileMenu();
    const searchHistory = ref([]);
    const now = /* @__PURE__ */ new Date();
    const todayStr = now.toISOString().split("T")[0];
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
    const showAllHistory = ref(false);
    const isSearchHistoryVisible = ref(false);
    const historyContentRef = ref(null);
    const isOverThreeLines = ref(false);
    const filteredSearchHistory = computed(
      () => searchHistory.value.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= sevenDaysAgo;
      })
    );
    const shouldShowMoreHint = computed(() => {
      return isOverThreeLines.value && filteredSearchHistory.value.length > 0;
    });
    const checkHeight = () => {
      nextTick(() => {
        if (historyContentRef.value) {
          const lineHeight = 34;
          const threeLinesHeight = lineHeight * 4;
          const contentHeight = historyContentRef.value.scrollHeight;
          isOverThreeLines.value = contentHeight > threeLinesHeight;
        }
      });
    };
    const saveKeywordToLocalHistory = (keyword) => {
      const keywordTrimmed = keyword.trim();
      if (!keywordTrimmed) return;
      const filtered = searchHistory.value.filter((item) => item.id !== keywordTrimmed);
      const newItem = { id: keywordTrimmed, date: todayStr };
      const updated = [newItem, ...filtered];
      const recent = updated.filter((item) => new Date(item.date) >= sevenDaysAgo);
      localStorage.setItem("search-history", JSON.stringify(recent));
      searchHistory.value = recent;
      showAllHistory.value = false;
    };
    const searchkeywords = (keyword) => {
      searchInput.value = keyword;
      isSearchHistoryVisible.value = false;
      saveKeywordToLocalHistory(keyword);
      (void 0).location.href = `/search?query=${encodeURIComponent(keyword)}`;
    };
    const onEnterSearch = () => {
      if (searchInput.value.trim() !== "") {
        searchkeywords(searchInput.value.trim());
      }
    };
    const toggleShowAll = () => {
      showAllHistory.value = !showAllHistory.value;
    };
    const closePanel = () => {
      isSearchHistoryVisible.value = false;
    };
    const gouserinfo = () => {
      router.push("/userinfo");
    };
    const loginout = async () => {
      await logout();
    };
    watch(
      () => route.query.query,
      (newQuery) => {
        searchInput.value = newQuery || "";
      }
    );
    watch([filteredSearchHistory, isSearchHistoryVisible], () => {
      if (isSearchHistoryVisible.value) {
        checkHeight();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TheLogo = __nuxt_component_0$2;
      const _component_NavHamburger = __nuxt_component_1;
      const _component_NavPrimary = __nuxt_component_2;
      const _component_UFormGroup = __nuxt_component_3;
      const _component_UInput = __nuxt_component_4;
      const _component_UIcon = __nuxt_component_5;
      const _component_ProfileActions = __nuxt_component_6;
      const _component_USlideover = __nuxt_component_7;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "bg-[#222222] w-full mx-auto text-white fixed z-50 h-[122px]" }, _attrs))} data-v-b2ffdf80><div class="flex h-full items-center justify-between navbar-grid py-2 max-row" data-v-b2ffdf80><div style="${ssrRenderStyle({ "grid-area": "logo" })}" class="flex" data-v-b2ffdf80>`);
      _push(ssrRenderComponent(_component_TheLogo, null, null, _parent));
      _push(`</div><div data-pg-name="Hamburger" style="${ssrRenderStyle({ "grid-area": "hamburger" })}" class="sm:hidden flex" data-v-b2ffdf80>`);
      _push(ssrRenderComponent(_component_NavHamburger, {
        onClick: ($event) => isMobileMenuOpen2.value = true
      }, null, _parent));
      _push(`</div><div data-pg-name="NavBarPrimary" style="${ssrRenderStyle({ "grid-area": "primary-nav" })}" class="hidden sm:flex mt-4" data-v-b2ffdf80>`);
      _push(ssrRenderComponent(_component_NavPrimary, { class: "sm:w-full" }, null, _parent));
      _push(`</div><div data-pg-name="Searchbox" style="${ssrRenderStyle({ "grid-area": "search" })}" class="max-w-100 ml-4 relative" data-v-b2ffdf80>`);
      _push(ssrRenderComponent(_component_UFormGroup, { hint: "Optional" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: searchInput.value,
              "onUpdate:modelValue": ($event) => searchInput.value = $event,
              onKeyup: onEnterSearch,
              placeholder: "Search...",
              size: "md",
              class: "w-full border-none ring-0",
              autocomplete: "off",
              ui: {
                base: "!shadow-none !ring-0 focus:ring-0 focus:ring-offset-0 focus:shadow-none rounded-b-none",
                ring: "focus:ring-0",
                variant: { outline: "shadow-none focus:ring-0" }
              },
              "input-class": isSearchHistoryVisible.value ? "!rounded-b-none border-b border-gray-100 focus:border-gray-100 focus:ring-0 focus:outline-none" : "",
              onFocus: ($event) => isSearchHistoryVisible.value = true,
              onBlur: closePanel
            }, {
              trailing: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="pointer-events-auto" data-v-b2ffdf80${_scopeId2}><button aria-label="search" class="${ssrRenderClass([searchInput.value.trim() ? "text-primary" : "text-gray-400", "flex items-center justify-center h-full px-2 text-gray-500 hover:text-black cursor-pointer font-bold"])}" data-v-b2ffdf80${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-magnifying-glass",
                    class: "w-5 h-5 font-bold",
                    style: { "stroke-width": "3" }
                  }, null, _parent3, _scopeId2));
                  _push3(`</button></div>`);
                } else {
                  return [
                    createVNode("div", { class: "pointer-events-auto" }, [
                      createVNode("button", {
                        "aria-label": "search",
                        onClick: onEnterSearch,
                        class: ["flex items-center justify-center h-full px-2 text-gray-500 hover:text-black cursor-pointer font-bold", searchInput.value.trim() ? "text-primary" : "text-gray-400"]
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-magnifying-glass",
                          class: "w-5 h-5 font-bold",
                          style: { "stroke-width": "3" }
                        })
                      ], 2)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (isSearchHistoryVisible.value) {
              _push2(`<div class="absolute top-full left-0 w-full bg-white shadow-lg rounded p-2 z-50 rounded-t-none" data-v-b2ffdf80${_scopeId}><div class="flex justify-between items-center" data-v-b2ffdf80${_scopeId}><div class="text-base text-d3black py-2 font-bold ml-1" data-v-b2ffdf80${_scopeId}>Recent Searches</div></div><div class="mt-2 overflow-hidden" style="${ssrRenderStyle({
                "max-height": showAllHistory.value ? "none" : "128px",
                "transition": "max-height 0.3s ease"
              })}" data-v-b2ffdf80${_scopeId}><!--[-->`);
              ssrRenderList(filteredSearchHistory.value, (item, index) => {
                _push2(`<span class="inline-block px-3 py-2 bg-f0black text-d3black text-xs rounded border border-f0black mr-2 mb-1 cursor-pointer hover:border-primary max-w-[32%] overflow-hidden text-ellipsis whitespace-nowrap" data-v-b2ffdf80${_scopeId}>${ssrInterpolate(item.id)}</span>`);
              });
              _push2(`<!--]-->`);
              if (filteredSearchHistory.value.length === 0) {
                _push2(`<div class="text-gray-500 text-sm py-2 ml-1" data-v-b2ffdf80${_scopeId}> No recent searches </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (shouldShowMoreHint.value) {
                _push2(`<div class="text-xs text-gray-500 mt-3 ml-1 hover:text-primary hover:border-b hover:border-primary cursor-pointer inline-block" data-v-b2ffdf80${_scopeId}>${ssrInterpolate(showAllHistory.value ? "Show less" : "Records of the last 7 days")}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: searchInput.value,
                "onUpdate:modelValue": ($event) => searchInput.value = $event,
                onKeyup: withKeys(onEnterSearch, ["enter"]),
                placeholder: "Search...",
                size: "md",
                class: "w-full border-none ring-0",
                autocomplete: "off",
                ui: {
                  base: "!shadow-none !ring-0 focus:ring-0 focus:ring-offset-0 focus:shadow-none rounded-b-none",
                  ring: "focus:ring-0",
                  variant: { outline: "shadow-none focus:ring-0" }
                },
                "input-class": isSearchHistoryVisible.value ? "!rounded-b-none border-b border-gray-100 focus:border-gray-100 focus:ring-0 focus:outline-none" : "",
                onFocus: ($event) => isSearchHistoryVisible.value = true,
                onBlur: closePanel
              }, {
                trailing: withCtx(() => [
                  createVNode("div", { class: "pointer-events-auto" }, [
                    createVNode("button", {
                      "aria-label": "search",
                      onClick: onEnterSearch,
                      class: ["flex items-center justify-center h-full px-2 text-gray-500 hover:text-black cursor-pointer font-bold", searchInput.value.trim() ? "text-primary" : "text-gray-400"]
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-magnifying-glass",
                        class: "w-5 h-5 font-bold",
                        style: { "stroke-width": "3" }
                      })
                    ], 2)
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "input-class", "onFocus"]),
              isSearchHistoryVisible.value ? (openBlock(), createBlock("div", {
                key: 0,
                onPointerdown: withModifiers(() => {
                }, ["prevent"]),
                class: "absolute top-full left-0 w-full bg-white shadow-lg rounded p-2 z-50 rounded-t-none"
              }, [
                createVNode("div", { class: "flex justify-between items-center" }, [
                  createVNode("div", { class: "text-base text-d3black py-2 font-bold ml-1" }, "Recent Searches")
                ]),
                createVNode("div", {
                  ref_key: "historyContentRef",
                  ref: historyContentRef,
                  class: "mt-2 overflow-hidden",
                  style: {
                    "max-height": showAllHistory.value ? "none" : "128px",
                    "transition": "max-height 0.3s ease"
                  }
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(filteredSearchHistory.value, (item, index) => {
                    return openBlock(), createBlock("span", {
                      key: index,
                      onClick: ($event) => searchkeywords(item.id),
                      onMousedown: withModifiers(() => {
                      }, ["prevent"]),
                      class: "inline-block px-3 py-2 bg-f0black text-d3black text-xs rounded border border-f0black mr-2 mb-1 cursor-pointer hover:border-primary max-w-[32%] overflow-hidden text-ellipsis whitespace-nowrap"
                    }, toDisplayString(item.id), 41, ["onClick", "onMousedown"]);
                  }), 128)),
                  filteredSearchHistory.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-gray-500 text-sm py-2 ml-1"
                  }, " No recent searches ")) : createCommentVNode("", true)
                ], 4),
                shouldShowMoreHint.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  onClick: toggleShowAll,
                  onMousedown: withModifiers(() => {
                  }, ["prevent"]),
                  class: "text-xs text-gray-500 mt-3 ml-1 hover:text-primary hover:border-b hover:border-primary cursor-pointer inline-block"
                }, toDisplayString(showAllHistory.value ? "Show less" : "Records of the last 7 days"), 41, ["onMousedown"])) : createCommentVNode("", true)
              ], 40, ["onPointerdown"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-pg-name="Profile" class="flex sm:space-x-1 justify-end sm:justify-start" data-v-b2ffdf80>`);
      _push(ssrRenderComponent(_component_ProfileActions, { class: "!hidden sm:!flex" }, null, _parent));
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-user-circle",
        class: "sm:!hidden w-7 h-7",
        width: "28",
        height: "28",
        onClick: gouserinfo
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_USlideover, {
        modelValue: unref(isMobileMenuOpen2),
        "onUpdate:modelValue": ($event) => isRef(isMobileMenuOpen2) ? isMobileMenuOpen2.value = $event : null,
        "data-pg-name": "NavBarSecondary",
        style: { "grid-area": "primary-nav" },
        class: "w-72 sm:hidden",
        side: "left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col h-full" data-v-b2ffdf80${_scopeId}><div class="flex-1 overflow-y-auto p-4" data-v-b2ffdf80${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NavPrimary, null, null, _parent2, _scopeId));
            _push2(`</div><div class="p-4 flex justify-end" data-v-b2ffdf80${_scopeId}><div data-v-b2ffdf80${_scopeId}><div class="flex items-center" data-v-b2ffdf80${_scopeId}><img${ssrRenderAttr("src", _imports_0)} class="w-4 mr-2 h-4" data-v-b2ffdf80${_scopeId}><div data-v-b2ffdf80${_scopeId}>login out</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col h-full" }, [
                createVNode("div", { class: "flex-1 overflow-y-auto p-4" }, [
                  createVNode(_component_NavPrimary)
                ]),
                createVNode("div", { class: "p-4 flex justify-end" }, [
                  createVNode("div", { onClick: loginout }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("img", {
                        src: _imports_0,
                        class: "w-4 mr-2 h-4"
                      }),
                      createVNode("div", null, "login out")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../app-nuxtui-layer/components/nav/NavBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-b2ffdf80"]]), { __name: "NavBar" });
const _sfc_main$1 = {
  __name: "TheFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const medialist = [
      {
        id: 1,
        img: "/images/media1",
        url: "https://www.instagram.com/incustom0505/"
      },
      {
        id: 2,
        img: "/images/media2",
        url: "https://www.facebook.com/profile.php?id=61578243120322"
      },
      {
        id: 3,
        img: "/images/media3",
        url: "https://www.linkedin.com/in/in-custom-38a132374/"
      },
      // {
      //   id: 4,
      //   img: '/images/media4',
      // }, 
      {
        id: 5,
        img: "/images/media5",
        url: "https://www.tiktok.com/@incustom8"
      },
      {
        id: 6,
        img: "/images/media6",
        url: "https://www.pinterest.com/incustomstore/   "
      },
      {
        id: 7,
        img: "/images/media7",
        url: "https://www.youtube.com/channel/UCxL5KwbHQFg86qC_XwbNRtg"
      }
    ];
    const hovered = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$3;
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-[#222222] text-white py-10" }, _attrs))}><div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10"><div class="flex-1 flex flex-col items-start text-left"><h2 class="text-2xl font-bold">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        format: "webp",
        alt: "incustom",
        src: "/images/footerlogo.png",
        class: "h-8 md:h-12"
      }, null, _parent));
      _push(`</h2><p class="text-sm mt-2"> Fulfilling your ideas on demand </p><p class="text-xs mt-2"> Trusted to deliver 99.8M items since 2024 </p><div class="flex flex-wrap justify-center items-center gap-3 mt-4">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        format: "webp",
        src: "/email-2.png",
        alt: "email",
        class: "h-10"
      }, null, _parent));
      _push(`<span>hello@incustom.com </span></div><div class="flex flex-wrap justify-start gap-4 mt-4"><!--[-->`);
      ssrRenderList(medialist, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.url,
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                format: "webp",
                onMouseover: ($event) => hovered.value = item.id,
                alt: item.url,
                onMouseleave: ($event) => hovered.value = null,
                src: hovered.value === item.id ? item.img + "-active.png" : item.img + ".png",
                class: "w-10 cursor-pointer"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  format: "webp",
                  onMouseover: ($event) => hovered.value = item.id,
                  alt: item.url,
                  onMouseleave: ($event) => hovered.value = null,
                  src: hovered.value === item.id ? item.img + "-active.png" : item.img + ".png",
                  class: "w-10 cursor-pointer"
                }, null, 8, ["onMouseover", "alt", "onMouseleave", "src"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="flex-[2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left"><div><p class="font-medium text-lg mb-6">Customizations</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Size Customization`);
          } else {
            return [
              createTextVNode("Size Customization")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pattern Printing`);
          } else {
            return [
              createTextVNode("Pattern Printing")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Material Options`);
          } else {
            return [
              createTextVNode("Material Options")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fabric Swatch Request `);
          } else {
            return [
              createTextVNode("Fabric Swatch Request ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="md:pl-4"><p class="font-medium text-lg mb-6">Feature</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/article/about-us",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About Us `);
          } else {
            return [
              createTextVNode("About Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Our Mission`);
          } else {
            return [
              createTextVNode("Our Mission")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sustainability &amp; Materials `);
          } else {
            return [
              createTextVNode("Sustainability & Materials ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blog / Shade Tips`);
          } else {
            return [
              createTextVNode("Blog / Shade Tips")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Affiliate / Influencer Program`);
          } else {
            return [
              createTextVNode("Affiliate / Influencer Program")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="md:pl-4"><p class="font-medium text-lg mb-6">Feature requests</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/article/faq",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`FAQS`);
          } else {
            return [
              createTextVNode("FAQS")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { class: "block hover:text-primary mt-4 font-normal text-white/80" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Track My Order`);
          } else {
            return [
              createTextVNode("Track My Order")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Shipping &amp; Delivery `);
          } else {
            return [
              createTextVNode("Shipping & Delivery ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Returns &amp; Exchanges `);
          } else {
            return [
              createTextVNode("Returns & Exchanges ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/article/warranty-policy",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Warranty Policy`);
          } else {
            return [
              createTextVNode(" Warranty Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Installation Guides `);
          } else {
            return [
              createTextVNode("Installation Guides ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`How to Measure`);
          } else {
            return [
              createTextVNode("How to Measure")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/article/contact-us",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact Us `);
          } else {
            return [
              createTextVNode("Contact Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block hover:text-primary mt-4 font-normal text-white/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Request a Quote`);
          } else {
            return [
              createTextVNode("Request a Quote")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="max-w-7xl mt-10 mx-auto px-4 flex flex-wrap text-sm gap-10 items-center border-t border-white/10 pt-10 md:space-y-0 md:flex-nowrap font-normal text-white/60"><div class="flex flex-wrap items-center gap-1">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/article/privacy-policy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy`);
          } else {
            return [
              createTextVNode("Privacy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span>|</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/article/terms-of-service" }, {
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
      _push(`<span>|</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/cookies" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cookie Policy`);
          } else {
            return [
              createTextVNode("Cookie Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span>|</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/accessibility" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Accessibility`);
          } else {
            return [
              createTextVNode("Accessibility")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-1"><span>EN / USD</span><span>|</span><span>Visa</span><span>PayPal</span><span>ApplePay</span><span>Klarna</span></div><div class="flex items-center gap-1"><span>Secure Checkout</span><span>|</span><span>Satisfaction Guarantee</span></div></div><div class="text-center text-xs text-gray-400 mt-10"> © 2025 Incustom. All rights reserved. </div></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../app-nuxtui-layer/components/TheFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const pageMeta = computed(() => {
      return {
        title: route.meta.title,
        description: route.meta.description,
        ogImage: route.meta.ogImage,
        canonicalUrl: route.meta.canonicalUrl || route.fullPath,
        generator: route.meta.generator,
        tags: route.meta.tags
      };
    });
    useHeadAndMeta(pageMeta);
    useOgImage();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavBar = __nuxt_component_0;
      const _component_TheFooter = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="min-h-screen flex flex-col dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">`);
      _push(ssrRenderComponent(_component_NavBar, null, null, _parent));
      _push(`<main class="mt-[122px] md:mt-[122px]">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_TheFooter, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
