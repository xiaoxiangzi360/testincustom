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
    return { listInProgressMarketingActivity, createMarketingActivityEmailSubscribe }
}
