export const PayAuth = () => {
    const { $api } = useNuxtApp()

    const createPayment = async (params) => {
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

    const completePayment = async (params) => {
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
    const getAvailablePaymentByBindId = async (params) => {
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
    return { createPayment, completePayment, getAvailablePaymentByBindId }
}
