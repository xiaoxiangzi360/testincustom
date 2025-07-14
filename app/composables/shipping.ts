export const ShippingAuth = () => {
    const { $api } = useNuxtApp()

    const getlistOldShippingRule = async (params) => {
        try {
            const response = await $api('/common/shipping/listOldShippingRule', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }


    return { getlistOldShippingRule }
}
