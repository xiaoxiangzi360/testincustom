import { _ as __nuxt_component_4 } from './Modal-DW14wYHj.mjs';
import { _ as __nuxt_component_5 } from './Card-BmnXDPH2.mjs';
import { ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, withKeys, withModifiers, toDisplayString, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { Form, FormItem, Select, Input, AutoComplete, Checkbox, Button, message } from 'ant-design-vue';
import { b as useNuxtApp, _ as _export_sfc, u as useCookie } from './server.mjs';
import { L as LocationAuth } from './location-BxTFTaaq.mjs';

const AddressAuth = () => {
  const { $api } = useNuxtApp();
  const findProvincesByCountryCode = async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await $api(`/common/geoName/findProvincesByCountryCode?${query}`, {
        method: "GET"
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const findCountryList = async () => {
    try {
      const response = await $api(`/common/geoName/countryLists`, {
        method: "GET"
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const findCityByAdmin1Code = async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await $api(`/common/geoName/findCityByAdmin1Code?${query}`, {
        method: "GET"
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const getuserAddressRollPage = async (params) => {
    try {
      const response = await $api("/user/userAddress/userAddressRollPage", {
        method: "POST",
        body: params
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const createUserAddress = async (params) => {
    try {
      const response = await $api("/user/userAddress/createUserAddress", {
        method: "POST",
        body: params
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const editUserAddress = async (params) => {
    try {
      const response = await $api("/user/userAddress/editUserAddress", {
        method: "POST",
        body: params
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const deleteUserAddressByIdList = async (params) => {
    try {
      const response = await $api("/user/userAddress/deleteUserAddressByIdList", {
        method: "POST",
        body: params
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return { findProvincesByCountryCode, findCountryList, findCityByAdmin1Code, getuserAddressRollPage, createUserAddress, editUserAddress, deleteUserAddressByIdList };
};
const _sfc_main = {
  __name: "AddressModal",
  __ssrInlineRender: true,
  props: {
    form: Object,
    countryarr: Array,
    provincearr: Array,
    cityarr: Array,
    countries: Array,
    isshow: Boolean,
    addressinfo: Object
  },
  emits: ["close", "updateData"],
  setup(__props, { emit: __emit }) {
    const { createUserAddress, editUserAddress } = AddressAuth();
    const { listCountryAll, listProvinceByCountryId, listCityByRegionId } = LocationAuth();
    const locationinfo = useCookie("locationinfo");
    let props = __props;
    const formRef = ref();
    const rules = {
      country: [
        { required: true, message: "Please select country", trigger: "change" }
      ],
      firstName: [{ required: true, message: "Please input firstName", trigger: "blur" }],
      lastName: [{ required: true, message: "Please input lastName", trigger: "blur" }],
      address: [{ required: true, message: "Please input address", trigger: "blur" }],
      province: [{ required: true, message: "Please select State/Province", trigger: "blur" }],
      city: [{ required: true, message: "Please select city", trigger: "change" }],
      postalCode: [{ required: true, message: "Please input postalCode", trigger: "blur" }],
      number: [{ required: true, message: "Please input number", trigger: "blur" }]
    };
    const emit = __emit;
    const provincearr = ref([]);
    const loading = ref(false);
    const cityarr = ref([]);
    ref([]);
    const countries = [
      "+1",
      "+44",
      "+93",
      "+355",
      "+213",
      "+1684",
      "+376",
      "+244",
      "+1264",
      "+1268",
      "+54",
      "+374",
      "+297",
      "+61",
      "+43",
      "+994",
      "+1242",
      "+973",
      "+880",
      "+1246",
      "+375",
      "+32",
      "+501",
      "+229",
      "+1441",
      "+975",
      "+591",
      "+387",
      "+267",
      "+55",
      "+246",
      "+1284",
      "+673",
      "+359",
      "+226",
      "+257",
      "+855",
      "+237",
      "+238",
      "+599",
      "+1345",
      "+236",
      "+235",
      "+56",
      "+86",
      "+57",
      "+269",
      "+243",
      "+242",
      "+682",
      "+506",
      "+225",
      "+385",
      "+53",
      "+599",
      "+357",
      "+420",
      "+45",
      "+253",
      "+1767",
      "+593",
      "+20",
      "+503",
      "+240",
      "+291",
      "+372",
      "+251",
      "+500",
      "+298",
      "+679",
      "+358",
      "+33",
      "+594",
      "+689",
      "+241",
      "+220",
      "+995",
      "+49",
      "+233",
      "+350",
      "+30",
      "+299",
      "+1473",
      "+590",
      "+1671",
      "+502",
      "+44",
      "+224",
      "+245",
      "+592",
      "+509",
      "+504",
      "+852",
      "+36",
      "+354",
      "+91",
      "+62",
      "+98",
      "+964",
      "+353",
      "+972",
      "+39",
      "+1876",
      "+81",
      "+962",
      "+7",
      "+254",
      "+686",
      "+383",
      "+965",
      "+996",
      "+856",
      "+371",
      "+961",
      "+266",
      "+231",
      "+218",
      "+423",
      "+370",
      "+352",
      "+853",
      "+389",
      "+261",
      "+265",
      "+60",
      "+960",
      "+223",
      "+356",
      "+692",
      "+596",
      "+222",
      "+230",
      "+262",
      "+52",
      "+691",
      "+373",
      "+377",
      "+976",
      "+382",
      "+1664",
      "+212",
      "+258",
      "+95",
      "+264",
      "+674",
      "+977",
      "+31",
      "+687",
      "+64",
      "+505",
      "+227",
      "+234",
      "+683",
      "+672",
      "+850",
      "+1670",
      "+47",
      "+968",
      "+92",
      "+680",
      "+970",
      "+507",
      "+675",
      "+595",
      "+51",
      "+63",
      "+48",
      "+351",
      "+974",
      "+262",
      "+40",
      "+7",
      "+250",
      "+590",
      "+290",
      "+1869",
      "+1758",
      "+508",
      "+1784",
      "+685",
      "+378",
      "+239",
      "+966",
      "+221",
      "+381",
      "+248",
      "+232",
      "+65",
      "+1721",
      "+421",
      "+386",
      "+677",
      "+252",
      "+27",
      "+82",
      "+211",
      "+34",
      "+94",
      "+249",
      "+597",
      "+268",
      "+46",
      "+41",
      "+963",
      "+886",
      "+992",
      "+255",
      "+66",
      "+670",
      "+228",
      "+690",
      "+676",
      "+1868",
      "+216",
      "+90",
      "+993",
      "+1649",
      "+688",
      "+1340",
      "+256",
      "+380",
      "+971",
      "+598",
      "+998",
      "+678",
      "+58",
      "+84",
      "+681",
      "+212",
      "+967",
      "+260",
      "+263",
      "+358"
    ];
    const form = ref({
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      country: null,
      province: null,
      city: "",
      numberCode: "+1",
      number: "",
      master: false,
      email: ""
    });
    const closeModal = () => {
      emit("close");
    };
    const countryarr = ref([]);
    const filterOptionByLabel = (input, option) => {
      return option.label.toLowerCase().includes(input.toLowerCase());
    };
    const getCountrylist = async () => {
      try {
        let res = await listCountryAll();
        let countrylist = res.result;
        countryarr.value = countrylist;
      } catch (error) {
      }
    };
    const getProvince = async () => {
      let selectcountry = countryarr.value.find((c) => c.countryCode === form.value.country);
      let countryphone = selectcountry.phone;
      let countryid = selectcountry.id;
      form.value.numberCode = countryphone;
      try {
        let parmes = {
          countryId: countryid
        };
        let res = await listProvinceByCountryId(parmes);
        let provincelist = res.result;
        provincearr.value = provincelist;
      } catch (error) {
      }
    };
    const getCity = async () => {
      try {
        let selectprovince = provincearr.value.find((c) => c.regionName === form.value.province);
        let provinceid = selectprovince.id;
        let parmes = {
          regionId: provinceid
        };
        let res = await listCityByRegionId(parmes);
        let citylist = res.result;
        cityarr.value = citylist;
      } catch (error) {
      }
    };
    const subform = async (event) => {
      var _a;
      event.preventDefault();
      try {
        await formRef.value.validate();
        loading.value = true;
        const countryName = ((_a = countryarr.value.find((c) => c.countryCode === form.value.country)) == null ? void 0 : _a.countryName) || "";
        const addparmes = {
          fullName: form.value.firstName + form.value.lastName,
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          address: form.value.address,
          city: form.value.city,
          country: form.value.country,
          master: form.value.master ? 1 : 0,
          province: form.value.province,
          postalCode: form.value.postalCode,
          number: form.value.number,
          numberCode: form.value.numberCode,
          email: form.value.email,
          countryName,
          provinceName: form.value.province
        };
        if (form.value.id) {
          addparmes.id = form.value.id;
          await editUserAddress(addparmes);
          message.success("Update successful");
        } else {
          await createUserAddress(addparmes);
          message.success("Add successful");
        }
        emit("close");
        emit("updateData");
      } catch (error) {
        console.error("Submit Error:", error);
        message.error("Validation or submit failed");
      } finally {
        loading.value = false;
      }
    };
    const getdefaultcountry = async () => {
      if (locationinfo.value) {
        const countryCode = locationinfo.value.countryCode;
        if (form.value.country !== countryCode) {
          form.value.country = null;
          await nextTick();
          form.value.country = countryCode;
        }
      }
    };
    getCountrylist();
    watch(
      () => props.addressinfo,
      (newVal) => {
        if (newVal) {
          form.value = JSON.parse(JSON.stringify({
            id: newVal.id || "",
            firstName: newVal.firstName || "",
            lastName: newVal.lastName || "",
            address: newVal.address || "",
            postalCode: newVal.postalCode || "",
            country: newVal.country || null,
            province: newVal.province || null,
            city: newVal.city || "",
            numberCode: newVal.numberCode || "+1",
            number: newVal.number || "",
            master: newVal.master == 1 ? true : false,
            email: newVal.email || ""
          }));
          if (form.value.country && form.value.province) {
            getCity();
          } else if (form.value.country) {
            getProvince();
          }
          if (!newVal.id) {
            getdefaultcountry();
          }
        }
      },
      { immediate: true }
      // 初始化时执行一次
    );
    watch(() => form.value.country, (newVal) => {
      if (newVal) {
        getProvince();
      }
    });
    watch(() => form.value.province, (newVal) => {
      if (newVal) {
        getCity();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = __nuxt_component_4;
      const _component_UCard = __nuxt_component_5;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        modelValue: unref(props).isshow,
        "onUpdate:modelValue": ($event) => unref(props).isshow = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-lg font-semibold" data-v-1cd63d25${_scopeId2}>${ssrInterpolate(unref(form).id ? "Edit" : "Add")} Address</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-lg font-semibold" }, toDisplayString(unref(form).id ? "Edit" : "Add") + " Address", 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Form), {
                    ref_key: "formRef",
                    ref: formRef,
                    model: unref(form),
                    rules,
                    layout: "vertical",
                    onKeydown: () => {
                    }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FormItem), { name: "country" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Select), {
                                value: unref(form).country,
                                "onUpdate:value": ($event) => unref(form).country = $event,
                                "show-search": "",
                                options: unref(countryarr).map((c) => ({ label: c.countryName, value: c.countryCode })),
                                placeholder: "Select Country/Region",
                                "filter-option": filterOptionByLabel,
                                allowClear: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Select), {
                                  value: unref(form).country,
                                  "onUpdate:value": ($event) => unref(form).country = $event,
                                  "show-search": "",
                                  options: unref(countryarr).map((c) => ({ label: c.countryName, value: c.countryCode })),
                                  placeholder: "Select Country/Region",
                                  "filter-option": filterOptionByLabel,
                                  allowClear: ""
                                }, null, 8, ["value", "onUpdate:value", "options"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { name: "firstName" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: unref(form).firstName,
                                "onUpdate:value": ($event) => unref(form).firstName = $event,
                                placeholder: "First name",
                                size: "large"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: unref(form).firstName,
                                  "onUpdate:value": ($event) => unref(form).firstName = $event,
                                  placeholder: "First name",
                                  size: "large"
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { name: "lastName" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: unref(form).lastName,
                                "onUpdate:value": ($event) => unref(form).lastName = $event,
                                placeholder: "Last name",
                                size: "small"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: unref(form).lastName,
                                  "onUpdate:value": ($event) => unref(form).lastName = $event,
                                  placeholder: "Last name",
                                  size: "small"
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { name: "address" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: unref(form).address,
                                "onUpdate:value": ($event) => unref(form).address = $event,
                                placeholder: "Street Address"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: unref(form).address,
                                  "onUpdate:value": ($event) => unref(form).address = $event,
                                  placeholder: "Street Address"
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { name: "province" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Select), {
                                allowClear: "",
                                value: unref(form).province,
                                "onUpdate:value": ($event) => unref(form).province = $event,
                                "show-search": "",
                                options: unref(provincearr).map((p) => ({ label: p.regionName, value: p.regionName })),
                                placeholder: "Select State/Province",
                                "filter-option": filterOptionByLabel
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Select), {
                                  allowClear: "",
                                  value: unref(form).province,
                                  "onUpdate:value": ($event) => unref(form).province = $event,
                                  "show-search": "",
                                  options: unref(provincearr).map((p) => ({ label: p.regionName, value: p.regionName })),
                                  placeholder: "Select State/Province",
                                  "filter-option": filterOptionByLabel
                                }, null, 8, ["value", "onUpdate:value", "options"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { name: "city" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(AutoComplete), {
                                allowClear: "",
                                value: unref(form).city,
                                "onUpdate:value": ($event) => unref(form).city = $event,
                                "show-search": "",
                                options: unref(cityarr).map((c) => ({ label: c.cityName, value: c.cityName })),
                                "filter-option": filterOptionByLabel,
                                placeholder: "Select City"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(AutoComplete), {
                                  allowClear: "",
                                  value: unref(form).city,
                                  "onUpdate:value": ($event) => unref(form).city = $event,
                                  "show-search": "",
                                  options: unref(cityarr).map((c) => ({ label: c.cityName, value: c.cityName })),
                                  "filter-option": filterOptionByLabel,
                                  placeholder: "Select City"
                                }, null, 8, ["value", "onUpdate:value", "options"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { name: "postalCode" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: unref(form).postalCode,
                                "onUpdate:value": ($event) => unref(form).postalCode = $event,
                                placeholder: "Zip code"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: unref(form).postalCode,
                                  "onUpdate:value": ($event) => unref(form).postalCode = $event,
                                  placeholder: "Zip code"
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { name: "email" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: unref(form).email,
                                "onUpdate:value": ($event) => unref(form).email = $event,
                                placeholder: "Email(optional)"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: unref(form).email,
                                  "onUpdate:value": ($event) => unref(form).email = $event,
                                  placeholder: "Email(optional)"
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { name: "number" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex gap-2" data-v-1cd63d25${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Select), {
                                value: unref(form).numberCode,
                                "onUpdate:value": ($event) => unref(form).numberCode = $event,
                                class: "!w-24",
                                "show-search": "",
                                options: countries.map((code) => ({ label: code, value: code }))
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                value: unref(form).number,
                                "onUpdate:value": ($event) => unref(form).number = $event,
                                placeholder: "Your number",
                                class: "flex-1"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex gap-2" }, [
                                  createVNode(unref(Select), {
                                    value: unref(form).numberCode,
                                    "onUpdate:value": ($event) => unref(form).numberCode = $event,
                                    class: "!w-24",
                                    "show-search": "",
                                    options: countries.map((code) => ({ label: code, value: code }))
                                  }, null, 8, ["value", "onUpdate:value", "options"]),
                                  createVNode(unref(Input), {
                                    value: unref(form).number,
                                    "onUpdate:value": ($event) => unref(form).number = $event,
                                    placeholder: "Your number",
                                    class: "flex-1"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Checkbox), {
                                checked: unref(form).master,
                                "onUpdate:checked": ($event) => unref(form).master = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Set as default address`);
                                  } else {
                                    return [
                                      createTextVNode("Set as default address")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Checkbox), {
                                  checked: unref(form).master,
                                  "onUpdate:checked": ($event) => unref(form).master = $event
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Set as default address")
                                  ]),
                                  _: 1
                                }, 8, ["checked", "onUpdate:checked"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex justify-between gap-4 pt-2" data-v-1cd63d25${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Button), {
                          type: "default",
                          class: "flex-1",
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancel`);
                            } else {
                              return [
                                createTextVNode("Cancel")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Button), {
                          type: "primary",
                          onClick: subform,
                          loading: unref(loading),
                          class: "flex-1 bg-primary"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Submit`);
                            } else {
                              return [
                                createTextVNode("Submit")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(unref(FormItem), { name: "country" }, {
                            default: withCtx(() => [
                              createVNode(unref(Select), {
                                value: unref(form).country,
                                "onUpdate:value": ($event) => unref(form).country = $event,
                                "show-search": "",
                                options: unref(countryarr).map((c) => ({ label: c.countryName, value: c.countryCode })),
                                placeholder: "Select Country/Region",
                                "filter-option": filterOptionByLabel,
                                allowClear: ""
                              }, null, 8, ["value", "onUpdate:value", "options"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { name: "firstName" }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: unref(form).firstName,
                                "onUpdate:value": ($event) => unref(form).firstName = $event,
                                placeholder: "First name",
                                size: "large"
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { name: "lastName" }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: unref(form).lastName,
                                "onUpdate:value": ($event) => unref(form).lastName = $event,
                                placeholder: "Last name",
                                size: "small"
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { name: "address" }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: unref(form).address,
                                "onUpdate:value": ($event) => unref(form).address = $event,
                                placeholder: "Street Address"
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { name: "province" }, {
                            default: withCtx(() => [
                              createVNode(unref(Select), {
                                allowClear: "",
                                value: unref(form).province,
                                "onUpdate:value": ($event) => unref(form).province = $event,
                                "show-search": "",
                                options: unref(provincearr).map((p) => ({ label: p.regionName, value: p.regionName })),
                                placeholder: "Select State/Province",
                                "filter-option": filterOptionByLabel
                              }, null, 8, ["value", "onUpdate:value", "options"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { name: "city" }, {
                            default: withCtx(() => [
                              createVNode(unref(AutoComplete), {
                                allowClear: "",
                                value: unref(form).city,
                                "onUpdate:value": ($event) => unref(form).city = $event,
                                "show-search": "",
                                options: unref(cityarr).map((c) => ({ label: c.cityName, value: c.cityName })),
                                "filter-option": filterOptionByLabel,
                                placeholder: "Select City"
                              }, null, 8, ["value", "onUpdate:value", "options"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { name: "postalCode" }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: unref(form).postalCode,
                                "onUpdate:value": ($event) => unref(form).postalCode = $event,
                                placeholder: "Zip code"
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { name: "email" }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: unref(form).email,
                                "onUpdate:value": ($event) => unref(form).email = $event,
                                placeholder: "Email(optional)"
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { name: "number" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode(unref(Select), {
                                  value: unref(form).numberCode,
                                  "onUpdate:value": ($event) => unref(form).numberCode = $event,
                                  class: "!w-24",
                                  "show-search": "",
                                  options: countries.map((code) => ({ label: code, value: code }))
                                }, null, 8, ["value", "onUpdate:value", "options"]),
                                createVNode(unref(Input), {
                                  value: unref(form).number,
                                  "onUpdate:value": ($event) => unref(form).number = $event,
                                  placeholder: "Your number",
                                  class: "flex-1"
                                }, null, 8, ["value", "onUpdate:value"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), null, {
                            default: withCtx(() => [
                              createVNode(unref(Checkbox), {
                                checked: unref(form).master,
                                "onUpdate:checked": ($event) => unref(form).master = $event
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Set as default address")
                                ]),
                                _: 1
                              }, 8, ["checked", "onUpdate:checked"])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex justify-between gap-4 pt-2" }, [
                            createVNode(unref(Button), {
                              type: "default",
                              class: "flex-1",
                              onClick: closeModal
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancel")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Button), {
                              type: "primary",
                              onClick: subform,
                              loading: unref(loading),
                              class: "flex-1 bg-primary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Submit")
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Form), {
                      ref_key: "formRef",
                      ref: formRef,
                      model: unref(form),
                      rules,
                      layout: "vertical",
                      onKeydown: withKeys(withModifiers(() => {
                      }, ["prevent"]), ["enter"])
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(FormItem), { name: "country" }, {
                          default: withCtx(() => [
                            createVNode(unref(Select), {
                              value: unref(form).country,
                              "onUpdate:value": ($event) => unref(form).country = $event,
                              "show-search": "",
                              options: unref(countryarr).map((c) => ({ label: c.countryName, value: c.countryCode })),
                              placeholder: "Select Country/Region",
                              "filter-option": filterOptionByLabel,
                              allowClear: ""
                            }, null, 8, ["value", "onUpdate:value", "options"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { name: "firstName" }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: unref(form).firstName,
                              "onUpdate:value": ($event) => unref(form).firstName = $event,
                              placeholder: "First name",
                              size: "large"
                            }, null, 8, ["value", "onUpdate:value"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { name: "lastName" }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: unref(form).lastName,
                              "onUpdate:value": ($event) => unref(form).lastName = $event,
                              placeholder: "Last name",
                              size: "small"
                            }, null, 8, ["value", "onUpdate:value"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { name: "address" }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: unref(form).address,
                              "onUpdate:value": ($event) => unref(form).address = $event,
                              placeholder: "Street Address"
                            }, null, 8, ["value", "onUpdate:value"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { name: "province" }, {
                          default: withCtx(() => [
                            createVNode(unref(Select), {
                              allowClear: "",
                              value: unref(form).province,
                              "onUpdate:value": ($event) => unref(form).province = $event,
                              "show-search": "",
                              options: unref(provincearr).map((p) => ({ label: p.regionName, value: p.regionName })),
                              placeholder: "Select State/Province",
                              "filter-option": filterOptionByLabel
                            }, null, 8, ["value", "onUpdate:value", "options"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { name: "city" }, {
                          default: withCtx(() => [
                            createVNode(unref(AutoComplete), {
                              allowClear: "",
                              value: unref(form).city,
                              "onUpdate:value": ($event) => unref(form).city = $event,
                              "show-search": "",
                              options: unref(cityarr).map((c) => ({ label: c.cityName, value: c.cityName })),
                              "filter-option": filterOptionByLabel,
                              placeholder: "Select City"
                            }, null, 8, ["value", "onUpdate:value", "options"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { name: "postalCode" }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: unref(form).postalCode,
                              "onUpdate:value": ($event) => unref(form).postalCode = $event,
                              placeholder: "Zip code"
                            }, null, 8, ["value", "onUpdate:value"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { name: "email" }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: unref(form).email,
                              "onUpdate:value": ($event) => unref(form).email = $event,
                              placeholder: "Email(optional)"
                            }, null, 8, ["value", "onUpdate:value"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { name: "number" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(unref(Select), {
                                value: unref(form).numberCode,
                                "onUpdate:value": ($event) => unref(form).numberCode = $event,
                                class: "!w-24",
                                "show-search": "",
                                options: countries.map((code) => ({ label: code, value: code }))
                              }, null, 8, ["value", "onUpdate:value", "options"]),
                              createVNode(unref(Input), {
                                value: unref(form).number,
                                "onUpdate:value": ($event) => unref(form).number = $event,
                                placeholder: "Your number",
                                class: "flex-1"
                              }, null, 8, ["value", "onUpdate:value"])
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), null, {
                          default: withCtx(() => [
                            createVNode(unref(Checkbox), {
                              checked: unref(form).master,
                              "onUpdate:checked": ($event) => unref(form).master = $event
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Set as default address")
                              ]),
                              _: 1
                            }, 8, ["checked", "onUpdate:checked"])
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex justify-between gap-4 pt-2" }, [
                          createVNode(unref(Button), {
                            type: "default",
                            class: "flex-1",
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Button), {
                            type: "primary",
                            onClick: subform,
                            loading: unref(loading),
                            class: "flex-1 bg-primary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Submit")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["model", "onKeydown"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("div", { class: "text-lg font-semibold" }, toDisplayString(unref(form).id ? "Edit" : "Add") + " Address", 1)
                ]),
                default: withCtx(() => [
                  createVNode(unref(Form), {
                    ref_key: "formRef",
                    ref: formRef,
                    model: unref(form),
                    rules,
                    layout: "vertical",
                    onKeydown: withKeys(withModifiers(() => {
                    }, ["prevent"]), ["enter"])
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(FormItem), { name: "country" }, {
                        default: withCtx(() => [
                          createVNode(unref(Select), {
                            value: unref(form).country,
                            "onUpdate:value": ($event) => unref(form).country = $event,
                            "show-search": "",
                            options: unref(countryarr).map((c) => ({ label: c.countryName, value: c.countryCode })),
                            placeholder: "Select Country/Region",
                            "filter-option": filterOptionByLabel,
                            allowClear: ""
                          }, null, 8, ["value", "onUpdate:value", "options"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), { name: "firstName" }, {
                        default: withCtx(() => [
                          createVNode(unref(Input), {
                            value: unref(form).firstName,
                            "onUpdate:value": ($event) => unref(form).firstName = $event,
                            placeholder: "First name",
                            size: "large"
                          }, null, 8, ["value", "onUpdate:value"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), { name: "lastName" }, {
                        default: withCtx(() => [
                          createVNode(unref(Input), {
                            value: unref(form).lastName,
                            "onUpdate:value": ($event) => unref(form).lastName = $event,
                            placeholder: "Last name",
                            size: "small"
                          }, null, 8, ["value", "onUpdate:value"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), { name: "address" }, {
                        default: withCtx(() => [
                          createVNode(unref(Input), {
                            value: unref(form).address,
                            "onUpdate:value": ($event) => unref(form).address = $event,
                            placeholder: "Street Address"
                          }, null, 8, ["value", "onUpdate:value"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), { name: "province" }, {
                        default: withCtx(() => [
                          createVNode(unref(Select), {
                            allowClear: "",
                            value: unref(form).province,
                            "onUpdate:value": ($event) => unref(form).province = $event,
                            "show-search": "",
                            options: unref(provincearr).map((p) => ({ label: p.regionName, value: p.regionName })),
                            placeholder: "Select State/Province",
                            "filter-option": filterOptionByLabel
                          }, null, 8, ["value", "onUpdate:value", "options"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), { name: "city" }, {
                        default: withCtx(() => [
                          createVNode(unref(AutoComplete), {
                            allowClear: "",
                            value: unref(form).city,
                            "onUpdate:value": ($event) => unref(form).city = $event,
                            "show-search": "",
                            options: unref(cityarr).map((c) => ({ label: c.cityName, value: c.cityName })),
                            "filter-option": filterOptionByLabel,
                            placeholder: "Select City"
                          }, null, 8, ["value", "onUpdate:value", "options"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), { name: "postalCode" }, {
                        default: withCtx(() => [
                          createVNode(unref(Input), {
                            value: unref(form).postalCode,
                            "onUpdate:value": ($event) => unref(form).postalCode = $event,
                            placeholder: "Zip code"
                          }, null, 8, ["value", "onUpdate:value"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), { name: "email" }, {
                        default: withCtx(() => [
                          createVNode(unref(Input), {
                            value: unref(form).email,
                            "onUpdate:value": ($event) => unref(form).email = $event,
                            placeholder: "Email(optional)"
                          }, null, 8, ["value", "onUpdate:value"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), { name: "number" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(Select), {
                              value: unref(form).numberCode,
                              "onUpdate:value": ($event) => unref(form).numberCode = $event,
                              class: "!w-24",
                              "show-search": "",
                              options: countries.map((code) => ({ label: code, value: code }))
                            }, null, 8, ["value", "onUpdate:value", "options"]),
                            createVNode(unref(Input), {
                              value: unref(form).number,
                              "onUpdate:value": ($event) => unref(form).number = $event,
                              placeholder: "Your number",
                              class: "flex-1"
                            }, null, 8, ["value", "onUpdate:value"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), null, {
                        default: withCtx(() => [
                          createVNode(unref(Checkbox), {
                            checked: unref(form).master,
                            "onUpdate:checked": ($event) => unref(form).master = $event
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Set as default address")
                            ]),
                            _: 1
                          }, 8, ["checked", "onUpdate:checked"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex justify-between gap-4 pt-2" }, [
                        createVNode(unref(Button), {
                          type: "default",
                          class: "flex-1",
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Button), {
                          type: "primary",
                          onClick: subform,
                          loading: unref(loading),
                          class: "flex-1 bg-primary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Submit")
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ])
                    ]),
                    _: 1
                  }, 8, ["model", "onKeydown"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddressModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-1cd63d25"]]), { __name: "AddressModal" });

export { AddressAuth as A, __nuxt_component_3 as _ };
