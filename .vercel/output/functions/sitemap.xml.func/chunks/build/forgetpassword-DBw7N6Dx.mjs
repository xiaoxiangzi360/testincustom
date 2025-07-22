import { b as useNuxtApp, f as useToast, a as __nuxt_component_1$2, P as __nuxt_component_3$1, e as __nuxt_component_7, c as __nuxt_component_5, n as navigateTo } from './server.mjs';
import { _ as __nuxt_component_4 } from './Input-B5r9LTzZ.mjs';
import { a as _imports_0, b as __nuxt_component_4$1, _ as _imports_1 } from './virtual_public-Tzd--SVh.mjs';
import { _ as __nuxt_component_3 } from './FormGroup-D9YCQMEV.mjs';
import { ref, reactive, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { message } from 'ant-design-vue';
import { u as useAuth } from './useAuth-BMZvH9i9.mjs';
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
import '@unhead/shared';
import '@iconify/vue/dist/offline';
import './useFormGroup-XFEs-B9Y.mjs';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main = {
  __name: "forgetpassword",
  __ssrInlineRender: true,
  setup(__props) {
    const { sendrepassword, updatepassword } = useAuth();
    const { $showLoading, $hideLoading } = useNuxtApp();
    useToast();
    const step = ref(1);
    const formState = reactive({
      fullName: "",
      email: "",
      emailcode: "",
      password: "",
      repassword: "",
      numberAreaCode: "+1",
      phoneNumber: "",
      isChecked: false
    });
    const formErrors = reactive({
      fullName: "",
      email: "",
      emailcode: "",
      password: "",
      repassword: "",
      phone: "",
      agreement: ""
    });
    const showPassword = ref(false);
    const passwordRegex = /^(?!.*\s)(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,20}$/;
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    const email = ref("");
    ref("");
    ref("");
    ref("");
    const turnstileToken = ref("");
    const errorMessages = ref("");
    ref("");
    const countdown = ref(0);
    let timer = null;
    const turnstileRef = ref(null);
    const validatePassword = (value) => {
      const trimmedValue = value.trim();
      if (!trimmedValue) {
        formErrors.password = "Password is required";
      } else if (!passwordRegex.test(trimmedValue)) {
        formErrors.password = "Password must be 6-20 characters and include numbers, letters, and special symbols (no spaces)";
      } else {
        formErrors.password = "";
      }
      validatePasswordMatch(formState.repassword);
    };
    const validatePasswordMatch = (value) => {
      const trimmedValue = value.trim();
      if (!trimmedValue) {
        formErrors.repassword = "Please confirm your password";
      } else if (formState.password.trim() && formState.password.trim() !== trimmedValue) {
        formErrors.repassword = "Passwords do not match";
      } else {
        formErrors.repassword = "";
      }
    };
    const validate = (state) => {
      const errors = [];
      if (!state.emailcode) {
        formErrors.emailcode = "verificaiton code is required";
        errors.push({ path: "emailcode", message: formErrors.emailcode });
      } else {
        formErrors.email = "";
      }
      if (formErrors.password) {
        errors.push({ path: "password", message: formErrors.password });
      }
      if (formErrors.repassword) {
        errors.push({ path: "repassword", message: formErrors.repassword });
      }
      return errors;
    };
    const submitForm = async () => {
      if (!email.value) {
        errorMessages.value = "Please enter your email address.";
        return;
      }
      if (!turnstileToken.value) {
        errorMessages.value = "Please complete the CAPTCHA.";
        return;
      }
      try {
        $showLoading();
        let res = await sendrepassword(
          email.value,
          turnstileToken.value
        );
        $hideLoading();
        message.success("We have sent the email verification code to your email ！");
        step.value = 2;
        countdown.value = 60;
        timer = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--;
          } else {
            clearInterval(timer);
          }
        }, 1e3);
      } catch (error) {
        $hideLoading();
        nextTick(() => {
          var _a;
          (_a = turnstileRef.value) == null ? void 0 : _a.reset();
        });
        let errormsg = JSON.parse(error.message);
        message.error(errormsg.enDesc || "failed, please try again");
        console.log(turnstileToken.value);
      }
    };
    const resetpassword = async () => {
      try {
        let res = await updatepassword(
          email.value,
          formState.emailcode,
          formState.password
        );
        message.success("password update successful!");
        setTimeout(() => navigateTo("/login"), 3e3);
      } catch (error) {
        nextTick(() => {
          var _a;
          (_a = turnstileRef.value) == null ? void 0 : _a.reset();
        });
        let errormsg = JSON.parse(error.message);
        message.error(errormsg.enDesc || "failed, please try again");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_UInput = __nuxt_component_4;
      const _component_ClientOnly = __nuxt_component_3$1;
      const _component_UButton = __nuxt_component_7;
      const _component_UForm = __nuxt_component_4$1;
      const _component_UFormGroup = __nuxt_component_3;
      const _component_UIcon = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-2 h-screen" }, _attrs))}><div class="flex flex-col items-center justify-center p-8 bg-white">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} class="h-10 mb-12"${_scopeId}>`);
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
      _push(`<h2 class="text-2xl font-medium text-gray-900 text-title">Reset your password</h2>`);
      if (step.value == 1) {
        _push(`<div class="max-w-md text-title w-full text-base"><div class="mt-4 max-w-md text-title w-full text-base">Please enter your email and code</div>`);
        _push(ssrRenderComponent(_component_UInput, {
          ui: { base: "dark:!bg-white dark:!text-gray-900" },
          modelValue: email.value,
          "onUpdate:modelValue": ($event) => email.value = $event,
          size: "xl",
          placeholder: "Your email address",
          class: "mt-1 w-full max-w-md"
        }, null, _parent));
        _push(`<div class="relative mt-2 w-full max-w-md text-red-500 text-xs">${ssrInterpolate(errorMessages.value)}</div>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          onClick: submitForm,
          class: "text-white w-full max-w-md mt-6 p-3 block text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Get email verification `);
            } else {
              return [
                createTextVNode(" Get email verification ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (step.value == 2) {
        _push(`<div class="max-w-md text-title w-full text-base">`);
        _push(ssrRenderComponent(_component_UForm, {
          state: unref(formState),
          validate,
          onSubmit: resetpassword,
          class: "w-full max-w-md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UFormGroup, {
                name: "emailcode",
                required: "",
                class: "mb-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formState).emailcode,
                      "onUpdate:modelValue": ($event) => unref(formState).emailcode = $event,
                      size: "xl",
                      placeholder: "verificaiton code",
                      type: "text"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formState).emailcode,
                        "onUpdate:modelValue": ($event) => unref(formState).emailcode = $event,
                        size: "xl",
                        placeholder: "verificaiton code",
                        type: "text"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div${_scopeId}>if you don’t receive the email `);
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                class: "text-primary duration-200",
                label: "Get email verification",
                disabled: countdown.value > 0,
                onClick: submitForm
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(countdown.value > 0 ? `Resend in ${countdown.value}s` : "Get email verification")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(countdown.value > 0 ? `Resend in ${countdown.value}s` : "Get email verification"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                name: "password",
                required: "",
                class: "mb-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formState).password,
                      "onUpdate:modelValue": [($event) => unref(formState).password = $event, validatePassword],
                      type: showPassword.value ? "text" : "password",
                      size: "xl",
                      placeholder: "Password",
                      ui: { icon: { trailing: { pointer: "" } } }
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
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formState).password,
                        "onUpdate:modelValue": [($event) => unref(formState).password = $event, validatePassword],
                        type: showPassword.value ? "text" : "password",
                        size: "xl",
                        placeholder: "Password",
                        ui: { icon: { trailing: { pointer: "" } } }
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
                      }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                name: "repassword",
                required: "",
                class: "mb-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formState).repassword,
                      "onUpdate:modelValue": [($event) => unref(formState).repassword = $event, validatePasswordMatch],
                      type: "password",
                      size: "xl",
                      placeholder: "Confirm password"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formState).repassword,
                        "onUpdate:modelValue": [($event) => unref(formState).repassword = $event, validatePasswordMatch],
                        type: "password",
                        size: "xl",
                        placeholder: "Confirm password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                type: "submit",
                class: "text-white w-full max-w-md mt-6 p-3 block text-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Reset password `);
                  } else {
                    return [
                      createTextVNode("Reset password ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UFormGroup, {
                  name: "emailcode",
                  required: "",
                  class: "mb-4"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(formState).emailcode,
                      "onUpdate:modelValue": ($event) => unref(formState).emailcode = $event,
                      size: "xl",
                      placeholder: "verificaiton code",
                      type: "text"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode("div", null, [
                  createTextVNode("if you don’t receive the email "),
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    class: "text-primary duration-200",
                    label: "Get email verification",
                    disabled: countdown.value > 0,
                    onClick: submitForm
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(countdown.value > 0 ? `Resend in ${countdown.value}s` : "Get email verification"), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                createVNode(_component_UFormGroup, {
                  name: "password",
                  required: "",
                  class: "mb-4"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(formState).password,
                      "onUpdate:modelValue": [($event) => unref(formState).password = $event, validatePassword],
                      type: showPassword.value ? "text" : "password",
                      size: "xl",
                      placeholder: "Password",
                      ui: { icon: { trailing: { pointer: "" } } }
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
                    }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, {
                  name: "repassword",
                  required: "",
                  class: "mb-4"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(formState).repassword,
                      "onUpdate:modelValue": [($event) => unref(formState).repassword = $event, validatePasswordMatch],
                      type: "password",
                      size: "xl",
                      placeholder: "Confirm password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UButton, {
                  type: "submit",
                  class: "text-white w-full max-w-md mt-6 p-3 block text-center"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Reset password ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-title w-full max-w-md mt-2 p-2 block text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "block text-title hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Return to Login`);
          } else {
            return [
              createTextVNode("Return to Login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="hidden sm:flex bg-gradient-to-br from-[#00B2E3] to-[#0074C8] flex flex-col items-center justify-center text-white p-10"><h1 class="text-4xl font-bold">Welcome Back to InCustom</h1><p class="mt-2 text-lg">Access your store, orders, and designs instantly</p><img${ssrRenderAttr("src", _imports_1)} alt="Custom Design" class="mt-6 w-full max-w-xl shadow-lg rounded-lg"><ul class="mt-6 space-y-3 text-base"><li class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols-check-circle-rounded",
        class: "text-2xl"
      }, null, _parent));
      _push(` Quick Access – Manage orders, track shipments &amp; customize designs </li><li class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols-check-circle-rounded",
        class: "text-2xl"
      }, null, _parent));
      _push(` Exclusive Deals – Special offers &amp; discounts for members </li><li class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols-check-circle-rounded",
        class: "text-2xl"
      }, null, _parent));
      _push(` New Features – Try our latest design tools &amp; products </li></ul></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgetpassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
