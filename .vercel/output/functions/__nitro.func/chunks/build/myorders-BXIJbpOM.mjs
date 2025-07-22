import { _ as _sfc_main$4 } from './Userleft-C3owAP1G.mjs';
import { _ as __nuxt_component_4$1 } from './Input-B5r9LTzZ.mjs';
import { _ as __nuxt_component_2 } from './Select-CfGfYQzQ.mjs';
import { _ as _export_sfc, i as useUI, c as __nuxt_component_5, d as __nuxt_component_0$1, e as __nuxt_component_7, a as __nuxt_component_1$2, U as UIcon, m as mergeConfig, o as useResizeObserver, j as appConfig, p as tooltip, t as twMerge } from './server.mjs';
import { ref, watch, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, defineComponent, resolveComponent, renderSlot, createCommentVNode, toRef, nextTick, computed, useSlots, onMounted, onUnmounted, inject, h, provide, watchEffect, useId, useSSRContext } from 'vue';
import { s, i, o as o$1, A, T, u, N, a as o } from './keyboard-Duq8EHr3.mjs';
import { s as s$1 } from './use-resolve-button-type-DOOP2SMg.mjs';
import { f, O, u as u$1, t, T as T$1, i as i$1, P, N as N$1 } from './hidden-BKyvU3BW.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { twJoin } from 'tailwind-merge';
import { A as defu } from '../_/nitro.mjs';
import { u as usePopper } from './usePopper-BrvKSG9Z.mjs';
import { _ as __nuxt_component_4$2 } from './Pagination-BEDIsYtf.mjs';
import { _ as _imports_1 } from './virtual_public-ByL_2Wkk.mjs';
import { f as formatTimestamp } from './format-C04fzD99.mjs';
import { Tooltip, message, Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { P as PayAuth, O as OrderAuth } from './pay-B0nCCLYu.mjs';
import './useFormGroup-XFEs-B9Y.mjs';
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

const kbd = {
  base: "inline-flex items-center justify-center text-gray-900 dark:text-white",
  padding: "px-1",
  size: {
    xs: "h-4 min-w-[16px] text-[10px]",
    sm: "h-5 min-w-[20px] text-[11px]",
    md: "h-6 min-w-[24px] text-[12px]"
  },
  rounded: "rounded",
  font: "font-medium font-sans",
  background: "bg-gray-100 dark:bg-gray-800",
  ring: "ring-1 ring-gray-300 dark:ring-gray-700 ring-inset",
  default: {
    size: "sm"
  }
};
const tabs = {
  wrapper: "relative space-y-2",
  container: "relative w-full",
  base: "focus:outline-none",
  list: {
    base: "relative",
    background: "bg-gray-100 dark:bg-gray-800",
    rounded: "rounded-lg",
    shadow: "",
    padding: "p-1",
    height: "h-10",
    width: "w-full",
    marker: {
      wrapper: "absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none",
      base: "w-full h-full",
      background: "bg-white dark:bg-gray-900",
      rounded: "rounded-md",
      shadow: "shadow-sm"
    },
    tab: {
      base: "relative inline-flex items-center justify-center flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out",
      background: "",
      active: "text-gray-900 dark:text-white",
      inactive: "text-gray-500 dark:text-gray-400",
      height: "h-8",
      padding: "px-3",
      size: "text-sm",
      font: "font-medium",
      rounded: "rounded-md",
      shadow: "",
      icon: "w-4 h-4 flex-shrink-0 me-2"
    }
  }
};
let d = defineComponent({ props: { onFocus: { type: Function, required: true } }, setup(t2) {
  let n = ref(true);
  return () => n.value ? h(f, { as: "button", type: "button", features: u$1.Focusable, onFocus(o2) {
    o2.preventDefault();
    let e, a = 50;
    function r() {
      var u2;
      if (a-- <= 0) {
        e && cancelAnimationFrame(e);
        return;
      }
      if ((u2 = t2.onFocus) != null && u2.call(t2)) {
        n.value = false, cancelAnimationFrame(e);
        return;
      }
      e = requestAnimationFrame(r);
    }
    e = requestAnimationFrame(r);
  } }) : null;
} });
var te = ((s2) => (s2[s2.Forwards = 0] = "Forwards", s2[s2.Backwards = 1] = "Backwards", s2))(te || {}), le = ((d2) => (d2[d2.Less = -1] = "Less", d2[d2.Equal = 0] = "Equal", d2[d2.Greater = 1] = "Greater", d2))(le || {});
let U = Symbol("TabsContext");
function C(a) {
  let b = inject(U, null);
  if (b === null) {
    let s2 = new Error(`<${a} /> is missing a parent <TabGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(s2, C), s2;
  }
  return b;
}
let G = Symbol("TabsSSRContext"), me = defineComponent({ name: "TabGroup", emits: { change: (a) => true }, props: { as: { type: [Object, String], default: "template" }, selectedIndex: { type: [Number], default: null }, defaultIndex: { type: [Number], default: 0 }, vertical: { type: [Boolean], default: false }, manual: { type: [Boolean], default: false } }, inheritAttrs: false, setup(a, { slots: b, attrs: s2, emit: d$1 }) {
  var E;
  let i2 = ref((E = a.selectedIndex) != null ? E : a.defaultIndex), l = ref([]), r = ref([]), p = computed(() => a.selectedIndex !== null), R = computed(() => p.value ? a.selectedIndex : i2.value);
  function y(t2) {
    var c;
    let n = O(u2.tabs.value, o$1), o$12 = O(u2.panels.value, o$1), e = n.filter((I) => {
      var m;
      return !((m = o$1(I)) != null && m.hasAttribute("disabled"));
    });
    if (t2 < 0 || t2 > n.length - 1) {
      let I = u(i2.value === null ? 0 : Math.sign(t2 - i2.value), { [-1]: () => 1, [0]: () => u(Math.sign(t2), { [-1]: () => 0, [0]: () => 0, [1]: () => 1 }), [1]: () => 0 }), m = u(I, { [0]: () => n.indexOf(e[0]), [1]: () => n.indexOf(e[e.length - 1]) });
      m !== -1 && (i2.value = m), u2.tabs.value = n, u2.panels.value = o$12;
    } else {
      let I = n.slice(0, t2), h2 = [...n.slice(t2), ...I].find((W) => e.includes(W));
      if (!h2) return;
      let O2 = (c = n.indexOf(h2)) != null ? c : u2.selectedIndex.value;
      O2 === -1 && (O2 = u2.selectedIndex.value), i2.value = O2, u2.tabs.value = n, u2.panels.value = o$12;
    }
  }
  let u2 = { selectedIndex: computed(() => {
    var t2, n;
    return (n = (t2 = i2.value) != null ? t2 : a.defaultIndex) != null ? n : null;
  }), orientation: computed(() => a.vertical ? "vertical" : "horizontal"), activation: computed(() => a.manual ? "manual" : "auto"), tabs: l, panels: r, setSelectedIndex(t2) {
    R.value !== t2 && d$1("change", t2), p.value || y(t2);
  }, registerTab(t2) {
    var o$12;
    if (l.value.includes(t2)) return;
    let n = l.value[i2.value];
    if (l.value.push(t2), l.value = O(l.value, o$1), !p.value) {
      let e = (o$12 = l.value.indexOf(n)) != null ? o$12 : i2.value;
      e !== -1 && (i2.value = e);
    }
  }, unregisterTab(t2) {
    let n = l.value.indexOf(t2);
    n !== -1 && l.value.splice(n, 1);
  }, registerPanel(t2) {
    r.value.includes(t2) || (r.value.push(t2), r.value = O(r.value, o$1));
  }, unregisterPanel(t2) {
    let n = r.value.indexOf(t2);
    n !== -1 && r.value.splice(n, 1);
  } };
  provide(U, u2);
  let T$12 = ref({ tabs: [], panels: [] }), x = ref(false);
  onMounted(() => {
    x.value = true;
  }), provide(G, computed(() => x.value ? null : T$12.value));
  let w = computed(() => a.selectedIndex);
  return onMounted(() => {
    watch([w], () => {
      var t2;
      return y((t2 = a.selectedIndex) != null ? t2 : a.defaultIndex);
    }, { immediate: true });
  }), watchEffect(() => {
    if (!p.value || R.value == null || u2.tabs.value.length <= 0) return;
    let t2 = O(u2.tabs.value, o$1);
    t2.some((o$12, e) => o$1(u2.tabs.value[e]) !== o$1(o$12)) && u2.setSelectedIndex(t2.findIndex((o$12) => o$1(o$12) === o$1(u2.tabs.value[R.value])));
  }), () => {
    let t2 = { selectedIndex: i2.value };
    return h(Fragment, [l.value.length <= 0 && h(d, { onFocus: () => {
      for (let n of l.value) {
        let o$12 = o$1(n);
        if ((o$12 == null ? void 0 : o$12.tabIndex) === 0) return o$12.focus(), true;
      }
      return false;
    } }), A({ theirProps: { ...s2, ...T(a, ["selectedIndex", "defaultIndex", "manual", "vertical", "onChange"]) }, ourProps: {}, slot: t2, slots: b, attrs: s2, name: "TabGroup" })]);
  };
} }), pe = defineComponent({ name: "TabList", props: { as: { type: [Object, String], default: "div" } }, setup(a, { attrs: b, slots: s2 }) {
  let d2 = C("TabList");
  return () => {
    let i2 = { selectedIndex: d2.selectedIndex.value }, l = { role: "tablist", "aria-orientation": d2.orientation.value };
    return A({ ourProps: l, theirProps: a, slot: i2, attrs: b, slots: s2, name: "TabList" });
  };
} }), xe = defineComponent({ name: "Tab", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: null } }, setup(a, { attrs: b, slots: s$12, expose: d2 }) {
  var o$2;
  let i$2 = (o$2 = a.id) != null ? o$2 : `headlessui-tabs-tab-${i()}`, l = C("Tab"), r = ref(null);
  d2({ el: r, $el: r }), onMounted(() => l.registerTab(r)), onUnmounted(() => l.unregisterTab(r));
  let p = inject(G), R = computed(() => {
    if (p.value) {
      let e = p.value.tabs.indexOf(i$2);
      return e === -1 ? p.value.tabs.push(i$2) - 1 : e;
    }
    return -1;
  }), y = computed(() => {
    let e = l.tabs.value.indexOf(r);
    return e === -1 ? R.value : e;
  }), u2 = computed(() => y.value === l.selectedIndex.value);
  function T2(e) {
    var I;
    let c = e();
    if (c === T$1.Success && l.activation.value === "auto") {
      let m = (I = i$1(r)) == null ? void 0 : I.activeElement, h2 = l.tabs.value.findIndex((O2) => o$1(O2) === m);
      h2 !== -1 && l.setSelectedIndex(h2);
    }
    return c;
  }
  function x(e) {
    let c = l.tabs.value.map((m) => o$1(m)).filter(Boolean);
    if (e.key === o.Space || e.key === o.Enter) {
      e.preventDefault(), e.stopPropagation(), l.setSelectedIndex(y.value);
      return;
    }
    switch (e.key) {
      case o.Home:
      case o.PageUp:
        return e.preventDefault(), e.stopPropagation(), T2(() => P(c, N$1.First));
      case o.End:
      case o.PageDown:
        return e.preventDefault(), e.stopPropagation(), T2(() => P(c, N$1.Last));
    }
    if (T2(() => u(l.orientation.value, { vertical() {
      return e.key === o.ArrowUp ? P(c, N$1.Previous | N$1.WrapAround) : e.key === o.ArrowDown ? P(c, N$1.Next | N$1.WrapAround) : T$1.Error;
    }, horizontal() {
      return e.key === o.ArrowLeft ? P(c, N$1.Previous | N$1.WrapAround) : e.key === o.ArrowRight ? P(c, N$1.Next | N$1.WrapAround) : T$1.Error;
    } })) === T$1.Success) return e.preventDefault();
  }
  let w = ref(false);
  function E() {
    var e;
    w.value || (w.value = true, !a.disabled && ((e = o$1(r)) == null || e.focus({ preventScroll: true }), l.setSelectedIndex(y.value), t(() => {
      w.value = false;
    })));
  }
  function t$1(e) {
    e.preventDefault();
  }
  let n = s$1(computed(() => ({ as: a.as, type: b.type })), r);
  return () => {
    var m, h2;
    let e = { selected: u2.value, disabled: (m = a.disabled) != null ? m : false }, { ...c } = a, I = { ref: r, onKeydown: x, onMousedown: t$1, onClick: E, id: i$2, role: "tab", type: n.value, "aria-controls": (h2 = o$1(l.panels.value[y.value])) == null ? void 0 : h2.id, "aria-selected": u2.value, tabIndex: u2.value ? 0 : -1, disabled: a.disabled ? true : void 0 };
    return A({ ourProps: I, theirProps: c, slot: e, attrs: b, slots: s$12, name: "Tab" });
  };
} }), Ie = defineComponent({ name: "TabPanels", props: { as: { type: [Object, String], default: "div" } }, setup(a, { slots: b, attrs: s2 }) {
  let d2 = C("TabPanels");
  return () => {
    let i2 = { selectedIndex: d2.selectedIndex.value };
    return A({ theirProps: a, ourProps: {}, slot: i2, attrs: s2, slots: b, name: "TabPanels" });
  };
} }), ye = defineComponent({ name: "TabPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: null }, tabIndex: { type: Number, default: 0 } }, setup(a, { attrs: b, slots: s2, expose: d2 }) {
  var T2;
  let i$12 = (T2 = a.id) != null ? T2 : `headlessui-tabs-panel-${i()}`, l = C("TabPanel"), r = ref(null);
  d2({ el: r, $el: r }), onMounted(() => l.registerPanel(r)), onUnmounted(() => l.unregisterPanel(r));
  let p = inject(G), R = computed(() => {
    if (p.value) {
      let x = p.value.panels.indexOf(i$12);
      return x === -1 ? p.value.panels.push(i$12) - 1 : x;
    }
    return -1;
  }), y = computed(() => {
    let x = l.panels.value.indexOf(r);
    return x === -1 ? R.value : x;
  }), u2 = computed(() => y.value === l.selectedIndex.value);
  return () => {
    var n;
    let x = { selected: u2.value }, { tabIndex: w, ...E } = a, t2 = { ref: r, id: i$12, role: "tabpanel", "aria-labelledby": (n = o$1(l.tabs.value[y.value])) == null ? void 0 : n.id, tabIndex: u2.value ? w : -1 };
    return !u2.value && a.unmount && !a.static ? h(f, { as: "span", "aria-hidden": true, ...t2 }) : A({ ourProps: t2, theirProps: E, slot: x, attrs: b, slots: s2, features: N.Static | N.RenderStrategy, visible: u2.value, name: "TabPanel" });
  };
} });
const config$2 = mergeConfig(appConfig.ui.strategy, appConfig.ui.tabs, tabs);
const _sfc_main$3 = defineComponent({
  components: {
    UIcon,
    HTabGroup: me,
    HTabList: pe,
    HTab: xe,
    HTabPanels: Ie,
    HTabPanel: ye
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      default: void 0
    },
    orientation: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value)
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default: () => []
    },
    unmount: {
      type: Boolean,
      default: false
    },
    content: {
      type: Boolean,
      default: true
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
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("tabs", toRef(props, "ui"), config$2, toRef(props, "class"));
    const listRef = ref();
    const itemRefs = ref([]);
    const markerRef = ref();
    const selectedIndex = ref(props.modelValue || props.defaultIndex);
    function calcMarkerSize(index) {
      var _a;
      const tab = (_a = itemRefs.value[index]) == null ? void 0 : _a.$el;
      if (!tab) {
        return;
      }
      if (!markerRef.value) {
        return;
      }
      markerRef.value.style.top = `${tab.offsetTop}px`;
      markerRef.value.style.left = `${tab.offsetLeft}px`;
      markerRef.value.style.width = `${tab.offsetWidth}px`;
      markerRef.value.style.height = `${tab.offsetHeight}px`;
    }
    function onChange(index) {
      selectedIndex.value = index;
      emit("change", index);
      if (props.modelValue !== void 0) {
        emit("update:modelValue", selectedIndex.value);
      }
      calcMarkerSize(selectedIndex.value);
    }
    useResizeObserver(listRef, () => {
      calcMarkerSize(selectedIndex.value);
    });
    watch(() => props.modelValue, (value) => {
      selectedIndex.value = value;
      calcMarkerSize(selectedIndex.value);
    });
    watch(() => props.items, async () => {
      await nextTick();
      calcMarkerSize(selectedIndex.value);
    }, { deep: true });
    s(() => useId());
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      listRef,
      itemRefs,
      markerRef,
      selectedIndex,
      onChange
    };
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HTabGroup = resolveComponent("HTabGroup");
  const _component_HTabList = resolveComponent("HTabList");
  const _component_HTab = resolveComponent("HTab");
  const _component_UIcon = __nuxt_component_5;
  const _component_HTabPanels = resolveComponent("HTabPanels");
  const _component_HTabPanel = resolveComponent("HTabPanel");
  _push(ssrRenderComponent(_component_HTabGroup, mergeProps({
    vertical: _ctx.orientation === "vertical",
    "selected-index": _ctx.selectedIndex,
    as: "div",
    class: _ctx.ui.wrapper
  }, _ctx.attrs, { onChange: _ctx.onChange }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HTabList, {
          ref: "listRef",
          class: [_ctx.ui.list.base, _ctx.ui.list.background, _ctx.ui.list.rounded, _ctx.ui.list.shadow, _ctx.ui.list.padding, _ctx.ui.list.width, _ctx.orientation === "horizontal" && _ctx.ui.list.height, _ctx.orientation === "horizontal" && "inline-grid items-center"],
          style: [_ctx.orientation === "horizontal" && `grid-template-columns: repeat(${_ctx.items.length}, minmax(0, 1fr))`]
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="${ssrRenderClass(_ctx.ui.list.marker.wrapper)}"${_scopeId2}><div class="${ssrRenderClass([_ctx.ui.list.marker.base, _ctx.ui.list.marker.background, _ctx.ui.list.marker.rounded, _ctx.ui.list.marker.shadow])}"${_scopeId2}></div></div><!--[-->`);
              ssrRenderList(_ctx.items, (item, index) => {
                _push3(ssrRenderComponent(_component_HTab, {
                  key: index,
                  ref_for: true,
                  ref: "itemRefs",
                  disabled: item.disabled,
                  as: "template"
                }, {
                  default: withCtx(({ selected, disabled }, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<button${ssrRenderAttr("aria-label", item.ariaLabel)} class="${ssrRenderClass([_ctx.ui.list.tab.base, _ctx.ui.list.tab.background, _ctx.ui.list.tab.height, _ctx.ui.list.tab.padding, _ctx.ui.list.tab.size, _ctx.ui.list.tab.font, _ctx.ui.list.tab.rounded, _ctx.ui.list.tab.shadow, selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive])}"${_scopeId3}>`);
                      ssrRenderSlot(_ctx.$slots, "icon", {
                        item,
                        index,
                        selected,
                        disabled
                      }, () => {
                        if (item.icon) {
                          _push4(ssrRenderComponent(_component_UIcon, {
                            name: item.icon,
                            class: _ctx.ui.list.tab.icon
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      }, _push4, _parent4, _scopeId3);
                      ssrRenderSlot(_ctx.$slots, "default", {
                        item,
                        index,
                        selected,
                        disabled
                      }, () => {
                        _push4(`<span class="truncate"${_scopeId3}>${ssrInterpolate(item.label)}</span>`);
                      }, _push4, _parent4, _scopeId3);
                      _push4(`</button>`);
                    } else {
                      return [
                        createVNode("button", {
                          "aria-label": item.ariaLabel,
                          class: [_ctx.ui.list.tab.base, _ctx.ui.list.tab.background, _ctx.ui.list.tab.height, _ctx.ui.list.tab.padding, _ctx.ui.list.tab.size, _ctx.ui.list.tab.font, _ctx.ui.list.tab.rounded, _ctx.ui.list.tab.shadow, selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive]
                        }, [
                          renderSlot(_ctx.$slots, "icon", {
                            item,
                            index,
                            selected,
                            disabled
                          }, () => [
                            item.icon ? (openBlock(), createBlock(_component_UIcon, {
                              key: 0,
                              name: item.icon,
                              class: _ctx.ui.list.tab.icon
                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                          ]),
                          renderSlot(_ctx.$slots, "default", {
                            item,
                            index,
                            selected,
                            disabled
                          }, () => [
                            createVNode("span", { class: "truncate" }, toDisplayString(item.label), 1)
                          ])
                        ], 10, ["aria-label"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                createVNode("div", {
                  ref: "markerRef",
                  class: _ctx.ui.list.marker.wrapper
                }, [
                  createVNode("div", {
                    class: [_ctx.ui.list.marker.base, _ctx.ui.list.marker.background, _ctx.ui.list.marker.rounded, _ctx.ui.list.marker.shadow]
                  }, null, 2)
                ], 2),
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                  return openBlock(), createBlock(_component_HTab, {
                    key: index,
                    ref_for: true,
                    ref: "itemRefs",
                    disabled: item.disabled,
                    as: "template"
                  }, {
                    default: withCtx(({ selected, disabled }) => [
                      createVNode("button", {
                        "aria-label": item.ariaLabel,
                        class: [_ctx.ui.list.tab.base, _ctx.ui.list.tab.background, _ctx.ui.list.tab.height, _ctx.ui.list.tab.padding, _ctx.ui.list.tab.size, _ctx.ui.list.tab.font, _ctx.ui.list.tab.rounded, _ctx.ui.list.tab.shadow, selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive]
                      }, [
                        renderSlot(_ctx.$slots, "icon", {
                          item,
                          index,
                          selected,
                          disabled
                        }, () => [
                          item.icon ? (openBlock(), createBlock(_component_UIcon, {
                            key: 0,
                            name: item.icon,
                            class: _ctx.ui.list.tab.icon
                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                        ]),
                        renderSlot(_ctx.$slots, "default", {
                          item,
                          index,
                          selected,
                          disabled
                        }, () => [
                          createVNode("span", { class: "truncate" }, toDisplayString(item.label), 1)
                        ])
                      ], 10, ["aria-label"])
                    ]),
                    _: 2
                  }, 1032, ["disabled"]);
                }), 128))
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
        if (_ctx.content) {
          _push2(ssrRenderComponent(_component_HTabPanels, {
            class: _ctx.ui.container
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<!--[-->`);
                ssrRenderList(_ctx.items, (item, index) => {
                  _push3(ssrRenderComponent(_component_HTabPanel, {
                    key: index,
                    class: _ctx.ui.base,
                    unmount: _ctx.unmount
                  }, {
                    default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, item.slot || "item", {
                          item,
                          index,
                          selected
                        }, () => {
                          _push4(`${ssrInterpolate(item.content)}`);
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, item.slot || "item", {
                            item,
                            index,
                            selected
                          }, () => [
                            createTextVNode(toDisplayString(item.content), 1)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                });
                _push3(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                    return openBlock(), createBlock(_component_HTabPanel, {
                      key: index,
                      class: _ctx.ui.base,
                      unmount: _ctx.unmount
                    }, {
                      default: withCtx(({ selected }) => [
                        renderSlot(_ctx.$slots, item.slot || "item", {
                          item,
                          index,
                          selected
                        }, () => [
                          createTextVNode(toDisplayString(item.content), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["class", "unmount"]);
                  }), 128))
                ];
              }
            }),
            _: 3
          }, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(_component_HTabList, {
            ref: "listRef",
            class: [_ctx.ui.list.base, _ctx.ui.list.background, _ctx.ui.list.rounded, _ctx.ui.list.shadow, _ctx.ui.list.padding, _ctx.ui.list.width, _ctx.orientation === "horizontal" && _ctx.ui.list.height, _ctx.orientation === "horizontal" && "inline-grid items-center"],
            style: [_ctx.orientation === "horizontal" && `grid-template-columns: repeat(${_ctx.items.length}, minmax(0, 1fr))`]
          }, {
            default: withCtx(() => [
              createVNode("div", {
                ref: "markerRef",
                class: _ctx.ui.list.marker.wrapper
              }, [
                createVNode("div", {
                  class: [_ctx.ui.list.marker.base, _ctx.ui.list.marker.background, _ctx.ui.list.marker.rounded, _ctx.ui.list.marker.shadow]
                }, null, 2)
              ], 2),
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                return openBlock(), createBlock(_component_HTab, {
                  key: index,
                  ref_for: true,
                  ref: "itemRefs",
                  disabled: item.disabled,
                  as: "template"
                }, {
                  default: withCtx(({ selected, disabled }) => [
                    createVNode("button", {
                      "aria-label": item.ariaLabel,
                      class: [_ctx.ui.list.tab.base, _ctx.ui.list.tab.background, _ctx.ui.list.tab.height, _ctx.ui.list.tab.padding, _ctx.ui.list.tab.size, _ctx.ui.list.tab.font, _ctx.ui.list.tab.rounded, _ctx.ui.list.tab.shadow, selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive]
                    }, [
                      renderSlot(_ctx.$slots, "icon", {
                        item,
                        index,
                        selected,
                        disabled
                      }, () => [
                        item.icon ? (openBlock(), createBlock(_component_UIcon, {
                          key: 0,
                          name: item.icon,
                          class: _ctx.ui.list.tab.icon
                        }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                      ]),
                      renderSlot(_ctx.$slots, "default", {
                        item,
                        index,
                        selected,
                        disabled
                      }, () => [
                        createVNode("span", { class: "truncate" }, toDisplayString(item.label), 1)
                      ])
                    ], 10, ["aria-label"])
                  ]),
                  _: 2
                }, 1032, ["disabled"]);
              }), 128))
            ]),
            _: 3
          }, 8, ["class", "style"]),
          _ctx.content ? (openBlock(), createBlock(_component_HTabPanels, {
            key: 0,
            class: _ctx.ui.container
          }, {
            default: withCtx(() => [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                return openBlock(), createBlock(_component_HTabPanel, {
                  key: index,
                  class: _ctx.ui.base,
                  unmount: _ctx.unmount
                }, {
                  default: withCtx(({ selected }) => [
                    renderSlot(_ctx.$slots, item.slot || "item", {
                      item,
                      index,
                      selected
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["class", "unmount"]);
              }), 128))
            ]),
            _: 3
          }, 8, ["class"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/navigation/Tabs.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]), { __name: "UTabs" });
const config$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.kbd, kbd);
const _sfc_main$2 = defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: () => config$1.default.size,
      validator(value) {
        return Object.keys(config$1.size).includes(value);
      }
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
  setup(props) {
    const { ui, attrs } = useUI("kbd", toRef(props, "ui"), config$1);
    const kbdClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.size[props.size],
        ui.value.padding,
        ui.value.rounded,
        ui.value.font,
        ui.value.background,
        ui.value.ring
      ), props.class);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      kbdClass
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<kbd${ssrRenderAttrs(mergeProps({ class: _ctx.kbdClass }, _ctx.attrs, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    _push(`${ssrInterpolate(_ctx.value)}`);
  }, _push, _parent);
  _push(`</kbd>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/elements/Kbd.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "UKbd" });
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.tooltip, tooltip);
const _sfc_main$1 = defineComponent({
  components: {
    UKbd: __nuxt_component_0
  },
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: null
    },
    prevent: {
      type: Boolean,
      default: false
    },
    shortcuts: {
      type: Array,
      default: () => []
    },
    openDelay: {
      type: Number,
      default: () => config.default.openDelay
    },
    closeDelay: {
      type: Number,
      default: () => config.default.closeDelay
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
  setup(props) {
    const { ui, attrs } = useUI("tooltip", toRef(props, "ui"), config, toRef(props, "class"));
    const popper = computed(() => defu({}, props.popper, ui.value.popper));
    const [trigger, container] = usePopper(popper.value);
    const open = ref(false);
    let openTimeout = null;
    let closeTimeout = null;
    const isVisible = computed(() => !!(useSlots().text || props.text));
    function onMouseEnter() {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      if (open.value) {
        return;
      }
      openTimeout = openTimeout || setTimeout(() => {
        open.value = true;
        openTimeout = null;
      }, props.openDelay);
    }
    function onMouseLeave() {
      if (openTimeout) {
        clearTimeout(openTimeout);
        openTimeout = null;
      }
      if (!open.value) {
        return;
      }
      closeTimeout = closeTimeout || setTimeout(() => {
        open.value = false;
        closeTimeout = null;
      }, props.closeDelay);
    }
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      popper,
      trigger,
      container,
      open,
      onMouseEnter,
      onMouseLeave,
      isVisible
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  const _component_UKbd = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    ref: "trigger",
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", { open: _ctx.open }, () => {
    _push(` Hover `);
  }, _push, _parent);
  if (_ctx.open && !_ctx.prevent && _ctx.isVisible) {
    _push(`<div class="${ssrRenderClass([_ctx.ui.container, _ctx.ui.width])}"><template><div>`);
    if (_ctx.popper.arrow) {
      _push(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.ui.arrow))}"></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="${ssrRenderClass([_ctx.ui.base, _ctx.ui.background, _ctx.ui.color, _ctx.ui.rounded, _ctx.ui.shadow, _ctx.ui.ring])}">`);
    ssrRenderSlot(_ctx.$slots, "text", {}, () => {
      _push(`${ssrInterpolate(_ctx.text)}`);
    }, _push, _parent);
    if ((_a = _ctx.shortcuts) == null ? void 0 : _a.length) {
      _push(`<span class="${ssrRenderClass(_ctx.ui.shortcuts)}"><span class="${ssrRenderClass(_ctx.ui.middot)}">·</span><!--[-->`);
      ssrRenderList(_ctx.shortcuts, (shortcut) => {
        _push(ssrRenderComponent(_component_UKbd, {
          key: shortcut,
          size: "xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(shortcut)}`);
            } else {
              return [
                createTextVNode(toDisplayString(shortcut), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></template></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/overlays/Tooltip.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "UTooltip" });
const _sfc_main = {
  __name: "myorders",
  __ssrInlineRender: true,
  setup(__props) {
    PayAuth();
    const { cancleOrder } = OrderAuth();
    const router = useRouter();
    useUI();
    const orders = ref([]);
    const tabs2 = ref([]);
    const selectedindex = ref("");
    const selected = ref(tabs2.value[0]);
    const page = ref(1);
    const status = ref([]);
    const pageSize = ref(5);
    const ordervalue = ref("");
    const ordercount = ref(0);
    const showMore = ref({});
    const { getOrderlists, groupUserOrderStatusCount } = OrderAuth();
    const setCancleOrder = async (id) => {
      Modal.confirm({
        title: "Confirm",
        content: `Confirm Cancel This Order`,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          const params = { id };
          await cancleOrder(params);
          message.success("Cancel successful");
          getOrderlist();
          getOrderstatuslist();
        },
        onCancel() {
        }
      });
    };
    const getOrderlist = async () => {
      try {
        let params = {
          needCount: true,
          pageNum: page.value,
          pageSize: pageSize.value
        };
        if (ordervalue.value) {
          params.orderNumber = ordervalue.value;
        }
        if (status.value && status.value.length > 0) {
          params.statusList = status.value;
        }
        let res = await getOrderlists(params);
        let lists = res.result.list;
        orders.value = lists;
        ordercount.value = res.result.total;
      } catch (error) {
      }
    };
    const getOrderstatuslist = async () => {
      try {
        let res = await groupUserOrderStatusCount();
        let getttabs = res.result;
        tabs2.value = getttabs.map((item) => ({
          label: item.statusEnName + (item.count > 0 ? "(" + item.count + ")" : ""),
          value: item.statusList,
          count: item.count
        }));
      } catch (error) {
      }
    };
    const gotopay = async (orderNumber2) => {
      router.push("/checkout?from=order&orderNo=" + orderNumber2);
    };
    getOrderlist();
    getOrderstatuslist();
    function getOrderStatus(status2) {
      switch (status2) {
        case 0:
          return "none";
        case 500:
          return "Unpaid";
        case 1e3:
          return "Pending Confirm";
        case 1500:
          return "Awaiting Shipment";
        case 2e3:
          return "Shipped";
        case 2500:
          return "Delivered";
        case 3e3:
          return "Cancelled";
        default:
          return "unknown";
      }
    }
    function onChange(index) {
      console.log(index);
      let item = tabs2.value[index];
      status.value = item.value;
      console.log(status.value);
      getOrderlist();
    }
    const copyToClipboard = async (text) => {
      try {
        if ((void 0).clipboard && (void 0).isSecureContext) {
          await (void 0).clipboard.writeText(text);
          message.success("Copy completed");
        } else {
          const input = (void 0).createElement("textarea");
          input.value = text;
          input.readOnly = true;
          input.style.position = "absolute";
          input.style.left = "-9999px";
          (void 0).body.appendChild(input);
          input.select();
          const result = (void 0).execCommand("copy");
          (void 0).body.removeChild(input);
          if (result) {
            message.success("Copy successful");
          } else {
            throw new Error("Copy failed");
          }
        }
      } catch (err) {
        message.error("Copy failed");
        console.error("Copy failed:", err);
      }
    };
    const displayedItems = (order) => {
      if (showMore.value[order.id]) {
        return order.orderItemList;
      }
      return order.orderItemList.slice(0, 2);
    };
    watch(() => page.value, (newvalue, oldvalue) => {
      if (newvalue) {
        page.value;
        getOrderlist();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Userleft = _sfc_main$4;
      const _component_UInput = __nuxt_component_4$1;
      const _component_USelect = __nuxt_component_2;
      const _component_UTabs = __nuxt_component_3;
      const _component_UTooltip = __nuxt_component_4;
      const _component_UIcon = __nuxt_component_5;
      const _component_ULink = __nuxt_component_0$1;
      const _component_UButton = __nuxt_component_7;
      const _component_UPagination = __nuxt_component_4$2;
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))} data-v-46341f7e><div class="flex min-h-screen text-sm max-row" data-v-46341f7e>`);
      _push(ssrRenderComponent(_component_Userleft, { class: "hidden sm:block" }, null, _parent));
      _push(`<main class="flex-1 p-0 py-6 sm:p-6 bg-white" data-v-46341f7e><div class="flex flex-wrap items-center gap-3" data-v-46341f7e><div class="text-sm whitespace-nowrap sm:px-3 sm:justify-center dark:text-gray-900" data-v-46341f7e>Order Number </div>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: ordervalue.value,
        "onUpdate:modelValue": ($event) => ordervalue.value = $event,
        color: "white",
        class: "w-full max-w-[130px] sm:max-w-[200px]",
        placeholder: "search",
        ui: { base: "dark:!bg-white" }
      }, null, _parent));
      _push(`<div class="flex justify-center items-center bg-primary text-white px-4 h-[38px] cursor-pointer rounded-xl whitespace-nowrap" data-v-46341f7e> Search </div></div><section class="mt-8" data-v-46341f7e><div class="block md:hidden my-4" data-v-46341f7e>`);
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: selectedindex.value,
        "onUpdate:modelValue": ($event) => selectedindex.value = $event,
        options: tabs2.value,
        "option-attribute": "label",
        "value-attribute": "value",
        onChange: (val) => {
          const index = tabs2.value.findIndex((t2) => String(t2.value) === String(val));
          console.log(val);
          if (index !== -1) onChange(index);
        },
        size: "md",
        class: "w-full",
        placeholder: "Select status"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UTabs, {
        modelValue: selected.value,
        "onUpdate:modelValue": ($event) => selected.value = $event,
        items: tabs2.value,
        onChange,
        class: "hidden md:block",
        ui: {
          container: "w-full dark:bg-white",
          wrapper: "px-4",
          list: {
            tab: {
              active: "text-primary font-bold border-b-2 border-sky-400",
              inactive: "text-gray-500",
              background: "bg-transparent",
              rounded: ""
            },
            background: "bg-transparent dark:bg-white"
          }
        }
      }, null, _parent));
      if (orders.value.length > 0) {
        _push(`<div class="mx-auto px-4" data-v-46341f7e><div class="bg-white rounded-lg shadow-sm" data-v-46341f7e><div class="hidden md:grid grid-cols-12 px-6 py-3 text-sm font-medium bg-[#F6F6F6] text-gray-600" data-v-46341f7e><div class="col-span-6" data-v-46341f7e>Product</div><div class="col-span-3 text-center" data-v-46341f7e>Total($)</div><div class="col-span-3 text-right" data-v-46341f7e>Actions</div></div><div class="divide-y" data-v-46341f7e><!--[-->`);
        ssrRenderList(orders.value, (order) => {
          _push(`<div class="px-4 md:px-6 py-4 flex flex-col gap-4" data-v-46341f7e><div class="flex flex-col md:flex-row md:items-center text-sm text-gray-500 gap-2 md:gap-4" data-v-46341f7e><div class="flex items-center text-gray-600" data-v-46341f7e> Order Number: <span class="text-[#AEAEAE] mx-2" data-v-46341f7e>${ssrInterpolate(order.orderNumber)}</span>`);
          _push(ssrRenderComponent(_component_UTooltip, {
            text: "Copy the order number",
            popper: { arrow: true }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  onClick: ($event) => copyToClipboard(order.orderNumber),
                  name: "i-ri:file-copy-2-line",
                  class: "w-5 h-5 cursor-pointer hover:text-primary"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UIcon, {
                    onClick: ($event) => copyToClipboard(order.orderNumber),
                    name: "i-ri:file-copy-2-line",
                    class: "w-5 h-5 cursor-pointer hover:text-primary"
                  }, null, 8, ["onClick"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><span data-v-46341f7e>${ssrInterpolate(unref(formatTimestamp)(order.createDate))}</span><span class="text-primary-500 cursor-pointer hover:underline" data-v-46341f7e>${ssrInterpolate(getOrderStatus(order.status))}</span>`);
          _push(ssrRenderComponent(_component_ULink, {
            to: `/orderinfo?orderNumber=${order.orderNumber}`,
            class: "md:ml-auto text-primary-500 hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Order Detail `);
              } else {
                return [
                  createTextVNode(" Order Detail ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="grid grid-cols-1 md:grid-cols-12 gap-4" data-v-46341f7e><div class="md:col-span-6 flex flex-col gap-3" data-v-46341f7e><!--[-->`);
          ssrRenderList(displayedItems(order), (item) => {
            _push(`<div class="gap-4 items-center" data-v-46341f7e><div class="flex gap-3 md:gap-4" data-v-46341f7e><div class="w-24 md:w-28 aspect-square overflow-hidden rounded-lg bg-white flex items-center justify-center" data-v-46341f7e><img${ssrRenderAttr("src", item.productImage)}${ssrRenderAttr("alt", item.productName)} class="max-w-full max-h-full object-contain" data-v-46341f7e></div><div class="flex-1" data-v-46341f7e>`);
            _push(ssrRenderComponent(unref(Tooltip), {
              title: item.productName
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="font-medium text-customblack truncate-1-lines" data-v-46341f7e${_scopeId}>${ssrInterpolate(item.productName)}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "font-medium text-customblack truncate-1-lines" }, toDisplayString(item.productName), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(ssrRenderComponent(unref(Tooltip), {
              title: item.skuPropList.map((spec) => spec.value).join(" ")
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<p class="text-sm text-[#AEAEAE] my-1 truncate-1-lines" data-v-46341f7e${_scopeId}><!--[-->`);
                  ssrRenderList(item.skuPropList, (spec) => {
                    _push2(`<span class="mr-2" data-v-46341f7e${_scopeId}>${ssrInterpolate(spec.value)}</span>`);
                  });
                  _push2(`<!--]--></p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-sm text-[#AEAEAE] my-1 truncate-1-lines" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(item.skuPropList, (spec) => {
                        return openBlock(), createBlock("span", {
                          key: spec.value,
                          class: "mr-2"
                        }, toDisplayString(spec.value), 1);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<p class="text-sm text-customblack" data-v-46341f7e> Price × Qty：$${ssrInterpolate(item.priceOrdered)} × ${ssrInterpolate(item.qtyOrdered)}</p></div></div></div>`);
          });
          _push(`<!--]-->`);
          if (order.orderItemList.length > 3) {
            _push(`<div data-v-46341f7e><button class="text-blue-500 text-sm mt-1" data-v-46341f7e>${ssrInterpolate(showMore.value[order.id] ? "Show Less" : "Show More")}</button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="md:col-span-3 flex items-start justify-start md:justify-center" data-v-46341f7e><span class="font-medium text-base mt-1 md:mt-0 dark:text-gray-900" data-v-46341f7e>$${ssrInterpolate(order.paymentAmount)}</span></div><div class="md:col-span-3 flex flex-wrap gap-2 items-start md:flex-col md:items-end" data-v-46341f7e>`);
          if (order.status == 500) {
            _push(ssrRenderComponent(_component_UButton, {
              class: "w-auto px-4 md:w-28 flex justify-center items-center",
              onClick: ($event) => gotopay(order.orderNumber)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Pay `);
                } else {
                  return [
                    createTextVNode("Pay ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (order.status <= 1e3) {
            _push(ssrRenderComponent(_component_UButton, {
              color: "white",
              class: "w-auto px-4 md:w-28 flex justify-center items-center",
              variant: "solid",
              onClick: ($event) => setCancleOrder(order.id)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Cancel `);
                } else {
                  return [
                    createTextVNode("Cancel ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (order.status == 2500) {
            _push(ssrRenderComponent(_component_UButton, { class: "w-auto px-4 md:w-28 flex justify-center items-center" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Write a review `);
                } else {
                  return [
                    createTextVNode("Write a review ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (order.status == 2e3) {
            _push(ssrRenderComponent(_component_UButton, { class: "w-auto px-4 md:w-28 flex justify-center items-center" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`View Tracks `);
                } else {
                  return [
                    createTextVNode("View Tracks ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div><div class="flex justify-center md:justify-end mt-6" style="${ssrRenderStyle(ordercount.value > 0 ? null : { display: "none" })}" data-v-46341f7e>`);
        _push(ssrRenderComponent(_component_UPagination, {
          modelValue: page.value,
          "onUpdate:modelValue": ($event) => page.value = $event,
          "page-count": pageSize.value,
          total: ordercount.value,
          "prev-button": { icon: "i-material-symbols:chevron-left" },
          "next-button": { icon: "i-material-symbols:chevron-right" }
        }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (orders.value.length == 0) {
        _push(`<div class="flex flex-col items-center justify-center min-h-[300px] text-center" data-v-46341f7e><img${ssrRenderAttr("src", _imports_1)} alt="Empty" class="w-32 h-32 mt-6" data-v-46341f7e><p class="text-gray-400 text-sm mt-4" data-v-46341f7e> There is no historical order, you can go to buy the products you like! </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-12"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go shopping `);
            } else {
              return [
                createTextVNode(" Go shopping ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/myorders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const myorders = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-46341f7e"]]);

export { myorders as default };
