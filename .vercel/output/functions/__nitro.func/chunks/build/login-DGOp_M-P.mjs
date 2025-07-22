import { _ as _export_sfc, f as useToast, b as useNuxtApp, c as __nuxt_component_5, a as __nuxt_component_1$2, e as __nuxt_component_7, n as navigateTo } from './server.mjs';
import { _ as _imports_1, a as _imports_0, b as __nuxt_component_4 } from './virtual_public-Tzd--SVh.mjs';
import { _ as __nuxt_component_3 } from './FormGroup-D9YCQMEV.mjs';
import { _ as __nuxt_component_4$1 } from './Input-B5r9LTzZ.mjs';
import { _ as __nuxt_component_1 } from './Checkbox-D2J7pcw5.mjs';
import { reactive, ref, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { h as publicAssetsURL } from '../_/nitro.mjs';
import { message } from 'ant-design-vue';
import { u as useAuth } from './useAuth-BMZvH9i9.mjs';
import 'vue-router';
import 'tailwind-merge';
import '@iconify/vue';
import '@unhead/addons';
import '@unhead/schema-org';
import '@unhead/schema-org/vue';
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import './useFormGroup-XFEs-B9Y.mjs';
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

const _imports_2 = publicAssetsURL("/images/google.png");
const _imports_3 = publicAssetsURL("/images/apple.png");
const _imports_4 = publicAssetsURL("/images/facebook.png");
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { login: login2 } = useAuth();
    const toast = useToast();
    const { $showLoading, $hideLoading } = useNuxtApp();
    const formState = reactive({
      email: "",
      password: "",
      rememberMe: false
    });
    const formErrors = reactive({
      email: "",
      password: ""
    });
    const showPassword = ref(false);
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    const passwordRegex = /^(?!.*\s)(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,20}$/;
    const validateEmail = (value) => {
      const trimmedValue = formState.email;
      if (!trimmedValue) {
        formErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(trimmedValue)) {
        formErrors.email = "Invalid email format";
      } else {
        formErrors.email = "";
      }
    };
    const validatePassword = () => {
      const trimmedValue = formState.password;
      if (!trimmedValue) {
        formErrors.password = "Password is required";
      } else if (!passwordRegex.test(trimmedValue)) {
        formErrors.password = "Password must be 6-20 characters and include numbers, letters, and special symbols (no spaces)";
      } else {
        formErrors.password = "";
      }
      console.log(formErrors);
    };
    const handleLogin = async () => {
      if (Object.values(formErrors).some((error) => error)) {
        return;
      }
      try {
        $showLoading();
        await login2(formState.email.trim(), formState.password.trim());
        if (formState.rememberMe) {
          localStorage.setItem("rememberedEmail", formState.email.trim());
          localStorage.setItem("rememberedpassword", formState.password.trim());
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedpassword");
        }
        $hideLoading();
        message.success("Login successful!");
        navigateTo("/");
      } catch (error) {
        $hideLoading();
        let errormsg = JSON.parse(error.message);
        if (errormsg.errorKey == "email") {
          formErrors.email = errormsg.enDesc;
          return;
        }
        if (errormsg.errorKey == "password") {
          formErrors.password = errormsg.enDesc;
          return;
        }
        formErrors.email = "";
        formErrors.password = "";
        message.error(errormsg.enDesc || "Login failed, please try again");
      }
    };
    const socialLogin = (provider) => {
      toast.add({
        title: "Info",
        description: `Logging in with ${provider}... (Not implemented)`,
        color: "blue",
        timeout: 2e3
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_5;
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_UForm = __nuxt_component_4;
      const _component_UFormGroup = __nuxt_component_3;
      const _component_UInput = __nuxt_component_4$1;
      const _component_UButton = __nuxt_component_7;
      const _component_UCheckbox = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-2 h-screen" }, _attrs))} data-v-d05606a0><div class="hidden sm:flex bg-gradient-to-br from-[#00B2E3] to-[#0074C8] flex flex-col items-center justify-center text-white p-10" data-v-d05606a0><h1 class="text-4xl font-bold" data-v-d05606a0>Welcome Back to InCustom</h1><p class="mt-2 text-lg" data-v-d05606a0>Access your store, orders, and designs instantly</p><img${ssrRenderAttr("src", _imports_1)} alt="Custom Design" class="mt-6 w-full max-w-xl shadow-lg rounded-lg" data-v-d05606a0><ul class="mt-6 space-y-3 text-base" data-v-d05606a0><li class="flex items-center gap-2" data-v-d05606a0>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols-check-circle-rounded",
        class: "text-2xl"
      }, null, _parent));
      _push(` Quick Access – Manage orders, track shipments &amp; customize designs </li><li class="flex items-center gap-2" data-v-d05606a0>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols-check-circle-rounded",
        class: "text-2xl"
      }, null, _parent));
      _push(` Exclusive Deals – Special offers &amp; discounts for members </li><li class="flex items-center gap-2" data-v-d05606a0>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols-check-circle-rounded",
        class: "text-2xl"
      }, null, _parent));
      _push(` New Features – Try our latest design tools &amp; products </li></ul></div><div class="flex flex-col items-center justify-center p-8 bg-white" data-v-d05606a0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} class="h-10 mb-12" data-v-d05606a0${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                class: "h-10 mb-12"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 class="text-2xl font-medium text-gray-900 mb-6" data-v-d05606a0>Log In</h2>`);
      _push(ssrRenderComponent(_component_UForm, {
        state: formState,
        onSubmit: handleLogin,
        class: "w-full max-w-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UFormGroup, {
              name: "email",
              required: "",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    ui: { base: "dark:!bg-white dark:!text-gray-900" },
                    modelValue: formState.email,
                    "onUpdate:modelValue": ($event) => formState.email = $event,
                    size: "xl",
                    placeholder: "Your email address",
                    type: "email",
                    onBlur: validateEmail
                  }, null, _parent3, _scopeId2));
                  if (formErrors.email) {
                    _push3(`<span class="text-red-500 text-sm mb-2" data-v-d05606a0${_scopeId2}>${ssrInterpolate(formErrors.email)}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_UInput, {
                      ui: { base: "dark:!bg-white dark:!text-gray-900" },
                      modelValue: formState.email,
                      "onUpdate:modelValue": ($event) => formState.email = $event,
                      size: "xl",
                      placeholder: "Your email address",
                      type: "email",
                      onBlur: validateEmail
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    formErrors.email ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-red-500 text-sm mb-2"
                    }, toDisplayString(formErrors.email), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              name: "password",
              required: "",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: formState.password,
                    "onUpdate:modelValue": ($event) => formState.password = $event,
                    type: showPassword.value ? "text" : "password",
                    size: "xl",
                    placeholder: "Password",
                    ui: { icon: { trailing: { pointer: "" } }, base: "dark:!bg-white dark:!text-gray-900" },
                    onBlur: validatePassword
                  }, {
                    trailing: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UButton, {
                          onClick: togglePassword,
                          variant: "ghost",
                          class: "text-gray-500"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UIcon, {
                                name: showPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                                class: "w-5 h-5"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UIcon, {
                                  name: showPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                                  class: "w-5 h-5"
                                }, null, 8, ["name"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UButton, {
                            onClick: togglePassword,
                            variant: "ghost",
                            class: "text-gray-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UIcon, {
                                name: showPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                                class: "w-5 h-5"
                              }, null, 8, ["name"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (formErrors.password) {
                    _push3(`<span class="text-red-500 text-sm mb-2" data-v-d05606a0${_scopeId2}>${ssrInterpolate(formErrors.password)}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: formState.password,
                      "onUpdate:modelValue": ($event) => formState.password = $event,
                      type: showPassword.value ? "text" : "password",
                      size: "xl",
                      placeholder: "Password",
                      ui: { icon: { trailing: { pointer: "" } }, base: "dark:!bg-white dark:!text-gray-900" },
                      onBlur: validatePassword
                    }, {
                      trailing: withCtx(() => [
                        createVNode(_component_UButton, {
                          onClick: togglePassword,
                          variant: "ghost",
                          class: "text-gray-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UIcon, {
                              name: showPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                              class: "w-5 h-5"
                            }, null, 8, ["name"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                    formErrors.password ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-red-500 text-sm mb-2"
                    }, toDisplayString(formErrors.password), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-between w-full mb-6 text-sm text-gray-600" data-v-d05606a0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: formState.rememberMe,
              "onUpdate:modelValue": ($event) => formState.rememberMe = $event,
              name: "remember-me",
              label: "Remember me"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              size: "xl",
              class: "text-primary w-full max-w-md mt-6 p-3 block text-center text-white"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Log In `);
                } else {
                  return [
                    createTextVNode("Log In ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UFormGroup, {
                name: "email",
                required: "",
                class: "mb-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    ui: { base: "dark:!bg-white dark:!text-gray-900" },
                    modelValue: formState.email,
                    "onUpdate:modelValue": ($event) => formState.email = $event,
                    size: "xl",
                    placeholder: "Your email address",
                    type: "email",
                    onBlur: validateEmail
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  formErrors.email ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-red-500 text-sm mb-2"
                  }, toDisplayString(formErrors.email), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_UFormGroup, {
                name: "password",
                required: "",
                class: "mb-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: formState.password,
                    "onUpdate:modelValue": ($event) => formState.password = $event,
                    type: showPassword.value ? "text" : "password",
                    size: "xl",
                    placeholder: "Password",
                    ui: { icon: { trailing: { pointer: "" } }, base: "dark:!bg-white dark:!text-gray-900" },
                    onBlur: validatePassword
                  }, {
                    trailing: withCtx(() => [
                      createVNode(_component_UButton, {
                        onClick: togglePassword,
                        variant: "ghost",
                        class: "text-gray-500"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: showPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                            class: "w-5 h-5"
                          }, null, 8, ["name"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                  formErrors.password ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-red-500 text-sm mb-2"
                  }, toDisplayString(formErrors.password), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex items-center justify-between w-full mb-6 text-sm text-gray-600" }, [
                createVNode(_component_UCheckbox, {
                  modelValue: formState.rememberMe,
                  "onUpdate:modelValue": ($event) => formState.rememberMe = $event,
                  name: "remember-me",
                  label: "Remember me"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode(_component_UButton, {
                type: "submit",
                size: "xl",
                class: "text-primary w-full max-w-md mt-6 p-3 block text-center text-white"
              }, {
                default: withCtx(() => [
                  createTextVNode("Log In ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex justify-between w-full max-w-md mt-4 text-sm text-gray-600" data-v-d05606a0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Register`);
          } else {
            return [
              createTextVNode("Register")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/forgetpassword",
        class: "hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Forgot Password?`);
          } else {
            return [
              createTextVNode("Forgot Password?")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center w-full max-w-md mt-6 mb-4" data-v-d05606a0><div class="flex-grow h-px bg-customblack" data-v-d05606a0></div><span class="mx-4 text-sm text-customblack" data-v-d05606a0>OR</span><div class="flex-grow h-px bg-customblack" data-v-d05606a0></div></div><div class="flex justify-center gap-4 mt-4" data-v-d05606a0>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        class: "bg-gray-50 w-28 sm:w-32 h-12 flex items-center justify-center gap-2 rounded-lg p-3 text-gray-700 hover:bg-primary hover:text-white transition-colors duration-300",
        onClick: ($event) => socialLogin("google")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_2)} class="w-5 h-5" alt="Google" data-v-d05606a0${_scopeId}><span class="font-medium" data-v-d05606a0${_scopeId}>Google</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_2,
                class: "w-5 h-5",
                alt: "Google"
              }),
              createVNode("span", { class: "font-medium" }, "Google")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        class: "bg-gray-50 w-28 sm:w-32 h-12 flex items-center justify-center gap-2 rounded-lg p-3 text-gray-700 hover:bg-primary hover:text-white transition-colors duration-300",
        onClick: ($event) => socialLogin("apple")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_3)} class="w-5 h-5" alt="Apple" data-v-d05606a0${_scopeId}><span class="font-medium" data-v-d05606a0${_scopeId}>Apple</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_3,
                class: "w-5 h-5",
                alt: "Apple"
              }),
              createVNode("span", { class: "font-medium" }, "Apple")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        class: "bg-gray-50 w-28 sm:w-32 h-12 flex items-center justify-center gap-2 rounded-lg p-3 text-gray-700 hover:bg-primary hover:text-white transition-colors duration-300",
        onClick: ($event) => socialLogin("facebook")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_4)} class="w-5 h-5" alt="Facebook" data-v-d05606a0${_scopeId}><span class="font-medium" data-v-d05606a0${_scopeId}>Facebook</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_4,
                class: "w-5 h-5",
                alt: "Facebook"
              }),
              createVNode("span", { class: "font-medium" }, "Facebook")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d05606a0"]]);

export { login as default };
