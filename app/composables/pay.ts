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
     *
     * @param params.validationURL  从前端校验事件里拿到的 validationURL
     * @param params.payment_intent_id  Payment Intent ID（可用 airwallexPaymentIntentsId / paymentIntentId 作为别名）
     */
    const startAirwallexPaymentSession = async (params: {
        validationURL: string
        payment_intent_id?: string
        paymentIntentId?: string
        airwallexPaymentIntentsId?: string
    }) => {
        try {
            const { validationURL } = params || {}
            const payment_intent_id =
                params.payment_intent_id ||
                params.paymentIntentId ||
                params.airwallexPaymentIntentsId

            if (!validationURL || !payment_intent_id) {
                throw new Error('Missing required params: validationURL or payment_intent_id')
            }

            // 约定你的后端路由：/pay/airwallex/paymentSessionStart
            // 若后端路径不同，这里改成你的真实路径即可
            const response = await $api('/pay/airwallex/paymentSessionStart', {
                method: 'POST',
                body: {
                    validationURL,
                    payment_intent_id,
                },
            })
            // 返回的就是 merchantSession
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
