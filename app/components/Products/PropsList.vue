<template>
    <div>
        <div>
            <div v-for="(prop, index) in propList" :key="prop.id" class="mb-4">
                <div class="text-[14px] mb-2 flex gap-2 flex-wrap items-center">
                    <div
                        class="bg-[#0C1013] text-[16px] text-white w-6 h-6 flex items-center justify-center rounded font-[500]">
                        {{ Number(index) + 1 }}</div>
                    <div class="text-[#0C1013] font-[600]">{{ prop.enName?.toUpperCase() }}</div>
                    <div class="text-[#5A5B5B]" v-if="prop.type !== 10"> - {{ getPropSelect(prop)?.propValueEnName }}
                    </div>
                    <div class="text-[#5A5B5B]" v-if="prop.type == 10 && showInputStr"> - {{ showInputStr }}</div>

                    <div v-if="prop.proposedView && prop.proposedViewType == 10"
                        class="flex items-center justify-center cursor-pointer">
                        <Tooltip color="#000" :overlayInnerStyle="{ color: '#fff' }" placement="top"
                            :title="prop.proposedDesc"
                            :overlayStyle="{ maxWidth: '330px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                            <ComSvg href="#icon-help" class="w-[20px] h-[20px] inline-block text-[#5A5B5B]" />
                        </Tooltip>
                    </div>
                </div>
                <div v-if="prop.proposedView && prop.proposedViewType == 20" class="text-[14px] text-[#5A5B5B] mb-2">How
                    to Measure Shades or Blinds?<span @click="openViewTipsDrawer(prop)"
                        class="text-primary underline cursor-pointer ml-2">View
                        Our Guide</span> </div>
                <div class="text-[14px] text-[#5A5B5B] mb-2" v-if="prop._specialView">The factory only accepts the
                    dimensions of the sail, if you
                    provide the distance between the fixing points. <span
                        class="text-primary underline cursor-pointer ml-1" @click="openCalculationDrawer">Click
                        Here</span> </div>

                <div v-if="prop.type == 10">
                    <div v-for="option in prop.propValueList" :key="option.id" class="mb-4"
                        v-show="!disabledSkuIds.includes(option.id)">
                        <!-- <div>{{ option.id }}</div> -->
                        <div>
                            <div class="flex items-center space-x-2 cursor-pointer mb-1" v-show="showCustomRadio">
                                <input type="radio" :name="`prop-${option.id}`" :checked="getGroupSelect(prop, option)"
                                    @change="handlePropSelect({ prop, option })"
                                    class="form-radio h-4 w-4 text-primary border-[#d9d9d9] focus:border-none focus:ring-0 focus:outline-none  focus:shadow-none" />
                                <span class="font-semibold text-sm">{{ option.enName }}</span>
                            </div>
                        </div>
                        <div v-if="option.groupList.length > 0">
                            <div v-for="group in option.groupList" :key="group.id" class="grid mb-2 gap-2"
                                :class="[group.inputList.length >= 3 ? 'grid-cols-3' : 'grid-cols-3 max-md:grid-cols-2']">
                                <div v-for="inputItem in group.inputList" :key="inputItem.id" class="">
                                    <div class="">
                                        <label class="flex items-center space-x-2 cursor-pointer">
                                            <span class="font-semibold text-sm">{{ inputItem.inputName }}</span>
                                            <span v-show="inputItem.unit" class="text-[14px]">({{ inputItem.unit
                                                }})</span>
                                        </label>
                                        <div class="mt-1">
                                            <!-- <div>{{ getInputValue({ prop, option, inputItem, skuPropValueList }) }}
                                            </div> -->
                                            <!-- @input="resetInputError" -->
                                            <input v-if="inputItem.viewType == 10" type="number"
                                                v-model="inputValueList[`${inputItem.inputId}`]"
                                                :placeholder="getGroupItemPlaceholder(inputItem)"
                                                @input="resetInputError"
                                                @blur="(event: any) => handleInputBlurChange({ prop, option, inputItem, value: event.currentTarget.value })"
                                                class="w-full text-[14px] border border-[#d9d9d9] rounded px-2 py-1 placeholder:text-[#d9d9d9] focus:border-primary focus:ring-primary focus:outline-none" />
                                            <!-- searchable :search-attributes="['label']" -->
                                            <USelectMenu v-if="inputItem.viewType == 50" placeholder="Choose a value"
                                                class="inline-block w-full"
                                                :model-value="getInputValue({ prop, option, inputItem, skuPropValueList })"
                                                value-attribute="value" label-attribute="label"
                                                :options="inputItem.ruleList.map(item => ({ label: item.start, value: String(item.start) }))"
                                                @update:model-value="(value) => handleInputBlurChange({ prop, option, inputItem, value })"
                                                :variant="{
                                                    base: 'border-[#d9d9d9]',
                                                }" :ui="{
                                                    base: 'ring-1 ring-[#d9d9d9] dark:text-customblack text-customblack',
                                                    placeholder: 'text-[#d8d8d8]',
                                                }" :ui-menu="{
                                                    ring: 'ring-[#d9d9d9]',
                                                    option: {
                                                        active: 'bg-primary-50',
                                                    }
                                                }" />
                                            <p class="text-red-500 text-sm">{{
                                                inputErrorMap?.[inputItem.inputId] }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-red-500 text-sm mb-2" v-if="customPriceError">
                        {{ customPriceError }}
                    </p>
                    <p class="text-[14px] text-[#5A5B5B]   cursor-pointer" @click="openChat">
                        Not sure about your measurements?<span
                            class="ml-2 text-primary hover:text-primary-600 underline">Chat
                            with us.</span>
                    </p>
                </div>
                <div v-else class="flex flex-row flex-wrap gap-2 cursor-pointer">
                    <div v-for="option in prop.propValueList" :key="option.id">
                        <div class="relative" :class="[
                            disabledSkuIds.includes(option.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        ]"
                            @click="disabledSkuIds.includes(option.id) || getPropSelect(prop)?.propValueId == option.id ? null : handlePropSelect({ prop, option })">
                            <!-- <div>{{ option.id }}</div> -->
                            <div v-if="prop._type === 'image'"
                                class="h-[80px] w-[80px] p-[2px] max-md:w-[60px] max-md:h-[60px] rounded hover:border hover:border-primary"
                                :class="[getPropSelect(prop)?.propValueId == option.id ? 'border !border-primary' : '',
                                disabledSkuIds.includes(option.id) ? 'hover:border-none' : ''
                                ]">
                                <Tooltip :title="option.enName" placement="bottom">
                                    <NuxtImg
                                        :src="`${option.imageUrlList[0]}?x-oss-process=image/auto-orient,1/resize,w_100,limit_0`"
                                        alt="Option Image" lazy="loading" class="w-full h-full object-cover rounded" />
                                </Tooltip>
                            </div>
                            <div v-else
                                class="text-[14px] border border-[#d9d9d9] px-3 py-2 rounded hover:border-primary"
                                :class="[getPropSelect(prop)?.propValueId == option.id ? '!border-primary' : '',
                                disabledSkuIds.includes(option.id) ? 'hover:!border-[#d9d9d9]' : ''
                                ]">
                                <div class="line-clamp-1" :title="option.enName">
                                    {{ option.enName
                                    }}</div>
                            </div>
                            <div v-if="getPropSelect(prop)?.propValueId == option.id"
                                class="absolute bottom-0 right-0 w-5 h-5 text-white">
                                <div class="absolute w-5 h-5"
                                    style="clip-path: polygon(100% 100%, 0 100%, 100% 0); background-color: #00B2E3;">
                                    <BaseIcon name="i-mdi:check" class="text-white w-4 h-4"
                                        style="position: absolute; bottom: 0px; right: 0px;" width="12" height="12" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ClientOnly>
            <Drawer v-model:open="viewTipsDrawer.visible" :title="viewTipsDrawer.title" placement="right"
                :width="drawerWidth" @close="">
                <div class="prose max-w-none" v-shadow-html="viewTipsDrawer.content"></div>
            </Drawer>
            <Drawer title="Shade Sail Size Calculator" :open="calculationDrawer?.visible" :width="drawerWidth"
                placement="right" @close="calculationDrawer.visible = false">
                <CalculationView :visible="calculationDrawer?.visible" :data="calculationDrawer?.data"
                    @close="calculationDrawer.visible = false" @ok:data="handleCalculate" />
            </Drawer>
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">
import { Tooltip, Drawer } from 'ant-design-vue';


const props = defineProps({
    productInfo: {
        type: Object,
        required: true
    },
    customPriceError: {
        type: String,
        required: false
    }
});


const emits = defineEmits(['update:curSkuId', 'update:hasSelected', 'update:skuPropValue', 'inputChange',]);

const PageTag = 'Products-PropsList商品规格====';
const skuPropValueList = ref([]);
const showInputError = ref(false);
const inputErrorMap = ref({});
const inputValueList = ref({});
const disabledSkuIds = ref([]); // sku禁用状态映射表
const curSkuIds = ref([]); // 选中的skuId列表
// const curSkuId = ref(); // 选中的skuId列表
const hasSelected = ref(false); // 用户是否有过选择行为

const isCustomized = computed(() => {
    return props.productInfo.propList?.some(prop => prop.type == 10)
})

const curSku = computed(() => {
    return props.productInfo.skuList?.find(sku => sku.id == curSkuId.value);
});

const showCustomRadio = computed(() => {
    const customProp = propList.value.find(prop => prop.type == 10) // skuPropValueList.value.filter(item => item._propType == 10 && !disabledSkuIds.value.includes(item.propValueId));
    if (!customProp?.id) {
        return false;
    }
    const customPropValueIds = (customProp.propValueList.map(item => item.id) || []).filter(id => !disabledSkuIds.value.includes(id));
    return customPropValueIds.length > 1;
});

const curCustomPropValue = computed(() => {
    const customPropValueList = skuPropValueList.value.filter(item => item._propType == 10 && item._selected == true);
    return customPropValueList.length > 0 ? customPropValueList[0] : null;
});


const curSkuId = computed(() => {
    if (curSkuIds.value.length == 1) {
        return curSkuIds.value[0];
    } else if (curSkuIds.value.length > 1) {
        if (curCustomPropValue.value) {
            const customSkuIdList = curCustomPropValue.value.skuIdList || [];
            const findSkuId = curSkuIds.value.find(skuId => customSkuIdList.includes(skuId));
            return findSkuId;
        }
    }
    return '';
});

const propList = computed(() => {
    return props.productInfo.propList.map(prop => {
        const allHaveImages = prop.propValueList.every(option => option.imageUrlList?.length > 0);
        const specialView = prop.specialRestrictionList?.some(restriction => restriction.type === 20 && restriction.use === true)
        return {
            ...prop,
            _type: allHaveImages ? 'image' : 'text',
            _specialView: specialView,
        };
    });
});

// propValueId与sku数据映射表
const skuDataMap = computed(() => {
    const skuMap = {};
    propList.value.forEach(prop => {
        if (prop.type === 10) { // 定制类型
            prop.propValueList?.forEach((propValue, index) => {
                Object.assign(skuMap, {
                    [`${propValue.id}`]: {
                        propId: prop.id,
                        skuIdList: propValue.skuIdList || [],
                        propType: prop.type
                    }
                });
            });
        } else { // 标品类型
            prop.propValueList?.forEach((propValue, index) => {
                Object.assign(skuMap, {
                    [`${propValue.id}`]: {
                        skuIdList: propValue.skuIdList || [],
                        propId: prop.id,
                        propType: prop.type
                    }
                });
            });
        }
    });

    // console.log(PageTag, '初始化skuDataMap==:', skuMap);
    return skuMap;
});


const showInputStr = computed(() => {
    if (!isCustomized.value) return ''
    const inputList = curCustomPropValue.value?.inputList || [];

    const hasEmptyValue = inputList.some(input => !input.inputValue);
    if (hasEmptyValue) {
        return '';
    }
    // 根据 _groupName 分组并拼接
    const grouped = inputList.reduce((acc, item) => {
        if (!acc[item._groupName]) {
            acc[item._groupName] = [];
        }
        acc[item._groupName].push(item.inputValue);
        return acc;
    }, {});
    if (curCustomPropValue.value?._mallViewType == 20) { //按字段拼接
        return Object.values(grouped)
            .map((group: any) => group.join(' * '))
            .join(' * '); // 同组以 * 拼接
    } else {
        return Object.values(grouped)
            .map((group: any) => group.join(' ')) // 同组以空格拼接；不同组以*拼接
            .join(' * ');
    }

})

onMounted(() => {
    initPropValueList();
});

// 检查选项是否被选中
const getPropSelect = (prop) => {
    if (prop.type === 10) {
        return false;
    } else {
        return skuPropValueList.value.find(item => item.propId == prop.id);
    }
};

watch([() => skuPropValueList, () => propList, () => inputValueList, () => curCustomPropValue], (v) => {
    console.log(PageTag, 'skuPropValueList变化==:', 'curCustomPropValue', curCustomPropValue.value, 'skuPropValueList', skuPropValueList.value, 'propList', propList.value);
}, { deep: true });

watch(() => skuPropValueList, (newV) => {
    // console.log(PageTag, 'curSkuId变化==:', newV, curSkuIds.value, props.productInfo,);
    checkInputError({ needCheckNullError: false });
    emits('update:skuPropValue', skuPropValueList.value.filter(item => !(item._propType == 10 && item._selected == false)));
}, { deep: true });

watch(() => hasSelected.value, (newV) => {
    emits('update:hasSelected', hasSelected.value);
}, { deep: true });

watch([() => curSkuIds, () => curCustomPropValue], ([newSkuIds]) => {
    // console.log(PageTag, 'newSkuIds变化==:', newSkuIds.value, curSkuId.value, props.productInfo,);
    emits('update:curSkuId', curSkuId.value);
}, { deep: true });

// 初始化skuPropValueList
const initPropValueList = () => {
    const skuValueList = [];// 初始化sku属性值列表
    const skuIdList = props.productInfo.skuList;
    // console.log(PageTag, '初始化skuIdList==:', skuIdList, props.productInfo);
    let defaultSkuId: any = {}
    if (skuIdList.length > 0) {
        if (isCustomized.value) {
            defaultSkuId = skuIdList[0];
        } else {
            defaultSkuId = props.productInfo.skuList.reduce((lowest, sku) => {
                if (!lowest || (sku.basePrice < lowest.basePrice)) {
                    return sku;
                }
                return lowest;
            }, null);
        }
    }

    let excludePropIds = [];
    propList.value.forEach((prop, index) => {
        const defaultPropValue = defaultSkuId.propList.find(skuPropValue => skuPropValue.propId == prop.id);
        if (prop.type === 10) { // 定制类型
            prop.propValueList.forEach(option => {
                const v = {
                    "propId": prop.id,
                    "propEnName": prop.enName,
                    "propZhName": prop.zhName,
                    "_propType": prop.type,
                    "propValueId": option.id,
                    "propValueEnName": option.enName,
                    "skuIdList": option.skuIdList || [],
                    "_mallViewType": option.mallViewType || 20, // 0:默认 10:输入项 20:图片
                }
                if (option.id == defaultPropValue.propValueId) {
                    Object.assign(v, { _selected: true });
                } else {
                    Object.assign(v, { _selected: false });
                }
                const inputList = [];
                option.groupList?.forEach(group => {
                    group.inputList.forEach(input => {
                        inputList.push({
                            "inputId": input.inputId,
                            "inputName": input.inputName,
                            "inputValue": input.viewType == 50 ? input.ruleList[0]?.start : '',
                            "_groupName": group.groupName,
                        });
                    });
                });
                Object.assign(v, { "inputList": inputList });
                skuValueList.push(v);
            });

        } else { // 标品类型
            const defaultOption = prop.propValueList.find(option => option.id == defaultPropValue.propValueId) || prop.propValueList[0];
            // console.log(PageTag, '初始化skuIdList=初始化defaultOption=:', defaultOption);
            const addPropValue = {
                "propId": prop.id,
                "propEnName": prop.enName,
                "propZhName": prop.zhName,
                "propValueId": defaultOption.id,
                "propValueEnName": defaultOption.enName,
                "skuIdList": defaultOption.skuIdList || [],
                "_propType": prop.type,

            }
            skuValueList.push(addPropValue);
            excludePropIds.push(prop.id);
            // 初始化时更新sku禁用状态
        }
    });
    skuPropValueList.value = skuValueList;
    updateDisabledSkuIds({})
    // console.log(PageTag, '初始化skuPropValueList==:', propList.value, skuPropValueList.value, skuDataMap.value);
};


const allSkuMap = computed(() => {
    const map = {};
    props.productInfo.skuList.forEach(sku => {
        map[sku.id] = {
            propList: sku.propList,
            propNormalIdList: sku.propList.filter(prop => prop.type !== 10).map(item => item.propValueId)
        };
    });
    return map;
})

const updateDisabledSkuIds = ({ }) => {
    const disabledSkuIdsT = [];
    // console.log(PageTag, '--计算禁用-------------skuList：',props.productInfo.skuList,'allSkuMap',allSkuMap.value, 'skuPropValueList.value', skuPropValueList.value, 'skuDataMap.value', skuDataMap.value);
    const normalPropValueList = skuPropValueList.value.filter(skuValue => skuValue._propType !== 10);
    for (let i = 0; i < normalPropValueList.length; i++) {
        const curCheckedPropValue = normalPropValueList[i];

        let curCanSelectedSkuIds = []; // 当前这个属性下，能够被选中的skuId列表
        const otherPropValueId = normalPropValueList.filter(item => item.propId !== curCheckedPropValue.propId).map(item => item.propValueId);


        const matchingSkuItems: any = Object.entries(allSkuMap.value).filter(([skuId, skuItem]: [string, any]) => {
            // 检查 propNormalIdList 是否包含 otherPropValueId 的所有元素
            return otherPropValueId.every((id: any) => skuItem.propNormalIdList.includes(id));
        }).map(([skuId, skuItem]) => skuItem);

        matchingSkuItems.forEach((skuItem) => {
            const matchingProp = skuItem.propList.find((prop) => prop.propId === curCheckedPropValue.propId);
            if (matchingProp) {
                curCanSelectedSkuIds.push(matchingProp.propValueId);
            }
        });
        //  if (!curCheckedPropValue.propValueId) {
        //     console.log(PageTag, '--计算禁用-------------curCheckedPropValue.propValueId不存在，跳过计算', 'curCheckedPropValue', curCheckedPropValue,'otherPropValueId',otherPropValueId);
        //     continue;
        // }
        console.log(PageTag, '--计算禁用11-------------', 'curCheckedPropValue', curCheckedPropValue, 'curCanSelectedSkuIds', curCanSelectedSkuIds,
            'matchingSkuItems', matchingSkuItems, 'allSkuMap', allSkuMap.value,
            'normalPropValueList', normalPropValueList);

        const curProp = propList.value.find(prop => prop.id == curCheckedPropValue.propId);
        const curPropValueIdList = curProp.propValueList.map(option => option.id);
        curPropValueIdList.forEach(propValueId => {
            if (!curCanSelectedSkuIds.includes(propValueId)) {
                if (!disabledSkuIdsT.includes(propValueId)) {
                    disabledSkuIdsT.push(propValueId);
                }
            }
        });
        console.log(PageTag, '--计算禁用33-------------curCheckedPropValue:', curProp,
            'disabledSkuIdsT:', disabledSkuIdsT, 'allSkuMap', allSkuMap.value);
    }

    const selectedSkuIds = normalPropValueList.map(skuValue => skuValue.skuIdList || []) // 提取 skuIdList，若不存在则返回空数组
        .reduce((acc, skuIdList) => {
            if (acc.length === 0) {
                // 如果是第一次迭代，直接使用当前 skuIdList 作为初始值
                return skuIdList;
            }
            return acc.filter(skuId => skuIdList.includes(skuId));
        }, []); // 初始值为空数组

    // console.log(PageTag, '--计算禁用44-------------selectedSkuIds:', selectedSkuIds);
    // 处理定制属性
    const customPropIds = propList.value.filter(prop => prop.type === 10).map(prop => prop.id);
    if (customPropIds.length > 0) {
        const customPropId = customPropIds[0];

        const customSkuDataMap = Object.fromEntries(
            Object.entries(skuDataMap.value).filter(([key, skuItem]: [string, any]) => skuItem.propId == customPropId)
        );
        Object.keys(customSkuDataMap).forEach(propValueId => {
            if (!disabledSkuIdsT.includes(propValueId)) {
                const skuItem: any = customSkuDataMap[propValueId];
                const skuIds = skuItem.skuIdList || [];
                const intersection = skuIds.filter(skuId => selectedSkuIds.includes(skuId));
                if (intersection.length === 0) {
                    disabledSkuIdsT.push(propValueId);
                }
            }
        });
    }

    disabledSkuIds.value = disabledSkuIdsT;
    curSkuIds.value = selectedSkuIds;
    // console.log(PageTag, '更新sku updateDisabledSkuIds==:', disabledSkuIds.value, curSkuIds.value, skuPropValueList.value);
    updateCustomSkuValues();
}


const updateCustomSkuValues = () => {
    const customPropIds = propList.value.filter(prop => prop.type === 10).map(prop => prop.id);
    if (customPropIds.length === 0) {
        return;
    }
    const curCustomPropId = curCustomPropValue.value?.propValueId;
    if (disabledSkuIds.value.includes(curCustomPropId)) {
        // 当前选中的定制属性被禁用，自动切换到第一个可用的定制属性
        const customPropValueList = skuPropValueList.value.filter(item => item._propType == 10 && !disabledSkuIds.value.includes(item.propValueId));
        if (customPropValueList.length > 0) {
            skuPropValueList.value.forEach(item => {
                if (item._propType == 10) {
                    item._selected = item.propValueId == customPropValueList[0].propValueId;
                }
            });
        }
    }
};

const openChat = () => {
    const chatElement = document.getElementById('channel-Chatway-huoq7ej1ua') || document.querySelector('.launcher-minimize-icon');
    if (chatElement) {
        console.log('Chat element 模拟点击---')
        chatElement.click()
    } else {
        console.log('Chat element not found没有--------')
    }
}

// 获取输入项的值
const getInputValue = ({ prop, option, inputItem, skuPropValueList }) => {
    if (prop.type === 10) {
        const skuItem = skuPropValueList.find(item => item.propId == prop.id && item.propValueId == option.id);
        if (skuItem && skuItem.inputList && skuItem.inputList.length > 0) {
            const input = skuItem.inputList.find(input => input.inputId == inputItem.inputId);
            // console.log(PageTag, 'getInputValue==:', prop, option, skuItem, input);
            return input?.inputValue || '';
        }
    }
    return '';
};

const getGroupSelect = (prop, option) => {
    if (prop.type === 10) {
        const skuItem = skuPropValueList.value.find(item => item.propId == prop.id && item.propValueId == option.id);
        return skuItem ? skuItem._selected : false;
    }
    return false;
};

const getInputErrorMap = ({ needCheckNullError }) => {
    const checkErrorMapT = {};
    skuPropValueList.value.forEach(skuValue => {
        if (skuValue._propType == 10 && skuValue._selected == true) {
            curCustomPropValue.value.inputList.forEach(inputValueItem => {
                const error = getInputError({ prop: { id: skuValue.propId }, option: { id: skuValue.propValueId }, inputValueItem, needCheckNullError });
                if (error) {
                    Object.assign(checkErrorMapT, { [`${inputValueItem.inputId}`]: error });
                }
            });
        }
    })
    return checkErrorMapT;
}

const checkInputError = ({ needCheckNullError }) => {
    inputErrorMap.value = getInputErrorMap({ needCheckNullError });
    return Object.keys(inputErrorMap.value).length > 0;
}


defineExpose({
    checkInputError,
    getInputErrorMap
});

const getInputError = ({ prop, option, inputValueItem, needCheckNullError }) => {
    const inputItem = propList.value.find(item => item.id == prop.id)?.propValueList.find(propValue => propValue.id == option.id)?.groupList?.flatMap(group => group.inputList)?.find(input => input.inputId == inputValueItem.inputId);
    const startNum = Number(inputItem.inputStart) || -1;
    const endNum = Number(inputItem.inputEnd) || -1;
    if (inputItem.viewType == 10) {
        if (!inputValueItem?.inputValue) {
            if (needCheckNullError) {
                return 'Please input a value.';
            }
        } else if (endNum > startNum) {
            if (Number(inputValueItem.inputValue) < startNum || Number(inputValueItem.inputValue) > endNum) {
                return ` between ${startNum} and ${endNum}.`;
            }
        } else if (startNum >= 0 && Number(inputValueItem.inputValue) < startNum) {
            return `Minimum value: ${startNum}.`;
        } else if (endNum >= 0 && Number(inputValueItem.inputValue) > endNum) {
            return `Maximum value: ${endNum}.`;
        }
    } else if (inputItem.viewType == 50) {
        if (!inputValueItem?.inputValue) {
            return needCheckNullError ? 'Please select a value.' : '';
        }
    }
    return '';
};

// 获取定制输入项的占位符文本
const getGroupItemPlaceholder = (inputItem) => {
    if (!inputItem.inputStart && !inputItem.inputEnd) {
        return 'Enter a value';
    } else if (inputItem.inputStart >= 0 && inputItem.inputEnd >= 0) {
        return ` ${inputItem.inputStart} ~ ${inputItem.inputEnd}`;
    } else if (inputItem.inputStart >= 0) {
        return `Minimum value: ${inputItem.inputStart}`;
    } else if (inputItem.inputEnd >= 0) {
        return `Maximum value: ${inputItem.inputEnd}`;
    }
};

const handlePropSelect = ({ prop, option }) => {
    hasSelected.value = true;
    if (prop.type === 10) {
        skuPropValueList.value.forEach(item => {
            if (item.propId == prop.id) {
                item._selected = item.propValueId == option.id;
            }
        });
        return;
    }
    const existingIndex = skuPropValueList.value.findIndex(item => item.propId == prop.id);
    if (existingIndex !== -1) {

        if (skuPropValueList.value.some(item => item.propId == prop.id && item.propValueId == option.id)) {
            skuPropValueList.value[existingIndex] = {
                ...skuPropValueList.value[existingIndex],
                propValueId: '',
                propValueEnName: '',
                skuIdList: []
            };
        } else {
            skuPropValueList.value[existingIndex] = {
                ...skuPropValueList.value[existingIndex],
                propValueId: option.id,
                propValueEnName: option.enName,
                skuIdList: option.skuIdList || []
            };
        }

    } else {
        skuPropValueList.value.push({
            propId: prop.id,
            propEnName: prop.enName,
            propZhName: prop.zhName,
            propValueId: option.id,
            propValueEnName: option.enName,
            skuIdList: option.skuIdList || []
        });
    }
    updateDisabledSkuIds({ updatePropId: prop.id });
    // console.log(PageTag, 'handlePropSelect==:', skuPropValueList.value);
};

const resetInputError = () => {
    inputErrorMap.value = {};
    emits('inputChange'); // 通知父组件输入变化了，可以重新校验价格等信息
};

const handleInputBlurChange = ({ prop, option, inputItem, value }) => {
    if (prop.type !== 10) {
        return;
    }
    const skuItem = skuPropValueList.value.find(item => item.propId == prop.id && item.propValueId == option.id);
    if (skuItem) {
        const inputIndex = skuItem.inputList.findIndex(input => input.inputId == inputItem.inputId);
        let valueT = value;
        if (inputItem.viewType == 50) {
            valueT = value;
        } else {
            if (!valueT) {
                valueT = '';
            } else {
                if (inputItem.inputType == 10) { // 整数
                    valueT = parseInt(value) + '';
                } else if (inputItem.inputType == 50) { // 一位小数
                    valueT = parseFloat(value).toFixed(1);
                } else if (inputItem.inputType == 100) { // 两位小数
                    valueT = parseFloat(value).toFixed(2);
                }
            }
        }

        showInputError.value = valueT !== '';
        Object.assign(inputValueList.value, { [`${inputItem.inputId}`]: valueT });
        if (inputIndex !== -1) {
            skuItem.inputList[inputIndex].inputValue = valueT;
        }



        // console.log(PageTag, 'handleInputBlurChange==:', skuItem, skuPropValueList.value);
    }
};


const viewTipsDrawer = ref<any>({});
const { isMobile, isPad } = useMobile();
const drawerWidth = computed(() => {
    if (isMobile.value) return '320px'
    if (isPad.value) return '400px'
    return '520px'
})
const openViewTipsDrawer = (property) => {
    viewTipsDrawer.value = {
        title: property.enName || 'View Tips',
        content: property.proposedDesc || '',
        visible: true,
        width: isMobile.value ? '320px' : (isPad.value ? '400px' : '520px'),
    }
}

const calculationDrawer = ref();
const openCalculationDrawer = () => {
    const curPropItem = propList.value.find(prop => prop.id == curCustomPropValue.value.propId)?.propValueList.find(option => option.id == curCustomPropValue.value.propValueId);
    calculationDrawer.value = {
        visible: true,
        data: { curPropItem: curPropItem, propValue: curCustomPropValue.value, curSku: curSku.value, productId: props.productInfo.id },
    }
    // console.log(PageTag, '打开计算抽屉==:', calculationDrawer.value, props.productInfo);
}

const handleCalculate = (data) => {
    // console.log(PageTag, '计算抽屉确定事件==:', data, inputValueList.value, skuPropValueList.value);

    skuPropValueList.value.forEach(skuValue => {
        if (skuValue.propId == data.prop.id && skuValue.propValueId == data.propValue.id) {
            skuValue.inputList.forEach(input => {
                if (data.inputValues?.[`${input.inputId}`]) {
                    input.inputValue = data.inputValues?.[`${input.inputId}`];
                    Object.assign(inputValueList.value, { [`${input.inputId}`]: input.inputValue });
                }
            })
        }
    })
    calculationDrawer.value = {
        visible: false,
    }
}

</script>