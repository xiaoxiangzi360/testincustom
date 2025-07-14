export const OrderAuth = () => {
    const { $api } = useNuxtApp()

    const generateOrderId = async () => {
        try {

            const response = await $api(`/order/order/generateOrderId`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const createOrder = async (params) => {
        try {
            const response = await $api('/order/order/createOrder', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const tryOrder = async (params) => {
        try {
            const response = await $api('/order/order/tryOrder', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const getOrderlists = async (params) => {
        try {
            const response = await $api('/order/order/userOrderRollPage', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const groupUserOrderStatusCount = async () => {
        try {

            const response = await $api(`/order/order/groupUserOrderStatusCount`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }

    const getUserOrderDocByOrderNumber = async (params) => {
        try {
            const query = new URLSearchParams(params).toString()

            const response = await $api(`/order/order/getUserOrderDocByOrderNumber?${query}`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const cancleOrder = async (params) => {
        try {
            const response = await $api('/order/order/cancelOrderDocById', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }

    return { generateOrderId, createOrder, getOrderlists, groupUserOrderStatusCount, cancleOrder, getUserOrderDocByOrderNumber, tryOrder }
}
