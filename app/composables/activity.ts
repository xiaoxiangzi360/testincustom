export const ActivityAuth = () => {
    const { $api } = useNuxtApp()

    const listInProgressMarketingActivity = async () => {
        try {

            const response = await $api(`/order/marketingActivity/listInProgressMarketingActivity`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const createMarketingActivityEmailSubscribe = async (params) => {
        try {
            const response = await $api('/order/marketingActivity/createMarketingActivityEmailSubscribe', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }

    // 新版弹框
    const getSortInProgressMarketingActivityFromLocation = async (params) => {
        try {
            const response = await $api('/order/marketingActivity/getSortInProgressMarketingActivityFromLocation', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }

     const getMarketingActivityById = async (params) => {
        try {
            const query = new URLSearchParams(params).toString()

            const response = await $api(`/order/marketingActivity/getMarketingActivityById?${query}`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }

    return { getMarketingActivityById, listInProgressMarketingActivity, createMarketingActivityEmailSubscribe, getSortInProgressMarketingActivityFromLocation }
}
