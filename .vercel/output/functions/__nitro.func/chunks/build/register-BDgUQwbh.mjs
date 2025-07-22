import { _ as _export_sfc, f as useToast, b as useNuxtApp, c as __nuxt_component_5, a as __nuxt_component_1$2, e as __nuxt_component_7, n as navigateTo } from './server.mjs';
import { _ as _imports_1, a as _imports_0, b as __nuxt_component_4 } from './virtual_public-Tzd--SVh.mjs';
import { _ as __nuxt_component_3 } from './FormGroup-D9YCQMEV.mjs';
import { _ as __nuxt_component_4$1 } from './Input-B5r9LTzZ.mjs';
import { _ as __nuxt_component_6 } from './SelectMenu-CA8fbto0.mjs';
import { _ as __nuxt_component_1 } from './Checkbox-D2J7pcw5.mjs';
import { reactive, ref, watch, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import '@tanstack/vue-virtual';
import './active-element-history-BbzAu_2T.mjs';
import './hidden-BKyvU3BW.mjs';
import './keyboard-Duq8EHr3.mjs';
import './use-resolve-button-type-DOOP2SMg.mjs';
import './open-closed-BDzQJ33n.mjs';
import './usePopper-BrvKSG9Z.mjs';

const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const { register: register2 } = useAuth();
    useToast();
    const { $showLoading, $hideLoading } = useNuxtApp();
    const formState = reactive({
      fullName: "",
      email: "",
      password: "",
      repassword: "",
      numberAreaCode: "+1",
      phoneNumber: "",
      isChecked: false
    });
    const formErrors = reactive({
      fullName: "",
      email: "",
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
    const countries = [
      { label: "+1", value: "+1" },
      { label: "+44", value: "+44" },
      { label: "+93", value: "+93" },
      { label: "+355", value: "+355" },
      { label: "+213", value: "+213" },
      { label: "+1684", value: "+1684" },
      { label: "+376", value: "+376" },
      { label: "+244", value: "+244" },
      { label: "+1264", value: "+1264" },
      { label: "+1268", value: "+1268" },
      { label: "+54", value: "+54" },
      { label: "+374", value: "+374" },
      { label: "+297", value: "+297" },
      { label: "+61", value: "+61" },
      { label: "+43", value: "+43" },
      { label: "+994", value: "+994" },
      { label: "+1242", value: "+1242" },
      { label: "+973", value: "+973" },
      { label: "+880", value: "+880" },
      { label: "+1246", value: "+1246" },
      { label: "+375", value: "+375" },
      { label: "+32", value: "+32" },
      { label: "+501", value: "+501" },
      { label: "+229", value: "+229" },
      { label: "+1441", value: "+1441" },
      { label: "+975", value: "+975" },
      { label: "+591", value: "+591" },
      { label: "+387", value: "+387" },
      { label: "+267", value: "+267" },
      { label: "+55", value: "+55" },
      { label: "+246", value: "+246" },
      { label: "+1284", value: "+1284" },
      { label: "+673", value: "+673" },
      { label: "+359", value: "+359" },
      { label: "+226", value: "+226" },
      { label: "+257", value: "+257" },
      { label: "+855", value: "+855" },
      { label: "+237", value: "+237" },
      { label: "+238", value: "+238" },
      { label: "+599", value: "+599" },
      { label: "+1345", value: "+1345" },
      { label: "+236", value: "+236" },
      { label: "+235", value: "+235" },
      { label: "+56", value: "+56" },
      { label: "+86", value: "+86" },
      { label: "+57", value: "+57" },
      { label: "+269", value: "+269" },
      { label: "+243", value: "+243" },
      { label: "+242", value: "+242" },
      { label: "+682", value: "+682" },
      { label: "+506", value: "+506" },
      { label: "+225", value: "+225" },
      { label: "+385", value: "+385" },
      { label: "+53", value: "+53" },
      { label: "+599", value: "+599" },
      { label: "+357", value: "+357" },
      { label: "+420", value: "+420" },
      { label: "+45", value: "+45" },
      { label: "+253", value: "+253" },
      { label: "+1767", value: "+1767" },
      { label: "+593", value: "+593" },
      { label: "+20", value: "+20" },
      { label: "+503", value: "+503" },
      { label: "+240", value: "+240" },
      { label: "+291", value: "+291" },
      { label: "+372", value: "+372" },
      { label: "+251", value: "+251" },
      { label: "+500", value: "+500" },
      { label: "+298", value: "+298" },
      { label: "+679", value: "+679" },
      { label: "+358", value: "+358" },
      { label: "+33", value: "+33" },
      { label: "+594", value: "+594" },
      { label: "+689", value: "+689" },
      { label: "+241", value: "+241" },
      { label: "+220", value: "+220" },
      { label: "+995", value: "+995" },
      { label: "+49", value: "+49" },
      { label: "+233", value: "+233" },
      { label: "+350", value: "+350" },
      { label: "+30", value: "+30" },
      { label: "+299", value: "+299" },
      { label: "+1473", value: "+1473" },
      { label: "+590", value: "+590" },
      { label: "+1671", value: "+1671" },
      { label: "+502", value: "+502" },
      { label: "+44", value: "+44" },
      { label: "+224", value: "+224" },
      { label: "+245", value: "+245" },
      { label: "+592", value: "+592" },
      { label: "+509", value: "+509" },
      { label: "+504", value: "+504" },
      { label: "+852", value: "+852" },
      { label: "+36", value: "+36" },
      { label: "+354", value: "+354" },
      { label: "+91", value: "+91" },
      { label: "+62", value: "+62" },
      { label: "+98", value: "+98" },
      { label: "+964", value: "+964" },
      { label: "+353", value: "+353" },
      { label: "+972", value: "+972" },
      { label: "+39", value: "+39" },
      { label: "+1876", value: "+1876" },
      { label: "+81", value: "+81" },
      { label: "+962", value: "+962" },
      { label: "+7", value: "+7" },
      { label: "+254", value: "+254" },
      { label: "+686", value: "+686" },
      { label: "+383", value: "+383" },
      { label: "+965", value: "+965" },
      { label: "+996", value: "+996" },
      { label: "+856", value: "+856" },
      { label: "+371", value: "+371" },
      { label: "+961", value: "+961" },
      { label: "+266", value: "+266" },
      { label: "+231", value: "+231" },
      { label: "+218", value: "+218" },
      { label: "+423", value: "+423" },
      { label: "+370", value: "+370" },
      { label: "+352", value: "+352" },
      { label: "+853", value: "+853" },
      { label: "+389", value: "+389" },
      { label: "+261", value: "+261" },
      { label: "+265", value: "+265" },
      { label: "+60", value: "+60" },
      { label: "+960", value: "+960" },
      { label: "+223", value: "+223" },
      { label: "+356", value: "+356" },
      { label: "+692", value: "+692" },
      { label: "+596", value: "+596" },
      { label: "+222", value: "+222" },
      { label: "+230", value: "+230" },
      { label: "+262", value: "+262" },
      { label: "+52", value: "+52" },
      { label: "+691", value: "+691" },
      { label: "+373", value: "+373" },
      { label: "+377", value: "+377" },
      { label: "+976", value: "+976" },
      { label: "+382", value: "+382" },
      { label: "+1664", value: "+1664" },
      { label: "+212", value: "+212" },
      { label: "+258", value: "+258" },
      { label: "+95", value: "+95" },
      { label: "+264", value: "+264" },
      { label: "+674", value: "+674" },
      { label: "+977", value: "+977" },
      { label: "+31", value: "+31" },
      { label: "+687", value: "+687" },
      { label: "+64", value: "+64" },
      { label: "+505", value: "+505" },
      { label: "+227", value: "+227" },
      { label: "+234", value: "+234" },
      { label: "+683", value: "+683" },
      { label: "+672", value: "+672" },
      { label: "+850", value: "+850" },
      { label: "+1670", value: "+1670" },
      { label: "+47", value: "+47" },
      { label: "+968", value: "+968" },
      { label: "+92", value: "+92" },
      { label: "+680", value: "+680" },
      { label: "+970", value: "+970" },
      { label: "+507", value: "+507" },
      { label: "+675", value: "+675" },
      { label: "+595", value: "+595" },
      { label: "+51", value: "+51" },
      { label: "+63", value: "+63" },
      { label: "+48", value: "+48" },
      { label: "+351", value: "+351" },
      { label: "+974", value: "+974" },
      { label: "+262", value: "+262" },
      { label: "+40", value: "+40" },
      { label: "+7", value: "+7" },
      { label: "+250", value: "+250" },
      { label: "+590", value: "+590" },
      { label: "+290", value: "+290" },
      { label: "+1869", value: "+1869" },
      { label: "+1758", value: "+1758" },
      { label: "+508", value: "+508" },
      { label: "+1784", value: "+1784" },
      { label: "+685", value: "+685" },
      { label: "+378", value: "+378" },
      { label: "+239", value: "+239" },
      { label: "+966", value: "+966" },
      { label: "+221", value: "+221" },
      { label: "+381", value: "+381" },
      { label: "+248", value: "+248" },
      { label: "+232", value: "+232" },
      { label: "+65", value: "+65" },
      { label: "+1721", value: "+1721" },
      { label: "+421", value: "+421" },
      { label: "+386", value: "+386" },
      { label: "+677", value: "+677" },
      { label: "+252", value: "+252" },
      { label: "+27", value: "+27" },
      { label: "+82", value: "+82" },
      { label: "+211", value: "+211" },
      { label: "+34", value: "+34" },
      { label: "+94", value: "+94" },
      { label: "+249", value: "+249" },
      { label: "+597", value: "+597" },
      { label: "+268", value: "+268" },
      { label: "+46", value: "+46" },
      { label: "+41", value: "+41" },
      { label: "+963", value: "+963" },
      { label: "+886", value: "+886" },
      { label: "+992", value: "+992" },
      { label: "+255", value: "+255" },
      { label: "+66", value: "+66" },
      { label: "+670", value: "+670" },
      { label: "+228", value: "+228" },
      { label: "+690", value: "+690" },
      { label: "+676", value: "+676" },
      { label: "+1868", value: "+1868" },
      { label: "+216", value: "+216" },
      { label: "+90", value: "+90" },
      { label: "+993", value: "+993" },
      { label: "+1649", value: "+1649" },
      { label: "+688", value: "+688" },
      { label: "+1340", value: "+1340" },
      { label: "+256", value: "+256" },
      { label: "+380", value: "+380" },
      { label: "+971", value: "+971" },
      { label: "+598", value: "+598" },
      { label: "+998", value: "+998" },
      { label: "+678", value: "+678" },
      { label: "+58", value: "+58" },
      { label: "+84", value: "+84" },
      { label: "+681", value: "+681" },
      { label: "+212", value: "+212" },
      { label: "+967", value: "+967" },
      { label: "+260", value: "+260" },
      { label: "+263", value: "+263" },
      { label: "+358", value: "+358" }
    ];
    const validatefullName = () => {
      const trimmedValue = formState.fullName;
      if (!trimmedValue) {
        formErrors.fullName = "fullName is required";
      } else {
        formErrors.fullName = "";
      }
    };
    const validateemail = () => {
      const trimmedValue = formState.email;
      if (!trimmedValue) {
        formErrors.email = "Email is required";
      } else if (!/^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedValue)) {
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
    const validatePasswordMatch = () => {
      const trimmedValue = formState.repassword;
      if (!trimmedValue) {
        formErrors.repassword = "Please confirm your password";
      } else if (formState.password.trim() && formState.password.trim() !== trimmedValue) {
        formErrors.repassword = "Passwords do not match";
      } else {
        formErrors.repassword = "";
      }
    };
    watch(() => formState.isChecked, (newvalue, oldvalue) => {
      if (newvalue) {
        formErrors.agreement = "";
      }
    });
    const handleRegister = async () => {
      if (!formState.isChecked) {
        formErrors.agreement = "You must agree to the terms";
        return;
      } else {
        formErrors.agreement = "";
      }
      formState.phoneNumber.replace(/\s+/g, "");
      if (formState.phoneNumber.length < 8) {
        formErrors.phoneformat = "Phone number is incorrect";
        return;
      } else {
        formErrors.phoneformat = "";
      }
      if (Object.values(formErrors).some((error) => error)) {
        return;
      }
      try {
        $showLoading();
        let selectedcode = "+1";
        if (typeof formState.numberAreaCode === "object" && formState.numberAreaCode !== null) {
          selectedcode = formState.numberAreaCode.value;
        } else {
          selectedcode = formState.numberAreaCode;
        }
        let res = await register2(
          formState.fullName.replace(/\s/g, ""),
          formState.email,
          formState.password.trim(),
          selectedcode,
          Number(formState.phoneNumber.replace(/\s/g, ""))
        );
        $hideLoading();
        message.success("Registration successful!");
        navigateTo("/");
      } catch (error) {
        $hideLoading();
        console.error(error);
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_5;
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_UForm = __nuxt_component_4;
      const _component_UFormGroup = __nuxt_component_3;
      const _component_UInput = __nuxt_component_4$1;
      const _component_UButton = __nuxt_component_7;
      const _component_USelectMenu = __nuxt_component_6;
      const _component_UCheckbox = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-2 h-screen" }, _attrs))} data-v-d454074b><div class="hidden sm:flex bg-gradient-to-br from-[#00B2E3] to-[#0074C8] flex flex-col items-center justify-center text-white p-10" data-v-d454074b><h1 class="text-4xl font-bold" data-v-d454074b>Welcome Back to InCustom</h1><p class="mt-2 text-lg" data-v-d454074b>Access your store, orders, and designs instantly</p><img${ssrRenderAttr("src", _imports_1)} alt="Custom Design" class="mt-6 w-full max-w-xl shadow-lg rounded-lg" data-v-d454074b><ul class="mt-6 space-y-3 text-base" data-v-d454074b><li class="flex items-center gap-2" data-v-d454074b>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols-check-circle-rounded",
        class: "text-2xl"
      }, null, _parent));
      _push(` Quick Access – Manage orders, track shipments &amp; customize designs </li><li class="flex items-center gap-2" data-v-d454074b>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols-check-circle-rounded",
        class: "text-2xl"
      }, null, _parent));
      _push(` Exclusive Deals – Special offers &amp; discounts for members </li><li class="flex items-center gap-2" data-v-d454074b>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-material-symbols-check-circle-rounded",
        class: "text-2xl"
      }, null, _parent));
      _push(` New Features – Try our latest design tools &amp; products </li></ul></div><div class="flex flex-col items-center justify-center p-8 bg-white" data-v-d454074b>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} class="h-10 mb-12" data-v-d454074b${_scopeId}>`);
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
      _push(`<h2 class="text-2xl font-medium text-title mb-6" data-v-d454074b>Create an account using email</h2>`);
      _push(ssrRenderComponent(_component_UForm, {
        state: formState,
        onSubmit: handleRegister,
        class: "w-full max-w-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UFormGroup, {
              name: "fullName",
              required: "",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    ui: { base: "dark:!bg-white dark:!text-gray-900" },
                    modelValue: formState.fullName,
                    "onUpdate:modelValue": ($event) => formState.fullName = $event,
                    size: "xl",
                    placeholder: "Full name",
                    onBlur: validatefullName
                  }, null, _parent3, _scopeId2));
                  if (formErrors.fullName) {
                    _push3(`<span class="text-red-500 text-sm mb-2" data-v-d454074b${_scopeId2}>${ssrInterpolate(formErrors.fullName)}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_UInput, {
                      ui: { base: "dark:!bg-white dark:!text-gray-900" },
                      modelValue: formState.fullName,
                      "onUpdate:modelValue": ($event) => formState.fullName = $event,
                      size: "xl",
                      placeholder: "Full name",
                      onBlur: validatefullName
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    formErrors.fullName ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-red-500 text-sm mb-2"
                    }, toDisplayString(formErrors.fullName), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
                    placeholder: "Email",
                    type: "email",
                    onBlur: validateemail
                  }, null, _parent3, _scopeId2));
                  if (formErrors.email) {
                    _push3(`<span class="text-red-500 text-sm mb-2" data-v-d454074b${_scopeId2}>${ssrInterpolate(formErrors.email)}</span>`);
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
                      placeholder: "Email",
                      type: "email",
                      onBlur: validateemail
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
                    _push3(`<span class="text-red-500 text-sm mb-2" data-v-d454074b${_scopeId2}>${ssrInterpolate(formErrors.password)}</span>`);
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
            _push2(ssrRenderComponent(_component_UFormGroup, {
              name: "repassword",
              required: "",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    ui: { base: "dark:!bg-white dark:!text-gray-900" },
                    modelValue: formState.repassword,
                    "onUpdate:modelValue": ($event) => formState.repassword = $event,
                    type: "password",
                    size: "xl",
                    placeholder: "Confirm password",
                    onBlur: validatePasswordMatch
                  }, null, _parent3, _scopeId2));
                  if (formErrors.repassword) {
                    _push3(`<span class="text-red-500 text-sm mb-2" data-v-d454074b${_scopeId2}>${ssrInterpolate(formErrors.repassword)}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_UInput, {
                      ui: { base: "dark:!bg-white dark:!text-gray-900" },
                      modelValue: formState.repassword,
                      "onUpdate:modelValue": ($event) => formState.repassword = $event,
                      type: "password",
                      size: "xl",
                      placeholder: "Confirm password",
                      onBlur: validatePasswordMatch
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    formErrors.repassword ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-red-500 text-sm mb-2"
                    }, toDisplayString(formErrors.repassword), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              name: "phone",
              required: "",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center" data-v-d454074b${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    "searchable-placeholder": "",
                    searchable: "",
                    modelValue: formState.numberAreaCode,
                    "onUpdate:modelValue": ($event) => formState.numberAreaCode = $event,
                    options: countries,
                    size: "xl",
                    class: "mr-2 dark:bg-white",
                    ui: { background: "dark:!bg-white", base: "dark:!bg-white dark:!text-primary-900" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: formState.phoneNumber,
                    "onUpdate:modelValue": ($event) => formState.phoneNumber = $event,
                    ui: { base: "dark:!bg-white dark:!text-gray-900" },
                    size: "xl",
                    placeholder: "Your number",
                    class: "flex-1 bg-gray-50 border-0 focus:ring-0"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (formErrors.phoneformat) {
                    _push3(`<span class="text-red-500 text-sm mb-2" data-v-d454074b${_scopeId2}>${ssrInterpolate(formErrors.phoneformat)}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode(_component_USelectMenu, {
                        "searchable-placeholder": "",
                        searchable: "",
                        modelValue: formState.numberAreaCode,
                        "onUpdate:modelValue": ($event) => formState.numberAreaCode = $event,
                        options: countries,
                        size: "xl",
                        class: "mr-2 dark:bg-white",
                        ui: { background: "dark:!bg-white", base: "dark:!bg-white dark:!text-primary-900" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UInput, {
                        modelValue: formState.phoneNumber,
                        "onUpdate:modelValue": ($event) => formState.phoneNumber = $event,
                        ui: { base: "dark:!bg-white dark:!text-gray-900" },
                        size: "xl",
                        placeholder: "Your number",
                        class: "flex-1 bg-gray-50 border-0 focus:ring-0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    formErrors.phoneformat ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-red-500 text-sm mb-2"
                    }, toDisplayString(formErrors.phoneformat), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UFormGroup, {
                name: "fullName",
                required: "",
                class: "mb-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    ui: { base: "dark:!bg-white dark:!text-gray-900" },
                    modelValue: formState.fullName,
                    "onUpdate:modelValue": ($event) => formState.fullName = $event,
                    size: "xl",
                    placeholder: "Full name",
                    onBlur: validatefullName
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  formErrors.fullName ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-red-500 text-sm mb-2"
                  }, toDisplayString(formErrors.fullName), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }),
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
                    placeholder: "Email",
                    type: "email",
                    onBlur: validateemail
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
              createVNode(_component_UFormGroup, {
                name: "repassword",
                required: "",
                class: "mb-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    ui: { base: "dark:!bg-white dark:!text-gray-900" },
                    modelValue: formState.repassword,
                    "onUpdate:modelValue": ($event) => formState.repassword = $event,
                    type: "password",
                    size: "xl",
                    placeholder: "Confirm password",
                    onBlur: validatePasswordMatch
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  formErrors.repassword ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-red-500 text-sm mb-2"
                  }, toDisplayString(formErrors.repassword), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_UFormGroup, {
                name: "phone",
                required: "",
                class: "mb-4"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode(_component_USelectMenu, {
                      "searchable-placeholder": "",
                      searchable: "",
                      modelValue: formState.numberAreaCode,
                      "onUpdate:modelValue": ($event) => formState.numberAreaCode = $event,
                      options: countries,
                      size: "xl",
                      class: "mr-2 dark:bg-white",
                      ui: { background: "dark:!bg-white", base: "dark:!bg-white dark:!text-primary-900" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UInput, {
                      modelValue: formState.phoneNumber,
                      "onUpdate:modelValue": ($event) => formState.phoneNumber = $event,
                      ui: { base: "dark:!bg-white dark:!text-gray-900" },
                      size: "xl",
                      placeholder: "Your number",
                      class: "flex-1 bg-gray-50 border-0 focus:ring-0"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  formErrors.phoneformat ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-red-500 text-sm mb-2"
                  }, toDisplayString(formErrors.phoneformat), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center space-x-2 mb-6 w-full max-w-md" data-v-d454074b>`);
      _push(ssrRenderComponent(_component_UCheckbox, {
        modelValue: formState.isChecked,
        "onUpdate:modelValue": ($event) => formState.isChecked = $event,
        name: "agreement",
        ui: { background: "dark:!bg-white", base: "dark:!bg-white dark:!text-primary-900" }
      }, null, _parent));
      _push(`<span class="text-sm text-title" data-v-d454074b> I have read the <a href="/article/terms-of-service" target="_blank" class="text-primary underline hover:text-primary-600" data-v-d454074b> Terms Of Service </a> and <a href="/article/privacy-policy" target="_blank" class="text-primary underline hover:text-primary-600" data-v-d454074b> Privacy Policy </a></span></div><div class="flex items-center space-x-2 w-full max-w-md" data-v-d454074b>`);
      if (formErrors.agreement) {
        _push(`<span class="w-full text-red-500 text-sm mb-2" data-v-d454074b>${ssrInterpolate(formErrors.agreement)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: handleRegister,
        class: "text-white w-full max-w-md mt-6 p-3 block text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign up `);
          } else {
            return [
              createTextVNode("Sign up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-title w-full max-w-md mt-4 text-center" data-v-d454074b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-title hover:underline"
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
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d454074b"]]);

export { register as default };
