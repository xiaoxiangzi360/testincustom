import { c as c$1, t as t$2, w as w$2, h } from './hidden-BKyvU3BW.mjs';
import { computed, ref, watchEffect } from 'vue';
import { o as o$1 } from './keyboard-Duq8EHr3.mjs';

function o() {
  let a = [], s = { addEventListener(e, t2, r, i2) {
    return e.addEventListener(t2, r, i2), s.add(() => e.removeEventListener(t2, r, i2));
  }, requestAnimationFrame(...e) {
    let t2 = requestAnimationFrame(...e);
    s.add(() => cancelAnimationFrame(t2));
  }, nextFrame(...e) {
    s.requestAnimationFrame(() => {
      s.requestAnimationFrame(...e);
    });
  }, setTimeout(...e) {
    let t2 = setTimeout(...e);
    s.add(() => clearTimeout(t2));
  }, microTask(...e) {
    let t2 = { current: true };
    return t$2(() => {
      t2.current && e[0]();
    }), s.add(() => {
      t2.current = false;
    });
  }, style(e, t2, r) {
    let i2 = e.style.getPropertyValue(t2);
    return Object.assign(e.style, { [t2]: r }), this.add(() => {
      Object.assign(e.style, { [t2]: i2 });
    });
  }, group(e) {
    let t2 = o();
    return e(t2), this.add(() => t2.dispose());
  }, add(e) {
    return a.push(e), () => {
      let t2 = a.indexOf(e);
      if (t2 >= 0) for (let r of a.splice(t2, 1)) r();
    };
  }, dispose() {
    for (let e of a.splice(0)) e();
  } };
  return s;
}
function t$1() {
  return /iPhone/gi.test((void 0).navigator.platform) || /Mac/gi.test((void 0).navigator.platform) && (void 0).navigator.maxTouchPoints > 0;
}
function i() {
  return /Android/gi.test((void 0).navigator.userAgent);
}
function n() {
  return t$1() || i();
}
function u(e, t2, n2) {
  c$1.isServer || watchEffect((o2) => {
    (void 0).addEventListener(e, t2, n2), o2(() => (void 0).removeEventListener(e, t2, n2));
  });
}
function w$1(e, n2, t2) {
  c$1.isServer || watchEffect((o2) => {
    (void 0).addEventListener(e, n2, t2), o2(() => (void 0).removeEventListener(e, n2, t2));
  });
}
function w(f, m, l = computed(() => true)) {
  function a(e, r) {
    if (!l.value || e.defaultPrevented) return;
    let t2 = r(e);
    if (t2 === null || !t2.getRootNode().contains(t2)) return;
    let c2 = function o2(n2) {
      return typeof n2 == "function" ? o2(n2()) : Array.isArray(n2) || n2 instanceof Set ? n2 : [n2];
    }(f);
    for (let o2 of c2) {
      if (o2 === null) continue;
      let n2 = o2 instanceof HTMLElement ? o2 : o$1(o2);
      if (n2 != null && n2.contains(t2) || e.composed && e.composedPath().includes(n2)) return;
    }
    return !w$2(t2, h.Loose) && t2.tabIndex !== -1 && e.preventDefault(), m(e, t2);
  }
  let u$1 = ref(null);
  u("pointerdown", (e) => {
    var r, t2;
    l.value && (u$1.value = ((t2 = (r = e.composedPath) == null ? void 0 : r.call(e)) == null ? void 0 : t2[0]) || e.target);
  }, true), u("mousedown", (e) => {
    var r, t2;
    l.value && (u$1.value = ((t2 = (r = e.composedPath) == null ? void 0 : r.call(e)) == null ? void 0 : t2[0]) || e.target);
  }, true), u("click", (e) => {
    n() || u$1.value && (a(e, () => u$1.value), u$1.value = null);
  }, true), u("touchend", (e) => a(e, () => e.target instanceof HTMLElement ? e.target : null), true), w$1("blur", (e) => a(e, () => (void 0).document.activeElement instanceof HTMLIFrameElement ? (void 0).document.activeElement : null), true);
}
let t = [];

export { w$1 as a, t$1 as b, n, o, t, w };
