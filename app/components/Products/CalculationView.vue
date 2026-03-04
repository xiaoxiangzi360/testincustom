<template>
    <div class="h-full w-full" v-if="visible && data?.propValue?.propId">
        <div class="p-5 flex flex-col gap-6 text-gray-800">
            <!-- Selected summary -->
            <div v-if="data.propValue.propEnName" class="text-sm">
                <div class="font-medium">Selected: {{ data.propValue.propEnName }}</div>
                <div v-if="data.propValue.propValueEnName">
                    <span class="text-gray-500">Option:</span>
                    <span class="ml-1">{{ data.propValue.propValueEnName }}</span>
                </div>
            </div>

            <!-- Step 1 -->
            <div>
                <div class="font-semibold mb-2">Step1: Choose Your Layout</div>
                <div class="text-sm text-gray-600 mb-2">Select the shape formed by your fixed points – rectangle,
                    square,
                    irregular quadrilateral, or triangle.</div>
                <img v-if="data.curSku.imageList.length > 0"
                    :src="`${data.curSku.imageList?.[0]}?x-oss-process=image/resize,w_400`"
                    class="h-[180px] rounded object-contain object-left" alt="layout" />
            </div>

            <!-- Step 2 -->
            <div v-if="allInputList.length > 0">
                <div class="font-semibold mb-2">Step2: Enter distances (in feet).</div>
                <div class="text-sm text-gray-600 mb-2">
                    Enter distance {{allInputList.map(item => item.inputName).join(' and ')}}
                </div>
                <div class="">
                    <div v-for="(input, i) in allInputList" :key="input.inputId" class="mb-2">
                        <div class="flex items-center gap-2">
                            <div class="text-sm text-gray-700 w-30">Enter distance {{ input.inputName }}</div>
                            <input type="number" v-model="allInputValues[`${input.inputId}`]" :min="0" :max="9999"
                                :step="0.1" @input="resetErrors"
                                @blur="(event: any) => handleBlurInput({ value: event.target.value, inputId: input.inputId })"
                                class="w-[220px] text-[14px] border border-[#d9d9d9] rounded px-2 py-1 placeholder:text-[#d9d9d9] focus:border-primary focus:ring-primary focus:outline-none" />
                            <span class="text-sm">inch</span>
                        </div>
                        <p class="text-red-500 text-sm w-full text-center min-h-[18px]">{{
                            inputErrorMap[`${input.inputId}`] }}</p>
                    </div>
                </div>
                <p class="text-red-500 text-sm">{{ calculateError }}</p>
                <div class="mt-3 bg-primary text-white px-4 py-2 rounded cursor-pointer inline-block"
                    @click="handleCalcSides"> Calculation side</div>
            </div>

            <!-- Step 3 results -->
            <div>
                <div class="font-semibold mb-2">Step3: Check the shade sail sizes we recommend for you</div>
                <div class="text-sm text-gray-600 mb-3">You can save the shade sail size combination and return to the
                    input box to enter it with one click.</div>
                <div class="space-y-3 max-w-[520px]">
                    <div v-for="(input, i) in allInputList" :key="`result-${input.inputId}`"
                        class="grid grid-cols-[auto_1fr] items-center gap-3">
                        <div class="text-sm text-gray-700">{{ input.inputName }}</div>
                        <input :disabled="true" type="number" v-model="calculateInputValues[`${input.inputId}`]"
                            :min="0" :max="9999" :step="0.1" class="w-[220px] text-[14px] border border-[#d9d9d9] rounded px-2 py-1 
                            placeholder:text-[#d9d9d9] focus:border-primary focus:ring-primary focus:outline-none
                            disabled:bg-[#f5f5f5] cursor-not-allowed" />
                    </div>
                </div>
            </div>

            <!-- Notes -->
            <div class="bg-blue-50 text-blue-900 text-xs p-3 rounded border border-blue-100">
                <div>Note:</div>
                <ol class="list-decimal ml-4 space-y-1">
                    <li>The minimum angle of a triangular shade sail must be greater than 35°.</li>
                    <li>A trapezoidal shade sail is a convex quadrilateral.</li>
                    <li>The longest side of a triangular shade sail is 24 feet, and the longest side of a quadrilateral
                        shade sail is 25 feet.</li>
                </ol>
            </div>

            <div class="pt-2">
                <div class="bg-primary text-white px-4 py-2 rounded cursor-pointer inline-block"
                    @click="handleContinue">Continue to buy</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue';

const { propSideLengthTool } = ProductAuth()

const PageTag = 'CalculationView算价view组件==';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    visible: {
        type: Boolean,
        default: false,
    }
})

const emits = defineEmits(['close', 'ok:data',]);
const allInputValues = ref({});
const calculateInputValues = ref({});
const calculateError = ref(null);
const allInputList = computed(() => {
    return props.data?.curPropItem?.groupList?.flatMap(group => group.inputList) || []
})
watch([() => allInputList.value], (newV) => {
    console.log(PageTag, 'allInputList==:', allInputList.value);
    // 初始化输入值
    let inputValuesT = {};
    allInputList.value.forEach(item => {
        inputValuesT[`${item.inputId}`] = '';
    })
    allInputValues.value = inputValuesT;
}, { deep: true, immediate: true });

watch(() => props.visible, (newV) => {
    if (!props.visible) {
        allInputValues.value = {};
        calculateInputValues.value = {};
        calculateError.value = null;
        inputErrorMap.value = {};
    }
})

const handleBlurInput = ({ value, inputId }) => {
    if (!value) {
        allInputValues.value = { ...allInputValues.value, [`${inputId}`]: '' }
        return;
    }
    let valueT = Number(value);
    if (valueT < 0) {
        valueT = 0;
    } else if (valueT > 9999) {
        valueT = 9999;
    }
    // 保留一位小数
    valueT = Number(valueT.toFixed(1));
    // 更新输入值
    allInputValues.value = { ...allInputValues.value, [`${inputId}`]: String(valueT) }
}


const inputErrorMap = ref({});
const checkInputList = () => {
    // if (calculateError.value) {
    //     return false;
    // }
    let errorMapT = {};
    Object.keys(allInputValues.value).forEach((key) => {
        const value = allInputValues.value[key];
        if (!value || isNaN(Number(value)) || Number(value) < 0 || Number(value) > 9999) {
            errorMapT[key] = 'between 0 and 9999';
        }
    })
    inputErrorMap.value = errorMapT;
    return Object.keys(errorMapT).length === 0;
}
const handleCalcSides = async () => {
    const isValid = await checkInputList();
    console.log(PageTag, '输入校验结果==:', isValid, inputErrorMap.value);
    if (!isValid) {
        return;
    }
    const params = {
        productId: props.data.productId,
        prop: {
            propId: props.data.propValue.propId,
            propValueId: props.data.propValue.propValueId,
            inputList: allInputList.value.map(item => ({ inputId: item.inputId, inputValue: allInputValues.value[`${item.inputId}`] || '' }))
        }
    }
    try {
        const res = await propSideLengthTool(params);
        if (res.result.productId) {
            calculateInputValues.value = res.result.prop.inputList.reduce((acc, side) => {
                acc[`${side.inputId}`] = parseFloat(side.inputValue)?.toFixed(2);   // 保留一位小数
                return acc;
            }, {})
            calculateError.value = null;
        } else {
            throw new Error('calculation failed');
        }
        console.log(PageTag, '测量工具接口返回:', res);
    } catch (error) {
        console.error(error)
        let msg = 'failed to calculate';
        try {
            msg = JSON.parse(error.message || '{}').enDesc || msg
        } catch (_) {
            if (error?.name === 'EMPTY_DIMENSION' || error?.name === 'NOT_CHOSEN') {
                msg = error.message   // 'No dimensions entered!' / 'Please select properties!'
            }
        }
        calculateError.value = msg;
    }
    console.log(PageTag, '调用测量工具接口参数:', params);
}
const resetErrors = () => {
    inputErrorMap.value = {};
    calculateError.value = null;
    calculateInputValues.value = {};
}
const handleContinue = () => {
    if (!props.data?.propValue?.propId) {
        return
    }
    if (calculateInputValues.value && Object.keys(calculateInputValues.value).length > 0) {
        // 已经计算过，继续则携带计算结果
        emits('ok:data', {
            inputValues: calculateInputValues.value,
            prop: { type: 10, id: props.data.propValue.propId },
            propValue: { id: props.data.propValue.propValueId },
        });
        return;
    } else {
        emits('close');
    }
}
</script>