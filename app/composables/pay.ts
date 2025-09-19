export const PayAuth = () => {
    const { $api } = useNuxtApp()

    const createPayment = async (params: any) => {
        try {
            const response = await $api('/pay/payment/createPayment', {
                method: 'POST',
                body: params,
            })
            return response
        } catch (error) {
            throw error
        }
    }

    const completePayment = async (params: any) => {
        try {
            const query = new URLSearchParams(params).toString()
            const response = await $api(`/pay/paypal/payPalCaptureOrder?${query}`, {
                method: 'GET',
            })
            return response
        } catch (error) {
            throw error
        }
    }

    const airwallexCapturePaymentIntents = async (params: any) => {
        try {
            const query = new URLSearchParams(params).toString()
            const response = await $api(`/pay/airwallex/airwallexCapturePaymentIntents?${query}`, {
                method: 'GET',
            })
            return response
        } catch (error) {
            throw error
        }
    }

    const getAvailablePaymentByBindId = async (params: any) => {
        try {
            const query = new URLSearchParams(params).toString()
            const response = await $api(`/pay/payment/getAvailablePaymentByBindId?${query}`, {
                method: 'GET',
            })
            return response
        } catch (error) {
            throw error
        }
    }

    /**
     * Apple Pay 商户校验：向你的后端请求 Airwallex 的 payment_session/start
     * 后端拿 validationURL + payment_intent_id 去请求 Airwallex，
     * 把返回的 merchantSession 原样回给前端。
     */
    const startAirwallexPaymentSession = async (params: any) => {
        try {
            const response = await $api('/pay/airwallex/airwallexPaymentSessionStart', {
                method: 'POST',
                body: params,
            })
            return response
        } catch (error) {
            throw error
        }
    }
    return {
        createPayment,
        completePayment,
        getAvailablePaymentByBindId,
        airwallexCapturePaymentIntents,
        startAirwallexPaymentSession, // ← 新增导出
    }
}
