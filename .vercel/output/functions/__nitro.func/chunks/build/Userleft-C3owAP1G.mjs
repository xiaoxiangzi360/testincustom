import { g as useRoute, a as __nuxt_component_1$2 } from './server.mjs';
import { mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Userleft",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
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
      }
    ];
    const isActive = (path) => route.path === path;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "w-60 bg-white p-6 space-y-6" }, _attrs))}><div class="text-customblack p-1"><!--[-->`);
      ssrRenderList(usermenu, (item) => {
        _push(`<div class="${ssrRenderClass([isActive(item.url) ? "bg-primary-50" : "", "p-2 text-gray-400 hover:bg-primary-50"])}">`);
        if (item.type == "link") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.url
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center"${_scopeId}><img${ssrRenderAttr("src", item.img)} class="w-4 mr-2 h-4"${_scopeId}><div${_scopeId}>${ssrInterpolate(item.lable)}</div></div>`);
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
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></aside>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Userleft.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
